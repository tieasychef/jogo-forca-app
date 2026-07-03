export type Categoria =
  | 'Animais'
  | 'Filmes'
  | 'Tecnologia'
  | 'Países'
  | 'Estados brasileiros'
  | 'Profissões'
  | 'Objetos'
  | 'Comidas'
  | 'Esportes'
  | 'Música'
  | 'Marcas'
  | 'Jogos'
  | 'Ciência'

export type Dificuldade = 'facil' | 'medio' | 'dificil'

export interface Palavra {
  palavra: string
  dica: string
  categoria: Categoria
}
