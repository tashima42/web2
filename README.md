# web2

## Rodando o repositorio

### Com docker
`docker-compose up -d`

### Sem docker
```sh
echo "DB_USER=root\nDB_USER_PWD=password\nDB_HOST=localhost:27017" >> .env # Altere as informacoes para sua intancia do mongodb
npm install
npm run dev
```
