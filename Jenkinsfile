// Jenkinsfile

pipeline {
    agent {
        docker { image 'node:14-alpine'}
    }
    stages {
        stage('List dependency versions') {
            steps {
               bash '''#!/bin/bash
                    node -v
                    npm -v
                '''
            }
        }
    }
}