const map = L.map("map").setView([38, -96], 4);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

const coordinates = [
  {lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3)},
  {lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3)},
  {lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3)},
];

coordinates.forEach((coord, index) => {
  const marker = L.marker([coord.lat, coord.lng]).addTo(map);
  document.getElementById(
    `marker${index + 1}`
  ).textContent = `${coord.lat}, ${coord.lng}`;
});

async function getLocality(lat, lng) {
  const response = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  );
  const data = await response.json();
  return data.locality || "Unknown locality";
}

coordinates.forEach(async (coord, index) => {
    const locality = await getLocality(coord.lat, coord.lng);
    document.getElementById(`marker${index + 1}`).innerHTML = `
      Latitude: ${coord.lat}, Longitude: ${coord.lng} - Locality: ${locality}
    `;
});

