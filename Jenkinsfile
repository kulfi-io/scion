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
            }
        }
        stage('pre-build') {
            steps {
               echo "$workspace"
               sh "npm install -prefix $workspace/api"
            }
        }
    }
}