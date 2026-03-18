// src/app/loading.tsx
import React from 'react';

// Blocos que piscam sobre o fundo azul escuro do banner (cor azulada/cinza)
const SkeletonOnDark = ({ className }: { className?: string }) => (
  <div className={`bg-[#505f75] animate-pulse rounded ${className}`} />
);

// Blocos que piscam sobre o fundo branco
const SkeletonOnLight = ({ className }: { className?: string }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

// O bloco do Anúncio (AD) em cinza claro, fora do quadro escuro
const SkeletonAD = ({ className }: { className?: string }) => (
  <div className={`bg-[#c1c6cd] animate-pulse rounded flex items-center justify-center ${className}`} >
    <span className="text-[#3a4759] font-mono text-xs uppercase tracking-widest opacity-40">
        Anúncio (AD)
    </span>
  </div>
);

export default function LoadingHome() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      
      {/* --- 1. NAVBAR RESTAURADA E FIEL (Cores da Imagem 16) --- */}
      {/* Fundo #1A1A1A e borda inferior #E6C62F */}
      <nav className="w-full bg-[#1A1A1A] border-b border-[#E6C62F]/30 sticky top-0 z-50 h-16 shadow-lg">
        <div className="max-w-7xl mx-auto px-5 h-full flex items-center justify-between">
          
          {/* LOGO 'TESTE TV' - Esqueleto fiel ao estilo da Imagem 16 */}
          <div className="flex items-center">
            {/* Div com borda amarela #E6C62F */}
            <div className="flex border-2 border-[#E6C62F] font-black italic tracking-tighter uppercase text-sm rounded">
              {/* Parte "Teste" - Fundo Amarelo #E6C62F */}
              <div className="bg-[#E6C62F] animate-pulse w-14 h-6 flex items-center justify-center px-2 py-1">
                <div className="w-10 h-3 bg-black/40 rounded-sm"></div> {/* Esqueleto do texto */}
              </div>
              {/* Parte "TV" - Fundo Branco */}
              <div className="bg-white animate-pulse w-10 h-6 flex items-center justify-center px-2 py-1">
                <div className="w-6 h-3 bg-gray-400/80 rounded-sm"></div> {/* Esqueleto do texto */}
              </div>
            </div>
          </div>

          {/* MENU HAMBÚRGUER AMARELO #E6C62F */}
          <div className="flex flex-col gap-1.5">
            <div className="w-7 h-1 bg-[#E6C62F] animate-pulse rounded"></div>
            <div className="w-7 h-1 bg-[#E6C62F] animate-pulse rounded"></div>
            <div className="w-7 h-1 bg-[#E6C62F] animate-pulse rounded"></div>
          </div>
        </div>
      </nav>
      {/* --- FIM DA NAVBAR --- */}

      {/* --- 2. QUADRO SUPERIOR (FUNDO AZUL ESCURO) --- */}
      {/* Alturas baseadas no seu código Home (60vh mobile / 80vh desktop) */}
      <section className="relative w-full h-[60vh] md:h-[80vh] bg-[#1a2331] px-6 pt-12">
        
        {/* TEXTO DE DESTAQUE SIMULADO (3 linhas) */}
        {/* Adicionado max-w-full e w-full para blindar contra vazamento */}
        <div className="absolute bottom-12 left-6 md:left-12 space-y-3 w-full max-w-[calc(100%-48px)] z-10">
          <SkeletonOnDark className="w-full h-10" />
          <SkeletonOnDark className="w-full h-10" />
          <SkeletonOnDark className="w-2/3 h-10" />
        </div>
      </section>

      {/* --- 3. ESPAÇO DO ANÚNCIO (AD) - FORA DO QUADRO, CINZA CLARO --- */}
      <div className="px-6 py-8 flex justify-center -mt-2 mb-8">
        <SkeletonAD className="w-full h-[150px]" />
      </div>

      {/* --- 4. SEÇÃO INFERIOR (FUNDO CLARO) --- */}
      <div className="px-6 py-4 opacity-50">
        {/* TÍTULO 'MAIS RECENTES' SIMULADO */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1 h-6 bg-red-600 rounded"></div>
          <span className="text-xl font-black text-gray-900 uppercase italic tracking-tight">
            Mais Recentes
          </span>
        </div>

        {/* CÍRCULO 'N' SIMULADO NO RODAPÉ */}
        <div className="w-10 h-10 bg-gray-700 animate-pulse rounded-full flex items-center justify-center">
            <span className="text-gray-500 font-bold">N</span>
        </div>
      </div>
    </div>
  );
}