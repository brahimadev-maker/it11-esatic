import { useState, useEffect, useRef } from "react";

import right from "../src/Images/right.png"
import logo from "../src/Images/logo.png"
import rand from "../src/Images/event2.png"


/* ─────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────── */
const C = {
  bg: "#ffffff",
  soft: "#f4f7ff",
  blue: "#0170bf",
  bright: "#0170bf",
  light: "#e8f0fd",
  red: "#e8122c",
  dark: "#0a1628",
  text: "#1a2540",
  muted: "#5a6a8a",
  green: "#16a34a",
  orange: "#d97706",
  purple: "#7c3aed",
};

/* ─────────────────────────────────────────
   ICONS
───────────────────────────────────────── */
const icons = {
  home:         <><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H14v-5h-4v5H4a1 1 0 0 1-1-1V9.5z"/></>,
  info:         <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
  users:        <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
  image:        <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>,
  briefcase:    <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></>,
  mail:         <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
  user:         <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
  calendar:     <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
  clock:        <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  mapPin:       <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
  arrowRight:   <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
  chevDown:     <><polyline points="7 13 12 18 17 13"/><polyline points="7 6 12 11 17 6"/></>,
  star:         <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
  zap:          <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
  globe:        <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
  linkedin:     <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>,
  facebook:     <><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></>,
  instagram:    <><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>,
  youtube:      <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></>,
  check:        <><polyline points="20 6 9 17 4 12"/></>,
  code:         <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
  trendUp:      <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
  building:     <><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M9 3v18"/><path d="M2 9h7"/><path d="M2 15h7"/><path d="M16 8h2"/><path d="M16 12h2"/><path d="M16 16h2"/></>,
  graduationCap:<><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></>,
  fileText:     <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
  network:      <><circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="13"/><circle cx="5" cy="17" r="3"/><circle cx="19" cy="17" r="3"/><line x1="12" y1="13" x2="5" y2="17"/><line x1="12" y1="13" x2="19" y2="17"/></>,
  hiking:       <><circle cx="13" cy="4" r="2"/><path d="M10 10.5l-2 7L11 16l1 5"/><path d="M13 10.5l2 7-3-.5"/><path d="M9 10.5h5l1-3H8l1 3z"/></>,
  trophy:       <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></>,
  party:        <><path d="M5.8 11.3L2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2z"/></>,
  menu:         <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,
  x:            <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
  externalLink: <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
  coins:        <><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></>,
  whatsapp:     <><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></>,
};

