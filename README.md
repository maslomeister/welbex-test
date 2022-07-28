### Запуск

Перед запуском, вам нужно установить Docker себе на компьютер.[Скачать установщик Docker Desktop](https://www.docker.com/get-started).

После установки, проверьте, что Docker работает, набрав `docker` в терминале.

После установки Docker

1. Переместитесь в директорию приложения
2. Переместитесь в директорию бэкенда
3. `docker-compose up --build -d` собрать контейнер с бд и бэкендом, после сборки контейнер запустится автоматически
4. Переместиться в директорию фронтэнда
5. `npm start` запустить фронтэнд

### Задание

Нужно разработать таблицу в формате Single Page Application.

#### Требования к таблице.

1. Таблица должна содержать 4 колонки:
   1. Дата
   2. Название
   3. Количество
   4. Расстояние
2. База данных может быть PostgreSQL
3. Таблица должна иметь сортировку по всем полям кроме даты. Фильтрация должна быть в виде двух выпадающих списков и текстового поля:
   1. Выбор колонки, по которой будет фильтрация
   2. Выбор условия (равно, содержить, больше, меньше)
   3. Поле для ввода значения для фильтрации
4. Таблица должна содержать пагинацию

Вся таблица должна работать без перезагрузки страницы.

**Можно использовать:**

- Возможности node.js
- React/Axios
- css библиотеки

**Нельзя использовать:**

- Библиотеки с готовыми компонентами или плагины для React, которые

предоставляют готовый функционал, требуемый в задании

- Библиотеки и плагины для валидации
- Библиотеки и плагины для работы с БД, ORM
- CMS системы
