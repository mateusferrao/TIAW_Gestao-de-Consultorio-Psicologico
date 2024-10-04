let camposValidos = true;

function validaCampos() {

    let inputName = document.getElementById("inputName");
    let nome = inputName.value;

    let inputCPF = document.getElementById("inputCPF");
    let cpf = inputCPF.value;

    let inputEmail = document.getElementById("inputEmail");
    let email = inputEmail.value;

    let inputPassword = document.getElementById("inputPassword");
    let senha = inputPassword.value;

    let inputNascimento = document.getElementById("inputNascimento");
    let dataNascimento = inputNascimento.value;

    let listaCampos = [[nome, inputName], [cpf, inputCPF], [email, inputEmail], [senha, inputPassword],[dataNascimento,inputNascimento]];

    verificaCamposNulos(listaCampos);

    verificaCPF(cpf, inputCPF);

    if (camposValidos) {
        redirecionaPagina("https://github.com/mateusferrao/TIAW_Gestao-de-Consultorio-Psicologico");
    }

}

function verificaCamposNulos(listaCampos){
    for (let i = 0; i < listaCampos.length; i++) {
        if (listaCampos[i][0] == '') {
            deixaCampoVermelho(listaCampos[i][1]);
            camposValidos = false;
        } else {
            deixaCampoVerde(listaCampos[i][1]);
        }
    }
}

function verificaCPF(cpf, inputCPF){
    if (cpf.length == 11) {
        deixaCampoVerde(inputCPF);
        inputCPF.placeholder = 'CPF';
    }else{
        deixaCampoVermelho(inputCPF);
        camposValidos = false;
        inputCPF.value = '';
        inputCPF.placeholder = 'CPF inválido';
    }
}

function redirecionaPagina(link) {
    window.location.href = link;
}

function deixaCampoVermelho(inputCampo) {
    inputCampo.classList.remove('border-success');
    inputCampo.classList.remove('border');
    inputCampo.classList.add('border-danger');
    inputCampo.classList.add('border-2');
}

function deixaCampoVerde(inputCampo) {
    inputCampo.classList.remove('border-danger');
    inputCampo.classList.remove('border-2');
    inputCampo.classList.add('border-success');
    inputCampo.classList.add('border');

}
