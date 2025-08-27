// 页面加载完成后执行
$(document).ready(function () {
    // 检查是否已有用户登录信息
    checkUserLoggedIn();

    // 登录按钮点击事件
    $('#loginBtn').click(function () {
        $('#loginContainer').addClass('active');
    });

    // 关闭按钮点击事件
    $('#closeBtn').click(function () {
        $('#loginContainer').removeClass('active');
    });

    // 登录表单提交事件
    $('#submitLogin').click(function () {
        // 获取表单数据
        const name = $('#name').val();
        const email = $('#email').val();
        const password = $('#password').val();

        // 简单验证
        if (!name || !email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // 存储用户信息到Cookies，有效期7天
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);

        document.cookie = `userName=${encodeURIComponent(name)}; expires=${expirationDate.toUTCString()}; path=/`;
        document.cookie = `userEmail=${encodeURIComponent(email)}; expires=${expirationDate.toUTCString()}; path=/`;
        // 实际应用中不应明文存储密码，这里仅为演示
        document.cookie = `userPassword=${encodeURIComponent(password)}; expires=${expirationDate.toUTCString()}; path=/`;

        // 显示欢迎信息
        showWelcomeMessage(name);

        // 关闭表单
        $('#loginForm').hide();
    });

    // 调用API获取食谱数据
    fetchRecipes();

    // 初始化页面动画
    initPageAnimations();

    // 初始化故事卡片动画
    initStoryCardAnimations();

    // 初始化交互效果
    initInteractiveEffects();

    // 初始化美食地图交互
    initFoodMapInteraction();

    // 初始化文化问答系统
    initCultureQuiz();

    // 初始化时间线动画
    initTimelineAnimations();
});

// 初始化页面动画
function initPageAnimations() {
    // 滚动动画观察器
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // 为故事卡片添加延迟动画
                if (entry.target.classList.contains('story-section')) {
                    const cards = entry.target.querySelectorAll('.story-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    document.querySelectorAll('.story-section, .section-intro').forEach(el => {
        observer.observe(el);
    });

    // 初始化故事卡片动画
    initStoryCardAnimations();
}

// 初始化故事卡片动画
function initStoryCardAnimations() {
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
}

// 初始化交互效果
function initInteractiveEffects() {
    // 为故事卡片添加点击波纹效果
    $('.story-card').on('click', function (e) {
        createRippleEffect(e, this);
    });

    // 为标题添加打字机效果
    $('.story-section h2').each(function () {
        const text = $(this).text();
        $(this).html('<span class="typing-text"></span>');

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                $(this).find('.typing-text').text(text.substring(0, i + 1));
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        // 当元素进入视口时开始打字效果
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500);
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(this);
    });

    // 鼠标移动视差效果
    $(document).on('mousemove', function (e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        $('.story-card').each(function (index) {
            const speed = (index + 1) * 0.3;
            const x = (mouseX - 0.5) * speed * 10;
            const y = (mouseY - 0.5) * speed * 10;
            $(this).css('transform', `translate(${x}px, ${y}px)`);
        });
    });
}

// 创建波纹效果
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(231, 116, 9, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
    `;

    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 添加波纹动画CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .typing-text {
        border-right: 2px solid var(--color5);
        animation: blink 0.75s step-end infinite;
    }
    
    @keyframes blink {
        from, to { border-color: transparent }
        50% { border-color: var(--color5) }
    }
`;
document.head.appendChild(rippleStyle);

// 检查用户是否已登录
function checkUserLoggedIn() {
    const cookies = document.cookie.split(';');
    let userName = null;

    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'userName') {
            userName = decodeURIComponent(value);
            break;
        }
    }

    if (userName) {
        showWelcomeMessage(userName);
    }
}

// 显示欢迎信息
function showWelcomeMessage(name) {
    $('#welcomeMessage').html(`
        <h3>Welcome back, ${name}!</h3>
        <p>You are now logged in.</p>
        <button id="logoutBtn">Sign Out</button>
    `).show();

    // 登出按钮点击事件
    $('#logoutBtn').click(function () {
        // 清除Cookies
        document.cookie = 'userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'userPassword=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        // 重新显示登录表单
        $('#welcomeMessage').hide();
        $('#loginForm').show();
        $('#name').val('');
        $('#email').val('');
        $('#password').val('');
    });
}

