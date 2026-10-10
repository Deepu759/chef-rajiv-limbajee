'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
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
  const photos = gallery;
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(query.matches);
    updatePreference();
    query.addEventListener('change', updatePreference);
    return () => query.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState === 'visible');
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (photos.length < 2 || paused || reducedMotion || !pageVisible) return;
    const timer = window.setTimeout(() => {
      setPreviousIndex(activeIndex);
      setActiveIndex((activeIndex + 1) % photos.length);
    }, 2000);
    return () => window.clearTimeout(timer);
  }, [activeIndex, pageVisible, paused, photos.length, reducedMotion]);

  useEffect(() => {
    if (previousIndex === null) return;
    const timer = window.setTimeout(() => setPreviousIndex(null), 850);
    return () => window.clearTimeout(timer);
  }, [previousIndex]);

  if (photos.length === 0) return null;

  const nextIndex = (activeIndex + 1) % photos.length;
  const imageSizes = '(max-width: 640px) calc(100vw - 44px), (max-width: 1440px) 86vw, 1200px';

  return <>
    <div className="gallery-slideshow" role="region" aria-roledescription="carousel" aria-label="Food photographs">
      <div className="gallery-frame" role="group" aria-roledescription="slide" aria-label={`${activeIndex + 1} of ${photos.length}`} aria-live="off">
        {previousIndex !== null && <Image key={photos[previousIndex].image} src={photos[previousIndex].image} alt="" fill sizes={imageSizes} className="gallery-slide gallery-slide-previous" aria-hidden="true" />}
        <Image key={photos[activeIndex].image} src={photos[activeIndex].image} alt={photos[activeIndex].alt} fill sizes={imageSizes} className="gallery-slide gallery-slide-active" priority={activeIndex === 0} />
        {photos.length > 1 && <Image key={photos[nextIndex].image} src={photos[nextIndex].image} alt="" fill sizes={imageSizes} className="gallery-slide gallery-slide-prefetch" aria-hidden="true" loading="eager" />}
      </div>
      {photos.length > 1 && !reducedMotion && <button className="gallery-toggle" type="button" onClick={() => setPaused(!paused)}>{paused ? 'Play slideshow' : 'Pause slideshow'}</button>}
    </div>
  </>;
}



