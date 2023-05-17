preview:
	docker build -t offlineapp:preview -f Dockerfile.preview .

proxy:
	docker build -t nginx:demo -f Dockerfile.proxy .

shell:
	docker exec -it offlineapp_web sh
