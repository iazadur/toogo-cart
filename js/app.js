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
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <div class="col">
    <div class="card h-100 single-product rounded-3">
      <img src="${image}" class="card-img-top p-5 w-50 mx-auto" alt="">
      <div class="card-body">
      <p class="card-text fw-bold ">${product.title.toUpperCase()}</p>
      <p class="card-text fs-6"><span class="fw-bold">CATEGORY:</span> ${product.category.toUpperCase()}</p>
        <h2 style="color: #CD5E04;">$ ${product.price}</h2>
        <div class="d-flex justify-content-around">

          <p class="fw-bold">
          <i class="fas fa-star text-info"></i>
          <i class="fas fa-star text-info"></i>
          <i class="fas fa-star text-info"></i>
          <i class="fas fa-star text-info"></i>
          <i class="far fa-star text-info"></i>(${product.rating.rate})
          </p>
          <p class="fw-bold"><i class="fas fa-user me-1 text-success"></i> ${product.rating.count} <span class="text-danger">reviews</span></p>
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
  document.getElementById(id).innerText = value.toFixed(2);
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


// Fetching Product details 

const showDetails = id => {
  const modal = document.getElementById('product-details')
  modal.textContent = ''
  const url = `https://fakestoreapi.com/products/${id}`
  fetch(url)
    .then(res => res.json())
    .then(json => showInModal(json,modal))
}

// showing Product details in Modal
const showInModal = (product, modal) => {
  
  
  const div = document.createElement('div')
  div.classList.add('modal-content')
  div.innerHTML = `

  

  <div class="modal-header">
  <h5 class="modal-title" id="staticBackdropLabel">CATEGORY: ${product.category.toUpperCase()}</h5>
  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
  <div class="col">
    <div class="card h-100">
      <img src="${product.image}" class="card-img-top p-5 w-50 mx-auto" alt="">
      <div class="card-body">

        <p class="card-text fw-bold ">${product.title.toUpperCase()}</p>
        <p class="card-text">${product.description}</p>
        <h2 style="color: #CD5E04;">$ ${product.price}</h2>

        <div class="d-flex justify-content-around">
          <p class="fw-bold">
          <i class="fas fa-star text-info"></i>
          <i class="fas fa-star text-info"></i>
          <i class="fas fa-star text-info"></i>
          <i class="fas fa-star text-info"></i>
          <i class="far fa-star text-info"></i>
          (${product.rating.rate} )
          </p>
          <p class="fw-bold"><i class="fas fa-user me-1 text-success"></i> ${product.rating.count} <span
              class="text-danger">reviews</span></p>
        </div>

        <div class="d-flex flex-column justify-content-center">
          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn"
            class="btn btn-info fw-bold w-100 mx-auto my-2">Add to
            cart</button>
        </div>

      </div>
    </div>
  </div>
  
  `
  modal.appendChild(div)
}


// Buy now PAY with ssl commarce
document.getElementById('buy-now').addEventListener('click',function () {
  const total = document.getElementById('total').innerText
  const payNow = document.getElementById('pay-now')
  payNow.innerText = `PAY $ ${total}`
})