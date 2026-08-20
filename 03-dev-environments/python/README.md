# Ambiente Python em Docker — guia de estudo

## Subir o ambiente dev (hot reload)

```bash
docker compose up -d dev
```

Abra http://localhost:5000. Edite `app.py` (troque a mensagem) → o Flask reinicia sozinho.

## Subir a versão "produção"

```bash
docker compose up -d --build prod
```

Abra http://localhost:5001.

## O que prestar atenção

1. **`host="0.0.0.0"` no Flask**: dentro do container, "localhost" é o próprio container.
   Para o Docker encaminhar as portas, o servidor precisa escutar em todas as interfaces.
   Esse é o erro nº 1 de quem dockeriza pela primeira vez ("não consigo acessar localhost:5000").
2. **Ordem do Dockerfile**: `COPY requirements.txt` + `pip install` ANTES do `COPY . .`.
   Cada instrução do Dockerfile vira uma camada; se o código muda mas o requirements não,
   a camada de install vem do cache (builds rápidos).
3. **slim vs alpine**: `python:3.11-slim` (Debian enxuto) é a escolha mais segura para
   Python; `alpine` usa musl e quebra pacotes com wheels binários (pandas, etc.).
4. **requirements.txt fixado**: `flask==3.0.3` garante que o ambiente seja idêntico em
   qualquer máquina — o mesmo princípio que o `package-lock.json` no Node.

## Comparação Node vs Python (fixação)

| | Node/TS | Python |
|---|---|---|
| Deps | `package-lock.json` (npm ci) | `requirements.txt` (pip install) |
| Dev server | `tsx watch` | `flask --debug` |
| Build | tsc → dist/ (multi-stage faz sentido) | sem build (multi-stage quase não ajuda) |
| Porta padrão | 3000 | 5000 |