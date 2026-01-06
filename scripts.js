// 时钟功能 - 格式: YYYY年 M月D日 HH:MM:SS
function updateClock() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const dateString = `${year}年 ${month}月${day}日`;
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    document.getElementById('clock').innerHTML = `${dateString}<br>${timeString}`;
}

setInterval(updateClock, 1000);
updateClock();

// 窗口管理
let zIndex = 100;

function openWindow(windowId) {
    const win = document.getElementById(windowId);
    win.style.display = 'block';
    win.style.zIndex = zIndex++;
    makeDraggable(win);
}

function closeWindow(windowId) {
    document.getElementById(windowId).style.display = 'none';
}

function minimizeWindow(windowId) {
    document.getElementById(windowId).style.display = 'none';
}

function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');
    if (startMenu.style.display === 'block') {
        startMenu.style.display = 'none';
    } else {
        startMenu.style.display = 'block';
        startMenu.style.zIndex = zIndex++;
    }
}

// 拖动窗口
function makeDraggable(el) {
    const header = el.querySelector('.window-header');
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    header.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// CRT效果
document.addEventListener('DOMContentLoaded', function() {
    const crtScreen = document.getElementById('crtScreen');
    
    function mainFlicker() {
        crtScreen.style.animation = 'none';
        void crtScreen.offsetWidth;
        crtScreen.style.animation = 'crt-flicker 0.5s linear';
        setTimeout(mainFlicker, 7000);
    }
    
    setTimeout(mainFlicker, 7000);
    
    setInterval(function() {
        crtScreen.style.opacity = 0.98 + Math.random() * 0.04;
    }, 300);
});

// 点击桌面关闭开始菜单
document.querySelector('.desktop').addEventListener('click', function() {
    document.getElementById('start-menu').style.display = 'none';
});

// 漂浮动图物理效果
document.addEventListener('DOMContentLoaded', function() {
    const floatingGif = document.getElementById('floatingGif');
    let posX = Math.random() * (window.innerWidth - 100);
    let posY = Math.random() * (window.innerHeight - 100);
    let speedX = (Math.random() - 0.5) * 3;
    let speedY = (Math.random() - 0.5) * 3;
    let rotation = 0;
    let rotationSpeed = (Math.random() - 0.5) * 2;
    
    // 确保速度不为0
    if (Math.abs(speedX) < 0.5) speedX = speedX > 0 ? 1 : -1;
    if (Math.abs(speedY) < 0.5) speedY = speedY > 0 ? 1 : -1;
    
    function updatePosition() {
        posX += speedX;
        posY += speedY;
        
        const maxX = window.innerWidth - 80;
        const maxY = window.innerHeight - 80;
        
        // 边界检测和反弹
        if (posX <= 0) {
            posX = 0;
            speedX = Math.abs(speedX) + (Math.random() - 0.5);
            rotationSpeed = -rotationSpeed + (Math.random() - 0.5);
        } else if (posX >= maxX) {
            posX = maxX;
            speedX = -Math.abs(speedX) + (Math.random() - 0.5);
            rotationSpeed = -rotationSpeed + (Math.random() - 0.5);
        }
        
        if (posY <= 0) {
            posY = 0;
            speedY = Math.abs(speedY) + (Math.random() - 0.5);
            rotationSpeed = -rotationSpeed + (Math.random() - 0.5);
        } else if (posY >= maxY) {
            posY = maxY;
            speedY = -Math.abs(speedY) + (Math.random() - 0.5);
            rotationSpeed = -rotationSpeed + (Math.random() - 0.5);
        }
        
        // 旋转
        rotation += rotationSpeed;
        
        // 应用变换
        floatingGif.style.left = posX + 'px';
        floatingGif.style.top = posY + 'px';
        floatingGif.style.transform = `rotate(${rotation}deg)`;
        
        requestAnimationFrame(updatePosition);
    }
    
    updatePosition();
});
