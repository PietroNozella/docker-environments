# Ambiente: Redis 7 + RedisInsight

## Como subir

```bash
docker compose up -d
```

- **Redis**: `localhost:6379` (sem senha — ambiente local de estudo)
- **RedisInsight**: http://localhost:5540 — na tela inicial, conecte em "localhost" / 6379

## Testando direto no container

```bash
docker compose exec redis redis-cli
```

Dentro do client:

```
SET usuario:1 "Maria"     # grava chave
GET usuario:1             # lê chave
INCR contador             # contador atômico (usado em rate limit)
EXPIRE token 60           # chave expira em 60s
TTL token                 # tempo restante
KEYS *                    # lista chaves (evite em produção)
```

## Conceitos que valem anotar

- **In-memory**: dados vivem na RAM — por isso é rápido. O `--appendonly yes` grava um log
  em disco (`/data`) para não perder tudo num restart.
- **String/List/Set/Hash**: os tipos básicos. `SET/GET` é a base de cache.
- **Uso típico em apps**: cache de consulta ao banco, fila de jobs, sessão de login,
  rate limiting (`INCR` + `EXPIRE`).
- **TTL é a chave**: sem expiração, cache vira "lixo acumulado" na memória.

## Na sua stack (Supabase)

O Supabase já usa Redis internamente (fila de autenticação, realtime). Quando seu app no
Vercel precisar de cache/rate-limit, você pode usar Upstash (Redis serverless) — o conceito
é o mesmo deste ambiente.