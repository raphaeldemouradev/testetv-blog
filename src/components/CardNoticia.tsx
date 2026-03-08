import Link from "next/link";
import { Noticia } from "../types";

export default function CardNoticia({ noticia }: { noticia: Noticia }) {
  return (
    <article className="flex flex-col gap-3 group cursor-pointer pb-6 border-b border-gray-200">
      {/* Imagem com proporção fixa (Aspect Ratio) */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
        <img 
          src={noticia.imagemUrl} 
          alt={noticia.titulo}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Link para a Categoria (Nicho) - Corrigido para /categoria/ */}
      <Link href={`/categoria/${noticia.nicho.toLowerCase()}`}>
        <span className="text-[#188E9E] font-bold text-xs uppercase tracking-widest mt-2 hover:underline inline-block">
          {noticia.nicho}
        </span>
      </Link>

      {/* Título - Link para a notícia individual (slug) - Corrigido para /noticia/ */}
      <Link href={`/noticia/${noticia.slug}`}>
        <h4 className="text-[#3A3A3A] font-bold text-xl leading-tight line-clamp-3 group-hover:text-[#188E9E] transition-colors">
          {noticia.titulo}
        </h4>
      </Link>

      {/* Descrição curta (máximo 2 linhas) */}
      <p className="text-gray-600 text-sm line-clamp-2">
        {noticia.descricao}
      </p>

      {/* Data da Postagem */}
      <time className="text-gray-400 text-xs font-medium">
        {noticia.data}
      </time>
    </article>
  );
}