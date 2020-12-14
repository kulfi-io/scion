# scion
This project has two areas, api and web. Each is seperate project and uses environment variable, which are not stored in github


Enviroment Variable
The env variables are broken for each eviroment. 
Example for development

# create .env.development in the root directory
# create one for each environment develoment|test|production
DB_HOST=host
DB_PORT-port
DB_NAME=db
DB_DIALECT=postgres
DB_USER=user
DB_PASSWORD=password
PORT=3001
API_BASE_URL=/api/v1
API_CACHE_DURATION=60


DB Config
Config files are not checked in:  
create a local config file in the src/db/config directory.  Use the following as sample:

# sample config.json file, store in src/db/config directory 
"development": {
    "username": "usrname",
    "password": "userpass",
    "database": "devdb",
    "host": "127.0.0.1",
    "schema": "dev",
    "searchPath": "dev",
    "dialectOptions": {
      "prependSearchPath": true
    },
    "dialect": "postgres"
  },
  "test": {
    "username": "usrname",
    "password": "usrpass",
    "database": "testdb",
    "host": "127.0.0.1",
    "schema": "test",
    "searchPath": "test",
    "dialectOptions": {
      "prependSearchPath": true
    },
    "dialect": "postgres"
  },
  "production": {
    "username": "usrname",
    "password": "usrpass",
    "database": "proddb",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }

