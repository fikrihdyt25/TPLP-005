// Fungsi untuk menampilkan loader
function tampilkanLoader() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="spinner"></div>
        <p>Memuat...</p>
    `;
    document.body.appendChild(loader);
}

// Fungsi untuk menyembunyikan loader
function sembunyikanLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.remove();
    }
}

// Menampilkan loader saat halaman dimuat dan scroll ke header
window.addEventListener('load', () => {
    tampilkanLoader();
    
    // Simulasi waktu pemuatan (ganti dengan logika pemuatan sebenarnya)
    setTimeout(() => {
        sembunyikanLoader();
        // Scroll ke header setelah loader hilang
        const header = document.querySelector('header');
        if (header) {
            header.scrollIntoView({ behavior: 'smooth' });
        }
    }, 2000); // Loader akan hilang setelah 2 detik
});

// Tambahkan CSS untuk loader
const style = document.createElement('style');
style.textContent = `
    .loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.8);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid #f3f3f3;
        border-top: 5px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .loader p {
        margin-top: 10px;
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        color: #333;
    }
`;
document.head.appendChild(style);
// Fungsi untuk menangani efek navbar saat di-scroll
// Fungsi untuk menangani efek navbar saat di-scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('nav');
    let lastScrollTop = 0;
    let ticking = false;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (!ticking) {
            window.requestAnimationFrame(function() {
                if (scrollTop > lastScrollTop) {
                    // Scroll ke bawah
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    // Scroll ke atas
                    navbar.style.transform = 'translateY(0)';
                }
                navbar.style.transition = 'transform 0.3s ease-in-out';

                lastScrollTop = scrollTop;
                ticking = false;
            });

            ticking = true;
        }
    });
}

// Panggil fungsi saat dokumen dimuat
document.addEventListener('DOMContentLoaded', handleNavbarScroll);

// Tambahkan CSS untuk navbar
const navbarStyle = document.createElement('style');
navbarStyle.textContent = `
    nav {
        position: sticky;
        top: 0;
        z-index: 1000;
        background-color: #3498db;
        transition: transform 0.3s ease-in-out;
    }
`;
document.head.appendChild(navbarStyle);

async function ambilDataAnggota() {
    try {
        const sheetId = '11m8u9p4JimSMh7hMMhrBwaaJPKSbci0JqRvkjXida3Q';
        const sheetName = 'Sheet1';
        const apiKey = 'AIzaSyDa4vcPBXMuKZz8xnT6G1t04lSpSxzvjnU';

        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        console.log('Data yang diterima:', data);

        const container = document.getElementById('anggota-container');
        container.innerHTML = '';

        if (data.values && data.values.length > 1) {
            for (let i = 1; i < data.values.length; i++) {
                const [nama, nim, linkFotoProfil, linkPortofolio] = data.values[i];

                console.log(`Memproses data: ${nama}, ${nim}, ${linkFotoProfil}, ${linkPortofolio}`);

                const anggotaHTML = `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <img 
                                src="${linkFotoProfil || 'assets/img/default-profile.jpg'}" 
                                class="card-img-top" 
                                alt="Foto Profil ${nama}" 
                                onerror="this.src='assets/img/UNPAM_logo1.png';"
                                style="max-height: 300px; object-fit: cover;">
                            <div class="card-body">
                                <h5 class="card-title">${nama}</h5>
                                <p class="card-text">NIM: ${nim}</p>
                                <a href="${linkPortofolio}" class="btn btn-primary" target="_blank">Lihat Portofolio</a>
                            </div>
                        </div>
                    </div>
                `;

                container.innerHTML += anggotaHTML;
            }
        } else {
            throw new Error('Data tidak ditemukan atau format tidak sesuai');
        }
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        const container = document.getElementById('anggota-container');
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-danger" role="alert">
                    Mohon Maaf,Kami sedang memperbaiki halaman ini.Kami sedang Memindahkan Data ke Tempat Baru.
                </div>
            </div>
        `;
    }
}

// Panggil fungsi saat dokumen dimuat
document.addEventListener('DOMContentLoaded', () => {
    handleNavbarScroll();
    ambilDataAnggota();
});

// Fungsi untuk menampilkan/menyembunyikan chat bot
function toggleChat() {
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
        chatContainer.style.display = 'block';
    } else {
        chatContainer.style.display = 'none';
    }
}

// Fungsi untuk menghapus chat
function endChat() {
    const chatBox = document.getElementById('chatBox');
    if (chatBox) {
        chatBox.innerHTML = `
            <div class="chat-message bot-message" style="text-align: left;">
                <strong>Bot:</strong> Halo! Saya adalah chat bot TPLP-005. Ada yang bisa saya bantu?
            </div>
        `;
    }
}

// Fungsi untuk menangani pesan chat
function handleChat() {
    const chatBox = document.getElementById('chatBox');
    if (chatBox) {
        chatBox.innerHTML = `
            <div class="chat-message bot-message" style="text-align: left;">
                <strong>Bot:</strong> Halo! Saya adalah chat bot TPLP-005. Ada yang bisa saya bantu?
            </div>
        `;
    }
}

