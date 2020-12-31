// Jenkinsfile

/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent {
        docker { image 'node:14-alpine' }
    }
    stages {
        stage('List dependency versions') {
            steps {
                sh '''#!/bin/bash
                    echo "hello"
                '''
            }
        }
    }
}
