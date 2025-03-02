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
                script {
                    def sshCommand = """
                        #!/bin/bash
                        set -e

                        # Debug: Check if project directory exists and is a git repository
                        if [ ! -d "$PROJECT_DIRECTORY" ]; then
                            echo "Cloning repository into $PROJECT_DIRECTORY"
                            git clone https://github.com/keyuraval/ci-cd-pipeline-demo.git $PROJECT_DIRECTORY
                        else
                            echo "Project directory exists, pulling latest changes"
                            cd $PROJECT_DIRECTORY
                            git pull origin $BRANCH_NAME
                        fi

                        # Debug: Check git status and files
                        echo "Git Status and Files:"
                        cd $PROJECT_DIRECTORY
                        git status
                        ls -l

                        # Install npm dependencies
                        echo "Installing npm dependencies"
                        npm install

                        # Ensure pm2 is installed
                        echo "Checking for pm2"
                        if ! which pm2 > /dev/null; then
                            echo "pm2 not found, installing..."
                            sudo npm install -g pm2
                        fi

                        # Restart the application using PM2
                        echo "Restarting PM2 application"
                        pm2 restart server.js || pm2 start server.js --name app_name
                    """

                    writeFile file: 'deploy.sh', text: sshCommand

                    // Execute the deploy script via SSH
                    sh """
                    scp -i $SSH_KEY_PATH deploy.sh $DEPLOYMENT_USER@$DEPLOYMENT_SERVER:/home/ubuntu/deploy.sh
                    ssh -i $SSH_KEY_PATH $DEPLOYMENT_USER@$DEPLOYMENT_SERVER 'bash /home/ubuntu/deploy.sh'
                    """
                }
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