import { noticias } from "../../../lib/data";
import CardNoticia from "../../../components/CardNoticia";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Categoria } from "../../../types";

// Definimos como 'async' para aguardar os parâmetros da URL
export default async function PaginaCategoria({ params }: { params: Promise<{ slug: string }> }) {
  
  // Aguarda a resolução dos parâmetros (Padrão Next.js 15)
  const { slug } = await params;

  // Se o slug não existir, retornamos nulo para evitar erros de renderização
  if (!slug) return null;

  // Transforma o slug (ex: 'jogos') no formato do Nicho (ex: 'Jogos')
  const nomeCategoria = (slug.charAt(0).toUpperCase() + slug.slice(1)) as Categoria;

  // Filtra as notícias baseadas no nicho correspondente
  const noticiasFiltradas = noticias.filter(n => n.nicho === nomeCategoria);

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <section className="max-w-7xl mx-auto p-6 flex-grow w-full">
        {/* Cabeçalho da Categoria com a identidade visual do Teste TV */}
        <header className="mb-12 border-b-4 border-[#E6C62F] pb-4">
          <h1 className="text-4xl font-black text-[#3A3A3A] uppercase tracking-tighter">
            Categoria: <span className="text-[#188E9E]">{nomeCategoria}</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Tudo o que você precisa saber sobre {nomeCategoria.toLowerCase()} está aqui.
          </p>
        </header>

        {/* Listagem de Posts ou mensagem de erro amigável */}
        {noticiasFiltradas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {noticiasFiltradas.map((item) => (
              <CardNoticia key={item.id} noticia={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-xl text-gray-400 font-bold uppercase">
              Nenhum post encontrado em {nomeCategoria}.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Tente selecionar outra categoria no menu superior.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}