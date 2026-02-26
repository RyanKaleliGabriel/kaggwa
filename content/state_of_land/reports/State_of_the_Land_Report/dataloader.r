suppressPackageStartupMessages({
  library(readr)
  library(dplyr)
})

# ------ STAC links -------
# -------------------------
# Climate 
prcp_avg_cog_url           <- "https://stacapi100.thegrit.earth/eodata/cogeo/precipitation/GGW_gpm_avg_01_24.tif"
prcp_yearly_cog_url        <- "https://stacapi100.thegrit.earth/eodata/cogeo/ggw_cog/GGW_gpm_yearly_01_24_cog.tif"
prcp_yearly_trend_cog_url  <- "https://stacapi100.thegrit.earth/eodata/cogeo/ggw_cog/GWW_gpm_yearly_trend_01_24_cog.tif"
pci_cog_url                <- "https://stacapi100.thegrit.earth/eodata/cogeo/ggw_cog/GWW_gpm_yearly_trend_01_24_cog.tif"
temp_cog_url               <- "https://stacapi100.thegrit.earth/eodata/cogeo/ggw_cog/GWW_gpm_yearly_trend_01_24_cog.tif" # UPDATE WITH ACTUAL TEMP COG WHEN AVAILABLE
temp_tr_cog_url            <- "https://stacapi100.thegrit.earth/eodata/cogeo/ggw/GGW_LST_TrendSlope_10km_2001_2024.tif" # UPDATE WITH ACTUAL TEMP COG WHEN AVAILABLE
drought_cog_url            <- "https://stacapi100.thegrit.earth/eodata/cogeo/ggw/GGW_spi3_monthly_01_24_9km_masked.tif"
flood_cog_url              <- "https://stacapi100.thegrit.earth/eodata/cogeo/flood_analysis_ggw/GGW_mosaic.tif"

# Land cover
crop_cog_url               <- "https://stacapi100.thegrit.earth/eodata/cogeo/ggw_colcog/GGW_Cropland_colCOG.tiff"
fire_trend_cog_url         <- "https://stacapi100.thegrit.earth/eodata/cogeo/ggw_cog/GGW_Fire_Frequency_Trend_2003_2022.tif"
tree_cog_url               <- "https://stacapi100.thegrit.earth/eodata/cogeo/ggw/Forest_Cover_2023_GGW_500m.tif"

# Soil health
soc_cog_url                <- "https://stacapi100.thegrit.earth/eodata/cogeo/ggw_cog/Soil_Organic_Carbon_2023_GGW_500m_COG.tiff"
sm_cog_url                 <- "https://stacapi100.thegrit.earth/eodata/cogeo/ggw/Soil_Organic_Carbon_2023_GGW_500m_COG.tif"

# Land degradation
evi_trend_cog_url          <- "https://stacapi100.thegrit.earth/eodata/cogeo/ggw/GGW_EVI_Trend_2001-2024_masked.tiff"
erosion_cog_url            <- "https://stacapi100.thegrit.earth/eodata/cogeo/ggw/Soil_Erosion_GGW_2023_500m.tif"

init_ggw("assets/maps/data/ggw_adm0.geojson")
init_ecoregions("assets/maps/data/ecoregions_ggw.geojson")

# ------ Custom colormaps + legends ------
# ----------------------------------------
if (!exists("layer_presets")) layer_presets <- list()

# ------ Climate -------
# Annual precip 
prcp_breaks <- c(0, 500, 1000, 1500, 2000)
prcp_cols   <- c("#edf8fb","#b3cde3","#8c96c6","#8856a7","#810f7c")
prcp_cm     <- make_titiler_cmap(prcp_breaks, prcp_cols, mode = "grad")

# Precip trend
pr_tr_breaks <- c(-30, -15, 0, 15, 30)
pr_tr_cols   <- c("#ca0020", "#f4a582", "#f7f7f7", "#92c5de", "#0571b0")
pr_tr_cm     <- make_titiler_cmap(pr_tr_breaks, pr_tr_cols, mode = "grad")

# Rainy-days trend
rd_tr_breaks <- c(-0.8, -0.4, -0.2, 0, 0.2, 0.4, 0.7)
rd_tr_cols   <- c("#b01611","#f6a283","#fbe6d4","#f7f7f7","#d2e3f3","#6aaed6","#2166ac")
rd_tr_cm     <- make_titiler_cmap(rd_tr_breaks, rd_tr_cols, mode = "grad")

