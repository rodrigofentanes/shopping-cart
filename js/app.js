let mapSummaryProducts = new Map();

const mapPriceByProduct = new Map();
mapPriceByProduct.set('Headphone', 200.00);
mapPriceByProduct.set('Smartphone', 1400.00);
mapPriceByProduct.set('VRGlasses', 5000.00);

function changeValues() {
  const product = document.getElementById('product').value;

  if (product == '--None--') {
    document.getElementById('product-price').innerHTML = '$0.00';
  }

  else {
    document.getElementById('product-price').innerHTML = '$' + parseFloat(mapPriceByProduct.get(product)).toFixed(2);
  }
}

function addItem() {
  const product = document.getElementById('product').value;

  if (mapPriceByProduct.has(product)) {
    errorGuide('product', 'remove');
    const quantity = document.getElementById('quantity').value;

    if (quantity > 0) {
      errorGuide('quantity', 'remove');
      const price = mapPriceByProduct.get(product);

      if (mapSummaryProducts.has(product)) {
        mapSummaryProducts.get(product).set('Quantity', parseFloat(mapSummaryProducts.get(product).get('Quantity')) + parseFloat(quantity));
      }
      
      else {
        mapSummaryProducts.set(product, new Map([
          ['Name', product],
          ['Price', price],
          ['Quantity', quantity]
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
  const product = document.getElementById('product').value;
  
  if (mapPriceByProduct.has(product)) {
    errorGuide('product', 'remove');
    const quantity = document.getElementById('quantity').value;

    if (quantity > 0) {
      errorGuide('quantity', 'remove');

      if (mapSummaryProducts.has(product)) {
        mapSummaryProducts.get(product).set('Quantity', parseFloat(mapSummaryProducts.get(product).get('Quantity')) - parseFloat(quantity));
      }
    
      if (mapSummaryProducts.get(product).get('Quantity') < 1) {
        mapSummaryProducts.delete(product);
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
  mapSummaryProducts = new Map();

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
  
  mapSummaryProducts.forEach(item => {
    document.getElementById('cart-summary').innerHTML +=  ''
    + '<section class="carrinho__produtos__produto" id="cart-summary">'
    + '   <span class="texto-azul">' 
    + `       ${item.get('Quantity')}x`
    + '   </span>'
    + '   <b>' 
    + `       ${item.get('Name')}`
    + '   </b>'
    + '   <span class="texto-azul">'
    + `       $${item.get('Price').toFixed(2)}`
    + '   </span>'
    + '   <br>'
    + `   (Total: $${(item.get('Price').toFixed(2) * item.get('Quantity')).toFixed(2)})`
    + '</section>';

    if (!totalPrice) {
      totalPrice = parseFloat((item.get('Quantity') * item.get('Price').toFixed(2)).toFixed(2));
    }
    
    else {
      totalPrice = parseFloat(parseFloat(totalPrice) + parseFloat(parseInt(item.get('Quantity')) * parseFloat(item.get('Price').toFixed(2))));
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