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
        AWS_KEY_ID = $(env.AWS_ACCESS_KEY_ID)
        AWS_SECRET_KEY = $(env.AWS_SECRET_ACCESS_KEY)
    }
    stages {
        stage('List dependency versions') {
            steps {
                echo 'checking versions...'
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install pachages') {
            steps {
                dir('api') {
                    sh 'npm install'
                    sh 'npm i serverless'
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
    }
}
