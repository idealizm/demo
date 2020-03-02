get-schema:
	@yarn run apollo schema:download --endpoint=http://localhost:4000/graphql/ graphql-schema.json
generate-schema:
	@yarn run apollo codegen:generate --localSchemaFile=graphql-schema.json --target=typescript --includes=src/**/*.{ts,tsx} --tagName=gql --addTypename --globalTypesFile=src/types/graphql-global-types.ts types
dockerize:
	docker build -t client .
docker-run:
	docker run -it \
  	-v ${PWD}:/usr/src/app \
  	-v /usr/src/app/node_modules \
  	-p 3000:3000 \
  	--rm \
  	client