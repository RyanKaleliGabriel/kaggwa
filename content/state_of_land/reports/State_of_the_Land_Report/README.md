# Notes on State of Land Report config and working with the set up 

The qmd file was unstable with large inline code cells so instead now each section chunk fetches from the helper file, which contains styling params for each stac asset and the map builder so that all maps are the same style /shape and size.

1. Report structure 
The report is structured into three main sections: 
- Climate 
- Land cover 
- Soil health

Each section has chapters which each have a leaflet template where you can pull in the stac asset that corresponds to the chapter focus. For example, under the Climate section, there is a Flood risk chapter that summarises GGW flood risk and refers to Ivy's flood risk raster. 

*Noting that we are limiting data hosted in repo to vector files (ggw boundaries etc) and all rasters should be pulled from the stac. If your stac asset tiff or cog is not yet there, you can send the tiff or cog file to victor and he can upload it. 

2. Leaflet map helper function 
The report uses a leaflet map helper function to generate the maps. This function is defined in the helper.R file and is called within each chapter of the report. The function takes parameters such as the title, description, stac asset URL, and styling options to create a consistent map layout across all chapters.

*Noting that I haven't found a graceful way to check stac asset meta data - have just been doing this manually for now and copying over info into the styling presets. This part is important since if you mispecify it seems to break the render. 


