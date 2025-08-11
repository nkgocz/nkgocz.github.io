console.log("JavaScript Loaded!"); // 在浏览器控制台显示消息

document.addEventListener('DOMContentLoaded', function() {
  // 页面加载完成后执行的代码
  alert("welcome to Noah's Diary:D");
});

document.addEventListener('DOMContentLoaded', function() {
  // 创建音频对象
  const audio = new Audio('Bass Meant Jazz.mp3');
  audio.volume = 0.3; // 初始音量30%
  audio.loop = true;
  
  // 获取DOM元素
  const player = document.getElementById('retroMusicPlayer');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const volumeControl = document.getElementById('volumeControl');
  
  // 播放/暂停功能
  playPauseBtn.addEventListener('click', function() {
    if (audio.paused) {
      audio.play();
      playPauseBtn.textContent = '❚❚';
    } else {
      audio.pause();
      playPauseBtn.textContent = '▶';
    }
  });
  
  // 音量控制
  volumeControl.addEventListener('input', function() {
    audio.volume = this.value;
  });
  
  // 拖动功能
  let isDragging = false;
  let offsetX, offsetY;
  
  // 桌面端拖动
  player.addEventListener('mousedown', startDrag);
  
  // 移动端拖动
  player.addEventListener('touchstart', function(e) {
    e.preventDefault();
    startDrag({
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY
    });
  });
  
  function startDrag(e) {
    isDragging = true;
    offsetX = e.clientX - player.getBoundingClientRect().left;
    offsetY = e.clientY - player.getBoundingClientRect().top;
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', touchDrag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
  }
  
  function drag(e) {
    if (isDragging) {
      player.style.left = (e.clientX - offsetX) + 'px';
      player.style.top = (e.clientY - offsetY) + 'px';
    }
  }
  
  function touchDrag(e) {
    if (isDragging) {
      player.style.left = (e.touches[0].clientX - offsetX) + 'px';
      player.style.top = (e.touches[0].clientY - offsetY) + 'px';
    }
  }
  
  function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('touchmove', touchDrag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchend', stopDrag);
  }
  
  // 点击页面任意位置后开始播放（解决浏览器自动播放限制）
  function handleFirstInteraction() {
    audio.play().then(() => {
      playPauseBtn.textContent = '❚❚';
    }).catch(e => console.log(e));
    
    document.removeEventListener('click', handleFirstInteraction);
    document.removeEventListener('touchstart', handleFirstInteraction);
  }
  
  document.addEventListener('click', handleFirstInteraction);
  document.addEventListener('touchstart', handleFirstInteraction);
});
