// Принудительно показываем главную страницу при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен!');
    
    // Показываем главную страницу
    showPage('home');
    
    // Настраиваем фильтры каталога
    setupFilters();
    
    // Настраиваем модальное окно
    setupModal();
    
    // Настраиваем форму обратной связи
    setupForm();
    
    // Настраиваем особенную кнопку
    setupSpecialButton();
    
    // Обработка кликов по навигации
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('href').substring(1);
            showPage(pageId);
        });
    });
});

// Данные товаров
const products = [
    {
        id: 1,
        name: "Джинсы Levi's",
        price: 1500,
        category: "clothes",
        images: ["👖"],
        description: "Классические джинсы Levi's, отличное состояние. Размер: 32/32. Цвет: синий.",
        condition: "Отличное"
    },
    {
        id: 2,
        name: "Кроссовки Nike",
        price: 2000,
        category: "shoes",
        images: ["👟"],
        description: "Кроссовки Nike Air Max, почти новые. Размер: 42. Цвет: черный/белый.",
        condition: "Очень хорошее"
    },
    {
        id: 3,
        name: "Кожаная куртка",
        price: 3500,
        category: "clothes",
        images: ["🧥"],
        description: "Натуральная кожаная куртка, стильный крой. Размер: M. Цвет: черный.",
        condition: "Хорошее"
    },
    {
        id: 4,
        name: "Рюкзак The North Face",
        price: 1800,
        category: "accessories",
        images: ["🎒"],
        description: "Вместительный рюкзак для города и путешествий. Отличное состояние.",
        condition: "Отличное"
    },
    {
        id: 5,
        name: "Платье Zara",
        price: 1200,
        category: "clothes",
        images: ["👗"],
        description: "Элегантное платье для офиса и вечера. Размер: S. Цвет: синий.",
        condition: "Очень хорошее"
    },
    {
        id: 6,
        name: "Туфли кожаные",
        price: 2200,
        category: "shoes",
        images: ["👞"],
        description: "Классические кожаные туфли, подходят для делового стиля. Размер: 41.",
        condition: "Хорошее"
    }
];

// Функции для навигации
function showPage(pageId) {
    // Скрыть все страницы
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Показать выбранную страницу
    document.getElementById(pageId).classList.add('active');
    
    // Обновить активную ссылку в меню
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[href="#${pageId}"]`).classList.add('active');
    
    // Если открываем каталог - отобразить товары
    if (pageId === 'catalog') {
        displayProducts('all');
    }
}

// Отображение товаров в каталоге
function displayProducts(category) {
    const grid = document.getElementById('catalogGrid');
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image">
                <span style="font-size: 4rem;">${product.images[0]}</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="price">${product.price} руб.</div>
                <p>Состояние: ${product.condition}</p>
            </div>
        </div>
    `).join('');
}

// Фильтрация товаров
function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Убрать активный класс у всех кнопок
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active');
            });
            // Добавить активный класс нажатой кнопке
            this.classList.add('active');
            // Отобразить товары выбранной категории
            displayProducts(this.dataset.category);
        });
    });
}

// Модальное окно товара
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <h2>${product.name}</h2>
        <div style="text-align: center; margin: 2rem 0;">
            <span style="font-size: 6rem;">${product.images[0]}</span>
        </div>
        <div class="price" style="font-size: 1.5rem; text-align: center;">${product.price} руб.</div>
        <div style="margin: 1.5rem 0;">
            <h3>Описание</h3>
            <p>${product.description}</p>
        </div>
        <div style="margin: 1.5rem 0;">
            <h3>Состояние</h3>
            <p>${product.condition}</p>
        </div>
        <button class="cta-button" style="width: 100%;" onclick="alert('Товар добавлен в корзину!')">Добавить в корзину</button>
    `;
    
    modal.style.display = 'block';
}

// Закрытие модального окна
function setupModal() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Обработка формы обратной связи
function setupForm() {
    document.getElementById('feedbackForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        this.reset();
    });
}

// Функция для особенной кнопки
function setupSpecialButton() {
    const specialButton = document.getElementById('specialButton');
    const specialModal = document.getElementById('specialModal');
    const closeSpecial = document.querySelector('.close-special');
    
    specialButton.addEventListener('click', function() {
        specialModal.style.display = 'block';
    });
    
    closeSpecial.addEventListener('click', function() {
        specialModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === specialModal) {
            specialModal.style.display = 'none';
        }
    });
}

// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});