const fs = require('fs');

const content = fs.readFileSync('src/data/sampleTrips.ts', 'utf8');
let newContent = content;

// Replace some key ones manually with static verified images to ensure it looks amazing immediately
const replacements = [
  ['title: "Explore Senso-ji Temple & Nakamise-dori",', 'title: "Explore Senso-ji Temple & Nakamise-dori",\n        imageUrl: "https://tse2.mm.bing.net/th/id/OIP.jesbwE54j7amgiiTsRlLCAHaFj?r=0&pid=Api&w=800&h=600&c=7",'],
  ['title: "Lunch at Kyushu Jangara Ramen Akihabara",', 'title: "Lunch at Kyushu Jangara Ramen Akihabara",\n        imageUrl: "https://tse4.mm.bing.net/th/id/OIP.Ig9vRABFsgCJ9dTfr9FbuwHaE8?r=0&pid=Api&w=800&h=600&c=7",'],
  ['title: "Tokyo Metropolitan Government Building Observation Deck",', 'title: "Tokyo Metropolitan Government Building Observation Deck",\n        imageUrl: "https://tse1.mm.bing.net/th/id/OIP.DAH4n5HJHKmypsazqC-7JwHaDs?r=0&pid=Api&w=800&h=600&c=7",'],
  ['title: "Dinner & Drinks at Omoide Yokocho (Memory Lane)",', 'title: "Dinner & Drinks at Omoide Yokocho (Memory Lane)",\n        imageUrl: "https://tse4.mm.bing.net/th/id/OIP.t918eMr8IUjFxSmB0L_SfAHaHa?r=0&pid=Api&w=800&h=600&c=7",'],
  ['title: "Peaceful Morning Stroll through Meiji Jingu Shrine",', 'title: "Peaceful Morning Stroll through Meiji Jingu Shrine",\n        imageUrl: "https://tse4.mm.bing.net/th/id/OIP.fi4yuyazUUL6ob2SyhmkLgAAAA?r=0&pid=Api&w=800&h=600&c=7",'],
  ['title: "Crispy Tonkatsu Lunch at Tonkatsu Maisen Aoyama",', 'title: "Crispy Tonkatsu Lunch at Tonkatsu Maisen Aoyama",\n        imageUrl: "https://tse1.mm.bing.net/th/id/OIP.yTB4FhSjkQGk-UuxV9ytDQHaE8?r=0&pid=Api&w=800&h=600&c=7",']
];

for (const [find, replace] of replacements) {
  newContent = newContent.replace(find, replace);
}

fs.writeFileSync('src/data/sampleTrips.ts', newContent);
console.log("Patched sampleTrips with Bing CDN images");
