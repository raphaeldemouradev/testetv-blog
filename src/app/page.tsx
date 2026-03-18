import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardNoticia from "../components/CardNoticia";
import { performRequest } from "../lib/datocms";
import { PostDato, NoticiaProps } from "../types";
import Link from "next/link";
import Image from "next/image";

const HOME_QUERY = `
  query {
    allPosts(orderBy: date_DESC) {
      id
      title
      description
      slug
      category
      date
      image {
        url
      }
    }
  }
`;

export default async function Home() {
  //await new Promise((resolve) => setTimeout(resolve, 5000)); // Trava por 5 segundos

  const data = await performRequest({ query: HOME_QUERY });
  const noticias: PostDato[] = data.allPosts;

  const destaque = noticias[0];
  const maisRecentes = noticias.slice(1);

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* 1. BANNER PRINCIPAL (Destaque conforme sua descrição) */}
      {destaque && (
        <section className="relative w-full h-[60vh] md:h-[80vh] bg-gray-900 overflow-hidden">
          {/* Imagem de Fundo Otimizada (LCP Pro) */}
          <div className="absolute inset-0 z-0"> {/* Div pai para garantir o posicionamento absoluto */}
            {destaque.image?.url ? (
              <Image
                src={destaque.image.url}
                alt={destaque.title || "Imagem de destaque"}
                fill // Faz a imagem preencher a div (ótimo para design de fundo)
                className="object-cover object-center opacity-70 transition-opacity duration-700" // Mantém o object-cover e a opacidade
                sizes="100vw" // Informa ao Next que essa imagem ocupa toda a largura da tela
                priority // MUITO IMPORTANTE: Diz ao Next.js para carregar essa imagem IMEDIATAMENTE (melhora muito a nota do Google)
                quality={85} // Ajuste opcional de qualidade para balancear peso e visual (padrão é 75)
              />
            ) : (
              <div className="w-full h-full bg-gray-900" /> // Fallback simples para quando não houver imagem
            )}
          </div>
          
          {/* Overlay escuro para garantir leitura do texto branco */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          {/* Conteúdo posicionado na lateral esquerda/baixo (Onde estaria o X) */}
          <div className="absolute bottom-12 left-6 md:left-12 max-w-2xl z-10">
            <Link href={`/noticia/${destaque.slug}`} className="group">
              <h1 className="text-white text-3xl md:text-5xl font-black leading-tight uppercase italic tracking-tighter decoration-[#E6C62F] underline underline-offset-8 decoration-4 group-hover:text-[#E6C62F] transition-colors">
                {destaque.title}
              </h1>
            </Link>
          </div>
        </section>
      )}

      {/* 2. ANÚNCIO (AD) - POSIÇÃO FIXA LOGO ABAIXO DO BANNER */}
      <div className="w-full bg-[#f0f0f0] py-8 flex justify-center border-b border-gray-200">
        <div className="w-[300px] h-[100px] md:w-[728px] md:h-[90px] bg-gray-300 flex items-center justify-center border border-gray-400">
           <span className="text-gray-500 font-mono text-sm tracking-widest">ANÚNCIO (AD)</span>
        </div>
      </div>

      {/* 3. SEÇÃO MAIS RECENTES (Feed de Nicho) */}
      <section className="max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-black uppercase italic tracking-tighter border-l-8 border-[#A32222] pl-4">
            Mais recentes
          </h2>
        </div>

        {/* Grid de Cards conforme o Figma */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {maisRecentes.map((post) => {
            const props: NoticiaProps = {
              titulo: post.title,
              imagemUrl: post.image?.url || "",
              descricao: post.description,
              categoria: post.category,
              slug: post.slug,
              data: post.date
            };

            return <CardNoticia key={post.id} noticia={props} />;
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}