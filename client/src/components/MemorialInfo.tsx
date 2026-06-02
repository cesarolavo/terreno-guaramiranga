import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MemorialData {
  proprietario: string;
  localidade: string;
  municipio: string;
  estado: string;
  area: number;
  areaHectares: number;
  areaAlqueires: number;
  perimetro: number;
  responsavel: string;
  crea: string;
  data: string;
  sistema: string;
}

interface MemorialInfoProps {
  data: MemorialData;
}

export const MemorialInfo: React.FC<MemorialInfoProps> = ({ data }) => {
  return (
    <Card className="w-full h-full flex flex-col bg-white border-gray-200 shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Memorial Descritivo</h3>
        <p className="text-xs text-gray-500 mt-1">Gleba A</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Proprietário */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Proprietário</label>
            <p className="text-sm text-gray-900 font-medium">{data.proprietario}</p>
          </div>

          {/* Localização */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Localização</label>
            <p className="text-sm text-gray-700">
              {data.localidade}, {data.municipio} - {data.estado}
            </p>
          </div>

          {/* Características */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block">Características</label>
            
            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-gray-600">Área</span>
                <span className="font-mono text-sm font-semibold text-gray-900">
                  {data.area.toLocaleString('pt-BR', { maximumFractionDigits: 3 })} m²
                </span>
              </div>
              
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-gray-600">Hectares</span>
                <span className="font-mono text-sm font-semibold text-gray-900">
                  {data.areaHectares.toLocaleString('pt-BR', { maximumFractionDigits: 4 })} ha
                </span>
              </div>
              
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-gray-600">Alqueires</span>
                <span className="font-mono text-sm font-semibold text-gray-900">
                  {data.areaAlqueires.toLocaleString('pt-BR', { maximumFractionDigits: 4 })}
                </span>
              </div>
              
              <div className="flex justify-between items-baseline pt-2 border-t border-gray-200">
                <span className="text-xs text-gray-600">Perímetro</span>
                <span className="font-mono text-sm font-semibold text-gray-900">
                  {data.perimetro.toLocaleString('pt-BR', { maximumFractionDigits: 3 })} m
                </span>
              </div>
            </div>
          </div>

          {/* Responsável Técnico */}
          <div className="space-y-1 pt-2 border-t border-gray-200">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Responsável Técnico</label>
            <p className="text-sm text-gray-900">{data.responsavel}</p>
            <p className="text-xs text-gray-600">CREA {data.crea}</p>
          </div>

          {/* Informações Técnicas */}
          <div className="space-y-1 pt-2 border-t border-gray-200">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Informações Técnicas</label>
            <div className="text-xs text-gray-700 space-y-1">
              <p>
                <span className="font-semibold">Sistema de Coordenadas:</span> {data.sistema}
              </p>
              <p>
                <span className="font-semibold">Data do Levantamento:</span> {data.data}
              </p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
};
