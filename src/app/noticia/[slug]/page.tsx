import { noticias } from "../../../lib/data";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import CardNoticia from "../../../components/CardNoticia";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function PaginaNoticia({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Localiza a notícia pelo slug
  const noticia = noticias.find((n) => n.slug === slug);

  if (!noticia) {
    return notFound();
  }

  // 2. Lógica de Relacionados: Filtra por categoria e exclui a notícia atual
  const relacionados = noticias
    .filter((n) => n.categoria === noticia.categoria && n.id !== noticia.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* ÁREA DA MATÉRIA */}
      <article className="max-w-4xl mx-auto p-6 md:p-12 w-full flex-grow">
        <header className="mb-8">
          {/* Link do Nicho em Vermelho */}
          <Link 
            href={`/categoria/${noticia.categoria.toLowerCase().replace(/ /g, "-")}`}
            className="text-[#A32222] font-black text-sm uppercase tracking-widest hover:underline"
          >
            {noticia.categoria}
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-black text-[#3A3A3A] mt-4 leading-tight italic">
            {noticia.titulo}
          </h1>
          
          <div className="flex items-center gap-4 mt-6 text-gray-400 text-xs font-bold uppercase tracking-widest">
            <span>Por Redação Teste TV</span>
            <span>•</span>
            <time>{noticia.data}</time>
          </div>
        </header>

        {/* Imagem de Destaque */}
        <div className="w-full aspect-video rounded-3xl overflow-hidden mb-10 shadow-xl bg-gray-100">
          <img 
            src={noticia.imagemUrl} 
            alt={noticia.titulo}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Corpo do Texto */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-medium">
          <p className="mb-6 text-xl text-[#3A3A3A] font-bold italic border-l-4 border-[#E6C62F] pl-4">
            {noticia.descricao}
          </p>
          
          <p className="mb-4">
            Este é o ambiente de teste para o portal. Aqui o conteúdo completo da matéria 
            será exibido de forma fluida e responsiva, garantindo que a experiência 
            mobile-first seja respeitada em todos os dispositivos.
          </p>
          
          <p>
            Abaixo, você encontrará as sugestões baseadas no nicho de **{noticia.categoria}**, 
            mantendo você sempre por dentro das novidades do Teste TV.
          </p>
        </div>

        {/* SEÇÃO DE RELACIONADOS / SUGESTÕES */}
        {relacionados.length > 0 && (
          <section className="mt-20 pt-10 border-t-8 border-[#188E9E]">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-3xl font-black text-[#3A3A3A] uppercase italic tracking-tighter">
                Veja também <br />
                <span className="text-[#A32222]">Relacionados</span>
              </h2>
              <Link 
                href={`/categoria/${noticia.categoria.toLowerCase().replace(/ /g, "-")}`}
                className="text-xs font-black uppercase border-b-2 border-[#E6C62F] pb-1 hover:text-[#188E9E] transition-colors"
              >
                Ver tudo
              </Link>
            </div>
            
            {/* Grid de Sugestões usando seu CardNoticia */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {relacionados.map((item) => (
                <CardNoticia 
                  key={item.id} 
                  noticia={item} 
                  exibirCategoria={false} // Limpamos o nicho pois já estamos dentro da categoria
                />
              ))}
            </div>
          </section>
        )}
      </article>

      <Footer />
    </main>
  );
}