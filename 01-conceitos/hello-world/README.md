# 01 - Hello World (primeiros comandos)

Objetivo: aprender os comandos básicos do Docker antes de usar o compose.

## 1. Primeiro container

```bash
docker run hello-world
```

- Baixa a imagem `hello-world` do Docker Hub (se não tiver local) e roda o container.
- O container executa, imprime a mensagem e **encerra** (container de tarefa única).

## 2. Container interativo (shell)

```bash
docker run -it alpine sh
```

- `-i` = mantém stdin aberto | `-t` = aloca um terminal.
- Você cai dentro do Linux do container. Rode `ls`, `cat /etc/os-release`, `echo`.
- Digite `exit` para sair — o container para junto.

## 3. Ciclo de vida

Abra outro terminal e observe:

```bash
docker ps              # containers EM EXECUÇÃO
docker ps -a           # todos os containers (inclusive parados)
docker start <id>      # reinicia um container parado
docker stop <id>       # para um container
docker rm <id>         # remove o container (libera o nome)
docker rm -f <id>      # para + remove
```

## 4. Imagens

```bash
docker images          # lista imagens baixadas localmente
docker pull alpine     # baixa imagem sem criar container
docker rmi alpine      # remove uma imagem
docker run --rm -it alpine sh   # --rm: remove o container ao sair (uso de estudo)
```

## 5. Executando comandos em container já ativo

```bash
docker run -d --name meu-shell alpine tail -f /dev/null   # container "vivo" em background
docker exec -it meu-shell sh                              # entra no container ativo
docker logs meu-shell                                     # vê a saída do container
```

## Anotações importantes

- **Imagem** = modelo imutável. **Container** = instância executando a imagem.
- Container parado continua existindo (com disco e estado) até ser removido com `docker rm`.
- `docker run` = `docker create` + `docker start` + attach.