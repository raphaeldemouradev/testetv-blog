export interface Noticia {
  id: number;
  categoria: string; // Ex: "Esportes", "Games", "Filmes"
  titulo: string;
  descricao: string;
  slug: string;
  imagemUrl: string;
  data: string;
}