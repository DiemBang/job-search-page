import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import useAdvertsContext from '../../hooks/useAdvertsContext';
import { useNavigate } from 'react-router-dom';

const Map = () => {
  const navigate = useNavigate();
  const { ads } = useAdvertsContext();

  const locations = ads.map((ad) => {
    return {
      id: ad.id,
      employer: ad.employer.name,
      headline: ad.headline,
      address: ad.workplace_address.municipality,
      lgn: ad.workplace_address.coordinates[0],
      lat: ad.workplace_address.coordinates[1],
    };
  });

  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const token = import.meta.env.VITE_MAPBOX_TOKEN;
    console.log(token);

    mapboxgl.accessToken = token;

    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [16.0, 60.0],
        zoom: 4,
        minZoom: 4,
        maxZoom: 12,
      });

      locations.forEach((location) => {
        const marker = new mapboxgl.Marker()
          .setLngLat([location.lgn, location.lat])
          .addTo(mapRef.current!);

        // Popups
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="map-popup">
                <h3>${location.headline}${location.address}</h3>
                <p>${location.employer}</p>
                <button class="map-popup-button" id="popup-button-${location.id}">Gå till annons</button>
            </div>
          `);

        marker.setPopup(popup);

        popup.on('open', () => {
          document
            .getElementById(`popup-button-${location.id}`)
            ?.addEventListener('click', () => {
              navigate(`/search/job/${location.id}`);
              /*               alert(`you clicked the button for: ${location.headline}`); */
            });
        });
      });
    }

    return () => {
      mapRef.current?.remove();
    };
  }, [locations]);

  return (
    <>
      <div id="map-container" ref={mapContainerRef} className="map-container" />
    </>
  );
};

export default Map;
