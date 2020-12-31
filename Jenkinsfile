// Jenkinsfile

/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent {
        docker { image 'node:14-alpine' }
    }
    stages {
        stage('List dependency versions') {
            steps {
                echo 'checking versions...'
                sh 'node -v'
                sh 'npm -v'
            }
        }
        dir('/api') {
            stage('Setup api directory') {
                steps {
                    sh 'ls .'
                }
            }
        }
    }
}
