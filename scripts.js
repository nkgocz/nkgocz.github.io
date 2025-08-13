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
  // 初始化所有弹窗
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  
  modalTriggers.forEach(trigger => {
    const modalId = trigger.getAttribute('data-modal-target');
    const modal = document.getElementById(modalId);
    const closeBtn = modal.querySelector('.modal-close');
    
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);
    
    // 显示弹窗
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      modal.style.display = 'block';
      overlay.style.display = 'block';
      
      // 初始居中位置
      positionModal(modal);
    });
    
    // 关闭弹窗
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
      overlay.style.display = 'none';
    });
    
    // 点击遮罩层关闭
    overlay.addEventListener('click', function() {
      modal.style.display = 'none';
      this.style.display = 'none';
    });
    
    // 使弹窗可拖动
    makeDraggable(modal.querySelector('.modal-header'), modal);
  });
  
  // 窗口大小改变时重新定位
  window.addEventListener('resize', function() {
    document.querySelectorAll('.retro-modal').forEach(modal => {
      if (modal.style.display === 'block') {
        positionModal(modal);
      }
    });
  });
});

// 弹窗居中函数
function positionModal(modal) {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const modalWidth = modal.offsetWidth;
  const modalHeight = modal.offsetHeight;
  
  modal.style.left = '50%';
  modal.style.top = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
}

// 拖动功能实现（支持触摸设备）
function makeDraggable(header, modal) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  // 桌面端鼠标事件
  header.onmousedown = dragMouseDown;
  
  // 移动端触摸事件
  header.addEventListener('touchstart', touchStart, { passive: false });
  
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  
  function touchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    pos3 = touch.clientX;
    pos4 = touch.clientY;
    document.ontouchend = closeDragElement;
    document.ontouchmove = touchMove;
  }
  
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    // 使用transform实现无拖影移动
    const currentTransform = modal.style.transform.match(/translate\(([^)]+)\)/);
    let tx = 0, ty = 0;
    
    if (currentTransform) {
      const translateValues = currentTransform[1].split(',');
      tx = parseFloat(translateValues[0]);
      ty = parseFloat(translateValues[1]);
    }
    
    modal.style.transform = `translate(calc(${tx}px - ${pos1}px), calc(${ty}px - ${pos2}px))`;
  }
  
  function touchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    pos1 = pos3 - touch.clientX;
    pos2 = pos4 - touch.clientY;
    pos3 = touch.clientX;
    pos4 = touch.clientY;
    
    const currentTransform = modal.style.transform.match(/translate\(([^)]+)\)/);
    let tx = 0, ty = 0;
    
    if (currentTransform) {
      const translateValues = currentTransform[1].split(',');
      tx = parseFloat(translateValues[0]);
      ty = parseFloat(translateValues[1]);
    }
    
    modal.style.transform = `translate(calc(${tx}px - ${pos1}px), calc(${ty}px - ${pos2}px))`;
  }
  
  function closeDragElement() {
    // 停止移动
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;
  }
}
