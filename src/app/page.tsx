import Image from 'next/image';
import { chef } from '@/data/chef';
import { gallery } from '@/data/gallery';
import { Gallery, SiteHeader } from '@/components/interactions';

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

const hasGallery = gallery.some((photo) => photo.image);

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
        <div className="about-copy"><p>Rajiv Limbajee is a professional chef from Mauritius and Head Chef at Le Petit Beefbar Edinburgh, within InterContinental Edinburgh The George.</p><p>His career includes kitchen roles in Edinburgh and Dubai, with an earlier position at Jumeirah Vittaveli.</p><a className="inline-link" href={chef.linkedin} target="_blank" rel="noreferrer">Professional profile on LinkedIn <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>

    <section className="career section-wrap" id="career" aria-labelledby="career-title">
      <div className="section-head">
        <div className="section-meta"><Eyebrow>02 <span>/</span> Experience</Eyebrow><span className="meta-rule" /></div>
        <div className="section-title-group"><p className="section-overline">A career in the kitchen</p><h2 id="career-title">The professional<br /><em>journey.</em></h2></div>
        <p className="section-summary">From early kitchen roles to Head Chef in Edinburgh.</p>
      </div>
      <ol className="timeline">{chef.career.map((job, index) => <li className="timeline-item" key={`${job.employer}-${job.title}`}>
        <span className="timeline-index">{String(index + 1).padStart(2, '0')}</span>
        <div className="timeline-main"><h3>{job.title}</h3><p>{job.employer}</p></div>
        <time>{job.dates}</time>
      </li>)}</ol>
    </section>

    {hasGallery && <section className="gallery-section section-wrap" id="gallery" aria-labelledby="gallery-title">
      <div className="section-head">
        <div className="section-meta"><Eyebrow>03 <span>/</span> Gallery</Eyebrow><span className="meta-rule" /></div>
        <div className="section-title-group"><p className="section-overline">Kitchen and food photography</p><h2 id="gallery-title">Selected <em>work.</em></h2></div>
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
          {chef.emails.map((email) => <a className="contact-button contact-email" href={`mailto:${email}`} key={email}>{email} <span aria-hidden="true">↗</span></a>)}
          <a className="contact-button" href={chef.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
        </div></div>
      </div>
    </section>

    <footer className="site-footer"><a className="footer-mark" href="#top" aria-label="Back to top">RL<span>.</span></a><p>Rajiv Limbajee<br /><span>Professional Chef · Edinburgh</span></p><a className="footer-link" href={chef.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a><small>© {new Date().getFullYear()} RAJIV LIMBAJEE</small></footer>
  </main>;
}



