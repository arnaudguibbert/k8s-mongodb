.PHONY: docker-deploy-mongo
docker-deploy-mongo:
	docker-compose -f Docker/compose/compose.yaml up

.PHONY: docker-stop-mongo
docker-stop-mongo:
	docker-compose -f Docker/compose/compose.yaml down

.PHONY: docker-restart-mongo
docker-restart-mongo:
	$(MAKE) -k docker-stop-mongo docker-deploy-mongo

