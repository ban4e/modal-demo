Для запуска проекта в тестовом режиме через docker выполнить команду:

```js
docker-compose up -d --build
```
В случае ошибки установки образа попробовать:
```js
DOCKER_BUILDKIT=0 docker-compose up -d --build
```

Приложение будет доступно через localhost(127.0.0.1)

---

Для запуска проекта в тестовом режиме вручную выполнить команды:

1. cd frontend
2. npm i
3. npm run dev
