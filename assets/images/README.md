# Savor App - Image Assets

This directory contains curated images for the Savor food memory app, downloaded from Unsplash with proper attribution.

## 📁 Folder Structure

```
/assets/images/
├── hero/           # Hero section images (1920px wide)
├── features/       # Feature showcase images (800px wide)  
├── testimonials/   # User avatar/testimonial images (400px wide)
├── backgrounds/    # Section background images (1920px wide)
├── curated-images.json    # Curated image URLs and metadata
├── download-images.py     # Download script
├── attribution.txt        # Image credits and licensing
└── README.md             # This file
```

## 🚀 Quick Start

### 1. Install Requirements
```bash
pip install requests
```

### 2. Download Images
```bash
cd assets/images
python download-images.py
```

### 3. Verify Downloads
The script will:
- Download all images to appropriate subfolders
- Create `attribution.txt` with proper credits
- Show success/failure statistics
- Skip existing files on re-runs

## 📋 Image Categories

### Hero Images (3 images)
- **hero-gourmet-plating.jpg** - Elegant dish with artistic plating
- **hero-dining-experience.jpg** - Fine dining restaurant atmosphere
- **hero-food-memories.jpg** - Hands capturing food with phone

### Feature Images (4 images)  
- **ai-recognition-sushi.jpg** - Beautiful sushi for AI recognition
- **smart-vault-spices.jpg** - Organized spices for smart organization
- **discovery-market.jpg** - Vibrant food market for discovery
- **global-cuisine-pasta.jpg** - Fresh pasta for global cuisine

### Testimonial Images (4 images)
- **chef-professional.jpg** - Professional chef portrait
- **food-critic-tasting.jpg** - Person thoughtfully tasting
- **food-enthusiast.jpg** - Happy food enthusiast
- **restaurant-owner.jpg** - Restaurant owner portrait

### Background Images (4 images)
- **warm-restaurant-ambiance.jpg** - Restaurant interior
- **cooking-action-blur.jpg** - Blurred cooking action
- **ingredients-texture.jpg** - Natural ingredients texture
- **food-preparation-overhead.jpg** - Overhead preparation scene

## 📄 Licensing & Attribution

All images are used under the **Unsplash License**:
- ✅ Free to use for commercial and personal projects
- ✅ No attribution required (but we provide it anyway)
- ✅ Can be modified and distributed
- ❌ Cannot be sold as-is or used to compete with Unsplash

Full attribution details are in `attribution.txt` after running the download script.

## 🔧 Customization

### Adding New Images
1. Add new entries to `curated-images.json`:
```json
{
  "id": "new-image-01",
  "filename": "descriptive-name.jpg",
  "url": "https://images.unsplash.com/photo-XXXXXXXXX?w=800&q=80",
  "photographer": "Photographer Name",
  "unsplash_url": "https://unsplash.com/@username",
  "description": "Image description for context"
}
```

2. Run the download script to fetch new images

### Image Specifications
- **Hero**: 1920px wide, landscape orientation
- **Features**: 800px wide, square or landscape  
- **Testimonials**: 400px wide, portrait orientation preferred
- **Backgrounds**: 1920px wide, subtle/blurred recommended

## ⚠️ Important Notes

### Unsplash Terms of Service Compliance
- ✅ Manual curation (no automated API calls)
- ✅ Specific image selection (no bulk downloading)
- ✅ Proper attribution provided
- ✅ Respectful download intervals (1 second delay)
- ✅ Educational/commercial use within license terms

### Best Practices
- Always check `attribution.txt` for photographer credits
- Update attribution when adding new images
- Respect Unsplash photographer guidelines
- Consider reaching out to photographers for larger projects

## 🔄 Maintenance

### Re-downloading Images
The script is safe to re-run:
- Skips existing files
- Only downloads missing images  
- Updates attribution file
- Shows progress and statistics

### Updating Image Quality
To change image quality, modify URLs in `curated-images.json`:
- `?w=1920&q=80` (high quality, larger file)
- `?w=800&q=60` (medium quality, smaller file)
- `?w=400&q=40` (low quality, smallest file)

---

*This image system complies with Unsplash Terms of Service through manual curation and proper attribution practices.*