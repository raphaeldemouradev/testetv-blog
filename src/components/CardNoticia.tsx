import Link from "next/link";
import { Noticia } from "../types";

interface CardProps {
  noticia: Noticia;
  exibirCategoria?: boolean;
}

export default function CardNoticia({ noticia, exibirCategoria = true }: CardProps) {
  return (
    <article className="flex flex-col gap-2 bg-white">
      
      {/* 1. IMAGEM PRIMEIRO (Conforme seu novo layout) */}
      <Link href={`/noticia/${noticia.slug}`} className="group block">
        <div className="relative aspect-video overflow-hidden rounded-2xl shadow-sm bg-gray-100">
          <img 
            src={noticia.imagemUrl} 
            alt={noticia.titulo}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>

      <div className="flex flex-col gap-1 mt-1">
        
        {/* 2. NICHO EM BAIXO DA IMAGEM (Em Vermelho) */}
        {exibirCategoria && (
          <Link 
            href={`/categoria/${noticia.categoria.toLowerCase().replace(/ /g, "-")}`}
            className="text-[#A32222] font-black text-[10px] uppercase tracking-tighter hover:text-[#3A3A3A] w-fit"
          >
            {noticia.categoria}
          </Link>
        )}

        {/* 3. TÍTULO -> Máximo 3 linhas */}
        <Link href={`/noticia/${noticia.slug}`} className="group/text">
          <h2 className="text-[#3A3A3A] font-black text-xl leading-tight line-clamp-3 group-hover/text:text-[#188E9E] transition-colors">
            {noticia.titulo}
          </h2>
        </Link>

        {/* 4. DESCRIÇÃO -> Máximo 4 linhas */}
        <p className="text-gray-500 text-sm leading-snug line-clamp-4 mt-1">
          {noticia.descricao}
        </p>

        {/* 5. DATA */}
        <time className="text-gray-400 text-[10px] font-medium mt-1 uppercase">
          {noticia.data}
        </time>
      </div>
    </article>
  );
}