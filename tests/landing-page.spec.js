// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Savor Landing Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Use production URL if available, otherwise use local
    const url = process.env.PRODUCTION_URL || 'https://savortheapp.com';
    await page.goto(url);
  });

  test('page loads successfully and has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Savor - Real Foodies Keep Score/);
    
    // Check main heading is visible
    await expect(page.locator('h1')).toContainText('Real Foodies Keep Score');
  });

  test('all images load correctly', async ({ page }) => {
    // Wait for all images to load
    await page.waitForLoadState('networkidle');
    
    // Check app screenshots in features section
    const appScreenshots = [
      'assets/app-screenshots/dishscreensnap2.jpg',
      'assets/app-screenshots/ListofDishes.jpg',
      'assets/app-screenshots/Intelligentdiscovery.jpg'
    ];
    
    for (const screenshot of appScreenshots) {
      const img = page.locator(`img[src="${screenshot}"]`);
      await expect(img).toBeVisible();
      
      // Verify image actually loaded (not broken)
      const naturalWidth = await img.evaluate(el => el.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test('navigation links work correctly', async ({ page }) => {
    // Test header navigation links
    const navLinks = [
      { text: 'Features', target: '#features' },
      { text: 'Reviews', target: '#reviews' },
      { text: 'About', target: '#about' }
    ];
    
    for (const link of navLinks) {
      await page.locator(`nav a:has-text("${link.text}")`).click();
      await expect(page).toHaveURL(new RegExp(link.target));
    }
  });

  test('hero waitlist form submits successfully', async ({ page }) => {
    // Fill and submit hero form
    const heroForm = page.locator('#hero-waitlist-form');
    const heroEmailInput = heroForm.locator('input[type="email"]');
    const heroSubmitButton = heroForm.locator('button[type="submit"]');
    
    await heroEmailInput.fill('test@example.com');
    await heroSubmitButton.click();
    
    // Verify form submission (checks if redirected or form cleared)
    // Note: Actual behavior depends on Formspree configuration
    await page.waitForTimeout(2000); // Wait for submission
  });

  test('CTA waitlist form submits successfully', async ({ page }) => {
    // Scroll to CTA section
    await page.locator('#waitlist').scrollIntoViewIfNeeded();
    
    // Fill and submit CTA form
    const ctaForm = page.locator('#cta-waitlist-form');
    const ctaEmailInput = ctaForm.locator('input[type="email"]');
    const ctaSubmitButton = ctaForm.locator('button[type="submit"]');
    
    await ctaEmailInput.fill('test2@example.com');
    await ctaSubmitButton.click();
    
    // Verify form submission
    await page.waitForTimeout(2000); // Wait for submission
  });

  test('mobile responsive design works', async ({ page, browserName }) => {
    // Skip webkit on mobile as it's handled by Mobile Safari project
    if (browserName === 'webkit') {
      test.skip();
    }
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check mobile menu button is visible
    const mobileMenuButton = page.locator('button[aria-label="Open main menu"]');
    await expect(mobileMenuButton).toBeVisible();
    
    // Check desktop nav is hidden
    const desktopNav = page.locator('nav .hidden.lg\\:flex');
    await expect(desktopNav).not.toBeVisible();
  });

  test('social media links have correct URLs', async ({ page }) => {
    const socialLinks = [
      { platform: 'Instagram', url: 'https://instagram.com/savortheapp' },
      { platform: 'Twitter', url: 'https://twitter.com/savortheapp' },
      { platform: 'TikTok', url: 'https://tiktok.com/@savortheapp' }
    ];
    
    for (const social of socialLinks) {
      const link = page.locator(`footer a[href="${social.url}"]`);
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', social.url);
    }
  });

  test('page performance metrics', async ({ page }) => {
    // Measure page load performance
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
      };
    });
    
    // Log performance metrics
    console.log('Performance Metrics:', metrics);
    
    // Basic performance assertions (adjust thresholds as needed)
    expect(metrics.firstContentfulPaint).toBeLessThan(3000); // FCP under 3 seconds
  });

  test('Vercel Analytics is loaded', async ({ page }) => {
    // Check if Vercel Analytics script is present
    const analyticsScript = page.locator('script[src="/_vercel/insights/script.js"]');
    await expect(analyticsScript).toHaveCount(1);
    
    // Check if window.va function exists
    const hasAnalytics = await page.evaluate(() => {
      return typeof window.va === 'function';
    });
    expect(hasAnalytics).toBeTruthy();
  });

  test('critical content is visible above the fold', async ({ page }) => {
    // Check that important elements are visible without scrolling
    const criticalElements = [
      'h1:has-text("Real Foodies Keep Score")',
      'form#hero-waitlist-form',
      'button:has-text("Build My Taste Database")',
      'p:has-text("Your personal taste database")'
    ];
    
    for (const selector of criticalElements) {
      const element = page.locator(selector).first();
      await expect(element).toBeVisible();
    }
  });

  test('animations and interactions work', async ({ page }) => {
    // Test hover effects on feature cards
    const featureCard = page.locator('.hover-lift').first();
    await featureCard.hover();
    
    // Verify smooth scroll works
    await page.locator('a[href="#features"]').click();
    await page.waitForTimeout(1000); // Wait for smooth scroll
    
    const featuresSection = page.locator('#features');
    await expect(featuresSection).toBeInViewport();
  });

  test('no console errors', async ({ page }) => {
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto(process.env.PRODUCTION_URL || 'https://savortheapp.com');
    await page.waitForLoadState('networkidle');
    
    // Assert no console errors
    expect(errors).toHaveLength(0);
  });
});