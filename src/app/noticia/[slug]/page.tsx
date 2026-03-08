import { noticias } from "../../../lib/data";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { notFound } from "next/navigation";

// Adicione esta função acima do seu componente PaginaNoticia
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const noticia = noticias.find((n) => n.slug === slug);
  
  return {
    title: noticia ? `${noticia.titulo} | Teste TV` : "Notícia não encontrada",
    description: noticia?.descricao,
  };
}

export default async function PaginaNoticia({ params }: { params: Promise<{ slug: string }> }) {
  
  const { slug } = await params;

  // Busca a notícia específica pelo slug no nosso arquivo de dados
  const noticia = noticias.find((n) => n.slug === slug);

  // Se o slug não existir no data.ts, mostra a página 404 do Next.js
  if (!noticia) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <article className="max-w-4xl mx-auto p-6 flex-grow w-full">
        {/* CABEÇALHO DO ARTIGO */}
        <header className="py-8">
          <span className="bg-[#188E9E] text-white text-xs font-bold px-3 py-1 uppercase rounded-sm">
            {noticia.nicho}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#3A3A3A] mt-4 leading-tight">
            {noticia.titulo}
          </h1>
          <div className="mt-6 flex items-center gap-4 text-gray-500 text-sm border-y border-gray-100 py-4">
            <span>Por: <strong>Redação Teste TV</strong></span>
            <span>•</span>
            <time>{noticia.data}</time>
          </div>
        </header>

        {/* IMAGEM PRINCIPAL */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
          <img 
            src={noticia.imagemUrl} 
            alt={noticia.titulo}
            className="object-cover w-full h-full"
          />
        </div>

        {/* CONTEÚDO DA MATÉRIA */}
        <div className="mt-10 prose prose-lg max-w-none text-gray-800 leading-relaxed">
          <p className="text-xl font-medium text-gray-600 mb-6 italic border-l-4 border-[#E6C62F] pl-4">
            {noticia.descricao}
          </p>
          
          {/* Aqui simulamos o corpo do texto que viria de um banco de dados */}
          <p className="mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          
          <h2 className="text-2xl font-bold text-[#3A3A3A] mt-8 mb-4 italic">
            O que esperar dos próximos desdobramentos?
          </h2>
          
          <p className="mb-6">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <div className="bg-gray-100 p-6 rounded-lg my-10 border-t-4 border-[#3A3A3A]">
            <p className="text-sm font-bold text-[#3A3A3A] uppercase mb-2">💡 Fique por dentro:</p>
            <p className="text-sm italic">O Teste TV continuará acompanhando este caso de perto. Ative as notificações para receber atualizações em tempo real.</p>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}