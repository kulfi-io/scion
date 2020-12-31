// Jenkinsfile

pipeline {
    agent {
        docker { image 'node:14-alpine'}
    }
    stages {
        stage('get dependency versions') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'whoami'
            }
        }
        stage('pre-build') {
            steps {
               dir("$workspace/api"){
                    sh "pwd"
                    sh "npm install"
                }
            }
        }
    }
}