// 从API获取食谱数据
function fetchRecipes() {
    // 
    const apiKey = "4fb42653e3da430c9b7b5f1e53d1d89d";
    // API请求URL（获取全球街头美食相关食谱）
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=street food&cuisine=global&number=10&apiKey=${apiKey}`;

    // 显示加载状态
    $('#loading').show();

    // 发起API请求
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`API请求失败: ${response.status}`);
            }
            return response.json();
        })

        .then(async data => {
            const recipes = [];
            for (const item of data.results) {
                // 获取食材详情
                const ingredients = await fetchRecipeIngredients(item.id, apiKey);
                recipes.push({
                    label: item.title,
                    image: item.image,
                    source: "Global Street Food",
                    calories: Math.round(item.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || 0),
                    ingredients: ingredients,
                    url: `https://spoonacular.com/recipes/${item.title.replace(/\s+/g, '-')}-${item.id}`
                });
            }
            displayRecipes(recipes);
            $('#loading').hide();
        })
        .catch(error => {
            console.error("获取食谱失败:", error);
            $('#loading').hide();
            // 失败时显示模拟数据作为备用
            const mockRecipes = [{
                label: "Pad Thai",
                image: "images/Pad Thai.jpg",
                source: "Thai Street Food",
                calories: 450,
                ingredients: ["rice noodles", "shrimp", "tofu", "peanuts", "bean sprouts"],
                url: "https://www.recipetineats.com/chicken-pad-thai/"
            },
            {
                label: "Nasi Lemak",
                image: "images/Nasi Lemak.jpg",
                source: "Malaysian Cuisine",
                calories: 520,
                ingredients: ["coconut rice", "sambal", "anchovies", "peanuts", "boiled egg"],
                url: "https://www.marionskitchen.com/nasi-lemak/"
            },
            {
                label: "Tacos al Pastor",
                image: "images/Tacos al Pastor.jpg",
                source: "Mexican Street Food",
                calories: 380,
                ingredients: ["pork", "pineapple", "tortillas", "onions", "cilantro"],
                url: "https://tastesbetterfromscratch.com/tacos-al-pastor/"
            },
            {
                label: "Roti Canai",
                image: "images/Roti Canai2.jpg",
                source: "Malaysian-Indian",
                calories: 420,
                ingredients: ["flour", "water", "oil", "curry sauce"],
                url: "https://www.elmundoeats.com/homemade-roti-canai/"
            },
            {
                label: "Pizza Margherita",
                image: "images/Pizza Margherita.jpg",
                source: "Italian Classic",
                calories: 650,
                ingredients: ["pizza dough", "tomatoes", "mozzarella", "basil", "olive oil"],
                url: "https://www.abeautifulplate.com/the-best-homemade-margherita-pizza/"
            },
            {
                label: "Char Kway Teow",
                image: "images/CharKwayTeow2.jpg",
                source: "Malaysian-Chinese",
                calories: 580,
                ingredients: ["rice noodles", "shrimp", "chinese sausage", "bean sprouts", "eggs"],
                url: "https://www.recipetineats.com/char-kway-teow/"
            },
            {
                label: "Banh Mi",
                image: "images/Banh Mi.jpg",
                source: "Vietnamese Street Food",
                calories: 490,
                ingredients: ["baguette", "pork", "pickled vegetables", "cilantro", "chili"],
                url: "https://www.recipetineats.com/banh-mi-vietnamese-sandwich/"
            },
            {
                label: "Churros",
                image: "images/Churros.jpg",
                source: "Spanish Dessert",
                calories: 320,
                ingredients: ["flour", "water", "butter", "sugar", "cinnamon"],
                url: "https://www.recipetineats.com/spanish-churros-recipe/"
            },
            {
                label: "Samosa",
                image: "images/Samosa.jpg",
                source: "Indian Street Food",
                calories: 280,
                ingredients: ["pastry", "potato", "peas", "spices", "oil"],
                url: "https://www.recipetineats.com/samosa-recipe/#"
            },
            {
                label: "Arepas",
                image: "images/Arepas.jpg",
                source: "Venezuelan/Colombian",
                calories: 350,
                ingredients: ["cornmeal", "cheese", "meat", "avocado", "salsa"],
                url: "https://www.allrecipes.com/recipe/238510/homemade-arepas/"
            }];
            displayRecipes(mockRecipes);
            showNotification("Failed to load recipes. Showing sample data.", "warning");
        });


}

