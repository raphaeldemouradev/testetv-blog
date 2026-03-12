// src/app/loading.tsx
import React from 'react';

// Um mini-componente reutilizável para os blocos que piscam
const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. SKELETON DO HEADER/NAVBAR (Simulando o topo fixo) */}
      <div className="w-full h-20 border-b border-gray-100 bg-white sticky top-0 z-50 px-6 flex items-center justify-between">
        <SkeletonBlock className="w-40 h-8 rounded-full" /> {/* Logo */}
        <div className="flex gap-6">
          <SkeletonBlock className="w-24 h-6" /> {/* Links do Menu */}
          <SkeletonBlock className="w-24 h-6" />
          <SkeletonBlock className="w-24 h-6" />
        </div>
      </div>

      {/* 2. SKELETON DO BANNER PRINCIPAL DE DESTAQUE (Imitando o topo da Home) */}
      <div className="relative w-full h-[450px] md:h-[550px] bg-gray-900 px-6 py-20 flex flex-col justify-end">
        {/* Simula a categoria */}
        <SkeletonBlock className="w-32 h-6 bg-gray-700 mb-4" /> 
        {/* Simula o título grande */}
        <SkeletonBlock className="w-3/4 h-12 bg-gray-700 mb-6" /> 
        {/* Simula a descrição */}
        <SkeletonBlock className="w-1/2 h-5 bg-gray-700 mb-2" /> 
        <SkeletonBlock className="w-1/3 h-5 bg-gray-700" />
      </div>

      {/* 3. SKELETON DA GRADE DE NOTÍCIAS (Imitando os cards de baixo) */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Geramos 6 cards de esqueleto "falsos" */}
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex flex-col border border-gray-100 rounded-2xl p-4 shadow-sm">
              {/* Imagem do Card (h-52 como no seu CardNoticia) */}
              <SkeletonBlock className="w-full h-52 rounded-xl mb-4" />
              {/* Nicho (Categoria) */}
              <SkeletonBlock className="w-24 h-5 mb-2" />
              {/* Título do Card */}
              <SkeletonBlock className="w-full h-7 mb-3" />
              <SkeletonBlock className="w-3/4 h-7 mb-6" />
              {/* Resumo */}
              <SkeletonBlock className="w-full h-4 mb-1.5" />
              <SkeletonBlock className="w-full h-4 mb-1.5" />
              <SkeletonBlock className="w-1/2 h-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}