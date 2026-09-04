const apiKey = process.env.VITE_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY;
fetch("https://places.googleapis.com/v1/places:searchText", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": apiKey,
    "X-Goog-FieldMask": "places.id,places.displayName,places.photos",
  },
  body: JSON.stringify({
    textQuery: "Eiffel Tower Paris",
    maxResultCount: 1
  }),
}).then(res => res.json()).then(console.log).catch(console.error);
