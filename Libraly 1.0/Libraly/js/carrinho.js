document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const emptyCart = document.querySelector('.empty-cart');
    const cartContent = document.querySelector('.cart-content');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const freteElement = document.getElementById('frete');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function initCart() {
        renderCartItems();
        updateTotals();
        checkEmptyCart();
    }
    
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            checkEmptyCart();
            return;
        }
        
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="item-image">
                    <img src="${item.img}" alt="${item.title}" onerror="this.src='img/placeholder.jpg'">
                </div>
                <div class="item-details">
                    <h3>${item.title}</h3>
                    <p>${item.author}</p>
                    <span class="price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                </div>
                <div class="item-quantity">
                    <button class="quantity-btn minus" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-index="${index}">+</button>
                </div>
                <div class="item-total">
                    <span>R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                </div>
                <button class="remove-btn" data-index="${index}">🗑️</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        
        addEventListeners();
    }
    
    function addEventListeners() {
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (cart[index]) {
                    if (this.classList.contains('plus')) {
                        cart[index].quantity++;
                    } else if (this.classList.contains('minus') && cart[index].quantity > 1) {
                        cart[index].quantity--;
                    }
                    
                    saveCart();
                    renderCartItems();
                    updateTotals();
                }
            });
        });
        
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (cart[index]) {
                    removeFromCart(index);
                }
            });
        });
    }
    
    function updateTotals() {
        let subtotal = 0;
        
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
        });
        
        const frete = subtotal > 0 ? 10.00 : 0;
        const total = subtotal + frete;
        
        if (subtotalElement) subtotalElement.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        if (freteElement) freteElement.textContent = `R$ ${frete.toFixed(2).replace('.', ',')}`;
        if (totalElement) totalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
    
    function checkEmptyCart() {
        if (cart.length === 0) {
            if (cartContent) cartContent.style.display = 'none';
            if (emptyCart) emptyCart.classList.remove('hidden');
        } else {
            if (cartContent) cartContent.style.display = 'grid';
            if (emptyCart) emptyCart.classList.add('hidden');
        }
    }
    
    function removeFromCart(index) {
        if (index >= 0 && index < cart.length) {
            cart.splice(index, 1);
            saveCart();
            initCart();
        }
    }
    
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    initCart();
});