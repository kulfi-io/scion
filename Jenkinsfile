/* groovylint-disable DuplicateStringLiteral */
// Jenkinsfile

/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent {
        docker {
            image 'node:14-alpine'
        }
    }
    environment {
        HOME = '.'
        AWS_ACCESS_KEY_ID = credentials('aws_key_id')
        AWS_SECRET_ACCESS_KEY = credentials('aws_secret')
        PORT = "${env.PORT}"
        API_BASE_URL = env.API_BASE_URL
        CRYPT_SALT = env.CRYPT_SALT
        JWT_SECRET = env.JWT_SECRET
        ORIGIN_WHITELIST = env.JWT_SECRET
        DB_USERNAME = env.DB_USERNAME
        DB_PASSWORD = env.DB_PASSWORD
        DB_NAME = env.DB_NAME
        DB_HOST = env.DB_HOST
        DB_SCHEMA = env.DB_SCHEMA
        DB_SEARCH_PATH = env.DB_SEARCH_PATH
        DB_LOGGING = env.DB_LOGGING
    }
    stages {
        stage('List dependency versions') {
            steps {
                echo 'checking versions...'
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install packages') {
            steps {
                dir('api') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('api') {
                    sh 'npm run test'
                }
            }
        }

        stage('Deploy') {
            steps {
                dir('api') {
                    sh 'npx sls deploy --stage development'
                }
            }
        }
    }
}
