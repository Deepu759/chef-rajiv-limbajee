'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { chef } from '@/data/chef';
import { gallery } from '@/data/gallery';

export function SiteHeader({ showGallery }: { showGallery: boolean }) {
  const [open, setOpen] = useState(false);
  const links = [
    ['About', '#about'],
    ['Career', '#career'],
    ...(showGallery ? [['Gallery', '#gallery']] : []),
    ['Contact', '#contact'],
  ];

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  return <header className="site-header">
    <a className="wordmark" href="#top" aria-label="Rajiv Limbajee, home">RL<span>.</span></a>
    <button className="menu-toggle" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
      <span>{open ? 'Close' : 'Menu'}</span><span className="menu-toggle-mark" aria-hidden="true">{open ? '−' : '+'}</span>
    </button>
    <nav id="primary-navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">
      {links.map(([name, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{name}</a>)}
      <a className="nav-linkedin" href={chef.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
    </nav>
  </header>;
}

export function Gallery() {
  const photos = gallery.filter((photo) => photo.image);
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const item = photos.find((photo) => photo.id === active);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (active !== null && dialog && !dialog.open) dialog.showModal();
    return () => { if (dialog?.open) dialog.close(); };
  }, [active]);

  if (photos.length === 0) return null;

  return <>
    <div className="gallery-grid">
      {photos.map((photo) => <button className="gallery-card" key={photo.id} onClick={() => setActive(photo.id)} aria-label={`View ${photo.title}`}>
        <span className="gallery-art"><Image src={photo.image!} alt={photo.alt} fill sizes="(max-width: 620px) 84vw, (max-width: 900px) 42vw, 28vw" className="gallery-image" /></span>
        <span className="gallery-caption"><span><strong>{photo.title}</strong>{photo.note && <small>{photo.note}</small>}</span><span className="gallery-arrow" aria-hidden="true">↗</span></span>
      </button>)}
    </div>
    {item && <dialog ref={dialogRef} className="lightbox" aria-labelledby="lightbox-title" onClick={(event) => { if (event.target === event.currentTarget) setActive(null); }} onCancel={() => setActive(null)}>
      <div className="lightbox-inner"><button className="lightbox-close" autoFocus onClick={() => setActive(null)} aria-label="Close gallery">×</button>
        <div className="lightbox-art"><Image src={item.image!} alt={item.alt} fill sizes="(max-width: 620px) 84vw, 45vw" className="lightbox-image" /></div>
        <div className="lightbox-copy"><p className="eyebrow">SELECTED WORK</p><h3 id="lightbox-title">{item.title}</h3>{item.note && <p>{item.note}</p>}</div>
      </div>
    </dialog>}
  </>;
}



