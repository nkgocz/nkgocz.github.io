// script.js
// 初始化时钟
function updateClock() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const dateString = `${year}-${month}-${day}`;
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    const dateDisplay = document.getElementById('date-display');
    const timeDisplay = document.getElementById('time-display');
    
    if (dateDisplay) dateDisplay.textContent = dateString;
    if (timeDisplay) timeDisplay.textContent = timeString;
}

// 窗口管理
let zIndex = 100;

function openWindow(windowId) {
    console.log('Opening window:', windowId);
    const window = document.getElementById(windowId);
    if (window) {
        window.style.display = 'block';
        window.style.zIndex = zIndex++;
        
        // 添加拖动功能
        makeDraggable(window);
    } else {
        console.error('Window not found:', windowId);
    }
}

function closeWindow(windowId) {
    const window = document.getElementById(windowId);
    if (window) {
        window.style.display = 'none';
    }
}

function minimizeWindow(windowId) {
    const window = document.getElementById(windowId);
    if (window) {
        window.style.display = 'none';
    }
}

function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');
    if (startMenu) {
        if (startMenu.style.display === 'block') {
            startMenu.style.display = 'none';
        } else {
            startMenu.style.display = 'block';
            startMenu.style.zIndex = zIndex++;
        }
    }
}

// 使窗口可拖动
function makeDraggable(element) {
    const header = element.querySelector('.window-header');
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    if (header) {
        header.onmousedown = dragMouseDown;
    }
    
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        element.style.zIndex = zIndex++;
    }
    
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// 浮动动图动画
function animateFloatingGif() {
    const gif = document.getElementById('floatingGif');
    if (!gif) {
        console.log('Floating GIF element not found');
        return;
    }
    
    console.log('Starting floating GIF animation');
    
    // 设置初始位置
    let x = Math.random() * (window.innerWidth - 200);
    let y = Math.random() * (window.innerHeight - 200);
    let xSpeed = (Math.random() - 0.5) * 4;
    let ySpeed = (Math.random() - 0.5) * 4;
    let rotation = 0;
    let rotationSpeed = (Math.random() - 0.5) * 2;
    
    // 确保速度不为零
    if (Math.abs(xSpeed) < 0.5) xSpeed = 0.5 * (Math.random() > 0.5 ? 1 : -1);
    if (Math.abs(ySpeed) < 0.5) ySpeed = 0.5 * (Math.random() > 0.5 ? 1 : -1);
    
    function move() {
        x += xSpeed;
        y += ySpeed;
        rotation += rotationSpeed;
        
        // 边界检测和反弹
        if (x <= 0) {
            x = 0;
            xSpeed = Math.abs(xSpeed) * (0.7 + Math.random() * 0.3);
            rotationSpeed = (Math.random() - 0.5) * 2;
        } else if (x >= window.innerWidth - 200) {
            x = window.innerWidth - 200;
            xSpeed = -Math.abs(xSpeed) * (0.7 + Math.random() * 0.3);
            rotationSpeed = (Math.random() - 0.5) * 2;
        }
        
        if (y <= 0) {
            y = 0;
            ySpeed = Math.abs(ySpeed) * (0.7 + Math.random() * 0.3);
            rotationSpeed = (Math.random() - 0.5) * 2;
        } else if (y >= window.innerHeight - 200) {
            y = window.innerHeight - 200;
            ySpeed = -Math.abs(ySpeed) * (0.7 + Math.random() * 0.3);
            rotationSpeed = (Math.random() - 0.5) * 2;
        }
        
        // 随机改变方向
        if (Math.random() < 0.02) {
            xSpeed = (Math.random() - 0.5) * 4;
            ySpeed = (Math.random() - 0.5) * 4;
            rotationSpeed = (Math.random() - 0.5) * 2;
        }
        
        gif.style.left = x + 'px';
        gif.style.top = y + 'px';
        gif.style.transform = `rotate(${rotation}deg)`;
        
        requestAnimationFrame(move);
    }
    
    move();
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // 初始化时钟
    updateClock();
    setInterval(updateClock, 1000);
    
    // 初始化浮动动图
    setTimeout(() => {
        animateFloatingGif();
    }, 100);
    
    // 为所有开始菜单项添加点击事件
    const startMenuItems = document.querySelectorAll('.start-menu-item');
    startMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            const startMenu = document.getElementById('start-menu');
            if (startMenu) {
                startMenu.style.display = 'none';
            }
        });
    });
    
    // 为所有桌面图标添加点击事件
    const desktopIcons = document.querySelectorAll('.desktop-icon');
    desktopIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            const onclickAttr = this.getAttribute('onclick');
            if (onclickAttr) {
                const match = onclickAttr.match(/openWindow\('([^']+)'\)/);
                if (match && match[1]) {
                    openWindow(match[1]);
                }
            }
        });
    });
    
    // 点击桌面关闭开始菜单
    document.addEventListener('click', function(e) {
        const startMenu = document.getElementById('start-menu');
        const startButton = document.querySelector('.start-button');
        
        if (startMenu && startMenu.style.display === 'block' && 
            !startMenu.contains(e.target) && 
            (!startButton || !startButton.contains(e.target))) {
            startMenu.style.display = 'none';
        }
    });
    
    // CRT效果
    const crtScreen = document.getElementById('crtScreen');
    if (crtScreen) {
        // 主频闪效果
        function mainFlicker() {
            crtScreen.style.animation = 'none';
            void crtScreen.offsetWidth;
            crtScreen.style.animation = 'crt-flicker 0.5s linear';
            setTimeout(mainFlicker, 7000);
        }
        
        setTimeout(mainFlicker, 7000);
        
        // 随机微小干扰
        setInterval(function() {
            crtScreen.style.opacity = 0.98 + Math.random() * 0.04;
        }, 300);
    }
    
    console.log('Initialization complete');
});

// 全局错误处理
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});