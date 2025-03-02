pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/keyuraval/ci-cd-pipeline-demo.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t keyuraval03/ci-cd-pipeline-demo .'
            }
        }

        stage('Push Docker Image') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                    sh 'docker push keyuraval03/ci-cd-pipeline-demo'
                }
            }
        }

        stage('Deploy with Ansible') {
            steps {
                sh 'ansible-playbook -i hosts.ini deploy.yml'
            }
        }
    }
}
