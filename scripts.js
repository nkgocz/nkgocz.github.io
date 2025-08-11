console.log("JavaScript Loaded!"); // 在浏览器控制台显示消息

document.addEventListener('DOMContentLoaded', function() {
  // 页面加载完成后执行的代码
  alert("welcome to Noah's Diary:D");
});

document.addEventListener('DOMContentLoaded', function() {
  // 音频设置
  const audio = new Audio('Bass Meant Jazz.mp3');
  audio.volume = 0.3;
  audio.loop = true;
  
  // 获取元素
  const musicBox = document.getElementById('retroMusicBox');
  const toggleBtn = document.getElementById('musicToggle');
  const volumeControl = document.getElementById('musicVolume');
  
  // 播放/暂停控制
  toggleBtn.addEventListener('click', function() {
    if (audio.paused) {
      audio.play()
        .then(() => toggleBtn.textContent = '❚❚')
        .catch(e => console.error('play failed:', e));
    } else {
      audio.pause();
      toggleBtn.textContent = '▶';
    }
  });
  
  // 音量控制
  volumeControl.addEventListener('input', function() {
    audio.volume = this.value;
  });
  
  // 高性能拖动实现
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  // 桌面端拖动
  musicBox.onmousedown = dragMouseDown;
  
  // 移动端拖动
  musicBox.ontouchstart = touchStart;
  
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // 获取鼠标初始位置
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
    // 计算新位置
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // 设置元素新位置
    musicBox.style.top = (musicBox.offsetTop - pos2) + "px";
    musicBox.style.left = (musicBox.offsetLeft - pos1) + "px";
  }
  
  function touchMove(e) {
    const touch = e.touches[0];
    pos1 = pos3 - touch.clientX;
    pos2 = pos4 - touch.clientY;
    pos3 = touch.clientX;
    pos4 = touch.clientY;
    musicBox.style.top = (musicBox.offsetTop - pos2) + "px";
    musicBox.style.left = (musicBox.offsetLeft - pos1) + "px";
  }
  
  function closeDragElement() {
    // 停止移动
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;
  }
  
  // 解决自动播放限制
  function initAudio() {
    document.removeEventListener('click', initAudio);
    document.removeEventListener('touchstart', initAudio);
    audio.play()
      .then(() => toggleBtn.textContent = '❚❚')
      .catch(e => console.log('plz interact first'));
  }
  
  document.addEventListener('click', initAudio);
  document.addEventListener('touchstart', initAudio);
});
