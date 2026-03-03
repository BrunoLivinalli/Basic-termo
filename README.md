# Vocabulum — Jogo estilo Termo desenvolvido com Flask + HTML/CSS/JS

O **Vocabulum** é uma versão acadêmica e simplificada do jogo estilo **Termo**, construída utilizando:

- **Flask (Python)** — backend responsável por sortear palavras  
- **HTML + CSS** — interface do tabuleiro e teclado  
- **JavaScript** — lógica completa do jogo no frontend  

Este projeto foi criado com foco em aprendizado de integração **Python**, lógica de jogos, grid system, manipulação de DOM e comunicação assíncrona via fetch().

---

##  Funcionalidades

### Lógica Termo
- Feedback visual:
  - 🟩 **Verde** — letra na posição correta  
  - 🟨 **Amarelo** — letra existe, mas em outra posição  
  - ⬛ **Cinza** — letra não existe  
- Controle de letras repetidas com a mesma lógica do Wordle oficial.

### Suporte a teclado fisico e virtual
- Suporte total ao teclado físico (digitar, enter, backspace).
- Teclado virtual estilizado e funcional.

### Backend em Flask
- Rota para fornecer a palavra sorteada.
- Leitura de arquivo `palavras.txt`.

### Interface 
- Tabuleiro 6×5.
- Feedback visual por cor.
- Layout semelhante ao jogo original.

---

## Instalação e execução

### Instalar dependências### 

***Caso ainda não tenha, instale o Flask:***

- pip install flask

### Executar a aplicação

***No diretório do projeto, rode:***

- python app.py

***Ou no Linux/macOS:***

- python3 app.py

### Abrir no navegador

***Acesse:***

- http://127.0.0.1:5000

## Contribuições

###  Sinta-se à vontade para abrir issues, sugerir melhorias ou enviar pull requests.

## Agradecimentos

### Projeto desenvolvido como estudo acadêmico, com apoio de IA para auxilio.