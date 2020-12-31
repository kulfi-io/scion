// Jenkinsfile

pipeline {
    agent any
    stages {
        stage('Display node version') {
            steps {
                sh 'whoami'
            }
        }
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
    }
}