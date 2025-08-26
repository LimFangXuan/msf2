// 页面加载完成后执行
$(document).ready(function() {
    // 检查是否已有用户登录信息
    checkUserLoggedIn();
    
    // 登录按钮点击事件
    $('#loginBtn').click(function() {
        $('#loginContainer').addClass('active');
    });
    
    // 关闭按钮点击事件
    $('#closeBtn').click(function() {
        $('#loginContainer').removeClass('active');
    });
    
    // 登录表单提交事件
    $('#submitLogin').click(function() {
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
    
    // 探索按钮点击事件
    $('#exploreBtn').click(function() {
        $('html, body').animate({
            scrollTop: $('.intro-section').offset().top
        }, 1000);
    });
    
    // 了解更多按钮点击事件
    $('#learnMoreBtn').click(function() {
        window.location.href = 'page5.html';
    });
});

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
    $('#logoutBtn').click(function() {
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

// 从Cookies获取用户信息的辅助函数
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
    return null;
}


// 订阅表单处理
document.addEventListener('DOMContentLoaded', function() {
    const subscribeForm = document.querySelector('.subscribe-form');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault(); // 阻止表单默认提交行为
            
            const emailInput = subscribeForm.querySelector('.subscribe-input');
            const email = emailInput.value.trim();
            
            // 邮箱验证
            if (validateEmail(email)) {
                
                showSubscribeMessage('Thank you for subscribing!', 'success');
                
                // 清空输入框
                emailInput.value = '';
            } else {
                showSubscribeMessage('Please enter a valid email address.', 'error');
            }
        });
    }
});

// 邮箱验证函数
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// 显示订阅反馈信息
function showSubscribeMessage(text, type) {
    // 检查是否已存在消息元素，若有则移除
    const existingMessage = document.querySelector('.subscribe-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 创建新消息元素
    const message = document.createElement('div');
    message.className = `subscribe-message ${type}`;
    message.textContent = text;
    message.style.marginTop = '1rem';
    message.style.padding = '0.8rem';
    message.style.borderRadius = '25px';
    message.style.fontWeight = '500';
    
    // 设置样式
    if (type === 'success') {
        message.style.backgroundColor = 'rgba(67, 104, 71, 0.2)';
        message.style.color = '#436847';
    } else {
        message.style.backgroundColor = 'rgba(231, 116, 9, 0.2)';
        message.style.color = '#e77409';
    }
    
    // 添加到表单中
    document.querySelector('.subscribe-form').appendChild(message);
    
    // 3秒后自动移除消息
    setTimeout(() => {
        message.remove();
    }, 3000);
}