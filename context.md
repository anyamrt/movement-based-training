# Movement Based Training - Project Context

## Project Overview

**Client:** James Ashford
**Business:** Movement Based Training
**Location:** Bulimba, Brisbane, Australia
**Website:** https://movement-based-training-7gne7a913-brett-thebaults-projects.vercel.app
**Previous Site:** https://www.movementbasedtraining.com.au/ (Wix)

A modern, fast, and professional single-page application for a personal training business specializing in movement-based fitness coaching. The site replaces an outdated Wix website with a custom-built React SPA that is faster, more maintainable, and fully customizable.

## Business Description

James Ashford offers functional strength and mobility coaching with a unique "leveling up" approach to fitness. With almost 20 years of personal training experience and 5 years as a professional trainer, he uses diverse training methods including:

- Kettlebells
- Landmines
- Bodyweight exercises
- Sandbags
- Clubs & Maces
- Ground-based movements
- Mobility work

**Philosophy:** Fitness as a video game - level up different attributes (strength, mobility, power, etc.) rather than focusing on just one aspect. Training that builds real-world ability and body awareness.

## Tech Stack

### Core Technologies
- **React:** 19.2.0 (latest stable)
- **Vite:** 7.2.2 (build tool)
- **Tailwind CSS:** 4.0 (utility-first CSS)
- **Node.js:** 24.3.0 (exceeds requirements)
- **JavaScript:** ES6+ (no TypeScript)

### Key Dependencies
```json
{
  "clsx": "^2.1.1",                    // Conditional className utility
  "embla-carousel-react": "^8.6.0",    // Testimonials carousel
  "react-calendly": "^4.4.0"           // Booking integration (future)
}
```

### Hosting & Deployment
- **Platform:** Vercel
- **CLI:** Vercel CLI 48.9.0
- **Deployment:** Automatic via `vercel --prod --yes`
- **Cost:** Free tier (100GB bandwidth/month)

## Project Structure

```
movement-based-training/
├── src/
│   ├── components/          # React components
│   │   ├── Navigation.jsx   # Fixed header with scroll effects
│   │   ├── Hero.jsx        # Landing section with background image
│   │   ├── About.jsx       # Bio, philosophy, what's offered
│   │   ├── Services.jsx    # Training packages and pricing
│   │   ├── Testimonials.jsx # Client reviews carousel
│   │   ├── Contact.jsx     # Location, email, newsletter
│   │   └── Footer.jsx      # Quick links, contact info
│   ├── assets/
│   │   └── images/         # All images (hero, profile, logo)
│   ├── App.jsx            # Main app component
│   ├── App.css            # Custom animations
│   ├── index.css          # Tailwind + theme config
│   └── main.jsx           # Entry point
├── public/                # Static assets
├── index.html            # HTML template with SEO
├── postcss.config.js     # Tailwind v4 PostCSS config
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies
```

## Design System

### Brand Colors
```css
--color-brand-dark: #1a1a1a;      /* Primary text/headers */
--color-brand-light: #f8f9fa;     /* Background accent */
--color-brand-primary: #2563eb;   /* CTA buttons (blue) */
--color-brand-accent: #0ea5e9;    /* Highlights/links */
--color-brand-success: #10b981;   /* Success states */
--color-brand-neutral: #6b7280;   /* Secondary text */
--color-brand-orange: #f97316;    /* Badges/highlights */
```

### Typography
- **Body:** Inter (Google Fonts)
- **Headings:** Montserrat (Google Fonts)
- **Mobile-first:** Responsive sizing with md:, lg:, xl: breakpoints

### Images
- **hero-image.avif** - Full-screen hero background
- **profile-image.avif** - James's professional photo (About section)
- **logo.png** - Full branding logo (navigation & footer)
- **image-3.avif, image-4.avif** - Additional images (unused, available for future features)

## Key Features

### 1. Navigation
- Fixed header that stays visible on scroll
- Shrinks when scrolled (h-14 → h-12)
- Smooth scroll to sections
- Mobile hamburger menu
- Clickable logo returns to top
- **Solid white background** (no translucency)

### 2. Hero Section
- Full-screen background image
- Dark gradient overlay for text readability
- Two CTAs: "Book Your Session" and "Learn More"
- Scroll indicator
- Responsive text sizing

### 3. About Section
- James's professional photo (square, rounded)
- Biography and experience
- "Leveling up" philosophy explanation
- What's offered (4 key benefits with icons)
- Why choose this approach

### 4. Services Section
- Two main services:
  - **Personal Training Single Session** (Popular badge)
  - **New Starter Package** (Best Value badge)
- Pricing cards with features
- Book Now buttons (scroll to contact)
- Training tools grid (8 methods showcased)

