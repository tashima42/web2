# web2

## Postman Collection
Importe a collection do postman utilizando o arquivo `Pizza.postman_collection.json`    
Essa collection possui exemplos de requests e responses, e já tem um token de autorização configurado para facilitar as requests.

## Usuario de teste
username: admin@example.com    
password: secret1


## Autorizacao
Existem dois métodos de autorização, enviando um header de autorização ou enviando um cookie.

**Header**:
```
Authorization: Bearer (substituir pelo jwt retornado no login)
```
**Cookie**:
Ao fazer o login, um cookie com o nome `session` é enviado na resposta, esse cookie pode ser usado como alternativa ao header `Authorization`

## Rodando o repositorio

**Com docker**:    
```
docker-compose up
```

**Sem docker**:    
É necessário ter uma instância do MongoDB configurado no arquivo `.env`
```sh
npm install
npm run dev
```

**Rodando testes**:    
```
docker-compose up -d mongo
npm run test
```
