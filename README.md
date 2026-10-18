# Controle de Dólar

O projeto foi desenvolvido para cadastrar produtos em dólares e converter os valores para reais. Ele surgiu de um problema que minha namorada enfrentava no dia a dia: precisava anotar tudo no papel, somar os valores manualmente e consultar o preço de cada produto e os clientes relacionados a cada um dos produto. A ideia foi justamente resolver esse problema, tornando o processo mais prático, rápido e orgnizado.

## Sobre o desenvolvimento

- **Backend** — desenvolvido por Gustavo Bueno Mazur.
- **Frontend** — desenvolvido por IA, com o objetivo de dar ao projeto um design mais interativo.

## Estrutura

- `app/` — API FastAPI (backend)
- `frontend/` — interface React + Vite + TypeScript

## Pré-requisitos

- Python 3.12+ com o ambiente virtual em `.venv`
- Node.js 18+

## Configuração

Na raiz do projeto, crie um `.env` (baseado no `.env.example`):

```
FRONTEND_ORIGIN=http://localhost:5173
```

Em `frontend/`, crie um `.env` (baseado no `.env.example`):

```
VITE_API_URL=http://localhost:8000
```

## Como rodar

### Opção 1 — um comando (API + frontend juntos)

Na raiz do projeto:

```bash
npm install
npm run dev
```

Isso sobe a API e o frontend ao mesmo tempo. Pressione `Ctrl+C` para encerrar os dois.

- API: http://localhost:8000 (docs em http://localhost:8000/docs)
- Interface: http://localhost:5173

### Opção 2 — dois terminais (backend e frontend separados)

Abra **dois terminais**.

**Terminal 1 — Backend**, ativando o ambiente virtual na raiz do projeto:

```bash
cd "/caminho/para/dolar"
source .venv/bin/activate
uvicorn app.main:app --reload
```

**Terminal 2 — Frontend:**

```bash
cd "/caminho/para/dolar/frontend"
npm install
npm run dev
```

> **Importante:** os comandos do backend (`uvicorn app.main:app`) precisam ser executados **de dentro da pasta do projeto**. Se você rodar de outra pasta (ex.: `~`), vai dar `ModuleNotFoundError: No module named 'app'`.

## Endpoints

- `GET /dolar/` — lista os produtos e o total
- `POST /dolar/` — cadastra um produto: `{ "title": str, "preco_dolar": float, "preco_do_produto_em_dolar": float }`
