suppressPackageStartupMessages({
  library(sf)
  library(leaflet)
  library(dplyr)
  library(lwgeom)
  library(scales)
  library(jsonlite)
  library(RColorBrewer)
  library(ggplot2)
  library(plotly)
  library(forcats)
  library(htmlwidgets)
  library(htmltools)
  library(tibble)
  library(glue)
  library(plotly)
})

# ---- Global holders ----
.ggw <- NULL
.eco <- NULL

# ---- Load GGW boundary ----
init_ggw <- function(path = "assets/maps/data/ggw_adm0.geojson") {
  .ggw <<- sf::st_make_valid(sf::st_read(path, quiet = TRUE))
  invisible(.ggw)
}
ggw_data <- function() {
  if (is.null(.ggw)) stop("Run init_ggw() first.")
  .ggw
}

# ---- Load ecoregions ----
init_ecoregions <- function(path = "assets/maps/data/ecoregions_ggw.geojson") {
  .eco <<- sf::st_make_valid(sf::st_read(path, quiet = TRUE))
  invisible(.eco)
}
eco_data <- function() {
  if (is.null(.eco)) stop("Run init_ecoregions() first.")
  .eco
}

# ---- colormap helpers ----
`%||%` <- function(a, b) if (is.null(a)) b else a

.is_json_like <- function(x) {
  if (is.null(x) || is.na(x) || x == "") {
    return(FALSE)
  }
  grepl("^\\s*\\[|^\\s*\\{|^%5B|^%7B", x)
}
.legend_from_breaks <- function(breaks) {
  stopifnot(is.numeric(breaks), length(breaks) >= 2)
  paste(head(breaks, -1), "—", tail(breaks, -1))
}

.encode_step_colormap <- function(breaks, colors, alpha = 255) {
  stopifnot(length(colors) == length(breaks) - 1, all(diff(breaks) > 0))
  cm <- lapply(seq_len(length(breaks) - 1), function(i) {
    list(c(breaks[i], breaks[i + 1]), c(col2rgb(colors[i]), alpha))
  })
  list(
    json    = jsonlite::toJSON(cm, auto_unbox = TRUE),
    labels  = .legend_from_breaks(breaks),
    colors  = colors,
    type    = "step"
  )
}
.encode_grad_colormap <- function(breaks, colors, n = 100, alpha = 255) {
  stopifnot(length(breaks) == length(colors), all(diff(breaks) > 0))
  rng <- range(breaks)
  vals <- (breaks - rng[1]) / diff(rng)
  ramp <- scales::gradient_n_pal(colours = colors, values = vals)
  lin_vals <- seq(rng[1], rng[2], length.out = n)
  cols <- ramp(seq(0, 1, length.out = n))
  cm <- lapply(seq_len(n - 1), function(i) {
    rgba <- c(col2rgb(cols[i]), alpha)
    list(c(lin_vals[i], lin_vals[i + 1]), rgba)
  })
  mid_vals <- (breaks[-length(breaks)] + breaks[-1]) / 2
  mid_cols <- ramp((mid_vals - rng[1]) / diff(rng))

  list(
    json    = jsonlite::toJSON(cm, auto_unbox = TRUE),
    labels  = .legend_from_breaks(breaks),
    colors  = mid_cols,
    type    = "grad"
  )
}
.encode_cat_colormap <- function(values, colors, alpha = 255) {
  stopifnot(length(values) == length(colors))
  m <- stats::setNames(lapply(colors, function(z) c(col2rgb(z), alpha)), as.character(values))
  list(
    json    = jsonlite::toJSON(m, auto_unbox = TRUE),
    labels  = as.character(values),
    colors  = colors,
    type    = "cat"
  )
}
make_titiler_cmap <- function(breaks, colors, n = 100,
                              mode = c("auto", "grad", "step", "cat")) {
  mode <- match.arg(mode)
  if (mode == "cat") {
    enc <- .encode_cat_colormap(breaks, colors)
  } else {
    stopifnot(is.numeric(breaks), isTRUE(all(diff(breaks) > 0)))
    if (mode == "auto") {
      if (length(colors) == length(breaks)) {
        mode <- "grad"
      } else if (length(colors) == length(breaks) - 1) {
        mode <- "step"
      } else {
        stop("For 'auto', colors must match breaks (grad) or breaks-1 (step).")
      }
    }
    enc <- if (mode == "step") {
      .encode_step_colormap(breaks, colors)
    } else {
      .encode_grad_colormap(breaks, colors, n = n)
    }
  }
  list(
    encoded        = URLencode(enc$json, reserved = TRUE),
    legend_colors  = enc$colors,
    legend_labels  = enc$labels,
    type           = enc$type
  )
}

