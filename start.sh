value=$(<odenne.version)
echo "Starting 2 instances of odenne:$value"

docker run -d -p 3101:4999 --name odenne_worker_1 odenne:$value
docker run -d -p 3102:4999 --name odenne_worker_2 odenne:$value

echo "Started odenne:$value in $SECONDS seconds"