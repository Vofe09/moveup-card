# MoveUp Contact Page

## Запуск

```bash
npm install
npm run dev
```

Откройте http://localhost:3000.

## Настройка контента

Все основные подписи и ссылки находятся в `config/siteConfig.ts`.

- `brand.logo` — путь к логотипу в `public/`
- `brand.name` — название
- `brand.tagline` — слоган
- `contacts.phone` — телефон
- `contacts.whatsapp` — ссылка WhatsApp
- `contacts.instagram` — ссылка Instagram
- `contacts.website` — основной сайт
- `contacts.news` — страница публикаций/новостей
- `contacts.video` — видеоархив

Пока ссылка пустая, пункт отображается приглушённым и не открывается. После добавления URL он автоматически становится активной кнопкой.

Иконки: `@phosphor-icons/react` (Phosphor React).


## Liquid Glass

Основная карточка и контактные кнопки используют полупрозрачные слои,
`backdrop-filter`, насыщенность, внутренние блики и мягкие тени.
Для браузеров без поддержки `backdrop-filter` предусмотрен непрозрачный fallback.
