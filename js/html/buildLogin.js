$('.main').append(`
    <img class="image_login_logo" src="../styles/img/logo.jpg" alt="logo do petshop">
    <p class="form_text">Realize seu login.</p>
    <form class="login_form" data-login>
        <div class="form_campo">
            <label class="form_label" for="username"></label>
            <input class="form_input" type="text" name="username" required placeholder="Username" data-user>
        </div>
        <div class="form_campo">
            <label class="form_label" for="password"></label>
            <input class="form_input" type="password" name="password" required placeholder="Senha" data-password>
        </div>

        <input class="button_submit" type="submit" value="Logar">
    </form>
`);