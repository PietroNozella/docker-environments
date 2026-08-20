# API mínima em Flask: prova que o container Python responde
from flask import Flask, jsonify
import os

app = Flask(__name__)


@app.route("/")
def home():
    # Retorna JSON com a porta — teste hot reload mudando esta mensagem
    return jsonify(mensagem="Hello do Docker Python!", porta=os.getenv("PORT", "5000"))


if __name__ == "__main__":
    # host 0.0.0.0 é obrigatório: o Flask precisa aceitar conexões de FORA do container
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")))