# SHRI2020 - Home work #1
В данном репозитории находятся файлы первого домашнего задания "ШРИ - 2020 / Верстка"

## Вопросы:

### Правильное использование БЭМ-сущностей

**какие части макета являются одним и тем же блоком?**
    
- header - используется один блок, но разные размеры и цвета заголовков.
- button - используется один блок, но с разными размерами, цветами и вариативностью показа иконки
- footer - используется один блок, но разное позиционирование на десктопе и мобильной версии
- card - используется один блок, но в разных вариациях отображения. Карточка-листа, карточка-детальная, карточка-мобильная +- детальная.

---
**какие стили относятся к блокам, а какие к элементам и модификаторам?**

- Стили описывающие общее поведения блока относяться к блоку и лежат в css файле блока, например "/blockName"
- Стили описывающие конкретное/дополнительное поведение сущностей блока относятся к элементу блока и лежат в css файле элемента на уровне блока, например "blockName/__content/blockName__content.css"
- Стили описывающие динамическое/статическое поведение блока и его состояний описывается в виде модификаторов блока и лежат в css файле модификатора блока на уровне блока, например "blockName/_with/blockName_with_gaga.css"
---

**где нужно использовать каскады и почему?**
- В представленной работе, нет ненависти к каскадам, и если они удобны и не создают "side effect", то они использовались.
- Примером вроде как правильного и понятного использования каскада это блок text, theme, button, card с его элементом status с модификаторами. Все эти блоки и не только миксовались к основным дом-нодам для получения нужного отображения блоков.

### Консистентность

**какие видите базовые и семантические константы?**
- Все основные "константы" описаны в блоке theme, к ним относятся **брейкпоинты**, **размеры текста**, **цвета**, **отступы** необходимые в проекте. Но к сожалению в проекте есть цвета которые были захардкожены в стилях конкретных блоков.

**какие видите закономерности в интерфейсе?**
- Блок card один из основных блоков и используется почти на половине страниц в разных модификаторах. Элементы внутри имеют одинаковые отступы, которые можно вынести в константы.
- Блок header и footer используются на всех страницах с разным позиционированием и цветом в зависимости от устройста. Оба блока имееют одинаковые отступы.
- Блок button используется везде, с разными модификаторами (с иконкой, активная)
- Блок layout используется везде как указатель секций и основного контента.

### Адаптивность

**где видите вариативность данных и как это обрабатываете?**
- Блок header - бывает разный цвет и размер - модификатор
- Блок button - бывает разный размер, цвет, наличие иконок - модификаторы
- Блок card - бывает разный статус, разное отображение - элемент+модификаторы

**какие видите особенности, связанные с размером экрана?**
- Блок footer - на мобилках элементы отображаются друг под другом
- Блок header - на мобилках имеет меньший размер текста
- Блок card - на мобилках имеет другую структуру блока + модификатор
- Блок button - на мобилках если есть иконка то только она отображается если нет то кнопка растягивается на весь экран - модификаторы

**что еще повлияло на вашу вёрстку?**
Хотелось писать спокойно и не принужденно использую и каскады и даже иногда стили элемента/модификатора могут лежать в блоке, но если стилей не так много.

**Для получения дополнительного опыта, данную работу можно представить общественности.**
