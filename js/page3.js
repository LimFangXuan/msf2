document.addEventListener("DOMContentLoaded", () => {
    const foodData = [
        {
            id: 1,
            title: "Nasi Lemak",
            desc: "Fragrant rice with sambal.",
            img: "images/nasi-lemak.jpg",
            state: "selangor",
            ethnicity: "malay",
            type: "rice",
            rating: 4.7,
            tags: ["Spicy", "Rice", "Breakfast"]
        },
        {
            id: 2,
            title: "Satay",
            desc: "Grilled meat skewers.",
            img: "images/satay.jpg",
            state: "malacca",
            ethnicity: "malay",
            type: "snack",
            rating: 4.8,
            tags: ["Grilled", "Skewers", "Meat"]
        },
        {
            id: 3,
            title: "Char Kway Teow",
            desc: "Stir-fried noodles.",
            img: "images/char-kway-teow.jpg",
            state: "penang",
            ethnicity: "chinese",
            type: "noodle",
            rating: 4.6,
            tags: ["Seafood", "Penang", "Fried"]
        },
        {
            id: 4,
            title: "Roti Canai",
            desc: "Flaky flatbread with curry.",
            img: "images/roti-canai.jpg",
            state: "kuala-lumpur",
            ethnicity: "indian",
            type: "snack",
            rating: 4.4,
            tags: ["Bread", "Curry", "Breakfast"]
        },
        {
            id: 5,
            title: "Teh Tarik",
            desc: "Creamy pulled milk tea.",
            img: "images/teh-tarik.jpg",
            state: "selangor",
            ethnicity: "indian",
            type: "drink",
            rating: 4.3,
            tags: ["Drink", "Sweet", "Popular"]
        },
        {
            id: 6,
            title: "Mee Bandung Muar",
            desc: "Spicy prawn-based noodle soup.",
            img: "images/mee-bandung-muar.jpg",
            state: "johor",
            ethnicity: "malay",
            type: "noodle",
            rating: 4.5,
            tags: ["Soup", "Spicy", "Seafood"]
        },
        {
            id: 7,
            title: "Ipoh Hor Fun",
            desc: "Flat rice noodles in clear chicken broth.",
            img: "images/ipoh-hor-fun.jpg",
            state: "perak",
            ethnicity: "chinese",
            type: "noodle",
            rating: 4.2,
            tags: ["Light", "Soup", "Chicken"]
        },
        {
            id: 8,
            title: "Asam Laksa",
            desc: "Tangy fish broth with noodles & herbs.",
            img: "images/asam-laksa.jpg",
            state: "penang",
            ethnicity: "chinese",
            type: "noodle",
            rating: 4.6,
            tags: ["Sour", "Spicy", "Fish"]
        },
        {
            id: 9,
            title: "Popiah",
            desc: "Fresh spring roll with vegetables/meat.",
            img: "images/popiah.jpg",
            state: "",
            ethnicity: "chinese",
            type: "snack",
            rating: 4.1,
            tags: ["Fresh", "Vegetables", "Snack"]
        },
        {
            id: 10,
            title: "Nasi Kandar",
            desc: "Rice with curry dishes, Indian Muslim style.",
            img: "images/nasi-kandar.jpg",
            state: "penang",
            ethnicity: "indian",
            type: "rice",
            rating: 4.7,
            tags: ["Rice", "Curry", "Spicy"]
        },
        { id: 11, title: "Cendol", desc: "Shaved ice with coconut milk, gula melaka, green jelly.", img: "images/cendol.jpg", state: "malacca", ethnicity: "malay", type: "dessert", rating: 4.7, tags: ["Sweet", "Cold", "Traditional"] },
        { id: 12, title: "Mee Kolok", desc: "Dry tossed noodles with soy & minced beef.", img: "images/mee-kolok.jpg", state: "sarawak", ethnicity: "chinese", type: "noodle", rating: 4.5, tags: ["Dry", "Noodle", "Savory"] },
        { id: 13, title: "Laksa Sarawak", desc: "Aromatic broth with rice vermicelli & prawns.", img: "images/laksa-sarawak.jpg", state: "sarawak", ethnicity: "malay", type: "noodle", rating: 4.8, tags: ["Spicy", "Seafood", "Soup"] },
        { id: 15, title: "Kuih Lapis", desc: "Steamed colorful layered cake.", img: "images/kuih-lapis.jpg", state: "selangor", ethnicity: "malay", type: "dessert", rating: 4.3, tags: ["Sweet", "Cake", "Traditional"] },
        { id: 16, title: "Rojak", desc: "Mixed fruits & vegetables with spicy sauce.", img: "images/rojak.jpg", state: "kuala-lumpur", ethnicity: "indian", type: "snack", rating: 4.4, tags: ["Spicy", "Fruits", "Street Food"] },
        { id: 17, title: "Nasi Dagang", desc: "Steamed rice with tuna curry, traditional east coast dish.", img: "images/nasi-dagang.jpg", state: "terengganu", ethnicity: "malay", type: "rice", rating: 4.6, tags: ["Rice", "Curry", "Traditional"] },
        { id: 18, title: "Keropok Lekor", desc: "Fried fish sausage snack.", img: "images/keropok-lekor.jpg", state: "terengganu", ethnicity: "malay", type: "snack", rating: 4.5, tags: ["Snack", "Fish", "Fried"] },
        { id: 19, title: "Pasembur", desc: "Indian Muslim salad with fritters, tofu & sweet sauce.", img: "images/pasembur.jpg", state: "penang", ethnicity: "indian", type: "snack", rating: 4.4, tags: ["Salad", "Fritters", "Sweet"] },
        { id: 20, title: "Nasi Kerabu", desc: "Blue rice with herbs, fish, and crackers.", img: "images/nasi-kerabu.jpg", state: "kelantan", ethnicity: "malay", type: "rice", rating: 4.7, tags: ["Herbs", "Rice", "Colorful"] },
        { id: 21, title: "Lok Lok", desc: "Skewered food dipped in boiling soup & sauces.", img: "images/lok-lok.jpg", state: "penang", ethnicity: "chinese", type: "snack", rating: 4.6, tags: ["Skewers", "Street Food", "Soup"] },
        { id: 22, title: "Hainanese Chicken Rice", desc: "Poached chicken with fragrant rice.", img: "images/hainanese-chicken-rice.jpg", state: "kuala-lumpur", ethnicity: "chinese", type: "rice", rating: 4.8, tags: ["Chicken", "Rice", "Classic"] },
        { id: 23, title: "Murtabak", desc: "Stuffed fried pancake with meat & egg.", img: "images/murtabak.jpg", state: "negeri-sembilan", ethnicity: "indian", type: "snack", rating: 4.5, tags: ["Stuffed", "Fried", "Savory"] },
        { id: 24, title: "Sup Tulang Merah", desc: "Spicy red mutton bone soup.", img: "images/sup-tulang-merah.jpg", state: "johor", ethnicity: "indian", type: "soup", rating: 4.3, tags: ["Soup", "Spicy", "Mutton"] },
        { id: 25, title: "Nasi Ulam", desc: "Rice mixed with raw herbs and spices.", img: "images/nasi-ulam.jpg", state: "kedah", ethnicity: "malay", type: "rice", rating: 4.4, tags: ["Herbs", "Rice", "Fresh"] },
        { id: 26, title: "Mee Rebus", desc: "Yellow noodles in thick sweet potato-based gravy.", img: "images/mee-rebus.jpg", state: "johor", ethnicity: "malay", type: "noodle", rating: 4.5, tags: ["Noodle", "Sweet", "Gravy"] },
        { id: 27, title: "Yong Tau Foo", desc: "Stuffed tofu and vegetables in soup.", img: "images/yong-tau-foo.jpg", state: "perak", ethnicity: "chinese", type: "soup", rating: 4.6, tags: ["Tofu", "Vegetables", "Soup"] },
        { id: 28, title: "Nasi Briyani Gam", desc: "Spiced rice with lamb or chicken.", img: "images/nasi-briyani-gam.jpg", state: "johor", ethnicity: "indian", type: "rice", rating: 4.7, tags: ["Rice", "Spicy", "Indian"] },
        { id: 29, title: "Kuih Seri Muka", desc: "Glutinous rice topped with pandan custard.", img: "images/kuih-seri-muka.jpg", state: "kedah", ethnicity: "malay", type: "dessert", rating: 4.4, tags: ["Sweet", "Pandan", "Cake"] },
        { id: 30, title: "Maggi Goreng Mamak", desc: "Stir-fried instant noodles with egg & vegetables.", img: "images/maggi-goreng.jpg", state: "kuala-lumpur", ethnicity: "indian", type: "noodle", rating: 4.3, tags: ["Noodle", "Fried", "Street Food"] },
        { id: 31, title: "Nasi Kukus", desc: "Steamed rice served with fried chicken & curry.", img: "images/nasi-kukus.jpg", state: "pahang", ethnicity: "malay", type: "rice", rating: 4.5, tags: ["Rice", "Chicken", "Curry"] },
        { id: 32, title: "Tau Fu Fah", desc: "Soft soybean pudding with syrup.", img: "images/tau-fu-fah.jpg", state: "perak", ethnicity: "chinese", type: "dessert", rating: 4.6, tags: ["Sweet", "Soft", "Traditional"] },
        { id: 33, title: "Mee Jawa", desc: "Noodles in sweet-spicy tomato-based soup.", img: "images/mee-jawa.jpg", state: "selangor", ethnicity: "malay", type: "noodle", rating: 4.4, tags: ["Soup", "Noodle", "Sweet-Spicy"] },
        { id: 34, title: "Pulut Panggang", desc: "Grilled glutinous rice with spicy filling.", img: "images/pulut-panggang.jpg", state: "negeri-sembilan", ethnicity: "malay", type: "snack", rating: 4.5, tags: ["Grilled", "Rice", "Spicy"] },
        { id: 35, title: "Apam Balik", desc: "Peanut-filled pancake turnover.", img: "images/apam-balik.jpg", state: "penang", ethnicity: "chinese", type: "dessert", rating: 4.6, tags: ["Sweet", "Peanut", "Pancake"] },
        { id: 36, title: "Laksa Johor", desc: "Spaghetti noodles with fish-based curry.", img: "images/laksa-johor.jpg", state: "johor", ethnicity: "malay", type: "noodle", rating: 4.7, tags: ["Spicy", "Curry", "Fish"] },
        { id: 37, title: "Nasi Himpit", desc: "Compressed rice cakes with peanut sauce.", img: "images/nasi-himpit.jpg", state: "selangor", ethnicity: "malay", type: "snack", rating: 4.3, tags: ["Rice", "Snack", "Peanut Sauce"] },
        { id: 38, title: "Kuih Ketayap", desc: "Pandan crepe with grated coconut & palm sugar.", img: "images/kuih-ketayap.jpg", state: "malacca", ethnicity: "malay", type: "dessert", rating: 4.5, tags: ["Sweet", "Pandan", "Traditional"] },
        { id: 39, title: "Bubur Lambuk", desc: "Spiced rice porridge, often during Ramadan.", img: "images/bubur-lambuk.jpg", state: "kuala-lumpur", ethnicity: "malay", type: "soup", rating: 4.4, tags: ["Rice", "Porridge", "Spiced"] },
        { id: 40, title: "Lemang", desc: "Glutinous rice cooked in bamboo with coconut milk.", img: "images/lemang.jpg", state: "pahang", ethnicity: "malay", type: "rice", rating: 4.6, tags: ["Traditional", "Rice", "Bamboo"] },
        { id: 41, title: "Mee Soto", desc: "Noodle soup with chicken & spices.", img: "images/mee-soto.jpg", state: "johor", ethnicity: "malay", type: "noodle", rating: 4.5, tags: ["Soup", "Chicken", "Spicy"] },
        { id: 42, title: "Kuih Cakar Ayam", desc: "Crispy traditional fried snack.", img: "images/kuih-cakar-ayam.jpg", state: "kelantan", ethnicity: "malay", type: "snack", rating: 4.2, tags: ["Snack", "Crispy", "Traditional"] },
        { id: 43, title: "Roti John", desc: "Omelette sandwich with minced meat.", img: "images/roti-john.jpg", state: "selangor", ethnicity: "indian", type: "snack", rating: 4.4, tags: ["Bread", "Egg", "Savory"] },
        { id: 44, title: "Mee Siam", desc: "Spicy stir-fried rice vermicelli.", img: "images/mee-siam.jpg", state: "selangor", ethnicity: "malay", type: "noodle", rating: 4.5, tags: ["Spicy", "Noodle", "Stir-fried"] },
        { id: 45, title: "Kuih Bahulu", desc: "Small sponge cake snack.", img: "images/kuih-bahulu.jpg", state: "negeri-sembilan", ethnicity: "malay", type: "dessert", rating: 4.3, tags: ["Sweet", "Cake", "Traditional"] },
        { id: 46, title: "Banana Leaf Rice", desc: "Rice with curries and vegetables on banana leaf.", img: "images/banana-leaf-rice.jpg", state: "kuala-lumpur", ethnicity: "indian", type: "rice", rating: 4.7, tags: ["Rice", "Curry", "Traditional"] },
        { id: 47, title: "Nasi Ayam Penyet", desc: "Smashed fried chicken with rice & sambal.", img: "images/nasi-ayam-penyet.jpg", state: "johor", ethnicity: "malay", type: "rice", rating: 4.6, tags: ["Rice", "Chicken", "Spicy"] },
        { id: 48, title: "Kuih Ondeh-Ondeh", desc: "Glutinous rice balls with palm sugar filling.", img: "images/ondeh-ondeh.jpg", state: "malacca", ethnicity: "malay", type: "dessert", rating: 4.5, tags: ["Sweet", "Palm Sugar", "Traditional"] },
        { id: 49, title: "Ikan Bakar", desc: "Grilled fish with spicy sambal.", img: "images/ikan-bakar.jpg", state: "selangor", ethnicity: "malay", type: "snack", rating: 4.6, tags: ["Grilled", "Fish", "Spicy"] },
        { id: 50, title: "Ais Kacang", desc: "Shaved ice with beans, corn, jelly & syrup.", img: "images/ais-kacang.jpg", state: "penang", ethnicity: "chinese", type: "dessert", rating: 4.7, tags: ["Sweet", "Cold", "Colorful"] },
        { id: 51, title: "Sirap Bandung", desc: "Rose syrup with milk, sweet and refreshing.", img: "images/sirap-bandung.jpg", state: "selangor", ethnicity: "malay", type: "drink", rating: 4.4, tags: ["Sweet", "Drink", "Refreshing"] },
        { id: 53, title: "Milo Dinosaur", desc: "Iced Milo topped with extra Milo powder.", img: "images/milo-dinosaur.jpg", state: "kuala-lumpur", ethnicity: "malay", type: "drink", rating: 4.5, tags: ["Sweet", "Chocolate", "Drink"] },
        { id: 54, title: "Air Mata Kucing", desc: "Herbal drink with dried longan and luo han guo.", img: "images/air-mata-kucing.jpg", state: "kuala-lumpur", ethnicity: "chinese", type: "drink", rating: 4.3, tags: ["Herbal", "Drink", "Cooling"] },
        { id: 55, title: "Sugarcane Juice", desc: "Freshly pressed sugarcane juice.", img: "images/sugarcane-juice.jpg", state: "malacca", ethnicity: "chinese", type: "drink", rating: 4.6, tags: ["Fresh", "Sweet", "Drink"] },
        { id: 56, title: "Cincau Drink", desc: "Grass jelly drink with syrup or milk.", img: "images/cincau-drink.jpg", state: "selangor", ethnicity: "malay", type: "drink", rating: 4.4, tags: ["Jelly", "Drink", "Sweet"] },
        { id: 57, title: "Sup Kambing", desc: "Spiced mutton soup, rich and aromatic.", img: "images/sup-kambing.jpg", state: "kedah", ethnicity: "indian", type: "soup", rating: 4.5, tags: ["Soup", "Mutton", "Spiced"] },
        { id: 58, title: "Bak Kut Teh", desc: "Herbal pork rib soup, Klang specialty.", img: "images/bak-kut-teh.jpg", state: "selangor", ethnicity: "chinese", type: "soup", rating: 4.8, tags: ["Herbal", "Pork", "Soup"] },
        { id: 61, title: "Tom Yam", desc: "Spicy and sour Thai-style soup popular in Malaysia.", img: "images/tom-yam.jpg", state: "kelantan", ethnicity: "thai-malay", type: "soup", rating: 4.7, tags: ["Spicy", "Sour", "Soup"] },
        { id: 62, title: "Fish Head Curry", desc: "Curry soup with fish head and vegetables.", img: "images/fish-head-curry.jpg", state: "kuala-lumpur", ethnicity: "indian", type: "soup", rating: 4.6, tags: ["Curry", "Fish", "Spicy"] },
        { id: 64, title: "Nasi Kebuli Pahang", desc: "Fragrant spiced rice with lamb or chicken.", img: "images/nasi-kebuli.jpg", state: "pahang", ethnicity: "malay", type: "rice", rating: 4.7, tags: ["Rice", "Spiced", "Traditional"] },
        { id: 65, title: "Sira Pisang", desc: "Banana cooked in sweet coconut milk syrup.", img: "images/sira-pisang.jpg", state: "pahang", ethnicity: "malay", type: "dessert", rating: 4.2, tags: ["Banana", "Sweet", "Traditional"] },
        { id: 66, title: "Pulut Mangga", desc: "Glutinous rice with mango and coconut milk.", img: "images/pulut-mangga.jpg", state: "perlis", ethnicity: "malay", type: "dessert", rating: 4.6, tags: ["Mango", "Rice", "Sweet"] },
        {
            id: 68,
            title: "Pek Nga",
            desc: "Traditional coconut flatbread, often served with curry.",
            img: "images/pek-nga.jpg",
            state: "perlis",
            ethnicity: "malay",
            type: "snack",
            rating: 4.2,
            tags: ["Coconut", "Flatbread", "Curry"]
        },

        {
            id: 69,
            title: "Tuaran Mee",
            desc: "Stir-fried egg noodles, Sabah specialty.",
            img: "images/tuaran-mee.jpg",
            state: "sabah",
            ethnicity: "chinese",
            type: "noodle",
            rating: 4.5,
            tags: ["Noodles", "Stir-fried", "Sabah"]
        },

        {
            id: 70,
            title: "Ngiu Chap",
            desc: "Beef noodle soup with mixed beef parts.",
            img: "images/ngiu-chap.jpg",
            state: "sabah",
            ethnicity: "chinese",
            type: "soup",
            rating: 4.7,
            tags: ["Beef", "Soup", "Sabah"]
        }

    ];

    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    const foodContainer = document.getElementById("food-container");
    const stateFilter = document.getElementById("state-filter");
    const ethnicityFilter = document.getElementById("ethnicity-filter");
    const typeFilter = document.getElementById("type-filter");
    const searchInput = document.getElementById("search-input");
    const favList = document.getElementById("favourite-list");

    // ---------- Random 功能 ----------
    const randomBtn = document.getElementById("random-btn");
    const popup = document.getElementById("random-popup");
    const popupFood = document.getElementById("popup-food");
    const popupOk = document.getElementById("popup-ok");
    const popupClose = document.getElementById("popup-close");


    function renderFood() {
        const stateVal = stateFilter.value;
        const ethVal = ethnicityFilter.value;
        const typeVal = typeFilter.value;
        const searchVal = searchInput.value.toLowerCase();

        foodContainer.innerHTML = "";

        const filtered = foodData.filter(item => {
            return (!stateVal || item.state === stateVal) &&
                (!ethVal || item.ethnicity === ethVal) &&
                (!typeVal || item.type === typeVal) &&
                (item.title.toLowerCase().includes(searchVal));
        });

        filtered.forEach(item => {
            const isFav = favourites.includes(item.id);
            const card = document.createElement("div");
            card.className = "food-card";
            card.setAttribute("data-id", item.id);

            const tagsHTML = item.tags ? item.tags.map(tag => `<span class="food-tag">${tag}</span>`).join("") : "";
            card.innerHTML = `
            <button class="heart-btn">${isFav ? "♥" : "♡"}</button>
            <div class="food-img-wrapper">
                <img src="${item.img}" alt="${item.title}">
            </div>
            <div class="food-content">
                <div class="food-header">
                    <h4>${item.title}</h4>
                    <div class="food-rating">⭐ ${item.rating || "4.5"}</div>
                </div>
                <p>${item.desc}</p>
                <div class="food-tags">
                    ${tagsHTML}
                </div>
            </div>
        `;
            foodContainer.appendChild(card);
        });
    }

    function updateFavouritesPanel() {
        favList.innerHTML = "";
        favourites.forEach(id => {
            const food = foodData.find(f => f.id === id);
            if (food) {
                const li = document.createElement("li");
                li.textContent = food.title;
                favList.appendChild(li);
            }
        });
    }

    // 点击收藏按钮
    foodContainer.addEventListener("click", e => {
        if (e.target.classList.contains("heart-btn")) {
            const card = e.target.closest(".food-card");
            const foodId = parseInt(card.getAttribute("data-id"));
            if (favourites.includes(foodId)) {
                favourites = favourites.filter(id => id !== foodId);
            } else {
                favourites.push(foodId);
            }
            localStorage.setItem('favourites', JSON.stringify(favourites));
            renderFood();
            updateFavouritesPanel();
        }
    });

    // 监听筛选和搜索
    stateFilter.addEventListener("change", renderFood);
    ethnicityFilter.addEventListener("change", renderFood);
    typeFilter.addEventListener("change", renderFood);
    searchInput.addEventListener("input", renderFood);

    // 左侧面板开关
    document.getElementById("menu-toggle").addEventListener("click", () => {
        document.querySelector(".page-container").classList.toggle("collapsed");
    });

    // 初始化
    renderFood();
    updateFavouritesPanel();


    // 弹窗控制
    function openPopup() {
        popup.classList.add("show");
        popup.setAttribute("aria-hidden", "false");
        popup.querySelector(".popup-content").classList.add("popup-shake");
        popup.querySelector(".popup-content").addEventListener("animationend", () => {
            popup.querySelector(".popup-content").classList.remove("popup-shake");
        }, { once: true });
    }


    function closePopup() {
        popup.classList.remove("show");
        popup.setAttribute("aria-hidden", "true");
    }

    // 点击 Random：从 favourites 里随机一个 + 动画
    randomBtn.addEventListener("click", () => {
        if (!favourites || favourites.length === 0) {
            alert("No favourites yet! Add some foods first.");
            return;
        }
        const randomId = favourites[Math.floor(Math.random() * favourites.length)];
        const food = foodData.find(f => f.id === randomId);
        if (!food) {
            favourites = favourites.filter(id => id !== randomId);
            localStorage.setItem('favourites', JSON.stringify(favourites));
            alert("One of your favourites no longer exists. Please try again.");
            updateFavouritesPanel();
            return;
        }

        popupFood.innerHTML = `
            <img src="${food.img}" alt="${food.title}">
            <h4>${food.title}</h4>
            <p>${food.desc}</p>
        `;
        openPopup();

        // 🎉 点击 Random 才放彩带
        if (typeof confetti === "function") {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }


        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
        });


        // 给对应的卡片添加动画
        const selectedCard = document.querySelector(`.food-card[data-id="${randomId}"]`);
        if (selectedCard) {
            selectedCard.classList.add("highlight", "animate-shake-zoom");
            selectedCard.addEventListener("animationend", () => {
                selectedCard.classList.remove("animate-shake-zoom");
            }, { once: true });
        }
    });


    // 关闭弹窗
    popupOk.addEventListener("click", closePopup);
    popupClose.addEventListener("click", closePopup);
    popup.addEventListener("click", (e) => {
        if (e.target === popup) closePopup();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closePopup();
    });


});

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const historyList = document.getElementById("search-history");
    const mainSection = document.querySelector("main"); // main 区域

    // 从 localStorage 加载搜索历史
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    // 渲染历史到 datalist
    function renderHistory() {
        historyList.innerHTML = "";
        searchHistory.slice(-5).reverse().forEach(item => { // 最多显示 5 条
            const option = document.createElement("option");
            option.value = item;
            historyList.appendChild(option);
        });
    }

    renderHistory();

    // 监听回车键
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const query = searchInput.value.trim();

            if (query) {
                // 保存搜索记录（去重）
                if (!searchHistory.includes(query)) {
                    searchHistory.push(query);
                    if (searchHistory.length > 20) searchHistory.shift(); // 最多存 20 条
                    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
                }
                renderHistory();
            }

            // 跳转到 main
            mainSection.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Intersection Observer 触发动画
const revealSection = document.querySelector('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
        revealSection.classList.add('active');
        observer.unobserve(revealSection);
    }
  });
},{ threshold: 0.3 });

observer.observe(revealSection);