### 5. Testimonials
- Embla Carousel (auto-rotating)
- 4 sample testimonials (replace with real ones)
- 5-star ratings
- Navigation arrows and dots
- Responsive design

### 6. Contact Section
- Location: Bulimba, Brisbane, QLD
- Email: james@movementbasedtraining.com.au
- Training hours information
- Social media links (Instagram, Facebook)
- Newsletter signup form (placeholder)
- CTA card with booking options

### 7. Footer
- Logo (clickable, scrolls to top)
- Quick links to all sections
- Contact information
- Privacy Policy & Terms (placeholders)
- Copyright notice

## Responsive Design

### Breakpoints (Tailwind defaults)
- **Mobile:** Default (< 768px)
- **Tablet:** md: (768px+)
- **Desktop:** lg: (1024px+)
- **Large Desktop:** xl: (1280px+)

### Mobile Optimizations
- Hamburger menu for navigation
- Single-column layouts
- Touch-friendly buttons (44x44px minimum)
- Optimized image loading (AVIF format)
- Fast performance (CSS: 5.3KB gzipped, JS: 76.1KB gzipped)

## SEO Optimization

### Meta Tags
```html
<title>Movement Based Training | Personal Trainer Brisbane | James Ashford</title>
<meta name="description" content="Functional strength & mobility coaching in Bulimba, Brisbane. Level up your fitness with dynamic, varied workouts using kettlebells, landmines, bodyweight, and more." />
<meta name="keywords" content="personal trainer Brisbane, Bulimba personal trainer, functional training, movement based training, kettlebell training, strength coach" />
```

### Open Graph
- og:title, og:description, og:url configured
- Social media sharing optimized

## Development Workflow

### Local Development
```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
```

### Deployment
```bash
vercel --prod --yes  # Deploy to production
```

### Version Control
- **Git:** Initialized with initial commit
- **Branch:** main
- **Commit:** Clean, descriptive messages with co-author attribution

## Future Enhancements

### Priority Features
1. **Calendly Integration** - Replace placeholder with live booking system
2. **MailChimp Newsletter** - Add serverless function for email capture
3. **Real Testimonials** - Replace sample content with actual client reviews
4. **FAQ Section** - Add common questions about training
5. **Gallery/Portfolio** - Showcase training sessions using image-3 & image-4
6. **Custom Domain** - Connect movementbasedtraining.com.au to Vercel

### Optional Features
- Contact form with backend (instead of just email link)
- Blog/articles section for SEO
- Instagram feed integration
- Video testimonials
- Online program sales
- Google Maps embed for location

## Performance Metrics

### Current Build Size
- **HTML:** 1.66 KB (0.75 KB gzipped)
- **CSS:** 27.37 KB (5.32 KB gzipped)
- **JS:** 240.10 KB (76.12 KB gzipped)
- **Images:**
  - hero-image.avif: 74.87 KB
  - profile-image.avif: 39.39 KB
  - logo.png: 740.83 KB

### Performance Targets
- **Lighthouse Score:** 90+ (all categories)
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s

## Content Strategy

### Target Audience
- Local Brisbane residents (Bulimba area)
- Fitness enthusiasts seeking specialized training
- People looking for functional, varied workouts
- Clients who want personalized, engaging training
- All fitness levels (emphasis on beginners with New Starter Package)

### Key Messaging
- "Level up your fitness" (gaming metaphor)
- Movement-based vs. traditional gym training
- Building real-world ability and body awareness
- Diverse, engaging workouts that stay interesting
- Expert guidance with 20+ years of experience

### SEO Keywords
- Personal trainer Brisbane
- Bulimba personal trainer
- Functional training
- Movement based training
- Kettlebell training Brisbane
- Strength coach Brisbane

## Contact & Support

### Client Contact
- **Email:** james@movementbasedtraining.com.au
- **Location:** Bulimba, Brisbane, QLD
- **Social:** Instagram, Facebook (URLs to be added)

### Technical Support
- **Hosting:** Vercel Dashboard
- **Project Path:** `/Users/anyathebault/Documents/Dev/JamesAshford/movement-based-training`
- **Documentation:** This file + IMAGE_GUIDE.md + claude.md

## Version History

### v1.0.0 - Initial Release (November 11, 2025)
- Complete SPA website with all sections
- Real images integrated (hero, profile, logo)
- Responsive design optimized
- Deployed to Vercel
- Git repository initialized
- SEO optimized
- Professional branding throughout

---

**Last Updated:** November 11, 2025
**Status:** Production-ready, deployed to Vercel
**Maintained By:** Claude Code + Client (James Ashford via Anya)
