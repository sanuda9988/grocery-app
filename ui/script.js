const API_URL = "http://127.0.0.1:5000";

function loadProducts() {
    fetch(`${API_URL}/getproducts`)
    .then(res => res.json())
    .then(products => {
        const tbody = document.querySelector("#productsTable tbody");
        tbody.innerHTML = "";
        products.forEach(p => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${p.products_id}</td>
                <td>${p.name}</td>
                <td>${p.uom_name}</td>
                <td>${p.price_per_unit}</td>
                <td>
                    <button class="update-btn" onclick="updateProduct(${p.products_id})">Update</button>
                    <button class="delete-btn" onclick="deleteProduct(${p.products_id})">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    });
}

document.getElementById("addProductForm").addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const uom_id = parseInt(document.getElementById("uom_id").value);
    const price = parseFloat(document.getElementById("price").value);

    fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name: name, uom_id: uom_id, price_per_unit: price})
    }).then(() => {
        loadProducts();
        document.getElementById("addProductForm").reset();
    });
});

function deleteProduct(id) {
    fetch(`${API_URL}/products/${id}`, {method: "DELETE"})
    .then(() => loadProducts());
}

function updateProduct(id) {
    const newName = prompt("Enter new name:");
    const newUom = prompt("Enter new UOM ID (1=each, 2=kg):");
    const newPrice = prompt("Enter new price:");
    fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name: newName, uom_id: parseInt(newUom), price_per_unit: parseFloat(newPrice)})
    }).then(() => loadProducts());
}

loadProducts();