/**
 * UNSEEN STUDIO - Client-Side SPA Router
 * Supports /, /work, /work/:slug, /contact with browser back/forward and view persistence
 */

export function createRouter(views, options = {}) {
  const { onStateChange, onNavigate } = options;

  function parsePath(pathname) {
    const clean = pathname.replace(/\/+$/, "") || "/";
    if (clean === "/") {
      return { route: "home", slug: null };
    }
    if (clean === "/work") {
      return { route: "work", slug: null };
    }
    if (clean.startsWith("/work/")) {
      const slug = clean.replace("/work/", "").trim();
      return { route: "work", slug };
    }
    if (clean === "/contact") {
      return { route: "contact", slug: null };
    }
    return { route: "home", slug: null };
  }

  function renderCurrentRoute() {
    const { route, slug } = parsePath(window.location.pathname);

    // 1. Manage View Visibility
    if (route === "home") {
      views.home.style.display = "block";
      views.work.style.display = "none";
      views.contact.style.display = "none";
      document.title = "UNSEEN STUDIO – Digital Commerce & Experience Design";
      if (typeof onStateChange === "function") onStateChange(true);
    } else if (route === "work") {
      views.home.style.display = "none";
      views.work.style.display = "block";
      views.contact.style.display = "none";
      if (typeof onStateChange === "function") onStateChange(false);
      if (typeof views.renderWork === "function") {
        views.renderWork(views.work, router, slug);
      }
      document.title = slug ? `Case Study | UNSEEN STUDIO` : `Selected Work | UNSEEN STUDIO`;
    } else if (route === "contact") {
      views.home.style.display = "none";
      views.work.style.display = "none";
      views.contact.style.display = "block";
      if (typeof onStateChange === "function") onStateChange(false);
      if (typeof views.renderContact === "function") {
        views.renderContact(views.contact, router);
      }
      document.title = "Start a Project | UNSEEN STUDIO";
    }

    window.scrollTo(0, 0);

    if (typeof onNavigate === "function") {
      onNavigate(route, slug);
    }
  }

  const router = {
    navigate(path) {
      if (window.location.pathname !== path) {
        window.history.pushState(null, "", path);
      }
      renderCurrentRoute();
    },
    init() {
      window.addEventListener("popstate", () => {
        renderCurrentRoute();
      });

      // Handle any anchor tags with internal routes
      document.addEventListener("click", (e) => {
        const link = e.target.closest("a[href^='/']");
        if (link && !link.target && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          router.navigate(link.getAttribute("href"));
        }
      });

      renderCurrentRoute();
    }
  };

  return router;
}
