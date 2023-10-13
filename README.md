# lianjia-crawler

链家数据抓取（接口抓取）

## Development

### env/.env 

数据库参数：

```bash
SEQUELIZE_DIALECT=mysql
SEQUELIZE_DATABASE=database
SEQUELIZE_DATABASE_HOST=host
SEQUELIZE_DATABASE_USERNAME=usernmae
SEQUELIZE_DATABASE_PASSWORD=password
```

### env

抓取参数：

| 配置项          | 含义                                                         |
| --------------- | ------------------------------------------------------------ |
| CRAWLER_TYPE    | 抓取任务类型 1-二手房、2-新房、3-租房，默认值 2              |
| CRAWLER_BATCH   | 抓取批次，默认值当天                                         |
| CRAWLER_CRON    | 定时抓取 [cron 表达式](https://www.npmjs.com/package/node-schedule)（可选） |
| CRAWLER_CLUSTER | 多进程模式，支持数字（可选）                                 |

> CRAWLER_TYPE：目前仅支持抓取新房数据。

## Available Scripts

### `npm run dev`

开发模式运行服务器。

### `npm run build`

构建生产项目。

### `npm start`

运行构建后的项目。

## Docker Deploy

### 构建镜像

```bash
docker buildx build --platform linux/amd64 -t lianjia-crawler:latest -f Dockerfile .
```

### 立即执行

```bash
docker run -p 8081:8081 \
-e CRAWLER_TYPE=2 \
-e SEQUELIZE_DIALECT=mysql \
-e SEQUELIZE_DATABASE=database \
-e SEQUELIZE_DATABASE_HOST=host \
-e SEQUELIZE_DATABASE_USERNAME=usernmae \
-e SEQUELIZE_DATABASE_PASSWORD=password \
 lianjia-crawler
```

执行 “新房” 抓取任务。

### 定时执行

```bash
docker run -p 8081:8081 \
-e CRAWLER_TYPE=2 \
-e CRAWLER_CRON=0 0 8 * * 1 \
-e SEQUELIZE_DIALECT=mysql \
-e SEQUELIZE_DATABASE=database \
-e SEQUELIZE_DATABASE_HOST=host \
-e SEQUELIZE_DATABASE_USERNAME=usernmae \
-e SEQUELIZE_DATABASE_PASSWORD=password \
 lianjia-crawler
```

每周一上午8点执行 “新房” 抓取任务。

