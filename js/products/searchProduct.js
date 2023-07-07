async function searchProduct() {
    $('.search').on('search', async (event) => {
        event.preventDefault();
        const dataSearch = $('.search').val();
        const listProducts = $('.product_list');


        const searchResults = await fetch('http://localhost:3000/products?q=' + dataSearch, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const searchResultsConverted = await searchResults.json();

        listProducts.empty();

        if (searchResultsConverted.length === 0) {
            $('.product_list').append(
                `<h2>Não conseguimos encontrar nenhum resultado para sua busca</h2>`
            )
        }

        else {
            searchResultsConverted.forEach(product => {
                $('.product_list').append(
                    `   
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
                `
                );
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
    });
}

searchProduct();