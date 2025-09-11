// 导航栏滚动效果
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // 向下滚动且滚动距离足够
        navbar.classList.add('py-2');
        navbar.classList.remove('py-3');
        navbar.classList.add('shadow-lg');
    } else {
        // 向上滚动
        navbar.classList.remove('py-2');
        navbar.classList.add('py-3');
        navbar.classList.remove('shadow-lg');
    }
    lastScrollTop = scrollTop;
});

// 移动端菜单切换
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // 如果是移动端，点击后关闭菜单
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// 滚动动画
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// 优化加载动画，页面加载后再消失
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000);
    }
});

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 赛季切换功能
// 桌面端
const seasonToggle = document.getElementById('season-toggle');
const seasonDropdown = document.getElementById('season-dropdown');
const currentSeasonBtn = document.getElementById('current-season');
const nextSeasonBtn = document.getElementById('next-season');

// 移动端
const mobileSeasonToggle = document.getElementById('mobile-season-toggle');
const mobileSeasonDropdown = document.getElementById('mobile-season-dropdown');
const mobileCurrentSeasonBtn = document.getElementById('mobile-current-season');
const mobileNextSeasonBtn = document.getElementById('mobile-next-season');

// 桌面端下拉菜单
seasonToggle.addEventListener('click', function() {
    seasonDropdown.classList.toggle('hidden');
});

// 移动端下拉菜单
mobileSeasonToggle.addEventListener('click', function() {
    mobileSeasonDropdown.classList.toggle('hidden');
    const icon = this.querySelector('i');
    icon.classList.toggle('rotate-180');
});

// 点击页面其他地方关闭下拉菜单
document.addEventListener('click', function(event) {
    if (!seasonToggle.contains(event.target) && !seasonDropdown.contains(event.target)) {
        seasonDropdown.classList.add('hidden');
    }
    
    if (!mobileSeasonToggle.contains(event.target) && !mobileSeasonDropdown.contains(event.target) && !mobileMenu.contains(event.target)) {
        mobileSeasonDropdown.classList.add('hidden');
        const mobileIcon = mobileSeasonToggle.querySelector('i');
        mobileIcon.classList.remove('rotate-180');
    }
});

// 设置赛季切换链接的正确跳转目标
document.addEventListener('DOMContentLoaded', function() {
    // 获取当前页面的URL和文件名
    const currentUrl = window.location.href;
    const currentPath = window.location.pathname;
    const fileName = currentPath.split('/').pop().toLowerCase();
    
    // 使用更健壮的方法检查当前是否为英文版页面
    // 1. 检查URL中是否包含英文文件名
    // 2. 检查当前文件名是否直接匹配英文文件名
    const isEnglishVersion = 
        currentUrl.toLowerCase().includes('dive-eng.html') || 
        currentUrl.toLowerCase().includes('age-eng.html') ||
        fileName === 'dive-eng.html' ||
        fileName === 'age-eng.html';
    
    // 更新桌面端赛季切换链接
    if (currentSeasonBtn) {
        currentSeasonBtn.href = isEnglishVersion ? 'dive-Eng.html' : 'index.html';
    }
    
    if (nextSeasonBtn) {
        nextSeasonBtn.href = isEnglishVersion ? 'age-Eng.html' : 'season-2025-2026.html';
    }
    
    // 更新移动端赛季切换链接
    if (mobileCurrentSeasonBtn) {
        mobileCurrentSeasonBtn.href = isEnglishVersion ? 'dive-Eng.html' : 'index.html';
    }
    
    if (mobileNextSeasonBtn) {
        mobileNextSeasonBtn.href = isEnglishVersion ? 'age-Eng.html' : 'season-2025-2026.html';
    }
});

// 倒计时功能