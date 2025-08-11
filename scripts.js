console.log("JavaScript Loaded!"); // 在浏览器控制台显示消息

document.addEventListener('DOMContentLoaded', function() {
  // 页面加载完成后执行的代码
  alert("welcome to Noah's Diary:D");
});

// 音乐播放器控制脚本
document.addEventListener('DOMContentLoaded', function() {
    // 创建播放器元素
    const musicPlayer = document.createElement('div');
    musicPlayer.id = 'retro-music-player';
    musicPlayer.innerHTML = `
        <div class="player-header">
            <span class="player-title">🎵 BGM Player</span>
            <span class="player-minimize">_</span>
            <span class="player-close">×</span>
        </div>
        <div class="player-body">
            <audio id="bgMusic" loop>
                <source src="music/background.mp3" type="audio/mpeg">
                <source src="music/background.mid" type="audio/midi">
            </audio>
            <div class="player-controls">
                <button id="playPauseBtn">❚❚ Pause</button>
                <span class="volume-control">
                    <span>Vol:</span>
                    <input type="range" id="volumeSlider" min="0" max="1" step="0.1" value="0.3">
                </span>
            </div>
        </div>
    `;
    
    document.body.appendChild(musicPlayer);
    
    // 获取元素
    const audio = document.getElementById('bgMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const minimizeBtn = musicPlayer.querySelector('.player-minimize');
    const closeBtn = musicPlayer.querySelector('.player-close');
    
    // 初始化播放器
    let isMinimized = false;
    let isDragging = false;
    let offsetX, offsetY;
    const header = musicPlayer.querySelector('.player-header');
    
    // 设置初始音量
    audio.volume = volumeSlider.value;
    
    // 尝试自动播放（需要用户交互）
    function tryAutoPlay() {
        const promise = audio.play();
        
        if (promise !== undefined) {
            promise.catch(error => {
                // 自动播放被阻止，显示提示
                musicPlayer.innerHTML += `
                    <div class="play-message">
                        Click anywhere to play music
                    </div>
                `;
                
                // 点击页面任何地方开始播放
                document.addEventListener('click', function startPlay() {
                    audio.play();
                    document.querySelector('.play-message').remove();
                    document.removeEventListener('click', startPlay);
                }, { once: true });
            });
        }
    }
    
    // 延迟尝试自动播放
    setTimeout(tryAutoPlay, 1000);
    
    // 播放/暂停控制
    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = '❚❚ Pause';
        } else {
            audio.pause();
            playPauseBtn.textContent = '▶ Play';
        }
    });
    
    // 音量控制
    volumeSlider.addEventListener('input', function() {
        audio.volume = volumeSlider.value;
    });
    
    // 最小化/恢复
    minimizeBtn.addEventListener('click', function() {
        if (isMinimized) {
            musicPlayer.style.width = '200px';
            musicPlayer.style.height = '80px';
            musicPlayer.querySelector('.player-body').style.display = 'block';
            isMinimized = false;
        } else {
            musicPlayer.style.width = '120px';
            musicPlayer.style.height = '30px';
            musicPlayer.querySelector('.player-body').style.display = 'none';
            isMinimized = true;
        }
    });
    
    // 关闭按钮（实际是最小化）
    closeBtn.addEventListener('click', function() {
        minimizeBtn.click();
    });
    
    // 拖动功能
    header.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.clientX - musicPlayer.getBoundingClientRect().left;
        offsetY = e.clientY - musicPlayer.getBoundingClientRect().top;
        musicPlayer.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        musicPlayer.style.left = (e.clientX - offsetX) + 'px';
        musicPlayer.style.top = (e.clientY - offsetY) + 'px';
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
        musicPlayer.style.cursor = 'default';
    });
});
