document.addEventListener('DOMContentLoaded', function() {
    const immortalButton = document.getElementById('immortalButton');
    const arcaneButton = document.getElementById('arcaneButton');
    const showAllButton = document.getElementById('showAllButton');

    function hideAllItems() {
        const items = document.querySelectorAll('.item');
        items.forEach(item => {
            item.style.display = 'none';
        });
    }

    function showAllItems() {
        hideAllItems();
        const items = document.querySelectorAll('.item');
        items.forEach(item => {
            item.style.display = 'block';
        });
    }

    function showItemsByAlt(alt) {
        hideAllItems();
        const items = document.querySelectorAll(`.item[alt="${alt}"]`);
        items.forEach(item => {
            item.style.display = 'block';
        });
    }

    immortalButton.addEventListener('click', () => showItemsByAlt('immortal'));
    arcaneButton.addEventListener('click', () => showItemsByAlt('arcana'));
    showAllButton.addEventListener('click', showAllItems);

    const backToTopButton = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) { 
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const searchInput = document.getElementById('searchInput');
    const items = document.querySelectorAll('.item');

    searchInput.addEventListener('input', function() {
        const searchText = this.value.trim().toLowerCase();

        items.forEach(item => {
            const name = item.querySelector('.name').textContent.toLowerCase();
            if (name.includes(searchText)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    const cart = {
        items: [],
        total: 0,
        addItem: function(item) {
            this.items.push(item);
            this.total += item.price;
            this.render();
        },
        checkout: function() {
            alert('Оформление заказа...');
        },
        render: function() {
            const cartItemsContainer = document.getElementById('cartItems');
            cartItemsContainer.innerHTML = '';

            this.items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div>${item.name} - ${item.price} $</div>
                `;
                cartItemsContainer.appendChild(itemElement);
            });

            document.getElementById('totalPrice').textContent = this.total;
        }
    };

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const parent = this.closest('.item');
            const name = parent.querySelector('.name').textContent;
            const price = parseFloat(parent.querySelector('.price').textContent.replace('$', ''));
            const image = parent.querySelector('img').src;

            const item = { name, price, image };
            cart.addItem(item);
        });
    });

    document.getElementById('checkoutBtn').addEventListener('click', function() {
        cart.checkout();
    });

    document.getElementById('openCartBtn').addEventListener('click', function() {
        const cartModal = document.getElementById('cartModal');
        cartModal.style.display = 'block';
    });

    document.querySelector('.close').addEventListener('click', function() {
        const cartModal = document.getElementById('cartModal');
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        const cartModal = document.getElementById('cartModal');
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    searchInput.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});

function toggleMenu() {
    var menu = document.getElementById("navbar-menu");
    if (menu.classList.contains("open")) {
        menu.classList.remove("open");
    } else {
        menu.classList.add("open");
        menu.addEventListener("click", function(event) {
             menu.classList.remove("open");
         });
    }
}
const closeButton = document.querySelector('.close');

closeButton.addEventListener('click', function() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('items.xml')
        .then(response => response.text())
        .then(data => {
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(data, 'text/xml');

            let items = xmlDoc.getElementsByTagName('item');

            for (let i = 0; i < items.length; i++) {
                let name = items[i].getElementsByTagName('name')[0].textContent;
                let price = parseFloat(items[i].getElementsByTagName('price')[0].textContent);

               if (name === 'Bladeform Legacy' && price === 22.28) {
                    console.log('Цена предмета Bladeform Legacy соответствует ожидаемой цене.');
                } else {
                    console.log('Цена предмета Bladeform Legacy не соответствует ожидаемой цене.');
                }
            }
        })
        .catch(error => console.error('Ошибка загрузки XML файла:', error));
});
