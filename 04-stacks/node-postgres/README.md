# Stack completa: Node + Postgres + Redis — guia de estudo

## Subir a stack inteira

```bash
docker compose up -d --build
```

Aguarde os healthchecks (primeira subida baixa imagens e instala deps — demora mais).
Depois: **http://localhost:3000** → recarregue a página e veja o contador de visitas subir
(Redis) e a hora vinda do banco (Postgres).

## Observando a orquestração

```bash
docker compose ps          # status de cada serviço (healthy?)
docker compose logs -f app # logs da API
docker compose exec app sh -c "wget -qO- http://localhost:3000/health"  # healthcheck manual
```

## Teste de resiliência (o ponto alto do estudo)

```bash
docker compose stop redis              # mata o Redis
curl http://localhost:3000             # a app responde 500 com o erro de conexão
docker compose start redis             # sobe o Redis de novo
curl http://localhost:3000             # funciona de novo, sem reiniciar a app
```

Isso mostra o valor de **separar serviços**: um cai, os outros continuam de pé.

## O que a ordem de inicialização resolve

Sem `depends_on` + healthcheck, o Postgres leva ~3s para aceitar conexões; a app subiria
antes e quebraria com "connection refused". O compose espera o `pg_isready`/`redis-cli ping`
responderem e só então inicia o app. A ordem dos containers não é a ordem de PRONTIDÃO —
por isso healthcheck é a forma correta de sincronizar.

## Comparando com produção (Vercel + Supabase)

| Aqui (local) | Vercel + Supabase |
|---|---|
| `app` em container local | Vercel Functions |
| `postgres` em container | Supabase (Postgres gerenciado) |
| `redis` em container | Upstash Redis |
| compose orquestra | Vercel/Supabase orquestram |
| `.env` do compose | variáveis de ambiente da plataforma |

O conceito é o mesmo: a app se conecta via URL do serviço — em produção, essa URL aponta
para o Supabase, não para um container. **Trocar o ambiente = trocar a variável de ambiente.**

## Simulando o swap para o Supabase

1. Crie um projeto no Supabase e pegue a connection string
   `postgresql://postgres.<ref>:<senha>@aws-0-<regiao>.pooler.supabase.com:5432/postgres`.
2. No compose, altere `DATABASE_URL` para ela (e remova o `postgres` da stack).
3. `docker compose up -d --build app` — seu container agora fala com o Supabase real.