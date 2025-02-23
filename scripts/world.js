const regionData = {
  asia: {
    coords: [34.0479, 100.6197],
    info: "In Asia, love is often expressed through acts of service and deep familial bonds."
  },
  europe: {
    coords: [54.5260, 15.2551],
    info: "In Europe, romantic gestures like flowers and handwritten notes are common."
  },
  americas: {
    coords: [37.0902, -95.7129],
    info: "In the Americas, love is celebrated with bold declarations and festive gatherings."
  },
  africa: {
    coords: [1.6508, 10.2679],
    info: "In Africa, love is deeply rooted in community and shared traditions."
  }
};

const leafletCSS = document.createElement('link');
leafletCSS.rel = 'stylesheet';
leafletCSS.href = 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css';
document.head.appendChild(leafletCSS);

export const leafletScript = document.createElement('script');
leafletScript.async
leafletScript.src = 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.js';


document.body.appendChild(leafletScript);

export default new class World {
  constructor(mapId, infoBox, regionData) {
    this.map = null;
    this.mapId = mapId;
    this.infoBox = infoBox;
    this.regionData = regionData;
    this.container = document.getElementById('region-markers');
  }

  initMap(L) {
    const mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    mapDiv.style.height = '500px';  
    this.container.appendChild(mapDiv);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.map.invalidateSize();
          observer.disconnect(); 
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(this.container);

    this.map = L.map('map').setView([30,0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      detectRetina: true,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.addMarkers()
  }

  addMarkers() {
    Object.keys(regionData).forEach(regionKey => {
      const { coords, info } = regionData[regionKey];
      var marker = L.marker(coords, { alt: regionKey })
        .addTo(this.map)
        .bindPopup(`<b>${regionKey.charAt(0).toUpperCase() + regionKey.slice(1)}</b><br>${info}`);

      marker.on('click', () => this.handleMarkerClick(marker, coords));
    });
  }

  handleMarkerClick(marker, coords) {
    this.map.setView(coords);
    marker.openPopup();
  }

}
