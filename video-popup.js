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
              您的浏览器不支持HTML5视频
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
