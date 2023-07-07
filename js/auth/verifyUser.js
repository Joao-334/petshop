async function verifyUser() {
    const user = JSON.parse(sessionStorage.getItem('userInfo'));

    if (user === null) {
        window.location.href = '../pages/index.html';
        alert("Você não está autorizado!");
    }

    else {
        const connection = await fetch('http://localhost:3000/users?name=' + user.name + '&password=' + user.password);
        if (connection.length === 0) {
            alert("Você não está autorizado!");
        }
        else return;
    }
}

verifyUser();