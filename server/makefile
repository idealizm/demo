dockerize:
	docker build -t server .
docker-run:
	docker run -it \
  	-v ${PWD}:/usr/src/app \
  	-v /usr/src/app/node_modules \
  	-p 4000:4000 \
  	--rm \
  	server