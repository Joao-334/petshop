async function buildProducts() {
    $('.main').append('<ul class="product_list"></ul>');


    const products = await fetch('http://localhost:3000/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const arrayProducts = await products.json();

    await createProducts(arrayProducts);

    return;
}

buildProducts();

async function createProducts(arrayProducts) {
    arrayProducts.forEach((product) => {
        $('.product_list').append(`
        <li class="product">
            <img src="${product.url}" alt="imagem do produto" class="product_image">
            <div class="product_content">
                <h6 class="title_product">${product.name}</h6>
                <p class="price_product">Valor: R$${product.price}</p>
                <p class="stock_product">Quantidade: ${product.stock} unidades</p>
                <div class="button">
                    <button class="button_remove">-</button>
                    <span class="text_button">Remover Produto</span>
                </div>
                <input type="hidden" value="${product.id}">
            </div>
        </li>
        `);
    });

    $('.button_remove').on('click', async (event) => {
        const id = event.target.parentNode.parentNode.lastChild.previousElementSibling.value;
        console.log(id);

        await fetch('http://localhost:3000/products/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
    });
}