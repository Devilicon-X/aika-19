// Elemen yang digunakan
const audio = document.getElementById('backgroundAudio');
const messageDiv = document.getElementById('message');
const nextButton = document.getElementById('nextButton');
const photoAnimation = document.getElementById('photo-animation');
const rainContainer = document.getElementById('rain-container');

let currentMessageIndex = 0;
let isPhotoShown = false;

// Pesan yang akan ditampilkan
const messages = [
    "from iam",
    "to aika",
    "haloo cantikuu cintakuuuu 💗",
    "selamat ulang tahun yaa cantikk",
    "semoga panjang umur",
    "sehat terus jangan sakit-sakit",
    "di berikan rezeki yg berlimpah",
    "di berikan kemudahan di segala ujian dari allah",
    "sukses teruss",
    "aamiin",
    "ada beberapa pesan yg mau aku sampein",
    "kurang-kurangin malesnya",
    "fokus ke kuliah",
    "jangan ngerepotin orang tuaa",
    "menjadi wanita yg hebat dan kuat",
    "jangan marah-marah terus kontrol emosinya",
    "ya mungkin bosen yak karena kata-katanya ini-ini aja",
    "intinya satu",
    "kamu harus menjadi wanita yg hebat dan tak kenal lelah",
    "selamat ulang tahun ya cantikk untuk yg ke 19 tahun",
    "i lop yuuu cantikk 💗",
    "maaf ya ayang aku prank kamu hari ini",
    "HEHEHEHEHE"
];

// Fungsi mengetik pesan
function typeMessage(message, callback) {
    let i = 0;
    messageDiv.textContent = "";
    const interval = setInterval(() => {
        if (i < message.length) {
            messageDiv.textContent += message[i];
            i++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 5);
}

// Fungsi mulai mengetik
function startTyping() {
    if (currentMessageIndex < messages.length) {
        typeMessage(messages[currentMessageIndex], () => {
            nextButton.style.display = "block";
        });
    } else {
        messageDiv.style.display = "none";
        nextButton.textContent = "Lihat Kejutan";
        photoAnimation.style.display = "block";
        isPhotoShown = true;
    }
}

// Fungsi buat bikin ledakan kembang api
function createFirework(x, y) {
    let particleCount = 50; // Banyaknya partikel per ledakan
    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement("div");
        particle.classList.add("firework");
        document.body.appendChild(particle);

        let angle = (Math.PI * 2 * i) / particleCount;
        let speed = Math.random() * 6 + 4; // Lebih cepat
        let velocityX = Math.cos(angle) * speed;
        let velocityY = Math.sin(angle) * speed;

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor = getRandomColor();

        animateParticle(particle, velocityX, velocityY);
    }
}

// Animasi partikel kembang api
function animateParticle(particle, velocityX, velocityY) {
    let x = parseFloat(particle.style.left);
    let y = parseFloat(particle.style.top);
    let gravity = 0.08; // Efek jatuh lebih smooth
    let opacity = 1;

    function frame() {
        x += velocityX;
        y += velocityY;
        velocityY += gravity;
        opacity -= 0.015; // Fade out lebih lambat

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.opacity = opacity;

        if (opacity > 0) {
            requestAnimationFrame(frame);
        } else {
            particle.remove();
        }
    }
    frame();
}

// Fungsi buat munculin efek kembang api
function startFireworks() {
    let fireworkCount = 10; // Jumlah kembang api
    let interval = setInterval(() => {
        createFirework(
            Math.random() * window.innerWidth, 
            Math.random() * (window.innerHeight / 2)
        );
    }, 500); // Muncul setiap 500ms

    setTimeout(() => clearInterval(interval), 8000); // Durasi total 8 detik
}

nextButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.volume = 0;
        audio.play();
        fadeInAudio();
    }

    if (!isPhotoShown) {
        nextButton.style.display = "none";
        currentMessageIndex++;
        startTyping();
    } else {
        rainContainer.style.display = "none"; // Hilangkan hujan
        photoAnimation.style.display = "none"; // Hilangkan foto
        nextButton.style.display = "none";

        // Jalankan kembang api saat tombol diklik
        startFireworks();
    }
});

// Fungsi fade-in audio biar nggak langsung keras suaranya
function fadeInAudio() {
    let volume = 0;
    let fadeInterval = setInterval(() => {
        if (volume < 0.5) {
            volume += 0.05;
            audio.volume = volume;
        } else {
            clearInterval(fadeInterval);
        }
    }, 300);
}



// Jalankan efek kembang api pas foto muncul
document.getElementById("photo-animation").addEventListener("animationstart", startFireworks);

// Warna random buat kembang api
function getRandomColor() {
    const colors = ["#ff0", "#f00", "#0f0", "#00f", "#ff8000", "#ff0080", "#8000ff", "#ffff00"];
    return colors[Math.floor(Math.random() * colors.length)];
}


// Fungsi efek hujan
function createRain() {
    for (let i = 0; i < 50; i++) {
        let drop = document.createElement("div");
        drop.classList.add("raindrop");
        drop.style.left = `${Math.random() * 100}vw`;
        drop.style.animationDuration = `${Math.random() * 2 + 1}s`;
        rainContainer.appendChild(drop);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Buat konten tetap di tengah pas dimuat di HP
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

// Jalankan fungsi
createRain();
startTyping();
