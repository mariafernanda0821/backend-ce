docker-compose down 
docker rmi backend
docker-compose build --no-cache
docker-compose up -d