import RevealWrapper from "./RevealWrapper";

const PLATFORMS = [
  {
    name: "TeachMe.To",
    desc: "Book a private lesson through the TeachMe.To coaching marketplace.",
    href: "https://teachme.to/listings/pickleball/pickleball-with-demario-montez?latitude=32.92651&longitude=-96.89612",
  },
  {
    name: "Grove",
    desc: "Book at Grove through the Podplay platform.",
    href: "https://grove.podplay.app/coach/demario-montez-v0m3",
  },
  {
    name: "Dallas Pickle Club",
    desc: "Book at Dallas Indoor Pickleball Club through Podplay.",
    href: "https://dallaspickleclub.podplay.app/coach/demario-montez-8l4j",
  },
];

const ExternalIcon = () => (
  <svg
    className="bp-arrow"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    className="bp-arrow"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z" />
  </svg>
);

export default function BookingPlatforms() {
  return (
    <section className="book-platforms">
      <RevealWrapper>
        <div className="bp-header">
          <div className="eyebrow">More Ways to Book</div>
          <p className="bp-sub">
            Not ready to book online? DeMario is also bookable through these
            partner platforms — or just shoot him a text.
          </p>
        </div>
        <div className="bp-list">
          {PLATFORMS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bp-card"
            >
              <div className="bp-card-text">
                <div className="bp-name">{p.name}</div>
                <div className="bp-desc">{p.desc}</div>
              </div>
              <ExternalIcon />
            </a>
          ))}
          <a href="sms:4693719220" className="bp-card bp-card-phone">
            <div className="bp-card-text">
              <div className="bp-name">Text or Call</div>
              <div className="bp-desc">
                DeMario books over the phone too — text{" "}
                <strong>(469) 371-9220</strong> to check availability or ask
                questions.
              </div>
            </div>
            <PhoneIcon />
          </a>
        </div>
      </RevealWrapper>
    </section>
  );
}
