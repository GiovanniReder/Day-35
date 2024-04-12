document.addEventListener("DOMContentLoaded", () => {
  const addProduct = document.getElementById("form");

  addProduct.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const brand = document.getElementById("brand").value;
    const imageUrl = document.getElementById("imageUrl").value;
    const price = document.getElementById("price").value;

    const newProduct = {
      name: name,
      description: description,
      brand: brand,
      imageUrl: imageUrl,
      price: price,
    };
    console.log(newProduct);

    /* METODO POST */

    fetch("https://striveschool-api.herokuapp.com/api/product/", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTU2YzdmMzA0NjAwMWFlNTlmNWMiLCJpYXQiOjE3MTI5MDc2MjgsImV4cCI6MTcxNDExNzIyOH0.mbgB7Wr21qK9N-Li8pemb0rhJEewSIpjLYblJbWY5W0",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("error");
        }
      })
      .then((data) => {
        console.log(data);
        event.target.reset();
      })
      .catch((error) => {
        console.log(error);
      });

    /* METODO GET */

    fetch("https://striveschool-api.herokuapp.com/api/product/", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTU2YzdmMzA0NjAwMWFlNTlmNWMiLCJpYXQiOjE3MTI5MDc2MjgsImV4cCI6MTcxNDExNzIyOH0.mbgB7Wr21qK9N-Li8pemb0rhJEewSIpjLYblJbWY5W0",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("error while get");
        }
      })
      .then((data) => {
        const productCardContainer = document.getElementById(".container");
        data.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.classList.add("card", "my-3");
          productCard.innerHTML = `
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text">${product.brand}</p>
              <p class="card-text">${product.price}</p>
              <button id=deleteBtn_${product.id} class="btn btn-danger">Remove</button>
              <button id=${product.id} class="btn btn-primary btn-edit">Edit</button>
              `;
          productCardContainer.appendChild(productCard);
          const removeBtn = document.getElementById(`remove_${product.id}`);
          removeBtn.addEventListener("click", function () {
            removeProduct(product._id);
          });
        });
      })
      .catch((error) => {
        console.log("error while get", error);
      });
  });
});

/* METODO DELETE */

const delBtn = document.getElementById("deleteBtn");
delBtn.addEventListener("click", function () {
  const URL = "https://striveschool-api.herokuapp.com/api/product/";
  fetch(URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTU2YzdmMzA0NjAwMWFlNTlmNWMiLCJpYXQiOjE3MTI5MDc2MjgsImV4cCI6MTcxNDExNzIyOH0.mbgB7Wr21qK9N-Li8pemb0rhJEewSIpjLYblJbWY5W0",
    },
  })
    .then((response) => {
      if (response.ok) {
        throw new Error("Errore durante la richiesta DELETE");
      }

      console.log("Item deleted");
    })
    .catch((error) => {
      console.log("Si è verificato un errore:", error);
    });
});
