import type { Dolar } from '../types'

interface Props {
  produtos: Dolar[]
  total: number
  loading: boolean
  onEdit: (produto: Dolar) => void
}

const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function DolarList({ produtos, total, loading, onEdit }: Props) {
  return (
    <section className="card">
      <h2>Produtos</h2>

      {loading && <p className="info">Carregando...</p>}

      {!loading && produtos.length === 0 && (
        <p className="info">Nenhum produto cadastrado.</p>
      )}

      {produtos.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Dólar</th>
              <th>Preço (US$)</th>
              <th>Valor (R$)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.title}</td>
                <td>{brl.format(p.preco_dolar)}</td>
                <td>{usd.format(p.preco_do_produto_em_dolar)}</td>
                <td>{brl.format(p.preco_do_produto_em_reais)}</td>
                <td>
                  <button type="button" onClick={() => onEdit(p)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>Total</td>
              <td>{brl.format(total)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      )}
    </section>
  )
}
