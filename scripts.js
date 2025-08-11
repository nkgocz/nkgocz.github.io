// scripts.js
console.log("JavaScript Loaded!"); // 在浏览器控制台显示消息

document.addEventListener('DOMContentLoaded', function() {
  // 页面加载完成后执行的代码
  alert("welcome to Noah's Diary:D");
});

document.addEventListener('DOMContentLoaded', function() {
  // 创建音频对象 - 使用MIDI或MP3
  const bgMusic = new Audio('Bass Meant Jazz.mid');
  
  // 设置30%音量
  bgMusic.volume = 0.2;
  bgMusic.loop = true;
  
  // 尝试自动播放（处理浏览器限制）
  const playPromise = bgMusic.play();
  
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      // 显示复古风格播放按钮
      createRetroMusicControls();
    });
  }
  
  // 创建复古音乐控制面板
  function createRetroMusicControls() {
    const musicPanel = document.createElement('div');
    musicPanel.id = 'retro-music-panel';
    musicPanel.innerHTML = `
      <div class="retro-window">
        <div class="retro-title-bar">
          <span>Music control</span>
          <div class="retro-buttons">
            <button class="retro-close">×</button>
          </div>
        </div>
        <div class="retro-content">
          <button id="retro-play-btn">▶ player</button>
          <div class="retro-volume-control">
            <span>volume:</span>
            <input type="range" min="0" max="1" step="0.1" value="0.3" id="retro-volume-slider">
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(musicPanel);
    
    // 播放按钮事件
    document.getElementById('retro-play-btn').addEventListener('click', function() {
      bgMusic.play();
      this.textContent = "♪ playing...";
      this.disabled = true;
    });
    
    // 音量控制
    document.getElementById('retro-volume-slider').addEventListener('input', function(e) {
      bgMusic.volume = e.target.value;
    });
    
    // 关闭按钮
    document.querySelector('.retro-close').addEventListener('click', function() {
      musicPanel.style.display = 'none';
    });
  }
});
