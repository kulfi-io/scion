// Jenkinsfile

pipeline {
    agent {
        docker { image 'node:14-alpine'}
    }
    stages {
        stage('Setup to use bash') {
            steps {
                sh '''#/bin/bash
                    echo "change to bash"
                ''' 
            }
        }
        stage('List dependency versions') {
            steps {
                bash 'node -v'
                bash 'npm -v'
            }
        }
        stage('pre-build') {
            steps {
              bash 'ls .'
              bash 'cd api'
              bash 'ls .'
            }
        }
    }
}