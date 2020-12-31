// Jenkinsfile
pipeline {
    agent {
        docker exec -u 0 --privileged { image 'node:14-alpine'}
    }
    stages {
        stage('Display node version') {
            steps {
                sh 'whoami'
            }
        }
    }
}