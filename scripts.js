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
  // 找到所有特定class的链接
  const popupLinks = document.querySelectorAll('a.popup-link');
  
  popupLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const url = this.getAttribute('href');
      
      // 创建弹窗容器和背景遮罩
      const backdrop = document.createElement('div');
      backdrop.className = 'popup-backdrop';
      
      const popup = document.createElement('div');
      popup.className = 'retro-popup';
      popup.style.opacity = '0'; // 初始透明用于淡入
      popup.innerHTML = `
        <div class="popup-header">
          <span class="popup-title">${this.textContent}</span>
          <button class="popup-close">&times;</button>
        </div>
        <div class="popup-content"></div>
      `;
      
      document.body.appendChild(backdrop);
      document.body.appendChild(popup);
      
      // 淡入动画
      setTimeout(() => {
        popup.style.opacity = '1';
        popup.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 10);
      
      // 加载内容
      fetch(url)
        .then(response => response.text())
        .then(html => {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          const content = doc.querySelector('body').innerHTML;
          popup.querySelector('.popup-content').innerHTML = content;
        })
        .catch(err => {
          popup.querySelector('.popup-content').innerHTML = `
            <div class="popup-error">
              Failed to load content: ${err.message}
            </div>
          `;
        });
      
      // 关闭功能（修复移动端问题）
      const closePopup = () => {
        popup.style.opacity = '0';
        popup.style.transform = 'translate(-50%, -50%) scale(0.9)';
        backdrop.style.opacity = '0';
        
        setTimeout(() => {
          popup.remove();
          backdrop.remove();
        }, 300); // 匹配CSS过渡时间
      };
      
      // 关闭按钮（同时适用于移动端和桌面端）
      popup.querySelector('.popup-close').addEventListener('click', closePopup);
      backdrop.addEventListener('click', closePopup);
      
      // 使弹窗可拖动（更新版）
      makeDraggable(popup, backdrop);
    });
  });
  
  // 改进的拖动功能实现
  function makeDraggable(element, backdrop) {
    const header = element.querySelector('.popup-header');
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let isDragging = false;
    
    // 桌面端拖动
    header.addEventListener('mousedown', dragMouseDown);
    
    // 移动端触摸拖动
    header.addEventListener('touchstart', touchStart, { passive: false });
    
    function dragMouseDown(e) {
      if (e.target.classList.contains('popup-close')) return;
      
      e.preventDefault();
      isDragging = true;
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.addEventListener('mouseup', closeDragElement);
      document.addEventListener('mousemove', elementDrag);
      element.style.cursor = 'grabbing';
    }
    
    function touchStart(e) {
      if (e.target.classList.contains('popup-close')) return;
      
      e.preventDefault();
      isDragging = true;
      const touch = e.touches[0];
      pos3 = touch.clientX;
      pos4 = touch.clientY;
      document.addEventListener('touchend', closeDragElement);
      document.addEventListener('touchmove', touchMove, { passive: false });
      element.style.cursor = 'grabbing';
    }
    
    function elementDrag(e) {
      if (!isDragging) return;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      element.style.top = (element.offsetTop - pos2) + "px";
      element.style.left = (element.offsetLeft - pos1) + "px";
      element.style.transform = 'none'; // 移除居中定位
    }
    
    function touchMove(e) {
      if (!isDragging) return;
      e.preventDefault();
      const touch = e.touches[0];
      pos1 = pos3 - touch.clientX;
      pos2 = pos4 - touch.clientY;
      pos3 = touch.clientX;
      pos4 = touch.clientY;
      element.style.top = (element.offsetTop - pos2) + "px";
      element.style.left = (element.offsetLeft - pos1) + "px";
      element.style.transform = 'none'; // 移除居中定位
    }
    
    function closeDragElement() {
      isDragging = false;
      document.removeEventListener('mouseup', closeDragElement);
      document.removeEventListener('mousemove', elementDrag);
      document.removeEventListener('touchend', closeDragElement);
      document.removeEventListener('touchmove', touchMove);
      element.style.cursor = '';
    }
  }
});
