# NFT Marketplace MVP

MVP de marketplace de NFTs (desafio técnico Jungle Gaming), implementado com React + TypeScript + Vite + Tailwind CSS + React Router + Axios.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router v7
- Axios

## Como rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build de produção
npm run preview    # preview do build
```

## Credenciais fictícias

Qualquer e-mail com `@` e senha com 3+ caracteres. Ex: `ana@kurio.test` / `Kurio@2026`.

Cupons: `KURIO10` (10%), `LANCAMENTO5` (5%). Outros códigos são inválidos.

## Rotas

- `/` — Início / catálogo
- `/nfts/:id` — Detalhe do NFT
- `/cart` — Carrinho
- `/checkout` — Pagamento (requer login)
- `/confirmation` — Confirmação do pedido
- `/login`, `/register` — Autenticação
- `/account/profile` — Perfil do colecionador
- `/account/wallets` — Carteiras

## Deploy

Vercel (framework Vite). Configure build `npm run build`, output `dist`, Node 22. O `vercel.json` já configura o fallback de SPA.

## Observação

Este é um MVP focado no core flow. Tempo real (Socket.IO), testes E2E (Playwright) e auditoria Lighthouse ficam fora deste protótipo.