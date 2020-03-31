# Серверная часть приложения

## Как запустить?

**Установить зависимости**

`yarn install` or `npm install`

**Запустить сервер вместе с "build-agent" (нужны первоначальные настройки профиля - можно задать через swagger)**

`yarn start`

**Запустить сервер в режиме dev**

`yarn server:dev`

**Запустить сервер в режиме production**

`yarn server:prod`

**Запустить build-agent отдельно**

`yarn build-agent`

**Где указать токен для api?**
Токен необходимо указать в корневой папке проекта в файле `.env`

`TOKEN=eyJhbGciO` - где eyJhbGciO это Ваш токен.
___

**Где посмотреть документацию по api**

`http://localhost:3000/api-docs`
___

#### Какие роуты (entrypoints) используются?
```
'/api/builds/list' - получение списка всех билдов
'/api/builds/:buildId' - получение билда по id
'/api/builds/:buildId/logs' - получение лога билда по id (кэш)
'/api/build/request' - добавление билда в очередь build-agent'а
'/api/build/start' - запуск билда
'/api/build/finish' - завершение билда
'/api/build/cancel' - отмена билда
'/api/settings' - получение настроек и добавление/редактирование
```
## Структура проекта
```
server
├── controllers
│   └── index.js //тут лежат все контроллеры
├── helpers
│   └── index.js //тут лежат вспомогательные функции
├── index.js //основной файл сервера
├── routes
│   └── index.js //тут лежат все entrypoints
└── swagger.json //конфиг для swagger
```

## Зависимости проекта

```json
"dependencies": {
    "axios": "^0.19.2",
    "dotenv": "^8.2.0",
    "express": "^4.17.1"
},
"devDependencies": {
    "gulp": "^4.0.2",
    "gulp-autoprefixer": "^7.0.1",
    "gulp-concat": "^2.6.1",
    "memory-cache": "^0.2.0",
    "nodemon": "^2.0.2",
    "npm-run-all": "^4.1.5",
    "swagger-ui-express": "^4.1.3"
}
```