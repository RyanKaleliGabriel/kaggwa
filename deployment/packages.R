
required_packages <- c(
    'RColorBrewer',
    'glue',
    'stringr',
    'ggplot2',
    'htmlwidgets',
    'data.table',
    'scales',
    'readr',
    'dplyr',
    'jsonlite',
    'forcats',
    'tibble',
    'htmltools',
    'renv',
    'utils',
    'duckdb',
    'sf',
    'lwgeom',
    'plotly',
    'leaflet',
    'rmapshaper'
)

archived_packages <- c(
  "leaflet.extras_2.0.1.tar.gz"
)


install.packages(required_packages, repos="https://cran.rstudio.com")

for (pkg in archived_packages){
    install.packages(pkg, repos = NULL, type = "source")
}
