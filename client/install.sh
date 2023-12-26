ls .output
if [ $? -eq 0 ]; then
else
    npm run build
fi
exec "$@"