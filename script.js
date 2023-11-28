document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productElement = button.closest('.product');
            const productId = productElement.getAttribute('data-id');
            const productName = productElement.getAttribute('data-name');
            const productPrice = parseFloat(productElement.getAttribute('data-price'));
            const productImage = productElement.getAttribute('data-image');

            const existingCartItem = cartItems.find(item => item.id === productId);

            if (existingCartItem) {
                existingCartItem.quantity += 1;
            } else {
                cartItems.push({ id: productId, name: productName, price: productPrice, quantity: 1, image: productImage });
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            updateCart();
        });
    });

    checkoutButton.addEventListener('click', function () {
        alert('Redirecting to checkout page...');
        // You can implement the checkout logic here, e.g., redirecting to a checkout page.
    });

    function updateCart() {
        cartItemsElement.innerHTML = '';

        let total = 0;

        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('cart-item');

            const itemImage = document.createElement('img');
            itemImage.src = item.image;
            itemImage.alt = item.name;

            const itemDetails = document.createElement('div');
            itemDetails.innerHTML = `<strong>${item.name}</strong> x${item.quantity} - ${(item.price * item.quantity).toFixed(2)}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', function () {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    cartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
                }

                localStorage.setItem('cartItems', JSON.stringify(cartItems));

                updateCart();
            });

            listItem.appendChild(itemImage);
            listItem.appendChild(itemDetails);
            listItem.appendChild(removeButton);
            cartItemsElement.appendChild(listItem);

            total += item.price * item.quantity;
        });

        cartTotalElement.textContent = total.toFixed(2);
    }

    // Initial update when the page loads
    updateCart();
});