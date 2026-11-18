/**
 * UNSEEN STUDIO - Our Work (/work) & Case Study Page Controller
 */

import { PROJECTS, PORTFOLIO_FILTERS, getProjectBySlug, getNextProject } from "./projectsData.js";

export function renderWorkPage(container, router, currentSlug = null) {
  if (currentSlug) {
    const project = getProjectBySlug(currentSlug);
    if (project) {
      renderCaseStudyDetail(container, router, project);
      return;
    }
  }

  // Render Main Portfolio Grid View
  let activeFilter = "all";

  function updateGrid() {
    const filteredProjects = activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

    const gridEl = container.querySelector("#work-projects-grid");
    if (!gridEl) return;

    gridEl.innerHTML = filteredProjects.map(project => `
      <article class="project-card" data-slug="${project.slug}">
        <div class="project-card-image-wrap">
          <img src="${project.heroImage}" alt="${project.name}" class="project-card-image" loading="lazy">
          <span class="project-badge ${project.isVerifiedClient ? 'client' : 'concept'}">
            ${project.badgeText}
          </span>
          <span class="project-industry-tag">${project.industry}</span>
        </div>
        <div class="project-card-content">
          <div class="project-card-header">
            <h3 class="project-card-title">${project.name}</h3>
            <span class="project-card-year">${project.year}</span>
          </div>
          <p class="project-card-headline">${project.headline}</p>
          <div class="project-card-footer">
            <span>${project.category} · ${project.client}</span>
            <span class="project-card-link-text">Explore Case Study →</span>
          </div>
        </div>
      </article>
    `).join("");

    // Bind project card clicks
    gridEl.querySelectorAll(".project-card").forEach(card => {
      card.addEventListener("click", () => {
        const slug = card.getAttribute("data-slug");
        router.navigate(`/work/${slug}`);
      });
    });
  }

  container.innerHTML = `
    <div class="page-view-content">
      <header class="subpage-header">
        <div class="subpage-brand">
          <button class="subpage-logo" id="work-nav-home" aria-label="UNSEEN STUDIO Home">
            UNSEEN STUDIO
          </button>
          <span class="subpage-breadcrumb">/ SELECTED WORK</span>
        </div>
        <div class="subpage-right-utils">
          <button class="menu-btn" data-action="open-menu">[ MENU ]</button>
        </div>
      </header>

      <section class="work-hero">
        <div class="work-eyebrow">SELECTED WORK / DIGITAL COMMERCE</div>
        <h1 class="work-title">Commerce Experiences Made to Move Businesses Forward.</h1>
        <p class="work-description">
          Explore the digital storefronts, commerce platforms and customer experiences we create for modern businesses.
        </p>
      </section>

      <nav class="work-filters-container" aria-label="Portfolio Category Filters">
        ${PORTFOLIO_FILTERS.map(filter => `
          <button class="filter-btn ${filter.id === activeFilter ? 'is-active' : ''}" data-filter="${filter.id}">
            ${filter.label}
          </button>
        `).join("")}
      </nav>

      <main class="work-grid" id="work-projects-grid">
        <!-- Rendered via updateGrid() -->
      </main>
    </div>
  `;

  // Bind Home Logo
  container.querySelector("#work-nav-home")?.addEventListener("click", () => {
    router.navigate("/");
  });

  // Bind Filters
  const filterBtns = container.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      activeFilter = btn.getAttribute("data-filter");
      updateGrid();
    });
  });

  // Initial Grid Render
  updateGrid();
}

