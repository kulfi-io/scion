// Jenkinsfile
pipeline {
    agent {
        docker exec --privileged { image 'node:14-alpine'}
    }
    stages {
        stage('Display node version') {
            steps {
                sh 'whoami'
            }
        }
    }
}