using Rasters, ArchGDAL, DataFrames, CSV, Statistics, Shapefile, GeoJSON, Glob
import GeoDataFrames as GDF

countries = GDF.read("src/data/ggw_gadm.geojson")

gpm_list = glob("gpm_daily_*.tif", "/Users/tor/Dropbox/Code/webapps/K4GGWA/data_proc/gpm/")[2:end]

for i in 1:length(gpm_list)
    gpm_stack = RasterStack(gpm_list[i], lazy=true)
    gpm_sum = sum(gpm_stack, dims=Band)
    Rasters.write("gpm_annual_GGW_" * split(gpm_list[i], "_")[5], gpm_sum)
end
