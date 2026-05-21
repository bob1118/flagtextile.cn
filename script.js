// Language data
const languages = {
    zh: {
        'nav-home': '主页',
        'nav-products': '产品',
        'nav-about': '关于',
        'nav-contact': '联系',
        'home-title': '浙江弗蘭戈進出口有限公司',
        'home-desc': '专注于外贸纺织行业，提供高品质的服装面料、家纺面料和户外面料。我们的产品以优质材料和先进工艺著称，致力于满足全球客户的需求。',
        'products-title': '我们的产品',
        'product-clothing': '服装面料',
        'product-clothing-1': '服装面料1',
        'product-clothing-2': '服装面料2',
        'product-clothing-3': '服装面料3',
        'product-home': '家纺面料',
        'product-home-1': '家纺面料1',
        'product-home-2': '家纺面料2',
        'product-home-3': '家纺面料3',
        'product-outdoor': '户外面料',
        'product-outdoor-1': '户外面料1',
        'product-outdoor-2': '户外面料2',
        'product-outdoor-3': '户外面料3',
        'about-title': '关于我们',
        'about-desc': '浙江弗蘭戈進出口有限公司致力于成为纺织行业的领先企业。我们秉承创新、品质、服务的理念，为客户提供最优质的产品和服务。我们的愿景是成为全球纺织市场的佼佼者，为客户创造价值，为社会贡献力量。',
        'contact-title': '联系我们',
        'contact-email': '邮箱：564655068@qq.com',
        'contact-phone': '电话：+86 19817808333',
        'contact-address': '地址：UNIT 18, 8/F, PETER LEUNG INDUSTRIAL BUILDING 103 WAI YIP STREET KWUN TONG KL'
    },
    en: {
        'nav-home': 'Home',
        'nav-products': 'Products',
        'nav-about': 'About',
        'nav-contact': 'Contact',
        'home-title': 'ZHEJIANG FLAG IMPORT & EXPORT CO., LIMITED',
        'home-desc': 'Specializing in foreign trade textile industry, providing high-quality clothing fabrics, home textile fabrics, and outdoor fabrics. Our products are renowned for their superior materials and advanced craftsmanship, committed to meeting the needs of global customers.',
        'products-title': 'Our Products',
        'product-clothing': 'Clothing Fabrics',
        'product-clothing-1': 'Clothing Fabric 1',
        'product-clothing-2': 'Clothing Fabric 2',
        'product-clothing-3': 'Clothing Fabric 3',
        'product-home': 'Home Textile Fabrics',
        'product-home-1': 'Home Textile Fabric 1',
        'product-home-2': 'Home Textile Fabric 2',
        'product-home-3': 'Home Textile Fabric 3',
        'product-outdoor': 'Outdoor Fabrics',
        'product-outdoor-1': 'Outdoor Fabric 1',
        'product-outdoor-2': 'Outdoor Fabric 2',
        'product-outdoor-3': 'Outdoor Fabric 3',
        'about-title': 'About Us',
        'about-desc': 'ZHEJIANG FLAG IMPORT & EXPORT CO., LIMITED is committed to becoming a leading enterprise in the textile industry. We adhere to the philosophy of innovation, quality, and service, providing customers with the highest quality products and services. Our vision is to become a leader in the global textile market, creating value for customers and contributing to society.',
        'contact-title': 'Contact Us',
        'contact-email': 'Email: 564655068@qq.com',
        'contact-phone': 'Phone: +86 19817808333',
        'contact-address': 'Address: UNIT 18, 8/F, PETER LEUNG INDUSTRIAL BUILDING 103 WAI YIP STREET KWUN TONG KL'
    }
};

// Language switch
document.getElementById('lang-zh').addEventListener('click', () => switchLanguage('zh'));
document.getElementById('lang-en').addEventListener('click', () => switchLanguage('en'));

function switchLanguage(lang) {
    document.getElementById('lang-zh').classList.toggle('active', lang === 'zh');
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = languages[lang]['home-title'];

    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(el => {
        const key = el.getAttribute('data-lang');
        if (languages[lang][key]) {
            el.textContent = languages[lang][key];
        }
    });
}

// Hero background slideshow
const heroSection = document.getElementById('home');
const backgrounds = ['images/1.jpg', 'images/2.jpg', 'images/3.jpg'];
let currentBg = 0;

function changeBackground() {
    currentBg = (currentBg + 1) % backgrounds.length;
    heroSection.style.backgroundImage = `url(${backgrounds[currentBg]})`;
}

setInterval(changeBackground, 3000); // Change every 3 seconds
heroSection.style.backgroundImage = `url(${backgrounds[0]})`; // Initial background

// Modal for products
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const captionText = document.getElementById('caption');
const closeBtn = document.getElementsByClassName('close')[0];

document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('click', function() {
        modal.style.display = 'block';
        modalImg.src = this.getAttribute('data-img');
        captionText.innerHTML = this.querySelector('p').textContent;
    });
});

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Detect user's browser language and switch if necessary
const userLang = navigator.language || navigator.userLanguage;
if (userLang && userLang.startsWith('zh')) {
    switchLanguage('zh');
}else{
    switchLanguage('en');
}
