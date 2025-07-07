# Savor Onboarding Design Principles & Checklist

## Mobile Screen Layout Requirements

### Fixed Structure (375x812px iPhone frame)
1. **Status Bar**: Fixed at top (44px height)
2. **Content Area**: Scrollable if needed
3. **Progress Dots**: Fixed at bottom (~20-30px from bottom)
4. **CTA Button**: Must be visible above progress dots

### Critical Elements That Must Always Be Visible
- [ ] Status bar (9:41, signal, battery)
- [ ] Main CTA button 
- [ ] Progress dots (6 dots total)
- [ ] Home indicator bar

### Spacing Guidelines
- **Top padding**: 60-70px (below status bar)
- **Bottom padding**: 100-120px (for button + dots + home indicator)
- **Side padding**: 20-30px
- **Element spacing**: 15-20px between major sections

### Common Mistakes to Avoid
1. ❌ Don't hide CTAs or progress dots off-screen
2. ❌ Don't use excessive margins that push content out
3. ❌ Don't forget to test all elements are visible
4. ❌ Don't remove navigation elements accidentally
5. ❌ Don't use fixed heights that cut off content

### Typography Hierarchy
- **Main headline**: 36-42px
- **Subheading**: 20-24px  
- **Body text**: 16-18px
- **Small text**: 14px

### Color Consistency
- **Background**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Primary CTA**: `linear-gradient(135deg, #D4A574 0%, #E8C547 100%)`
- **Text**: White with various opacities
- **Accent**: #D4A574 (gold)

### Testing Checklist Before Commit
- [ ] All 6 progress dots visible?
- [ ] CTA button fully visible and clickable?
- [ ] Text readable and properly spaced?
- [ ] No content cut off at bottom?
- [ ] Consistent background across all screens?
- [ ] Navigation works between screens?

### Screen-Specific Notes

#### Screen 1 (Alex Introduction)
- Avatar + greeting + subtitle
- "What I ate, where" context
- Comparison container
- Bottom tagline
- CTA: "I need this too"

#### Screen 2 (Problem Statement)  
- 92% statistic card
- Subheading question
- Memory visualization (3 cards)
- Two-line bottom text
- CTA: "Help me!"

#### Screen 3-6
- Follow same layout principles
- Maintain visual consistency
- Keep progress dots visible

## Before Every Change
1. Read this document
2. Check what elements must be visible
3. Test in browser/preview
4. Verify against checklist
5. Only then commit