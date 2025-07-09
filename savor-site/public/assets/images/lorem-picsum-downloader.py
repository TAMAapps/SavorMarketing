#!/usr/bin/env python3
"""
Simple Lorem Picsum Image Downloader for Savor App
Downloads food-related images from Lorem Picsum (free service, no API key needed)
"""

import os
import urllib.request
import time

def download_image(url, filepath):
    """Download image from URL"""
    try:
        urllib.request.urlretrieve(url, filepath)
        print(f"✓ Downloaded: {os.path.basename(filepath)}")
        return True
    except Exception as e:
        print(f"✗ Failed to download {os.path.basename(filepath)}: {e}")
        return False

def main():
    """Download curated food images from Lorem Picsum"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Food-related image seeds (these generate consistent, food-like images)
    images = [
        # Hero images - large landscape
        {
            "url": "https://picsum.photos/seed/food1/1920/1080",
            "filename": "hero-gourmet-dish.jpg",
            "folder": "hero",
            "description": "Gourmet dish hero background"
        },
        {
            "url": "https://picsum.photos/seed/dining2/1920/1080", 
            "filename": "hero-dining-experience.jpg",
            "folder": "hero",
            "description": "Fine dining experience"
        },
        # Feature images - medium square/landscape
        {
            "url": "https://picsum.photos/seed/cuisine3/800/600",
            "filename": "feature-ai-recognition.jpg", 
            "folder": "features",
            "description": "AI food recognition feature"
        },
        {
            "url": "https://picsum.photos/seed/kitchen4/800/600",
            "filename": "feature-smart-vault.jpg",
            "folder": "features", 
            "description": "Smart food memory vault"
        },
        {
            "url": "https://picsum.photos/seed/market5/800/600",
            "filename": "feature-discovery.jpg",
            "folder": "features",
            "description": "Food discovery engine"
        },
        # Background images - large, subtle
        {
            "url": "https://picsum.photos/seed/texture6/1920/1080",
            "filename": "bg-food-texture.jpg",
            "folder": "backgrounds",
            "description": "Food texture background"
        },
        {
            "url": "https://picsum.photos/seed/restaurant7/1920/1080",
            "filename": "bg-restaurant-ambiance.jpg", 
            "folder": "backgrounds",
            "description": "Restaurant ambiance background"
        },
        # Testimonial placeholder
        {
            "url": "https://picsum.photos/seed/people8/400/400",
            "filename": "testimonial-placeholder.jpg",
            "folder": "testimonials", 
            "description": "User testimonial placeholder"
        }
    ]
    
    print("🖼️  Savor App - Lorem Picsum Image Downloader")
    print("=" * 50)
    print(f"Downloading {len(images)} food-related images...")
    
    success_count = 0
    
    for image in images:
        folder_path = os.path.join(script_dir, image['folder'])
        os.makedirs(folder_path, exist_ok=True)
        
        filepath = os.path.join(folder_path, image['filename'])
        
        # Skip if file already exists
        if os.path.exists(filepath):
            print(f"⏭ Skipping existing: {image['filename']}")
            continue
            
        print(f"📥 Downloading {image['description']}...")
        if download_image(image['url'], filepath):
            success_count += 1
        
        # Small delay to be respectful
        time.sleep(0.5)
    
    print(f"\n🎉 Download Complete!")
    print(f"✓ Successfully downloaded: {success_count} images")
    print(f"📁 Images organized in subfolders: hero/, features/, backgrounds/, testimonials/")
    
    # Create image manifest
    manifest_path = os.path.join(script_dir, "image-manifest.txt")
    with open(manifest_path, 'w') as f:
        f.write("# Savor App - Image Manifest\\n\\n")
        f.write("Images downloaded from Lorem Picsum (https://picsum.photos)\\n")
        f.write("License: Free to use, no attribution required\\n\\n")
        
        for image in images:
            f.write(f"File: {image['folder']}/{image['filename']}\\n")
            f.write(f"Source: {image['url']}\\n") 
            f.write(f"Description: {image['description']}\\n")
            f.write("---\\n\\n")
    
    print(f"📄 Image manifest saved to: image-manifest.txt")

if __name__ == "__main__":
    main()