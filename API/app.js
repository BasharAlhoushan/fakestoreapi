



// Define an array to store the products
let products = [];

class Product {
  constructor(title, price, description, image) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.image = image;
  }
}

// Function to create and add a new product to the array
function createProduct(title, price, description, image) {
  const newProduct = new Product(title, price, description, image);
  products.push(newProduct);
}

// Function to read and display all products in the main section
function displayProducts() {
  const containerDiv = document.getElementById('cards');
  let data1 = "";

  products.forEach((product) => {
    data1 += `<div class="card">
      <h1 class="title">${product.title}</h1>
      <img src=${product.image} alt="" class="image">
      <p>${product.description}</p>
      <p class="price">${product.price}</p>
    </div>`;
  });

  containerDiv.innerHTML = data1;
}

// Fetch data from the API and create products
fetch('https://fakestoreapi.com/products')
  .then((response) => response.json())
  .then((completeData) => {
    // Create products from fetched data and add them to the array
    for (let i = 0; i < 20; i++) {
      const productData = completeData[i];
      createProduct(productData.title, productData.price, productData.description, productData.image);
    }

    // Display products in the main section
    displayProducts();
  })
  .catch((error) => {
    console.log(error);
  });




  const postForm = document.getElementById("post-form");
const postList = document.getElementById("post-list");

// Function to fetch and display posts
function getPosts() {
  fetch("http://localhost:3000/posts")
    .then((response) => response.json())
    .then((posts) => {
      postList.innerHTML = "";
      posts.forEach((post) => {
        postList.innerHTML += `
          <div class="post">
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <button class="delete" data-id="${post.id}">Delete</button>
            <button class="update" data-id="${post.id}">Update</button>
          </div>
        `;
      });
    });
}

// Initial post list
getPosts();

// Create a new post
postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;

  fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  })
    .then(() => {
      getPosts(); // Refresh the post list
      document.getElementById("post-title").value = "";
      document.getElementById("post-content").value = "";
    });
});

// Handle delete and update buttons
postList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const id = e.target.getAttribute("data-id");
    fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
    }).then(() => getPosts()); // Refresh the post list
  }

  if (e.target.classList.contains("update")) {
    const id = e.target.getAttribute("data-id");
    // Implement update functionality here
    // You can create a form to update the post's title and content
  }
});

