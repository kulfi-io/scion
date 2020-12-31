// Jenkinsfile
import jenkins.model.Jenkins;

echo "I'm running as " + Jenkins.authentication;

import jenkins.model.Jenkins;

echo "I'm running as " + Jenkins.authentication;
pipeline {
    stages {
        stage('Display node version') {
            steps {
                sh 'whoami'
            }
        }
    }
}