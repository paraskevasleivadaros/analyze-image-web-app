# 🔍💻🖼️ analyze-image-web-app
### Image Recognition Web Application using Azure Cognitive Services
This simple web app lets a user select an image, sends it to **Azure AI Vision** for analysis, and displays a caption, tags, and confidence.

> **Security note:** Never commit real API keys. This repo uses a **placeholder** string for the subscription key. For production, call Azure from a **backend proxy** so the browser never sees secrets.

## Prerequisites
- An Azure subscription (free tier is fine).
- An **Azure AI Vision** (Cognitive Services) resource:
  - You’ll need its **endpoint** and a **subscription key** (for quick tests), or set up **Azure AD (managed identity)** for a backend proxy.
- Basic HTML/CSS/JS familiarity.

## Create an Azure AI Vision resource
1. Go to the Azure portal and create an **Azure AI services** (Vision) resource (formerly “Computer Vision” / “Cognitive Services”).
2. After deployment, open the resource → **Keys and Endpoint** and note:
   - **Endpoint** (e.g., `https://<your-name>.cognitiveservices.azure.com`)
   - **Key1/Key2** (for quick testing only; don’t ship in frontend code)

## Project structure (static site)
This repo serves static files from **`docs/`** (published by GitHub Pages):
```
docs/
├─ index.html
├─ styles.css
└─ app.js
```

### `docs/index.html`
- Links Bootstrap, your stylesheet, and `app.js`.
- Provides the UI for file upload, result image, and description area.

### `docs/styles.css`
- Page layout and styling (container, dashed drop zone, etc).

### `docs/app.js`
- Handles file selection, API call, and result rendering.
- Contains a **placeholder** subscription key:
  ```js
  xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', 'your subscription key');
  ```
  Replace locally for testing only. **Do not commit a real key.**

## Calling the API
### Option A — Quick local test
Temporarily replace the placeholder in `app.js` with your real key:
```js
xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', 'REPLACE_ME_LOCALLY');
```
> Don’t commit this change. Local testing only.

### Option B — Backend proxy (recommended)
Deploy a small **Azure Function / Logic App / API** that:
- Accepts the image,
- Calls Azure Vision using a secret (App Settings or Managed Identity),
- Returns JSON to the browser.

Your frontend then points to the proxy URL instead of Azure directly.

## The request
```
POST {ENDPOINT}/vision/v3.2/analyze?visualFeatures=Description
Content-Type: application/octet-stream
Ocp-Apim-Subscription-Key: <key>
```

Body: raw image bytes.  
Response: JSON with `description.captions[0].text`, `description.tags`, etc.

## Run locally
Open `docs/index.html` in a browser (or host `docs/` with any static server).  
Replace the placeholder key only for local tests.

## Deploy with GitHub Pages
The repo includes a workflow to publish the `docs/` folder:

- Workflow: **Deploy static content to Pages**
- Uses:
  - `actions/checkout@v4`
  - `actions/configure-pages@v5`
  - `actions/upload-pages-artifact@v3`
  - `actions/deploy-pages@v4`

Enable in **Settings → Pages** → Build & deployment: **GitHub Actions**.

## Code scanning (CodeQL)
- You’re using a custom CodeQL workflow (`github/codeql-action@v3`, `checkout@v4`).
- Default setup must be disabled (to avoid SARIF conflicts).
- CodeQL scans `docs/app.js` (moved from inline `<script>`).

## Example screenshot
![a group of raccoons](image/racoon-image-recognition.png)

## 📐 System Design
| Front-End Components                                  | Back-End Components                 |
|-------------------------------------------------------|-------------------------------------|
| **HTML/CSS/Bootstrap**                                | **Azure AI Vision API**             |
| **JavaScript (app.js)**                               | **(Recommended) Backend proxy**     |
| **GitHub Pages Hosting**                              | **Budget + Automation (optional)**  |

![analyze-image-web-app-system-design](image/architecture-image-recognition.png)

## 🛠️ Tech Stack
[![Azure](https://skillicons.dev/icons?i=azure)](https://azure.microsoft.com/)
[![HTML](https://skillicons.dev/icons?i=html)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![GitHub Actions](https://skillicons.dev/icons?i=githubactions)](https://github.com/features/actions)

## © Copyright & License
[MIT](https://github.com/paraskevasleivadaros/analyze-image-web-app/blob/master/LICENSE)
