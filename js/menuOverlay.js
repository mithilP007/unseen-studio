/**
 * UNSEEN STUDIO - Full-Screen Navigation Menu Overlay Controller
 */

export function initMenuOverlay(router) {
  let menuContainer = document.getElementById("menu-overlay");
  
  if (!menuContainer) {
    menuContainer = document.createElement("div");
    menuContainer.id = "menu-overlay";
    menuContainer.className = "menu-overlay";
    menuContainer.setAttribute("role", "dialog");
    menuContainer.setAttribute("aria-modal", "true");
    menuContainer.setAttribute("aria-label", "Site Navigation Menu");
    document.body.appendChild(menuContainer);
  }

  // Render Overlay Template
  menuContainer.innerHTML = `
    <header class="menu-header">
      <button class="menu-brand-logo" id="menu-home-logo" aria-label="Return to UNSEEN STUDIO Homepage">
        UNSEEN STUDIO
      </button>
      <div class="menu-brand-tagline">
        Digital Commerce · Thoughtful Design · Meaningful Experiences
      </div>
      <button class="menu-close-btn" id="menu-close-btn" aria-label="Close Navigation Menu">
        [ CLOSE ]
      </button>
    </header>

    <div class="menu-nav-center">
      <ul class="menu-nav-list" role="menu">
        <li class="menu-nav-item" role="none">
          <a href="/work" class="menu-nav-link" data-route="/work" role="menuitem" tabindex="0">
            <span class="menu-nav-num">01</span>
            <div class="menu-nav-content">
              <h2 class="menu-nav-title">OUR WORK</h2>
              <p class="menu-nav-desc">Explore selected ecommerce projects, digital experiences and the commerce solutions we create for ambitious businesses.</p>
            </div>
            <span class="menu-nav-arrow" aria-hidden="true">→</span>
          </a>
        </li>
        <li class="menu-nav-item" role="none">
          <a href="/contact" class="menu-nav-link" data-route="/contact" role="menuitem" tabindex="0">
            <span class="menu-nav-num">02</span>
            <div class="menu-nav-content">
              <h2 class="menu-nav-title">CONTACT</h2>
              <p class="menu-nav-desc">Have an idea for your next ecommerce project? Let's create something meaningful together.</p>
            </div>
            <span class="menu-nav-arrow" aria-hidden="true">→</span>
          </a>
        </li>
      </ul>
    </div>

    <footer class="menu-footer">
      <div class="menu-footer-left">
        <div class="menu-footer-brand">UNSEEN STUDIO</div>
        <div class="menu-footer-services">Digital Commerce · Design · Engineering</div>
      </div>
      <div class="menu-footer-right">
        <div class="menu-footer-region">India &amp; Worldwide</div>
        <div class="menu-footer-contact">Available for Selected Client Partnerships</div>
      </div>
    </footer>
  `;

  let lastActiveElement = null;

  const openMenu = () => {
    lastActiveElement = document.activeElement;
    menuContainer.classList.add("is-active");
    menuContainer.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");

    // Focus first navigation item
    const firstLink = menuContainer.querySelector(".menu-nav-link");
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }
  };

  const closeMenu = () => {
    menuContainer.classList.remove("is-active");
    menuContainer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");

    if (lastActiveElement && typeof lastActiveElement.focus === "function") {
      lastActiveElement.focus();
    }
  };

  // Close button click
  const closeBtn = menuContainer.querySelector("#menu-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }

  // Home logo click
  const homeLogo = menuContainer.querySelector("#menu-home-logo");
  if (homeLogo) {
    homeLogo.addEventListener("click", () => {
      closeMenu();
      router.navigate("/");
    });
  }

  // Navigation link clicks
  const navLinks = menuContainer.querySelectorAll(".menu-nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const route = link.getAttribute("data-route");
      closeMenu();
      router.navigate(route);
    });
  });

  // Escape key handler & focus trapping
  document.addEventListener("keydown", (e) => {
    if (!menuContainer.classList.contains("is-active")) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
      return;
    }

    if (e.key === "Tab") {
      const focusable = menuContainer.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Close on outside click
  menuContainer.addEventListener("click", (e) => {
    if (e.target === menuContainer) {
      closeMenu();
    }
  });

  // Bind existing & global MENU buttons
  function bindMenuButtons() {
    const allMenuBtns = document.querySelectorAll(".menu-btn, [data-action='open-menu']");
    allMenuBtns.forEach(btn => {
      // Remove any existing listener by cloning or flag
      if (!btn.dataset.menuBound) {
        btn.dataset.menuBound = "true";
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          openMenu();
        });
      }
    });
  }

  bindMenuButtons();

  return {
    openMenu,
    closeMenu,
    bindMenuButtons
  };
}
