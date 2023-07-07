async function selectShow() {
    const services = await fetch('http://localhost:3000/services', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    const serviceJSON = await services.json();

    serviceJSON.forEach((service) => {
        $('.select_service').append(`
            <option value=${service.id}>${service.service}</option>
        `)
    });

}

$('.create_modal').append(`
<div class="modal">
<form class="form_modal">
    <span class="close_modal">x</span>
    <h2 class="title_modal">Adicionar Pet!</h2>
    <div class="field">
        <label class="label" for="name">Nome do Pet:</label>
        <input class="input" type="text" placeholder="Pet" name="name" data-name>
    </div>
    <div class="field">
        <label class="label" for="ownerName">Nome do Dono:</label>
        <input class="input" type="text" placeholder="Dono do pet" name="ownerName" data-ownerName>
    </div>
    <div class="field">
        <label class="label" for="tel">Telefone:</label>
        <input class="input" type="text" placeholder="telefone" name="tel" data-tel>
    </div>
    <div class="field">
        <label class="label" for="service">Serviço:</label>
        <select class="select_service" data-service>
            <option value="">Escolha um</option>
        </select>
    </div>

    <input type="submit" value="Cadastrar!" class="submit">
</form>
</div>
`);

selectShow();

$('.add_button').on("click", () => {
    openModal();
});

$('.close_modal').on("click", () => {
    closeModal();
});

$('.form_modal').on("submit", async (e) => {
    e.preventDefault();

    const name = $('[data-name]').val();
    const ownerName = $('[data-ownerName]').val();
    const tel = $('[data-tel]').val();
    const service = $('[data-service]').val();
    
    const serviceSelected = await fetch('http://localhost:3000/services/' + service, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });

    const serviceSelectedJSON = await serviceSelected.json();

    if (name === "" || ownerName === "" || tel === "" || serviceSelectedJSON.service === undefined) alert("Valores inválidos!");

    else {
        await createPet(name, ownerName, tel, serviceSelectedJSON.service);

        closeModal();
    }

});

async function createPet(name, ownerName, tel, service) {
    const create = await fetch('http://localhost:3000/pets', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            name,
            ownerName,
            tel,
            service
        })
    });

    if (!create.ok) alert("Ocorreu algum erro ao criar o pet");
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