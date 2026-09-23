function Hero() {
  return (
    <section id="hero" className="hero">
      <p className="hero-greeting">
        Hi there, my name is <span className="hero-name">Ezra</span>.
      </p>
      <h1 className="hero-title">A Frontend Developer.</h1>
      <h2 className="hero-subtitle">I build interactive things for the web.</h2>
      <p className="hero-desc">
        I&apos;m a Computer Science student who absolutely loves building exceptional digital
        experiences. Right now, I&apos;m focused on crafting clean, accessible, and user-centric
        frontend applications.
      </p>
      <div className="hero-actions">
        <a href="#projects" className="btn btn-primary">Check out my work →</a>
        <a href="#contact" className="btn btn-outline">Get in touch</a>
      </div>
    </section>
  );
}

export default Hero;
