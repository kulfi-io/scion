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
    }
}
