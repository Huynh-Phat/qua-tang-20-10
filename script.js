/**
 * CẤU HÌNH NỘI DUNG
 * Có thể chỉnh sửa toàn bộ lời chúc và thông tin tại đây
 */
const CONFIG = {
    // Thông tin chung
    sender: "Một người ẩn danh 🌷",
    musicEnabled: true,

    // Màn hình 1: Lời chào
    welcomeTitle: "Hello quý cô xinh đẹp =)))",
    welcomeSubtitle: "Chào mừng em đến với dự án bí mật mang tên: Làm cho một người vui lên trong ngày 20/10 🌷🎀",
    
    // Màn hình 2: Bức thư
    letterInstruction: "Em thử mở thư xem bên trong có gì hong? 💌",
    letterText: "He luu, hôm nay là một ngày đặc biệt nên anh có chuẩn bị một thứ nho nhỏ cho em. Không biết em có tò mò hong, nhưng mà cứ khám phá hết thử nha hơ hơ. 🌷",
    letterSignature: "— người gửi quà giấu tên? ♡",

    // Màn hình 3: Khu vườn tương tác
    gardenItems: {
        flower: "Tặng em một bông hoa vì hôm nay em xứng đáng nhận thật nhiều điều dễ thương. 🌷",
        star: "Chúc em luôn tỏa sáng theo cách của riêng mình nha. Mong là những ngày tới của em sẽ có thêm thật nhiều chuyện vui và những điều khiến em mỉm cười. ✨",
        cat: "Mèo bảo: hôm nay em phải vui, phải được nhận quà. Anh hỏi nếu cô ấy không vui thì sao mèo, nó bảo: 'thì biết tay taoo chớ sao sen meow~🐱'",
        box: "Đôi khi chỉ một điều nhỏ xíu cũng đủ làm một ngày trở nên dễ thương hơn một chút. 💗"
    },

    // Màn hình 4: Lời chúc chính
    cardTitle: "Chúc em một ngày 20/10 thật dịu dàng",
    cardBody: [
        "Chúc em có một ngày 20/10 thật vui vẻ nhaaa! 🌷",
        "Mong là lúc nào em cũng có thật nhìu năng lượng, gặp được nhiều chuyện vui hơn chuyện buồn, có thêm nhiều điều để mong chờ và luôn tìm được những niềm vui nhỏ trong cuộc sống.",
        "Mong em luôn có những người dễ thương bên cạnh, có thời gian làm những điều mình thích và nhớ chăm sóc bản thân nữa nha. Không phải ngày nào cũng cần phải thật giỏi hay thật mạnh mẽ đâu, có những hôm nghỉ ngơi một chút cũng chẳng sao cả.",
        "Mong món quà nhỏ này sẽ góp thêm một chút vui vẻ cho ngày hôm nay của em. Chúc em cô gái dịu dàng luôn gặp nhiều may mắn và có thật nhiều điều dễ thương đang chờ phía trước. 💗",
        "Phải luôn vui tươi, luôn xinh theo cách em thích.."
    ],
    cardFooter: "Gửi em một chút dịu dàng ♡",

    // Màn hình 5: Món quà cuối cùng
    finalText: "Chúc em 20/10 thật vui, luôn có những điều nhỏ bé làm cậu mỉm cười, ăn ngon, ngủ ngon và gặp thật nhiều may mắn.<br>Hy vọng khi mở chiếc web nhỏ này, em đã có thêm một chút niềm vui cho ngày hôm nay. 🌷",
    finalClosing: "That's your little gift. Made with care, just for you. ♡"
};

// ==========================================
// LOGIC HOẠT ĐỘNG CỦA WEBSITE (KHÔNG CẦN SỬA)
// ==========================================

// State quản lý màn hình
let currentScreen = 'welcome';
let discoveredItems = new Set();
let isAnimating = false;

// DOM Elements
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
const screens = document.querySelectorAll('.screen');

// Khởi tạo ứng dụng
function init() {
    loadConfig();
    setupEventListeners();
    createFloatingElements();
}

// Gắn dữ liệu từ CONFIG vào DOM
function loadConfig() {
    document.getElementById('welcome-title').innerHTML = CONFIG.welcomeTitle;
    document.getElementById('welcome-subtitle').innerHTML = CONFIG.welcomeSubtitle;
    
    document.getElementById('letter-instruction').innerHTML = CONFIG.letterInstruction;
    document.getElementById('letter-text').innerHTML = CONFIG.letterText;
    document.getElementById('letter-signature').innerHTML = CONFIG.letterSignature;
    
    document.getElementById('card-title').innerHTML = CONFIG.cardTitle;
    const cardBody = document.getElementById('card-body');
    cardBody.innerHTML = CONFIG.cardBody.map(p => `<p>${p}</p>`).join('');
    document.getElementById('card-footer').innerHTML = CONFIG.cardFooter;
    
    document.getElementById('final-text').innerHTML = CONFIG.finalText;
    document.getElementById('final-closing').innerHTML = CONFIG.finalClosing;
}

