"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-[#3A3A3A] text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
        
        {/* LOGOTIPO - Funciona como botão Home em todas as versões */}
        <Link href="/">
          <div className="flex items-center gap-1 group cursor-pointer">
            <div className="bg-[#E6C62F] text-[#3A3A3A] px-2 py-1 font-black italic text-xl group-hover:bg-white transition-all duration-300">
              TESTE
            </div>
            <div className="border-2 border-[#E6C62F] px-2 py-0.5 font-bold text-xl group-hover:border-white transition-all duration-300">
              TV
            </div>
          </div>
        </Link>
        
        {/* LINKS PARA DESKTOP (Invisível no Mobile, Visível no md:flex) */}
        {/* Adicionei o efeito de linha amarela (underline) que aparece no hover */}
        <div className="hidden md:flex items-center gap-8 font-bold uppercase text-xs tracking-[0.2em]">
          <Link href="/categoria/futebol" className="relative pb-1 group/link">
            Futebol
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E6C62F] transition-all duration-300 group-hover/link:w-full"></span>
          </Link>
          <Link href="/categoria/filmes" className="relative pb-1 group/link">
            Filmes
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E6C62F] transition-all duration-300 group-hover/link:w-full"></span>
          </Link>
          <Link href="/categoria/reality" className="relative pb-1 group/link">
            Reality
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E6C62F] transition-all duration-300 group-hover/link:w-full"></span>
          </Link>
          <Link href="/categoria/jogos" className="relative pb-1 group/link">
            Jogos
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E6C62F] transition-all duration-300 group-hover/link:w-full"></span>
          </Link>
        </div>

        {/* BOTÃO HAMBÚRGUER (Visível apenas no Mobile) */}
        <button 
          onClick={() => setIsOpen(true)} 
          className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
        >
          <div className="w-8 h-1 bg-white"></div>
          <div className="w-8 h-1 bg-[#E6C62F]"></div>
          <div className="w-8 h-1 bg-white"></div>
        </button>
      </nav>

      {/* MENU MOBILE (DRAWER) */}
      {/* O overlay escuro aparece com fade-in */}
      <div 
        className={`fixed inset-0 z-[60] flex transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Fundo escuro que fecha o menu ao clicar */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>

        {/* Conteúdo do Menu lateral (abre da esquerda para a direita) */}
        <div 
          className={`relative bg-[#3A3A3A] w-3/4 max-w-xs h-full shadow-2xl transition-transform duration-500 ease-in-out p-8 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Botão para fechar o menu */}
          <button 
            onClick={() => setIsOpen(false)} 
            className="absolute top-5 right-5 text-[#E6C62F] text-4xl leading-none"
          >
            &times;
          </button>

          <div className="mt-12 flex flex-col gap-8 text-white font-bold text-xl uppercase tracking-wider">
            {/* Link Home explícito apenas no mobile */}
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)} 
              className="text-[#E6C62F] border-b border-gray-600 pb-2 mb-2 flex items-center gap-2"
            >
              🏠 Home
            </Link>
            
            <Link href="/categoria/futebol" onClick={() => setIsOpen(false)} className="hover:text-[#E6C62F]">Futebol</Link>
            <Link href="/categoria/filmes" onClick={() => setIsOpen(false)} className="hover:text-[#E6C62F]">Filmes</Link>
            <Link href="/categoria/reality" onClick={() => setIsOpen(false)} className="hover:text-[#E6C62F]">Reality</Link>
            <Link href="/categoria/jogos" onClick={() => setIsOpen(false)} className="hover:text-[#E6C62F]">Jogos</Link>
          </div>

          <div className="absolute bottom-8 left-8">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Teste TV v1.0</p>
          </div>
        </div>
      </div>
    </>
  );
}