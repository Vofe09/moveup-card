import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarBlank,
  Newspaper,
} from "@phosphor-icons/react/dist/ssr";
import InteractiveBackground from "@/components/InteractiveBackground";
import { backgroundSettings } from "@/config/backgroundSettings";
import { mediaPublications } from "@/config/media";

export const metadata: Metadata = {
  title: "MoveUp в СМИ — публикации и интервью",
  description: "Интервью, новости и публикации о проекте MoveUp.",
};

const sortedPublications = [...mediaPublications].sort((first, second) =>
  second.date.localeCompare(first.date),
);

const formatPublicationDate = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
};

export default function MediaPage() {
  return (
    <main className="page mediaPage">
      <InteractiveBackground settings={backgroundSettings} />

      <div className="mediaContainer">
        <Link className="mediaBackLink" href="/">
          <ArrowLeft size={18} weight="regular" />
          <span>На главную</span>
        </Link>

        <section className="mediaCard" aria-labelledby="media-title">
          <header className="mediaHeader">
            <div className="mediaBrand">
              <div className="mediaLogoFrame">
                <Image
                  src="/logo.jpg"
                  alt="Логотип MoveUp"
                  width={42}
                  height={42}
                  priority
                />
              </div>
              <span>MOVEUP · ПУБЛИКАЦИИ</span>
            </div>

            <h1 id="media-title">MoveUp в СМИ</h1>
            <p>
              Интервью, новости и материалы о нашем проекте.
            </p>
          </header>

          {sortedPublications.length > 0 ? (
            <div className="mediaList" aria-label="Публикации о MoveUp">
              {sortedPublications.map((publication) => (
                <a
                  className="mediaItem"
                  href={publication.url}
                  key={`${publication.date}-${publication.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="mediaDate">
                    <CalendarBlank size={17} weight="regular" />
                    <time dateTime={publication.date}>
                      {formatPublicationDate(publication.date)}
                    </time>
                  </span>
                  <span className="mediaItemTitle">{publication.title}</span>
                  <ArrowUpRight
                    className="mediaItemIcon"
                    size={20}
                    weight="regular"
                  />
                </a>
              ))}
            </div>
          ) : (
            <div className="mediaEmptyState">
              <div className="mediaEmptyIcon">
                <Newspaper size={26} weight="regular" />
              </div>
              <h2>Публикации скоро появятся</h2>
              <p>
                Мы добавляем сюда интервью, новости и другие материалы о MoveUp.
              </p>
            </div>
          )}
        </section>
      </div>

    </main>
  );
}
