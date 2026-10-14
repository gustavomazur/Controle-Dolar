import { useEffect, useState, type FormEvent } from 'react'
import { createDolar, updateDolar } from '../api/dolar'
import type { Dolar } from '../types'

interface Props {
  onSaved: () => void | Promise<void>
  editando: Dolar | null
  onCancelarEdicao: () => void
}

export function DolarForm({ onSaved, editando, onCancelarEdicao }: Props) {
  const [title, setTitle] = useState('')
  const [precoDolar, setPrecoDolar] = useState('')
  const [precoProduto, setPrecoProduto] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    if (editando) {
      setTitle(editando.title)
      setPrecoDolar(String(editando.preco_dolar))
      setPrecoProduto(String(editando.preco_do_produto_em_dolar))
    } else {
      setTitle('')
      setPrecoDolar('')
      setPrecoProduto('')
    }
    setErro(null)
  }, [editando])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErro(null)
    setSalvando(true)
    try {
      const body = {
        title,
        preco_dolar: Number(precoDolar),
        preco_do_produto_em_dolar: Number(precoProduto),
      }
      if (editando) {
        await updateDolar(editando.id, body)
      } else {
        await createDolar(body)
      }
      setTitle('')
      setPrecoDolar('')
      setPrecoProduto('')
      await onSaved()
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro ao salvar')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>{editando ? `Editar produto #${editando.id}` : 'Novo produto'}</h2>

      <div className="campo">
        <label htmlFor="title">Produto</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: gabinete"
          required
        />
      </div>

      <div className="linha">
        <div className="campo">
          <label htmlFor="preco_dolar">Cotação do dólar (R$)</label>
          <input
            id="preco_dolar"
            type="number"
            step="0.01"
            min="0"
            value={precoDolar}
            onChange={(e) => setPrecoDolar(e.target.value)}
            placeholder="5.00"
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="preco_produto">Preço do produto (US$)</label>
          <input
            id="preco_produto"
            type="number"
            step="0.01"
            min="0"
            value={precoProduto}
            onChange={(e) => setPrecoProduto(e.target.value)}
            placeholder="10.00"
            required
          />
        </div>
      </div>

      {erro && <p className="erro">{erro}</p>}

      <div className="linha">
        <button type="submit" disabled={salvando}>
          {salvando ? 'Salvando...' : editando ? 'Atualizar' : 'Adicionar'}
        </button>

        {editando && (
          <button type="button" onClick={onCancelarEdicao} disabled={salvando}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
