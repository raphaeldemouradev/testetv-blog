import { StructuredText } from "react-datocms/structured-text";
import { performRequest } from "../../../lib/datocms";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { PostDato } from "../../../types";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  
  // Buscamos os dados da notícia para preencher o SEO
  const data = await performRequest({ 
    query: `query PostSEO($slug: String) {
      post(filter: {slug: {eq: $slug}}) {
        title
        description
        image { url }
      }
    }`, 
    variables: { slug: resolvedParams.slug } 
  });

  const noticia = data.post;

  return {
    title: noticia?.title,
    description: noticia?.description,
    openGraph: {
      title: noticia?.title,
      description: noticia?.description,
      images: [noticia?.image?.url || ""],
      type: "article",
    },
  };
}

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

  // Objeto JSON-LD (O "crachá" para o Google)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": noticia.title,
    "image": [noticia.image?.url],
    "datePublished": noticia._firstPublishedAt || noticia.date || new Date().toISOString(), //carimbo de noticia
    "dateModified": noticia._updatedAt || new Date().toISOString(), //carimbo de noticia
    "author": [{ "@type": "Person", "name": "Raphael" }],
    "description": noticia.description
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Script do JSON-LD - Injetado de forma segura */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      {/* ANÚNCIO (AD) - POSIÇÃO FIXA LOGO ABAIXO DA NAVBAR */}
      <div className="w-full bg-[#f0f0f0] py-8 flex justify-center border-b border-gray-200">
        <div className="w-[300px] h-[80px] md:w-[728px] md:h-[90px] bg-gray-300 flex items-center justify-center border border-gray-400">
           <span className="text-gray-500 font-mono text-sm tracking-widest">ANÚNCIO (AD)</span>
        </div>
      </div>

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

        {/* Imagem Principal Otimizada (SEO Pro) */}
        <div className="relative w-full h-[300px] md:h-[500px] mb-10 overflow-hidden rounded-2xl shadow-xl bg-gray-100">
          {noticia.image?.url ? (
            <Image
              src={noticia.image.url}
              alt={noticia.title || "Imagem da notícia"}
              fill // Faz a imagem preencher a div (ótimo para design responsivo)
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              sizes="(max-width: 768px) 100vw, 1024px" // Informa ao Next qual tamanho carregar
              priority // IMPORTANTE: Carrega essa imagem primeiro (melhora a nota do Google)
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 italic">
              Sem imagem disponível
            </div>
          )}
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