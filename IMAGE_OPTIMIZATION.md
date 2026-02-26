# Image Optimization Guide

## Overview

This site contains **148 images larger than 500KB**, with several over 10MB. Large images significantly impact:
- Page load times
- Bandwidth usage
- User experience (especially on mobile/slow connections)
- SEO rankings

## Quick Start

Run the optimization script:

```bash
./optimize_images.sh
```

This will:
1. ✅ **Backup all original images** to a timestamped directory (`.image_backups_*`)
2. ✅ **Optimize JPEGs** at 85% quality (excellent balance of quality/size)
3. ✅ **Compress PNGs** using maximum compression
4. ✅ **Report savings** for each file and in total
5. ✅ **Skip build artifacts** (_site, _freeze, .quarto, .venv)

## What Gets Optimized

The script targets images over 500KB in these directories:
- `assets/` - Site-wide assets
- `content/` - All content images
- `dashboards/` - Dashboard images

### Largest Files Found

Top files that will see the biggest improvements:

| File | Size | Location |
|------|------|----------|
| `thumbnail.png` | 14 MB | `content/restoration-stories/posts/15-03-2025/assets/` |
| `Floods_ID3.png` | 14 MB | `content/state_of_land/reports/Flood_Story/Assets/` |
| `Floods_ID2.jpg` | 12 MB | `content/state_of_land/reports/Flood_Story/Assets/` |
| `map_shannon.png` | 9.6 MB | `content/restoration-stories/posts/20-03-2025/assets/` |
| `shannon_map_sans_lab.png` | 9.5 MB | `content/restoration-stories/posts/20-03-2025/assets/` |
| `GGW_flood.png` | 8.8 MB | `content/state_of_land/reports/Flood_Story/Assets/` |

Plus 142 more images between 500KB and 6.6MB.

## Expected Results

Typical savings:
- **JPEGs**: 40-70% size reduction with minimal quality loss
- **PNGs**: 20-50% size reduction (varies by content)
- **Total estimated savings**: ~200-400 MB

## Safety Features

### Automatic Backups
All originals are saved before optimization:
```bash
# Backups location (timestamped)
.image_backups_20251121_080000/
```

### Restore Originals
If you need to restore the original images:
```bash
cp -r .image_backups_YYYYMMDD_HHMMSS/. .
```

## Customization

Edit `optimize_images.sh` to adjust settings:

```bash
# Change JPEG quality (1-100, default: 85)
JPEG_QUALITY=85       # 85 = excellent quality, good compression
                      # 75 = good quality, better compression
                      # 90 = higher quality, less compression

# Change minimum file size to optimize
MIN_SIZE="500k"       # Only process files > 500KB
                      # Use "1M" for files > 1MB
                      # Use "100k" for files > 100KB

# PNG compression level (1-9, default: 9)
PNG_COMPRESSION_LEVEL=9  # 9 = maximum compression
```

## Manual Optimization (Alternative)

If you prefer to optimize specific files manually:

### Using ImageMagick (magick)
```bash
# Optimize JPEG
magick input.jpg -strip -quality 85 -interlace Plane output.jpg

# Optimize PNG
magick input.png -strip -define png:compression-level=9 output.png
```

### Using macOS sips
```bash
# Optimize JPEG
sips -s format jpeg -s formatOptions 85 input.jpg --out output.jpg

# Resize large image (e.g., to 1920px width)
sips -Z 1920 input.jpg --out output.jpg
```

## After Optimization

1. **Test your site** to ensure images display correctly
2. **Rebuild your Quarto site** if needed
3. **Compare page load times** (you should see significant improvements)
4. **Delete backup directory** once you're satisfied

## Notes

- The script preserves image dimensions (only optimizes compression)
- Consider resizing extremely large images if they don't need to be that big
- For photos, JPEG at 85% quality is visually identical to originals for web use
- PNGs with transparency must stay as PNG (can't convert to JPEG)

## Questions?

- Check script output for detailed per-file statistics
- Review backups before deleting them
- Consider adding image optimization to your build pipeline
