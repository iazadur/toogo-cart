const loadProducts = () => {
  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

loadProducts();


// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
    // div.innerHTML = `<div class="single-product">
    //   <div>
    // <img class="product-image" src=${product.image}></img>
    //   </div>
    //   <h3>${product.title}</h3>
    //   <p>Category: ${product.category}</p>
    //   <h2>Price: $ ${product.price}</h2>
    //   <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
    //   <button id="details-btn" class="btn btn-danger">Details</button></div>
    //   `;
    div.innerHTML = ` <div class="col">
    <div class="card h-100">
      <img src="${product.image}" class="card-img-top p-5 w-50 mx-auto" alt="">
      <div class="card-body">
        <h5 class="card-title fs-1">${product.category.toUpperCase()}</h5>
        <p class="card-text">Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops</p>
        <h2>$ ${product.price}</h2>
        <div class="d-flex justify-content-around">

          <p class="fw-bold">${product.rating.rate} <i class="fas fa-star text-info"></i></p>
          <p class="fw-bold">${product.rating.count} <span class="text-danger">reviews</span></p>
        </div>
        <div class="d-flex flex-column justify-content-center">

          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="btn btn-info fw-bold w-50 mx-auto my-2">Add to
            cart</button>
          <button id="details-btn" onclick="showDetails(${product.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn btn-success fw-bold w-50 mx-auto">Details</button>
        </div>
      </div>
    </div>
  </div>`;
    document.getElementById("all-products").appendChild(div);
  }
};



let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal()
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById('price').innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};


// showing Product details 

const showDetails = id => {
  const url = `https://fakestoreapi.com/products/${id}`
  fetch(url)
    .then(res => res.json())
    .then(json => showInModal(json))
}

const showInModal = product => {
  const modal = document.getElementById('product-details')
  modal.textContent = ''
  const div = document.createElement('div')
  div.classList.add('modal-content')
  div.innerHTML = `
  <div class="modal-header">
  <h5 class="modal-title" id="staticBackdropLabel">${product.category.toUpperCase()}</h5>
  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">



<div class="col">
    <div class="card h-100">
      <img src="${product.image}" class="card-img-top p-5 w-50 mx-auto" alt="">
      <div class="card-body">
        <h5 class="card-title fs-1"></h5>
        <p class="card-text">Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops</p>
        <h2>$ ${product.price}</h2>
        <div class="d-flex justify-content-around">

          <p class="fw-bold">${product.rating.rate} <i class="fas fa-star text-info"></i></p>
          <p class="fw-bold">${product.rating.count} <span class="text-danger">reviews</span></p>
        </div>
        <div class="d-flex flex-column justify-content-center">

          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="btn btn-info fw-bold w-100 mx-auto my-2">Add to
            cart</button>
          
        </div>
      </div>
    </div>
  </div>



</div>
<div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
</div>
  
  `
  modal.appendChild(div)
}