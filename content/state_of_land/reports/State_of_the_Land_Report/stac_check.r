library(jsonlite)

# Get general info about the COG (bands, dtype, nodata, bounds, etc.)
cog_info <- function(cog_url, titiler = "https://titiler.thegrit.earth") {
  u <- paste0(titiler, "/cog/info?url=", URLencode(cog_url, reserved = TRUE))
  fromJSON(u, simplifyVector = FALSE)
}

# Get statistics for one band (min/max, mean, percentiles, histogram, etc.)
cog_stats <- function(cog_url, titiler = "https://titiler.thegrit.earth",
                      bidx = 1, approx = TRUE) {
  u <- paste0(
    titiler, "/cog/statistics?url=", URLencode(cog_url, reserved = TRUE),
    "&bidx=", bidx,
    if (isTRUE(approx)) "&approx=True" else ""
  )
  fromJSON(u, simplifyVector = TRUE)
}

cog <- "https://stacapi100.thegrit.earth/eodata/cogeo/ggw/GGW_spi3_monthly_01_24_9km.tif"

# 1. general metadata
info <- cog_info(cog)
str(info, max.level = 1)   # shows top-level keys
info$count                 # number of bands
info$dtype                 # data type (e.g. int16, float32)
info$nodata                # nodata value if present

# 2. stats for band 1
stats1 <- cog_stats(cog, bidx = 1)
stats1



stats1 <- cog_stats(
  "https://stacapi100.thegrit.earth/eodata/cogeo/ggw_cog/GGW_EVI_trend_01_24_cog.tiff",
  bidx = 1
)
str(stats1, max.level = 2)

info <- cog_info(url)
info$nodata_value
# [1] -2.147483648e+09
