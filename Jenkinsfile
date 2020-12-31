// Jenkinsfile

pipeline {
    agent {
        docker { image 'node:14-alpine'}
    }
    stages {
        stage('pre-build') {
            steps {
                sh 'node -v'
                sh 'cd api'
            }
        }
    }
}