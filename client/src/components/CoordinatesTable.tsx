import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Coordinate {
  point: number;
  nextPoint: number;
  north: number;
  east: number;
  azimuth: string;
  distance: number;
}

interface CoordinatesTableProps {
  coordinates: Coordinate[];
  hoveredPoint?: number | null;
}

export const CoordinatesTable: React.FC<CoordinatesTableProps> = ({ coordinates, hoveredPoint }) => {
  return (
    <Card className="w-full h-full flex flex-col bg-white border-gray-200 shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Tabela de Coordenadas</h3>
        <p className="text-xs text-gray-500 mt-1">Sistema: SIRGAS 2000</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-gray-700 border-r border-gray-200">Ponto</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700 border-r border-gray-200">Para</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700 border-r border-gray-200">N (Y)</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700 border-r border-gray-200">E (X)</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700 border-r border-gray-200">Azimute</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Distância (m)</th>
              </tr>
            </thead>
            <tbody>
              {coordinates.map((coord, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-100 transition-colors ${
                    hoveredPoint === coord.point
                      ? 'bg-green-50'
                      : index % 2 === 0
                      ? 'bg-white'
                      : 'bg-gray-50'
                  }`}
                >
                  <td className="px-3 py-2 font-mono text-gray-900 border-r border-gray-200 font-semibold">
                    {coord.point}
                  </td>
                  <td className="px-3 py-2 font-mono text-gray-700 border-r border-gray-200">
                    {coord.nextPoint}
                  </td>
                  <td className="px-3 py-2 font-mono text-gray-700 border-r border-gray-200">
                    {coord.north.toLocaleString('pt-BR', { maximumFractionDigits: 4 })}
                  </td>
                  <td className="px-3 py-2 font-mono text-gray-700 border-r border-gray-200">
                    {coord.east.toLocaleString('pt-BR', { maximumFractionDigits: 4 })}
                  </td>
                  <td className="px-3 py-2 font-mono text-gray-700 border-r border-gray-200">
                    {coord.azimuth}
                  </td>
                  <td className="px-3 py-2 font-mono text-gray-700">
                    {coord.distance.toLocaleString('pt-BR', { maximumFractionDigits: 3 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollArea>
    </Card>
  );
};
