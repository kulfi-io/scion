# scion

This project has two areas, api and web. Each is seperate project and uses environment variable, which are not stored in github

Enviroment Variable
The env variables are broken for each eviroment.
Example for development

# create .env.development in the root directory

create one for each environment develoment|test|production|CI

PORT=3001
API_BASE_URL=/api/v1
API_CACHE_DURATION=60
DB_USERNAME=username
DB_PASSWORD=password
DB_DATABASE=databasename
DB_HOST=127.0.0.1
DB_SCHEMA=schemaname
DB_SEARCH_PATH=schemaname
DB_DIALECT_OPTIONS={prependSearchPath:true}
DB_DIALECT=postgres
