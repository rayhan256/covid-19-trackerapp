const token_map =
  "pk.eyJ1IjoicmF5aGFuMjU2IiwiYSI6ImNrODVyaXNpeDBhMmczb3BmNDgxM2JqemUifQ.3lX5NveF46bYyy-cWz-h_w";

mapboxgl.accessToken = token_map;
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10",
  zoom: 1.5,
  center: [0, 20]
});

const getColorFromInfected = count => {
  if (count >= 100) {
    return "red";
  }

  if (count >= 10) {
    return "blue";
  }

  return "gray";
};

fetch("https://corona.lmao.ninja/countries")
  .then(response => response.json())
  .then(data => {
    data.forEach(result => {
      const { countryInfo, cases, country } = result;
      const { _id, lat, long } = countryInfo;
      //buat tampilan datanya
      const infected = document.getElementById("data");

      let element = document.createElement("p");
      element.innerHTML = `Negara : ${country} | Terinfeksi : ${cases}`;
      infected.appendChild(element);

      //buat mapnya
      new mapboxgl.Marker({ color: getColorFromInfected(cases) })
        .setLngLat([long, lat])
        .addTo(map);
    });
  });
