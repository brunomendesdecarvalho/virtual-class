# Trabalho Final de Projeto Integrador 3 e Interação Humano-Computador

### Descrição do Projeto:
O seguinte projeto visa simular um sistema clone do Google Classroom. Há três tipos de usuários:
- Administrador, que terá permissões de *super usuário*
- Professor, que poderá criar salas e atividades.
- Aluno, que poderá apenas visualizar o conteúdo da API.

A autenticação é feita com JSON Web Tokens ([JWT](https://jwt.io/)). Ao realizar o login, o usuário recebe dois tokens: um de acesso, com duração de 5 minutos; e um de refresh, com duração de 1 dia.

Há quatro scoped throttles, todos referentes às requisições dos detalhes de professores, alunos, salas e atividades. Cada usuário, possuindo a permissão para tal, pode fazer 10 requisições por hora, para detalhes dos professores e dos alunos, e 15 requisições por hora, para detalhes de salas e atividades.

Em 'admin.py', foi criado um usuário customizado, onde são acrescentados dois campos nos usuários: 'usu_eh_aluno', caso seja um usuário do tipo 'aluno', ou 'usu_eh_professor', caso seja do tipo 'professor'. A lista de usuários pode ser visualizada apenas pelo administrador.

A URL padrão para acessar a página de administração, onde o administrador poderá criar novos usuários, é (url-base)admin/.

Há uma permissão customizada em 'permissions.py', que bloqueia o aluno de realizar alterações permitidas apenas ao professor. Nas demais funcionalidades onde nenhum dos dois podem realizar alterações, apenas o administrador pode executá-las.

Todos os dados salvos em banco são exibidos em ordem alfabética.

### Tokens:
Para obter o token de acesso, basta acessar: (url-base)api/token/
Para obter o token de refresh, basta acessar: (url-base)api/token/refresh/

Com o token de acesso em mãos, basta colocar no header *Authorization*:
```
Bearer <token_obtido>
```

Caso o token expire, basta copiar o refresh token e enviar como JSON em uma requisição para a url descrita anteriormente.
Exemplo:

```
{"refresh": "<token_refresh_recebido_anteriormente>"}
```

### URL Padrão:
  A URL padrão, aqui referida por _url-base_, será o localhost, juntamente com a porta 8000, resultando no http://localhost:8000/. 

### Documentação:
  Para ter acesso à documentação, basta digitar (url-base)api/schema/swagger-ui/.
 
### Configuração do Ambiente: 
#### Pacotes e Versões Necessários:
- Python==3.8.0
- Django==3.1.5
- django-filter==2.4.0
- djangorestframework==3.12.2
- djangorestframework-simplejwt==4.6.0
- drf-spectacular==0.13.1

#### Passo-a-passo no Shell:
Antes de rodar o projeto, é necessária a instalação das bibliotecas. Dentro da pasta virtual-class, encontra-se um arquivo "requirements.txt", próprio para o pipenv. Para criar um novo ambiente virtual na pasta, com o pipenv, basta digitar:
```
pipenv shell
```

Para instalar as bibliotecas necessárias, com o ambiente virtual criado, digite:
```
pip install -r requirements.txt
```

Antes de rodar o projeto, as migrações devem ser feitas, logo:
```
python manage.py makemigrations
```

E, então, aplicam-se as migrações:
```
python manage.py migrate
```

Para cadastrar um super usuário, basta executar:
```
python manage.py createsuperuser
```

E fornecer os dados requeridos.

Por fim, para iniciar o servidor:
```
python manage.py runserver <porta-desejada>
```
