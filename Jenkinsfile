pipeline {
    environment{
    AWS_ACCOUNT_ID="065103812889"
    AWS_DEFAULT_REGION="ap-south-1"
    IMAGE_REPO_NAME="jobcheck-apk-feature"
    IMAGE_TAG="$BUILD_NUMBER"
    REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
  }
  agent {
  label 'dev'
}
  stages{

     //stage('Sonarqube'){
       //   steps{
      //      echo "Sonarqube codequality"
        //    sh '''
      //   sonar-scanner \
       //   -Dsonar.projectKey=JobCheck_Portal_JobCheck_Jobseeker_App_AYWhaKOUKDhVWMf_LlsD \
        //  -Dsonar.sources=. \
        //  -Dsonar.host.url=https://sonarqube.jobcheck.app \
        //  -Dsonar.login=sqp_0ec1f82bb7e7af8e93ea3042bb813f71623e445e
          // '''  
        //  }
       // } 

    
    
     stage('Build docker image'){
      steps{
        echo "Building docker image"
        script{
          sh "docker system prune -f"
          
          dockerImage = docker.build "${IMAGE_REPO_NAME}:${IMAGE_TAG}"
        }
      }
    }
      
    stage('Logging into AWS ECR') {
            steps {
                script {
                sh "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 065103812889.dkr.ecr.ap-south-1.amazonaws.com"
                }
                 
            }
        }
    // Uploading Docker images into AWS ECR    
    stage('Push docker image'){
      steps{
        echo "Pushing docker image"
        script{
          sh "docker tag ${IMAGE_REPO_NAME}:${IMAGE_TAG} ${REPOSITORY_URI}:$IMAGE_TAG"
          sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}"
           
        }
      }      
    }

  }
}