// 为每个食谱获取食材详情
async function fetchRecipeIngredients(recipeId, apiKey) {
    const url = `https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json?apiKey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.ingredients.map(ing => ing.name);
    } catch (error) {
        console.error("获取食材失败:", error);
        return [];
    }
}

// 显示食谱列表
function displayRecipes(recipes) {
    const recipeList = $('#recipeList');
    recipeList.empty();

    recipes.forEach((recipe, index) => {
        // 处理API响应数据结构
        const recipeData = recipe.recipe ? recipe.recipe : recipe;

        const recipeCard = `
            <div class="recipe-card">
                <div class="recipe-image">
                    <img src="${recipeData.image}" alt="${recipeData.label}">
                </div>
                <div class="recipe-content">
                    <h3>${index + 1}. ${recipeData.label}</h3>
                    <div class="recipe-meta">
                        <span><i class="fas fa-utensils"></i> ${recipeData.source}</span>
                        <span><i class="fas fa-fire"></i> ${Math.round(recipeData.calories)} cal</span>
                    </div>
                    <div class="recipe-description" style="display: block;" title="${recipeData.ingredients.join(', ')}">
                        <span class="ingredients-text">Ingredients: ${recipeData.ingredients.slice(0, 3).join(', ')}</span>
                    </div>
                    <button onclick="window.open('${recipeData.url}', '_blank')">View Recipe</button>
                </div>
            </div>
        `;

        recipeList.append(recipeCard);
    });

    // 添加社交媒体分享按钮
    addSocialMediaPlugins();
}

// 添加社交媒体插件
function addSocialMediaPlugins() {
    // 为每个食谱卡片添加分享按钮
    $('.recipe-card').each(function () {
        const recipeTitle = $(this).find('h3').text();
        const shareHtml = `
            <div class="social-share" style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                <a href="https://www.facebook.com/sharer/sharer.php?u=${window.location.href}" target="_blank" style="color: #3b5998;">
                    <i class="fab fa-facebook-f"></i> Share
                </a>
                <a href="https://twitter.com/intent/tweet?text=Check out this recipe: ${recipeTitle}&url=${window.location.href}" target="_blank" style="color: #1da1f2;">
                    <i class="fab fa-twitter"></i> Tweet
                </a>
                <a href="https://pinterest.com/pin/create/button/?url=${window.location.href}&media=${$(this).find('img').attr('src')}&description=${recipeTitle}" target="_blank" style="color: #bd081c;">
                    <i class="fab fa-pinterest"></i> Pin
                </a>
            </div>
        `;
        $(this).find('.recipe-content').append(shareHtml);
    });
}

// 从Cookies获取用户信息的辅助函数
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
    return null;
}

// 初始化美食地图交互
function initFoodMapInteraction() {
    $('.map-region').on('click', function () {
        const region = $(this).data('region');
        const regionName = $(this).find('.region-name').text();
        const regionFoods = $(this).find('.region-foods').text();

        // 显示区域信息
        showRegionInfo(regionName, regionFoods);

        // 添加点击效果
        $(this).addClass('clicked');
        setTimeout(() => {
            $(this).removeClass('clicked');
        }, 300);
    });
}

// 显示区域信息
function showRegionInfo(regionName, regionFoods) {
    const message = `Explore ${regionName}'s street food culture! Famous dishes include: ${regionFoods}`;
    showNotification(message, 'info');
}

