import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#E6C62F] text-black w-full mt-auto">
      {/* GRID DE 4 COLUNAS: 
        - No Mobile: 1 coluna (grid-cols-1)
        - No Computador: 4 colunas (md:grid-cols-4)
        - Gap 12 para dar o espaçamento que você mencionou
      */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* COLUNA 1: LOGO E DESCRIÇÃO */}
        <div className="flex flex-col gap-4">
          <div className="flex border-2 border-black font-black italic tracking-tighter uppercase text-xs w-fit">
            <span className="bg-black text-white px-2 py-1">Teste</span>
            <span className="px-2 py-1">TV</span>
          </div>
          <p className="text-sm font-bold leading-tight">
            O seu portal de entretenimento, esportes e games. 
            Informação rápida com a energia que você precisa.
          </p>
        </div>

        {/* COLUNA 2: CATEGORIAS */}
        <div className="flex flex-col gap-4">
          <h4 className="font-black uppercase tracking-tighter text-sm border-b-2 border-black/10 w-fit">
            Categorias
          </h4>
          <ul className="flex flex-col gap-2 font-bold text-sm">
            <li><Link href="/categoria/esportes" className="hover:underline">Esportes</Link></li>
            <li><Link href="/categoria/entretenimento" className="hover:underline">Entretenimento</Link></li>
            <li><Link href="/categoria/jogos-de-videogame" className="hover:underline">Videogame</Link></li>
          </ul>
        </div>

        {/* COLUNA 3: INSTITUCIONAL */}
        <div className="flex flex-col gap-4">
          <h4 className="font-black uppercase tracking-tighter text-sm border-b-2 border-black/10 w-fit">
            Projeto
          </h4>
          <ul className="flex flex-col gap-2 font-bold text-sm">
            <li><Link href="/" className="hover:underline">Página Inicial</Link></li>
            <li><span className="opacity-50">Sobre o Teste</span></li>
            <li><span className="opacity-50">Anuncie Aqui</span></li>
          </ul>
        </div>

        {/* COLUNA 4: REDES SOCIAIS (Círculos pretos da foto) */}
        <div className="flex flex-col gap-4">
          <h4 className="font-black uppercase tracking-tighter text-sm border-b-2 border-black/10 w-fit">
            Siga-nos
          </h4>
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-[#E6C62F] font-bold">
              f
            </div>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-[#E6C62F] font-bold">
              ig
            </div>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-[#E6C62F] font-bold">
              yt
            </div>
          </div>
        </div>
      </div>

      {/* LINHA FINAL DE DIREITOS */}
      <div className="border-t border-black/10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest">
          <p>© 2026 Teste TV - Todos os direitos reservados</p>
          <p>Desenvolvido por Raphael de Moura</p>
        </div>
      </div>
    </footer>
  );
}