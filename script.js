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
        const sheetId = '1mjkvGFU4Z6E8REd-muQENlYYiLe4I1VPndGGCut7vbg';
        const sheetName = 'Sheet1';
        const apiKey = 'AIzaSyCU4np3XLD7-TJaxAww9wQYbKiROTHLY-Y';

        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        console.log('Data yang diterima:', data);

        const container = document.getElementById('anggota-container');
        container.innerHTML = '';

        if (data.values && data.values.length > 1) {
            for (let i = 2; i < data.values.length; i++) {
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
                    Data gagal dimuat. Silakan periksa kembali koneksi jaringan Anda dan coba lagi.
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



