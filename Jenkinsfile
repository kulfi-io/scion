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
        stage('change directory') {
            steps {
               echo "$workspace"
               sh "cd ($workspace)/scion/api"
               sh "ls"
            }
        }
    }
}