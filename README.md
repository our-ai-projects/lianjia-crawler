# crawler-service

链家数据抓取服务

## Available Scripts

### `npm run dev`

Run the server in development mode.

### `npm run build`

Build the project for production.

### `npm start`

Run the production build (Must be built first).

## Docker Images

```bash
docker buildx build --platform linux/amd64 -t lianjia-crawler-service:latest -f Dockerfile .
```

```bash
docker run -d -p 8081:8081 lianjia-crawler-service
```
