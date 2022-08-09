value=$(<odenne.version)
echo "Building odenne:$value"

docker build -t odenne:$value -t odenne:latest .

echo "Build completed in $SECONDS seconds"