pipeline {
    agent any
    stages {
        stage('Git') {
            git https://github.com/kulfi-io/scion.git
        }

        // stage('Setup Project') {
        //     steps {
        //         sh 'npm --version'
        //         sh 'cd api'
        //         sh 'npm install'
        //         sh 'npm i -D sequelize-cli'
        //         sh 'npm audit fix'
        //     }
        // }

        // stage('Build') {
        //     steps {
        //         sh 'npm run build'
        //     }
        // }

        // stage('Run Tests') {
        //     steps {
        //         sh 'npm run ci-test'
        //     }
        // }

    }
}
