import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';

interface Coordinate {
  point: number;
  nextPoint: number;
  north: number;
  east: number;
  azimuth: string;
  distance: number;
}

interface PerimeterMapProps {
  coordinates: Coordinate[];
  onPointHover?: (point: number | null) => void;
}

export const PerimeterMap: React.FC<PerimeterMapProps> = ({ coordinates, onPointHover }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current || coordinates.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar dimensões do canvas
    const rect = canvas.parentElement?.getBoundingClientRect();
    if (!rect) return;

    canvas.width = rect.width;
    canvas.height = rect.height;

    // Calcular bounds das coordenadas
    const northValues = coordinates.map(c => c.north);
    const eastValues = coordinates.map(c => c.east);
    
    const minNorth = Math.min(...northValues);
    const maxNorth = Math.max(...northValues);
    const minEast = Math.min(...eastValues);
    const maxEast = Math.max(...eastValues);

    const northRange = maxNorth - minNorth;
    const eastRange = maxEast - minEast;

    // Padding e escala
    const padding = 40;
    const availWidth = canvas.width - 2 * padding;
    const availHeight = canvas.height - 2 * padding;

    const scale = Math.min(
      availWidth / eastRange,
      availHeight / northRange
    ) * 0.9;

    // Função para converter coordenadas geográficas para canvas
    const toCanvasX = (east: number) => {
      return padding + ((east - minEast) * scale);
    };

    const toCanvasY = (north: number) => {
      return canvas.height - padding - ((north - minNorth) * scale);
    };

    // Limpar canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar grid de fundo
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    const gridSpacing = 50;
    for (let x = 0; x < canvas.width; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Desenhar perímetro
    ctx.strokeStyle = '#1a5f7a';
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    coordinates.forEach((coord, index) => {
      const x = toCanvasX(coord.east);
      const y = toCanvasY(coord.north);

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    // Fechar o polígono
    if (coordinates.length > 0) {
      const firstX = toCanvasX(coordinates[0].east);
      const firstY = toCanvasY(coordinates[0].north);
      ctx.lineTo(firstX, firstY);
    }

    ctx.stroke();

    // Desenhar pontos
    coordinates.forEach((coord, index) => {
      const x = toCanvasX(coord.east);
      const y = toCanvasY(coord.north);
      const isHovered = hoveredPoint === coord.point;

      // Círculo do ponto
      ctx.fillStyle = isHovered ? '#55a347' : '#1a5f7a';
      ctx.beginPath();
      ctx.arc(x, y, isHovered ? 6 : 4, 0, Math.PI * 2);
      ctx.fill();

      // Número do ponto
      ctx.fillStyle = '#1a5f7a';
      ctx.font = 'bold 12px Poppins';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(coord.point.toString(), x, y - 15);
    });

    // Desenhar legenda
    ctx.fillStyle = '#666666';
    ctx.font = '12px Poppins';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Sistema: SIRGAS 2000', 10, 10);
    ctx.fillText(`Escala: 1:${Math.round(1 / (scale / 100))}`, 10, 25);

  }, [coordinates, hoveredPoint]);

  const handleCanvasHover = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || coordinates.length === 0) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calcular bounds
    const northValues = coordinates.map(c => c.north);
    const eastValues = coordinates.map(c => c.east);
    
    const minNorth = Math.min(...northValues);
    const maxNorth = Math.max(...northValues);
    const minEast = Math.min(...eastValues);
    const maxEast = Math.max(...eastValues);

    const northRange = maxNorth - minNorth;
    const eastRange = maxEast - minEast;

    const padding = 40;
    const availWidth = canvas.width - 2 * padding;
    const availHeight = canvas.height - 2 * padding;

    const scale = Math.min(
      availWidth / eastRange,
      availHeight / northRange
    ) * 0.9;

    const toCanvasX = (east: number) => {
      return padding + ((east - minEast) * scale);
    };

    const toCanvasY = (north: number) => {
      return canvas.height - padding - ((north - minNorth) * scale);
    };

    // Detectar ponto sob mouse
    let foundPoint: number | null = null;
    for (const coord of coordinates) {
      const px = toCanvasX(coord.east);
      const py = toCanvasY(coord.north);
      const distance = Math.sqrt((x - px) ** 2 + (y - py) ** 2);

      if (distance < 10) {
        foundPoint = coord.point;
        break;
      }
    }

    setHoveredPoint(foundPoint);
    onPointHover?.(foundPoint);
  };

  return (
    <Card className="w-full h-full flex flex-col bg-white border-gray-200 shadow-sm">
      <div className="flex-1 relative overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          onMouseMove={handleCanvasHover}
          onMouseLeave={() => {
            setHoveredPoint(null);
            onPointHover?.(null);
          }}
        />
      </div>
    </Card>
  );
};
