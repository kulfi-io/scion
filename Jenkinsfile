// Jenkinsfile

/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent {
        docker { image 'node:14-alpine' }
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

        stage('Setup api directory') {
            steps {
                dir('api') {
                    sh 'pwd'
                    sh 'ls .'
                    sh 'npm install'
                    sh 'npm auto fix'
                }
            }
        }
    }
}
