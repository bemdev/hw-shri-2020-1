# Клиентская часть приложения

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Как запустить?

### `yarn start`

Запускает приложение в режиме разработки.<br />
Открыть [http://localhost:3000](http://localhost:3000) для просмотра в браузере.

Страница будет автоматически обновляться при изменениях.<br />
Все ошибки можно увидеть в консоле.

### `yarn test`

Запустить тесты в интерактивном режиме.

### `yarn build`

Создать продакшен сборку проекта

### `yarn eject`

Разобрать приложение

**Note: это операция односторонняя. Если Вы сделали `eject`, обратного пути уже нет**

---

#### Какие роуты (entrypoints) используются?

```
'/' - стартовая страница приложения
'/settings' - страница настроек приложения
'/history' - история всех сборок
'/detail/:buildId/log' - детальный просмотр сборки с логом
```

## Структура проекта

Компонента имеющая JS представление с большой буквы
`Example - ExampleContent`

Компонента имеющая только CSS представление с маленькой буквы
`example - example__content`

```
./app/src
├── components //тут все компоненты (желательно переписать в одном стиле)
├── controllers //тут все необходимые контроллеры
├── index.js //стартовый файл приложения
├── libs //тут лежит пакет @bem-react/cn
├── redusers //тут лежат все редюсеры
└── routes //тут лежат все роуты приложения
```

## Зависимости проекта

```json
"dependencies": {
    "@bem-react/classname": "^1.5.8",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.3.2",
    "@testing-library/user-event": "^7.1.2",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-loadable": "^5.5.0",
    "react-redux": "^7.2.0",
    "react-router": "^5.1.2",
    "react-router-dom": "^5.1.2",
    "react-scripts": "3.4.0",
    "redux": "^4.0.5"
}
```
