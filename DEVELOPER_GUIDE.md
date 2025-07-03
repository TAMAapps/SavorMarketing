# Savor App Onboarding Screens - Developer Implementation Guide

## Overview
This document provides detailed specifications for implementing the 8-screen onboarding flow for the Savor mobile app. Each screen builds emotional engagement before demonstrating features.

**Design Files Location:** `/onboarding/mockups/` - View `index.html` for full interactive demo

---

## Screen 0: Personal Connection (Alex's Story)
**File:** `screen-0-founder-story.html`

### Purpose
Establish personal connection with founder's authentic story to build trust and relatability.

### Content Requirements
- **Headline:** "Hi, I'm Alex 👋"
- **Main Text:** "Three months after the best ramen of my life in Tokyo, I couldn't remember the restaurant's name. I was so frustrated. This wasn't the first time either. That's when I knew I needed Savor."
- **CTA Button:** "I've been there too"

### Visual Elements
- Stylized founder avatar (female, late 20s, brownish-blonde hair)
- Warm gold gradient background with floating food emojis
- Animated hearts floating upward
- Progress dots: 1 active, 7 inactive

### Technical Notes
- Avatar should be illustrated/stylized, not a real photo
- Subtle animations on load (fade-in sequence)
- Warm, approachable color palette with Savor brand colors

---

## Screen 1: The Breaking Point
**File:** `screen-1-breaking-point.html`

### Purpose
Compound the pain with social embarrassment - the moment that motivated building Savor.

### Content Requirements
- **Main Text:** "Then it got worse. My best friend texted: 'Going to Tokyo! Send me your list!' All I had were 70 unorganized Google Maps pins and zero memory of which places were actually good. Not what she expected from me."
- **CTA Button:** "There's got to be a solution"

### Visual Elements
- Phone mockup showing messy map with scattered red pins
- Text message conversation: "Going to Tokyo! Send me your list! 🍜✈️"
- Chaos/frustration indicators (pulsing pins, frustration emoji)
- Animated typing effect on the text message
- Progress dots: 2 active, 6 inactive

### Technical Notes
- Phone mockup should be realistic iOS style
- Pins should pulse/animate to show chaos
- Message should type in with realistic timing
- Convey frustration through visual design

---

## Screen 2: Community Mission
**File:** `screen-2-community-mission.html`

### Purpose
Show user they're supporting a fellow foodie and joining a community, not just using a corporate app.

### Content Requirements
- **Headline:** "We're building this together"
- **Main Text:** "You're not just using an app - you're supporting a fellow foodie and joining our community."
- **Support Message:** "Your support means everything. Every download helps make Savor better for food lovers everywhere."
- **CTA Button:** "Let's start my story 🌟"

### Visual Elements
- Community circles with food emojis connected by animated lines
- Stats showing community metrics (2.3K memories, 47 countries, ∞ stories)
- Central circle with handshake emoji
- Connecting lines with pulse animation
- Progress dots: 3 active, 5 inactive

### Technical Notes
- Community circles should float and connect visually
- Stats should count up on screen load
- Warm, inclusive design with emphasis on human connection

---

## Screen 3: Universal Problem
**File:** `screen-3-universal-problem.html`

### Purpose
Make the pain universal - everyone has lost precious food memories.

### Content Requirements
- **Headline:** "How many incredible meals have you forgotten?"
- **Subtext:** "That birthday dinner. The honeymoon surprise. Your grandma's secret spot. Gone. Like they never happened."
- **CTA Button:** "Never again"

### Visual Elements
- Fading food emojis with question marks appearing over them
- Nostalgic, melancholic atmosphere
- Food items gradually become transparent/fade away
- Question marks pulse in over faded foods
- Progress dots: 4 active, 4 inactive

### Technical Notes
- Animation showing food memories "disappearing"
- Question marks should appear after food fades
- Emotional color palette (more muted, nostalgic)
- Convey loss and forgetfulness through animation

---

## Screen 4: The Magic Solution
**File:** `screen-4-magic-solution.html`

### Purpose
Demonstrate the core AI functionality with quantified benefits and visual proof.

### Content Requirements
- **Headline:** "Now watch this magic ✨"
- **Subtext:** "One photo. 3 seconds. Forever saved."
- **CTA Button:** "Show me more"

### Visual Elements
- Camera viewfinder with truffle pasta dish
- Scanning line animation across the food
- AI results popup with: "Truffle Pasta at Osteria del Borgo"
- Description: "Rich, earthy flavors with fresh truffle shavings. The perfect comfort food for a rainy evening."
- Tags: Italian, Pasta, Truffle, Comfort Food
- Counter showing "2.8 seconds" processing time
- Sparkle animations around the scanning area
- Progress dots: 5 active, 3 inactive

