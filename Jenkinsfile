pipeline {
    agent any

    environment {
        IMAGE_NAME     = 'aryan-personal-portfolio'
        IMAGE_TAG      = "${env.BUILD_ID}"
        CONTAINER_NAME = 'aryan-portfolio-app'
        // Host port -> container port 80 (nginx serving the static site)
        PORT           = '3999'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building static (nginx) portfolio image...'
                sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('Deploy / Run') {
            steps {
                echo 'Deploying container...'
                sh '''
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                '''
                sh 'docker run -d --name ${CONTAINER_NAME} -p ${PORT}:80 --restart unless-stopped ${IMAGE_NAME}:latest'
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
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
