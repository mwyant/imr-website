# 🛰️ IMR_SYSTEMS: Mission Operator's Manual

Welcome to the Command Center for the **Integrated Materials Reuse Inc. (IMR)** web infrastructure. This repository houses the SvelteKit-based "JPL-Lite" landing page and backend telemetry systems.

---

### 🚀 Deployment Workflow
This repository is configured for **Continuous Deployment** directly to Google Cloud Run.

1.  **Edit:** Modify files directly on GitHub or locally.
2.  **Commit:** Push changes to the `main` branch.
3.  **Deploy:** Google Cloud Run automatically detects the push, builds the container, and redeploys the service.
    *   **Live URL:** [https://integratedmaterialsreuse.org](https://integratedmaterialsreuse.org)
    *   **GCP Project:** `mikewyantjr-dev`

---

### 📁 File Map: What to Edit

#### **1. Frontend & Content**
*   **Path:** `src/routes/+page.svelte`
*   **Purpose:** This is the primary landing page. Edit this file to change:
    *   **Copy:** Headlines, sub-headlines, and mission descriptions.
    *   **Trajectory:** Update the `trajectory` array (lines 11-15) to change project statuses.
    *   **UI/Modals:** Modify the Newsletter or Contact form modals.
    *   **Aesthetic:** Tailwind CSS classes are used for all styling.

#### **2. Backend & Routing**
*   **Path:** `src/routes/+page.server.js`
*   **Purpose:** Handles form submissions (Contact & Newsletter). Edit this file to change:
    *   **Email Logic:** Modify how emails are formatted or who they are sent to.
    *   **Mission Log:** Update the Google Sheets ID or the data being logged.
    *   **Validation:** Change required fields for the forms.

#### **3. SEO & Indexing**
*   **Path:** `static/robots.txt` & `static/sitemap.xml`
*   **Purpose:** Controls how Google and other search engines crawl the site.

#### **4. Global Configuration**
*   **Path:** `src/app.html`
*   **Purpose:** The base HTML template. Edit this for global `<head>` tags or to update the `favicon.png` link.

---

### 🔐 Environment Variables & Secrets
Sensitive credentials (OAuth2 tokens, Client Secrets) are **NOT** stored in this repository. They are managed via **GCP Secret Manager** and injected into the Cloud Run container at runtime.

**Required Variables (Injected via GCP):**
*   `GMAIL_USER`: The sending email address.
*   `GMAIL_CLIENT_ID`: Google OAuth2 Client ID.
*   `GMAIL_CLIENT_SECRET`: (Secret) Google OAuth2 Client Secret.
*   `GMAIL_REFRESH_TOKEN`: (Secret) Google OAuth2 Refresh Token.

---

### 🛠️ Local Development (Optional)
If you want to run the site locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

*Note: Backend form submissions will fail locally unless you have a `.env` file with the required Gmail OAuth2 variables.*

---

**Status:** [SYSTEMS_STABLE]  
**Trajectory:** [ACTIVE_ORBIT]  
**Mission Control:** Mike Wyant Jr.
