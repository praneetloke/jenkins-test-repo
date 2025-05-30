pipeline {
    agent any
    tools {nodejs "Node 22.x"}
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
                sh 'npm run test:junit'
            }

            post {
                success {
                    junit testResults: "test-report.xml"
                }
            }
        }
    }
}
