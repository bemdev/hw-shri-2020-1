# 🥇 SHRI2020 - Home work (NodeJS + Typescript) 🧩

<!-- ![Иллюстрация к проекту](https://www.alexadevops.com/assets/images/DevOps_crop.png) -->

В данном репозитории находятся файлы домашнего задания React "ШРИ - 2020 / NodeJS"

## Описание проекта
Данное приложение — это CI сервер, который работает с Git репозиторием. Параметры репозитория задаются в настройках.
Для любого из коммитов репозитория можно запустить операцию сборки. Сборка — это выполнение каких-то действий над содержимым репозитория. Результатом сборки является лог её выполнения.

CI сервер отображает список сборок с информацией о них. Также он должен давать возможность посмотреть лог любой сборки. Кроме того, имеет возможность редактирования настроек репозитория.

___
### Приложение работает при наличии токена

**Где указать токен для api?**

Токен необходимо указать в корневой папке проекта в файле `.env`

`TOKEN=eyJhbGciO` - где eyJhbGciO это Ваш токен.

**ВАЖНО!!! Build-server и Agent-server - используют токен из корня проекта (можно подложить свой токен внутрь сервисов)**
___

## Как запустить проект?

🏓 Используемая версия NodeJS - `^10.13.0` 

**Установить зависимости**

🔩 `yarn install` or `npm install`

**Запустить проект целиком**

🏄🏽‍♂️ `yarn start` - запустяться api-server + client-server + docker(with agent-server + build-server)

**Запустить сервер в режиме dev**

🛠 `yarn ssr-dev`

**Запустить сервер в режиме production**

🔫 `yarn ssr-prod`

___

## Как запустить build server+agent?

🚢 `yarn docker-start` - соберет и запустит сервера в отдельных контейнерах

⚓️ `yarn docker-stop` - остановит все контейнеры

___

## Как запустить тесты?

🚴🏿 `yarn test` - запуск юнит тестов для компонентов

🚵🏿 `yarn test:h` - запуск интеграционных тестов на hermione (нужно иметь запущенный selenium)

___

**Где посмотреть документацию по серверному api?**

`http://localhost:3000/api-docs`
___

**Где лежат все конфиги webpack сборщика?**
```
`./config/config.ts` - основной конфиг
`./config/client.config.ts` - дополняющий клиентский конфиг
`./config/server.config.ts` - дополняющий серверный конфиг
```
___

## Какие роуты (entrypoints) используются на сервере?
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
## Структура серверной части
```
server
├── controllers
│   └── index.ts //тут лежат все контроллеры
├── helpers
│   └── index.ts //тут лежат вспомогательные функции
├── index.ts //основной файл сервера
├── routes
│   └── index.ts //тут лежат все entrypoints
└── swagger.json //конфиг для swagger
```
___

## Какие роуты (entrypoints) используются на клиенте?

```
'/' - стартовая страница приложения
'/settings' - страница настроек приложения
'/history' - история всех сборок
'/detail/:buildId/log' - детальный просмотр сборки с логом
```

___
## Наименования "блоков/компонентов"

Компонента имеющая JS представление с большой буквы

`Example - ExampleContent`

Компонента имеющая только CSS представление с маленькой буквы

`example - example__content`
____

## Структура клиентской части

```
./app/src
├── components //тут все компоненты (желательно переписать в одном стиле)
├── controllers //тут все необходимые контроллеры
├── server.ts //стартовый файл для отрисовки сервером
├── client.ts //стартовый файл для отрисовки клиентом
├── store.ts //функции с формированием хранилища
├── libs //тут лежит хелперы и маленькие библиотеки
├── redusers //тут лежат все редюсеры
└── routes //тут лежат все роуты приложения
```
___

## Зависимости проекта

```js
"dependencies": {
    "@bem-react/classname": "^1.5.8", //используется для указания классов тэгам
    "ansi-to-html": "^0.6.14", //для расскрашивания полученого webpack лога
    "axios": "^0.19.2", //для отправки запросов
    "express": "^4.17.1", //стандартный веб сервер
    "morgan": "^1.10.0", //логировние запросов для сервера
    "react": "^16.13.1", //виновник торжества
    "react-dom": "^16.13.1", //пакет из семейства реакт для рендера
    "react-redux": "^7.2.0", //пакет из семейства реакт для управлением хранилищем
    "react-router-dom": "^5.1.2", //пакет из семейства реакт для управления машрутизацией
    "redux": "^4.0.5" //библитока хранилища
},
"devDependencies": {
    "@babel/core": "^7.9.0", //для трансформации кода в реакт
    "@babel/plugin-transform-runtime": "^7.9.0", //плагин для рантайм трансформации
    "@babel/preset-env": "^7.9.0", //пресет для окружения
    "@babel/preset-react": "^7.9.4", //пресет реакта нужен для сборки реакта
    "autoprefixer": "^9.7.5", //добавление префиксом для разных броузеров
    "babel-loader": "^8.0.6", //загрузчик модулей
    "chai": "^4.2.0", //для сравнение результатов assert в hermione
    "png-img": "^2.3.0", //? кажется нужен для работы hermione
    "dotenv": "^8.2.0", //для использования конфига .env
    "css-loader": "^3.4.2", //загрузчик стилей
    "enzyme": "^3.11.0", //необходим для юнит тестов
    "enzyme-adapter-react-16": "^1.15.2", //необходим для юнит тестов реакта
    "full-icu": "^1.3.1", //для формирование правильной даты на сервере и клиенте
    "hermione": "^3.1.0", //собствеено сама Гермиона для интеграционных тестов
    "jest": "^25.3.0", //для юнит тестов
    "jest-transform-css": "^2.0.0", //для поддержки css внутри компонент при тестировании
    "memory-cache": "^0.2.0", //кэш из памяти
    "mini-css-extract-plugin": "^0.9.0", //плагин для загрузки стилей
    "nodemon": "^2.0.2", //для перезапуска приложение в режиме разработки
    "npm-run-all": "^4.1.5", //для запуска параллейно команд npm
    "postcss-loader": "^3.0.0", //загрузчик postcss
    "redux-devtools-extension": "^2.13.8", //тулза для дебага хранилища
    "swagger-ui-express": "^4.1.3", //авто-документация по серверному api
    "uglifyjs-webpack-plugin": "^2.2.0", // минимайзер js
    "webpack": "^4.42.1", //сборшик проекта
    "webpack-cli": "^3.3.11", //дополнения к сборщику для запуска через консоль
    "webpack-logger-plugin": "^1.2.0" //логер для сборщика
}

```


###  Что хотелось бы пофиксить?
- ~~обработать ошибки "сервера хранилища" - иногда из за ошибки не отрисовываются билды или редиректит на главную~~ ✅
- рефаторинг кода (как интерфейсного так и кода билд серверов) 🆘
- обработка больших репозиториев 🆘
- перенести тесты на typescript 🆘
- оптимизировать работу контроллеров / или перейти на работу через хранилище и dispath событий целиком 🆘
- обработать невалидные данные форм 🆘
- обработать невалидные команды для билд агента 🆘
- постараться избавиться от лишних пакетов 🆘
- обновить документацию после чистки пакетов  🆘
- пофиксить плавующие баги css 🆘
- ~~добавить обработку ошибок~~ - частично исправлено ✅
- и многое многое другое 🤔

#### Спасибо за внимание! 🤘