// 初始化文化问答系统
function initCultureQuiz() {
    let currentQuestion = 0;
    let score = 0;

    const questions = [
        {
            question: "Which country is credited with inventing the first street food establishments called 'thermopolia'?",
            options: ["Ancient Rome", "Ancient Greece", "Ancient Egypt", "Ancient China"],
            correct: 0,
            explanation: "Correct! The Romans were the first to establish organized street food establishments called 'thermopolia' that served hot food and drinks."
        },
        {
            question: "What is the national dish of Malaysia that originated as a simple breakfast for farmers?",
            options: ["Pad Thai", "Nasi Lemak", "Char Kway Teow", "Roti Canai"],
            correct: 1,
            explanation: "Correct! Nasi Lemak is often called Malaysia's national dish and has its roots in Malay cuisine."
        },
        {
            question: "Which street food dish was created in the 1930s by Thailand's Prime Minister as part of a national campaign?",
            options: ["Pad Thai", "Tom Yum", "Green Curry", "Massaman Curry"],
            correct: 0,
            explanation: "Correct! Pad Thai was created in the 1930s by Thailand's Prime Minister Plaek Phibunsongkhram to promote Thai identity."
        },
        {
            question: "What does the word 'taco' originally refer to in Mexican history?",
            options: ["A type of tortilla", "Silver mine charges", "A cooking method", "A traditional festival"],
            correct: 1,
            explanation: "Correct! The word 'taco' originally referred to the charges used in silver mines, and later became associated with the small tortilla bundles."
        }
    ];

    // 提交答案
    $('#submitQuiz').on('click', function () {
        const selectedOption = $('.quiz-option.selected');
        if (selectedOption.length === 0) {
            showNotification('Please select an answer first!', 'warning');
            return;
        }

        const isCorrect = selectedOption.data('correct') === 'true';
        if (isCorrect) {
            score++;
            selectedOption.addClass('correct');
            showNotification('Correct answer! Well done!', 'success');
        } else {
            selectedOption.addClass('incorrect');
            $('.quiz-option[data-correct="true"]').addClass('correct');
            showNotification('Incorrect answer. Try again!', 'error');
        }

        // 显示结果
        $('#quizResult').addClass('show');
        $('#submitQuiz').hide();
        $('#nextQuiz').show();
    });

    // 下一题
    $('#nextQuiz').on('click', function () {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion(currentQuestion);
        } else {
            showFinalResults();
        }
    });

    // 重新开始
    $('#restartQuiz').on('click', function () {
        currentQuestion = 0;
        score = 0;
        loadQuestion(0);
        $('#submitQuiz').show();
        $('#nextQuiz').hide();
        $('#restartQuiz').hide();
        $('#quizResult').removeClass('show');
    });

    // 选择选项
    $(document).on('click', '.quiz-option', function () {
        $('.quiz-option').removeClass('selected');
        $(this).addClass('selected');
    });

    // 加载问题
    function loadQuestion(index) {
        const question = questions[index];
        $('#quizQuestion').text(question.question);

        const optionsHtml = question.options.map((option, i) =>
            `<div class="quiz-option" data-correct="${i === question.correct}">${option}</div>`
        ).join('');

        $('#quizOptions').html(optionsHtml);
        $('#quizResult p').text(question.explanation);
        $('#quizResult').removeClass('show');
        $('#submitQuiz').show();
        $('#nextQuiz').hide();
    }

    // 显示最终结果
    function showFinalResults() {
        const percentage = Math.round((score / questions.length) * 100);
        let message = '';

        if (percentage >= 80) {
            message = `Excellent! You scored ${score}/${questions.length} (${percentage}%). You're a street food expert!`;
        } else if (percentage >= 60) {
            message = `Good job! You scored ${score}/${questions.length} (${percentage}%). You know your street food!`;
        } else {
            message = `Keep learning! You scored ${score}/${questions.length} (${percentage}%). There's always more to discover about street food culture!`;
        }

        $('#quizQuestion').text('Quiz Complete!');
        $('#quizOptions').html(`<div class="quiz-result show"><p>${message}</p></div>`);
        $('#submitQuiz').hide();
        $('#nextQuiz').hide();
        $('#restartQuiz').show();
    }

    // 初始化第一题
    loadQuestion(0);
}

// 初始化时间线动画
function initTimelineAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // 观察时间线项目
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease ${index * 0.2}s`;
        observer.observe(item);
    });
}

// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = $(`
        <div class="notification notification-${type}">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `);

    // 添加到页面
    $('body').append(notification);

    // 显示动画
    setTimeout(() => {
        notification.addClass('show');
    }, 100);

    // 关闭按钮事件
    notification.find('.notification-close').on('click', function () {
        hideNotification(notification);
    });

    // 自动隐藏
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

// 隐藏通知
function hideNotification(notification) {
    notification.removeClass('show');
    setTimeout(() => {
        notification.remove();
    }, 300);
}
