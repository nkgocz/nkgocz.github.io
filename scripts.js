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
      popup.className = 'retro-popup crt-effect'; // 添加CRT特效类
      popup.style.opacity = '0';
      popup.innerHTML = `
        <div class="popup-header">
          <span class="popup-title">${this.textContent}</span>
          <button class="popup-close">&times;</button>
        </div>
        <div class="popup-content"></div>
        <div class="crt-overlay"></div> <!-- CRT特效层 -->
      `;
      
      document.body.appendChild(backdrop);
      document.body.appendChild(popup);
      
      // 触发重绘
      void popup.offsetWidth;
      
      // 淡入动画
      setTimeout(() => {
        backdrop.style.opacity = '1';
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
      
      // 关闭功能
      const closePopup = () => {
        popup.style.opacity = '0';
        popup.style.transform = 'translate(-50%, -50%) scale(0.9)';
        backdrop.style.opacity = '0';
        
        setTimeout(() => {
          popup.remove();
          backdrop.remove();
        }, 300);
      };
      
      // 关闭按钮事件
      const closeBtn = popup.querySelector('.popup-close');
      closeBtn.addEventListener('click', closePopup);
      backdrop.addEventListener('click', closePopup);
      
      // 阻止冒泡，避免点击内容关闭弹窗
      popup.addEventListener('click', (e) => e.stopPropagation());
      
      // 改进的拖动功能
      makeDraggable(popup, closeBtn);
    });
  });
  
  // 安全拖动实现
  function makeDraggable(element, excludeElement) {
    const header = element.querySelector('.popup-header');
    let startX, startY, initialX, initialY;
    let isDragging = false;
    
    // 桌面端
    header.addEventListener('mousedown', startDrag);
    
    // 移动端
    header.addEventListener('touchstart', startDrag, { passive: false });
    
    function startDrag(e) {
      // 排除关闭按钮
      if (e.target === excludeElement || e.target.closest('.popup-close')) return;
      
      e.preventDefault();
      isDragging = true;
      
      // 获取初始位置
      if (e.type === 'mousedown') {
        startX = e.clientX;
        startY = e.clientY;
      } else {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
      
      initialX = element.offsetLeft;
      initialY = element.offsetTop;
      
      // 添加事件监听
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', stopDrag);
      document.addEventListener('touchmove', drag, { passive: false });
      document.addEventListener('touchend', stopDrag);
      
      element.style.cursor = 'grabbing';
      element.style.transition = 'none'; // 拖动时禁用动画
    }
    
    function drag(e) {
      if (!isDragging) return;
      e.preventDefault();
      
      let currentX, currentY;
      if (e.type === 'mousemove') {
        currentX = e.clientX;
        currentY = e.clientY;
      } else {
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
      }
      
      const dx = currentX - startX;
      const dy = currentY - startY;
      
      // 计算新位置（限制在视口内）
      const newX = Math.max(0, Math.min(window.innerWidth - element.offsetWidth, initialX + dx));
      const newY = Math.max(0, Math.min(window.innerHeight - element.offsetHeight, initialY + dy));
      
      element.style.left = `${newX}px`;
      element.style.top = `${newY}px`;
      element.style.transform = 'none'; // 移除居中变换
    }
    
    function stopDrag() {
      isDragging = false;
      
      // 移除事件监听
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchmove', drag);
      document.removeEventListener('touchend', stopDrag);
      
      element.style.cursor = '';
      element.style.transition = 'all 0.3s ease'; // 恢复动画
    }
  }
});
