#!/usr/bin/env python3
"""
Savor App - Manual Image Downloader
Downloads curated Unsplash images with proper attribution
"""

import json
import os
import requests
import time
from urllib.parse import urlparse

def download_image(url, filepath, max_retries=3):
    """Download image from URL with retry logic"""
    for attempt in range(max_retries):
        try:
            response = requests.get(url, stream=True, timeout=30)
            response.raise_for_status()
            
            with open(filepath, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            
            print(f"✓ Downloaded: {os.path.basename(filepath)}")
            return True
            
        except Exception as e:
            print(f"✗ Attempt {attempt + 1} failed for {os.path.basename(filepath)}: {e}")
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)  # Exponential backoff
    
    return False

def create_attribution_entry(image_data):
    """Create attribution text for an image"""
    return f"""
Photo: {image_data['filename']}
Photographer: {image_data['photographer']}
Unsplash Profile: {image_data['unsplash_url']}
Description: {image_data['description']}
License: Unsplash License (https://unsplash.com/license)
---"""

def main():
    """Main download function"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    json_file = os.path.join(script_dir, 'curated-images.json')
    
    # Load curated images data
    try:
        with open(json_file, 'r') as f:
            images_data = json.load(f)
    except FileNotFoundError:
        print(f"✗ Error: {json_file} not found!")
        return
    except json.JSONDecodeError:
        print(f"✗ Error: Invalid JSON in {json_file}")
        return
    
    # Prepare attribution content
    attribution_content = """# Savor App - Image Attribution

All images are used under the Unsplash License (https://unsplash.com/license)
Downloaded from Unsplash.com with proper attribution to photographers.

## Image Credits:
"""
    
    download_stats = {'success': 0, 'failed': 0}
    
    # Process each category
    for category, images in images_data.items():
        print(f"\n📁 Processing {category} images...")
        category_dir = os.path.join(script_dir, category)
        
        # Ensure category directory exists
        os.makedirs(category_dir, exist_ok=True)
        
        for image_data in images:
            filename = image_data['filename']
            url = image_data['url']
            filepath = os.path.join(category_dir, filename)
            
            # Skip if file already exists
            if os.path.exists(filepath):
                print(f"⏭ Skipping existing: {filename}")
                continue
            
            # Download image
            if download_image(url, filepath):
                download_stats['success'] += 1
            else:
                download_stats['failed'] += 1
            
            # Add to attribution
            attribution_content += create_attribution_entry(image_data)
            
            # Be respectful - small delay between downloads
            time.sleep(1)
    
    # Save attribution file
    attribution_file = os.path.join(script_dir, 'attribution.txt')
    with open(attribution_file, 'w') as f:
        f.write(attribution_content)
    
    # Final summary
    print(f"\n🎉 Download Complete!")
    print(f"✓ Successfully downloaded: {download_stats['success']} images")
    print(f"✗ Failed downloads: {download_stats['failed']} images")
    print(f"📄 Attribution saved to: attribution.txt")
    
    if download_stats['failed'] > 0:
        print("\n⚠️  Some downloads failed. You can re-run this script to retry failed downloads.")

if __name__ == "__main__":
    # Check if requests library is available
    try:
        import requests
    except ImportError:
        print("✗ Error: 'requests' library not installed.")
        print("Install with: pip install requests")
        exit(1)
    
    print("🖼️  Savor App - Manual Image Downloader")
    print("=" * 50)
    main()