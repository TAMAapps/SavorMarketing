# Savor Design System

## Overview
Comprehensive design system for Savor - the premier food memory and journaling app. This system combines insights from premium site patterns with Savor's unique brand positioning as a sophisticated yet approachable food memory platform.

**Brand Essence**: Sophisticated yet approachable, empowering users to turn every meal into a memorable experience while celebrating food memories and stories globally.

---

## 1. Color Palette

### Primary Colors

#### Brand Primary - Deep Navy
```css
--savor-primary: #2C3E50;
--savor-primary-light: #34495E;
--savor-primary-dark: #1A252F;
--savor-primary-50: rgba(44, 62, 80, 0.1);
--savor-primary-100: rgba(44, 62, 80, 0.2);
```
**Usage**: Headers, navigation, professional text, backgrounds, brand elements
**Psychology**: Sophisticated, trustworthy, professional, credible, premium

#### Brand Secondary - Warm Gray
```css
--savor-secondary: #6B7280;
--savor-secondary-light: #9CA3AF;
--savor-secondary-dark: #4B5563;
--savor-secondary-50: rgba(107, 114, 128, 0.1);
--savor-secondary-100: rgba(107, 114, 128, 0.2);
```
**Usage**: Supporting text, subtle elements, secondary navigation
**Psychology**: Elegant, sophisticated, refined, understated

### Functional Colors

#### Success - Fresh Green
```css
--savor-success: #27AE60;
--savor-success-light: #2ECC71;
--savor-success-dark: #1E8E47;
--savor-success-50: rgba(39, 174, 96, 0.1);
```
**Usage**: Successful scans, positive ratings, completed actions
**Meaning**: Achievement, positive experiences, successful memory capture

#### CTA Orange (Primary Action Color)
```css
--savor-cta: #FF6B35;
--savor-cta-light: #FF8355;
--savor-cta-dark: #E55A2B;
--savor-cta-50: rgba(255, 107, 53, 0.1);
--savor-cta-100: rgba(255, 107, 53, 0.2);
```
**Usage**: Primary CTAs, download buttons, conversion actions, urgent notifications
**Meaning**: Action-oriented, appetite stimulation, energy, conversion focus

#### Error - Refined Red
```css
--savor-error: #E74C3C;
--savor-error-light: #EC7063;
--savor-error-dark: #C0392B;
--savor-error-50: rgba(231, 76, 60, 0.1);
```
**Usage**: Error states, failed scans, validation messages
**Meaning**: Issues, attention required, critical actions

### Neutral Palette

#### Clean Whites
```css
--savor-white: #FFFFFF;
--savor-white-soft: #F8F9FA;
--savor-white-warm: #FEFEFE;
```

#### Sophisticated Grays
```css
--savor-gray-50: #F7F8FC;
--savor-gray-100: #E1E5E9;
--savor-gray-200: #C5CDD6;
--savor-gray-300: #A0A9B8;
--savor-gray-400: #6C7B7F;
--savor-gray-500: #666666;
--savor-gray-600: #4A5568;
--savor-gray-700: #2D3748;
--savor-gray-800: #1A202C;
--savor-gray-900: #171923;
```

### Food Memory Specific Colors

#### Memory Categories
```css
--savor-memory-loved: #E74C3C;      /* Heart/Loved dishes */
--savor-memory-liked: #27AE60;      /* Good experiences - success green */
--savor-memory-neutral: #95A5A6;    /* Neutral ratings */
--savor-memory-disliked: #7F8C8D;   /* Poor experiences */
```

#### Cuisine Categories
```css
--savor-cuisine-asian: #FF6B6B;     /* Vibrant red */
--savor-cuisine-european: #4ECDC4;  /* Sophisticated teal */
--savor-cuisine-american: #45B7D1;  /* Classic blue */
--savor-cuisine-african: #FFA07A;   /* Warm orange */
--savor-cuisine-latin: #98D8C8;     /* Fresh green */
--savor-cuisine-fusion: #F7DC6F;    /* Creative yellow */
```

---

## 2. Typography System

### Font Families

#### Primary - Playfair Display (Headers)
```css
font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
```
**Character**: Elegant, editorial, sophisticated, food magazine aesthetic
**Usage**: Main headlines, hero text, section headers, memory card titles