# Temp annual
temp_breaks <- c(-30, -15, 0, 15, 30)
temp_cols   <- c("#ca0020", "#f4a582", "#f7f7f7", "#92c5de", "#0571b0")
temp_cm     <- make_titiler_cmap(temp_breaks, temp_cols, mode = "grad")

# Temp trend
temp_tr_breaks <- c(-0.70, -0.35, 0.0, 0.35, 0.70)
temp_tr_cols   <- c("#0571b0", "#92c5de", "#f7f7f7","#f4a582","#ca0020")
temp_tr_cm     <- make_titiler_cmap(temp_tr_breaks, temp_tr_cols, mode = "grad")

# Drought (SPI-3)
spi_breaks <- c(-2.5, -1.5, -0.5, 0, 0.5, 1.5, 2.5)
spi_cols   <- c("#8c510a", "#d8b365", "#f6e8c3", "#c7eae5", "#5ab4ac", "#01665e")
spi_cm <- make_titiler_cmap(spi_breaks, spi_cols, mode = "step")
spi_labels <- c("≤ -1.5","-1.5 to -0.5","-0.5 to 0","0 to 0.5","0.5 to 1.5","≥ 1.5")

# Flood risk 
flood_breaks <- c(0.5, 1.5, 2.5, 3.5, 4.5, 5.5) 
flood_cols   <- c("#f7f9ff48","#deebf7","#94a8d3ff","#4b59baff","#9d294cff")
flood_labels <- c("Very low","Low","Moderate","High","Very high")
flood_cm <- make_titiler_cmap(flood_breaks, flood_cols, mode = "step")

# ------ Land cover -------
# Tree cover (%) 
tc_breaks <- c(0, 35, 70, 100)
tc_cols   <- c("#ffe599", "#617e14", "#2b5a34", "#00404d")
tc_cm     <- make_titiler_cmap(tc_breaks, tc_cols, mode = "grad")

# Cropland
crop_breaks <- c(0, 20, 40, 60, 80, 100)
crop_cols   <- c("#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02")
crop_cm     <- make_titiler_cmap(crop_breaks, crop_cols, mode = "grad")

# Fire occurrence
fire_breaks <- c(-100, -50, -20, 0, 20, 50, 100)
fire_cols   <- c("#313695","#74add1","#abd9e9","#f7f7f7","#fdae61","#f46d43","#a50026")
fire_cm     <- make_titiler_cmap(fire_breaks, fire_cols, mode = "grad")

# ------- Soil health -------
# SOC
soc_breaks <- c(0, 250, 1200, 2150, 3100, 4050, 10000)
soc_cols   <- c("#ffff00","#ffff00","#edae5b","#bb6045","#6d352b","#442816","#1a1a01")
soc_cm     <- make_titiler_cmap(soc_breaks, soc_cols, mode = "grad")

# SM
sm_breaks <- c(0, 250, 1200, 2150, 3100, 4050, 10000)
sm_cols   <- c("#ffff00", "#ffff00", "#edae5b", "#bb6045", "#6d352b", "#442816", "#1a1a01")
sm_cm     <- make_titiler_cmap(sm_breaks, sm_cols, mode = "grad")

# ------- Land degradation -------
# EVI
evi_breaks <- c(-50, -25, 0, 25, 50)
evi_cols   <- c("#d7191c", "#fdae61", "#ffffc0", "#a6d96a", "#1a9641")
evi_cm     <- make_titiler_cmap(evi_breaks, evi_cols, mode = "grad")

# Erosion prevalence (%)
erosion_breaks <- c(0, 25, 50, 75, 100)  # % erosion
erosion_cols   <- c("#9eb0ff", "#286887", "#7b321c", "#ffadad", "#ffff4e")
erosion_cm     <- make_titiler_cmap(erosion_breaks, erosion_cols, mode = "grad")



# ------- Presets -------
# -----------------------

# Climate
layer_presets$precip <- list(
  name           = "Annual precipitation",
  stac           = prcp_avg_cog_url,
  bidx           = 1,
  resampling     = "bilinear",
  opacity        = 0.95,
  colormap       = prcp_cm$encoded,
  rescale        = NULL,
  legend_type    = "grad",
  legend_breaks  = prcp_breaks,
  legend_colors  = prcp_cols
)

layer_presets$precip_trend <- list(
  name           = "Precip trend",
  stac           = prcp_yearly_trend_cog_url,
  bidx           = 1,
  resampling     = "bilinear",
  opacity        = 0.95,
  colormap       = pr_tr_cm$encoded,
  rescale        = NULL,
  legend_colors  = pr_tr_cm$legend_colors,
  legend_labels  = pr_tr_cm$legend_labels
)

