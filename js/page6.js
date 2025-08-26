// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

/* -----------------------
   Map zoom functionality
------------------------ */
let currentZoom = 1;
const minZoom = 0.5;
const maxZoom = 3;

function zoomMap(mapId, factor) {
  const mapContainer = document.getElementById(mapId);
  const mapImage = mapContainer.querySelector('.map-image');
  const markers = mapContainer.querySelector('.map-markers');

  currentZoom *= factor;
  currentZoom = Math.max(minZoom, Math.min(maxZoom, currentZoom));

  mapImage.style.transform = `scale(${currentZoom})`;
  markers.style.transform = `scale(${currentZoom})`;
}

// Initialize zoom controls
document.addEventListener('DOMContentLoaded', function() {
  const zoomInBtn = document.getElementById('zoom-in');
  const zoomOutBtn = document.getElementById('zoom-out');

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => zoomMap('interactive-map', 1.2));
  }
  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => zoomMap('interactive-map', 0.8));
  }

  // Mouse wheel zoom
  const mapContainer = document.getElementById('interactive-map');
  if (mapContainer) {
    mapContainer.addEventListener('wheel', function(e) {
      e.preventDefault();
      const factor = e.deltaY > 0 ? 0.9 : 1.1;
      zoomMap('interactive-map', factor);
    });

    // Touch/pan support for mobile
    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;

    mapContainer.addEventListener('mousedown', function(e) {
      isDragging = true;
      startX = e.pageX - mapContainer.offsetLeft;
      startY = e.pageY - mapContainer.offsetTop;
      scrollLeft = mapContainer.scrollLeft;
      scrollTop = mapContainer.scrollTop;
      mapContainer.style.cursor = 'grabbing';
    });

    mapContainer.addEventListener('mouseleave', function() {
      isDragging = false;
      mapContainer.style.cursor = 'grab';
    });

    mapContainer.addEventListener('mouseup', function() {
      isDragging = false;
      mapContainer.style.cursor = 'grab';
    });

    mapContainer.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - mapContainer.offsetLeft;
      const y = e.pageY - mapContainer.offsetTop;
      const walkX = (x - startX) * 2;
      const walkY = (y - startY) * 2;
      mapContainer.scrollLeft = scrollLeft - walkX;
      mapContainer.scrollTop = scrollTop - walkY;
    });
  }
});

/* -----------------------
   Region data
------------------------ */
const regionData = {
  america: {
    name: 'America',
    description: 'A continent in the Western Hemisphere, comprising North and South America.',
  },
  europe: {
    name: 'Europe',
    description: 'A continent located entirely in the Northern Hemisphere and mostly in the Eastern Hemisphere.',
  },
  africa: {
    name: 'Africa',
    description: "The world's second-largest and second-most-populous continent.",
  },
  asia: {
    name: 'Asia',
    description: "Earth's largest and most populous continent, located primarily in the Eastern and Northern Hemispheres.",
  },
  oceania: {
    name: 'Oceania',
    description: 'A geographic region that includes Australasia, Melanesia, Micronesia, and Polynesia.',
  },
  malaysia: {
    name: 'Malaysia',
    description: 'A Southeast Asian country known for its diverse street food culture, blending Malay, Chinese, Indian, and indigenous influences.',
  },
};