#### Secondary - Source Sans Pro (Body)
```css
font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```
**Character**: Clean, readable, professional, accessible
**Usage**: Body text, descriptions, navigation, form labels

#### Accent - Montserrat (UI Elements)
```css
font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```
**Character**: Modern, friendly, geometric, tech-forward
**Usage**: Buttons, badges, statistics, modern UI elements

### Typography Scale

#### Display & Headlines
```css
/* Display - Hero Headlines */
.savor-display {
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;        /* 56px */
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

/* H1 - Page Headers */
.savor-h1 {
  font-family: 'Playfair Display', serif;
  font-size: 3rem;          /* 48px */
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.015em;
}

/* H2 - Section Headers */
.savor-h2 {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;          /* 32px */
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

/* H3 - Subsection Headers */
.savor-h3 {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.5rem;        /* 24px */
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0;
}

/* H4 - Component Headers */
.savor-h4 {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.25rem;       /* 20px */
  font-weight: 600;
  line-height: 1.4;
}

/* H5 - Small Headers */
.savor-h5 {
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;          /* 16px */
  font-weight: 600;
  line-height: 1.5;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

#### Body Text
```css
/* Large Body - Hero descriptions */
.savor-body-large {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.25rem;       /* 20px */
  font-weight: 400;
  line-height: 1.6;
  color: var(--savor-gray-600);
}

/* Regular Body - Standard text */
.savor-body {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1rem;          /* 16px */
  font-weight: 400;
  line-height: 1.6;
  color: var(--savor-gray-700);
}

/* Small Body - Supporting text */
.savor-body-small {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 0.875rem;      /* 14px */
  font-weight: 400;
  line-height: 1.5;
  color: var(--savor-gray-500);
}

/* Caption - Metadata, timestamps */
.savor-caption {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;       /* 12px */
  font-weight: 500;
  line-height: 1.4;
  color: var(--savor-gray-400);
  letter-spacing: 0.025em;
}
```

#### Interactive Elements
```css
/* Button Text */
.savor-button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;          /* 16px */
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.025em;
}

/* Link Text */
.savor-link {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
}

/* Label Text */
.savor-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.875rem;      /* 14px */
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.01em;
}
```

### Responsive Typography

#### Mobile Scaling
```css
/* Mobile adjustments */
@media (max-width: 768px) {
  .savor-display { font-size: 2.5rem; }    /* 40px */
  .savor-h1 { font-size: 2rem; }           /* 32px */
  .savor-h2 { font-size: 1.5rem; }         /* 24px */
  .savor-body-large { font-size: 1.125rem; } /* 18px */
}

@media (max-width: 480px) {
  .savor-display { font-size: 2rem; }      /* 32px */
  .savor-h1 { font-size: 1.75rem; }        /* 28px */
  .savor-h2 { font-size: 1.25rem; }        /* 20px */
}
```

---

## 3. Spacing System

### Base Scale
```css
/* Savor Spacing Variables */
:root {
  --space-1: 0.25rem;     /* 4px */
  --space-2: 0.5rem;      /* 8px */
  --space-3: 0.75rem;     /* 12px */
  --space-4: 1rem;        /* 16px */
  --space-5: 1.25rem;     /* 20px */
  --space-6: 1.5rem;      /* 24px */
  --space-8: 2rem;        /* 32px */
  --space-10: 2.5rem;     /* 40px */
  --space-12: 3rem;       /* 48px */
  --space-16: 4rem;       /* 64px */
  --space-20: 5rem;       /* 80px */
  --space-24: 6rem;       /* 96px */
}
```

### Semantic Spacing
```css
/* Component Spacing */
--space-xs: var(--space-2);      /* 8px - tight elements */
--space-sm: var(--space-4);      /* 16px - related elements */
--space-md: var(--space-6);      /* 24px - component separation */
--space-lg: var(--space-8);      /* 32px - section elements */
--space-xl: var(--space-12);     /* 48px - major sections */
--space-xxl: var(--space-16);    /* 64px - page sections */

