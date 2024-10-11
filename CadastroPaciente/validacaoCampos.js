let camposValidos = true;

function validaCampos() {
    camposValidos = true;

    var inputName = document.getElementById("inputName");
    var nome = inputName.value;

    var inputCPF = document.getElementById("inputCPF");
    var cpf = inputCPF.value;

    var inputEmail = document.getElementById("inputEmail");
    var email = inputEmail.value;

    var inputPassword = document.getElementById("inputPassword");
    var senha = inputPassword.value;

    var inputNascimento = document.getElementById("inputNascimento");
    var dataNascimento = inputNascimento.value;

    var listaCampos = [[nome, inputName], [cpf, inputCPF], [email, inputEmail], [senha, inputPassword],[dataNascimento,inputNascimento]];

    verificaCamposNulos(listaCampos);

    verificaCPF(cpf, inputCPF);

    verificaSenha(senha, inputPassword);

    if (camposValidos) {
        cadastraUsuario(nome, dataNascimento, email, cpf, senha);
        //redirecionaPagina("https://github.com/mateusferrao/TIAW_Gestao-de-Consultorio-Psicologico");
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

function verificaSenha(senha, inputPassword){
    if (senha.length >= 8){
        deixaCampoVerde(inputPassword);
        inputPassword.value = 'Senha';
    }else{
        deixaCampoVermelho(inputPassword);
        camposValidos = false;
        inputPassword.value = '';
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

function cadastraUsuario(nome, dataNascimento, email, cpf, senha) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || { usuarios: [] };
    
    usuarios.usuarios.push({ nome, dataNascimento, email, cpf, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    let modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    modal.show();
}
