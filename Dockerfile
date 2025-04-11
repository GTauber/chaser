# Imagem base com Node.js
FROM node:18-slim

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o projeto para dentro do container
COPY . .

# Expõe a porta usada pelo servidor
EXPOSE 8088

# Comando para iniciar o servidor
CMD ["npm", "start"]
