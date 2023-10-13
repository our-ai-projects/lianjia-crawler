# lianjia-crawler

链家数据抓取（接口抓取）

## Development

env/.env

```
SEQUELIZE_DIALECT=dialect
SEQUELIZE_DATABASE=database
SEQUELIZE_DATABASE_HOST=host
SEQUELIZE_DATABASE_USERNAME=usernmae
SEQUELIZE_DATABASE_PASSWORD=password
```

env/development.env

```
CRAWLER_TYPE=2 // 抓取任务类型（1-二手房、2-新房、3-租房）
CRAWLER_BATCH=2023-10-12 // 抓取批次
```

## Available Scripts

### `npm run dev`

Run the server in development mode.

### `npm run build`

Build the project for production.

### `npm start`

Run the production build (Must be built first).

## Docker Deploy

```bash
docker buildx build --platform linux/amd64 -t lianjia-crawler:latest -f Dockerfile .
```

```bash
docker run -p 8081:8081 \
-e CRAWLER_TYPE=xx \
-e CRAWLER_BATCH=xxxx-xx-xx \
-e SEQUELIZE_DIALECT=dialect \
-e SEQUELIZE_DATABASE=database \
-e SEQUELIZE_DATABASE_HOST=host \
-e SEQUELIZE_DATABASE_USERNAME=usernmae \
-e SEQUELIZE_DATABASE_PASSWORD=password \
 lianjia-crawler
```
