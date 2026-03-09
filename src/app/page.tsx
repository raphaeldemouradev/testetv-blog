import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardNoticia from "../components/CardNoticia";
import { noticias } from "../lib/data";

export default function Home() {
  // A primeira notícia é o destaque (Hero)
  const noticiaHero = noticias[0];
  
  // Pegamos apenas as 5 notícias seguintes para o feed
  const feedHome = noticias.slice(1, 6);

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* SEÇÃO HERO - Mobile First (50% da tela) */}
      {noticiaHero && (
        <Link href={`/noticia/${noticiaHero.slug}`} className="group block w-full relative">
          <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden bg-black">
            <img 
              src={noticiaHero.imagemUrl} 
              alt={noticiaHero.titulo}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70"
            />
            {/* Overlay para destaque do texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

            <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 z-20 flex flex-col gap-3">
              <span className="text-[#E6C62F] font-black uppercase text-[10px] tracking-widest bg-black/60 px-2 py-1 w-fit italic">
                Destaque da Semana
              </span>
              <h1 className="text-3xl md:text-6xl font-black italic text-white leading-tight line-clamp-3">
                {noticiaHero.titulo}
              </h1>
              <p className="text-gray-200 text-sm md:text-lg font-medium max-w-2xl line-clamp-2">
                Clique para conferir os detalhes desta notícia completa no Teste TV.
              </p>
            </div>
          </section>
        </Link>
      )}

      {/* FEED PRINCIPAL - 5 Posts */}
      <section className="max-w-7xl mx-auto p-6 md:p-12 w-full flex-grow">
        <header className="mb-10 border-b-8 border-[#188E9E] w-fit">
          <h2 className="text-4xl font-black text-[#3A3A3A] uppercase italic tracking-tighter pb-2">
            Mais recentes
          </h2>
        </header>

        {/* Grid responsivo: 1 coluna no mobile, 3 no desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {feedHome.map((item) => (
            <CardNoticia 
              key={item.id} 
              noticia={item} 
              exibirCategoria={true} // Mantém o nicho vermelho abaixo da imagem
            />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}