/* Layout Spacing */
--layout-xs: var(--space-4);     /* 16px - form fields */
--layout-sm: var(--space-6);     /* 24px - card padding */
--layout-md: var(--space-8);     /* 32px - component margins */
--layout-lg: var(--space-12);    /* 48px - section padding */
--layout-xl: var(--space-20);    /* 80px - page padding */
--layout-xxl: var(--space-24);   /* 96px - hero sections */
```

### Container System
```css
/* Content Containers */
.savor-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);     /* 24px sides */
}

.savor-container-narrow {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.savor-container-wide {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--space-8);     /* 32px sides */
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .savor-container,
  .savor-container-narrow,
  .savor-container-wide {
    padding: 0 var(--space-4);   /* 16px sides */
  }
}
```

---

## 4. Component Patterns

### Memory Card Component
```css
.savor-memory-card {
  background: var(--savor-white);
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--savor-gray-100);
  padding: var(--space-6);
  transition: all 0.3s ease;
  border: 1px solid var(--savor-gray-100);
}

.savor-memory-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px var(--savor-gray-200);
  border-color: var(--savor-primary-100);
}

.savor-memory-card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: var(--space-4);
}

.savor-memory-card__title {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--savor-secondary);
  margin-bottom: var(--space-2);
}

.savor-memory-card__rating {
  display: flex;
  gap: var(--space-1);
  margin-bottom: var(--space-3);
}

.savor-memory-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: var(--savor-gray-500);
}
```

### Button System
```css
/* Primary Button - CTA Orange */
.savor-btn-primary {
  background: var(--savor-cta);
  color: var(--savor-white);
  border: none;
  padding: var(--space-3) var(--space-6);
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px var(--savor-cta-50);
}

.savor-btn-primary:hover {
  background: var(--savor-cta-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px var(--savor-cta-100);
}

/* Secondary Button - Navy Outline */
.savor-btn-secondary {
  background: transparent;
  color: var(--savor-primary);
  border: 2px solid var(--savor-primary);
  padding: var(--space-3) var(--space-6);
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.savor-btn-secondary:hover {
  background: var(--savor-primary);
  color: var(--savor-white);
  transform: translateY(-2px);
}

/* Ghost Button */
.savor-btn-ghost {
  background: transparent;
  color: var(--savor-gray-600);
  border: none;
  padding: var(--space-3) var(--space-4);
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.savor-btn-ghost:hover {
  color: var(--savor-primary);
  background: var(--savor-primary-50);
}
```

### Rating System
```css
.savor-rating {
  display: flex;
  gap: var(--space-1);
  align-items: center;
}

.savor-rating__star {
  width: 20px;
  height: 20px;
  color: var(--savor-gray-300);
  transition: color 0.2s ease;
}

.savor-rating__star--filled {
  color: var(--savor-cta);
}

.savor-rating__star--half {
  background: linear-gradient(90deg, 
    var(--savor-cta) 50%, 
    var(--savor-gray-300) 50%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.savor-rating__text {
  margin-left: var(--space-2);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--savor-gray-600);
}
```

### Scan Button (AI Feature)
```css
.savor-scan-btn {
  position: relative;
  background: linear-gradient(135deg, var(--savor-cta), var(--savor-cta-light));
  color: var(--savor-white);
  border: none;
  padding: var(--space-5) var(--space-8);
  border-radius: 50px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(255, 107, 53, 0.4);
  overflow: hidden;
}

.savor-scan-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(255, 107, 53, 0.6);
}

.savor-scan-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.2), 
    transparent);
  transition: left 0.5s ease;
}

.savor-scan-btn:hover::before {
  left: 100%;
}

.savor-scan-btn__icon {
  margin-right: var(--space-2);
  font-size: 1.25rem;
}
```

### Form Elements
```css
.savor-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--savor-gray-200);
  border-radius: 8px;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1rem;
  background: var(--savor-white);
  transition: all 0.2s ease;
}

.savor-input:focus {
  outline: none;
  border-color: var(--savor-cta);
  box-shadow: 0 0 0 3px var(--savor-cta-50);
}

.savor-input--error {
  border-color: var(--savor-error);
}

.savor-input--error:focus {
  box-shadow: 0 0 0 3px var(--savor-error-50);
}

