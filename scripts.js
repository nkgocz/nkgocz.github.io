// scripts.js
console.log("JavaScript Loaded!"); // 在浏览器控制台显示消息

document.addEventListener('DOMContentLoaded', function() {
  // 页面加载完成后执行的代码
  alert("welcome to Noah's Diary:D");
});

document.addEventListener('DOMContentLoaded', function() {
  // 获取元素
  const aboutLink = document.getElementById('aboutLink');
  const modal = document.getElementById('aboutModal');
  const closeBtn = document.querySelector('.retro-modal-close');
  
  // 点击About Me链接显示弹窗
  aboutLink.addEventListener('click', function(e) {
    e.preventDefault();
    modal.style.display = 'block';
    
    // 初始位置居中
    modal.style.left = (window.innerWidth - modal.offsetWidth) / 2 + 'px';
    modal.style.top = (window.innerHeight - modal.offsetHeight) / 2 + 'px';
  });
  
  // 点击关闭按钮隐藏弹窗
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  
  // 拖动功能实现
  let isDragging = false;
  let offsetX, offsetY;
  
  const header = document.querySelector('.retro-modal-header');
  
  header.addEventListener('mousedown', function(e) {
    isDragging = true;
    offsetX = e.clientX - modal.getBoundingClientRect().left;
    offsetY = e.clientY - modal.getBoundingClientRect().top;
  });
  
  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    
    modal.style.left = (e.clientX - offsetX) + 'px';
    modal.style.top = (e.clientY - offsetY) + 'px';
  });
  
  document.addEventListener('mouseup', function() {
    isDragging = false;
  });
  
  // 点击弹窗外部不关闭(复古风格通常不这样做)
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
