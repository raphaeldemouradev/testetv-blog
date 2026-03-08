export type Categoria = 'Futebol' | 'Filmes' | 'Reality' | 'Jogos';

export interface Noticia {
  id: number;
  nicho: Categoria;
  titulo: string;
  descricao: string;
  data: string;
  imagemUrl: string;
  slug: string; // Importante para as futuras páginas individuais
}