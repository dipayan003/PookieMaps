mapboxgl.accessToken = 'pk.eyJ1IjoiZGlwYXlhbjAwMyIsImEiOiJjbHl3ejZuaW4xaTQ4MmxxcnZ0Ymhrbmc3In0.TAVBfvH0gKOkKIN6X0pXFQ';
navigator.geolocation.getCurrentPosition(successLocation,errorLocation,{enableHighAccuracy:true});
function successLocation(position){
    console.log(position);
    setupMap([position.coords.longitude,position.coords.latitude]);
}
function errorLocation(){
    setupMap([88.3766,22.9528])
}
function setupMap(center){
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom:14
    });
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);
    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken
      });
      
      
      map.addControl(directions, 'top-left');
}
// Add a marker to show the user's location
const marker = new mapboxgl.Marker()
.setLngLat(center)
.addTo(map);

// Add an event listener to the map to update the marker when the user moves
map.on('move', () => {
marker.setLngLat(map.getCenter());
});
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchLocation(searchInput.value);
    }
});

function searchLocation(query) {
    // Use the Mapbox Geocoding API to search for the location
    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxgl.accessToken}`;
    fetch(geocodingUrl)
        .then(response => response.json())
        .then(data => {
            const coordinates = data.features[0].center;
            setupMap(coordinates);
        })
        .catch(error => console.error(error));
}
