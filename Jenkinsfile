/* groovylint-disable DuplicateStringLiteral */
// Jenkinsfile

/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent {
        docker {
            image 'node:14-alpine'
        }
    }
    environment {
        HOME = '.'
        AWS_ACCESS_KEY_ID = credentials('aws_key_id')
        AWS_SECRET_ACCESS_KEY = credentials('aws_secret')
        DATABASE_URL: postgres://$(env.DB_USERNAME):$(DB_PASSWORD)@DB_HOST:5432/DB_NAME

    }
    stages {
        stage('List dependency versions') {
            steps {
                echo 'checking versions...'
                sh 'node -v'
                sh 'npm -v'
                echo sh(returnStdout: true, script: 'env')
            }
        }

        stage('Install packages') {
            steps {
                dir('api') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('api') {
                    sh 'npm run test'
                }
            }
        }

    // stage('Deploy') {
    //     steps {
    //         dir('api') {
    //             sh 'npx sls deploy --stage development'
    //         }
    //     }
    // }
    }
}
