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
                    sh 'npm install -g serverless'
                    sh 'sls deploy'
                }
            }
        }
    }
}
