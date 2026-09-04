import { useEffect, useState, type ReactNode } from "react";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";

import { ChatAssistant } from "../chat-assistant";
import { siteRoutes, whatsappUrl } from "../content";
import { LanguageProvider, LanguageToggle, useLanguage } from "../language";
import stylesUrl from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "Long Taa Borneo Eco Stay" },
      {
        name: "description",
        content:
          "Nature, culture, adventure, and living heritage in Long Taa, Sarawak.",
      },
    ],
    links: [
      { rel: "stylesheet", href: stylesUrl },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundPage,
});

function RootComponent() {
  return <LanguageProvider><RootContent /></LanguageProvider>;
}

function RootContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = useRouterState({ select: (state) => state.location.pathname === "/" });
  const { copy, language } = useLanguage();
  const navigationLabels = language === "en" ? siteRoutes : [
    { ...siteRoutes[0], label: "Utama" },
    { ...siteRoutes[1], label: "Penginapan & pengalaman" },
    { ...siteRoutes[2], label: "Teroka" },
    { ...siteRoutes[3], label: "Kisah kami" },
    { ...siteRoutes[4], label: "Rancang & tempah" },
  ];

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("resize", closeMenu);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("resize", closeMenu);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("tree-experience", isHome);
    return () => document.body.classList.remove("tree-experience");
  }, [isHome]);

  return (
    <RootDocument>
      <header className={`site-header${isHome ? " tree-site-header" : ""}`}>
        <Link className="brand" to="/" aria-label="Long Taa Borneo Eco Stay homepage">
          <img
            className="brand-mark"
            src="/images/long-taa-dapui-logo-transparent.png"
            alt="Long Taa Dapui Living Heritage Village logo"
          />
          <span className="brand-wordmark">
            <span>Long Taa</span>
            <small>Borneo Eco Stay</small>
          </span>
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{menuOpen ? copy.close : copy.menu}</span>
          <span className="sr-only">{menuOpen ? copy.close : copy.menu} navigation menu</span>
        </button>
        <nav id="site-navigation" className={menuOpen ? "is-open" : ""} aria-label="Primary navigation">
          {navigationLabels.map((item) => (
            <Link
              key={item.to}
              className="nav-link"
              activeProps={{ className: "nav-link is-active" }}
              activeOptions={{ exact: item.to === "/" }}
              to={item.to}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a className="mobile-menu-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
            {copy.enquiry}
          </a>
        </nav>
        <LanguageToggle />
        <a className="header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
          <span aria-hidden="true">WhatsApp</span><span className="sr-only">{copy.enquiry}</span>
        </a>
      </header>
      <Outlet />
      <ChatAssistant />
      {!isHome && <footer className="site-footer">
        <div>
          <strong>Long Taa Borneo Eco Stay</strong>
          <p>{copy.footerTagline}</p>
          <p className="footer-note">{copy.footerNote}</p>
        </div>
        <div className="footer-links">
          <Link to="/heritage">{copy.visitRespectfully}</Link>
          <a href="mailto:longtaaborneo@gmail.com">longtaaborneo@gmail.com</a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">+60 19-856 3536</a>
          <a className="footer-cta" href={whatsappUrl} target="_blank" rel="noreferrer">{copy.mobileBooking}</a>
        </div>
        <small>© 2026 Long Taa Borneo Eco Stay. {copy.rights}</small>
      </footer>}
      {!isHome && <a className="mobile-booking-bar" href={whatsappUrl} target="_blank" rel="noreferrer">{copy.mobileBooking}</a>}
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function NotFoundPage() {
  return (
    <main className="interior-page">
      <p className="eyebrow">404</p>
      <h1>That trail ends here.</h1>
      <p>The page you requested could not be found.</p>
      <Link className="primary-action" to="/">
        Return home
      </Link>
    </main>
  );
}
