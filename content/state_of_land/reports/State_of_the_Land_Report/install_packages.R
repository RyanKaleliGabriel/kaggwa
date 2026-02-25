# Install and load required R packages for State of the Land Report
# This script checks for missing packages and installs them before loading

required_packages <- c(
  "sf",
  "leaflet",
  "dplyr",
  "lwgeom",
  "scales",
  "jsonlite",
  "RColorBrewer",
  "ggplot2",
  "plotly",
  "forcats",
  "htmlwidgets",
  "htmltools",
  "tibble",
  "glue",
  "leaflet.extras2"
)

# Function to check and install packages
install_if_missing <- function(packages) {
  new_packages <- packages[!(packages %in% installed.packages()[, "Package"])]
  
  if (length(new_packages) > 0) {
    cat("Installing missing packages:", paste(new_packages, collapse = ", "), "\n")
    install.packages(new_packages, dependencies = TRUE)
  } else {
    cat("All required packages are already installed.\n")
  }
}

# Install missing packages
install_if_missing(required_packages)

# Load all packages
cat("\nLoading packages...\n")
suppressPackageStartupMessages({
  lapply(required_packages, library, character.only = TRUE)
})

cat("\nAll packages loaded successfully!\n")
cat("Required packages:\n")
cat(paste("-", required_packages, collapse = "\n"), "\n")
