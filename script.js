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

// Inisialisasi API Gemini
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
                        text: message
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
        'halo': 'Halo! Ada yang bisa saya bantu?',
        'hai': 'Halo! Ada yang bisa saya bantu?', 
        'hi': 'Halo! Ada yang bisa saya bantu?',
        'jadwal': 'Untuk informasi jadwal kuliah, silakan kunjungi website FTI UNPAM di www.ftiunpam.ac.id',
        'kuliah': 'Untuk informasi jadwal kuliah, silakan kunjungi website FTI UNPAM di www.ftiunpam.ac.id',
        'tugas': 'Tugas-tugas akan diperbarui secara berkala. Silakan periksa bagian Tugas di halaman utama.',
        'pembayaran': 'Untuk informasi pembayaran kuliah, silakan hubungi bagian keuangan di lantai 1 gedung A atau cek pengumuman terbaru.',
        'biaya': 'Untuk informasi pembayaran kuliah, silakan hubungi bagian keuangan di lantai 1 gedung A atau cek pengumuman terbaru.',
        'terima kasih': 'Sama-sama! Ada yang bisa saya bantu lagi?',
        'makasih': 'Sama-sama! Ada yang bisa saya bantu lagi?',
        'dosen': 'Untuk informasi tentang dosen pengajar, silakan hubungi bagian akademik di lantai 2 gedung A atau kunjungi website fakultas.',
        'pengajar': 'Untuk informasi tentang dosen pengajar, silakan hubungi bagian akademik di lantai 2 gedung A atau kunjungi website fakultas.',
        'ujian': 'Informasi jadwal ujian akan diumumkan melalui website fakultas dan grup kelas. Silakan cek secara berkala.',
        'uas': 'Informasi jadwal ujian akan diumumkan melalui website fakultas dan grup kelas. Silakan cek secara berkala.',
        'uts': 'Informasi jadwal ujian akan diumumkan melalui website fakultas dan grup kelas. Silakan cek secara berkala.',
        'nilai': 'Untuk melihat nilai dan IPK, silakan login ke portal akademik my.unpam.ac.id',
        'ipk': 'Untuk melihat nilai dan IPK, silakan login ke portal akademik my.unpam.ac.id',
        'krs': 'Pengisian KRS dan registrasi dapat dilakukan melalui portal akademik my.unpam.ac.id. Pastikan sudah melunasi pembayaran semester.',
        'registrasi': 'Pengisian KRS dan registrasi dapat dilakukan melalui portal akademik my.unpam.ac.id. Pastikan sudah melunasi pembayaran semester.',
        'sertifikat': 'Untuk informasi sertifikat dan SKPI, silakan hubungi bagian akademik fakultas di lantai 2 gedung A.',
        'skpi': 'Untuk informasi sertifikat dan SKPI, silakan hubungi bagian akademik fakultas di lantai 2 gedung A.',
        'beasiswa': 'Informasi beasiswa dapat dilihat di pengumuman fakultas atau website kemahasiswaan UNPAM di kemahasiswaan.unpam.ac.id',
        'wisuda': 'Informasi wisuda akan diumumkan melalui website universitas. Pastikan semua persyaratan sudah dipenuhi.',
        'ketua kelas': 'Ketua Kelas TPLP 005 adalah Saiyah Awaliyah. Untuk informasi lebih lanjut silakan hubungi melalui email: sudo-apt-get@gmail.com',
        'saiyah': 'Ketua Kelas TPLP 005 adalah Saiyah Awaliyah. Untuk informasi lebih lanjut silakan hubungi melalui email: sudo-apt-get@gmail.com',
        'awaliyah': 'Ketua Kelas TPLP 005 adalah Saiyah Awaliyah. Untuk informasi lebih lanjut silakan hubungi melalui email: sudo-apt-get@gmail.com',
        'kontak ketua kelas': 'Ketua Kelas TPLP 005 adalah Saiyah Awaliyah. Untuk informasi lebih lanjut silakan hubungi melalui email: sudo-apt-get@gmail.com',
        'siapa ketua kelasnya': 'Ketua Kelas TPLP 005 adalah Saiyah Awaliyah dan Wakil Ketua Kelas adalah Risky Akbar',
        'bisa bantu': 'Ya, saya bisa membantu Anda terkait perkuliahan di kelas TPLP-005',
        'senin': 'Jadwal Senin:\n1. METODE PENELITIAN - WASIS HARYONO (08.50-10.30)\n2. DIGITAL ENTREPRENEURSHIP - HADI ZAKARIA (10.30-12.10)\n3. PENGOLAHAN CITRA DIGITAL - DEVI DAMAYANTI (13.00-14.40)\n4. SISTEM INFORMASI MANAJEMEN - HADI ZAKARIA (14.40-16.20)',
        'selasa': 'Jadwal Selasa:\n1. PEMROGRAMAN WEB I - FAJAR AGUNG NUGROHO (10.30-12.10)\n2. TEKNIK RISET OPERASIONAL - FARIZI ILHAM (13.00-14.40)\n3. MACHINE LEARNING - PERANI ROSYANI (14.40-16.20)',
        'rabu': 'Jadwal Rabu:\n1. KECERDASAN BUATAN - RISWAL NAFI SIREGAR (10.30-12.10)',
        'jadwal senin': 'Jadwal Senin:\n1. METODE PENELITIAN - WASIS HARYONO (08.50-10.30)\n2. DIGITAL ENTREPRENEURSHIP - HADI ZAKARIA (10.30-12.10)\n3. PENGOLAHAN CITRA DIGITAL - DEVI DAMAYANTI (13.00-14.40)\n4. SISTEM INFORMASI MANAJEMEN - HADI ZAKARIA (14.40-16.20)',
        'jadwal selasa': 'Jadwal Selasa:\n1. PEMROGRAMAN WEB I - FAJAR AGUNG NUGROHO (10.30-12.10)\n2. TEKNIK RISET OPERASIONAL - FARIZI ILHAM (13.00-14.40)\n3. MACHINE LEARNING - PERANI ROSYANI (14.40-16.20)', 
        'jadwal rabu': 'Jadwal Rabu:\n1. KECERDASAN BUATAN - RISWAL NAFI SIREGAR (10.30-12.10)',
        'mata kuliah': 'Mata Kuliah Semester ini:\n1. METODE PENELITIAN\n2. DIGITAL ENTREPRENEURSHIP\n3. PENGOLAHAN CITRA DIGITAL\n4. SISTEM INFORMASI MANAJEMEN\n5. PEMROGRAMAN WEB I\n6. TEKNIK RISET OPERASIONAL\n7. MACHINE LEARNING\n8. KECERDASAN BUATAN',
        'daftar dosen': 'Daftar Dosen Pengajar:\n1. WASIS HARYONO\n2. HADI ZAKARIA\n3. DEVI DAMAYANTI\n4. FAJAR AGUNG NUGROHO\n5. FARIZI ILHAM\n6. PERANI ROSYANI\n7. RISWAL NAFI SIREGAR'
    };

    for (let key in responses) {
        if (message.includes(key)) {
            return responses[key];
        }
    }

    return null; // Return null jika tidak ada respon yang cocok
}

// Fungsi untuk menangani pengiriman pesan
async function handleMessage() {
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();

    if (!message) return;

    // Tampilkan pesan pengguna
    addMessage(message, 'user');
    userInput.value = '';

    // Coba dapatkan respon dari daftar yang sudah ditentukan
    const standardResponse = getBotReply(message);

    if (standardResponse) {
        // Jika ada respon standar, gunakan itu
        addMessage(standardResponse, 'bot');
    } else {
        // Jika tidak ada respon standar, gunakan Gemini
        const loadingMessage = 'Sedang memproses pertanyaan Anda...';
        addMessage(loadingMessage, 'bot');
        
        try {
            const geminiResponse = await getGeminiResponse(message);
            // Hapus pesan loading
            chatBox.lastElementChild.remove();
            addMessage(geminiResponse, 'bot');
        } catch (error) {
            // Hapus pesan loading
            chatBox.lastElementChild.remove();
            addMessage('Maaf, terjadi kesalahan dalam memproses pertanyaan Anda.', 'bot');
        }
    }
}

// Inisialisasi chat saat dokumen dimuat
document.addEventListener('DOMContentLoaded', () => {
    handleChat();
    
    // Tambahkan event listener untuk tombol kirim, input enter, dan end chat
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