// Fungsi untuk menambahkan pesan ke chat box
function addMessage(message, sender) {
    const chatBox = document.getElementById('chatBox');
    const messageClass = sender === 'user' ? 'user-message' : 'bot-message';
    const senderName = sender === 'user' ? 'Anda' : 'Bot';
    const alignment = sender === 'user' ? 'right' : 'left';
    
    chatBox.innerHTML += `
        <div class="chat-message ${messageClass}" style="text-align: ${alignment};">
            <strong>${senderName}:</strong> ${message}
        </div>
    `;
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Initialize Gemini API
const GEMINI_API_KEY = 'AIzaSyBa4I3pLN9hT0tFbjG8bG09QT8jqufGhgE';

async function getGeminiResponse(message) {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Tolong jawab pertanyaan berikut dalam Bahasa Indonesia dengan gaya yang ramah dan informal: ${message}`
                    }]
                }]
            })
        });

        const data = await response.json();
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            return data.candidates[0].content.parts[0].text;
        }
        return 'Maaf, saya tidak dapat memproses pertanyaan Anda saat ini.';
    } catch (error) {
        console.error('Error:', error);
        return 'Terjadi kesalahan dalam memproses pertanyaan Anda.';
    }
}

// Fungsi untuk mendapatkan respon bot berdasarkan kata kunci
function getBotReply(message) {
    message = message.toLowerCase();
    
    const responses = {
        'hello': 'Halo! Ada yang bisa saya bantu?',
        'hi': 'Halo! Ada yang bisa saya bantu?',
        'halo': 'Halo! Ada yang bisa saya bantu?',
        'hai': 'Halo! Ada yang bisa saya bantu?',
        'schedule': 'Untuk informasi jadwal kuliah, silakan kunjungi website FTI UNPAM di www.ftiunpam.ac.id',
        'jadwal': 'Untuk informasi jadwal kuliah, silakan kunjungi website FTI UNPAM di www.ftiunpam.ac.id',
        'kuliah': 'Untuk informasi jadwal kuliah, silakan kunjungi website FTI UNPAM di www.ftiunpam.ac.id',
        'tugas': 'Tugas-tugas akan diperbarui secara berkala. Silakan periksa bagian Tugas di halaman utama.',
        'assignment': 'Tugas-tugas akan diperbarui secara berkala. Silakan periksa bagian Tugas di halaman utama.',
        'payment': 'Untuk informasi pembayaran kuliah, silakan hubungi bagian keuangan di lantai 1 gedung A.',
        'pembayaran': 'Untuk informasi pembayaran kuliah, silakan hubungi bagian keuangan di lantai 1 gedung A.',
        'thank you': 'Sama-sama! Ada yang bisa saya bantu lagi?',
        'thanks': 'Sama-sama! Ada yang bisa saya bantu lagi?',
        'terima kasih': 'Sama-sama! Ada yang bisa saya bantu lagi?',
        'makasih': 'Sama-sama! Ada yang bisa saya bantu lagi?',
        'lecturer': 'Untuk informasi tentang dosen pengajar, silakan hubungi bagian akademik.',
        'dosen': 'Untuk informasi tentang dosen pengajar, silakan hubungi bagian akademik.',
        'exam': 'Informasi jadwal ujian akan diumumkan melalui website fakultas dan grup kelas.',
        'ujian': 'Informasi jadwal ujian akan diumumkan melalui website fakultas dan grup kelas.',
        'nilai': 'Untuk melihat nilai dan IPK, silakan login ke portal akademik my.unpam.ac.id',
        'grade': 'Untuk melihat nilai dan IPK, silakan login ke portal akademik my.unpam.ac.id',
        'registration': 'Pengisian KRS dan registrasi dapat dilakukan melalui portal akademik my.unpam.ac.id',
        'registrasi': 'Pengisian KRS dan registrasi dapat dilakukan melalui portal akademik my.unpam.ac.id',
        'certificate': 'Untuk informasi sertifikat, silakan hubungi bagian akademik fakultas.',
        'sertifikat': 'Untuk informasi sertifikat, silakan hubungi bagian akademik fakultas.',
        'scholarship': 'Informasi beasiswa dapat dilihat di pengumuman fakultas.',
        'beasiswa': 'Informasi beasiswa dapat dilihat di pengumuman fakultas.',
        'graduation': 'Informasi wisuda akan diumumkan melalui website universitas.',
        'wisuda': 'Informasi wisuda akan diumumkan melalui website universitas.',
        'class leader': 'Ketua Kelas TPLP 005 adalah Saiyah Awaliyah.',
        'ketua kelas': 'Ketua Kelas TPLP 005 adalah Saiyah Awaliyah.',
        'help': 'Ya, saya bisa membantu Anda terkait perkuliahan di kelas TPLP-005',
        'bantu': 'Ya, saya bisa membantu Anda terkait perkuliahan di kelas TPLP-005'
    };

    for (let key in responses) {
        if (message.includes(key)) {
            return responses[key];
        }
    }

    return null;
}

// Fungsi untuk menangani pengiriman pesan
async function handleMessage() {
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();

    if (!message) return;

    addMessage(message, 'user');
    userInput.value = '';

    const standardResponse = getBotReply(message);

    if (standardResponse) {
        addMessage(standardResponse, 'bot');
    } else {
        addMessage('Sedang memproses pertanyaan Anda...', 'bot');
        
        try {
            const geminiResponse = await getGeminiResponse(message);
            chatBox.lastElementChild.remove();
            addMessage(geminiResponse, 'bot');
        } catch (error) {
            chatBox.lastElementChild.remove();
            addMessage('Maaf, terjadi kesalahan dalam memproses pertanyaan Anda.', 'bot');
        }
    }
}

// Inisialisasi chat saat dokumen dimuat
document.addEventListener('DOMContentLoaded', () => {
    handleChat();
    
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const endChatButton = document.getElementById('endChatButton');
    
    if (userInput && sendButton) {
        sendButton.addEventListener('click', handleMessage);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleMessage();
            }
        });
    }

    if (endChatButton) {
        endChatButton.addEventListener('click', endChat);
    }
});
