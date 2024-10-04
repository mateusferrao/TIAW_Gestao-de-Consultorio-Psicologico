function validaCampos() {
    let inputName = document.getElementById("inputName");
    let nome = inputName.value;

    let inputCPF = document.getElementById("inputCPF");
    let cpf = inputCPF.value;

    let inputEmail = document.getElementById("inputEmail");
    let email = inputEmail.value;

    let inputPassword = document.getElementById("inputPassword");
    let senha = inputPassword.value;

    redirecionaPagina(nome,cpf,email,senha);

    if (nome == '') {
        campoVermelho(inputName);
    } else {
        campoVerde(inputName);
    }

    if (cpf == '') {
        campoVermelho(inputCPF);
    } else {
        campoVerde(inputCPF);
    }

    if (email == '') {
        campoVermelho(inputEmail);
    } else {
        campoVerde(inputEmail);
    }

    if (senha == '') {
        campoVermelho(inputPassword);
    } else {
        campoVerde(inputPassword);
    }

}

function redirecionaPagina(nome,cpf,email,senha){
    if(nome != '' && cpf != '' && email != '' && senha != ''){
        window.location.href = "https://github.com/mateusferrao/TIAW_Gestao-de-Consultorio-Psicologico";
    }
}

function campoVermelho(inputCampo){
    inputCampo.classList.remove('border-success');
    inputCampo.classList.add('border-danger');
}

function campoVerde(inputCampo){
    inputCampo.classList.remove('border-danger');
    inputCampo.classList.add('border-success');
}