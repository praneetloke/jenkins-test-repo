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
                        summary = sh(script: 'cat summary.html', returnStdout: true)
                        buildDescription(summary)
                    }
                    junit testResults: "test-report.xml"
                }
            }
        }
    }
}
