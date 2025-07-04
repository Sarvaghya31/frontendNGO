function filterMarkersByDistance(markers, center, radiusMeters) {
    const R = 6371e3; // Earth radius in meters
  
    function haversine(lat1, lon1, lat2, lon2) {
      const toRad = x => x * Math.PI / 180;
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a = Math.sin(dLat/2) ** 2 +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon/2) ** 2;
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }
  
    return markers.filter(marker => {
      const dist = haversine(center.lat, center.lng, marker.lat, marker.lng);
      return dist <= radiusMeters;
    });
  }

  const center = { lat: 28.6139, lng: 77.2090 }; // your center point
const radius = 5000; // 5km

const filteredMarkers = filterMarkersByDistance(markersData, center, radius);
// Now use filteredMarkers to render on the map
