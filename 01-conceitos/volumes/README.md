# Conceito: Volumes (persistência e compartilhamento)

## Os 3 tipos de "volume"

| Tipo | Sintaxe | Onde fica | Quando usar |
|---|---|---|---|
| Named volume | `pgdata:/var/lib/postgresql/data` | Gerenciado pelo Docker | Dados de banco (o padrão correto) |
| Bind mount | `./backup:/backup` | Pasta real do seu PC | Compartilhar arquivos (dev) |
| Tmpfs | `tmpfs: /cache` | Só na memória RAM | Cache descartável |

## Experimento guiado

```bash
docker compose up -d          # sobe o Postgres
docker compose exec postgres sh -c "echo teste > /backup/arquivo.txt"  # cria arquivo no host!
```

Repare: `./backup` foi criado na sua pasta e o arquivo está nele — bind mount é uma
**ponte bidirecional** entre host e container.

Agora o teste de persistência:

```bash
docker compose down           # para e REMOVE os containers
docker compose up -d          # sobe de novo
```

O banco continua com os dados que existiam antes: o named volume `pgdata` não foi apagado.

Para apagar de verdade (com dados):

```bash
docker compose down -v        # -v remove os volumes declarados no compose
```

## Diferença prática

- **Named volume**: o Docker decide onde gravar. `docker volume ls` mostra o volume; se você
  rodar `down -v`, perde os dados.
- **Bind mount**: você decide o caminho. Útil para ver/logar arquivos, mas NUNCA use para
  dados de banco em produção (Windows+WSL tem problemas de performance e permissão).

## Pergunta de fixação

Se eu rodar `docker compose down` (sem `-v`) e depois `up -d`, o que acontece com o
`pgdata`? Resposta: o volume continua existindo; os containers são recriados, os dados não.