.savor-label {
  display: block;
  margin-bottom: var(--space-2);
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--savor-gray-700);
}

.savor-label--required::after {
  content: ' *';
  color: var(--savor-error);
}
```

---

## 5. Layout Principles

### Grid System
```css
/* Flexible Grid */
.savor-grid {
  display: grid;
  gap: var(--space-6);
}

.savor-grid--2 {
  grid-template-columns: repeat(2, 1fr);
}

.savor-grid--3 {
  grid-template-columns: repeat(3, 1fr);
}

.savor-grid--4 {
  grid-template-columns: repeat(4, 1fr);
}

.savor-grid--auto {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .savor-grid--2,
  .savor-grid--3,
  .savor-grid--4 {
    grid-template-columns: 1fr;
  }
  
  .savor-grid--auto {
    grid-template-columns: 1fr;
  }
}
```

### Section Layouts

#### Hero Section
```css
.savor-hero {
  padding: var(--layout-xxl) 0 var(--layout-xl);
  text-align: center;
  background: linear-gradient(135deg, 
    var(--savor-primary-50), 
    var(--savor-gray-50));
  position: relative;
  overflow: hidden;
}

.savor-hero__content {
  max-width: 800px;
  margin: 0 auto;
}

.savor-hero__title {
  margin-bottom: var(--space-6);
}

.savor-hero__description {
  margin-bottom: var(--space-8);
}

.savor-hero__actions {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .savor-hero {
    padding: var(--layout-xl) 0 var(--layout-lg);
  }
  
  .savor-hero__actions {
    flex-direction: column;
    align-items: center;
  }
}
```

#### Feature Section
```css
.savor-features {
  padding: var(--layout-xl) 0;
  background: var(--savor-white);
}

.savor-features__header {
  text-align: center;
  margin-bottom: var(--layout-lg);
}

.savor-features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-8);
}

.savor-feature {
  text-align: center;
  padding: var(--space-8);
  border-radius: 16px;
  background: var(--savor-gray-50);
  transition: all 0.3s ease;
}

.savor-feature:hover {
  background: var(--savor-white);
  box-shadow: 0 8px 32px var(--savor-gray-100);
  transform: translateY(-4px);
}

.savor-feature__icon {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--space-6);
  background: linear-gradient(135deg, var(--savor-primary), var(--savor-primary-light));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--savor-white);
}
```

### Target Audience Layouts

#### Consumer Layout (Default)
- Warm, appetizing colors
- Emotional messaging
- Large, beautiful food photography
- Simple, intuitive navigation
- Mobile-first experience

#### Professional Layout (Food Critics)
```css
.savor-professional {
  --primary-color: var(--savor-secondary);
  --accent-color: var(--savor-primary);
}

.savor-professional .savor-hero {
  background: linear-gradient(135deg, 
    var(--savor-secondary), 
    var(--savor-secondary-light));
  color: var(--savor-white);
}

.savor-professional .savor-feature {
  background: var(--savor-secondary-50);
  border-left: 4px solid var(--savor-primary);
}

.savor-professional .savor-btn-primary {
  background: var(--savor-secondary);
  border-color: var(--savor-secondary);
}
```

---

## 6. Interactive States

### Hover States
```css
/* Default hover lift */
.savor-hover-lift:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}

/* Subtle scale */
.savor-hover-scale:hover {
  transform: scale(1.02);
  transition: transform 0.2s ease;
}

/* Glow effect */
.savor-hover-glow:hover {
  box-shadow: 0 0 20px var(--savor-primary-100);
  transition: box-shadow 0.3s ease;
}
```

### Loading States
```css
.savor-loading {
  position: relative;
  overflow: hidden;
}

.savor-loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
    transparent,
    var(--savor-primary-50),
    transparent);
  animation: savor-shimmer 1.5s infinite;
}

@keyframes savor-shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}
```

### Focus States
```css
.savor-focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--savor-primary-100);
  border-color: var(--savor-primary);
}
```

---

## 7. Accessibility Guidelines

### Color Contrast
- **AA Standard**: Minimum 4.5:1 ratio for normal text
- **AAA Standard**: Minimum 7:1 ratio for enhanced accessibility
- **Large Text**: Minimum 3:1 ratio for text 18px+ or 14px+ bold

### Focus Management
```css
/* Custom focus indicators */
*:focus {
  outline: 2px solid var(--savor-primary);
  outline-offset: 2px;
}

