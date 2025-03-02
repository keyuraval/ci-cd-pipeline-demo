pipeline {
    agent any
    
    environment {
        DEPLOYMENT_SERVER = "18.212.48.169"
        DEPLOYMENT_USER = "ubuntu"
        SSH_KEY_PATH = "/var/lib/jenkins/.ssh/keyur_key.pem"
        BRANCH_NAME = "main" // Define the branch name you want to deploy
        PROJECT_DIRECTORY = "/home/ubuntu/ci-cd-pipeline-demo" // Correct project directory
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
                sh 'export PATH=$PATH:/usr/local/bin'
                sh 'npm install'
            }
        }

        stage('Deploy to EC2') {
            steps {
                // SSH into EC2 and deploy code from the specified branch
                sh '''
                ssh -i $SSH_KEY_PATH $DEPLOYMENT_USER@$DEPLOYMENT_SERVER <<EOF
                    # Navigate to the project directory
                    cd $PROJECT_DIRECTORY
                    
                    # Pull the latest changes from Git
                    git pull origin $BRANCH_NAME
                    
                    # Install dependencies
                    npm install
                    
                    # Ensure pm2 is installed and restart the app
                    if ! which pm2 > /dev/null; then
                        sudo npm install -g pm2
                    fi
                    
                    # Restart the application using PM2
                    pm2 restart server.js || pm2 start server.js --name app_name
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
