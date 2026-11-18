/**
 * Единый файл настроек сайта MoveUp.
 * Меняйте тексты, контакты, подписи и ссылки здесь.
 * Пустая ссылка означает, что пункт пока не активирован.
 */

export const siteConfig = {
  brand: {
    logo: "/logo.jpg",
    name: "MoveUp",
    tagline: "Реабилитация без скуки",
  },

  contacts: {
    phone: "+77767207744",
    whatsapp: "https://wa.me/77767207744", 
    instagram: "https://www.instagram.com/move_up.kz?knvt=MmY5dG1wY3pvc2xx", 
    website: "https://moveup.ictlab.kz",
    news: "",
    video: "https://drive.google.com/drive/folders/1q-HAeR2d49F-xHWTbkHbhfURMq9ESZUs?usp=share_link",
  },

  buttons: [
    { id: "phone", label: "Наш номер", icon: "phone" },
    { id: "whatsapp", label: "Ватсап", icon: "whatsapp" },
    { id: "instagram", label: "Инстаграм", icon: "instagram" },
    { id: "website", label: "Веб сайт", icon: "globe" },
    { id: "news", label: "Мы в новостях", icon: "newspaper" },
    { id: "video", label: "Видео", icon: "play" },
  ],
} as const;
