/**
 * UNSEEN STUDIO - Contact & Project Enquiry Page Controller
 */

export function renderContactPage(container, router) {
  let isSubmitting = false;

  container.innerHTML = `
    <div class="page-view-content">
      <header class="subpage-header">
        <div class="subpage-brand">
          <button class="subpage-logo" id="contact-nav-home" aria-label="UNSEEN STUDIO Home">
            UNSEEN STUDIO
          </button>
          <span class="subpage-breadcrumb">/ START A PROJECT</span>
        </div>
        <div class="subpage-right-utils">
          <button class="menu-btn" data-action="open-menu">[ MENU ]</button>
        </div>
      </header>

      <section class="contact-hero">
        <div class="contact-eyebrow">START A PROJECT</div>
        <h1 class="contact-title">Let's Build Something That Moves Your Business Forward.</h1>
        <p class="contact-description">
          Tell us about your business, products and goals. We'll help you shape the right ecommerce experience.
        </p>
      </section>

      <div class="contact-layout-grid">
        <div class="enquiry-form-card" id="form-card-container">
          <form class="enquiry-form" id="project-enquiry-form" novalidate>
            <!-- 1. Client & Contact Information -->
            <div>
              <div class="form-section-title">01 / Contact Details</div>
              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label" for="full-name">
                    Full Name <span class="required-indicator">*</span>
                  </label>
                  <input type="text" id="full-name" name="fullName" class="form-input" placeholder="e.g. Maya Thorne" required>
                  <span class="field-error-msg" id="err-full-name">Please enter your full name.</span>
                </div>

                <div class="form-group">
                  <label class="form-label" for="business-name">
                    Business Name <span class="required-indicator">*</span>
                  </label>
                  <input type="text" id="business-name" name="businessName" class="form-input" placeholder="e.g. Thorne Fine Goods" required>
                  <span class="field-error-msg" id="err-business-name">Please enter your business or project name.</span>
                </div>
              </div>

              <div class="form-grid-2" style="margin-top: 1.25rem;">
                <div class="form-group">
                  <label class="form-label" for="email-address">
                    Email Address <span class="required-indicator">*</span>
                  </label>
                  <input type="email" id="email-address" name="emailAddress" class="form-input" placeholder="e.g. maya@thorne.com" required>
                  <span class="field-error-msg" id="err-email-address">Please enter a valid business email.</span>
                </div>

                <div class="form-group">
                  <label class="form-label" for="phone-number">
                    Phone / WhatsApp <span class="required-indicator">*</span>
                  </label>
                  <input type="tel" id="phone-number" name="phoneNumber" class="form-input" placeholder="e.g. +1 (555) 019-2834" required>
                  <span class="field-error-msg" id="err-phone-number">Please enter a valid phone or WhatsApp number.</span>
                </div>
              </div>
            </div>

            <!-- 2. Project Scope & Industry -->
            <div>
              <div class="form-section-title">02 / Project Scope &amp; Industry</div>
              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label" for="business-industry">Business Industry</label>
                  <select id="business-industry" name="businessIndustry" class="form-select">
                    <option value="Fashion">Fashion &amp; Apparel</option>
                    <option value="Jewellery">Jewellery &amp; Craft</option>
                    <option value="Electronics">Electronics &amp; Hardware</option>
                    <option value="Beauty">Beauty &amp; Skincare</option>
                    <option value="Furniture">Furniture &amp; Interior</option>
                    <option value="Healthcare">Healthcare &amp; Medical</option>
                    <option value="Grocery">Grocery &amp; Artisanal Food</option>
                    <option value="B2B Wholesale">B2B Wholesale &amp; Supply</option>
                    <option value="Other">Other Category</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label" for="website-type">Ecommerce Website Type</label>
                  <select id="website-type" name="websiteType" class="form-select">
                    <option value="Custom Storefront">Custom Storefront Development</option>
                    <option value="Headless Commerce">Headless Commerce Architecture</option>
                    <option value="B2B Wholesale Portal">B2B Wholesale / Procurement Portal</option>
                    <option value="Storefront Redesign">Existing Storefront Redesign &amp; Optimization</option>
                    <option value="Multi-Vendor Marketplace">Multi-Vendor Marketplace</option>
                  </select>
                </div>
              </div>

              <div class="form-grid-2" style="margin-top: 1.25rem;">
                <div class="form-group">
                  <label class="form-label" for="product-count">Approximate Product Count</label>
                  <select id="product-count" name="productCount" class="form-select">
                    <option value="1 - 50 Products">1 – 50 Products (Boutique / Curated)</option>
                    <option value="51 - 250 Products">51 – 250 Products (Growing Catalog)</option>
                    <option value="251 - 1,000 Products">251 – 1,000 Products (Mid Scale)</option>
                    <option value="1,000+ Products">1,000+ Products (Enterprise Scale)</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label" for="approx-budget">Approximate Investment Budget</label>
                  <select id="approx-budget" name="approxBudget" class="form-select">
                    <option value="$5,000 - $10,000">$5,000 – $10,000</option>
                    <option value="$10,000 - $25,000" selected>$10,000 – $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 – $50,000</option>
                    <option value="$50,000+">$50,000+</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- 3. Package Preference -->
            <div>
              <div class="form-section-title">03 / Selected Package</div>
              <div class="pill-options-grid">
                <label class="pill-option">
                  <input type="radio" name="packageOption" value="Starter">
                  <span class="pill-option-label">Starter</span>
                </label>
                <label class="pill-option">
                  <input type="radio" name="packageOption" value="Business Growth" checked>
                  <span class="pill-option-label">Business Growth</span>
                </label>
                <label class="pill-option">
                  <input type="radio" name="packageOption" value="Enterprise">
                  <span class="pill-option-label">Enterprise</span>
                </label>
                <label class="pill-option">
                  <input type="radio" name="packageOption" value="Not Sure Yet">
                  <span class="pill-option-label">Not Sure Yet</span>
                </label>
              </div>
            </div>

            <!-- 4. Required Features -->
            <div>
              <div class="form-section-title">04 / Required Features &amp; Integrations</div>
              <div class="features-checkbox-grid">
                <label class="checkbox-pill">
                  <input type="checkbox" name="features" value="Custom UI/UX" checked>
                  <span class="checkbox-pill-label">Custom UI/UX Design</span>
                </label>
                <label class="checkbox-pill">
                  <input type="checkbox" name="features" value="Product Management" checked>
                  <span class="checkbox-pill-label">Product Management</span>
                </label>
                <label class="checkbox-pill">
                  <input type="checkbox" name="features" value="Payment Gateway" checked>
                  <span class="checkbox-pill-label">Payment Gateway (Stripe/PayPal)</span>
                </label>
                <label class="checkbox-pill">
                  <input type="checkbox" name="features" value="Inventory Management">
                  <span class="checkbox-pill-label">Inventory Management</span>
                </label>
                <label class="checkbox-pill">
                  <input type="checkbox" name="features" value="Order Management">
                  <span class="checkbox-pill-label">Order Management</span>
                </label>
                <label class="checkbox-pill">
                  <input type="checkbox" name="features" value="Shipping Integration">
                  <span class="checkbox-pill-label">Shipping Integration</span>
                </label>
                <label class="checkbox-pill">
                  <input type="checkbox" name="features" value="WhatsApp Integration">
                  <span class="checkbox-pill-label">WhatsApp Integration</span>
                </label>
                <label class="checkbox-pill">
                  <input type="checkbox" name="features" value="SEO Optimization">
                  <span class="checkbox-pill-label">SEO &amp; Schema Optimization</span>
                </label>
                <label class="checkbox-pill">
                  <input type="checkbox" name="features" value="Custom Admin Dashboard">
                  <span class="checkbox-pill-label">Custom Admin Dashboard</span>
                </label>
                <label class="checkbox-pill">
                  <input type="checkbox" name="features" value="Other">
                  <span class="checkbox-pill-label">Other Custom Requirements</span>
                </label>
              </div>
            </div>

            <!-- 5. Timeline & Additional Requirements -->
            <div>
              <div class="form-section-title">05 / Timeline &amp; Details</div>
              <div class="form-group" style="margin-bottom: 1.25rem;">
                <label class="form-label" for="launch-date">Target Launch Timeline</label>
                <select id="launch-date" name="launchDate" class="form-select">
                  <option value="Within 1 Month">Within 1 Month (Fast Track)</option>
                  <option value="1 - 3 Months" selected>1 – 3 Months (Standard)</option>
                  <option value="3 - 6 Months">3 – 6 Months (Complex Build)</option>
                  <option value="Flexible">Flexible / Planning Phase</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="additional-notes">
                  Additional Project Requirements &amp; Goals
                </label>
                <textarea id="additional-notes" name="additionalNotes" class="form-textarea" rows="4" placeholder="Tell us about your brand aesthetic, key differentiators, technical challenges, or reference sites you admire..."></textarea>
              </div>
            </div>

            <div class="form-submit-container">
              <button type="submit" class="btn-submit-enquiry" id="submit-enquiry-btn">
                <span>SUBMIT PROJECT BRIEF</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </div>

        <aside class="contact-sidebar">
          <div class="sidebar-info-block">
            <div class="sidebar-info-title">Studio Standards</div>
            <p class="sidebar-info-text">
              We collaborate with a limited roster of ambitious businesses each quarter to ensure senior-level creative direction and engineering precision.
            </p>
          </div>

          <div class="sidebar-info-block">
            <div class="sidebar-info-title">What Happens Next?</div>
            <ul class="sidebar-process-list">
              <li class="process-step">
                <span class="process-step-num">01</span>
                <span class="process-step-desc">Our creative director reviews your requirements within 24 hours.</span>
              </li>
              <li class="process-step">
                <span class="process-step-num">02</span>
                <span class="process-step-desc">We schedule a 30-minute discovery session to align on architecture &amp; scope.</span>
              </li>
              <li class="process-step">
                <span class="process-step-num">03</span>
                <span class="process-step-desc">You receive a transparent project proposal, milestone schedule &amp; quote.</span>
              </li>
            </ul>
          </div>

          <div class="sidebar-info-block">
            <div class="sidebar-info-title">Global Client Reach</div>
            <p class="sidebar-info-text">
              UNSEEN STUDIO operates across India and worldwide. All client communication is conducted in English via dedicated Slack/WhatsApp channels and video calls.
            </p>
          </div>
        </aside>
      </div>
    </div>
  `;

  // Bind Home Logo
  container.querySelector("#contact-nav-home")?.addEventListener("click", () => {
    router.navigate("/");
  });

  // Form Validation & Submission Logic
  const form = container.querySelector("#project-enquiry-form");
  const formCard = container.querySelector("#form-card-container");
  const submitBtn = container.querySelector("#submit-enquiry-btn");

  const nameInput = container.querySelector("#full-name");
  const businessInput = container.querySelector("#business-name");
  const emailInput = container.querySelector("#email-address");
  const phoneInput = container.querySelector("#phone-number");

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  const validatePhone = (val) => val.replace(/[^\d]/g, "").length >= 7;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    let hasErrors = false;

    // Validate Name
    if (!nameInput.value.trim()) {
      nameInput.classList.add("is-invalid");
      container.querySelector("#err-full-name").classList.add("visible");
      hasErrors = true;
    } else {
      nameInput.classList.remove("is-invalid");
      container.querySelector("#err-full-name").classList.remove("visible");
    }

    // Validate Business Name
    if (!businessInput.value.trim()) {
      businessInput.classList.add("is-invalid");
      container.querySelector("#err-business-name").classList.add("visible");
      hasErrors = true;
    } else {
      businessInput.classList.remove("is-invalid");
      container.querySelector("#err-business-name").classList.remove("visible");
    }

    // Validate Email
    if (!validateEmail(emailInput.value)) {
      emailInput.classList.add("is-invalid");
      container.querySelector("#err-email-address").classList.add("visible");
      hasErrors = true;
    } else {
      emailInput.classList.remove("is-invalid");
      container.querySelector("#err-email-address").classList.remove("visible");
    }

    // Validate Phone
    if (!validatePhone(phoneInput.value)) {
      phoneInput.classList.add("is-invalid");
      container.querySelector("#err-phone-number").classList.add("visible");
      hasErrors = true;
    } else {
      phoneInput.classList.remove("is-invalid");
      container.querySelector("#err-phone-number").classList.remove("visible");
    }

    if (hasErrors) {
      const firstInvalid = form.querySelector(".is-invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Collect data
    const formData = new FormData(form);
    const selectedFeatures = Array.from(form.querySelectorAll("input[name='features']:checked")).map(el => el.value);

    const submissionPayload = {
      fullName: formData.get("fullName"),
      businessName: formData.get("businessName"),
      email: formData.get("emailAddress"),
      phone: formData.get("phoneNumber"),
      industry: formData.get("businessIndustry"),
      websiteType: formData.get("websiteType"),
      productCount: formData.get("productCount"),
      packageOption: formData.get("packageOption"),
      budget: formData.get("approxBudget"),
      launchDate: formData.get("launchDate"),
      features: selectedFeatures,
      notes: formData.get("additionalNotes") || "None provided",
      timestamp: new Date().toISOString(),
      referenceId: "UNS-" + Math.floor(100000 + Math.random() * 900000)
    };

    // Trigger Loading State with duplicate protection
    isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>TRANSMITTING PROJECT BRIEF...</span>`;

    setTimeout(() => {
      // Store in localStorage for persistence
      try {
        const stored = JSON.parse(localStorage.getItem("unseen_studio_enquiries") || "[]");
        stored.push(submissionPayload);
        localStorage.setItem("unseen_studio_enquiries", JSON.stringify(stored));
      } catch (err) {
        console.warn("Could not save to localStorage", err);
      }

      // Render Confirmation View
      formCard.innerHTML = `
        <div class="enquiry-success-view">
          <div class="success-check-icon">✓</div>
          <h2 class="success-title">Project Brief Received</h2>
          <p class="success-message">
            Thank you, <strong>${submissionPayload.fullName}</strong>. Your project enquiry for <strong>${submissionPayload.businessName}</strong> has been logged directly with our leadership team.
          </p>

          <div class="success-details-card">
            <div class="success-detail-row">
              <span class="success-detail-label">Reference ID</span>
              <span class="success-detail-val" style="color: var(--accent-orange); font-family: monospace;">${submissionPayload.referenceId}</span>
            </div>
            <div class="success-detail-row">
              <span class="success-detail-label">Industry</span>
              <span class="success-detail-val">${submissionPayload.industry}</span>
            </div>
            <div class="success-detail-row">
              <span class="success-detail-label">Package</span>
              <span class="success-detail-val">${submissionPayload.packageOption}</span>
            </div>
            <div class="success-detail-row">
              <span class="success-detail-label">Budget Range</span>
              <span class="success-detail-val">${submissionPayload.budget}</span>
            </div>
            <div class="success-detail-row">
              <span class="success-detail-label">Target Launch</span>
              <span class="success-detail-val">${submissionPayload.launchDate}</span>
            </div>
          </div>

          <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin-top: 1rem;">
            <button class="btn-primary-action" id="success-view-work">
              EXPLORE OUR WORK →
            </button>
            <button class="btn-secondary-action" id="success-return-home">
              RETURN HOME
            </button>
          </div>
        </div>
      `;

      formCard.querySelector("#success-view-work")?.addEventListener("click", () => {
        router.navigate("/work");
      });
      formCard.querySelector("#success-return-home")?.addEventListener("click", () => {
        router.navigate("/");
      });
    }, 800);
  });
}
