// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 滚动动画
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 只观察一次
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有内容卡片
    document.querySelectorAll('.content-card').forEach(function(card) {
        observer.observe(card);
    });
    
    // 观察所有六边形
    document.querySelectorAll('.hexagon').forEach(function(hex) {
        observer.observe(hex);
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
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 导航栏滚动效果
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动且滚动距离足够
            header.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
    
    // 为六边形添加随机延迟动画
    document.querySelectorAll('.hexagon').forEach((hex, index) => {
        hex.style.animationDelay = `${index * 0.1}s`;
    });
});