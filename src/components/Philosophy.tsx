import RevealWrapper from "./RevealWrapper";

export default function Philosophy() {
  return (
    <section className="block philosophy">
      <RevealWrapper>
        <div className="kicker">Philosophy</div>
        <p className="philosophy-quote">
          Most coaches teach <span className="strike">drills.</span>
          <br />I teach you how to{" "}
          <span className="accent">win the point.</span>
        </p>
      </RevealWrapper>
      <div className="pillars">
        <RevealWrapper delay={0}>
          <div className="pillar">
            <div className="n">01</div>
            <div>
              <h4>Read before you react.</h4>
              <p>
                Awareness beats athleticism. We train the scan, not just the
                swing.
              </p>
            </div>
          </div>
        </RevealWrapper>
        <RevealWrapper delay={80}>
          <div className="pillar">
            <div className="n">02</div>
            <div>
              <h4>Patterns, not hope.</h4>
              <p>
                Every point is a decision tree. I&apos;ll show you the right
                branches.
              </p>
            </div>
          </div>
        </RevealWrapper>
        <RevealWrapper delay={160}>
          <div className="pillar">
            <div className="n">03</div>
            <div>
              <h4>Pressure is a skill.</h4>
              <p>
                Routines and breath work so your A-game shows up in the third
                game.
              </p>
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
