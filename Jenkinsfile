// Jenkinsfile

pipeline {
    agent {
        docker { image 'node:14-alpine'}
    }
    stages {
        stage('pre-build') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'ls .'
                sh 'alias source=". /api"'
                sh 'ls .'
            }
        }
    }
}