$('.create_modal').append(`
<div class="modal">
<form class="form_modal">
    <span class="close_modal">x</span>
    <h2 class="title_modal">Adicionar Produto!</h2>
    <div class="field">
        <label class="label" for="name">Nome:</label>
        <input class="input" type="text" placeholder="Produto" name="name" data-name>
    </div>
    <div class="field">
        <label class="label" for="price">Preço:</label>
        <input class="input" type="text" placeholder="Preço do Produto" name="price" data-price>
    </div>
    <div class="field">
        <label class="label" for="URL">URL da imagem:</label>
        <input class="input" type="text" placeholder="URL" name="URL" data-url>
    </div>
    <div class="field">
        <label class="label" for="stock">Estoque:</label>
        <input class="input" type="text" placeholder="Quantidade" name="stock" data-stock>
    </div>
    <input type="submit" value="Cadastrar!" class="submit">
</form>
</div>
`);

$('.add_button').on("click", () => {
    openModal();
});

$('.close_modal').on("click", () => {
    closeModal();
});

$('.form_modal').on("submit", async (e) => {
    e.preventDefault();

    const name = $('[data-name]').val();
    const price = $('[data-price]').val();
    const url = $('[data-url]').val();
    const stock = $('[data-stock]').val();


    if (name === "" || price === "" || url === "" || stock === "") alert("Valores inválidos!");

    else {
        await createProduct(name, price, url, stock);

        closeModal();
    }

});

async function createProduct(name, price, url) {
    const create = await fetch('http://localhost:3000/products', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            name,
            price,
            url,
            stock
        })
    });

    if (!create.ok) alert("Ocorreu algum erro ao criar o produto");
}

function openModal() {
    $('.create_modal').css('display', 'block');
    closeAndLittleOpacity();
}

function closeModal() {
    $('.create_modal').css('display', 'none');
    openAndBetterOpacity();
}

function closeAndLittleOpacity() {
    //$('.main').css('display', 'none');
    $('.main').css('opacity', 0.1);
    //$('.header').css('display', 'none');
    $('.header').css('opacity', 0.1);
}

function openAndBetterOpacity() {
    //$('.main').css('display', 'block');
    $('.main').css('opacity', 1);
    //$('.header').css('display', 'block');
    $('.header').css('opacity', 1);
}