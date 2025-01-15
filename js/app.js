import products from '../data/products.json' with { type: "json" };

window.changeValues = changeValues;
window.addItem = addItem;
window.removeItem = removeItem;
window.clearCart = clearCart;

const mapProducts = new Map(Object.entries(products));
let mapCartItems = new Map();
// debugger; // Esta linha permite acessar as variáveis em tempo real por exemplo.

function changeValues() {
  const productId = document.getElementById('product').value;
  
  if (product == 'None') {
    document.getElementById('product-price').innerHTML = '$0.00';
  }

  else {
    document.getElementById('product-price').innerHTML = '$' + parseFloat(mapProducts.get(productId).price).toFixed(2);
  }
}

function addItem() {
  const productId = document.getElementById('product').value;

  if (mapProducts.has(productId)) {
    errorGuide('product', 'remove');
    const quantity = document.getElementById('quantity').value;

    if (quantity > 0) {
      errorGuide('quantity', 'remove');
      const price = mapProducts.get(productId).price;
      const name = mapProducts.get(productId).name;

      if (mapCartItems.has(productId)) {
        mapCartItems.get(productId).set('quantity', parseFloat(mapCartItems.get(productId).get('quantity')) + parseFloat(quantity));
      }
      
      else {
        mapCartItems.set(productId, new Map([
          ["id", productId],
          ["name", name],
          ["price", price],
          ["quantity", quantity]
        ]));
      }

      printCartItems();
    }

    else {
      errorGuide('quantity', 'add');
    }
  }

  else {
    errorGuide('product', 'add');
  }
}

function removeItem() {
  const productId = document.getElementById('product').value;
  
  if (mapProducts.has(productId)) {
    errorGuide('product', 'remove');
    const quantity = document.getElementById('quantity').value;

    console.log("quantity :: " + quantity);
    

    if (quantity > 0) {
      errorGuide('quantity', 'remove');

      if (mapCartItems.has(productId)) {
        mapCartItems.get(productId).set('quantity', parseFloat(mapCartItems.get(productId).get('quantity')) - parseFloat(quantity));

        if (mapCartItems.get(productId).get('quantity') < 1) {
          mapCartItems.delete(productId);
        }
      }
    
      printCartItems();
    }

    else {
      errorGuide('quantity', 'add');
    }
  }

  else {
    errorGuide('product', 'add');
  }
}

function clearCart() {
  document.getElementById('product').value = 'None';
  document.getElementById('product-price').innerHTML = '$0.00';
  document.getElementById('quantity').value = '';
  document.getElementById('cart-summary').innerHTML = '';
  document.getElementById('total-value').innerHTML = '$0.00';
  mapCartItems = new Map();

  if (document.getElementById('product').classList.contains('attention')) {
    document.getElementById('product').classList.remove('attention')
  }

  if (document.getElementById('quantity').classList.contains('attention')) {
    document.getElementById('quantity').classList.remove('attention')
  }
}

function printCartItems() {
  let totalPrice = 0;

  document.getElementById('cart-summary').innerHTML = '';
  
  mapCartItems.forEach(item => {
    document.getElementById('cart-summary').innerHTML +=  ''
    + '<section class="carrinho__produtos__produto" id="cart-summary">'
    + '   <span class="texto-azul">' 
    + `       ${item.get('quantity')}x`
    + '   </span>'
    + '   <b>' 
    + `       ${item.get('name')}`
    + '   </b>'
    + '   <span class="texto-azul">'
    + `       $${item.get('price').toFixed(2)}`
    + '   </span>'
    + '   <br>'
    + `   (Total: $${(item.get('price').toFixed(2) * item.get('quantity')).toFixed(2)})`
    + '</section>';

    if (!totalPrice) {
      totalPrice = parseFloat((item.get('quantity') * item.get('price').toFixed(2)).toFixed(2));
    }
    
    else {
      totalPrice = parseFloat(parseFloat(totalPrice) + parseFloat(parseInt(item.get('quantity')) * parseFloat(item.get('price').toFixed(2))));
    }
  });

  document.getElementById('total-value').innerHTML = `$${totalPrice}`;
}

function errorGuide(param, action) {
  if (action == 'add' && !document.getElementById(param).classList.contains('attention')) {
    alert('Please insert a valid ' + param + '!');
    document.getElementById(param).classList.add('attention');
  }
  
  if (action == 'remove' && document.getElementById(param).classList.contains('attention')) {
    document.getElementById(param).classList.remove('attention');
  }
}