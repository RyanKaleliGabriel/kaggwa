#!/bin/bash

# Image optimization script for web use
# This script optimizes JPG/PNG images larger than 500KB
# Excludes build artifacts (_site, _freeze, .quarto, .venv)

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
MIN_SIZE="500k"
JPEG_QUALITY=85
MAX_DIMENSION=2048
BACKUP_DIR=".image_backups_$(date +%Y%m%d_%H%M%S)"

# Counters
total_original_size=0
total_optimized_size=0
file_count=0

echo -e "${BLUE}=== Image Optimization for Web Use ===${NC}"
echo ""
echo "Configuration:"
echo "  - JPEG Quality: ${JPEG_QUALITY}"
echo "  - Maximum dimension: ${MAX_DIMENSION}px"
echo "  - PNG Compression: pngquant (65-85), fallback to magick"
echo "  - Minimum file size: ${MIN_SIZE}"
echo "  - Backup directory: ${BACKUP_DIR}"
echo ""

# Create backup directory
mkdir -p "$BACKUP_DIR"
echo -e "${GREEN}✓ Created backup directory: ${BACKUP_DIR}${NC}"
echo ""

# Find all images > 500KB (excluding build artifacts)
echo -e "${BLUE}Finding images to optimize...${NC}"
images=()
while IFS= read -r -d '' img; do
    images+=("$img")
done < <(find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) \
    ! -path "*/_site/*" \
    ! -path "*/_freeze/*" \
    ! -path "*/.quarto/*" \
    ! -path "*/.venv/*" \
    -size +${MIN_SIZE} -print0)

total_images=${#images[@]}
echo -e "${YELLOW}Found ${total_images} images to optimize${NC}"
echo ""

# Process each image
for img in "${images[@]}"; do
    ((file_count++))
    
    # Get original size
    original_size=$(stat -f%z "$img")
    original_size_mb=$(echo "scale=2; $original_size / 1048576" | bc)
    
    # Get file extension
    ext="${img##*.}"
    ext_lower=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
    
    # Create backup
    backup_path="${BACKUP_DIR}${img}"
    mkdir -p "$(dirname "$backup_path")"
    cp "$img" "$backup_path"
    
    echo -e "${BLUE}[${file_count}/${total_images}]${NC} Optimizing: ${img}"
    echo "  Original size: ${original_size_mb} MB"
    
    # Optimize based on file type
    if [[ "$ext_lower" == "jpg" || "$ext_lower" == "jpeg" ]]; then
        # Optimize JPEG: auto-orient, resize if needed, then compress
        magick "$img" -auto-orient -resize "${MAX_DIMENSION}x${MAX_DIMENSION}>" -strip -quality ${JPEG_QUALITY} -interlace Plane "$img.tmp"
        mv "$img.tmp" "$img"
    elif [[ "$ext_lower" == "png" ]]; then
        # Resize PNG if needed, then lossy-compress with pngquant when available
        magick "$img" -auto-orient -resize "${MAX_DIMENSION}x${MAX_DIMENSION}>" -strip "$img.tmp"
        mv "$img.tmp" "$img"
        if command -v pngquant >/dev/null 2>&1; then
            pngquant --quality=65-85 --speed 1 --force --output "$img" "$img" 2>/dev/null || true
        else
            # Fallback to ImageMagick PNG compression
            magick "$img" -strip -define png:compression-level=9 "$img.tmp" && mv "$img.tmp" "$img"
        fi
    fi
    
    # Get new size and calculate savings
    new_size=$(stat -f%z "$img")
    new_size_mb=$(echo "scale=2; $new_size / 1048576" | bc)
    savings=$(echo "scale=2; ($original_size - $new_size) / 1048576" | bc)
    percent=$(echo "scale=1; ($original_size - $new_size) * 100 / $original_size" | bc)
    
    # Update totals
    total_original_size=$((total_original_size + original_size))
    total_optimized_size=$((total_optimized_size + new_size))
    
    if (( $(echo "$savings > 0" | bc -l) )); then
        echo -e "  ${GREEN}New size: ${new_size_mb} MB (saved ${savings} MB, -${percent}%)${NC}"
    else
        echo -e "  ${YELLOW}New size: ${new_size_mb} MB (no reduction)${NC}"
    fi
    echo ""
done

# Calculate total savings
total_original_mb=$(echo "scale=2; $total_original_size / 1048576" | bc)
total_optimized_mb=$(echo "scale=2; $total_optimized_size / 1048576" | bc)
total_savings=$(echo "scale=2; ($total_original_size - $total_optimized_size) / 1048576" | bc)
total_percent=$(echo "scale=1; ($total_original_size - $total_optimized_size) * 100 / $total_original_size" | bc)

# Summary
echo -e "${BLUE}=== Optimization Complete ===${NC}"
echo ""
echo "Files processed: ${file_count}"
echo "Total original size: ${total_original_mb} MB"
echo "Total optimized size: ${total_optimized_mb} MB"
echo -e "${GREEN}Total savings: ${total_savings} MB (${total_percent}%)${NC}"
echo ""
echo -e "${YELLOW}Backups saved in: ${BACKUP_DIR}${NC}"
echo ""
echo "To restore originals if needed:"
echo "  cp -r ${BACKUP_DIR}/. ."
