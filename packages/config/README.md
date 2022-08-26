# @bx-fe/platform-config

Пакет для подключения [@bx-fe/config](https://gitlab.ozon.ru/bx-fe/platform/libraries/config)

### Структура проекта

* `src/configs/`
  * `dev.ts` / `local.ts` / `prod.ts` / `stg.ts` – конфиги для соответствующих сред frontend-ozon-ru
  * `index.ts` – инициализация конфига

Кэширование конфига происходит в пакете [@bx-fe/platform-server](https://gitlab.ozon.ru/bx-fe/platform/libraries/platfrom/-/tree/master/packages/server) `/src/server.ts`

Функция `getConfig` перемещена в пакет [@bx-fe/platform-shared](https://gitlab.ozon.ru/bx-fe/platform/libraries/platfrom/-/tree/master/packages/shared) `/src/services/config.ts`

