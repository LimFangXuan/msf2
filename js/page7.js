const FOOD_KEY = "foodReviewsData";
const SITE_KEY = "siteReviewsData";
let pickerMap, pickerMarker;
let reviewMarkers = [];

// Stars for ratings
const stars = (n) => "⭐".repeat(Math.max(1, Math.min(5, Number(n) || 1)));

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
}

// --- TOGGLE SIDEBAR ---
const sidebar = document.getElementById("filterSidebar");
const toggleBtn = document.getElementById("toggleSidebar");
const mainContainer = document.querySelector(".container");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("closed");
  mainContainer.classList.toggle("sidebar-closed");
});
// ----------- SEED SAMPLE REVIEWS -----------
function seedSampleData() {
  if (!localStorage.getItem(SITE_KEY)) {
    const sampleSiteReviews = [
      { name: "Amira", feedback: "I love the clean design and easy navigation!", rating: 5 },
      { name: "Jason", feedback: "Great content about Malaysian street food, very informative.", rating: 4 },
      { name: "Siti", feedback: "The site loads fast and looks good on my phone.", rating: 5 },
      { name: "Wei Ming", feedback: "Maybe add more videos for cooking tips?", rating: 3 }
    ];
    saveData(SITE_KEY, sampleSiteReviews);
  }

  if (!localStorage.getItem(FOOD_KEY)) {
    const sampleFoodReviews = [
      {
        foodName: "Nasi Lemak Wanjo Kg Baru",
        restaurantName: "Wanjo Restaurant",
        description: "A legendary spot in Kuala Lumpur serving aromatic coconut rice with spicy sambal and crispy anchovies.",
        rating: 5,
        image: "images/Nasi Lemak.jpg",
        location: { lat: 3.16271, lng: 101.70433 },
        address: "Jalan Raja Muda Musa, Kampung Baru, Kuala Lumpur"
      },
      {
        foodName: "Char Kway Teow",
        restaurantName: "Lorong Selamat Hawker",
        description: "Penang's famous char koay teow, fried with prawns, cockles, and a signature wok hei aroma.",
        rating: 5,
        image: "images/char-kuay-teow.jpg",
        location: { lat: 5.41727, lng: 100.32454 },
        address: "Lorong Selamat, George Town, Penang"
      }
    ];
    saveData(FOOD_KEY, sampleFoodReviews);
  }
}

// ----------- FOOD REVIEWS -----------
function renderFoodReviews() {
  const listEl = document.getElementById("foodReviewsList");
  const data = loadData(FOOD_KEY);
  listEl.innerHTML = data.map(r => {
    const locationText = r.address || `${r.location.lat.toFixed(4)}, ${r.location.lng.toFixed(4)}`;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationText)}`;
    return `
      <div class="review-card">
        <img src="${r.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'}" alt="${r.foodName}">
        <h4>${r.foodName}</h4>
        <p><strong>Restaurant:</strong> ${r.restaurantName || 'Unknown'}</p>
        <p>${r.description}</p>
        <p><strong>Rating:</strong> ${stars(r.rating)}</p>
        <p class="location-info">
          <i class="fas fa-map-marker-alt"></i> 
          <a href="${mapsUrl}" target="_blank">${locationText}</a>
        </p>
      </div>
    `;
  }).join("");
}

// ----------- DRAW FOOD MARKERS -----------
function drawFoodMarkers() {
  // Remove old markers
  reviewMarkers.forEach(m => pickerMap.removeLayer(m));
  reviewMarkers = [];

  const data = loadData(FOOD_KEY);
  data.forEach(r => {
    if (r.location) {
      const marker = L.marker([r.location.lat, r.location.lng])
        .addTo(pickerMap)
        .bindPopup(`
          <b>${r.foodName}</b><br>
          ${stars(r.rating)}<br>
          ${r.address || ""}
        `);
      reviewMarkers.push(marker);
    }
  });
}

// ----------- MAP INIT -----------
function initPickerMap() {
  pickerMap = L.map("map-picker").setView([3.139, 101.6869], 6);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(pickerMap);

  // Search bar
  L.Control.geocoder({ defaultMarkGeocode: false })
    .on("markgeocode", function (e) {
      const center = e.geocode.center;
      pickerMap.setView(center, 16);

      if (pickerMarker) {
        pickerMarker.setLatLng(center);
      } else {
        pickerMarker = L.marker(center).addTo(pickerMap);
      }

      document.getElementById("lat").value = center.lat;
      document.getElementById("lng").value = center.lng;
      document.getElementById("foodLocation").value = e.geocode.name;
      document.getElementById("chosenLocation").textContent = `Selected: ${e.geocode.name}`;
    })
    .addTo(pickerMap);

  // Click on map
  pickerMap.on("click", (e) => {
    const { lat, lng } = e.latlng;
    if (pickerMarker) {
      pickerMarker.setLatLng([lat, lng]);
    } else {
      pickerMarker = L.marker([lat, lng]).addTo(pickerMap);
    }
    document.getElementById("lat").value = lat;
    document.getElementById("lng").value = lng;

    // Reverse geocode to get address
    const geocoder = L.Control.Geocoder.nominatim();
    geocoder.reverse({ lat, lng }, pickerMap.options.crs.scale(pickerMap.getZoom()), results => {
      if (results.length > 0) {
        document.getElementById("foodLocation").value = results[0].name;
        document.getElementById("chosenLocation").textContent = `Selected: ${results[0].name}`;
      } else {
        document.getElementById("foodLocation").value = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        document.getElementById("chosenLocation").textContent = `Selected: (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
      }
    });
  });

  // Draw existing food markers
  drawFoodMarkers();
}

