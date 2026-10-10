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
  const photos = gallery;
  const [activeIndex, setActiveIndex] = useState(0);
  const [interactionPause, setInteractionPause] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [dragging, setDragging] = useState(false);
  const inactivityTimer = useRef<number | null>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

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
    if (photos.length < 2 || interactionPause || reducedMotion || !pageVisible) return;
    const timer = window.setTimeout(() => {
      setActiveIndex((activeIndex + 1) % photos.length);
    }, 2000);
    return () => window.clearTimeout(timer);
  }, [activeIndex, interactionPause, pageVisible, photos.length, reducedMotion]);

  useEffect(() => {
    return () => {
      if (inactivityTimer.current !== null) window.clearTimeout(inactivityTimer.current);
    };
  }, []);

  if (photos.length === 0) return null;

  function noteInteraction() {
    setInteractionPause(true);
    if (inactivityTimer.current !== null) window.clearTimeout(inactivityTimer.current);
    inactivityTimer.current = window.setTimeout(() => {
      inactivityTimer.current = null;
      setInteractionPause(false);
    }, 10000);
  }

  function move(direction: -1 | 1) {
    noteInteraction();
    setActiveIndex((current) => (current + direction + photos.length) % photos.length);
  }

  const imageSizes = '(max-width: 640px) calc(84vw - 37px), (max-width: 1440px) 72vw, 1024px';

  return <>
    <div className="gallery-slideshow" role="region" aria-roledescription="carousel" aria-label="Food photographs">
      <div className={dragging ? 'gallery-frame is-dragging' : 'gallery-frame'} role="group" aria-label="Use the left and right arrow keys to change photos" aria-live="off" tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
          if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
        }}
        onPointerDown={(event) => {
          if (event.button !== 0 || (event.target as HTMLElement).closest('button, a')) return;
          pointerStart.current = { x: event.clientX, y: event.clientY };
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragging(true);
          noteInteraction();
        }}
        onPointerUp={(event) => {
          const start = pointerStart.current;
          pointerStart.current = null;
          setDragging(false);
          if (!start) return;
          const deltaX = event.clientX - start.x;
          const deltaY = event.clientY - start.y;
          if (Math.abs(deltaX) > 36 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) move(deltaX < 0 ? 1 : -1);
        }}
        onPointerCancel={() => { pointerStart.current = null; setDragging(false); }}>
        {Array.from({ length: 5 }, (_, slot) => {
          const offset = slot - 2;
          const index = (activeIndex + offset + photos.length) % photos.length;
          const active = offset === 0;
          const side = Math.abs(offset) === 1;
          return <div key={photos[index].image} className={`gallery-slide${active ? ' gallery-slide-active' : side ? ' gallery-slide-side' : ' gallery-slide-away'}`}
            role={active ? 'group' : undefined} aria-roledescription={active ? 'slide' : undefined}
            aria-label={active ? `${activeIndex + 1} of ${photos.length}` : undefined} aria-hidden={!active}
            style={{ transform: `translate3d(calc(-50% + ${offset * 99}%), -50%, 0) scale(${active ? 1 : 0.9})` }}>
            <Image src={photos[index].image} alt={active ? photos[index].alt : ''} fill sizes={imageSizes} priority={active && activeIndex === 0} loading={Math.abs(offset) <= 1 ? 'eager' : 'lazy'} />
          </div>;
        })}
      </div>
      <div className="gallery-controls">
        <button type="button" aria-label="Previous food photograph" onClick={() => move(-1)}>←</button>
        <button type="button" aria-label="Next food photograph" onClick={() => move(1)}>→</button>
      </div>
    </div>
  </>;
}



