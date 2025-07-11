// script.js

// 打开模态框并显示图片
function openModal(imageSrc) {
    const modal = document.getElementById('previewModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = 'flex';
    modalImg.src = imageSrc;
}

// 关闭模态框
function closeModal() {
    document.getElementById('previewModal').style.display = 'none';
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('previewModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
