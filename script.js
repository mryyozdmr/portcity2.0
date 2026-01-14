

let likeCount = 0;
let isDarkTheme = false;

const activities = [
    "Tekne Turu",
    "Dalış Deneyimi",
    "Marina Restoranları",
    "Gün Batımı Yürüyüşü"
];

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html' || window.location.pathname === '/' || window.location.pathname === '') {
        alert('PortCity Tanıtım Sitesine Hoş Geldiniz!');
    }
    
    initializeMenuInteraction();
    initializeActivePageHighlight();
    initializeThemeToggle();
    initializeLikeCounter();
    initializeDynamicActivities();
    initializeContactForm();
    initializeImageZoom();
    initializeServiceDescriptions();
    initializeAboutFeatures();
});

function initializeMenuInteraction() {
    const menuLinks = document.querySelectorAll('.nav a');
    menuLinks.forEach(link => {
        const originalColor = link.style.color || 'white';
        link.addEventListener('mouseover', function() {
            this.style.color = '#FFD700';
            this.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.8)';
        });
        link.addEventListener('mouseout', function() {
            this.style.color = originalColor;
            this.style.textShadow = 'none';
        });
    });
}

function initializeActivePageHighlight() {
    const menuLinks = document.querySelectorAll('.nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    menuLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            
            menuLinks.forEach(l => l.classList.remove('active'));
            
            this.classList.add('active');
        });
    });
}

function initializeThemeToggle() {
    const themeButton = document.createElement('button');
    themeButton.className = 'theme-toggle';
    document.body.appendChild(themeButton);
    const savedTheme = localStorage.getItem('portcity-theme');
    if (savedTheme === 'dark') {
        isDarkTheme = true;
        document.body.classList.add('dark-theme');
        themeButton.innerHTML = '☀️ Açık Tema';
    } else {
        isDarkTheme = false;
        themeButton.innerHTML = '🌙 Koyu Tema';
    }
    themeButton.addEventListener('click', function() {
        isDarkTheme = !isDarkTheme;
        if (isDarkTheme) {
            document.body.classList.add('dark-theme');
            this.innerHTML = '☀️ Açık Tema';
            localStorage.setItem('portcity-theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            this.innerHTML = '🌙 Koyu Tema';
            localStorage.setItem('portcity-theme', 'light');
        }
    });
}

function initializeServiceDescriptions() {
    if (!window.location.pathname.includes('services.html')) return;
    const activityItems = document.querySelectorAll('.activity-item');
    const descriptions = {
        'Yelken kursu': 'PortCity ile denizcilik dünyasına adım atın!',
        'Jet ski kiralama': 'Heyecan dolu bir deniz macerası yaşayın!',
        'Balık tutma turları': 'Profesyonel rehberlerimizle balık tutmanın keyfini çıkarın!',
        'Dalış eğitimi': 'Denizin derinliklerini keşfedin!',
        'Kano ve kürek sporları': 'Sakin sularda huzurlu bir yolculuk yapın!'
    };
    activityItems.forEach(item => {
        const h5 = item.querySelector('h5');
        if (!h5) return;
        const title = h5.textContent.trim();
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'activity-description';
        descriptionDiv.textContent = descriptions[title] || 'PortCity ayrıcalıklarını keşfedin!';
        item.appendChild(descriptionDiv);
        item.addEventListener('mouseover', function() { descriptionDiv.style.display = 'block'; });
        item.addEventListener('mouseout', function() { descriptionDiv.style.display = 'none'; });
    });
}


function initializeDynamicActivities() {
    if (!window.location.pathname.includes('services.html')) return;

    const container = document.querySelector('.container');
    if (!container) return;
    
    const dynamicSection = document.createElement('div');
    dynamicSection.className = 'dynamic-activities';
    dynamicSection.innerHTML = '<h3>🌊 Popüler Aktivitelerimiz</h3><ul id="activities-list"></ul>';
    
    container.appendChild(dynamicSection);
    const listElement = document.getElementById('activities-list');
    
    const activityImages = {
        "Tekne Turu": "https://www.goldwaytravel.com/images/photos/antalya-tekne-turu_46550627198813246983.JPG",
        "Dalış Deneyimi": "https://lilhatours.com/uploads/0000/1/2024/08/13/dal1-600.jpg",
        "Marina Restoranları": "https://mekanlar.com/img/img161/12d368eeefadb3f2acc46c39ea813a2094ad7aee_plc_712ca48b53742d83d27ba687b0f453e4.jpg",
        "Gün Batımı Yürüyüşü": "https://images.pexels.com/photos/1129615/pexels-photo-1129615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    };

    activities.forEach(function(activity, index) {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${activity}`;
        
        if (activityImages[activity]) {
            const img = document.createElement('img');
            img.src = activityImages[activity];
            img.alt = activity;
            img.style.cssText = 'width: 100%; height: 120px; object-fit: cover; border-radius: 10px; margin: 10px 0; display: block; cursor: pointer;';
            li.appendChild(img);
        }
        listElement.appendChild(li);
    });
}

function initializeLikeCounter() {
    const currentPath = window.location.pathname;
    const isIndexPage = currentPath === '/' || currentPath === '' || currentPath.includes('index.html');
    if (!isIndexPage) return;
    
    const container = document.querySelector('.container');
    if (!container) return;

    const likeContainer = document.createElement('div');
    likeContainer.className = 'like-container';
    likeContainer.innerHTML = `
        <h3 style="color: #1e3c72; font-size: 2em; margin-bottom: 20px;">Bu sayfayı beğendiniz mi?</h3>
        <button class="like-button">👍 Beğen</button>
        <div class="like-count">Beğeni Sayısı: <span id="like-number">0</span></div>
    `;
    container.appendChild(likeContainer);
    
    const likeButton = likeContainer.querySelector('.like-button');
    const likeNumber = likeContainer.querySelector('#like-number');
    
    likeButton.addEventListener('click', function() {
        likeCount++;
        likeNumber.textContent = likeCount;
    });
}


function initializeContactForm() {
    if (!window.location.pathname.includes('contact.html')) return;
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            
            if (name === '' || email === '' || message === '') {
                alert('⚠️ Lütfen tüm alanları doldurunuz!');
                return;
            }
            
            
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('⚠️ Lütfen geçerli bir e-posta adresi giriniz!');
                return;
            }
            
            
            alert('✅ Mesajınız başarıyla gönderildi!');
            
            
            form.reset();
        });
    }
}

function initializeImageZoom() {
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            
            if (e.target.src.includes('logo2.png')) {
                return; 
            }
            e.target.classList.toggle('zoomed');
        }
    });
}

function initializeAboutFeatures() {
    if (!window.location.pathname.includes('about.html')) return;
}