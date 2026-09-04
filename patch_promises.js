const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const target = `              if (item.category !== 'transport' && item.category !== 'lodging') {
                photoPromises.push(
                  fetchRealPlacePhoto(item.title, item.location, planData.destination || destination).then((live) => {
                    if (live && live.url) {
                      item.imageUrl = live.url;
                      item.photoCaption = live.caption;
                      item.photoSource = live.source || 'Pinterest';
                      item.photoSourceType = live.sourceType || 'pinterest';
                      if (live.photos && live.photos.length > 0) {
                        item.photos = live.photos;
                      }
                      if (live.alternativePhotos && live.alternativePhotos.length > 0) {
                        item.alternativePhotos = live.alternativePhotos;
                      }
                      if (live.officialWebsiteUrl && !item.officialWebsiteUrl) item.officialWebsiteUrl = live.officialWebsiteUrl;
                      if (live.tripAdvisorUrl && !item.tripAdvisorUrl) item.tripAdvisorUrl = live.tripAdvisorUrl;
                    }
                  }).catch(() => {})
                );
              }`;

const replace = `              if (item.category !== 'transport' && item.category !== 'lodging') {
                photoPromises.push(async () => {
                  try {
                    // Stagger requests to avoid DDG rate limit
                    await new Promise(r => setTimeout(r, Math.random() * 2000));
                    const live = await fetchRealPlacePhoto(item.title, item.location, planData.destination || destination);
                    if (live && live.url) {
                      item.imageUrl = live.url;
                      item.photoCaption = live.caption;
                      item.photoSource = live.source || 'Pinterest';
                      item.photoSourceType = live.sourceType || 'pinterest';
                      if (live.photos && live.photos.length > 0) item.photos = live.photos;
                      if (live.alternativePhotos && live.alternativePhotos.length > 0) item.alternativePhotos = live.alternativePhotos;
                      if (live.officialWebsiteUrl && !item.officialWebsiteUrl) item.officialWebsiteUrl = live.officialWebsiteUrl;
                      if (live.tripAdvisorUrl && !item.tripAdvisorUrl) item.tripAdvisorUrl = live.tripAdvisorUrl;
                    }
                  } catch(e) {}
                });
              }`;

if (code.includes(target)) {
  code = code.replace(target, replace);
  code = code.replace(
    `await Promise.race([Promise.allSettled(photoPromises), timeoutPromise]);`,
    `await Promise.race([Promise.allSettled(photoPromises.map(fn => fn())), timeoutPromise]);`
  );
  fs.writeFileSync('server.ts', code);
  console.log("Patched successfully");
} else {
  console.log("Target block not found");
}
