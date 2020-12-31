// Jenkinsfile

pipeline {
    agent {
        docker { image 'node:14-alpine'}
    }
    stages {
        stage('Display node version') {
            steps {
                sh 'node -v'
            }
        }
    }
}