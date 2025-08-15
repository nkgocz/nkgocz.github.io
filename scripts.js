console.log("JavaScript Loaded!"); // 在浏览器控制台显示消息

document.addEventListener('DOMContentLoaded', function() {
  // 页面加载完成后执行的代码
  alert("USER IN LOGGED");
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

document.addEventListener('DOMContentLoaded', function() {
  const popupLinks = document.querySelectorAll('a.popup-link');
  
  popupLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const url = this.getAttribute('href');
      
      // 创建弹窗和遮罩
      const backdrop = document.createElement('div');
      backdrop.className = 'popup-backdrop';
      
      const popup = document.createElement('div');
      popup.className = 'retro-popup';
      popup.style.left = '50%';
      popup.style.top = '50%';
      popup.innerHTML = `
        <div class="popup-header">
          <span class="popup-title">${this.textContent}</span>
          <button class="popup-close">&times;</button>
        </div>
        <div class="popup-content"></div>
      `;
      
      document.body.appendChild(backdrop);
      document.body.appendChild(popup);
      document.body.classList.add('popup-open');
      
      // 淡入动画
      setTimeout(() => {
        backdrop.style.opacity = '1';
        popup.style.opacity = '1';
      }, 10);
      
      // 加载内容
      fetch(url)
        .then(response => response.text())
        .then(html => {
          popup.querySelector('.popup-content').innerHTML = 
            new DOMParser().parseFromString(html, 'text/html').body.innerHTML;
        });
      
      // 关闭功能
      const closePopup = () => {
        popup.style.opacity = '0';
        backdrop.style.opacity = '0';
        document.body.classList.remove('popup-open');
        setTimeout(() => {
          popup.remove();
          backdrop.remove();
        }, 300);
      };
      
      popup.querySelector('.popup-close').addEventListener('click', closePopup);
      backdrop.addEventListener('click', closePopup);
      
      // 优化的拖动效果
      makeDraggable(popup);
    });
  });
  
  function makeDraggable(element) {
    const header = element.querySelector('.popup-header');
    let startX, startY, initialLeft, initialTop;
    let isDragging = false;
    let animationFrame;
    let velocityX = 0, velocityY = 0;
    let lastX, lastY;
    let lastTime;
    
    // 初始化位置
    element.style.position = 'fixed';
    element.style.left = '50%';
    element.style.top = '50%';
    element.style.transform = 'translate(-50%, -50%)';
    
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
      
      startX = clientX;
      startY = clientY;
      lastX = clientX;
      lastY = clientY;
      lastTime = performance.now();
      
      // 获取当前弹窗位置
      initialLeft = parseFloat(element.style.left);
      initialTop = parseFloat(element.style.top);
      
      // 添加事件监听
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', stopDrag);
      document.addEventListener('touchmove', drag, { passive: false });
      document.addEventListener('touchend', stopDrag);
      
      element.style.transition = 'none';
      element.style.cursor = 'grabbing';
      element.style.transform = 'none';
      
      // 重置速度
      velocityX = 0;
      velocityY = 0;
    }
    
    function drag(e) {
      if (!isDragging) return;
      e.preventDefault();
      
      const now = performance.now();
      const deltaTime = now - lastTime;
      lastTime = now;
      
      const clientX = e.clientX || e.touches[0].clientX;
      const clientY = e.clientY || e.touches[0].clientY;
      
      // 计算速度（用于弹性效果）
      if (deltaTime > 0) {
        velocityX = (clientX - lastX) / deltaTime;
        velocityY = (clientY - lastY) / deltaTime;
      }
      
      lastX = clientX;
      lastY = clientY;
      
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const dx = clientX - startX;
        const dy = clientY - startY;
        
        // 应用移动（带轻微延迟效果）
        element.style.left = `${initialLeft + dx * 0.8}px`;
        element.style.top = `${initialTop + dy * 0.8}px`;
      });
    }
    
    function stopDrag() {
      if (!isDragging) return;
      isDragging = false;
      cancelAnimationFrame(animationFrame);
      
      // 移除事件监听
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchmove', drag);
      document.removeEventListener('touchend', stopDrag);
      
      element.style.cursor = '';
      element.style.transition = 'left 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), top 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
      
      // 获取当前位置
      const currentLeft = parseFloat(element.style.left);
      const currentTop = parseFloat(element.style.top);
      
      // 计算回弹距离（基于速度和方向）- 调高系数让回弹更快
      const reboundX = velocityX * 30; // 从20增加到30
      const reboundY = velocityY * 30;
      
      // 应用方向感知回弹
      element.style.left = `${currentLeft + reboundX}px`;
      element.style.top = `${currentTop + reboundY}px`;
      
      // 最终回到拖动后的位置（更快）
      setTimeout(() => {
        element.style.transition = 'left 0.2s ease-out, top 0.2s ease-out';
        element.style.left = `${currentLeft}px`;
        element.style.top = `${currentTop}px`;
      }, 300); // 从600ms减少到300ms
    }
  }
});
document.addEventListener('DOMContentLoaded', function() {
  // 视频弹窗触发器
  const videoLinks = document.querySelectorAll('a.video-popup-link');
  
  videoLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const videoUrl = this.getAttribute('href');
      const videoTitle = this.getAttribute('data-title') || '视频播放';
      
      // 创建弹窗和遮罩
      const backdrop = document.createElement('div');
      backdrop.className = 'popup-backdrop';
      
      const popup = document.createElement('div');
      popup.className = 'retro-popup video-popup';
      popup.style.left = '50%';
      popup.style.top = '50%';
      popup.innerHTML = `
        <div class="popup-header">
          <span class="popup-title">${videoTitle}</span>
          <button class="popup-close">&times;</button>
        </div>
        <div class="popup-content">
          <div class="video-container">
            <video controls class="retro-video">
              <source src="${videoUrl}" type="video/mp4">
              Your browser does not support HTML5 video
            </video>
          </div>
        </div>
      `;
      
      document.body.appendChild(backdrop);
      document.body.appendChild(popup);
      document.body.classList.add('popup-open');
      
      // 淡入动画
      setTimeout(() => {
        backdrop.style.opacity = '1';
        popup.style.opacity = '1';
      }, 10);
      
      // 关闭功能
      const closePopup = () => {
        // 暂停视频
        const video = popup.querySelector('video');
        if (video) video.pause();
        
        popup.style.opacity = '0';
        backdrop.style.opacity = '0';
        document.body.classList.remove('popup-open');
        setTimeout(() => {
          popup.remove();
          backdrop.remove();
        }, 300);
      };
      
      popup.querySelector('.popup-close').addEventListener('click', closePopup);
      backdrop.addEventListener('click', closePopup);
      
      // 优化的拖动效果
      makeDraggable(popup);
      
      // 点击视频内容不关闭弹窗
      popup.querySelector('.video-container').addEventListener('click', function(e) {
        e.stopPropagation();
      });
    });
  });
  
  // 拖动功能（与之前相同）
  function makeDraggable(element) {
    const header = element.querySelector('.popup-header');
    let startX, startY, initialLeft, initialTop;
    let isDragging = false;
    let animationFrame;
    
    // 初始化位置
    element.style.position = 'fixed';
    element.style.left = '50%';
    element.style.top = '50%';
    element.style.transform = 'translate(-50%, -50%)';
    
    // 桌面端
    header.addEventListener('mousedown', startDrag);
    
    // 移动端
    header.addEventListener('touchstart', startDrag, { passive: false });
    
    function startDrag(e) {
      if (e.target.classList.contains('popup-close')) return;
      
      e.preventDefault();
      isDragging = true;
      
      const clientX = e.clientX || e.touches[0].clientX;
      const clientY = e.clientY || e.touches[0].clientY;
      
      startX = clientX;
      startY = clientY;
      
      initialLeft = parseFloat(element.style.left);
      initialTop = parseFloat(element.style.top);
      
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', stopDrag);
      document.addEventListener('touchmove', drag, { passive: false });
      document.addEventListener('touchend', stopDrag);
      
      element.style.transition = 'none';
      element.style.cursor = 'grabbing';
      element.style.transform = 'none';
    }
    
    function drag(e) {
      if (!isDragging) return;
      e.preventDefault();
      
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        
        const dx = clientX - startX;
        const dy = clientY - startY;
        
        element.style.left = `${initialLeft + dx * 0.8}px`;
        element.style.top = `${initialTop + dy * 0.8}px`;
      });
    }
    
    function stopDrag() {
      if (!isDragging) return;
      isDragging = false;
      cancelAnimationFrame(animationFrame);
      
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchmove', drag);
      document.removeEventListener('touchend', stopDrag);
      
      element.style.cursor = '';
      element.style.transition = 'left 0.6s cubic-bezier(0.18, 0.89, 0.32, 1.28), top 0.6s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
      
      const currentLeft = parseFloat(element.style.left);
      const currentTop = parseFloat(element.style.top);
      
      setTimeout(() => {
        element.style.transition = 'left 0.4s ease-out, top 0.4s ease-out';
        element.style.left = `${currentLeft}px`;
        element.style.top = `${currentTop}px`;
      }, 600);
    }
  }
});
