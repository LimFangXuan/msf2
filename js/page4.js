$(document).ready(function () {
    const apiBase = "https://www.themealdb.com/api/json/v1/1/";
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    let currentMeals = []; // 当前加载的美食（方便 Random 用）

    const $foodContainer = $("#food-container");
    const $stateFilter = $("#state-filter");   // 改成国家 filter
    const $ethnicityFilter = $("#ethnicity-filter"); // 保留但不启用（API 没有）
    const $typeFilter = $("#type-filter"); // 保留但不启用
    const $searchInput = $("#search-input");
    const $favList = $("#favourite-list");

    const $randomBtn = $("#random-btn");
    const $popup = $("#random-popup");
    const $popupFood = $("#popup-food");
    const $popupOk = $("#popup-ok");
    const $popupClose = $("#popup-close");

    // 更新收藏面板
    function updateFavouritesPanel() {
        $favList.empty();
        favourites.forEach(id => {
            const food = currentMeals.find(f => f.idMeal === id);
            const title = food ? food.strMeal : id;
            $favList.append(`<li>${title}</li>`);
        });
    }

    // 渲染美食卡片
    function renderFood() {
        const searchVal = $searchInput.val().toLowerCase();

        $foodContainer.empty();

        currentMeals
            .filter(item => item.strMeal.toLowerCase().includes(searchVal))
            .forEach(item => {
                const isFav = favourites.includes(item.idMeal);
                const card = $(`
                <div class="food-card" data-id="${item.idMeal}">
                    <div class="food-img-wrapper">
                        <img src="${item.strMealThumb}" alt="${item.strMeal}">
                    </div>
                    <div class="food-content">
                        <div class="food-header">
                            <h4>${item.strMeal}</h4>
                        </div>
                    </div>
                </div>
            `);
                $foodContainer.append(card);
            });
    }

    // 收藏按钮
    $foodContainer.on("click", ".heart-btn", function () {
        const $card = $(this).closest(".food-card");
        const foodId = $card.data("id").toString();

        if (favourites.includes(foodId)) {
            favourites = favourites.filter(id => id !== foodId);
        } else {
            favourites.push(foodId);
        }
        localStorage.setItem("favourites", JSON.stringify(favourites));
        renderFood();
        updateFavouritesPanel();
    });

    // 左侧面板开关
    $("#menu-toggle").on("click", function () {
        $(".page-container").toggleClass("collapsed");
    });

    // 国家筛选（用 TheMealDB API 的地区）
    function loadCountries() {
        $.getJSON(apiBase + "list.php?a=list", function (data) {
            data.meals.forEach(area => {
                $stateFilter.append(`<option value="${area.strArea}">${area.strArea}</option>`);
            });
        });
    }

    // 按国家加载美食
    function loadFoodsByCountry(country) {
        $.getJSON(apiBase + "filter.php?a=" + country, function (data) {
            currentMeals = data.meals || [];
            renderFood();
            updateFavouritesPanel();
        });
    }

    // 监听筛选
    $stateFilter.on("change", function () {
        const country = $(this).val();
        if (country) {
            loadFoodsByCountry(country);
        } else {
            $foodContainer.empty();
            currentMeals = [];
        }
    });

    // 搜索
    $searchInput.on("input", renderFood);

    // 弹窗控制
    function openPopup() {
        $popup.addClass("show").attr("aria-hidden", "false");
        $popup.find(".popup-content").addClass("popup-shake").one("animationend", function () {
            $(this).removeClass("popup-shake");
        });
    }

    function closePopup() {
        $popup.removeClass("show").attr("aria-hidden", "true");
    }

    // Random 功能
    $randomBtn.on("click", function () {
        if (!favourites || favourites.length === 0) {
            alert("No favourites yet! Add some foods first.");
            return;
        }
        const randomId = favourites[Math.floor(Math.random() * favourites.length)];
        const food = currentMeals.find(f => f.idMeal === randomId);

        if (!food) {
            favourites = favourites.filter(id => id !== randomId);
            localStorage.setItem("favourites", JSON.stringify(favourites));
            alert("One of your favourites no longer exists. Please try again.");
            updateFavouritesPanel();
            return;
        }

        $popupFood.html(`
            <img src="${food.strMealThumb}" alt="${food.strMeal}">
            <h4>${food.strMeal}</h4>
            <p>From ${food.strArea}</p>
        `);
        openPopup();

        if (typeof confetti === "function") {
            confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
        }

        const $selectedCard = $(`.food-card[data-id="${randomId}"]`);
        $selectedCard.addClass("highlight animate-shake-zoom").one("animationend", function () {
            $(this).removeClass("animate-shake-zoom");
        });
    });

    // 弹窗关闭
    $popupOk.on("click", closePopup);
    $popupClose.on("click", closePopup);
    $popup.on("click", function (e) {
        if (e.target === this) closePopup();
    });
    $(document).on("keydown", function (e) {
        if (e.key === "Escape") closePopup();
    });

    // 初始化
    loadCountries();
    updateFavouritesPanel();
});
