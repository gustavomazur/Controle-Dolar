import type { Dolar, DolarCreate, DolarListResponse } from '../types'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const texto = await res.text()
    throw new Error(texto || `Erro ${res.status}`)
  }
  return (await res.json()) as T
}

export async function getDolar(): Promise<DolarListResponse> {
  const res = await fetch(`${API_URL}/dolar/`)
  return parse<DolarListResponse>(res)
}

export async function createDolar(body: DolarCreate): Promise<Dolar> {
  const res = await fetch(`${API_URL}/dolar/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return parse<Dolar>(res)
}

export async function updateDolar(id: number, body: DolarCreate): Promise<Dolar> {
  const res = await fetch(`${API_URL}/dolar/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return parse<Dolar>(res)
}
