pipeline {
	agent any

	stages {
    stage("Pre-Build") {
      steps {
        sh '''
          SERVER_NAME=lianjia-crawler

          CONTAINER_ID=$(docker ps | grep "${SERVER_NAME}" | awk '{print $1}')
          IMAGE_ID=$(docker images | grep "${SERVER_NAME}" | awk '{print $3}')

          if [ -n "${CONTAINER_ID}" ]; then
          echo "存在${SERVER_NAME}容器 CID=${CONTAINER_ID}"
          echo "停止容器"
          docker stop ${SERVER_NAME}
          echo "删除容器"
          docker rm ${SERVER_NAME}
          fi

          if [ -n "${IMAGE_ID}" ]; then
          echo "存在${SERVER_NAME}镜像 CID=${IMAGE_ID}"
          echo "删除镜像"
          docker rmi -f ${IMAGE_ID}
          fi
        '''
      }
    }

		stage('Build') {
			steps {
				sh '''
          SERVER_NAME=lianjia-crawler

          TAG=$(date +%Y%m%d)$(git rev-parse refs/remotes/${GIT_BRANCH}^{commit} | cut -c 1-4)
          IMAGE=${SERVER_NAME}:${TAG}

					docker buildx build -t ${IMAGE} .

					docker run -d \
            --name=${SERVER_NAME} \
            -e CRAWLER_TYPE=2 \
            -e CRAWLER_CRON="0 0 8 1 * ?" \
						-e SEQUELIZE_DIALECT=mysql \
						-e SEQUELIZE_DATABASE=${SEQUELIZE_DATABASE} \
						-e SEQUELIZE_DATABASE_HOST=${SEQUELIZE_DATABASE_HOST} \
						-e SEQUELIZE_DATABASE_USERNAME=${SEQUELIZE_DATABASE_USERNAME} \
						-e SEQUELIZE_DATABASE_PASSWORD=${SEQUELIZE_DATABASE_PASSWORD} \
							${IMAGE}
				'''
			}
		}
	}
}
