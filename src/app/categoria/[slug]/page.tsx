import { performRequest } from "../../../lib/datocms";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import CardNoticia from "../../../components/CardNoticia";
import { PostDato, NoticiaProps } from "../../../types";

const CATEGORIA_QUERY = `
  query CategoryPage($nicho: String) {
    allPosts(filter: {category: {eq: $nicho}}, orderBy: date_DESC) {
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

export default async function PageCategoria({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await params;
  const slugDaUrl = resolvedParams.slug;

  // Ajuste para garantir que a busca bata com o DatoCMS (Ex: "esportes" -> "Esportes")
  const nichoParaFiltrar = slugDaUrl.charAt(0).toUpperCase() + slugDaUrl.slice(1);

  const data = await performRequest({ 
    query: CATEGORIA_QUERY, 
    variables: { nicho: nichoParaFiltrar } 
  });

  const noticiasFiltradas: PostDato[] = data.allPosts;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ANÚNCIO (AD) - POSIÇÃO FIXA LOGO ABAIXO DA NAVBAR */}
      <div className="w-full bg-[#f0f0f0] py-8 flex justify-center border-b border-gray-200">
        <div className="w-[300px] h-[80px] md:w-[728px] md:h-[90px] bg-gray-300 flex items-center justify-center border border-gray-400">
           <span className="text-gray-500 font-mono text-sm tracking-widest">ANÚNCIO (AD)</span>
        </div>
      </div>

      {/* CABEÇALHO CLEAN (Igual ao seu Figma) */}
      <header className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="flex flex-col gap-2">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em]">
            Nicho:
          </span>
          <div className="flex items-center gap-4">
            <h1 className="text-black text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
              {nichoParaFiltrar}
            </h1>
            {/* Detalhe visual da barrinha lateral ou inferior se quiser manter a identidade */}
            <div className="h-10 w-2 bg-[#A32222] hidden md:block"></div>
          </div>
          <div className="h-1 w-full bg-gray-100 mt-6"></div>
        </div>
      </header>

      {/* LISTAGEM DE NOTÍCIAS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        {noticiasFiltradas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {noticiasFiltradas.map((post) => {
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
        ) : (
          <div className="text-center py-20 bg-[#F9F9F9] rounded-2xl">
            <p className="text-gray-500 font-bold uppercase italic">
              Nenhuma matéria encontrada em {nichoParaFiltrar}.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}