// PortCity Marina - JavaScript Kodları

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
        
        link.addEventListener('click', function(e) {
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
        'Kano ve kürek sporları': 'Sakin sularda huzurlu bir yolculuk yapın!',
        'Denizcilik malzemeleri mağazası': 'PortCity ayrıcalıklarını keşfedin!',
        'Hediyelik eşya dükkanı': 'PortCity ayrıcalıklarını keşfedin!',
        'Teknik servis ve bakım': 'PortCity ayrıcalıklarını keşfedin!',
        'Yakıt istasyonu': 'PortCity ayrıcalıklarını keşfedin!'
    };
    
    activityItems.forEach(item => {
        const title = item.querySelector('h5').textContent.trim();
        
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'activity-description';
        descriptionDiv.textContent = descriptions[title] || 'PortCity koylarını keşfedin!';
        item.appendChild(descriptionDiv);
        
        item.addEventListener('mouseover', function() {
            descriptionDiv.style.display = 'block';
        });
        
        item.addEventListener('mouseout', function() {
            descriptionDiv.style.display = 'none';
        });
    });
}

function initializeDynamicActivities() {
    const currentPath = window.location.pathname;
    const isIndexPage = currentPath === '/' || currentPath === '' || currentPath.includes('index.html') || currentPath.endsWith('/');
    if (!isIndexPage) return;
    
    const dynamicSection = document.createElement('div');
    dynamicSection.className = 'dynamic-activities';
    dynamicSection.innerHTML = '<h3>🌊 Popüler Aktivitelerimiz</h3><ul id="activities-list"></ul>';
    
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(dynamicSection, container.lastElementChild);
        
        const listElement = document.getElementById('activities-list');
        
        activities.forEach(function(activity, index) {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${activity}`;
            
            if (activity === 'Tekne Turu') {
                const img = document.createElement('img');
                img.src = 'https://www.goldwaytravel.com/images/photos/antalya-tekne-turu_46550627198813246983.JPG';
                img.alt = 'Tekne Turu';
                img.style.cssText = 'width: 100%; height: 120px; object-fit: cover; border-radius: 10px; margin: 10px 0; display: block;';
                li.appendChild(img);
            }
            
            if (activity === 'Dalış Deneyimi') {
                const img = document.createElement('img');
                img.src = 'https://lilhatours.com/uploads/0000/1/2024/08/13/dal1-600.jpg';
                img.alt = 'Dalış Deneyimi';
                img.style.cssText = 'width: 100%; height: 120px; object-fit: cover; border-radius: 10px; margin: 10px 0; display: block;';
                li.appendChild(img);
            }
            
            if (activity === 'Marina Restoranları') {
                const img = document.createElement('img');
                img.src = 'https://mekanlar.com/img/img161/12d368eeefadb3f2acc46c39ea813a2094ad7aee_plc_712ca48b53742d83d27ba687b0f453e4.jpg';
                img.alt = 'Marina Restoranları';
                img.style.cssText = 'width: 100%; height: 120px; object-fit: cover; border-radius: 10px; margin: 10px 0; display: block;';
                li.appendChild(img);
            }
            
            if (activity === 'Gün Batımı Yürüyüşü') {
                const img = document.createElement('img');
                img.src = 'https://images.pexels.com/photos/1129615/pexels-photo-1129615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
                img.alt = 'Gün Batımı Yürüyüşü';
                img.style.cssText = 'width: 100%; height: 120px; object-fit: cover; border-radius: 10px; margin: 10px 0; display: block;';
                li.appendChild(img);
            }
            
            listElement.appendChild(li);
        });
    }
}

function initializeLikeCounter() {
    const currentPath = window.location.pathname;
    const isIndexPage = currentPath === '/' || currentPath === '' || currentPath.includes('index.html') || currentPath.endsWith('/');
    if (!isIndexPage) return;
    
    const likeContainer = document.createElement('div');
    likeContainer.className = 'like-container';
    likeContainer.innerHTML = `
        <h3 style="color: #1e3c72; font-size: 2em; margin-bottom: 20px;">Bu sayfayı beğendiniz mi?</h3>
        <button class="like-button">👍 Beğen</button>
        <div class="like-count">Beğeni Sayısı: <span id="like-number">0</span></div>
    `;
    
    const container = document.querySelector('.container');
    if (container) {
        container.appendChild(likeContainer);
        
        const likeButton = document.querySelector('.like-button');
        const likeNumber = document.getElementById('like-number');
        
        likeButton.addEventListener('click', function() {
            likeCount++;
            likeNumber.textContent = likeCount;
            
            likeNumber.style.transform = 'scale(1.3)';
            setTimeout(() => {
                likeNumber.style.transform = 'scale(1)';
            }, 200);
        });
    }
}

function initializeContactForm() {
    if (!window.location.pathname.includes('contact.html')) return;
    
    const formSection = document.createElement('div');
    formSection.className = 'contact-form';
    formSection.innerHTML = `
        <h3>📧 Bize Ulaşın</h3>
        <form id="contact-form">
            <div class="form-group">
                <label for="name">Ad Soyad *</label>
                <input type="text" id="name" name="name" placeholder="Adınızı ve soyadınızı giriniz">
            </div>
            <div class="form-group">
                <label for="email">E-posta *</label>
                <input type="email" id="email" name="email" placeholder="E-posta adresinizi giriniz">
            </div>
            <div class="form-group">
                <label for="message">Mesajınız *</label>
                <textarea id="message" name="message" placeholder="Mesajınızı buraya yazınız..."></textarea>
            </div>
            <button type="submit" class="submit-button">📤 Gönder</button>
        </form>
    `;
    
    const container = document.querySelector('.container');
    if (container) {
        const firstBox = container.querySelector('.contact-box');
        if (firstBox) {
            firstBox.appendChild(formSection);
        }
        
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const message = document.getElementById('message').value.trim();
                
                if (name === '' || email === '' || message === '') {
                    alert('❌ Lütfen tüm alanları doldurunuz!');
                    return;
                }
                
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('❌ Lütfen geçerli bir e-posta adresi giriniz!');
                    return;
                }
                
                alert('✅ Mesajınız başarıyla gönderildi!');
                form.reset();
            });
        }
    }
}

function initializeImageZoom() {
    const featureImages = document.querySelectorAll('.feature-card img');
    featureImages.forEach(img => {
        img.classList.add('zoomable-image');
        img.addEventListener('click', function() {
            this.classList.toggle('zoomed');
        });
    });
    
    const activityImages = document.querySelectorAll('#activities-list img');
    activityImages.forEach(img => {
        img.classList.add('zoomable-image');
        img.addEventListener('click', function() {
            this.classList.toggle('zoomed');
        });
    });
}

function initializeAboutFeatures() {
    if (!window.location.pathname.includes('about.html')) return;
}