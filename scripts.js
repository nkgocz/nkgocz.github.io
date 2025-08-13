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
  // 创建弹窗容器
  const popupContainer = document.createElement('div');
  popupContainer.className = 'popup-container';
  popupContainer.innerHTML = `
    <div class="popup-header">
      <span class="popup-title">Diary Entries</span>
      <span class="popup-close">&times;</span>
    </div>
    <div class="popup-content"></div>
  `;
  document.body.appendChild(popupContainer);
  
  // 获取弹窗元素
  const popup = document.querySelector('.popup-container');
  const popupHeader = document.querySelector('.popup-header');
  const popupContent = document.querySelector('.popup-content');
  const popupClose = document.querySelector('.popup-close');
  
  // 为所有popup-link添加点击事件
  document.querySelectorAll('.popup-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetContent = document.getElementById(targetId);
      
      if (targetContent) {
        // 设置弹窗内容
        popupContent.innerHTML = targetContent.innerHTML;
        // 显示弹窗
        popup.style.display = 'block';
        // 设置标题为链接文本
        document.querySelector('.popup-title').textContent = this.textContent;
      }
    });
  });
  
  // 关闭弹窗
  popupClose.addEventListener('click', function() {
    popup.style.display = 'none';
  });
  
  // 点击弹窗外部关闭
  popup.addEventListener('click', function(e) {
    if (e.target === popup) {
      popup.style.display = 'none';
    }
  });
  
  // 拖动功能
  let isDragging = false;
  let offsetX, offsetY;
  
  popupHeader.addEventListener('mousedown', startDrag);
  popupHeader.addEventListener('touchstart', startDrag, { passive: false });
  
  function startDrag(e) {
    e.preventDefault();
    isDragging = true;
    
    if (e.type === 'mousedown') {
      offsetX = e.clientX - popup.getBoundingClientRect().left;
      offsetY = e.clientY - popup.getBoundingClientRect().top;
    } else if (e.type === 'touchstart') {
      offsetX = e.touches[0].clientX - popup.getBoundingClientRect().left;
      offsetY = e.touches[0].clientY - popup.getBoundingClientRect().top;
    }
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
  }
  
  function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    let clientX, clientY;
    
    if (e.type === 'mousemove') {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    
    const newX = clientX - offsetX;
    const newY = clientY - offsetY;
    
    // 限制弹窗不超出视口
    const maxX = window.innerWidth - popup.offsetWidth;
    const maxY = window.innerHeight - popup.offsetHeight;
    
    popup.style.left = Math.min(Math.max(0, newX), maxX) + 'px';
    popup.style.top = Math.min(Math.max(0, newY), maxY) + 'px';
    popup.style.transform = 'none'; // 移除初始的居中定位
  }
  
  function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchend', stopDrag);
  }
});
