// Database JSON --> Mảng và Object 
const products = [
    {
        id: 1, 
        name: "Iphone 17",
        price: 25000000,
        image: "https://shopdunk.com/images/thumbs/0049405_iphone-17-256gb.png"
    },
    {
        id: 2, 
        name: "Iphone 17 air",
        price: 25000000,
        image: "https://hugotech.vn/wp-content/uploads/iPhone-17-Air-Trắng-Mây4-600x600.jpg"
    },
    {
        id: 3, 
        name: "Iphone 17 pro",
        price: 32000000,
        image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/wysiwyg/Phone/Apple/iPhone-17/iphone-17-pro-33.jpg"
    },
    {
        id: 4, 
        name: "Iphone 17 pro max",
        price: 38000000,
        image: "https://cdn.phuckhangmobile.com/image/iphone-17-pro-trang-2-33906j.jpg"
    }
]

function renderProducts() {
    let container = document.getElementById("product-list");

    if (!container) return;

    container.innerHTML = "";

    products.forEach(product => {
        let html = `
        <div class="col-md-3 col-sm-6">
            <div class="card product-card h-100">
                <img src="${product.image}" class="card-img-top">
                <div class="card-body text-center d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <span class="price-tag mt-auto">${product.price.toLocaleString()} đ</span>
                    <button class="btn btn-primary w-100 mt-2" onClick = "addToCart(${product.id})">Thêm vào giỏ</button>
                </div>
            </div>
        </div>
        `;
        container.innerHTML += html;
    });
}

renderProducts(); // có hoạt động


let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id) {
    let item = cart.find(i => i.id === id);

    if (item) {
        item.quantity++; 
    } else {
        cart.push({ id: id, quantity: 1 }); 
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    
    alert("Đã thêm vào giỏ hàng!");
}//hoạt động

function renderCart() {
    let tbody = document.getElementById("cart-body");
    let totalSpan = document.getElementById("total-price");

    if (!tbody) return; 

    tbody.innerHTML = "";
    let sum = 0;

    cart.forEach((item, index) => {
        let info = products.find(p => p.id === item.id);
        
        if (info) {
            // Tính thành tiền
            let money = info.price * item.quantity;
            sum += money;

            tbody.innerHTML += `
                <tr>
                    <td>${info.name}</td>
                    <td>${info.price.toLocaleString()}đ</td>
                    <td>
                        <input type="number" value="${item.quantity}" 
                               onchange="updateCart(${index}, this.value)"
                               style="width: 60px">
                    </td>
                    <td>${money.toLocaleString()}đ</td>
                    <td>
                        <button onclick="removeCart(${index})" class="btn btn-danger btn-sm">Xóa</button>
                    </td>
                </tr>
            `;
        }
    });

    totalSpan.innerText = `Tổng cộng: ${sum.toLocaleString()}đ`;
}


renderCart();






function updateCart (index, quantity) {
    if (quantity < 1) {
        alert("Số lượng sản phẩm tối thiểu là 1");
        renderCart();
        return;
    }
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function removeCart(index) {
    let confirmDelete = confirm("Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng?");

    if (confirmDelete) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
}