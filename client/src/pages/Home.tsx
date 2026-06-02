import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PerimeterMap } from '@/components/PerimeterMap';
import { CoordinatesTable } from '@/components/CoordinatesTable';
import { MemorialInfo } from '@/components/MemorialInfo';
import { MapPin, FileText, Grid3x3 } from 'lucide-react';

// Dados do memorial descritivo
const memorialData = {
  proprietario: 'CESAR OLAVO MOURA',
  localidade: 'Brejo das Pedras',
  municipio: 'Guaramiranga',
  estado: 'CE',
  area: 13130.781,
  areaHectares: 1.3131,
  areaAlqueires: 0.5426,
  perimetro: 691.353,
  responsavel: 'JOÃO SABOIA',
  crea: '51353D',
  data: 'Maio de 2026',
  sistema: 'SIRGAS 2000',
};

// Coordenadas do perímetro
const coordinates = [
  { point: 1, nextPoint: 2, north: 9533819.9425, east: 503424.5262, azimuth: '112°11\'43"', distance: 42.931 },
  { point: 2, nextPoint: 3, north: 9533803.7248, east: 503464.2759, azimuth: '190°36\'06"', distance: 52.150 },
  { point: 3, nextPoint: 4, north: 9533752.4649, east: 503454.6814, azimuth: '286°31\'42"', distance: 31.087 },
  { point: 4, nextPoint: 5, north: 9533761.3088, east: 503424.8788, azimuth: '200°58\'11"', distance: 77.431 },
  { point: 5, nextPoint: 6, north: 9533689.0062, east: 503397.1682, azimuth: '293°28\'00"', distance: 27.566 },
  { point: 6, nextPoint: 7, north: 9533699.9834, east: 503371.8821, azimuth: '208°03\'52"', distance: 25.096 },
  { point: 7, nextPoint: 8, north: 9533677.8383, east: 503360.0754, azimuth: '293°47\'25"', distance: 9.661 },
  { point: 8, nextPoint: 9, north: 9533681.7354, east: 503351.2356, azimuth: '8°30\'15"', distance: 91.929 },
  { point: 9, nextPoint: 10, north: 9533772.6538, east: 503364.8303, azimuth: '243°51\'07"', distance: 37.950 },
  { point: 10, nextPoint: 11, north: 9533755.9296, east: 503330.7645, azimuth: '260°03\'47"', distance: 67.415 },
  { point: 11, nextPoint: 12, north: 9533744.2961, east: 503264.3612, azimuth: '356°43\'27"', distance: 8.377 },
  { point: 12, nextPoint: 13, north: 9533752.6598, east: 503263.8825, azimuth: '50°50\'19"', distance: 12.015 },
  { point: 13, nextPoint: 14, north: 9533760.2472, east: 503273.1983, azimuth: '37°00\'50"', distance: 32.063 },
  { point: 14, nextPoint: 15, north: 9533785.8488, east: 503292.5002, azimuth: '20°37\'45"', distance: 29.025 },
  { point: 15, nextPoint: 16, north: 9533813.0129, east: 503302.7263, azimuth: '57°39\'44"', distance: 21.101 },
  { point: 16, nextPoint: 17, north: 9533824.3003, east: 503320.5552, azimuth: '105°19\'45"', distance: 50.766 },
  { point: 17, nextPoint: 18, north: 9533810.8796, east: 503369.5146, azimuth: '143°29\'53"', distance: 25.178 },
  { point: 18, nextPoint: 1, north: 9533790.6409, east: 503384.4915, azimuth: '53°47\'58"', distance: 49.612 },
];

export default function Home() {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Memorial Descritivo</h1>
              <p className="text-sm text-gray-600 mt-1">Gleba A • Guaramiranga, CE</p>
            </div>
            <div className="text-right text-xs text-gray-500">
              <p>Sistema: SIRGAS 2000</p>
              <p>Responsável: JOÃO SABOIA (CREA 51353D)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Mapa</span>
            </TabsTrigger>
            <TabsTrigger value="coordinates" className="flex items-center gap-2">
              <Grid3x3 className="w-4 h-4" />
              <span className="hidden sm:inline">Coordenadas</span>
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Informações</span>
            </TabsTrigger>
          </TabsList>

          {/* Mapa Tab */}
          <TabsContent value="map" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="h-[500px] lg:h-[600px]">
                  <PerimeterMap 
                    coordinates={coordinates}
                    onPointHover={setHoveredPoint}
                  />
                </div>
              </div>
              <div className="h-[500px] lg:h-[600px]">
                <MemorialInfo data={memorialData} />
              </div>
            </div>
          </TabsContent>

          {/* Coordenadas Tab */}
          <TabsContent value="coordinates" className="space-y-4">
            <div className="h-[600px]">
              <CoordinatesTable 
                coordinates={coordinates}
                hoveredPoint={hoveredPoint}
              />
            </div>
          </TabsContent>

          {/* Informações Tab */}
          <TabsContent value="info" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-[600px]">
                <MemorialInfo data={memorialData} />
              </div>
              
              <div className="space-y-6">
                {/* Confrontações */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Confrontações</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Norte (Frente)</h4>
                      <p className="text-sm text-gray-600">Rua sem denominação oficial, Miguel Franklin de Castro, Cesar Olavo de Moura Filho</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Sul (Fundos)</h4>
                      <p className="text-sm text-gray-600">Maria Neide Barbosa Alves, Rua sem denominação oficial</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Leste (Lado Direito)</h4>
                      <p className="text-sm text-gray-600">Maria Neide Barbosa Alves, Terreno do Brejo das Pedras</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Oeste (Lado Esquerdo)</h4>
                      <p className="text-sm text-gray-600">Maria Neide Barbosa Alves, Anaxagoras Maia Girão</p>
                    </div>
                  </div>
                </div>

                {/* Resumo Técnico */}
                <div className="bg-gradient-to-br from-blue-50 to-green-50 border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo Técnico</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-700">Número de Vértices</span>
                      <span className="font-mono font-semibold text-gray-900">18</span>
                    </div>
                    
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-700">Área Total</span>
                      <span className="font-mono font-semibold text-gray-900">13.130,781 m²</span>
                    </div>
                    
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-700">Perímetro</span>
                      <span className="font-mono font-semibold text-gray-900">691,353 m</span>
                    </div>
                    
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-700">Hectares</span>
                      <span className="font-mono font-semibold text-gray-900">1,3131 ha</span>
                    </div>
                    
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-700">Alqueires</span>
                      <span className="font-mono font-semibold text-gray-900">0,5426</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-xs text-gray-600 text-center">
            Visualizador de Memorial Descritivo • Gleba A • Guaramiranga, CE • Levantamento: Maio de 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
