import Image from 'next/image';
import { chef } from '@/data/chef';
import { gallery } from '@/data/gallery';
import { Gallery, SiteHeader } from '@/components/interactions';

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

const hasGallery = gallery.some((photo) => photo.image);

function MailIcon() {
  return <svg aria-hidden="true" className="contact-icon" viewBox="0 0 16 12" fill="none">
    <rect x=".75" y=".75" width="14.5" height="10.5" rx="1" stroke="currentColor" strokeWidth="1.25" />
    <path d="m1.25 2 6.28 4.74a.78.78 0 0 0 .94 0L14.75 2" stroke="currentColor" strokeWidth="1.25" />
  </svg>;
}

function LinkedInIcon() {
  return <svg aria-hidden="true" className="linkedin-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 9h3.56v11.45H3.56V9ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>;
}

export default function Home() {
  return <main id="top">
    <a className="skip-link" href="#about">Skip to content</a>
    <section className="hero" aria-labelledby="hero-title">
      <SiteHeader showGallery={hasGallery} />
      <div className="hero-inner">
        <div className="hero-copy">
          <Eyebrow>Professional Chef <span aria-hidden="true">/</span> Edinburgh, Scotland</Eyebrow>
          <h1 id="hero-title">Rajiv<br /><em>Limbajee</em></h1>
          <p className="hero-role">Head Chef <span>at</span> Le Petit Beefbar Edinburgh</p>
          <p className="hero-hotel">InterContinental Edinburgh The George</p>
          <a className="text-link" href="#career">View career <span aria-hidden="true">↓</span></a>
        </div>
        {chef.portrait && <div className="hero-portrait"><Image src={chef.portrait} alt="Chef Rajiv Limbajee plating food at a kitchen pass, wearing a chef jacket and dark apron." fill priority sizes="(max-width: 640px) 90vw, (max-width: 900px) 42vw, 58vw" className="portrait-image" /></div>}
      </div>
    </section>

    <section className="about section-wrap" id="about" aria-labelledby="about-title">
      <div className="section-meta"><Eyebrow>01 <span>/</span> Profile</Eyebrow><span className="meta-rule" /></div>
      <div className="about-content">
        <div className="about-heading"><p className="section-overline">A professional profile</p><h2 id="about-title">From Mauritius.<br /><em>Based in Edinburgh.</em></h2></div>
        <div className="about-copy"><p>{chef.biography}</p><a className="inline-link" href={chef.linkedin} target="_blank" rel="noreferrer">Professional profile on LinkedIn <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>

    <section className="career section-wrap" id="career" aria-labelledby="career-title">
      <div className="section-head">
        <div className="section-meta"><Eyebrow>02 <span>/</span> Experience</Eyebrow><span className="meta-rule" /></div>
        <div className="section-title-group"><p className="section-overline">International experience</p><h2 id="career-title">Career <em>Journey</em></h2></div>
        <p className="section-summary">Roles across Mauritius, the Maldives, the UAE and Scotland.</p>
      </div>
      <ol className="timeline">{chef.career.map((job, index) => <li className="timeline-item" key={`${job.employer}-${job.title}`}>
        <span className="timeline-index">{String(index + 1).padStart(2, '0')}</span>
        <div className="timeline-main"><h3>{job.title}</h3><p className="timeline-employer">{job.employer}</p>{job.location && <p className="timeline-detail">{job.location}{job.focus && <> <span aria-hidden="true">·</span> {job.focus}</>}</p>}</div>
        <time>{job.dates}</time>
      </li>)}</ol>
    </section>

    {hasGallery && <section className="gallery-section section-wrap" id="gallery" aria-labelledby="gallery-title">
      <div className="section-head">
        <div className="section-meta"><Eyebrow>03 <span>/</span> Gallery</Eyebrow><span className="meta-rule" /></div>
        <div className="section-title-group"><p className="section-overline">Food photography</p><h2 id="gallery-title">Selected <em>work.</em></h2></div>
      </div>
      <Gallery />
    </section>}

    {chef.philosophy && <section className="philosophy section-wrap"><div className="section-meta"><Eyebrow>04 <span>/</span> Approach</Eyebrow></div><blockquote>{chef.philosophy}</blockquote></section>}
    {chef.awards.length > 0 && <section className="recognition section-wrap"><div className="section-meta"><Eyebrow>Recognition</Eyebrow></div><ul>{chef.awards.map((award) => <li key={award}>{award}</li>)}</ul></section>}
    {chef.skills.length > 0 && <section className="skills section-wrap"><div className="section-meta"><Eyebrow>Specialisms</Eyebrow></div><ul>{chef.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></section>}
    {chef.reference.quotation && <section className="reference section-wrap"><div className="section-meta"><Eyebrow>Professional reference</Eyebrow></div><blockquote>{chef.reference.quotation}</blockquote><p>{chef.reference.name} <span>·</span> {chef.reference.role}, {chef.reference.workplace}</p></section>}

    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-inner"><div className="contact-meta"><Eyebrow>04 <span>/</span> Contact</Eyebrow><span>EDINBURGH, SCOTLAND</span></div>
        <h2 id="contact-title">For professional<br /><em>enquiries.</em></h2>
        <div className="contact-bottom"><p>Email or connect with Rajiv on LinkedIn.</p><div className="contact-links">
          {chef.emails.map((email) => <a className="contact-button contact-email" href={`mailto:${email}`} key={email}>{email} <MailIcon /></a>)}
          <a className="contact-button" href={chef.linkedin} target="_blank" rel="noreferrer">LinkedIn <LinkedInIcon /></a>
        </div></div>
      </div>
    </section>

    <footer className="site-footer"><a className="footer-mark" href="#top" aria-label="Back to top">RL<span>.</span></a><p>Rajiv Limbajee<br /><span>Professional Chef · Edinburgh</span></p><a className="footer-link" href={chef.linkedin} target="_blank" rel="noreferrer">LinkedIn <LinkedInIcon /></a><small>© {new Date().getFullYear()} RAJIV LIMBAJEE</small></footer>
  </main>;
}



