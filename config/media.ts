/**
 * Все публикации о MoveUp находятся в этом файле.
 * Добавьте новый объект в массив mediaPublications:
 *
 * {
 *   title: "Название интервью или публикации",
 *   date: "2026-11-23", // формат ГГГГ-ММ-ДД
 *   url: "https://example.com/article",
 * },
 *
 * Ссылки открываются в новой вкладке. На странице публикации
 * автоматически сортируются от новых к старым.
 */

export type MediaPublication = {
  title: string;
  date: string;
  url: string;
};

export const mediaPublications: MediaPublication[] = [
  {
    title: "Ойын арқылы оңалту",
    date: "2026-08-31",
    url: "https://www.youtube.com/watch?v=Fd0b-0yexp0"
  }
];
