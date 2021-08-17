// Show or hide cart on click 
function showCart() {
	if (document.getElementById('cartinfo').style.display == 'block') {
		document.getElementById('cartinfo').style.display = 'none';
	} else {
		document.getElementById('cartinfo').style.display = 'block';
	}
}

// Add to cart button clicked
function addCartClick(e) {
	var click = e.target;
	var item = click.parentElement.parentElement;
	var name = item.getElementsByClassName('caption')[0].innerText;
	var price = item.getElementsByClassName('price')[0].innerText;
	addCartItem(name, price);
} 

// Display item in cart
function addCartItem(name, price) {
	var div = document.createElement('div');
	var cartInfo = document.getElementById('cartinfo');
	var itemName = document.createElement('p');
	var itemPrice = document.createElement('p');
	itemName.innerHTML = name;
	itemPrice.innerHTML = price;
	itemName.appendChild(div);
	itemPrice.appendChild(div);
	div.appendChild(cartInfo);
}

// Remove from cart 
function removeCartItem(e) {
	var button = e.target;
	button.parentElement.parentElment.remove();
}

var add = document.getElementsByClassName('cart');
for (var i=0; i < add.length; i++) {
	var button = add[i];
	console.log('hi');
	button.addEventListener('click', addCartClick);
}

// document.getElementById('shoppingcart').addEventListener('click', showCart);

