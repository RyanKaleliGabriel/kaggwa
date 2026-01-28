using Rasters, ArchGDAL, DataFrames, CSV, Statistics, Shapefile, GeoJSON, GeoTables
import GeoDataFrames as GDF

countries = GDF.read("dashboards/data/bnd/ggw_gadm.geojson")

erosion = Raster("/Users/tor/Dropbox/Code/webapps/K4GGWA/data_proc/lh/500m/GGW_Erosion_LC8_2021-01-01_2023-12-31_500m.tif", lazy=false)

cropland = Raster("/Users/tor/Dropbox/Code/webapps/K4GGWA/data_proc/lh/500m/GGW_Cropland_LC8_2021-01-01_2023-12-31_500m.tif", lazy=false)

treecover = Raster("/Users/tor/Dropbox/Code/webapps/K4GGWA/data_proc/lh/500m/GGW_TreeCover_LC8_2021-01-01_2023-12-31_500m.tif", lazy=false)

soc = Raster("/Users/tor/Dropbox/Code/webapps/K4GGWA/data_proc/lh/500m/GGW_SOC_LC8_2021-01-01_2023-12-31_500m.tif", lazy=false)

fracveg = Raster("/Users/tor/Dropbox/Code/webapps/K4GGWA/data_proc/lh/500m/GGW_FracVeg_LC8_2021-01-01_2023-12-31_500m.tif", lazy=false)

fracveg = rebuild(fracveg; missingval=-9999)
fracveg = ifelse.(fracveg .<= -4000, -4000, fracveg)
fracveg = ((fracveg .- minimum(fracveg)) ./ (maximum(fracveg) .- minimum(fracveg))) .* 100

erosion = rebuild(erosion; missingval=-9999)
cropland = rebuild(cropland; missingval=-9999)
treecover = rebuild(treecover; missingval=-9999)
soc = rebuild(soc; missingval=-9999)

erosion_stats = zonal(median, erosion; of=countries, boundary=:touches, progress=false)
cropland_stats = zonal(median, cropland; of=countries, boundary=:touches, progress=false)
treecover_stats = zonal(median, treecover; of=countries, boundary=:touches, progress=false)
soc_stats = zonal(median, soc; of=countries, boundary=:touches, progress=false)
fracveg_stats = zonal(median, fracveg; of=countries, boundary=:touches, progress=false)

countries.median_erosion = erosion_stats
countries.median_cropland = cropland_stats
countries.median_treecover = treecover_stats
countries.median_soc = soc_stats ./ 100
countries.median_fracveg = fracveg_stats

countries = countries |> dropmissing

countries.erosion_stats = ifelse.(countries.median_erosion .<= 0, 0, countries.median_erosion)
countries.cropland_stats = Float64.(ifelse.(countries.median_cropland .<= 40, 0, countries.median_cropland))
countries.treecover_stats = ifelse.(countries.median_treecover .<= 0, 0, countries.median_treecover)
countries.soc_stats = ifelse.(countries.median_soc .<= 0, 0, countries.median_soc)
countries.fracveg_stats = Float64.(ifelse.(countries.median_fracveg .<= 0, 0, countries.median_fracveg))

countries.NAME_2 = ifelse.(ismissing.(countries.NAME_2), countries.NAME_1, countries.NAME_2)
countries.NAME_3 = ifelse.(ismissing.(countries.NAME_3), countries.NAME_2, countries.NAME_3)

GDF.write("dashboards/data/lh_countries.geojson", countries)