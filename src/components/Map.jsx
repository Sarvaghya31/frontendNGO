import React from 'react'
import * as maptilersdk from "@maptiler/sdk"
import "@maptiler/sdk/dist/maptiler-sdk.css"
import "./stylesheet/map.css"
import { useRef,useEffect } from 'react'
function Map({coordinates=[],markers=[],navigate}) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const markerRefs=useRef([])

  maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;
 
  console.log(markers)
  useEffect(() => {
    if (map.current) return; 

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [
  (coordinates?.[0] !== undefined ? coordinates[0] : 77.21),
  (coordinates?.[1] !== undefined ? coordinates[1] : 28.64)
],
      zoom: 14,
    });
  }, [coordinates]);

  useEffect(() => {
    if (map.current) {
      //console.log(map.current.getCenter());
      //console.log(coordinates)
      map.current.setCenter([
  (coordinates?.[0] !== undefined ? coordinates[0] : 77.21),
  (coordinates?.[1] !== undefined ? coordinates[1] : 28.64)
]);
    }
  }, [coordinates]); 
  
  const show=(id)=>{
    console.log(id)
    navigate(`/user/issues/${id}`);
  }
  
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markerRefs.current.forEach(m => m.remove());
    markerRefs.current = [];
    if(markers.length!==0)
    {markers.forEach(markerData => {
      //console.log(markerData)
      const markerId = `${markerData._id}`;
  const popupHTML = `
    <div>
      <strong>${markerData.title || 'Marker'}</strong><br/>
      <button id="${markerId}" style="color: #1e40af; text-decoration: underline; background: none; border: none; cursor: pointer;">
        View Details
      </button>
    </div>
  `;

  const popup = new maptilersdk.Popup().setHTML(popupHTML);
  popup.on('open', () => {
    const button = document.getElementById(markerId);
    console.log(markerId)
    if (button) {
      button.addEventListener('click', () => show(markerId));
    }
  });

      const marker = new maptilersdk.Marker()
        .setLngLat([markerData.dropPoint[0], markerData.dropPoint[1]])
        .setPopup(popup) 
        .addTo(map.current);

      markerRefs.current.push(marker);
    }
  )
  }
},[markers]
  );
   


  

  return (
    <div className='w-full flex justify-center px-4 my-4'>
        <div ref={mapContainer} className="w-full h-[400px] max-w-6xl rounded-lg border border-amber-500 .map" />
        
    </div>
  )
}

export default Map