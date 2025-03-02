pipeline {
    agent any
    
    environment {
        DEPLOYMENT_SERVER = "18.212.48.169"
        DEPLOYMENT_USER = "ubuntu"
        SSH_KEY_PATH = "/var/lib/jenkins/.ssh/keyur_key.pem"
        BRANCH_NAME = "main" // Define the branch name you want to deploy
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the specified branch
                git branch: "$BRANCH_NAME", url: 'https://github.com/keyuraval/ci-cd-pipeline-demo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install dependencies (for Node.js app)
                sh 'npm install'
            }
        }

        stage('Deploy to EC2') {
            steps {
                // SSH into EC2 and deploy code from the specified branch
                sh '''
                ssh -i $SSH_KEY_PATH $DEPLOYMENT_USER@$DEPLOYMENT_SERVER << EOF
                    cd /home/ubuntu/your_project_directory
                    git pull origin $BRANCH_NAME
                    npm install
                    pm2 restart app_name
                EOF
                '''
            }
        }
    }

    post {
        success {
            echo 'Build and deployment completed successfully.'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}
