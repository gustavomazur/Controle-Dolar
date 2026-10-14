import { useCallback, useEffect, useState } from 'react'
import { getDolar } from './api/dolar'
import { DolarForm } from './components/DolarForm'
import { DolarList } from './components/DolarList'
import type { Dolar } from './types'

export default function App() {
  const [produtos, setProdutos] = useState<Dolar[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [editando, setEditando] = useState<Dolar | null>(null)

  const carregar = useCallback(async () => {
    setLoading(true)
    setErro(null)
    try {
      const data = await getDolar()
      setProdutos(data.produto)
      setTotal(data.total)
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void carregar()
  }, [carregar])

  return (
    <main className="container">
      <header className="cabecalho">
        <h1>Controle de Dólar</h1>
        <p>Cadastre produtos e acompanhe o valor em reais.</p>
      </header>

      <DolarForm
        onSaved={carregar}
        editando={editando}
        onCancelarEdicao={() => setEditando(null)}
      />

      {erro && <p className="erro">{erro}</p>}

      <DolarList
        produtos={produtos}
        total={total}
        loading={loading}
        onEdit={setEditando}
      />
    </main>
  )
}
