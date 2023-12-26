ls .output > /dev/null 2>&1
if [ $? -eq 0 ]; then
else
    npm run build
fi
exec "$@"