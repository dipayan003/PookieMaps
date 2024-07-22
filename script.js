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
