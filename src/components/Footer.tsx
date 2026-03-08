export default function Footer() {
  return (
    <footer className="bg-[#E6C62F] text-[#3A3A3A] mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Lado Esquerdo: Logo e Descrição */}
        <div>
          <div className="flex items-center gap-1 mb-4">
            <span className="bg-[#3A3A3A] text-white px-2 py-0.5 font-black italic">TESTE</span>
            <span className="border-2 border-[#3A3A3A] px-2 py-0.5 font-bold">TV</span>
          </div>
          <p className="text-sm font-medium leading-relaxed">
            O seu portal de entretenimento, futebol e virais. 
            Informação rápida com a energia que você precisa.
          </p>
        </div>

        {/* Centro: Links Rápidos */}
        <div className="flex flex-col gap-2">
          <h5 className="font-black uppercase text-xs mb-2 tracking-tighter">Categorias</h5>
          <a href="#" className="text-sm hover:underline font-bold">Futebol</a>
          <a href="#" className="text-sm hover:underline font-bold">Entretenimento</a>
          <a href="#" className="text-sm hover:underline font-bold">BBB / Reality</a>
        </div>

        {/* Lado Direito: Direitos e Redes */}
        <div className="flex flex-col justify-between">
          <div>
            <h5 className="font-black uppercase text-xs mb-2 tracking-tighter">Siga-nos</h5>
            <div className="flex gap-4">
              {/* Espaço para ícones sociais no futuro */}
              <div className="w-8 h-8 bg-[#3A3A3A] rounded-full"></div>
              <div className="w-8 h-8 bg-[#3A3A3A] rounded-full"></div>
            </div>
          </div>
          <p className="text-[10px] mt-6 font-bold uppercase opacity-70">
            © 2026 TESTE TV - Todos os direitos reservados.
          </p>
        </div>
      </div>
      
      {/* Barra Inferior Dark */}
      <div className="bg-[#3A3A3A] h-2 w-full"></div>
    </footer>
  );
}