# ---- Map helpers ----
.popup_html <- function(title, img, caption) {
  htmltools::HTML(glue::glue("
    <div class='flood-popup'>
      <h4 style='margin:0 0 .5rem 0;'>{title}</h4>
      <img src='{img}' alt='{title}'
           style='width:100%;height:auto;border-radius:10px;display:block;margin-bottom:.5rem;' />
      <div style='font-size:.95rem;line-height:1.35;'>{caption}</div>
    </div>
  "))
}

.add_legend <- function(m, layer_name, cfg, position = "bottomleft") {
  leg_colors <- cfg$legend_colors %||% (cfg$colormap_obj$legend_colors %||% NULL)
  leg_labels <- cfg$legend_labels %||% (cfg$colormap_obj$legend_labels %||% NULL)
  leg_type <- cfg$legend_type %||% (cfg$colormap_obj$type %||% NULL)
  leg_units <- cfg$legend_units %||% NULL
  leg_breaks <- cfg$legend_breaks %||% NULL

  if (!is.null(leg_type) && leg_type == "grad") {
    if (!is.null(leg_breaks) && !is.null(leg_colors) && length(leg_breaks) >= 2) {
      rng <- range(leg_breaks)
      # Create a proper color palette function
      pal <- leaflet::colorNumeric(
        palette = colorRampPalette(leg_colors)(100),
        domain = rng,
        na.color = "transparent"
      )
      return(
        m |>
          leaflet::addLegend(
            position  = position,
            pal       = pal,
            values    = seq(rng[1], rng[2], length.out = 100),
            title     = paste0(layer_name, if (!is.null(leg_units)) paste0(" (", leg_units, ")")),
            opacity   = 1,
            labFormat = leaflet::labelFormat(suffix = if (!is.null(leg_units)) paste0(" ", leg_units) else "")
          )
      )
    }
    return(m)
  }

  if (!is.null(leg_colors) && !is.null(leg_labels)) {
    leaflet::addLegend(
      m,
      position = position, colors = leg_colors, labels = leg_labels,
      title = layer_name, opacity = 0.85
    )
  } else {
    m
  }
}

.add_markers <- function(
  m,
  markers_df,
  cluster = FALSE,
  icon_size = 40   # overall marker size (px)
) {
  if (is.null(markers_df) || !nrow(markers_df)) {
    return(m)
  }

  req <- c("lon", "lat", "title", "img", "caption")
  miss <- setdiff(req, names(markers_df))
  if (length(miss)) {
    stop("markers_df is missing: ", paste(miss, collapse = ", "))
  }

  # Cluster options
  cluster_opts <- if (cluster) leaflet::markerClusterOptions() else NULL

  # One image icon per marker, with a custom class for CSS
  img_icons <- leaflet::icons(
    iconUrl     = markers_df$img,
    iconWidth   = icon_size,
    iconHeight  = icon_size,
    iconAnchorX = icon_size / 2,
    iconAnchorY = icon_size / 2,
    className   = "flood-pin"   # <- we’ll style this class
  )

  leaflet::addMarkers(
    m,
    lng   = markers_df$lon,
    lat   = markers_df$lat,
    icon  = img_icons,
    label = markers_df$title,
    popup = lapply(seq_len(nrow(markers_df)), function(i) {
      .popup_html(
        markers_df$title[i],
        markers_df$img[i],
        markers_df$caption[i]
      )
    }),
    popupOptions   = leaflet::popupOptions(maxWidth = 360, closeOnClick = FALSE),
    clusterOptions = cluster_opts
  )
}

.enable_nonwheel <- function(m) {
  htmlwidgets::onRender(m, "
    function(el, x){
      var map=this;
      if (map.dragging)        map.dragging.enable();
      if (map.keyboard)        map.keyboard.enable();
      if (map.touchZoom)       map.touchZoom.enable();
      if (map.doubleClickZoom) map.doubleClickZoom.enable();
      if (map.boxZoom)         map.boxZoom.enable();
      if (map.scrollWheelZoom) map.scrollWheelZoom.disable();
    }")
}


ggw_map <- function(preset,
                    center = c(15, 10),
                    zoom = 5,
                    basemap = "CartoDB.PositronNoLabels",
                    mapId = NULL,
                    mode = c("free", "story"),
                    markers_df = NULL,
                    marker_cluster = FALSE,
                    time_tiles = NULL,
                    legend_position = "bottomleft",
                    story_end_id = NULL,
                    min_zoom = 4, 
                    max_zoom = 10) { 
  mode <- match.arg(mode)
  if (is.null(.ggw)) stop("Run init_ggw() first.")
  if (!exists("layer_presets")) stop("'layer_presets' not found.")
  if (!preset %in% names(layer_presets)) stop(sprintf("Unknown preset: %s", preset))

  cfg <- layer_presets[[preset]]
  layer_name <- cfg$name %||% preset
  cmap_param <- cfg$colormap %||% cfg$colormap_name %||% (cfg$colormap_obj$encoded %||% NULL)

  interactive_now <- identical(mode, "free")
  m <- leaflet::leaflet(options = leaflet::leafletOptions(
    preferCanvas     = TRUE,
    scrollWheelZoom  = interactive_now,
    dragging         = interactive_now,
    keyboard         = interactive_now,
    doubleClickZoom  = interactive_now,
    boxZoom          = interactive_now,
    zoomControl      = TRUE,
    minZoom          = min_zoom,
    maxZoom          = max_zoom
  )) |>
    leaflet::addMapPane("raster", zIndex = 350) |>
    leaflet::addMapPane("countries", zIndex = 430) |>
    leaflet::addProviderTiles(basemap) |>
    leaflet::addPolygons(
      data = .ggw, fillColor = "transparent", color = "black", weight = 1.2,
      label = ~admin, options = leaflet::pathOptions(interactive = TRUE, pane = "countries"),
      group = "GGW Countries"
    ) |>
    leaflet::setView(lng = center[2], lat = center[1], zoom = zoom)

  if (!is.null(mapId)) m$elementId <- mapId
  if (identical(mode, "story")) m <- .enable_nonwheel(m)

  # raster from TiTiler
  TITILER_BASE <- "https://titiler.thegrit.earth"
  q <- paste0(
    "url=", URLencode(cfg$stac, reserved = TRUE),
    "&bidx=", (cfg$bidx %||% 1),
    "&resampling=", (cfg$resampling %||% "bilinear"),
    "&return_mask=true"
  )
  if (!is.null(cfg$nodata)) q <- paste0(q, "&nodata=", cfg$nodata)
  if (!is.null(cmap_param) && nzchar(cmap_param)) {
    q <- paste0(q, if (.is_json_like(cmap_param)) "&colormap=" else "&colormap_name=", cmap_param)
  }
  if (!.is_json_like(cmap_param) && !is.null(cfg$rescale)) {
    q <- paste0(q, "&rescale=", paste(cfg$rescale, collapse = ","))
  }
  tile_url <- paste0(TITILER_BASE, "/cog/tiles/WebMercatorQuad/{z}/{x}/{y}.png?", q)

  m <- leaflet::addTiles(
    m, tile_url,
    group = layer_name,
    layerId = paste0("tile-", preset),
    options = leaflet::tileOptions(
      pane = "raster",
      opacity = cfg$opacity %||% 1,
      updateWhenZooming = FALSE,
      updateWhenIdle = TRUE,
      crossOrigin = TRUE
    )
  )

  m <- .add_legend(m, layer_name, cfg, legend_position)

  m <- .add_markers(m, markers_df, cluster = marker_cluster)
  if (!is.null(time_tiles) && length(time_tiles)) {
    labels <- names(time_tiles)
    ids <- paste0("t_", seq_along(labels))

    for (i in seq_along(labels)) {
      m <- leaflet::addTiles(
        m, time_tiles[[i]],
        group = "Time",
        layerId = ids[i],
        options = leaflet::tileOptions(pane = "raster", opacity = if (i == 1) 1 else 0, crossOrigin = TRUE)
      )
    }

    slider_id <- paste0("ggw-time-slider-", sample.int(1e6, 1))
    m <- leaflet.extras2::addControlSliderInput(
      m,
      inputId = slider_id, value = 1, min = 1, max = length(labels),
      step = 1, position = "topright", width = "180px", collapsed = FALSE
    )

    lbl_html <- htmltools::HTML(sprintf(
      "<div id='%s-label' style='background:rgba(255,255,255,.9);padding:.2rem .4rem;border-radius:.4rem;font-size:.85rem;'>%s</div>",
      slider_id, labels[1]
    ))
    m <- leaflet::addControl(lbl_html, position = "topleft")

    m <- htmlwidgets::onRender(m, sprintf("
      function(el, x){
        var map = this;
        var ids = ['%s'];
        var labels = ['%s'];
        var slider = document.getElementById('%s');
        var labelEl = document.getElementById('%s-label');
        function show(idx){
          ids.forEach(function(id, i){
            var l = map._layers[id];
            if(l && l.setOpacity) l.setOpacity((i+1)===idx ? 1 : 0);
          });
          if(labelEl) labelEl.textContent = labels[idx-1];
        }
        if(slider){
          slider.addEventListener('input', function(e){
            var v = parseInt(e.target.value || '1', 10);
            show(v);
          });
        }
        show(1);
      }", paste(ids, collapse = "','"), paste(labels, collapse = "','"), slider_id, slider_id))
  }

  m <- leaflet::addLayersControl(
    m,
    overlayGroups = c(layer_name, "GGW Countries"),
    options = leaflet::layersControlOptions(collapsed = FALSE)
  )

  if (identical(mode, "story") && !is.null(story_end_id) && !is.null(mapId)) {
    js <- sprintf("
      (function(){
        var last = document.getElementById('%s');
        if(!last) return;
        var widget = HTMLWidgets && HTMLWidgets.find && HTMLWidgets.find('#%s');
        if(!widget) return;
        function enableWheel(){
          var m = widget.getMap();
          if(m && m.scrollWheelZoom) m.scrollWheelZoom.enable();
        }
        var io = new IntersectionObserver(function(entries){
          entries.forEach(function(e){
            if(!e.isIntersecting){ enableWheel(); io.disconnect(); }
          });
        }, {threshold:0.01});
        io.observe(last);
      })();", story_end_id, mapId)
    m <- htmlwidgets::appendContent(m, htmltools::tags$script(htmltools::HTML(js)))
  }

  m
}
