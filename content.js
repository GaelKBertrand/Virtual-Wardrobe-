// Get user's location and send to background script
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const location = { lat: position.coords.latitude, lon: position.coords.longitude };
    chrome.runtime.sendMessage({ type: "setLocation", location });
  });
}

// Listen for changes to wardrobe and occasion settings and update extension UI
chrome.storage.onChanged.addListener(changes => {
  if (changes.wardrobe) {
    const wardrobeList = document.getElementById("wardrobe");
    wardrobeList.innerHTML = "";

    changes.wardrobe.newValue.forEach(item => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      wardrobeList.appendChild(listItem);
    });
  }

  if (changes.occasion) {
    const occasionSelect = document.getElementById("occasion");
    occasionSelect.value = changes.occasion.newValue;
  }

  if (changes.outfit) {
    const outfitText = document.getElementById("outfit
