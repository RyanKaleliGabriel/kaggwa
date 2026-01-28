using Rasters, ArchGDAL, DataFrames, CSV, Statistics, Shapefile, GeoJSON, Glob
import GeoDataFrames as GDF

countries = GDF.read("dashboards/data/bnd/ggw_gadm_NAME_2.geojson")
#countries = countries[!, [:geometry, :NAME_0, :NAME_1]]

#h3 = GDF.read("src/data/h3/ggw_h3_l5_GADM.geojson")

gpm_list = glob("gpm_annual_*.tif", "dashboards/data/gpm/")

# for i in 1:length(gpm_list)
#     gpm = Raster(gpm_list[i])
#     year = split(gpm_list[i], "_")[4] |> Symbol
#     h3[!,year] = zonal(median, gpm; of=h3, boundary=:touches, progress=false)
# end

for i in 1:length(gpm_list)
    gpm = Raster(gpm_list[i])
    year = split(gpm_list[i], "_")[4] |> Symbol
    countries[!, year] = zonal(median, gpm; of=countries, boundary=:touches, progress=false)
end

# h3.NAME_2 = ifelse.(ismissing.(h3.NAME_2), h3.NAME_1, h3.NAME_2)
# h3.NAME_3 = ifelse.(ismissing.(h3.NAME_3), h3.NAME_2, h3.NAME_3)
# h3 = h3 |> dropmissing

#countries.NAME_2 = ifelse.(ismissing.(countries.NAME_2), countries.NAME_1, countries.NAME_2)
#countries.NAME_3 = ifelse.(ismissing.(countries.NAME_3), countries.NAME_2, countries.NAME_3)
countries = countries |> dropmissing

countries = filter(row -> all(x -> !(x isa Number && isnan(x)), row), countries)

#GDF.write("src/data/gpm_countries_h3_l5.geojson", h3)
GDF.write("dashboards/data/gpm_countries.geojson", countries)

## Wide to long...
countries_long = stack(countries, 5:56) |> dropmissing
rename!(countries_long, :variable => :year, :value => :rainfall)

countries_long = filter(row -> all(x -> !(x isa Number && isnan(x)), row), countries_long)

countries_long = DataFrames.combine(DataFrames.groupby(countries_long, [:NAME_0, :year]), :rainfall => mean => :rainfall)

CSV.write("src/data/gpm_countries_long.csv", countries_long)