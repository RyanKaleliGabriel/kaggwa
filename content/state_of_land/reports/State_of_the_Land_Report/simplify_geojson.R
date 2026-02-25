#!/usr/bin/env Rscript
# Simplify large GeoJSON files to reduce size and improve performance

library(sf)
library(rmapshaper)

# Function to simplify and save
simplify_geo <- function(input_path, output_path, keep = 0.05) {
  cat("Processing:", input_path, "\n")
  
  # Read
  data <- st_read(input_path, quiet = TRUE)
  original_size <- file.size(input_path) / 1024^2
  
  # Simplify geometry (keep 5% of points by default)
  simplified <- ms_simplify(data, keep = keep, keep_shapes = TRUE)
  
  # Write
  st_write(simplified, output_path, delete_dsn = TRUE, quiet = TRUE)
  new_size <- file.size(output_path) / 1024^2
  
  cat(sprintf("  Original: %.1f MB → Simplified: %.1f MB (%.1f%% reduction)\n", 
              original_size, new_size, (1 - new_size/original_size) * 100))
}

# Simplify the largest files
simplify_geo(
  "assets/maps/data/ggw_adm1.geojson",
  "assets/maps/data/ggw_adm1_simple.geojson",
  keep = 0.03  # Keep 3% for detailed admin boundaries
)

simplify_geo(
  "assets/maps/data/ecoregions_ggw.geojson",
  "assets/maps/data/ecoregions_ggw_simple.geojson",
  keep = 0.05
)

simplify_geo(
  "assets/maps/data/gpm_countries.geojson",
  "assets/maps/data/gpm_countries_simple.geojson",
  keep = 0.05
)

simplify_geo(
  "assets/maps/data/ggw_gadm_NAME_0.geojson",
  "assets/maps/data/ggw_gadm_NAME_0_simple.geojson",
  keep = 0.05
)

cat("\nDone! Update your code to use *_simple.geojson files\n")
