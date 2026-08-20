# Ambiente Node + TypeScript — guia de estudo

## Subir o ambiente dev (hot reload)

```bash
docker compose up -d dev
```

Abra http://localhost:3000 e depois **edite `src/index.ts`** (troque a mensagem). Salve →
o `tsx watch` reinicia o processo DENTRO do container automaticamente. Recarregue a página.

## Subir a versão "produção" (multi-stage)

```bash
docker compose up -d --build prod
```

Abra http://localhost:3001. Compare: a imagem `prod` não tem TypeScript nem tsx —
só `node dist/index.js`. Verifique:

```bash
docker compose exec prod sh -c "ls node_modules | wc -l"   # só deps de produção
docker compose exec prod sh -c "ls /"                      # sistema mínimo (alpine)
docker images | Select-String node-ts                       # veja o tamanho das imagens
```

Compare com a imagem `dev` (node:22-alpine puro) e veja o tamanho de cada uma.

## O que cada peça ensina

| Peça | Conceito |
|---|---|
| `Dockerfile` com 3 estágios | **Multi-stage build**: imagem final sem ferramentas de dev |
| `./:/app` | **Bind mount**: o container enxerga seu código ao vivo |
| `node_modules:/app/node_modules` | **Volume anônimo**: deps instaladas no Linux não são sobrescritas pelo Windows |
| `target: runtime` | **Target do build**: escolher em qual estágio parar |
| `npm ci` vs `npm install` | `ci` é reprodutível (usa lockfile), `install` atualiza |

## Por que o volume de node_modules existe?

Sem ele, o bind mount `./:/app` faria o container ver a pasta `node_modules` do Windows
(que às vezes nem existe, ou foi criada com binários Windows). O volume anônimo é montado
POR CIMA dela, escondendo o host e preservando o que o `npm install` do container gerou.

## Recapitulando o fluxo de imagem

1. `docker compose up -d dev` → usa imagem pronta (`node:22-alpine`), sem build.
2. `docker compose up -d --build prod` → executa o Dockerfile (estágios 1→2→3) e roda a
   imagem final. O `--build` força a rebuild quando o código mudar.