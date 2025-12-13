# Andrew's Portfolio Website

A personal portfolio website showcasing FPGA and PCB design projects with interactive Altium 365 embedded viewers.

## Tech Stack

- **Frontend:** Pure HTML, CSS, JavaScript (no frameworks)
- **Hosting:** Netlify (recommended) or GitHub Pages
- **PCB Embeds:** Altium 365 Personal Space

## Project Structure

```
andrew-chai/
├── index.html           # Home page
├── projects.html        # Projects gallery
├── blog.html            # Blog listing
├── css/
│   └── style.css        # All styles
├── js/
│   └── main.js          # Interactive features
├── images/
│   ├── profile/         # Headshot photos
│   ├── projects/        # Project images
│   └── blog/            # Blog post images
├── projects/
│   ├── fpga-dev-board.html
│   └── strain-gauge-logger.html
├── blog/
│   ├── europe-trip-planning.html
│   ├── learning-mandarin.html
│   ├── fpga-workflow.html
│   └── modern-cpp-features.html
├── robots.txt           # SEO crawler rules
├── sitemap.xml          # SEO sitemap
└── .gitignore
```

## Local Development

No build step required. Simply open `index.html` in a browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (if npx available)
npx serve
```

Then visit `http://localhost:8000`

## Deployment

### Netlify (Recommended)

1. Push code to GitHub
2. Log in to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Leave build settings blank (static HTML)
6. Click "Deploy"

### Custom Domain

1. In Netlify: Domain settings → Add custom domain
2. In your domain registrar, add DNS records:
   - A record: `@` → `75.2.60.5`
   - CNAME: `www` → `[site-name].netlify.app`
3. Wait for propagation (15 min to 48 hours)
4. SSL auto-provisions

## Altium 365 Integration

To add interactive PCB viewers to project pages:

1. Create an [Altium 365](https://365.altium.com) account
2. Upload your Altium project (.zip with .SchDoc, .PcbDoc, .PrjPcb)
3. Get the embed code from your project's share settings
4. Paste the iframe code into the project page's viewer section

Example embed:
```html
<iframe
    src="https://personal-viewer.365.altium.com/client/index.html?feature=embed&source=YOUR-PROJECT-ID"
    width="100%"
    height="720"
    style="overflow:hidden;border:none;"
    allowfullscreen="true">
</iframe>
```

## Customization Checklist

Before deploying, update these placeholder items:

- [ ] Replace headshot image (`images/profile/headshot.jpg`)
- [ ] Add project images to `images/projects/`
- [ ] Add blog images to `images/blog/`
- [ ] Update contact email in `index.html`
- [ ] Update GitHub/LinkedIn URLs in `index.html`
- [ ] Add Altium 365 embed codes to project pages
- [ ] Update `sitemap.xml` with your actual domain
- [ ] Update `robots.txt` sitemap URL

## Features

- Responsive design (mobile, tablet, desktop)
- Dark theme with blue accent
- Mobile hamburger menu
- Smooth scroll navigation
- Fade-in animations on scroll
- Image lightbox for galleries
- Lazy loading images
- Code block copy button (blog posts)

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

Personal portfolio - not licensed for reuse.
