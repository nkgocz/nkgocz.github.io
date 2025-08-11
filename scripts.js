console.log("JavaScript Loaded!"); // 在浏览器控制台显示消息

document.addEventListener('DOMContentLoaded', function() {
  // 页面加载完成后执行的代码
  alert("welcome to Noah's Diary:D");
});

document.addEventListener('DOMContentLoaded', function() {
  // 创建音频对象
  const bgMusic = new Audio('Bass Meant Jazz.mp3');
  const musicPlayer = document.getElementById('musicPlayer');
  const musicToggle = document.getElementById('musicToggle');
  const musicVolume = document.getElementById('musicVolume');
  const musicClose = document.getElementById('musicClose');
  const nowPlaying = document.getElementById('nowPlaying');
  
  // 初始设置
  bgMusic.loop = true;
  bgMusic.volume = 0.3; // 默认30%音量
  
  // 自动播放（需要用户交互后）
  let audioEnabled = false;
  
  function enableAudio() {
    if (!audioEnabled) {
      bgMusic.play().catch(e => console.log("Was stopped:", e));
      audioEnabled = true;
    }
  }
  
  // 点击页面任意位置后启用音频
  document.body.addEventListener('click', enableAudio, { once: true });
  
  // 播放/暂停切换
  musicToggle.addEventListener('click', function() {
    if (bgMusic.paused) {
      bgMusic.play();
      musicToggle.textContent = '❚❚';
    } else {
      bgMusic.pause();
      musicToggle.textContent = '▶';
    }
  });
  
  // 音量控制
  musicVolume.addEventListener('input', function() {
    bgMusic.volume = this.value;
  });
  
  // 关闭播放器
  musicClose.addEventListener('click', function() {
    musicPlayer.style.display = 'none';
    bgMusic.pause();
  });
  
  // 拖动功能实现
  let isDragging = false;
  let offsetX, offsetY;
  
  const header = musicPlayer.querySelector('.retro-window-header');
  
  // 桌面端拖动
  header.addEventListener('mousedown', startDrag);
  
  // 移动端触摸拖动
  header.addEventListener('touchstart', function(e) {
    e.preventDefault();
    startDrag(e.touches[0]);
  });
  
  function startDrag(e) {
    isDragging = true;
    offsetX = e.clientX - musicPlayer.getBoundingClientRect().left;
    offsetY = e.clientY - musicPlayer.getBoundingClientRect().top;
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', touchDrag, { passive: false });
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
  }
  
  function drag(e) {
    if (isDragging) {
      e.preventDefault();
      musicPlayer.style.left = (e.clientX - offsetX) + 'px';
      musicPlayer.style.top = (e.clientY - offsetY) + 'px';
    }
  }
  
  function touchDrag(e) {
    if (isDragging) {
      e.preventDefault();
      musicPlayer.style.left = (e.touches[0].clientX - offsetX) + 'px';
      musicPlayer.style.top = (e.touches[0].clientY - offsetY) + 'px';
    }
  }
  
  function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('touchmove', touchDrag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchend', stopDrag);
  }
  
  // 更新当前播放信息
  function updateTrackInfo() {
    nowPlaying.textContent = "Noah's Theme";
  }
  
  updateTrackInfo();
});
