pipeline {
    agent any

    environment {
        // Define your Docker image name and tag
        IMAGE_NAME = 'aryan-personal-portfolio'
        IMAGE_TAG = "${env.BUILD_ID}"
        CONTAINER_NAME = 'aryan-portfolio-app'
        PORT = '3999'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Next.js standalone Docker image...'
                sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('Deploy / Run') {
            steps {
                echo 'Deploying container...'
                // Stop and remove existing container if it exists
                sh '''
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                '''
                // Run the new container
                sh 'docker run -d --name ${CONTAINER_NAME} -p ${PORT}:3000 --restart unless-stopped ${IMAGE_NAME}:latest'
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
            // Optional: Cleanup unused docker images to free up space
            sh 'docker image prune -f'
        }
        success {
            echo 'Build SUCCESS ✔'
            step([
                $class: 'GitHubCommitStatusSetter',
                reposSource: [$class: 'ManuallyEnteredRepositorySource', url: 'https://github.com/geneticglitch1/personal-portfolio'],
                contextSource: [$class: 'ManuallyEnteredCommitContextSource', context: 'Jenkins CI'],
                statusResultSource: [$class: 'ConditionalStatusResultSource', results: [[$class: 'AnyBuildResult', message: 'Build succeeded', state: 'SUCCESS']]]
            ])
        }
        failure {
            echo 'Build FAILED ❌'
            step([
                $class: 'GitHubCommitStatusSetter',
                reposSource: [$class: 'ManuallyEnteredRepositorySource', url: 'https://github.com/geneticglitch1/personal-portfolio'],
                contextSource: [$class: 'ManuallyEnteredCommitContextSource', context: 'Jenkins CI'],
                statusResultSource: [$class: 'ConditionalStatusResultSource', results: [[$class: 'AnyBuildResult', message: 'Build failed', state: 'FAILURE']]]
            ])
        }
    }
}
