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
    url: "https://www.youtube.com/watch?v=Fd0b-0yexp0",
    
  },
  {
    title: "Костанайские Новости",
    date: "2026-11-18",
    url: "https://kstnews.kz/uchenicza-nis-razrabotala-trenazher-dlya-reabilitaczii-kistej-ruk/?fbclid=PAdGRleAVr3I1leHRuA2FlbQIxMQBwZG9mAmZkaWQWUShcENp9FmimD0dby5dQExN8yEPl6nNydGMGYXBwX2lkDzEyNDAyNDU3NDI4NzQxNAABpybQPIpBWUMxtUJKoBWXxsK-2FR6W9U2BUVApXdorRyIvOikEd3_MjzvNYYQ_aem_AUHc7t-Ze9mLp1XaK04m3w",
  },


  {
    title: "Qostanay tany",
    date: "2026-11-18",
    url: "https://kostanaytany.kz/nis-oqwshysy-qol-qimylyn-qalpyna-keltirwge-koemektesetin-moveup-zhuejesin-aezirledi/",
  },

  {
    title: "Raem | Сми об IT и бизнесе",
    date: "2026-11-21",
    url: "https://raem.kz/alina-almatova-moveup/",
  },


  {
    title: "Газета Наш Костанай",
    date: "2026-11-20",
    url: "https://top-news.kz/shkolnicza-iz-kostanaya-sozdala-igrovoj-trenazher-dlya-vosstanovleniya-ruk-posle-insulta-i-gotovitsya-predstavit-ego-investoram-v-astane/",
  },

  {
    title: "Qostanay tany",
    date: "2026-11-18",
    url: "https://kostanaytany.kz/nis-oqwshysy-qol-qimylyn-qalpyna-keltirwge-koemektesetin-moveup-zhuejesin-aezirledi/",
  },

  {
    title: "Публикация NIS Kazakhstan",
    date: "2026-11-18",
    url: "https://www.instagram.com/p/Df3nCL4jdxA/?bqrl=MTJiZGcxYndwdHN0dQ%3D%3D",
  }
];


