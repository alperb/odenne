value=$(<odenne.version)
docker build -t odenne:$value .

docker run -d -p 3101:4999 --name odenne_worker_1 odenne:$value
docker run -d -p 3102:4999 --name odenne_worker_2 odenne:$value