value=$(<odenne.version)
echo "Building odenne:$value"

docker build -t odenne:$value .

echo "Build completed in $SECONDS seconds"