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
