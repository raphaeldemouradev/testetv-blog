import { StructuredText } from "react-datocms/structured-text";
import { performRequest } from "../../../lib/datocms";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { PostDato } from "../../../types";
import Link from "next/link";

// Query para buscar UMA notícia específica pelo Slug
const NOTICIA_QUERY = `
  query SinglePost($slug: String) {
    post(filter: {slug: {eq: $slug}}) {
      id
      title
      category
      date
      description
      image {
        url
      }
      content {
        value
      }
    }
  }
`;

export default async function PageNoticia({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  // Garante que o slug foi capturado corretamente da URL
  const resolvedParams = await params;
  const slug = resolvedParams.slug; 

  // Buscamos os dados passando o slug como variável
  const data = await performRequest({ 
    query: NOTICIA_QUERY, 
    variables: { slug: slug } // Aqui o Next passa o slug para a query do Dato
  });

  const noticia: PostDato = data.post;

  if (!noticia) {
    return <div className="p-20 text-center font-bold">Notícia não encontrada.</div>;
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Cabeçalho da Matéria */}
        <header className="mb-8">
          <Link href={`/categoria/${noticia.category.toLowerCase()}`}>
            <span className="text-[#e62f2f] font-black uppercase tracking-[0.2em] text-xs italic mb-4 inline-block hover:underline underline-offset-4 decoration-[#993e3e]">
              {noticia.category}
            </span>
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-[#1A1A1A] mt-4 mb-6 leading-tight uppercase italic tracking-tighter">
            {noticia.title}
          </h1>
          <p className="text-xl text-gray-500 italic mb-6 border-l-4 border-[#E6C62F] pl-4">
            {noticia.description}
          </p>
          <div className="text-gray-400 text-xs font-bold uppercase">
            Publicado em {new Date(noticia.date).toLocaleDateString('pt-BR')} • Teste TV
          </div>
        </header>

        {/* Imagem Principal */}
        <div className="w-full h-[300px] md:h-[500px] mb-10 overflow-hidden rounded-2xl shadow-xl">
          <img 
            src={noticia.image?.url} 
            alt={noticia.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Conteúdo da Matéria (Structured Text) */}
        <div className="conteudo-materia max-w-none">
          <StructuredText data={noticia.content} />
      </div>
        
        {/* Linha de fechamento estilo portal */}
        <div className="mt-16 pt-8 border-t-8 border-[#1A1A1A] flex justify-between items-center">
          <span className="font-black italic uppercase text-sm">Fim da matéria</span>
          <div className="h-2 w-20 bg-[#A32222]"></div>
        </div>
      </article>

      <Footer />
    </main>
  );
}