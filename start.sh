echo "Starting 3 instances of odenne:latest"

docker run -d -p 3101:4999 -p 5021:5020 --name odenne_worker_1 odenne:latest
docker run -d -p 3102:4999 --name odenne_worker_2 odenne:latest
docker run -d -p 3103:4999 --name odenne_worker_3 odenne:latest

echo "Started odenne:$value in $SECONDS seconds"
