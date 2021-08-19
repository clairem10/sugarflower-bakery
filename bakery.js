// Show cart 
function showCart() {
	var btn = document.getElementById('shoppingcart');
	document.getElementById('cartinfo').style.display = 'block';
}

// Hide cart 
function hideCart() {
	document.getElementById('cartinfo').style.display = 'none';
}

// Add to cart 
function addCartClick(e) {
	var click = e.target;
	var item = click.parentElement.parentElement;
	var name = item.getElementsByClassName('caption')[0].innerText;
	var price = item.getElementsByClassName('price')[0].innerText;
	addCartItem(name, price);
	alert('Item added to cart');
	updateTotal();
} 

// Display item in cart
function addCartItem(name, price) {
	var div = document.createElement('div');
	div.classList.add('cartDiv');
	var cartInfo = document.getElementById('cartinfo');
	var cartDivContent = `
	<div class="cart-info">
        <div class="cart-item">
            <span class="cart-item-name">${name}</span>
        </div>
        <span class="cart-item-price">${price}</span>
        <button class="removebtn" type="button">REMOVE</button>
    </div>`
    div.innerHTML = cartDivContent;
    cartInfo.appendChild(div);
    div.getElementsByClassName('removebtn')[0].addEventListener('click', removeCartItem);
}

// Remove from cart 
function removeCartItem(e) {
	var button = e.target;
	button.parentElement.parentElement.remove();
	alert('Item removed');
	var price = document.getElementsByClassName('cart-item-price')[0];
	updateTotal();
}


// Update total 
function updateTotal() {
	var total = 0;
	var div = document.getElementsByClassName('cartDiv');
	var priceElement = document.getElementsByClassName('cart-item-price');
	for (var i=0; i<priceElement.length; i++) {
		var price = priceElement[i].innerHTML;
		var price = price.replace('$', '');
		total += parseInt(price);
	}
	console.log(total);
	document.getElementById('total-amount').innerHTML = '$' + total;
}

// Clear cart 
function clearCart() {
	var items = document.getElementsByClassName('cartDiv');
	for (var i=0; i<items.length; i++) {
		items[i].remove();
	}
	updateTotal();
}

// Add to cart event listener 
var add = document.getElementsByClassName('cart');
for (var i=0; i < add.length; i++) {
	var button = add[i];
	button.addEventListener('click', addCartClick);
}

// Remove from cart event listener 
var remove = document.getElementsByClassName('removebtn');
for (var i=0; i<remove.length; i++) {
	var button = remove[i];
	button.addEventListener('click', removeCartItem);
}

document.getElementById('shoppingcart').addEventListener('click', showCart);
document.getElementById('x').addEventListener('click', hideCart);
document.getElementById('clear').addEventListener('click', clearCart);