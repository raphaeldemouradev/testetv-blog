import Navbar from "../components/Navbar";
import CardNoticia from "../components/CardNoticia";
import Footer from "../components/Footer";
import { noticias } from "../lib/data";

export default function Home() {
  // Pegamos a primeira notícia para ser o destaque (Hero)
  const noticiaDestaque = noticias[0];

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      {/* SEÇÃO DESTAQUE (HERO) */}
      <section 
        className="relative h-[450px] w-full flex items-end bg-cover bg-center"
        style={{ 
          backgroundImage: `url('${noticiaDestaque.imagemUrl}')` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        <div className="relative z-10 p-6 md:p-12 w-full max-w-4xl text-left">
          <span className="bg-[#E6C62F] text-black text-xs font-bold px-3 py-1 uppercase rounded-sm">
            Destaque: {noticiaDestaque.nicho}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-4 leading-tight drop-shadow-lg">
            {noticiaDestaque.titulo}
          </h2>
          <button className="mt-6 bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-[#E6C62F] transition-all transform hover:scale-105">
            Confira mais detalhes
          </button>
        </div>
      </section>

      {/* SEÇÃO MAIS RECENTES */}
      <section className="max-w-7xl mx-auto p-6 w-full flex-grow">
        <h3 className="text-2xl font-bold text-[#3A3A3A] border-l-8 border-[#E6C62F] pl-4 uppercase mb-8">
          Mais recentes
        </h3>
        
        {/* Grid de Notícias: 1 no mobile, 2 no tablet, 4 no desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {noticias.map((item) => (
            <CardNoticia key={item.id} noticia={item} />
          ))}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}