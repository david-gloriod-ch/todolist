ls .output > /dev/null 2>&1
if [ $? != 0 ]; then
    npm run build
fi
exec "$@"