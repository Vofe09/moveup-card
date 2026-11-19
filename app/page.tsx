import Image from "next/image";
import {
  ArrowUpRight,
  Globe,
  InstagramLogo,
  Newspaper,
  Phone,
  Play,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/config/siteConfig";
import InteractiveBackground, { type BackgroundSettings } from "@/components/InteractiveBackground";

// Настройки интерактивного фона находятся прямо здесь, в app/page.tsx.
// Отключайте слои через true/false и регулируйте интенсивность ниже.
const backgroundSettings: BackgroundSettings = {
  enabled: true,
  intensity: "high", // "low" | "medium" | "high"

  interaction: {
    cursor: true,       // реакция на движение мыши
    touch: true,        // реакция на касания на телефонах
    clickRipples: true, // импульсная волна при клике/касании
  },

  layers: {
    neuralNetwork: true,  // 1. движущиеся узлы и связи
    matrixRain: true,     // 2. цифровой дождь
    aurora: true,         // 3. жидкие световые потоки
    holographicGrid: true, // перспективная сетка — дополнительный слой
  },

  neuralNetwork: {
    particleCount: 88,
    connectionDistance: 142,
    speed: 1,
    cursorRadius: 190,
  },

  matrixRain: {
    opacity: 0.13,
    fontSize: 15,
    speed: 0.8,
  },

  aurora: {
    opacity: 0.27,
    duration: 32,
  },

  holographicGrid: {
    opacity: 0.12,
    spacing: 58,
  },
};

const iconMap = {
  phone: Phone,
  whatsapp: WhatsappLogo,
  instagram: InstagramLogo,
  globe: Globe,
  newspaper: Newspaper,
  play: Play,
} as const;

const contactUrls: Record<string, string> = {
  phone: `tel:${siteConfig.contacts.phone}`,
  whatsapp: siteConfig.contacts.whatsapp,
  instagram: siteConfig.contacts.instagram,
  website: siteConfig.contacts.website,
  news: siteConfig.contacts.news,
  video: siteConfig.contacts.video,
};

export default function Home() {
  return (
    <main className="page">
      <InteractiveBackground settings={backgroundSettings} />
      <section className="contact" aria-label="Контакты MoveUp">
        <div className="glassCard">
          <header className="brand">
            <div className="logoFrame">
              <Image
                src={siteConfig.brand.logo}
                alt="Логотип MoveUp"
                width={88}
                height={88}
                priority
              />
            </div>
            <h1>{siteConfig.brand.name}</h1>
            <p>{siteConfig.brand.tagline}</p>
          </header>

          <nav className="links" aria-label="Контактные ссылки">
            {siteConfig.buttons.map((button) => {
              const Icon = iconMap[button.icon];
              const href = contactUrls[button.id];
              const isActive = Boolean(href);

              const content = (
                <>
                  <Icon className="buttonIcon" size={23} weight="regular" />
                  <span>{button.label}</span>
                  {isActive && (
                    <ArrowUpRight
                      className="externalIcon"
                      size={17}
                      weight="regular"
                    />
                  )}
                </>
              );

              return isActive ? (
                <a
                  className="contactButton"
                  href={href}
                  key={button.id}
                  target={href.startsWith("https://") ? "_blank" : undefined}
                  rel={href.startsWith("https://") ? "noopener noreferrer" : undefined}
                >
                  {content}
                </a>
              ) : (
                <div
                  className="contactButton unavailable"
                  key={button.id}
                  aria-disabled="true"
                  title="Добавьте ссылку в config/siteConfig.ts"
                >
                  {content}
                  <span className="setupHint">Скоро</span>
                </div>
              );
            })}
          </nav>
        </div>
      </section>

      <footer className="footer">
        MoveUp © {new Date().getFullYear()}
      </footer>
    </main>
  );
}
