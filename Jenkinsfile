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
                sh 'npm run test:all'
            }

            post {
                always {
                    script {
                        sh 'npm run summary'
                        summary = sh 'cat summary.html'
                        buildDescription(summary)
                    }
                    junit testResults: "test-report.xml"
                }
            }
        }
    }
}
