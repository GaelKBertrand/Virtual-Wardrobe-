// Set default settings for extension
chrome.storage.sync.set({
  wardrobe: [],
  occasion: "work",
  location: null
});

// Listen for user's location and update settings accordingly
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "setLocation") {
    chrome.storage.sync.set({ location: request.location });
  }
});

// Fetch weather data from API
function getWeatherData(lat, lon) {
  const apiKey = "your_api_key_here";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => data.weather[0].main);
}

// Generate outfit suggestion based on weather and occasion
function generateOutfit(wardrobe, weather, occasion) {
  // Insert machine learning algorithm here to analyze wardrobe and suggest outfit
  return `${wardrobe[0]} top, ${wardrobe[1]} pants, ${weather} jacket, ${occasion} shoes`;
}

// Listen for popup button click and generate outfit suggestion
chrome.browserAction.onClicked.addListener(() => {
  chrome.storage.sync.get(["wardrobe", "occasion", "location"], data => {
    const { wardrobe, occasion, location } = data;
    const weather = location ? getWeatherData
