# ikano-api

В этом репозитории хранится контракт между сервером и клиентом в формате OpenAPI 3.

## Структура

Всё что имеет отношение к DBO имеет в названии или пути `dbo`:

- `dbo-api.yaml`
- `paths/dbo/**/*.yaml`
- `schemas/dbo/*.yaml`
- `bundle/dbo-api.json`

Аналогично для cms и admin

## Можно ли посмотреть API визуально?

Да. Для удобства чтения и внесения изменеий схема разбита на множество файлов, чтобы посмотреть итоговый вариант нужно:

1. Установить Node.js® `brew install node`
2. Установить зависимости `npm install`
3. Собрать схему

   - DBO — `npm run bundle-dbo`
   - CMS — `npm run bundle-cms`
   - ADMIN — `npm run bundle-admin`

4. Скопировать выбранную схему `pbcopy < bundle/dbo-api.yaml` или `pbcopy < bundle/cms-api.yaml` или `pbcopy < bundle/admin-api.yaml`
5. Вставить в swagger-editor на http://10.110.10.50:1002 или https://editor.swagger.io