function renderCaseStudyDetail(container, router, project) {
  const nextProject = getNextProject(project.slug);

  container.innerHTML = `
    <div class="page-view-content">
      <header class="subpage-header">
        <div class="subpage-brand">
          <button class="subpage-logo" id="case-study-nav-home" aria-label="UNSEEN STUDIO Home">
            UNSEEN STUDIO
          </button>
          <span class="subpage-breadcrumb">/ WORK / ${project.name}</span>
        </div>
        <div class="subpage-right-utils">
          <button class="menu-btn" data-action="open-menu">[ MENU ]</button>
        </div>
      </header>

      <main class="case-study-view">
        <button class="case-study-back-btn" id="case-study-back">
          ← BACK TO SELECTED WORK
        </button>

        <section class="case-study-header">
          <div class="case-study-meta-bar">
            <span class="project-badge ${project.isVerifiedClient ? 'client' : 'concept'}">
              ${project.badgeText}
            </span>
            <span class="tech-tag">${project.industry}</span>
            <span class="tech-tag">${project.year}</span>
          </div>
          <h1 class="case-study-title">${project.name}</h1>
          <p class="case-study-lead">${project.overview}</p>

          <div class="case-study-actions">
            ${project.liveUrl ? `
              <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary-action">
                VISIT LIVE WEBSITE ↗
              </a>
            ` : ''}
            <button class="btn-secondary-action" id="case-study-cta-contact">
              START A PROJECT LIKE THIS →
            </button>
          </div>
        </section>

        <div class="case-study-hero-img-wrap">
          <img src="${project.heroImage}" alt="${project.name} hero showcase" class="case-study-hero-img">
        </div>

        <section class="case-study-details-grid">
          <aside class="case-study-sidebar">
            <div class="case-study-meta-item">
              <span class="case-study-meta-label">Client / Brand</span>
              <span class="case-study-meta-value">${project.client}</span>
            </div>
            <div class="case-study-meta-item">
              <span class="case-study-meta-label">Industry</span>
              <span class="case-study-meta-value">${project.industry}</span>
            </div>
            <div class="case-study-meta-item">
              <span class="case-study-meta-label">Classification</span>
              <span class="case-study-meta-value">${project.badgeText}</span>
            </div>
            <div class="case-study-meta-item">
              <span class="case-study-meta-label">Technology Stack</span>
              <div class="tech-tags">
                ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join("")}
              </div>
            </div>
          </aside>

          <div class="case-study-main-narrative">
            <div class="narrative-block">
              <h2 class="narrative-heading">Business Requirements</h2>
              <ul class="narrative-list">
                ${project.businessRequirements.map(req => `<li>${req}</li>`).join("")}
              </ul>
            </div>

            <div class="narrative-block">
              <h2 class="narrative-heading">Design Concept &amp; Art Direction</h2>
              <p class="narrative-text">${project.designConcept}</p>
            </div>

            <div class="narrative-block">
              <h2 class="narrative-heading">Customer Shopping Experience</h2>
              <p class="narrative-text">${project.shoppingExperience}</p>
            </div>

            <div class="narrative-block">
              <h2 class="narrative-heading">Admin &amp; Operational Capabilities</h2>
              <p class="narrative-text">${project.adminCapabilities}</p>
            </div>

            <div class="narrative-block">
              <h2 class="narrative-heading">Key Features Delivered</h2>
              <div class="features-grid">
                ${project.featuresDelivered.map(feat => `
                  <div class="feature-box">
                    <div class="feature-box-title">${feat.title}</div>
                    <div class="feature-box-desc">${feat.desc}</div>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </section>

        <section class="case-study-gallery">
          <h2 class="narrative-heading">Project Gallery &amp; Interfaces</h2>
          <div class="gallery-grid">
            ${project.gallery.map((img, i) => `
              <div class="gallery-item">
                <img src="${img}" alt="${project.name} preview ${i + 1}" class="gallery-img" loading="lazy">
              </div>
            `).join("")}
          </div>
        </section>

        <footer class="case-study-footer-nav">
          <div class="next-project-link" id="next-project-btn">
            <span class="next-project-label">NEXT PROJECT →</span>
            <div class="next-project-title">
              <span>${nextProject.name}</span>
              <span style="color: var(--accent-orange);">→</span>
            </div>
          </div>
          <button class="btn-primary-action" id="case-study-bottom-cta">
            START YOUR PROJECT WITH US →
          </button>
        </footer>
      </main>
    </div>
  `;

  // Bind Home Logo
  container.querySelector("#case-study-nav-home")?.addEventListener("click", () => {
    router.navigate("/");
  });

  // Bind Back Button
  container.querySelector("#case-study-back")?.addEventListener("click", () => {
    router.navigate("/work");
  });

  // Bind CTA buttons to /contact
  container.querySelector("#case-study-cta-contact")?.addEventListener("click", () => {
    router.navigate("/contact");
  });
  container.querySelector("#case-study-bottom-cta")?.addEventListener("click", () => {
    router.navigate("/contact");
  });

  // Bind Next Project
  container.querySelector("#next-project-btn")?.addEventListener("click", () => {
    router.navigate(`/work/${nextProject.slug}`);
  });
}
