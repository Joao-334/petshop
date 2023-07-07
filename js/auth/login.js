$('.image_login_logo').on('click', () => {
    window.location.href = '../pages/index.html';
});

$('[data-login]').on('submit', async (event) => {
    event.preventDefault();

    const username = $('[data-user]').val();
    const password = $('[data-password]').val();

    const connection = await getUser(username, password);

    if(connection.length === 0) {
        alert('Credenciais Inválidas!');   
    }
    else {
        sessionStorage.setItem('userInfo', `{"name":"${username}", "password":"${password}"}`);
        window.location.href = "../pages/pets.html";
    }

});


async function getUser(username, password) {
    const conexao = await fetch(`http://localhost:3000/users?name=${username}&password=${password}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    });

    return await conexao.json();
}