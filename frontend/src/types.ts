export interface DolarCreate {
  title: string
  preco_dolar: number
  preco_do_produto_em_dolar: number
}

export interface Dolar {
  id: number
  title: string
  preco_dolar: number
  preco_do_produto_em_dolar: number
  preco_do_produto_em_reais: number
}

export interface DolarListResponse {
  produto: Dolar[]
  total: number
}
