# DevNote

DevNote é uma plataforma para criação e compartilhamento de anotações voltada para desenvolvedores.

## Recursos

- 📌 Criação e edição de notas
- 🔍 Pesquisa rápida por notas
- 🌐 Compartilhamento de anotações
- 🎨 Interface moderna e responsiva

## Tecnologias Utilizadas

- **Frontend:** React.js + TailwindCSS
- **Backend:** Node.js + Express
- **Banco de Dados:** MongoDB com Mongoose
- **Autenticação:** JWT (JSON Web Token)

## Backend e Funcionalidades

O backend do **DevNote** é construído utilizando **Node.js** e **Express**, fornecendo uma API RESTful para gerenciar anotações, autenticação e compartilhamento de notas.

### Principais Funcionalidades

- **Autenticação e Autorização:**
  - Registro e login de usuários com criptografia de senhas usando **bcrypt**
  - Autenticação via **JWT** para sessões seguras

- **Gerenciamento de Notas:**
  - Criação, edição e exclusão de notas
  - Busca eficiente de notas por título e conteúdo
  - Organização de notas por categorias ou tags

- **Compartilhamento de Notas:**
  - Geração de links públicos para notas
  - Controle de permissões (privado, somente leitura, edição)

- **Integração com Banco de Dados:**
  - Armazenamento de dados no **MongoDB** usando **Mongoose**
  - Modelagem eficiente para desempenho otimizado

- **Mecanismos de Segurança:**
  - Proteção contra ataques **CSRF** e **XSS**
  - Validação de entrada com **express-validator**

## Instalação

### 1. Clone o repositório
```sh
 git clone https://github.com/seu-usuario/devnote.git
 cd devnote
```

### 2. Instale as dependências
```sh
 npm install
```

### 3. Configuração do ambiente
Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias:
```env
PORT=5000
MONGO_URI=sua_string_de_conexao
JWT_SECRET=sua_chave_secreta
```

### 4. Inicie o servidor
```sh
 npm start
```

O projeto estará rodando em `http://localhost:3000`.


---

💡 **DevNote** - Simplificando suas anotações como desenvolvedor! 🚀