const Ic = ({ n, size = 20, color = "currentColor", sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {icons[n]}
  </svg>
);

/* ─────────────────────────────────────────
   RESPONSIVE HOOK
───────────────────────────────────────── */
const useBreakpoint = () => {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setWidth(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return {
    isMobile: width < 640,
    isTablet: width < 1024,
    isDesktop: width >= 1024,
    width,
  };
};

/* ─────────────────────────────────────────
   FADE-IN ON SCROLL
───────────────────────────────────────── */
const FadeIn = ({ children, delay = 0, style = {} }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVis(true), delay); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: `opacity .65s ease ${delay}ms, transform .65s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  );
};

/* ─────────────────────────────────────────
   SMALL HELPERS
───────────────────────────────────────── */
const Tag = ({ children }) => (
  <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: C.bright, marginBottom: 12 }}>
    ✦ {children}
  </span>
);

const SectionTitle = ({ children, style = {} }) => (
  <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(30px,4.5vw,56px)", letterSpacing: 2, color: C.dark, lineHeight: 1, marginBottom: 16, ...style }}>
    {children}
  </h2>
);

const Btn = ({ children, variant = "primary", href = "#", onClick, style = {} }) => {
  const base = { padding: "13px 24px", borderRadius: 40, fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "all .25s", border: "none", fontFamily: "'Outfit',sans-serif" };
  const vs = {
    primary: { background: C.red, color: "#fff", boxShadow: "0 8px 24px rgba(232,18,44,.22)" },
    outline:  { background: "transparent", color: C.blue, border: `2px solid rgba(26,108,232,.3)` },
    white:    { background: "#fff", color: C.blue, boxShadow: "0 8px 24px rgba(0,0,0,.12)" },
    blue:     { background: C.blue, color: "#fff", boxShadow: "0 8px 24px rgba(16,64,160,.22)" },
    green:    { background: C.green, color: "#fff", boxShadow: "0 8px 24px rgba(22,163,74,.22)" },
  };
  return <a href={href} onClick={onClick} style={{ ...base, ...vs[variant], ...style }}>{children}</a>;
};

/* ══════════════════════════════════════════
   NAVBAR — RESPONSIVE WITH HAMBURGER
══════════════════════════════════════════ */
const Navbar = ({ active, setActive }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isTablet } = useBreakpoint();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    if (!isTablet) setMenuOpen(false);
  }, [isTablet]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = [
    { id: "accueil",      label: "Accueil",       icon: "home" },
    { id: "apropos",      label: "À propos",      icon: "info" },
    { id: "evenements",   label: "Événements",    icon: "calendar" },
    { id: "opportunites", label: "Opportunités",  icon: "briefcase" },
    { id: "membres",      label: "Membres",       icon: "users" },
    { id: "galerie",      label: "Galerie",       icon: "image" },
    { id: "contact",      label: "Contact",       icon: "mail" },
  ];

  const handleNavClick = (id) => {
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "space-between", padding: isTablet ? "12px 20px" : "12px 48px", background: scrolled || menuOpen ? "rgba(255,255,255,.98)" : "rgba(255,255,255,.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(26,108,232,.10)", boxShadow: scrolled ? "0 4px 28px rgba(26,108,232,.09)" : "none", transition: "all .3s", fontFamily: "'Outfit',sans-serif", boxSizing: "border-box" }}>
        
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, zIndex: 10 }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: C.light, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            {logo ? <img src={logo} alt="Logo IT11" style={{ width: "100%", height: "100%", objectFit: "contain" }} /> : <span style={{ fontWeight: 900, fontSize: 13, color: C.blue }}>IT11</span>}
          </div>
          <span style={{ fontWeight: 800, fontSize: isTablet ? 11 : 13, letterSpacing: 3, textTransform: "uppercase", color: C.blue }}>Promotion IT11</span>
        </div>

        {/* Desktop Links */}
        {!isTablet && (
          <div style={{ display: "flex", gap: 2 }}>
            {links.map(l => (
              <a key={l.id} href={`#${l.id}`} onClick={() => handleNavClick(l.id)}
                style={{ textDecoration: "none", fontSize: 11.5, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "7px 14px", borderRadius: 30, background: active === l.id ? C.red : "transparent", color: active === l.id ? "#fff" : C.text, transition: "all .22s" }}>
                {l.label}
              </a>
            ))}
          </div>
        )}

        {/* Desktop Social */}
        {!isTablet && (
          <div style={{ display: "flex", gap: 7 }}>
            {["facebook", "instagram", "linkedin", "youtube"].map(s => (
              <a key={s} href="/" style={{ width: 30, height: 30, borderRadius: "50%", background: C.light, border: "1px solid rgba(26,108,232,.18)", display: "flex", alignItems: "center", justifyContent: "center", color: C.bright, textDecoration: "none" }}>
                <Ic n={s} size={14} />
              </a>
            ))}
          </div>
        )}

        {/* Hamburger Button */}
        {isTablet && (
          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: menuOpen ? C.light : "transparent", border: `1.5px solid rgba(26,108,232,.2)`, borderRadius: 10, width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .2s", zIndex: 10 }}>
            <Ic n={menuOpen ? "x" : "menu"} size={20} color={C.blue} />
          </button>
        )}
      </nav>

      {/* Mobile Menu Drawer */}
      {isTablet && (
        <>
          {/* Overlay */}
          <div onClick={() => setMenuOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(10,22,40,.5)", zIndex: 290, opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none", transition: "opacity .3s", backdropFilter: "blur(4px)" }} />

          {/* Drawer */}
          <div style={{ position: "fixed", top: 0, right: 0, width: "min(320px, 85vw)", height: "100vh", background: "#fff", zIndex: 295, transform: menuOpen ? "translateX(0)" : "translateX(100%)", transition: "transform .35s cubic-bezier(.4,0,.2,1)", boxShadow: "-8px 0 40px rgba(10,22,40,.15)", display: "flex", flexDirection: "column", overflowY: "auto" }}>
            
            {/* Drawer Header */}
            <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(26,108,232,.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 900, fontSize: 14, letterSpacing: 2, textTransform: "uppercase", color: C.blue }}>Promotion IT11</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>ESATIC · Abidjan, CI</div>
              </div>
              <button onClick={() => setMenuOpen(false)} style={{ background: C.light, border: "none", borderRadius: 8, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Ic n="x" size={16} color={C.blue} />
              </button>
            </div>

            {/* Nav Links */}
            <div style={{ padding: "16px 16px", flex: 1 }}>
              {links.map((l, i) => (
                <a key={l.id} href={`#${l.id}`} onClick={() => handleNavClick(l.id)}
                  style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 14, marginBottom: 4, background: active === l.id ? `linear-gradient(135deg,${C.red},#c0101f)` : "transparent", transition: "all .2s" }}
                  onMouseEnter={e => { if (active !== l.id) e.currentTarget.style.background = C.soft; }}
                  onMouseLeave={e => { if (active !== l.id) e.currentTarget.style.background = "transparent"; }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: active === l.id ? "rgba(255,255,255,.2)" : C.light, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Ic n={l.icon} size={17} color={active === l.id ? "#fff" : C.bright} />
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: .5, color: active === l.id ? "#fff" : C.text }}>{l.label}</span>
                </a>
              ))}
            </div>

            {/* Social in drawer */}
            <div style={{ padding: "20px 24px", borderTop: "1px solid rgba(26,108,232,.1)" }}>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.muted, marginBottom: 12 }}>Suivez-nous</div>
              <div style={{ display: "flex", gap: 10 }}>
                {["facebook", "instagram", "linkedin", "youtube"].map(s => (
                  <a key={s} href="/" style={{ width: 38, height: 38, borderRadius: "50%", background: C.light, border: "1px solid rgba(26,108,232,.18)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                    <Ic n={s} size={16} color={C.bright} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

/* ══════════════════════════════════════════
   HERO — RESPONSIVE
══════════════════════════════════════════ */
const Hero = () => {
  const { isMobile, isTablet } = useBreakpoint();

  return (
    <section id="accueil" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: isMobile ? "100px 20px 60px" : isTablet ? "120px 32px 70px" : "130px 56px 70px", background: C.bg, fontFamily: "'Outfit',sans-serif" }}>
      {/* BG deco */}
      {[{ w:520,h:520,bottom:-140,left:-100 },{ w:280,h:280,top:70,right:240 },{ w:140,h:140,top:200,left:330 }].map((c,i)=>(
        <div key={i} style={{ position:"absolute", borderRadius:"50%", border:"1px solid rgba(26,108,232,.07)", pointerEvents:"none", zIndex:0, ...c }} />
      ))}
      {!isMobile && (
        <>
          <div style={{ position:"absolute",right:0,top:0,width:430,height:"100%",background:"linear-gradient(160deg,rgba(26,108,232,.07) 0%,rgba(232,18,44,.05) 100%)",clipPath:"polygon(22% 0%,100% 0%,100% 100%,0% 100%)",pointerEvents:"none",zIndex:0 }} />
          <div style={{ position:"absolute",right:0,top:0,width:260,height:"100%",background:"linear-gradient(160deg,rgba(26,108,232,.10) 0%,rgba(232,18,44,.07) 100%)",clipPath:"polygon(42% 0%,100% 0%,100% 100%,18% 100%)",pointerEvents:"none",zIndex:0 }} />
        </>
      )}

      {/* Left content */}
      <div style={{ position:"relative",zIndex:2,maxWidth: isTablet ? "100%" : 560, width: "100%" }}>
        <p style={{ fontSize:15,color:C.muted,marginBottom:8,letterSpacing:1 }}>Bienvenue dans la</p>
        <h1 style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize: isMobile ? "clamp(46px,14vw,70px)" : "clamp(50px,6.5vw,84px)",lineHeight:.93,letterSpacing:3,color:C.dark,margin:0 }}>
          <span style={{ color:C.bright }}>PROMOTION</span><br/>
          <span style={{ color:C.red }}>IT</span>11
        </h1>
        <div style={{ fontFamily:"'Dancing Script',cursive",fontSize: isMobile ? "clamp(28px,9vw,44px)" : "clamp(34px,4.5vw,58px)",color:C.bright,marginTop:12,lineHeight:1.1 }}>Akwaba</div>
        <div style={{ fontFamily:"'Dancing Script',cursive",fontSize: isMobile ? "clamp(20px,7vw,32px)" : "clamp(22px,3vw,40px)",color:C.red,marginBottom:18 }}>aux nouveaux !</div>

        <p style={{ fontSize:14.5,color:C.muted,lineHeight:1.85,maxWidth:450,marginBottom:32 }}>
          La Promotion IT11 de l'ESATIC — ensemble, nous bâtissons l'avenir numérique de la Côte d'Ivoire.
        </p>

        {/* ── PROCHAIN EVENT CTA ── */}
    <div
  style={{
    position: "relative",
    borderRadius: 18,
    padding: isMobile ? "16px 18px" : "20px 24px",
    marginBottom: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
    flexWrap: isMobile ? "wrap" : "nowrap",
    overflow: "hidden",
    backgroundImage: `url(${rand})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Overlay sombre pour améliorer la lisibilité */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55))",
      zIndex: 0,
    }}
  />

  {/* Contenu */}
  <div style={{ position: "relative", zIndex: 1 }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 10,
        letterSpacing: 2,
        textTransform: "uppercase",
        color: "rgba(255,255,255,.75)",
        marginBottom: 6,
      }}
    >
      <Ic n="zap" size={12} color="#facc15" /> Prochain événement
    </div>

    <div
      style={{
        fontFamily: "'Bebas Neue',sans-serif",
        fontSize: 24,
        letterSpacing: 2,
        color: "#fff",
        lineHeight: 1,
      }}
    >
      Randonnée IT11
    </div>

    <div
      style={{
        fontSize: 12,
        color: "rgba(255,255,255,.8)",
        marginTop: 4,
      }}
    >
      Date à confirmer · Bientôt...
    </div>
  </div>

  <div style={{ position: "relative", zIndex: 1 }}>
    <Btn
      href="#evenements"
      variant="white"
      style={{ whiteSpace: "nowrap", padding: "10px 20px", fontSize: 12 }}
    >
      Participer <Ic n="arrowRight" size={14} color={C.blue} />
    </Btn>
  </div>
</div>

        <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
          <Btn href="#membres" style={{ fontSize: isMobile ? 12 : 13 }}>Découvrir la Promo <Ic n="arrowRight" size={15} /></Btn>
          <Btn href="#opportunites" variant="outline" style={{ fontSize: isMobile ? 12 : 13 }}>Opportunités <Ic n="briefcase" size={15} /></Btn>
        </div>
      </div>

      {/* Right photo — hidden on mobile */}
      {!isTablet && (
        <div style={{ position:"absolute",right:70,bottom:20,zIndex:1,width:380,height:"80%",display:"flex",alignItems:"flex-end",justifyContent:"center" }}>
          <div style={{ width:"100%",height:"100%",borderTopLeftRadius:220,borderTopRightRadius:220,background:C.light,border:"2px dashed rgba(26,108,232,.2)",overflow:"hidden" }}>
            {right && <img src={right} alt="Promotion" style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }} />}
          </div>
        </div>
      )}

      {/* Tablet: show smaller photo */}
      {isTablet && !isMobile && (
        <div style={{ position:"absolute",right:0,bottom:0,zIndex:0,width:220,height:320,opacity:.15,pointerEvents:"none" }}>
          <div style={{ width:"100%",height:"100%",borderTopLeftRadius:180,background:C.light,overflow:"hidden" }}>
            {right && <img src={right} alt="" style={{ width:"100%",height:"100%",objectFit:"cover" }} />}
          </div>
        </div>
      )}

      <div style={{ position:"absolute",bottom:26,left: isMobile ? 20 : 56,display:"flex",alignItems:"center",gap:10,fontSize:11,letterSpacing:2,textTransform:"uppercase",color:C.muted,zIndex:10 }}>
        <div style={{ width:34,height:1,background:"rgba(26,108,232,.22)" }} />
        Défiler <Ic n="chevDown" size={13} color={C.muted} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;600;700;900&family=Dancing+Script:wght@700&display=swap');
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        *{box-sizing:border-box;} html{scroll-behavior:smooth;}
        body{margin:0;padding:0;}
      `}</style>
    </section>
  );
};

/* ══════════════════════════════════════════
   STATS — RESPONSIVE
══════════════════════════════════════════ */
const Stats = () => {
  const { isMobile } = useBreakpoint();
  return (
    <div style={{ background:`linear-gradient(90deg,${C.blue},${C.bright})`,padding: isMobile ? "20px 16px" : "24px 56px",display:"flex",justifyContent:"space-around",alignItems:"center",gap:isMobile ? 0 : 20,flexWrap:"wrap",fontFamily:"'Outfit',sans-serif" }}>
      {[{ n:"IT11",l:"Promotion" },{ n:"2025",l:"Année" },{ n:"ESATIC",l:"École" },{ n:"ABJ",l:"Abidjan, CI" }].map((s,i)=>(
        <div key={s.n} style={{ display:"flex",alignItems:"center",gap:isMobile ? 0 : 18, flex: isMobile ? "1 1 50%" : "unset", justifyContent:"center", padding: isMobile ? "8px 0" : 0 }}>
          {!isMobile && i>0 && <div style={{ width:1,height:42,background:"rgba(255,255,255,.22)" }} />}
          <div style={{ textAlign:"center" }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize: isMobile ? 30 : 40,letterSpacing:2,color:"#fff",lineHeight:1 }}>{s.n}</div>
            <div style={{ fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"rgba(255,255,255,.7)",marginTop:3 }}>{s.l}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════
   ABOUT — RESPONSIVE
══════════════════════════════════════════ */
const About = () => {
  const { isTablet } = useBreakpoint();
  return (
    <section id="apropos" style={{ padding: isTablet ? "60px 20px" : "90px 56px", background:C.bg,fontFamily:"'Outfit',sans-serif" }}>
      <div style={{ display:"grid",gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr",gap: isTablet ? 40 : 60,alignItems:"center",maxWidth:1200,margin:"0 auto" }}>
        <FadeIn>
          <Tag>À propos de nous</Tag>
          <SectionTitle>Qui sommes-<br/>nous <span style={{ color:C.red }}>?</span></SectionTitle>
          <p style={{ fontSize:14.5,color:C.muted,lineHeight:1.9,marginBottom:14 }}>
            La Promotion IT11 est la onzième promotion de l'ESATIC, l'une des meilleures écoles d'ingénieurs spécialisées en TIC en Côte d'Ivoire et en Afrique de l'Ouest.
          </p>
          <p style={{ fontSize:14.5,color:C.muted,lineHeight:1.9,marginBottom:28 }}>
            Nous sommes une génération de passionnés, créateurs et innovateurs, portant fièrement les valeurs de rigueur, d'excellence et d'esprit d'équipe. Notre vision : faire du numérique un levier de développement pour l'Afrique.
          </p>
       <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:28 }}>
  {[
    { icon:"shield", label:"Cybersécurité & IA" },
    { icon:"cpu", label:"Mobilité, Big Data & Systèmes" },
    { icon:"database", label:"Big Data Intelligence (BIHAR)" },
    { icon:"code", label:"Systèmes d’Information & Génie Logiciel" },
    { icon:"network", label:"Réseaux & Télécom" },
    { icon:"server", label:"Experts Réseaux, Infrastructures & Sécurité" },
    { icon:"creditCard", label:"Finance & Technologie (FinTech)" },
    { icon:"globe", label:"Marketing Digital" },
  ].map(v => {
    const maxLength = 12; // seuil avant de tronquer
    const shortLabel =
      v.label.length > maxLength
        ? v.label.slice(0, maxLength) + "…"
        : v.label;

    return (
      <div
        key={v.label}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          background: C.light,
          borderRadius: 10,
          padding: "7px 13px",
        }}
      >
        <Ic n={v.icon} size={15} color={C.bright} />
        <span style={{ fontSize: 12, fontWeight: 600, color: C.blue }}>
          {shortLabel}
        </span>
      </div>
    );
  })}
</div>
          <Btn href="#membres">Voir les membres <Ic n="arrowRight" size={15} /></Btn>
        </FadeIn>

        <FadeIn delay={140}>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"180px 180px",gap:10 }}>
            <div style={{ gridRow:"span 2",borderRadius:16,background:C.light,border:"2px dashed rgba(26,108,232,.18)",overflow:"hidden" }}>
              <img src="" alt="Promo" style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }} />
            </div>
            {[2,3].map(n=>(
              <div key={n} style={{ borderRadius:14,background:C.light,border:"2px dashed rgba(26,108,232,.18)",overflow:"hidden" }}>
                <img src="" alt={`${n}`} style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }} />
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════
   ÉVÉNEMENTS — RESPONSIVE
══════════════════════════════════════════ */
const Evenements = () => {
  const [tab, setTab] = useState("aVenir");
  const { isMobile, isTablet } = useBreakpoint();

  const passes = [
    {
      titre: "Akwaba aux Nouveaux",
      date: "Mercredi 14/11/2025",
      heure: "13H – 14H",
      lieu: "Amphithéâtre ESATIC",
      desc: "Cérémonie d'accueil officielle des nouveaux étudiants de la Promotion IT11. Un moment de partage et de fraternité.",
      icon: "party",
      color: C.blue,
      photos: true,
    },
  ];

  const aVenir = [
    {
      titre: "Randonnée IT11",
      date: "Bientôt — Date à confirmer",
      heure: "À définir",
      lieu: "À définir",
      desc: "La grande randonnée de cohésion de la Promotion IT11. Préparation physique, team building et découverte de la nature ivoirienne.",
      icon: "hiking",
      color: C.green,
      highlight: true,
      image: true,
    },
  ];

  const events = tab === "aVenir" ? aVenir : passes;

  return (
    <section id="evenements" style={{ padding: isTablet ? "60px 20px" : "90px 56px",background:C.soft,fontFamily:"'Outfit',sans-serif" }}>
      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <FadeIn>
          <Tag>Vie de la promotion</Tag>
          <SectionTitle>Événements <span style={{ color:C.red }}>IT11</span></SectionTitle>
          <p style={{ fontSize:14.5,color:C.muted,maxWidth:500,lineHeight:1.8,marginBottom:36 }}>
            Les moments forts qui construisent l'esprit de la Promotion IT11.
          </p>
          <div style={{ display:"inline-flex",background:"rgba(26,108,232,.08)",borderRadius:40,padding:4,marginBottom:44,gap:4 }}>
            {[{ k:"aVenir",label:"À venir" },{ k:"passes",label:"Passés" }].map(t=>(
              <button key={t.k} onClick={()=>setTab(t.k)}
                style={{ padding:"8px 22px",borderRadius:36,border:"none",cursor:"pointer",fontSize:13,fontWeight:700,letterSpacing:.5,transition:"all .22s",fontFamily:"'Outfit',sans-serif",
                  background:tab===t.k ? C.blue : "transparent",
                  color:tab===t.k ? "#fff" : C.muted }}>
                {t.label}
              </button>
            ))}
          </div>
        </FadeIn>

        <div style={{ display:"flex",flexDirection:"column",gap:24 }}>
          {events.map((ev,i)=>(
            <FadeIn key={ev.titre} delay={i*80}>
              <div style={{ background:"#fff",borderRadius:22,overflow:"hidden",border:`1px solid ${ev.highlight ? "rgba(22,163,74,.25)" : "rgba(26,108,232,.10)"}`,boxShadow: ev.highlight ? "0 12px 40px rgba(22,163,74,.12)" : "0 4px 20px rgba(26,108,232,.06)",display:"grid",gridTemplateColumns: ev.image && !isMobile ? (isTablet ? "240px 1fr" : "340px 1fr") : "1fr",alignItems:"stretch" }}>

                {ev.image && !isMobile && (
                  <div style={{ position:"relative",background:"#1a2a1a",overflow:"hidden",minHeight:260 }}>
                    <img src={rand} alt="Randonnée IT11" style={{ width:"100%",height:"100%",objectFit:"cover",display:"block",opacity:.9 }} />
                    {ev.highlight && (
                      <div style={{ position:"absolute",top:16,left:16,background:"#16a34a",color:"#fff",fontSize:10,fontWeight:800,letterSpacing:2,textTransform:"uppercase",padding:"5px 14px",borderRadius:20,display:"flex",alignItems:"center",gap:5 }}>
                        <span style={{ width:6,height:6,background:"#fff",borderRadius:"50%",animation:"pulse 1.5s infinite" }} /> À venir
                      </div>
                    )}
                  </div>
                )}

                {/* Mobile image banner */}
                {ev.image && isMobile && (
                  <div style={{ position:"relative",height:180,background:"#1a2a1a",overflow:"hidden" }}>
                    <img src={rand} alt="Randonnée IT11" style={{ width:"100%",height:"100%",objectFit:"cover",display:"block",opacity:.9 }} />
                    {ev.highlight && (
                      <div style={{ position:"absolute",top:12,left:12,background:"#16a34a",color:"#fff",fontSize:10,fontWeight:800,letterSpacing:2,textTransform:"uppercase",padding:"4px 12px",borderRadius:20,display:"flex",alignItems:"center",gap:5 }}>
                        <span style={{ width:6,height:6,background:"#fff",borderRadius:"50%",animation:"pulse 1.5s infinite" }} /> À venir
                      </div>
                    )}
                  </div>
                )}

                <div style={{ padding: isMobile ? "22px 20px" : "32px 36px" }}>
                  {!ev.image && (
                    <div style={{ display:"inline-flex",alignItems:"center",gap:6,background: ev.highlight ? "rgba(22,163,74,.12)" : C.light,borderRadius:20,padding:"4px 14px",marginBottom:14,fontSize:10,fontWeight:800,letterSpacing:2,textTransform:"uppercase",color: ev.highlight ? C.green : C.muted }}>
                      {ev.highlight ? "À venir" : "Terminé"}
                    </div>
                  )}
                  <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:10 }}>
                    <div style={{ width:44,height:44,borderRadius:12,background:`${ev.color}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                      <Ic n={ev.icon} size={22} color={ev.color} />
                    </div>
                    <h3 style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize: isMobile ? 24 : 28,letterSpacing:2,color:C.dark,lineHeight:1 }}>{ev.titre}</h3>
                  </div>

                  <p style={{ fontSize:14,color:C.muted,lineHeight:1.75,marginBottom:20 }}>{ev.desc}</p>

                  <div style={{ display:"flex",flexWrap:"wrap",gap:10,marginBottom:24 }}>
                    {[
                      { icon:"calendar",val:ev.date },
                      { icon:"clock",val:ev.heure },
                      { icon:"mapPin",val:ev.lieu },
                    ].map(d=>(
                      <div key={d.icon} style={{ display:"flex",alignItems:"center",gap:8,background:C.soft,borderRadius:10,padding:"7px 12px" }}>
                        <Ic n={d.icon} size={14} color={C.bright} />
                        <span style={{ fontSize:12,fontWeight:600,color:C.text }}>{d.val}</span>
                      </div>
                    ))}
                  </div>

                  {ev.highlight ? (
                    <Btn href="#contact" variant="green">Participer <Ic n="arrowRight" size={15} /></Btn>
                  ) : (
                    <Btn href="#galerie" variant="outline" style={{ fontSize:12 }}>Voir les photos <Ic n="image" size={14} color={C.blue} /></Btn>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════
   OPPORTUNITÉS — RESPONSIVE
══════════════════════════════════════════ */
const statusBadge = (s) => {
  const map = { "Ouvert": { bg:"#dcfce7",color:"#16a34a" }, "Fermé": { bg:"#fee2e2",color:"#dc2626" }, "Bientôt": { bg:"#fef9c3",color:"#b45309" } };
  const style = map[s] || map["Bientôt"];
  return <span style={{ fontSize:10,fontWeight:800,letterSpacing:1.5,textTransform:"uppercase",padding:"3px 10px",borderRadius:20,...style }}>{s}</span>;
};

const OFFRES = [
  { entreprise:"Orange Bank Africa", poste:"Stagiaire Développeur Mobile", type:"Stage", duree:"6 mois", remunere:true, salaire:"80 000 – 120 000 FCFA/mois", statut:"Ouvert", lieu:"Abidjan, Plateau", domaine:"Mobile / Flutter", contact:"stages@orangebank.ci", color:C.orange },
  { entreprise:"NSIA Banque", poste:"Stagiaire Analyste Cybersécurité", type:"Stage", duree:"3 mois", remunere:true, salaire:"60 000 – 90 000 FCFA/mois", statut:"Bientôt", lieu:"Abidjan, Marcory", domaine:"Cybersécurité", contact:"rh@nsiabanque.ci", color:C.blue },
  { entreprise:"MTN Côte d'Ivoire", poste:"Ingénieur Réseaux Junior", type:"Emploi", duree:"CDI", remunere:true, salaire:"Selon profil", statut:"Ouvert", lieu:"Abidjan, Cocody", domaine:"Réseaux / Télécoms", contact:"recrutement@mtn.ci", color:"#fbbf24" },
  { entreprise:"Société Ivoirienne de Technologie", poste:"Développeur Full-Stack", type:"Emploi", duree:"CDD 12 mois", remunere:true, salaire:"250 000 – 350 000 FCFA/mois", statut:"Ouvert", lieu:"Abidjan, Zone 4", domaine:"Web / Node.js / React", contact:"jobs@sit.ci", color:C.bright },
  { entreprise:"CI-CERT", poste:"Stagiaire Analyste SOC", type:"Stage", duree:"4 mois", remunere:false, salaire:"Non rémunéré (attestation)", statut:"Bientôt", lieu:"Abidjan, Plateau", domaine:"Sécurité Opérationnelle", contact:"ci-cert@ci-cert.ci", color:C.red },
  { entreprise:"Startup TechAfrica", poste:"Développeur Backend Python", type:"Emploi", duree:"CDI", remunere:true, salaire:"200 000 – 300 000 FCFA/mois", statut:"Fermé", lieu:"Abidjan (Remote possible)", domaine:"Python / FastAPI / Cloud", contact:"hello@techafrica.ci", color:C.purple },
];

const Opportunites = () => {
  const [filtre, setFiltre] = useState("Tous");
  const { isTablet, isMobile } = useBreakpoint();
  const filtres = ["Tous","Stage","Emploi"];
  const filtered = filtre === "Tous" ? OFFRES : OFFRES.filter(o=>o.type===filtre);

  return (
    <section id="opportunites" style={{ padding: isTablet ? "60px 20px" : "90px 56px",background:C.bg,fontFamily:"'Outfit',sans-serif" }}>
      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <FadeIn>
          <Tag>Carrière & Développement</Tag>
          <SectionTitle>Opportunités <span style={{ color:C.red }}>Stages & Emplois</span></SectionTitle>
          <p style={{ fontSize:14.5,color:C.muted,maxWidth:520,lineHeight:1.8,marginBottom:32 }}>
            Des offres sélectionnées pour les membres de la Promotion IT11. Rémunération, statut et contacts directs inclus.
          </p>
          <div style={{ display:"inline-flex",background:"rgba(26,108,232,.07)",borderRadius:40,padding:4,marginBottom:40,gap:4 }}>
            {filtres.map(f=>(
              <button key={f} onClick={()=>setFiltre(f)}
                style={{ padding:"7px 20px",borderRadius:36,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,letterSpacing:.5,transition:"all .2s",fontFamily:"'Outfit',sans-serif",
                  background:filtre===f ? C.blue : "transparent",
                  color:filtre===f ? "#fff" : C.muted }}>
                {f}
              </button>
            ))}
          </div>
        </FadeIn>

        <div style={{ display:"grid",gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(auto-fill,minmax(340px,1fr))",gap:20 }}>
          {filtered.map((o,i)=>(
            <FadeIn key={o.poste} delay={i*60}>
              <div style={{ background:"#fff",border:"1px solid rgba(26,108,232,.10)",borderRadius:20,padding:"22px 22px",transition:"all .28s",cursor:"pointer",boxShadow:"0 2px 14px rgba(26,108,232,.05)",opacity: o.statut==="Fermé" ? .7 : 1 }}
                onMouseEnter={e=>{ if(o.statut!=="Fermé"){e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 18px 44px rgba(26,108,232,.12)";}}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 2px 14px rgba(26,108,232,.05)";}}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14 }}>
                  <div style={{ width:46,height:46,borderRadius:13,background:`${o.color}18`,display:"flex",alignItems:"center",justifyContent:"center" }}>
                    <Ic n={o.type==="Stage" ? "graduationCap" : "briefcase"} size={22} color={o.color} />
                  </div>
                  <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5 }}>
                    {statusBadge(o.statut)}
                    <span style={{ fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",background:o.type==="Stage" ? C.light : "#f3e8ff",color:o.type==="Stage" ? C.blue : C.purple,padding:"2px 9px",borderRadius:12 }}>{o.type}</span>
                  </div>
                </div>
                <h3 style={{ fontSize:15,fontWeight:800,color:C.dark,marginBottom:4 }}>{o.poste}</h3>
                <p style={{ fontSize:13,fontWeight:600,color:o.color,marginBottom:12 }}>{o.entreprise}</p>
                <div style={{ display:"flex",flexDirection:"column",gap:7,marginBottom:14 }}>
                  {[
                    { icon:"mapPin", val:o.lieu },
                    { icon:"clock",  val:o.duree },
                    { icon:"code",   val:o.domaine },
                  ].map(d=>(
                    <div key={d.icon} style={{ display:"flex",alignItems:"center",gap:7 }}>
                      <Ic n={d.icon} size={14} color={C.muted} />
                      <span style={{ fontSize:12.5,color:C.muted }}>{d.val}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: o.remunere ? "rgba(22,163,74,.08)" : "rgba(232,18,44,.06)", borderRadius:10,padding:"8px 12px",marginBottom:16,display:"flex",alignItems:"center",gap:8 }}>
                  <Ic n="coins" size={15} color={o.remunere ? C.green : C.red} />
                  <span style={{ fontSize:12,fontWeight:700,color:o.remunere ? C.green : C.red }}>{o.salaire}</span>
                </div>
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,flexWrap:"wrap" }}>
                  <a href={`mailto:${o.contact}`} style={{ fontSize:11,color:C.muted,display:"flex",alignItems:"center",gap:5,textDecoration:"none",minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>
                    <Ic n="mail" size={13} color={C.muted} /> <span style={{ overflow:"hidden",textOverflow:"ellipsis" }}>{o.contact}</span>
                  </a>
                  {o.statut !== "Fermé" && (
                    <a href={`mailto:${o.contact}`}
                      style={{ fontSize:12,fontWeight:700,color:o.color,textDecoration:"none",display:"flex",alignItems:"center",gap:5,border:`1.5px solid ${o.color}`,borderRadius:20,padding:"5px 14px",transition:"all .2s",flexShrink:0 }}>
                      Postuler <Ic n="arrowRight" size={13} color={o.color} />
                    </a>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={200}>
          <div style={{ marginTop:40,background:`linear-gradient(135deg,${C.dark},${C.blue})`,borderRadius:20,padding: isMobile ? "28px 24px" : "36px 48px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:24,flexWrap:"wrap",boxShadow:"0 16px 50px rgba(26,108,232,.17)" }}>
            <div>
              <div style={{ fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"rgba(255,255,255,.55)",marginBottom:6 }}>Entreprises & Partenaires</div>
              <h3 style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize: isMobile ? 24 : 30,letterSpacing:2,color:"#fff",lineHeight:1 }}>Publiez une offre pour la Promo IT11</h3>
            </div>
            <Btn href="#contact" variant="white" style={{ whiteSpace:"nowrap" }}>Nous contacter <Ic n="mail" size={15} color={C.blue} /></Btn>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════
   MEMBRES — RESPONSIVE
══════════════════════════════════════════ */
const BUREAU = [
  { titre:"Président(e)",           nom:"[ Nom Prénom ]", role:"Bureau de la Promotion" },
  { titre:"Vice-Président(e)",      nom:"[ Nom Prénom ]", role:"Bureau de la Promotion" },
  { titre:"Secrétaire Général(e)",  nom:"[ Nom Prénom ]", role:"Bureau de la Promotion" },
  { titre:"Trésorier(ère)",         nom:"[ Nom Prénom ]", role:"Bureau de la Promotion" },
  { titre:"Resp. Communication",    nom:"[ Nom Prénom ]", role:"Bureau de la Promotion" },
  { titre:"Resp. Technique",        nom:"[ Nom Prénom ]", role:"Bureau de la Promotion" },
  { titre:"Resp. Activités",        nom:"[ Nom Prénom ]", role:"Bureau de la Promotion" },
  { titre:"Resp. Relations Ext.",   nom:"[ Nom Prénom ]", role:"Bureau de la Promotion" },
];

const Membres = () => {
  const { isTablet, isMobile } = useBreakpoint();
  return (
    <section id="membres" style={{ padding: isTablet ? "60px 20px" : "90px 56px",background:C.soft,fontFamily:"'Outfit',sans-serif" }}>
      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <FadeIn>
          <Tag>Notre équipe dirigeante</Tag>
          <SectionTitle>Bureau de la <span style={{ color:C.red }}>Promotion IT11</span></SectionTitle>
          <p style={{ fontSize:14.5,color:C.muted,maxWidth:480,lineHeight:1.8,marginBottom:44 }}>
            Le bureau élu représente et anime la Promotion IT11 tout au long de l'année académique.
          </p>
        </FadeIn>

        <div style={{ display:"grid",gridTemplateColumns: isMobile ? "repeat(2,1fr)" : isTablet ? "repeat(3,1fr)" : "repeat(auto-fill,minmax(200px,1fr))",gap:16 }}>
          {BUREAU.map((m,i)=>(
            <FadeIn key={m.titre} delay={i*60}>
              <div style={{ background:"#fff",border:"1px solid rgba(26,108,232,.10)",borderRadius:20,overflow:"hidden",transition:"all .28s",cursor:"pointer",boxShadow:"0 2px 12px rgba(26,108,232,.05)" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 18px 42px rgba(26,108,232,.13)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 2px 12px rgba(26,108,232,.05)";}}>
                <div style={{ height: isMobile ? 150 : 200,background:C.light,borderBottom:"1px dashed rgba(26,108,232,.13)",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",position:"relative" }}>
                  <img src="" alt={m.titre} style={{ width:"100%",height:"100%",objectFit:"cover",display:"block",position:"absolute",inset:0 }} />
                  <Ic n="user" size={44} color="rgba(26,108,232,.18)" />
                </div>
                <div style={{ padding:"14px 15px" }}>
                  <div style={{ fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:C.bright,marginBottom:4 }}>{m.titre}</div>
                  <h4 style={{ fontSize:13.5,fontWeight:800,color:C.dark,marginBottom:2 }}>{m.nom}</h4>
                  <span style={{ fontSize:11,color:C.muted }}>{m.role}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <p style={{ textAlign:"center",marginTop:28,fontSize:13,color:C.muted,letterSpacing:.5 }}>
          La promotion IT11 compte également de nombreux membres actifs dans toutes les filières de l'ESATIC.
        </p>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════
   GALERIE — RESPONSIVE
══════════════════════════════════════════ */
const Galerie = () => {
  const { isMobile, isTablet } = useBreakpoint();
  return (
    <section id="galerie" style={{ padding: isTablet ? "60px 20px" : "90px 56px",background:C.bg,fontFamily:"'Outfit',sans-serif" }}>
      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <FadeIn>
          <Tag>Nos moments</Tag>
          <SectionTitle>Galerie <span style={{ color:C.red }}>Photos</span></SectionTitle>
        </FadeIn>
        <FadeIn delay={100}>
          {isMobile ? (
            // Mobile: 2 cols grid
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:32 }}>
              {[1,2,3,4].map(n=>(
                <div key={n} style={{ borderRadius:14,background:C.light,border:"2px dashed rgba(26,108,232,.18)",overflow:"hidden",aspectRatio:"1" }}>
                  <img src="" alt={`${n}`} style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display:"grid",gridTemplateColumns: isTablet ? "1fr 1fr" : "2fr 1fr 1fr",gridTemplateRows: isTablet ? "220px 220px" : "220px 220px",gap:12,marginTop:36 }}>
              <div style={{ gridRow: isTablet ? "span 1" : "span 2",borderRadius:18,background:C.light,border:"2px dashed rgba(26,108,232,.18)",overflow:"hidden" }}>
                <img src="" alt="Galerie principale" style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }} />
              </div>
              {[2,3,4,5].slice(0, isTablet ? 3 : 4).map(n=>(
                <div key={n} style={{ borderRadius:14,background:C.light,border:"2px dashed rgba(26,108,232,.18)",overflow:"hidden" }}>
                  <img src="" alt={`${n}`} style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }} />
                </div>
              ))}
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════
   FOOTER — RESPONSIVE
══════════════════════════════════════════ */
const Footer = () => {
  const { isMobile, isTablet } = useBreakpoint();
  return (
    <footer id="contact" style={{ background:C.dark,padding: isMobile ? "44px 20px 20px" : isTablet ? "50px 32px 24px" : "56px 56px 26px",fontFamily:"'Outfit',sans-serif" }}>
      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "2fr 1fr 1fr 1fr",gap: isMobile ? 32 : 44,marginBottom:40 }}>
          <div>
            <div style={{ width:48,height:48,borderRadius:"50%",background:C.light,marginBottom:14,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden" }}>
              {logo ? <img src={logo} alt="Logo IT11" style={{ width:"100%",height:"100%",objectFit:"contain" }} /> : <span style={{ fontWeight:900,fontSize:14,color:C.blue }}>IT11</span>}
            </div>
            <p style={{ fontSize:13,color:"rgba(255,255,255,.42)",lineHeight:1.8,maxWidth:250,marginBottom:20 }}>
              Promotion IT11 — ESATIC<br/>Abidjan, Côte d'Ivoire.
            </p>
            <div style={{ display:"flex",gap:9 }}>
              {["facebook","instagram","linkedin","youtube"].map(s=>(
                <a key={s} href="/" style={{ width:34,height:34,borderRadius:"50%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",transition:"all .2s" }}>
                  <Ic n={s} size={14} color="rgba(255,255,255,.55)" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title:"Navigation", links:[{ l:"Accueil",h:"#accueil" },{ l:"À propos",h:"#apropos" },{ l:"Événements",h:"#evenements" },{ l:"Membres",h:"#membres" }] },
            { title:"Opportunités", links:[{ l:"Stages",h:"#opportunites" },{ l:"Emploi",h:"#opportunites" },{ l:"Formations",h:"#opportunites" },{ l:"Partenariats",h:"#contact" }] },
            { title:"Contact", links:[{ l:"promotionit11@esatic.ci",h:"mailto:promotionit11@esatic.ci" },{ l:"Abidjan, Côte d'Ivoire",h:"#" },{ l:"ESATIC Officiel",h:"#" }] },
          ].map(col=>(
            <div key={col.title}>
              <h5 style={{ fontSize:10.5,letterSpacing:2.5,textTransform:"uppercase",color:C.bright,marginBottom:16 }}>{col.title}</h5>
              {col.links.map(l=>(
                <a key={l.l} href={l.h} style={{ display:"block",fontSize:13,color:"rgba(255,255,255,.44)",textDecoration:"none",marginBottom:10,transition:"color .18s",wordBreak:"break-word" }}
                  onMouseEnter={e=>e.currentTarget.style.color="#fff"}
                  onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.44)"}>
                  {l.l}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:20,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10 }}>
          <span style={{ fontSize:12,color:"rgba(255,255,255,.22)" }}>© 2025 Promotion IT11 · ESATIC · Tous droits réservés</span>
          <span style={{ fontSize:12,color:"rgba(255,255,255,.18)" }}>Fait avec ❤️ par la Promo IT11</span>
        </div>
      </div>
    </footer>
  );
};

/* ══════════════════════════════════════════
   APP ROOT
══════════════════════════════════════════ */
export default function App() {
  const [active, setActive] = useState("accueil");

  useEffect(() => {
    const handle = () => {
      const ids = ["accueil","apropos","evenements","opportunites","membres","galerie","contact"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <div style={{ fontFamily:"'Outfit',sans-serif" }}>
      <Navbar active={active} setActive={setActive} />
      <Hero />
      <Stats />
      <About />
      <Evenements />
      <Opportunites />
      <Membres />
      <Galerie />
      <Footer />
    </div>
  );
}