// Quản lý chuyển màn hình
function switchScreen(targetScreenId) {
    if (isAnimating) return;
    isAnimating = true;

    const current = document.querySelector('.screen.active');
    const target = document.getElementById(`screen-${targetScreenId}`);

    current.style.opacity = '0';
    current.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        current.classList.remove('active');
        current.classList.add('hidden');
        
        target.classList.remove('hidden');
        // Kích hoạt reflow
        void target.offsetWidth;
        
        target.classList.add('active');
        target.style.opacity = '1';
        target.style.transform = 'translateY(0)';
        
        currentScreen = targetScreenId;
        isAnimating = false;
    }, 600);
}

// Tạo trái tim bay lơ lửng khi mở quà
function createFloatingHearts(container, count = 5) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.className = 'floating-heart';
        
        // Random vị trí
        const left = Math.random() * 100;
        heart.style.left = `${left}%`;
        heart.style.top = '50%';
        heart.style.animationDelay = `${Math.random() * 0.5}s`;
        
        container.appendChild(heart);
        
        // Xóa sau khi animation kết thúc
        setTimeout(() => heart.remove(), 2000);
    }
}

// Quản lý sự kiện
function setupEventListeners() {
    // 1. Nhạc nền
    let isMusicPlaying = false;
    musicBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicBtn.textContent = '♫ Bật nhạc';
        } else {
            bgMusic.play().catch(e => console.log("Trình duyệt chặn autoplay"));
            musicBtn.textContent = '♫ Tắt nhạc';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // 2. Màn hình Welcome -> Mở quà
    const btnOpenGift = document.getElementById('btn-open-gift');
    const giftBox = document.getElementById('gift-box');
    
    const handleOpenGift = () => {
        if (isAnimating) return;
        giftBox.classList.add('opened');
        createFloatingHearts(giftBox, 8);
        btnOpenGift.disabled = true;
        
        setTimeout(() => switchScreen('letter'), 1500);
    };
    btnOpenGift.addEventListener('click', handleOpenGift);
    giftBox.addEventListener('click', handleOpenGift);

    // 3. Màn hình Letter -> Mở thư
    const envelope = document.getElementById('envelope-container');
    const btnNextGarden = document.getElementById('btn-next-garden');
    
    envelope.addEventListener('click', () => {
        if (envelope.classList.contains('opened')) return;
        envelope.classList.add('opened');
        createFloatingHearts(envelope, 5);
        setTimeout(() => {
            btnNextGarden.classList.remove('hidden');
        }, 1500);
    });
    
    btnNextGarden.addEventListener('click', () => switchScreen('garden'));

    // 4. Màn hình Garden -> Tương tác đối tượng
    const items = ['flower', 'star', 'cat', 'box'];
    const modal = document.getElementById('popup-modal');
    const popupText = document.getElementById('popup-text');
    const btnClosePopup = document.getElementById('btn-close-popup');
    const progressText = document.getElementById('garden-progress');

    items.forEach(item => {
        const el = document.getElementById(`item-${item}`);
        el.addEventListener('click', () => {
            // Mở popup
            popupText.innerHTML = CONFIG.gardenItems[item];
            modal.classList.remove('hidden');
            
            // Cập nhật tiến trình
            if (!discoveredItems.has(item)) {
                discoveredItems.add(item);
                el.classList.add('discovered');
                progressText.textContent = `Đã khám phá ${discoveredItems.size}/4 điều dễ thương`;
                
                // Hiệu ứng tim nhẹ
                createFloatingHearts(el, 2);
            }
        });
    });

    btnClosePopup.addEventListener('click', () => modal.classList.add('hidden'));
    
    // Đóng popup khi bấm ra ngoài
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });

    document.getElementById('btn-next-card').addEventListener('click', () => switchScreen('card'));

    // 5. Màn hình Card -> Final
    document.getElementById('btn-next-final').addEventListener('click', () => switchScreen('final'));

    // 6. Màn hình Final -> Mở quà cuối
    const finalGiftContainer = document.getElementById('final-gift-container');
    const finalMsg = document.getElementById('final-message-container');
    const btnOpenFinal = document.getElementById('btn-open-final');
    const btnRestart = document.getElementById('btn-restart');

    const handleOpenFinal = () => {
        finalGiftContainer.classList.add('hidden');
        btnOpenFinal.classList.add('hidden');
        
        finalMsg.classList.remove('hidden');
        btnRestart.classList.remove('hidden');
        
        // Thả tim nhiều
        for (let i = 0; i < 3; i++) {
            setTimeout(() => createFloatingHearts(finalMsg, 10), i * 300);
        }
    };

    finalGiftContainer.addEventListener('click', handleOpenFinal);
    btnOpenFinal.addEventListener('click', handleOpenFinal);

    // Restart
    btnRestart.addEventListener('click', () => {
        location.reload(); // Cách đơn giản nhất để reset toàn bộ state & animation
    });
}

// Trang trí background nhẹ nhàng
function createFloatingElements() {
    const bg = document.getElementById('welcome-bg');
    if (!bg) return;
    // Có thể thêm logic tạo hoa/sao bay ở background nếu muốn
}

// Chạy ứng dụng khi DOM tải xong
document.addEventListener('DOMContentLoaded', init);
