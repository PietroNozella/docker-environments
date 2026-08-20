# Docker Environments — Estudos

Ambientes Docker prontos para estudo, do básico ao completo. Cada pasta tem o que você
precisa para subir e aprender um conceito específico, com comentários no código e um
`README.md` explicando o que está acontecendo.

## Índice dos ambientes

| Pasta | Conceito principal | Comando |
|---|---|---|
| `01-conceitos/hello-world` | Comandos básicos do Docker | `docker run hello-world` |
| `01-conceitos/volumes` | Persistência: named volume vs bind mount | `docker compose up -d` |
| `01-conceitos/networks` | DNS interno entre containers | `docker compose up -d` |
| `02-servicos/postgres` | Banco pronto + pgAdmin (interface web) | `docker compose up -d` |
| `02-servicos/redis` | Cache em memória + RedisInsight | `docker compose up -d` |
| `03-dev-environments/node-ts` | Dockerfile multi-stage + hot reload | `docker compose up -d dev` |
| `03-dev-environments/python` | Python/Flask em Docker + hot reload | `docker compose up -d dev` |
| `04-stacks/node-postgres` | App + banco + cache orquestrados | `docker compose up -d --build` |
| `04-stacks/nginx-static` | Nginx servindo site estático | `docker compose up -d` |

## Ordem sugerida de estudo

1. **01-conceitos** — entenda imagem vs container, volumes e redes (a fundação).
2. **02-servicos** — ganho imediato: banco e cache isolados, prontos em 1 comando.
3. **03-dev-environments** — dockerize seu próprio código mantendo hot reload.
4. **04-stacks** — junte tudo em uma aplicação multi-serviço.

## Cheat sheet

```bash
docker compose up -d             # sobe os serviços em background
docker compose up -d --build     # sobe reconstruindo as imagens (após mudar código/Dockerfile)
docker compose down              # para e remove os containers (volumes ficam)
docker compose down -v           # para e remove TAMBÉM os volumes (dados somem!)
docker compose logs -f <serviço> # logs em tempo real
docker compose exec <serviço> sh # terminal dentro do container
docker compose ps                # status dos serviços
docker ps -a                     # todos os containers da máquina
docker images                    # imagens baixadas
docker system prune              # limpa containers/imagens paradas (cuidado: apaga tudo parado)
```

## Boas práticas adotadas aqui

- **Named volumes** para dados de banco (persistem entre `up`/`down`).
- **Bind mounts** só para código/arquivos de estudo (com `:ro` quando possível).
- **Healthchecks** + `depends_on: condition: service_healthy` para ordem de inicialização.
- **Portas documentadas** em cada README; se algo conflitar com processo local, troque o
  lado esquerdo do mapeamento (ex: `5433:5432`).

## Regras de ouro do Docker

1. Container é **descartável**: se precisar de algo para preservar, use volume.
2. **Nunca** configure IPs — use nomes de serviços (DNS interno do compose).
3. Imagem final deve ser **enxuta**: multi-stage para apps com build.
4. `localhost` dentro do container é o **próprio container**, não sua máquina.
5. Segredo (senha/API key) vai em **variável de ambiente**, nunca no código/imagem.

## Ambientes prontos em 1 comando

Para um dia a dia rápido, estes dois são os mais úteis:

```bash
docker compose -f 02-servicos/postgres/docker-compose.yml up -d   # banco + pgAdmin
docker compose -f 02-servicos/redis/docker-compose.yml up -d      # cache + RedisInsight
```

> Dica: use `-f` com o caminho do compose, ou `cd` até a pasta e rode `docker compose up -d`.