/* Skip to content link */
.savor-skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--savor-primary);
  color: var(--savor-white);
  padding: 8px;
  z-index: 1000;
  text-decoration: none;
  border-radius: 4px;
}

.savor-skip-link:focus {
  top: 6px;
}
```

### Screen Reader Support
```css
/* Visually hidden but accessible to screen readers */
.savor-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## 8. Motion & Animation

### Transition Standards
```css
/* Default transitions */
--transition-fast: 0.15s ease;
--transition-normal: 0.3s ease;
--transition-slow: 0.5s ease;

/* Easing functions */
--ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
--ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
```

### Memory Capture Animation
```css
@keyframes savor-capture {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 var(--savor-primary);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(212, 165, 116, 0.4);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 20px rgba(212, 165, 116, 0);
  }
}

.savor-capture-animation {
  animation: savor-capture 0.6s ease-out;
}
```

### Floating Elements
```css
@keyframes savor-float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.savor-float {
  animation: savor-float 3s ease-in-out infinite;
}
```

---

## 9. Mobile Optimizations

### Touch Targets
```css
/* Minimum touch target size */
.savor-touch-target {
  min-height: 44px;
  min-width: 44px;
}

/* Mobile-optimized buttons */
@media (max-width: 768px) {
  .savor-btn-primary,
  .savor-btn-secondary {
    padding: var(--space-4) var(--space-6);
    font-size: 1.125rem;
  }
}
```

### Mobile Typography
```css
@media (max-width: 768px) {
  /* Increase base font size for mobile readability */
  html {
    font-size: 18px;
  }
  
  /* Optimize line heights for mobile */
  .savor-body {
    line-height: 1.7;
  }
}
```

---

## 10. Implementation Guidelines

### CSS Custom Properties Usage
```css
:root {
  /* Use semantic naming */
  --color-primary: var(--savor-primary);
  --color-text: var(--savor-gray-700);
  --color-background: var(--savor-white);
  
  /* Component-specific properties */
  --memory-card-shadow: 0 4px 12px var(--savor-gray-100);
  --button-radius: 8px;
  --input-radius: 8px;
}
```

### Dark Mode Considerations
```css
@media (prefers-color-scheme: dark) {
  :root {
    --savor-white: #1A1A1A;
    --savor-gray-50: #2D2D2D;
    --savor-gray-700: #E5E5E5;
    --savor-secondary: #4A5568;
  }
}
```

### Performance Optimization
- Use `transform` and `opacity` for animations
- Prefer CSS Grid and Flexbox over floats
- Implement lazy loading for images
- Use `will-change` sparingly for animation optimization

---

## 11. Content Guidelines

### Voice and Tone
- **Sophisticated yet approachable**: Professional but not intimidating
- **Empowering**: Help users feel confident about their food choices
- **Nostalgic**: Celebrate food memories and experiences
- **Global-minded**: Inclusive of all cuisines and cultures

### Messaging Hierarchy
1. **Primary Message**: Memory preservation and organization
2. **Secondary Message**: AI-powered ease of use
3. **Supporting Message**: Social and professional features

### Error Messages
```css
.savor-error-message {
  color: var(--savor-error);
  font-size: 0.875rem;
  margin-top: var(--space-2);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.savor-error-message::before {
  content: '⚠️';
  font-size: 1rem;
}
```

---

## 12. Testing & Quality Assurance

### Browser Support
- **Modern browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile browsers**: iOS Safari 14+, Chrome Mobile 90+
- **Legacy support**: Graceful degradation for older browsers

### Testing Checklist
- [ ] Color contrast meets WCAG AA standards
- [ ] All interactive elements have focus states
- [ ] Components work across supported browsers
- [ ] Touch targets meet minimum 44px requirement
- [ ] Text remains readable at 200% zoom
- [ ] Components respond properly to different screen sizes

---

*This design system serves as the foundation for all Savor marketing materials, web interfaces, and brand applications. It should be regularly updated based on user feedback and evolving brand needs.*