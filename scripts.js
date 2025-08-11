// scripts.js
console.log("JavaScript Loaded!"); // 在浏览器控制台显示消息

document.addEventListener('DOMContentLoaded', function() {
  // 页面加载完成后执行的代码
  alert("welcome to Noah's Diary:D");
});

document.addEventListener('DOMContentLoaded', function() {
  // 创建音频对象
  const bgMusic = new Audio('music/background.mp3');
  
  // 设置音量30%
  bgMusic.volume = 0.25;
  
  // 设置循环播放
  bgMusic.loop = true;
  
  // 尝试自动播放（受浏览器策略限制）
  const playPromise = bgMusic.play();
  
  // 处理自动播放被阻止的情况
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      // 显示播放按钮让用户手动启动
      showMusicButton();
    });
  }
  
  // 显示音乐控制按钮的函数
  function showMusicButton() {
    const musicControl = document.createElement('div');
    musicControl.id = 'music-control';
    musicControl.innerHTML = `
      <button id="play-music">▶ play</button>

    document.body.appendChild(musicControl);
    
    // 添加按钮事件监听
    document.getElementById('play-music').addEventListener('click', function() {
      bgMusic.play();
      this.style.display = 'none';
    });
    
    // 音量控制
    document.getElementById('volume-control').addEventListener('input', function(e) {
      bgMusic.volume = e.target.value;
    });
  }
  
  // 复古样式
  const style = document.createElement('style');
  style.textContent = `
    #music-control {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: #0000FF;
      color: black;
      padding: 5px 10px;
      font-family: "Comic Sans MS", cursive;
      border: 2px outset #FFFFFF;
      z-index: 1000;
    }
    #music-control button {
      background: #C0C0C0;
      border: 2px outset #FFFFFF;
      color: black;
      cursor: pointer;
    }
    #music-control input {
      vertical-align: middle;
    }
  `;
  document.head.appendChild(style);
});
