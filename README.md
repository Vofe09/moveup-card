# MoveUp Contact Page

## Запуск

```bash
npm install
npm run dev
```

Откройте http://localhost:3000.

## Настройка контента

Основные подписи и контактные ссылки находятся в `config/siteConfig.ts`.

Публикации для страницы «Мы в СМИ» (`/media`) находятся отдельно в `config/media.ts`.
Для каждой публикации укажите три поля:

- `title` — название материала;
- `date` — дата в формате `ГГГГ-ММ-ДД` (например, `2026-11-23`);
- `url` — прямая ссылка на интервью, новость или пост.

Публикации автоматически сортируются от новых к старым. Чтобы добавить материал,
достаточно добавить новый объект в массив `mediaPublications` в `config/media.ts`.

Настройки общего интерактивного фона находятся в `config/backgroundSettings.ts`.

- `brand.logo` — путь к логотипу в `public/`
- `brand.name` — название
- `brand.tagline` — слоган
- `contacts.phone` — телефон
- `contacts.whatsapp` — ссылка WhatsApp
- `contacts.instagram` — ссылка Instagram
- `contacts.website` — основной сайт
- `contacts.news` — путь к странице публикаций (`/media`)
- `contacts.video` — видеоархив

Пока ссылка пустая, пункт отображается приглушённым и не открывается. После добавления URL он автоматически становится активной кнопкой.

Иконки: `@phosphor-icons/react` (Phosphor React).


## Liquid Glass

Основная карточка и контактные кнопки используют полупрозрачные слои,
`backdrop-filter`, насыщенность, внутренние блики и мягкие тени.
Для браузеров без поддержки `backdrop-filter` предусмотрен непрозрачный fallback.

## Настройки интерактивного фона

Все настройки фоновой анимации находятся в `config/backgroundSettings.ts` в объекте `backgroundSettings`.

- `enabled` — полностью включает или выключает фон.
- `intensity` — общий уровень эффектов: `low`, `medium`, `high`.
- `interaction.cursor` — реакция на мышь.
- `interaction.touch` — реакция на касания.
- `interaction.clickRipples` — волны при клике/касании.
- `layers.neuralNetwork` — сеть частиц и соединений.
- `layers.matrixRain` — цифровые символы.
- `layers.aurora` — движущиеся световые потоки.
- `layers.holographicGrid` — перспективная сетка.
- `neuralNetwork` — количество точек, дистанция связей, скорость и радиус курсора.
- `matrixRain` — прозрачность, размер символов и скорость.
- `aurora` — прозрачность и длительность цикла.
- `holographicGrid` — прозрачность и шаг сетки.

Компонент фоновой анимации находится в `components/InteractiveBackground.tsx`.
Он использует Canvas 2D и CSS, без дополнительной 3D-библиотеки.
