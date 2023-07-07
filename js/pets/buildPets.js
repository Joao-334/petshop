async function buildPets() {
    $('.main').append(`   
    <section class="pets">
        <ul class="list_pets">    
        </ul>
    </section>
`);

    const pets = await fetch('http://localhost:3000/pets', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const arrayPets = await pets.json()

    createPets(arrayPets);

    return;
}

buildPets();

async function createPets(arrayPets) {

    arrayPets.forEach(pet => {
        $('.list_pets').append(
            `   
            <li class="item">
                <h6 class="title_item">Nome: ${pet.name}</h6>
                <p class="text_item">Dono: ${pet.ownerName}</p>
                <p class="text_item">Telefone: ${pet.tel}</p>
                <p class="text_item">Serviço: ${pet.service}</p>
                <div class="button">
                    <button class="button_remove">-</button>
                    <span class="text_button">Remover Pet</span>
                </div>
                <input type="hidden" value="${pet.id}" class="id">
            </li>                
            `
        );
    });

    $('.button_remove').on('click', async (event) => {
        const id = event.target.parentNode.parentNode.lastChild.previousElementSibling.value;
        console.log(id);

        await fetch('http://localhost:3000/pets/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    });
}