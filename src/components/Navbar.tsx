"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Fecha o menu lateral ao clicar em um link
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* NAVBAR PRINCIPAL (Estilo Foto 1) */}
      <nav className="w-full bg-[#1A1A1A] border-b border-gray-800 sticky top-0 z-50 h-16 shadow-lg">
        <div className="max-w-7xl mx-auto px-5 h-full flex items-center justify-between">
          
          {/* LOGO: TESTE TV (Caixas separadas conforme a imagem) */}
          <Link href="/" className="flex items-center">
            <div className="flex border-2 border-[#E6C62F] font-black italic tracking-tighter uppercase text-sm">
              <span className="bg-[#E6C62F] text-black px-2 py-1">Teste</span>
              <span className="text-white px-2 py-1">TV</span>
            </div>
          </Link>

          {/* BOTÃO HAMBÚRGUER (3 Riscos coloridos da foto) */}
          <button 
            onClick={() => setIsOpen(true)}
            className="flex flex-col gap-1.5 p-2 focus:outline-none"
          >
            <div className="w-7 h-1 bg-[#E6C62F]"></div>
            <div className="w-7 h-1 bg-white"></div>
            <div className="w-7 h-1 bg-[#E6C62F]"></div>
          </button>
        </div>
      </nav>

      {/* SIDEBAR (MENU LATERAL - Estilo Foto 4) */}
      <aside 
        className={`fixed inset-0 z-[60] transition-all duration-500 ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        {/* Fundo escuro com desfoque ao abrir */}
        <div 
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        ></div>
        
        {/* Painel do Menu Lateral */}
        <div className={`relative w-72 bg-[#232323] h-full shadow-2xl transition-transform duration-500 ease-in-out p-10 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
          
          {/* Botão de Fechar */}
          <button 
            onClick={closeMenu} 
            className="text-[#E6C62F] font-black self-end text-2xl hover:scale-110 transition-transform"
          >
            ✕
          </button>

          {/* CATEGORIAS AJUSTADAS (Esportes, Entretenimento e Videogame) */}
          <nav className="flex flex-col gap-8 mt-10 text-white font-black uppercase italic tracking-[0.2em] text-lg">
            <Link href="/" onClick={closeMenu} className="text-[#E6C62F] border-b border-[#E6C62F]/20 pb-2">
              🏠 HOME
            </Link>
            
            <Link href="/categoria/esportes" onClick={closeMenu} className="hover:text-[#E6C62F] transition-colors">
              Esportes
            </Link>
            
            <Link href="/categoria/entretenimento" onClick={closeMenu} className="hover:text-[#E6C62F] transition-colors">
              Entretenimento
            </Link>
            
            <Link href="/categoria/jogos-de-videogame" onClick={closeMenu} className="hover:text-[#E6C62F] transition-colors">
              Videogame
            </Link>
          </nav>

          {/* RODAPÉ DO MENU (Círculo com N e Versão) */}
          <div className="mt-auto flex items-center gap-3 py-4 border-t border-white/10">
            <div className="w-8 h-8 bg-[#E6C62F] rounded-full flex items-center justify-center text-black font-black text-xs">
              N
            </div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              Teste TV V1.0
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}