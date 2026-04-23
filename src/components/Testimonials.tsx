"use client";

import { useState, useEffect, useRef } from "react";
import { REVIEWS } from "@/lib/data";

const Stars = () => (
  <div className="stars">
    {[...Array(5)].map((_, i) => (
      <svg key={i} viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

function renderQuote(quote: string, accentWord: string | null) {
  if (!accentWord) return `"${quote}"`;
  const parts = quote.split(accentWord);
  return (
    <>
      &ldquo;{parts[0]}
      <span className="accent">{accentWord}</span>
      {parts[1]}&rdquo;
    </>
  );
}

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function goReview(i: number) {
    setIdx(i);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIdx((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIdx((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const r = REVIEWS[idx];

  return (
    <section className="block" id="testimonials">
      <div className="reveal in">
        <div className="kicker">Proof</div>
        <h2 className="section-title">
          Players ranked up.
          <br />
          <span className="italic">Every one of them.</span>
        </h2>
      </div>
      <div className="reveal in" style={{ transitionDelay: "100ms" }}>
        <div className="featured-review">
          <Stars />
          <p className="featured-quote">{renderQuote(r.quote, r.accentWord)}</p>
          <div className="review-author">
            <div className="avatar">{r.initial}</div>
            <div>
              <div className="author-name">{r.name}</div>
              <div className="author-meta">{r.meta}</div>
            </div>
          </div>
        </div>
        <div className="review-pager">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              className={i === idx ? "active" : ""}
              onClick={() => goReview(i)}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="reveal in" style={{ transitionDelay: "150ms" }}>
        <div className="small-reviews">
          <div className="small-review">
            <Stars />
            <div>
              &ldquo;Actually explains WHY, not just what. Game-changer.&rdquo;
            </div>
            <div className="name">— David L.</div>
          </div>
          <div className="small-review">
            <Stars />
            <div>
              &ldquo;Patient, sharp, and fun. My wife and I both take lessons
              now.&rdquo;
            </div>
            <div className="name">— Carlos M.</div>
          </div>
          <div className="small-review">
            <Stars />
            <div>
              &ldquo;First coach that made strategy feel doable at a 3.0
              level.&rdquo;
            </div>
            <div className="name">— Priya S.</div>
          </div>
          <div className="small-review">
            <Stars />
            <div>
              &ldquo;Showed up for my tournament to scout opponents. Unreal.&rdquo;
            </div>
            <div className="name">— Tom B.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