/* -----------------------
   UI helpers
------------------------ */
function showRegionInfo(regionId) {
  // Hide all content sections (both region and state content)
  const allContentSections = document.querySelectorAll('.region-content, .state-content');
  allContentSections.forEach(section => {
    section.style.display = 'none';
  });

  // Hide Malaysia map if it's showing
  const malaysiaSection = document.getElementById('malaysia-map');
  if (malaysiaSection.style.display !== 'none') {
    malaysiaSection.style.display = 'none';
    document.getElementById('maps').style.display = 'flex';
  }

  // Show the selected region content section
  const targetSection = document.getElementById(`${regionId}-content`);
  if (targetSection) {
    targetSection.style.display = 'block';

    // Smooth scroll to the content section
    setTimeout(() => {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  } else {
    alert('Information for this region is not available.');
  }
}



function toggleMenu(){
  const menu = document.getElementById('main-nav');
  const toggle = document.querySelector('.nav-toggle');
  menu.classList.toggle('active');
  toggle.setAttribute('aria-expanded', menu.classList.contains('active'));
}


/* Close mobile menu when clicking outside */
document.addEventListener('click',(e)=>{
  const menu = document.getElementById('main-nav');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if(!nav.contains(e.target) && menu.classList.contains('active')){
    menu.classList.remove('active');
    toggle.setAttribute('aria-expanded','false');
  }
});

/* Header background on scroll */
const header = document.querySelector('.site-header');
window.addEventListener('scroll', ()=>{
  const y = window.scrollY;
  header.style.background = y>100 ? 'rgba(254,250,224,.98)' : 'rgba(254,250,224,.95)';
  header.style.boxShadow = y>100 ? '0 4px 20px rgba(0,0,0,.1)' : 'none';
});

/* Smooth scrolling for any normal hash links */
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if(href === '#' || href.includes('onclick')) return; // ignore JS links
    e.preventDefault();
    const target = document.querySelector(href);
    if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

/* Animate cards & team when in view */
if('IntersectionObserver' in window){
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){ entry.target.style.animationPlayState = 'running'; }
    });
  }, {threshold:0.1, rootMargin:'0px 0px -50px 0px'});

  document.querySelectorAll('.card, .member').forEach(el=>observer.observe(el));
}

/* ESC closes mobile menu */
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){
    const menu = document.getElementById('main-nav');
    const toggle = document.querySelector('.nav-toggle');
    if(menu.classList.contains('active')){
      menu.classList.remove('active');
      toggle.setAttribute('aria-expanded','false');
      toggle.focus();
    }
  }
});

/* Keyboard support on buttons */
document.querySelectorAll('.btn').forEach(btn=>{
  btn.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      btn.click();
    }
  });
});

// Initialize Malaysia states button
document.addEventListener('DOMContentLoaded', function() {
  const showMalaysiaBtn = document.getElementById('show-malaysia-btn');
  if (showMalaysiaBtn) {
    showMalaysiaBtn.addEventListener('click', showMalaysiaMap);
  }
});



/* Performance hint */
if('performance' in window){
  window.addEventListener('load', ()=>{
    setTimeout(()=>{
      const nav = performance.getEntriesByType('navigation')[0];
      if(nav && (nav.loadEventEnd - nav.loadEventStart > 3000)){
        console.warn('Page load time exceeded 3 seconds');
      }
    }, 0);
  });
}

/* Prevent dummy links from jumping */
document.querySelectorAll('a[href="#"]').forEach(link=>{
  link.addEventListener('click',(e)=>{
    if(!link.hasAttribute('onclick')) e.preventDefault();
  });
});

/* -----------------------
   Malaysia Map Functions
------------------------ */

// Malaysia states data
const malaysiaStates = [
  { name: "Johor", capital: "Johor Bahru", lat: 1.4927, lng: 103.7414 },
  { name: "Kedah", capital: "Alor Setar", lat: 6.1248, lng: 100.3678 },
  { name: "Kelantan", capital: "Kota Bharu", lat: 6.1254, lng: 102.2386 },
  { name: "Kuala Lumpur", capital: "Kuala Lumpur", lat: 3.1390, lng: 101.6869 },
  { name: "Labuan", capital: "Victoria", lat: 5.2831, lng: 115.2308 },
  { name: "Malacca", capital: "Malacca City", lat: 2.2066, lng: 102.2501 },
  { name: "Negeri Sembilan", capital: "Seremban", lat: 2.7297, lng: 101.9381 },
  { name: "Pahang", capital: "Kuantan", lat: 3.8077, lng: 103.3260 },
  { name: "Penang", capital: "George Town", lat: 5.4141, lng: 100.3288 },
  { name: "Perak", capital: "Ipoh", lat: 4.5975, lng: 101.0901 },
  { name: "Perlis", capital: "Kangar", lat: 6.4414, lng: 100.1986 },
  { name: "Putrajaya", capital: "Putrajaya", lat: 2.9264, lng: 101.6964 },
  { name: "Sabah", capital: "Kota Kinabalu", lat: 5.9804, lng: 116.0735 },
  { name: "Sarawak", capital: "Kuching", lat: 1.5533, lng: 110.3592 },
  { name: "Selangor", capital: "Shah Alam", lat: 3.0733, lng: 101.5185 },
  { name: "Terengganu", capital: "Kuala Terengganu", lat: 5.3302, lng: 103.1408 }
];

