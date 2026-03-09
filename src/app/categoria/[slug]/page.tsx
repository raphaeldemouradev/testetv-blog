import { noticias } from "../../../lib/data";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import CardNoticia from "../../../components/CardNoticia";

export default async function PaginaCategoria({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Mapeamento para garantir que o título apareça bonito na tela
  const nomesCategorias: Record<string, string> = {
    esportes: "Esportes",
    entretenimento: "Entretenimento",
    "jogos-de-videogame": "Videogame",
  };

  const nomeExibicao = nomesCategorias[slug.toLowerCase()] || slug;

  // 2. Filtra as notícias: apenas as que batem com o nicho clicado
  const noticiasFiltradas = noticias.filter(
    (n) => n.categoria.toLowerCase().replace(/ /g, "-") === slug.toLowerCase()
  );

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <section className="max-w-7xl mx-auto p-6 md:p-12 w-full flex-grow">
        {/* Header do Feed do Nicho */}
        <header className="py-10 border-b-8 border-[#188E9E] mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-[#3A3A3A] uppercase italic tracking-tighter">
            Explorar: <span className="text-[#A32222]">{nomeExibicao}</span>
          </h1>
          <p className="text-gray-500 mt-4 text-lg font-medium">
            Tudo o que aconteceu de mais importante em {nomeExibicao}.
          </p>
        </header>

        {/* Listagem dos Posts do Nicho */}
        {noticiasFiltradas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {noticiasFiltradas.map((item) => (
              <CardNoticia 
                key={item.id} 
                noticia={item} 
                exibirCategoria={false} // Ocultamos o nicho vermelho aqui para não ficar repetitivo
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-bold text-gray-300 uppercase italic">Nenhum post encontrado.</h2>
            <p className="text-gray-400">Em breve novos conteúdos de {nomeExibicao} aqui no Teste TV.</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}