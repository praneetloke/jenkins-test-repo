pipeline {
    agent {
        node {
            env.NODEJS_HOME = "${tool 'Node 22.x'}"
            env.PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
            sh 'npm --version'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test:html'
                publishHTML (target : [allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'html',
                    reportFiles: 'index.html',
                    reportName: 'My Reports',
                    reportTitles: 'The Report'])
            }
        }
    }
}