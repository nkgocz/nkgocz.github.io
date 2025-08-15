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