// Malaysia states data


function showMalaysiaMap() {
  // Hide all content sections first
  const allContentSections = document.querySelectorAll('.region-content, .state-content');
  allContentSections.forEach(section => {
    section.style.display = 'none';
  });

  // Hide world map section
  document.getElementById('maps').style.display = 'none';

  // Show Malaysia map section
  const malaysiaSection = document.getElementById('malaysia-map');
  malaysiaSection.style.display = 'block';

  // Always populate the states list when this section is shown
  populateStatesList();

  // Smooth scroll to Malaysia section
  malaysiaSection.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

function backToWorld() {
  // Hide Malaysia map section
  document.getElementById('malaysia-map').style.display = 'none';
  // Show world map section
  document.getElementById('maps').style.display = 'flex';

  // Hide all region/state content sections
  const allContentSections = document.querySelectorAll('.region-content, .state-content');
  allContentSections.forEach(section => {
    section.style.display = 'none';
  });

  // Smooth scroll to world map section
  document.getElementById('maps').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

function populateStatesList() {
  const statesList = document.getElementById('msia-states');
  statesList.innerHTML = '';

  // Sort states alphabetically
  const sortedStates = [...malaysiaStates].sort((a, b) => a.name.localeCompare(b.name));

  sortedStates.forEach(state => {
    const stateChip = document.createElement('div');
    stateChip.className = 'chip state-chip';
    stateChip.setAttribute('data-state', state.name.toLowerCase().replace(/\s+/g, '-'));
    stateChip.innerHTML = `
      <strong>${state.name}</strong><br>
      <small>Capital: ${state.capital}</small>
      <div class="state-action">
        <button class="btn-small" onclick="showStateContent({name:'${state.name}', capital:'${state.capital}', lat:${state.lat}, lng:${state.lng}})">
          View Street Food
        </button>
      </div>
    `;

    // Add click event to show state content
    stateChip.addEventListener('click', () => {
      showStateContent(state);
    });

    statesList.appendChild(stateChip);
  });
}

function showStateInfo(state) {
  const message = `
🏛️ ${state.name}

📍 Capital: ${state.capital}
🗺️ Coordinates: ${state.lat.toFixed(4)}, ${state.lng.toFixed(4)}

This state is part of Malaysia's rich cultural and culinary heritage. Each region offers unique local specialties and street food traditions.

Click "Explore Local Food" to discover street food vendors in this area.
  `;
  alert(message);
}

function showStateContent(state) {
  // Hide all content sections first
  const allContentSections = document.querySelectorAll('.region-content, .state-content');
  allContentSections.forEach(section => {
    section.style.display = 'none';
  });

  // Create state ID for content section
  const stateId = state.name.toLowerCase().replace(/\s+/g, '-');
  const targetSection = document.getElementById(`${stateId}-content`);

  if (targetSection) {
    targetSection.style.display = 'block';

    // Smooth scroll to the content section
    setTimeout(() => {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  } else {
    // If no specific content section exists, show a generic message
    alert(`Detailed information about ${state.name}'s street food will be available soon!`);
  }
}
