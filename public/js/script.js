const socket = io();

if (navigator.geolocation) {
  navigator.geolocation.watchPosition((position) => {
    const { latitude, longitude } = position.coords;

    // Send the coordinates to the server via Socket.IO
    socket.emit('send-location', { latitude, longitude });
  }, (error) => {
    console.error(error);
  }, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  });
}

// Initialize the map at a default position
const map = L.map("map").setView([0, 0], 2); // Start with a global view (low zoom level)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
const markers={};
// Listen for location updates from the server
socket.on("recieve-location", (data) => {
    const { id, latitude, longitude } = data;
  
  
      map.setView([latitude, longitude], 10);  // Adjust the zoom level to a more local view
      if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
      } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
        
      }
    
  });
  
  
