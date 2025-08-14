console.log("JavaScript Loaded!"); // 在浏览器控制台显示消息

document.addEventListener('DOMContentLoaded', function() {
  // 页面加载完成后执行的代码
  alert("welcome to Noah's Diary:D");
});

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 创建音乐播放器元素
    const musicPlayer = document.createElement('div');
    musicPlayer.id = 'retro-music-player';
    musicPlayer.innerHTML = `
        <div class="player-header">
            <span>♫ MUSIC PLAYER ♫</span>
            <div class="player-controls">
                <button id="playPauseBtn">▶</button>
                <input type="range" id="volumeSlider" min="0" max="1" step="0.1" value="0.3">
                <span id="volumeDisplay">30%</span>
            </div>
        </div>
        <div class="player-status">
            <marquee>Now Playing: Noah's Diary Theme</marquee>
        </div>
    `;
    document.body.appendChild(musicPlayer);
    
    const audio = new Audio('Bass Meant Jazz.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    
    
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeDisplay = document.getElementById('volumeDisplay');
    
    
    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = '❚❚';
        } else {
            audio.pause();
            playPauseBtn.textContent = '▶';
        }
    });
    

    volumeSlider.addEventListener('input', function() {
        audio.volume = volumeSlider.value;
        volumeDisplay.textContent = Math.round(volumeSlider.value * 100) + '%';
    });
    
    
    document.body.addEventListener('click', function initAudio() {
        
        document.body.removeEventListener('click', initAudio);
        
        
        audio.play().then(() => {
            playPauseBtn.textContent = '❚❚';
        }).catch(error => {
            console.log('Automatic playback is blocked', error);
        });
    });
    
    
    makeDraggable(musicPlayer);
});

// 使元素可拖动
function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = element.querySelector('.player-header');
    
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
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
// 移动端菜单切换
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu.style.display === 'block') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
  }
}

// 调整弹窗大小和位置
function adjustModalForMobile() {
  if (window.innerWidth <= 768) {
    const modal = document.getElementById('aboutModal');
    if (modal) {
      modal.style.width = '90%';
      modal.style.left = '5%';
      modal.style.top = '20px';
    }
  }
}

// 初始化移动端功能
function initMobileFeatures() {
  // 隐藏桌面特定元素
  if (window.innerWidth <= 768) {
    document.querySelectorAll('.desktop-only').forEach(el => {
      el.style.display = 'none';
    });
  }
  
  // 监听窗口大小变化
  window.addEventListener('resize', function() {
    adjustModalForMobile();
  });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  initMobileFeatures();
  adjustModalForMobile();
});

document.addEventListener('DOMContentLoaded', function() {
  const popupLinks = document.querySelectorAll('a.popup-link');
  
  popupLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const url = this.getAttribute('href');
      
      // 创建弹窗和背景遮罩
      const backdrop = document.createElement('div');
      backdrop.className = 'popup-backdrop';
      
      const popup = document.createElement('div');
      popup.className = 'retro-popup';
      popup.innerHTML = `
        <div class="popup-header">
          <span class="popup-title">${this.textContent}</span>
          <button class="popup-close">&times;</button>
        </div>
        <div class="popup-content"></div>
      `;
      
      document.body.appendChild(backdrop);
      document.body.appendChild(popup);
      
      // 加载内容
      fetch(url)
        .then(response => response.text())
        .then(html => {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          popup.querySelector('.popup-content').innerHTML = doc.body.innerHTML;
        });
      
      // 关闭功能
      const closePopup = () => {
        popup.style.opacity = '0';
        backdrop.style.opacity = '0';
        setTimeout(() => {
          popup.remove();
          backdrop.remove();
        }, 300);
      };
      
      popup.querySelector('.popup-close').addEventListener('click', closePopup);
      backdrop.addEventListener('click', closePopup);
      
      // 平滑拖动实现
      makeDraggable(popup);
    });
  });
  
  function makeDraggable(element) {
    const header = element.querySelector('.popup-header');
    let posX = 0, posY = 0, mouseX = 0, mouseY = 0;
    let isDragging = false;
    let animationId;
    
    // 初始居中位置
    const centerX = window.innerWidth / 2 - element.offsetWidth / 2;
    const centerY = window.innerHeight / 2 - element.offsetHeight / 2;
    element.style.left = `${centerX}px`;
    element.style.top = `${centerY}px`;
    
    // 桌面端
    header.addEventListener('mousedown', startDrag);
    // 移动端
    header.addEventListener('touchstart', startDrag, { passive: false });
    
    function startDrag(e) {
      if (e.target.classList.contains('popup-close')) return;
      
      e.preventDefault();
      isDragging = true;
      
      // 获取初始位置
      const clientX = e.clientX || e.touches[0].clientX;
      const clientY = e.clientY || e.touches[0].clientY;
      
      posX = element.offsetLeft;
      posY = element.offsetTop;
      mouseX = clientX;
      mouseY = clientY;
      
      // 添加事件监听
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', stopDrag);
      document.addEventListener('touchmove', drag, { passive: false });
      document.addEventListener('touchend', stopDrag);
      
      // 开始平滑动画
      animateDrag();
    }
    
    function drag(e) {
      if (!isDragging) return;
      e.preventDefault();
      
      const clientX = e.clientX || e.touches[0].clientX;
      const clientY = e.clientY || e.touches[0].clientY;
      
      // 计算目标位置（带有限制）
      const targetX = Math.max(0, Math.min(
        window.innerWidth - element.offsetWidth, 
        posX + (clientX - mouseX)
      ));
      
      const targetY = Math.max(0, Math.min(
        window.innerHeight - element.offsetHeight, 
        posY + (clientY - mouseY)
      ));
      
      // 更新目标位置（动画循环会处理实际移动）
      posX = targetX;
      posY = targetY;
    }
    
    function animateDrag() {
      if (!isDragging) return;
      
      // 使用缓动效果实现平滑移动
      const currentX = parseFloat(element.style.left) || 0;
      const currentY = parseFloat(element.style.top) || 0;
      
      // 计算新位置（带缓动）
      const newX = currentX + (posX - currentX) * 0.2;
      const newY = currentY + (posY - currentY) * 0.2;
      
      element.style.left = `${newX}px`;
      element.style.top = `${newY}px`;
      
      animationId = requestAnimationFrame(animateDrag);
    }
    
    function stopDrag() {
      isDragging = false;
      cancelAnimationFrame(animationId);
      
      // 移除事件监听
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchmove', drag);
      document.removeEventListener('touchend', stopDrag);
    }
  }
});
