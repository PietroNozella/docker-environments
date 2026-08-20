# Ambiente: Postgres 16 + pgAdmin

## Como subir

```bash
docker compose up -d
```

- **Postgres**: `localhost:5432` — usuário `estudo`, senha `estudo123`, banco `meu_banco`
- **pgAdmin**: http://localhost:8080 — login `estudo@local.com` / `estudo123`

No primeiro acesso do pgAdmin, adicione o servidor:
- Name: qualquer (ex: "local")
- Host: `postgres` (nome do serviço dentro da rede do compose — não é `localhost`!)
- Port: `5432` | User: `estudo` | Password: `estudo123`

## Comandos úteis

```bash
docker compose logs -f postgres   # acompanha os logs do banco
docker compose exec postgres psql -U estudo -d meu_banco   # terminal SQL direto
docker compose down               # para tudo (dados persistem no volume pgdata)
docker compose down -v            # para e APAGA os dados
```

## Por que isso é melhor que instalar Postgres na máquina?

- Não polui o Windows: nenhum serviço instalado, nenhuma porta ocupada para sempre.
- Versões trocáveis: mude `postgres:16-alpine` para `postgres:17-alpine` e teste.
- Isolamento: se estragar, `down -v` e sobe de novo em segundos.
- O mesmo `docker-compose.yml` funciona em qualquer máquina com Docker (Windows/Mac/Linux).

## Healthcheck — o que está acontecendo ali?

O `healthcheck` do compose executa `pg_isready` a cada 5s. O pgAdmin só sobe depois que o
banco responde (`depends_on: condition: service_healthy`). Isso resolve o clássico problema
"o banco ainda não estava pronto quando a app subiu".