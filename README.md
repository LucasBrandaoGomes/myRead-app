# myRead-frontend

# <p align = "center"> myRead </p>

<p align = "center">
   <img src="https://github.com/LucasBrandaoGomes/myRead-app/blob/30a71a5a4ca7a076ed2f33c99bc31b747f1bde57/src/img/myRead.png" />
</p>

##  :clipboard: Descrição

Frontend da aplicação myRead. My read é uma aplicação onde o usuário poder fazer seu controle de leitura.
Com esse app o usuário pode:
 - Efetuar cadastro
 - Efetuar login
 - Permanecer logado até que efetue logout
 - Vizualizar coletânea de livros disponíveis
 - Vizualizar informações a cerca de u livro selecionado
 - Adicionar livros a suas leituras
 - Editar sua página de leitura


## :computer:	 Tecnologias e Ferramentas

- Node.js
- React
- Styled-components
- Vercel

***

## 🏁 Rodando a aplicação

A aplicação pode ser visitada pelo deploy [here](https://my-read-app-chi.vercel.app/)

ou por executando localmente. Para isso deve-se seguir os seguintes passos:

Primeiro, faça o clone desse repositório na sua maquina:

```
https://github.com/LucasBrandaoGomes/myRead-app.git
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```
No diretorio service, arquivo myReadServices.js , configure a variável REACT_APP_API_BASE_URL

```
REACT_APP_API_BASE_URL=http://localhost:4001

```
Iniciali-ze o [backend](https://github.com/LucasBrandaoGomes/myRead-backend) da aplicação seguindo os passos indicados

Por fim inicialize a aplicação

```
npm start
```

