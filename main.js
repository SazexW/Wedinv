// Таймер до даты свадьбы
const weddingDate = new Date(2025, 5, 22, 15, 0, 0); // 22 июня 2025, 15:00

function updateTimer() {
    const now = new Date();
    let diff = weddingDate - now;
    if (diff < 0) diff = 0;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}
setInterval(updateTimer, 1000);
updateTimer();

// Анимация появления блоков при прокрутке (работает и для мобильных)
function animateBlocksOnScroll() {
    // Все блоки, имеющие .block (и подклассы типа .timeline-section-block)
    const blocks = document.querySelectorAll('.block');
    const triggerBottom = window.innerHeight * 0.92;
    blocks.forEach(block => {
        const blockTop = block.getBoundingClientRect().top;
        if (blockTop < triggerBottom) {
            block.classList.add('visible');
        } else {
            block.classList.remove('visible');
        }
    });
}
window.addEventListener('scroll', animateBlocksOnScroll, {passive:true});
window.addEventListener('resize', animateBlocksOnScroll);
window.addEventListener('DOMContentLoaded', () => {
    animateBlocksOnScroll();
    // Сброс анимаций при перезагрузке: убираем visible, затем вызываем animate (чтобы на F5 всегда появлялось вновь)
    setTimeout(() => {
        document.querySelectorAll('.block').forEach(b => b.classList.remove('visible'));
        setTimeout(animateBlocksOnScroll, 30);
    }, 30);
});

// Отправка формы RSVP с плавным появлением сообщения
document.getElementById('rsvp-form').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('rsvp-success').classList.remove('hidden');
    document.getElementById('rsvp-form').style.display = 'none';
    setTimeout(() => {
        document.getElementById('rsvp-success').style.opacity = 1;
    }, 250);
});

/*
    Для Яндекс.Карт:
    - Чтобы метка работала, замените в src вашей iframe параметр constructor на актуальный ID или координаты.
    - src="https://yandex.ru/map-widget/v1/?um=constructor%3AВАШ_ID_КАРТЫ&source=constructor"
*/