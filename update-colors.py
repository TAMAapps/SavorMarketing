#!/usr/bin/env python3
"""
Update landing-v2.html from old amber/gold color scheme to new navy primary + orange CTA scheme
"""

import re

def update_colors():
    file_path = 'landing-v2.html'
    
    # Read the file
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Color mapping - order matters for specificity
    color_replacements = [
        # CTA buttons - specific patterns first
        ('bg-gradient-to-r from-amber-600 to-orange-500', 'bg-gradient-to-r from-savor-cta to-savor-cta-light'),
        ('bg-gradient-to-br from-amber-600 via-orange-500 to-amber-600', 'bg-gradient-to-br from-savor-cta via-savor-cta-light to-savor-cta'),
        
        # Primary brand elements (logo, main buttons)
        ('bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600', 'bg-gradient-to-r from-savor-primary via-savor-primary-light to-savor-primary'),
        ('bg-gradient-to-r from-amber-500 to-orange-500', 'bg-gradient-to-r from-savor-primary to-savor-primary-light'),
        ('bg-amber-600', 'bg-savor-primary'),
        ('bg-amber-500', 'bg-savor-primary'),
        
        # Background gradients
        ('bg-gradient-to-br from-amber-50 via-white to-amber-50', 'bg-gradient-to-br from-slate-50 via-white to-slate-50'),
        ('bg-gradient-to-br from-slate-50 via-white to-amber-50', 'bg-gradient-to-br from-slate-50 via-white to-slate-100'),
        ('bg-gradient-to-r from-slate-50 via-amber-50 to-slate-50', 'bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50'),
        ('bg-gradient-to-br from-amber-50 to-orange-50', 'bg-gradient-to-br from-slate-50 to-slate-100'),
        ('bg-gradient-to-r from-amber-100 to-orange-100', 'bg-gradient-to-r from-slate-100 to-slate-200'),
        ('bg-gradient-to-br from-amber-100 to-orange-100', 'bg-gradient-to-br from-slate-100 to-slate-200'),
        ('bg-gradient-to-r from-amber-200 to-yellow-200', 'bg-gradient-to-r from-slate-200 to-slate-300'),
        
        # Specific background colors
        ('bg-amber-100', 'bg-slate-100'),
        ('bg-amber-300', 'bg-savor-secondary-light'),
        ('bg-orange-300', 'bg-savor-secondary'),
        ('bg-amber-400', 'bg-savor-secondary'),
        
        # Text colors
        ('text-amber-800', 'text-savor-primary'),
        ('text-amber-600', 'text-savor-primary'),
        ('text-amber-500', 'text-savor-cta'),
        ('text-amber-400', 'text-yellow-400'),  # Keep star ratings as yellow
        
        # Hover states
        ('hover:text-amber-600', 'hover:text-savor-primary'),
        ('hover:text-amber-400', 'hover:text-savor-primary'),
        ('hover:bg-amber-600', 'hover:bg-savor-primary'),
        ('hover:bg-amber-50', 'hover:bg-slate-50'),
        ('group-hover:text-orange-500', 'group-hover:text-savor-cta'),
        
        # Borders and rings
        ('border-amber-600', 'border-savor-primary'),
        ('ring-amber-200', 'ring-slate-300'),
        ('ring-amber-100', 'ring-slate-200'),
        ('hover:ring-amber-200', 'hover:ring-slate-300'),
        ('border-amber-600/20', 'border-savor-primary/20'),
        ('focus:border-amber-500', 'focus:border-savor-primary'),
        ('focus:ring-amber-500/20', 'focus:ring-savor-primary/20'),
        
        # Gradient backgrounds with opacity
        ('from-amber-600/10 to-orange-500/10', 'from-savor-primary/10 to-savor-primary-light/10'),
        
        # Background gradients for floating elements
        ('bg-gradient-to-r from-amber-400 to-orange-400', 'bg-gradient-to-r from-savor-secondary-light to-savor-secondary'),
        ('bg-gradient-to-r from-orange-400 to-pink-400', 'bg-gradient-to-r from-savor-secondary to-savor-secondary-light'),
        ('bg-gradient-to-r from-yellow-400 to-amber-400', 'bg-gradient-to-r from-savor-secondary-light to-savor-secondary'),
    ]
    
    # Apply replacements
    for old_color, new_color in color_replacements:
        content = content.replace(old_color, new_color)
        print(f"✓ Replaced: {old_color} → {new_color}")
    
    # Write the updated content back
    with open(file_path, 'w') as f:
        f.write(content)
    
    print(f"\n🎉 Successfully updated {file_path} with new color scheme!")
    print("New color scheme:")
    print("- Primary: Navy (#2C3E50)")  
    print("- CTAs: Orange (#FF6B35)")
    print("- Secondary: Warm grays")
    print("- Star ratings: Yellow (unchanged)")

if __name__ == "__main__":
    print("🎨 Updating Savor landing page color scheme...")
    print("=" * 50)
    update_colors()