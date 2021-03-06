var databaseRef = firebase.database().ref();
var isSignedIn = false;

// Get auth redirect result
firebase.auth().getRedirectResult().then((result) => {
	if (result.user) {
		isSignedIn = true;
		document.getElementById('cartinfo').style.display = 'block';
		document.getElementById('auth').innerHTML = "Sign Out";
	}
});

// Firebase CRUD
databaseRef.on('child_added', (snapshot) => {
	addCartItem(snapshot.val().name, snapshot.val().price);
});

databaseRef.on('child_removed', (snapshot) => {
	console.log(snapshot.key);
	removeCartItem(snapshot.key);
});

// Show cart 
function showCart() {
	var btn = document.getElementById('shoppingcart');
	document.getElementById('cartinfo').style.display = 'block';
	updateTotal();
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
	//addCartItem(name, price);
	alert('Item added to cart');
	var itemData = {
		'name': name, 
		'price': price
	}
	var pushedRef = firebase.database().ref().push(itemData);
	console.log(pushedRef.key);
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
        <button class="removebtn" type="button" onclick="removeCartItem()">REMOVE</button>
    </div>`
    div.innerHTML = cartDivContent;
    cartInfo.appendChild(div);
    div.getElementsByClassName('removebtn')[0].addEventListener('click', removeCartItem);
   	updateTotal();
}

// Remove from cart 
function removeCartItem(e, id) {
	var button = e.target;
	var parent = button.parentElement.parentElement;
	parent.remove();
	alert('Item removed');
	var price = document.getElementsByClassName('cart-item-price')[0];
	updateTotal();
	firebase.database().ref().child(id).remove();
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

// Sign in
function signIn() {
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithRedirect(provider);
}

// Sign out
function signOut() {
	firebase.auth().signOut().then(() => {
		isSignedIn = false;
		document.getElementById('cartinfo').style.display = 'none';
		docuemnt.getElementById('auth').innerHTML = "Sign In";
	})
}

// Handle Login
function handleLogin() {
	if (isSignedIn) {
		signOut();
	} else {
		signIn();
	}
}

// Event Listeners
document.getElementById('shoppingcart').addEventListener('click', showCart);
document.getElementById('x').addEventListener('click', hideCart);
document.getElementById('clear').addEventListener('click', clearCart);
document.getElementById('auth').addEventListener('click', handleLogin);

var add = document.getElementsByClassName('cart');
for (var i=0; i < add.length; i++) {
	var button = add[i];
	button.addEventListener('click', addCartClick);
}

var remove = document.getElementsByClassName('removebtn');
for (var i=0; i<remove.length; i++) {
	var button = remove[i];
	button.addEventListener('click', removeCartItem);
}