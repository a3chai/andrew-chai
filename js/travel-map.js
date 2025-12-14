/**
 * Travel Map - Interactive world map with trip locations
 * Uses Leaflet.js with CartoDB dark tiles
 */

(function() {
    'use strict';

    // ==========================================
    // Trip Data Configuration
    // ==========================================
    // Add new trips here - the map and navigation will update automatically
    const trips = [
        {
            id: 'switzerland',
            title: 'The Swiss Alps',
            location: 'Switzerland',
            date: 'June 2024',
            coordinates: [46.5597, 7.9949], // Interlaken area
        },
        {
            id: 'japan',
            title: 'Cherry Blossom Season',
            location: 'Japan',
            date: 'April 2024',
            coordinates: [35.6762, 139.6503], // Tokyo
        },
        // Add more trips following this pattern:
        // {
        //     id: 'trip-slug',        // Must match id="trip-{slug}" in HTML
        //     title: 'Trip Name',
        //     location: 'Country',
        //     date: 'Month Year',
        //     coordinates: [lat, lng],
        // },
    ];

    // ==========================================
    // Map Initialization
    // ==========================================
    const mapContainer = document.getElementById('travel-map');

    if (!mapContainer) {
        return; // Exit if not on travel page
    }

    // Initialize Leaflet map
    const map = L.map('travel-map', {
        center: [30, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 18,
        zoomControl: true,
        scrollWheelZoom: true,
    });

    // Add dark-themed tile layer (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // ==========================================
    // Custom Marker Icon
    // ==========================================
    const createMarkerIcon = () => {
        return L.divIcon({
            className: 'travel-marker-container',
            html: `
                <div class="travel-marker">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                </div>
            `,
            iconSize: [28, 28],
            iconAnchor: [14, 14],
            popupAnchor: [0, -14],
        });
    };

    // ==========================================
    // Add Markers for Each Trip
    // ==========================================
    const markers = [];

    trips.forEach(trip => {
        const marker = L.marker(trip.coordinates, {
            icon: createMarkerIcon(),
            title: trip.title,
        });

        // Create popup content
        const popupContent = `
            <div class="map-popup">
                <div class="map-popup-title">${trip.title}</div>
                <div class="map-popup-date">${trip.date}</div>
                <a href="#trip-${trip.id}" class="map-popup-link">
                    View Photos
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M7 17l9.2-9.2M17 17V7H7"/>
                    </svg>
                </a>
            </div>
        `;

        marker.bindPopup(popupContent, {
            closeButton: false,
            offset: [0, -8],
        });

        marker.addTo(map);
        markers.push({ marker, trip });
    });

    // ==========================================
    // Fit Map to Show All Markers
    // ==========================================
    if (markers.length > 0) {
        const group = L.featureGroup(markers.map(m => m.marker));
        map.fitBounds(group.getBounds().pad(0.3));
    }

    // ==========================================
    // Handle Popup Link Clicks (Smooth Scroll)
    // ==========================================
    document.addEventListener('click', (e) => {
        if (e.target.closest('.map-popup-link')) {
            e.preventDefault();
            const link = e.target.closest('.map-popup-link');
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                map.closePopup();

                const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });

    // ==========================================
    // Resize Handler
    // ==========================================
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            map.invalidateSize();
        }, 250);
    }, { passive: true });

})();
