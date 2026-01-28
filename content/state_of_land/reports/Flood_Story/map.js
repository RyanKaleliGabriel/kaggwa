mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    center: [14.009610969058771, 17.54388369858251], 
    zoom: 1.5,
    minZoom: 0.5,
    maxZoom: 10,
    projection: 'globe'
});

map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

// Add a custom layer control button
class LayerControl {
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';

        const button = document.createElement('button');
        button.innerHTML = '🌊'; // Flood icon
        button.title = 'Toggle Flood Layer';
        button.onclick = () => {
            const visibility = map.getLayoutProperty('flood-layer', 'visibility');
            map.setLayoutProperty('flood-layer', 'visibility', visibility === 'none' ? 'visible' : 'none');
        };

        this._container.appendChild(button);
        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}

// Create funfact container inside the map
const funfactContainer = document.createElement('div');
funfactContainer.id = 'funfact-container';
document.getElementById('map').appendChild(funfactContainer);

// Load GeoJSON data
fetch('Assets/Popups.geojson')
    .then(response => response.json())
    .then(data => {
        const locations = data.features.map(feature => ({
            name: feature.properties.Name,  
            coords: [feature.properties.Latitude, feature.properties.Longitude], 
            image: feature.properties.Image,  
            formation: feature.properties.Formation,
            flooding: feature.properties.Flooding
        }));

        // Add points to the map
        locations.forEach((loc, index) => {
            const el = document.createElement('div');
            el.className = 'marker';
            el.dataset.index = index;

            new mapboxgl.Marker(el)
                .setLngLat(loc.coords)
                .addTo(map);
        });

        // Populate funfact sections inside the map
        locations.forEach((loc, index) => {
            const section = document.createElement('div');
            section.className = 'funfact-section';
            section.dataset.index = index;
            section.innerHTML = `
                <h4>${loc.name}</h4>
                <img src="${loc.image}" alt="${loc.name}" class="funfact-img">
                <p><strong>Formation:</strong> ${loc.formation}</p>
                <p><strong>Flooding:</strong> ${loc.flooding}</p>
            `;
            funfactContainer.appendChild(section);
        });

        // Scroll event to highlight points and fly to locations
        const sections = document.querySelectorAll('.funfact-section');
        const markers = document.querySelectorAll('.marker');
        let currentIndex = -1;

        funfactContainer.addEventListener('scroll', () => {
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top >= 50 && rect.top < window.innerHeight / 2) {
                    if (currentIndex !== index) {
                        currentIndex = index;

                        // Zoom out first, then fly to point
                        map.flyTo({ center: [14.0096, 17.5438], zoom: 1, essential: true });

                        setTimeout(() => {
                            map.flyTo({
                                center: locations[index].coords,
                                zoom: 8,
                                speed: 1.8,
                                curve: 1.8,
                                essential: true
                            });

                            // Change marker color
                            markers.forEach(marker => marker.style.backgroundColor = "#ff0000");
                            markers[index].style.backgroundColor = "#00ff00"; // Highlight active point
                        }, 2000); // Delay before zooming to the point
                    }
                }
            });
        });
    })
    .catch(error => console.error('Error loading GeoJSON:', error));

// Load flood layer
map.on('style.load', () => {
    map.addSource('flood-layer', {
        type: 'raster',
        tiles: [
            'https://landscapeportal.thegrit.earth/geoserver/geonode/wms?' +
            'service=WMS&request=GetMap&layers=geonode:ggw_cog&' +
            'styles=&format=image/png&transparent=true&' +
            'version=1.1.1&tiled=true&srs=EPSG:3857&width=256&height=256&bbox={bbox-epsg-3857}'
        ],
        tileSize: 256
    });

    map.addLayer({
        id: 'flood-layer',
        type: 'raster',
        source: 'flood-layer',
        paint: {},
        layout: { visibility: 'visible' } // Start as visible
    });

    // Add the layer control button to the map
    map.addControl(new LayerControl(), 'top-right');
});
