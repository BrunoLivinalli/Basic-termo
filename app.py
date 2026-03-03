from flask import Flask, render_template
import random
import os

app = Flask(__name__)

# Carregar palavras
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(BASE_DIR, "palavras.txt"), "r", encoding="utf-8") as f:
    palavras = [p.strip().upper() for p in f.readlines()]

@app.route("/")
def index():
    return render_template("index.html")  # CORRETO

@app.route("/palavra")
def palavra():
    sorteada = random.choice(palavras)
    print("Palavra enviada:", sorteada)
    return sorteada

if __name__ == "__main__":
    app.run(debug=True)