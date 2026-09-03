import type { ReactNode } from "react";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";

import { siteRoutes, whatsappUrl } from "../content";
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
    links: [{ rel: "stylesheet", href: stylesUrl }],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundPage,
});

function RootComponent() {
  return (
    <RootDocument>
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Long Taa homepage">
          Long Taa
        </Link>
        <nav aria-label="Primary navigation">
          {siteRoutes.map((item) => (
            <Link
              key={item.to}
              className="nav-link"
              activeProps={{ className: "nav-link is-active" }}
              activeOptions={{ exact: item.to === "/" }}
              to={item.to}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a className="header-cta" href={whatsappUrl}>
          WhatsApp
        </a>
      </header>
      <Outlet />
      <footer className="site-footer">
        <strong>Long Taa Borneo Eco Stay</strong>
        <span>Nature · Culture · Adventure · Living Heritage</span>
      </footer>
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
