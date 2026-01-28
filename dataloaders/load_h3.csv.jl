using CSV, DataFrames, Dates, Rasters, ArchGDAL, Statistics, Glob

h3_data = CSV.read("src/data/h3/ggw_h3.csv", DataFrame)

cropland = Raster("/Users/tor/Library/CloudStorage/GoogleDrive-tvagen@gmail.com/My Drive/EarthEngine ggw/GGW_Cropland_LC8_2021-01-01_2023-12-31_500m.tif")

erosion = Raster("/Users/tor/Library/CloudStorage/GoogleDrive-tvagen@gmail.com/My Drive/EarthEngine ggw/GGW_Erosion_LC8_2021-01-01_2023-12-31_500m.tif")

pnts = collect((o.longitude, o.latitude) for o in eachrow(h3_data) if !ismissing(o.latitude))

cropl = extract(cropland, pnts) |> DataFrame |> dropmissing
erosion = extract(erosion, pnts) |> DataFrame |> dropmissing

h3_data.cropl = cropl[:,2]
h3_data.erosion = erosion[:,2]

h3_data = DataFrames.combine(DataFrames.groupby(h3_data, [:longitude, :latitude, :h3_level9]), :cropl .=> mean .=> :cropl, :erosion .=> mean .=> :erosion)

h3_data.cropl = ifelse.(h3_data.cropl .< 40, missing, h3_data.cropl)

CSV.write(stdout, h3_data)