// ----------- HELPER FOR IMAGES -----------
function readImageAsDataURL(file) {
  return new Promise((resolve) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

// ----------- STAR RATING INTERACTIONS -----------
function initStarRatings() {
  // Food rating stars
  const foodStars = document.querySelectorAll('input[name="foodRating"]');
  const foodRatingText = document.getElementById('foodRatingText');

  foodStars.forEach(star => {
    star.addEventListener('change', () => {
      const rating = star.value;
      const ratingText = getRatingText(rating);
      foodRatingText.innerHTML = `<span>${rating} stars</span> - ${ratingText}`;
    });

    star.addEventListener('mouseover', () => {
      const rating = star.value;
      const ratingText = getRatingText(rating);
      foodRatingText.innerHTML = `<span>${rating} stars</span> - ${ratingText}`;
    });
  });

  // Site rating stars
  const siteStars = document.querySelectorAll('input[name="siteRating"]');
  const siteRatingText = document.getElementById('siteRatingText');

  siteStars.forEach(star => {
    star.addEventListener('change', () => {
      const rating = star.value;
      const ratingText = getRatingText(rating);
      siteRatingText.innerHTML = `<span>${rating} stars</span> - ${ratingText}`;
    });

    star.addEventListener('mouseover', () => {
      const rating = star.value;
      const ratingText = getRatingText(rating);
      siteRatingText.innerHTML = `<span>${rating} stars</span> - ${ratingText}`;
    });
  });

  // Reset text when mouse leaves the rating area
  const starContainers = document.querySelectorAll('.star-rating');
  starContainers.forEach(container => {
    container.addEventListener('mouseleave', () => {
      const selected = container.parentElement.querySelector('.rating-text');
      const checked = container.querySelector('input:checked');

      if (checked) {
        const rating = checked.value;
        const text = getRatingText(rating);
        selected.innerHTML = `<span>${rating} stars</span> - ${text}`;
      } else {
        selected.textContent = 'Select a rating';
      }
    });
  });
}

function getRatingText(rating) {
  switch (rating) {
    case '5': return 'Excellent';
    case '4': return 'Very Good';
    case '3': return 'Good';
    case '2': return 'Fair';
    case '1': return 'Poor';
    default: return 'Select a rating';
  }
}

// ----------- FOOD FORM -----------
function wireUpFoodForm() {
  const form = document.getElementById("foodReviewForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const foodName = document.getElementById("foodName").value.trim();
    const restaurantName = document.getElementById("restaurantName").value.trim();
    const foodDescription = document.getElementById("foodDescription").value.trim();
    const foodRatingInput = document.querySelector('input[name="foodRating"]:checked');
    const latVal = document.getElementById("lat").value;
    const lngVal = document.getElementById("lng").value;
    const chosenLocationText = document.getElementById("chosenLocation").textContent;

    // Validate rating
    if (!foodRatingInput) {
      alert("Please select a rating.");
      return;
    }

    // Validate required fields (including location)
    if (!foodName || !restaurantName || !foodDescription) {
      alert("Please complete all fields.");
      return;
    }

    if (!latVal || !lngVal || chosenLocationText.includes("No location selected")) {
      alert("Please select a location on the map or search for one.");
      return;
    }

    const foodRating = Number(foodRatingInput.value);
    const file = document.getElementById("foodImage").files[0];
    const dataUrl = await readImageAsDataURL(file);
    const address = chosenLocationText.replace("Selected: ", "");

    const review = {
      foodName,
      restaurantName,
      description: foodDescription,
      rating: foodRating,
      image: dataUrl || "images/placeholder.jpg",
      location: { lat: parseFloat(latVal), lng: parseFloat(lngVal) },
      address
    };

    const data = loadData(FOOD_KEY);
    data.unshift(review);
    saveData(FOOD_KEY, data);

    renderFoodReviews();
    drawFoodMarkers();
    form.reset();
    document.getElementById("chosenLocation").textContent = "No location selected yet.";

    // Reset stars + marker
    document.querySelectorAll('input[name="foodRating"]').forEach(input => input.checked = false);
    document.getElementById("foodRatingText").textContent = "Select a rating";
    if (pickerMarker) { pickerMarker.remove(); pickerMarker = null; }
  });
}


// ----------- WEBSITE REVIEWS -----------
function renderSiteReviews() {
  const listEl = document.getElementById("siteReviewsList");
  const data = loadData(SITE_KEY);
  listEl.innerHTML = data.map(r => `
    <div class="review-card">
      <h4>${r.name}</h4>
      <p>${r.feedback}</p>
      <p><strong>Rating:</strong> ${stars(r.rating)}</p>
    </div>
  `).join("");
}

function wireUpSiteForm() {
  const form = document.getElementById("siteReviewForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("userName").value.trim();
    const feedback = document.getElementById("siteFeedback").value.trim();
    const ratingInput = document.querySelector('input[name="siteRating"]:checked');

    // Check if rating is selected
    if (!ratingInput) {
      alert("Please select a rating.");
      return;
    }

    const rating = Number(ratingInput.value);

    if (!name || !feedback || !rating) {
      alert("Please complete all fields.");
      return;
    }

    const review = { name, feedback, rating };
    const data = loadData(SITE_KEY);
    data.unshift(review);
    saveData(SITE_KEY, data);

    renderSiteReviews();
    form.reset();

    // Clear star selection
    document.querySelectorAll('input[name="siteRating"]').forEach(input => {
      input.checked = false;
    });
    document.getElementById("siteRatingText").textContent = "Select a rating";
  });
}
// ----------- FILTERING ----------- 
function applyFoodFilters() {
  const keyword = document.getElementById("filterKeyword").value.toLowerCase();
  const restaurant = document.getElementById("filterRestaurant").value.toLowerCase();
  const selectedRating = document.getElementById("filterRating").value; // can be "all" or "1".."5"

  const allReviews = loadData(FOOD_KEY);

  // Filter reviews
  const filtered = allReviews.filter(r => {
    const matchesKeyword = !keyword || r.foodName.toLowerCase().includes(keyword) || r.description.toLowerCase().includes(keyword);
    const matchesRestaurant = !restaurant || (r.restaurantName && r.restaurantName.toLowerCase().includes(restaurant));
    const matchesRating = (selectedRating === "" || selectedRating === "all")
      ? true
      : r.rating === Number(selectedRating);
    return matchesKeyword && matchesRestaurant && matchesRating;
  });

  // Render filtered reviews
  const listEl = document.getElementById("foodReviewsList");
  listEl.innerHTML = filtered.map(r => {
    const locationText = r.address || `${r.location.lat.toFixed(4)}, ${r.location.lng.toFixed(4)}`;
    const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(locationText)}`;
    return `
      <div class="review-card">
        <img src="${r.image}" alt="${r.foodName}">
        <h4>${r.foodName}</h4>
        <p><strong>Restaurant:</strong> ${r.restaurantName || 'Unknown'}</p>
        <p>${r.description}</p>
        <p><strong>Rating:</strong> ${stars(r.rating)}</p>
        <p class="location-info">
          <i class="fas fa-map-marker-alt"></i> 
          <a href="${mapsUrl}" target="_blank">${locationText}</a>
        </p>
      </div>
    `;
  }).join("");

  // Update markers
  reviewMarkers.forEach(m => pickerMap.removeLayer(m));
  reviewMarkers = [];
  filtered.forEach(r => {
    if (r.location) {
      const marker = L.marker([r.location.lat, r.location.lng])
        .addTo(pickerMap)
        .bindPopup(`<b>${r.foodName}</b><br>${stars(r.rating)}<br>${r.address || ""}`);
      reviewMarkers.push(marker);
    }
  });
}


// Wire filter buttons
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("applyFilter").addEventListener("click", applyFoodFilters);
  document.getElementById("resetFilter").addEventListener("click", () => {
    document.getElementById("filterKeyword").value = "";
    document.getElementById("filterRestaurant").value = "";
    document.getElementById("filterRating").value = "";
    renderFoodReviews();
    drawFoodMarkers();
  });
});

// ----------- INIT -----------
document.addEventListener("DOMContentLoaded", () => {
  seedSampleData();
  initPickerMap();
  renderFoodReviews();
  renderSiteReviews();
  wireUpFoodForm();
  wireUpSiteForm();
  initStarRatings();
  applyFoodFilters();
});