layer_presets$temp <- list(
  name           = "Annual temperature",
  stac           = temp_cog_url,
  bidx           = 1,
  resampling     = "bilinear",
  opacity        = 0.95,
  colormap       = temp_cm$encoded,
  rescale        = NULL,
  legend_colors  = temp_cm$legend_colors,
  legend_labels  = temp_cm$legend_labels
)

layer_presets$temp_trend <- list(
  name           = "Temp trend",
  stac           = temp_tr_cog_url,
  bidx           = 1,
  resampling     = "bilinear",
  opacity        = 0.95,
  colormap       = temp_tr_cm$encoded,
  rescale        = NULL,
  legend_colors  = temp_tr_cm$legend_colors,
  legend_labels  = temp_tr_cm$legend_labels
)

layer_presets$drought <- list(
  name           = "SPI-3 (monthly)",
  stac           = drought_cog_url,
  bidx           = 1,
  resampling     = "bilinear",
  opacity        = 0.95,
  colormap       = spi_cm$encoded,  
  rescale        = NULL,
  legend_colors  = spi_cm$legend_colors,
  legend_labels  = spi_labels   
)

layer_presets$flood <- list(
  name          = "Flood risk",
  stac          = flood_cog_url,
  bidx          = 1,
  resampling    = "nearest", 
  opacity       = 1,
  colormap      = flood_cm$encoded,
  rescale       = "1,5",
  nodata        = 255,
  legend_colors = flood_cols,
  legend_labels = flood_labels
)

# Land cover
layer_presets$tc <- list(
  name           = "Forest cover",
  stac           = tree_cog_url,
  bidx           = 1,
  resampling     = "nearest",
  opacity        = 1,
  colormap       = tc_cm$encoded,
  rescale        = NULL,
  legend_type    = "grad",
  legend_breaks  = tc_breaks,
  legend_colors  = tc_cols,
  legend_units   = "%"
)

layer_presets$crop <- list(
  name           = "Cropland",
  stac           = crop_cog_url,
  bidx           = 1,
  resampling     = "nearest",
  opacity        = 1,
  colormap       = crop_cm$encoded,
  rescale        = NULL,
  legend_type    = "grad",
  legend_breaks  = crop_breaks,
  legend_colors  = crop_cols,
  legend_units   = "%"
)

layer_presets$fire <- list(
  name           = "Fire frequency trend (2003 - 2022)",
  stac           = fire_trend_cog_url,
  bidx           = 1,
  resampling     = "bilinear",
  opacity        = 0.95,
  colormap       = fire_cm$encoded,
  rescale        = NULL,
  nodata         = -9999,
  legend_type    = "grad",
  legend_breaks  = c(-0.1, 0.1),
  legend_colors  = fire_cols
)

# Soil health
layer_presets$soc <- list(
  name           = "Soil Organic Carbon",
  stac           = soc_cog_url,
  bidx           = 1,
  resampling     = "nearest",
  opacity        = 1,
  colormap       = soc_cm$encoded,
  rescale        = NULL,
  nodata         = -2147483648,
  legend_type    = "grad",
  legend_breaks  = soc_breaks / 100,
  legend_colors  = soc_cols,
  legend_units   = "g/kg"
)

# Land degradation
layer_presets$evi <- list(
  name           = "EVI trend",
  stac           = evi_trend_cog_url,
  bidx           = 1,
  resampling     = "nearest",
  nodata         = -32768,
  opacity        = 1,
  colormap       = evi_cm$encoded,
  rescale        = NULL,
  legend_colors  = evi_cm$legend_colors,
  legend_labels  = evi_cm$legend_labels
)

layer_presets$eros <- list(
  name           = "Soil Erosion",
  stac           = erosion_cog_url,
  bidx           = 1,
  resampling     = "nearest",
  opacity        = 1,
  colormap       = erosion_cm$encoded,
  rescale        = NULL,
  nodata         = -2147483648,
  legend_type    = "grad",
  legend_breaks  = erosion_breaks,
  legend_colors  = erosion_cols,
  legend_units   = "%"
)


# Data loaders for precip chart

load_gpm_long <- function(path = "assets/maps/data/gpm_countries_long.csv") {
  readr::read_csv(path, show_col_types = FALSE) |>
    dplyr::transmute(
      country  = NAME_0,
      year     = as.character(year),
      rainfall = as.numeric(rainfall)
    )
}