### Technical Notes
- Scanning animation should feel like real AI processing
- Results should slide in smoothly after scan completes
- Counter should animate from 0 to 2.8 seconds
- Emphasize speed and accuracy of AI recognition

---

## Screen 5: Personal Vault
**File:** `screen-5-personal-vault.html`

### Purpose
Show the organizational power and search functionality that makes memories useful.

### Content Requirements
- **Headline:** "Your taste, organized"
- **Subtext:** "Search 'pasta in Paris' or 'Max's birthday dinner'. Find any dish in seconds. Share lists with friends traveling to your cities."
- **CTA Button:** "I need this"

### Visual Elements
- Grid of beautifully organized dish cards
- Search bar with example queries
- Filter/organization options visible
- Clean, Pinterest-like layout showing the vault in action
- Progress dots: 6 active, 2 inactive

### Technical Notes
- CTA button must be centered and fit on screen
- Show diversity of cuisines and locations
- Emphasize organization and searchability
- Visual should feel like a personal collection

---

## Screen 6: The Invitation
**File:** `screen-6-ai-demo.html` (needs content update)

### Purpose
Create urgency and belonging with social proof, focus on "tonight" as starting point.

### Content Requirements (TO BE UPDATED)
- **Headline:** "2,047 dishes have started their stories with Savor"
- **Subtext:** "Tonight's dinner could be your first chapter. What will you remember forever?"
- **CTA Button:** "Start with tonight's meal"

### Visual Elements
- Calendar showing "Today" highlighted
- Counter showing growing number of saved dishes
- Tonight/today emphasis in design
- Progress dots: 7 active, 1 inactive

### Technical Notes
- Counter should show live/growing numbers
- Calendar should emphasize "today/tonight"
- Create sense of community and urgency
- Forward-looking, optimistic tone

---

## Screen 7: Permission to Begin
**File:** `screen-7-conclusion.html` (needs content update)

### Purpose
Remove perfectionism barriers - permission to start imperfectly.

### Content Requirements (TO BE UPDATED)
- **Headline:** "One last thing... Start messy"
- **Subtext:** "Even my first Savor was a mediocre airport sandwich 😅 Every food story starts somewhere."
- **CTA Button:** "Begin my food story"

### Visual Elements
- Alex's actual first saved dish (airport sandwich)
- Humble, imperfect food photo
- Encouraging, permission-giving design
- Progress dots: 8 active (complete)

### Technical Notes
- NO "Maybe Later" option - single CTA only
- Warm, encouraging design
- Remove any pressure for perfection
- Gateway to actual app experience

---

## Global Design System

### Colors
- **Primary:** #D4A574 (Warm Gold)
- **Secondary:** #2C3E50 (Deep Navy)
- **Background:** Dark gradients (#1a1a1a to #2d2d2d)
- **Text:** #fff (primary), #D4D4D4 (secondary), #B0B0B0 (tertiary)

### Typography
- **Headlines:** 22-28px, bold, tight line-height
- **Body:** 15-18px, regular, 1.4-1.6 line-height
- **CTA Buttons:** 18px, semibold

### Animations
- **Screen Transitions:** Smooth slide transitions
- **Element Animations:** Subtle fade-ins, pulses, gentle movements
- **Duration:** 0.3-0.8s for most animations
- **Easing:** ease-out preferred

### Button Specifications
- **Primary CTA:** Gold gradient background, black text, 25px border-radius
- **Hover States:** Slight lift (translateY(-2px)) with enhanced shadow
- **Disabled States:** 50% opacity, no interactions
- **Centering:** All CTAs must be perfectly centered

### Progress Indicators
- **8 dots total** for all screens
- **Active:** Gold (#D4A574)
- **Inactive:** Dark gray (#555)
- **Size:** 8px diameter, 12px spacing

### Mobile Considerations
- **Viewport:** Optimized for 375x812 (iPhone X/11/12/13 standard)
- **Touch Targets:** Minimum 44px touch targets
- **Spacing:** Adequate padding for readability
- **Performance:** Smooth 60fps animations

---

## Implementation Priority
1. **Core Flow:** Implement all 8 screens with proper transitions
2. **Animations:** Add subtle animations that enhance (don't distract)
3. **Polish:** Perfect spacing, typography, and micro-interactions
4. **Testing:** Verify on multiple device sizes and orientations

## Quality Checklist
- [ ] All CTAs are perfectly centered
- [ ] All screens fit properly on target devices
- [ ] Animations are smooth and purposeful
- [ ] Progress dots accurately reflect position
- [ ] Typography follows design system
- [ ] Color usage is consistent
- [ ] Touch targets meet accessibility standards
- [ ] Performance is smooth on target devices

---

**Questions?** Reference the interactive mockups in `/onboarding/mockups/index.html` for complete visual specifications.