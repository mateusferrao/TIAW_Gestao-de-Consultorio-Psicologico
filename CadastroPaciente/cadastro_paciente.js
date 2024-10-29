var camposValidos = true;
let i = 2;

window.addEventListener("load", (event) => {
    insereTabela();
    let mostraTabela = document.getElementById('tabelaDePacientes');
    let btnExibir = document.getElementById('btnExibir');
    mostraTabela.style.display = 'none';
    btnExibir.innerHTML = `Exibir pacientes vinculados`;
});

function validaCampos() {

    camposValidos = true;

    var inputName = document.getElementById("inputName");
    var nome = inputName.value;

    var inputCPF = document.getElementById("inputCPF");
    var cpf = inputCPF.value;

    var inputEmail = document.getElementById("inputEmail");
    var email = inputEmail.value;

    var inputNascimento = document.getElementById("inputNascimento");
    var dataInput = inputNascimento.value;
    data = new Date(dataInput);
    dataNascimento = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });

    var listaCampos = [[cpf, inputCPF], [email, inputEmail], [dataNascimento, inputNascimento], [nome, inputName]];

    verificaCamposNulos(listaCampos);

    verificaCPF(cpf, inputCPF);

    verificaDataDeNascimento(dataNascimento, inputNascimento);
    
    if (camposValidos) {
        cadastraUsuario(dataNascimento, email, cpf, nome);
        limpaCampos();
        insereTabela();
        //redirecionaPagina("#");
    } else {
        let textoToast = document.getElementById('toastBody');
        let botaoToast = document.getElementById('warningToast');
        textoToast.innerHTML = `Campos inválidos!`
        botaoToast.classList.remove('text-bg-success');
        botaoToast.classList.add('text-bg-danger')
        exibirToast();
    }

}

function limpaCampos() {
    document.getElementById("inputName").value = ''; 
    document.getElementById("inputCPF").value = '';  
    document.getElementById("inputEmail").value = '';  
    document.getElementById("inputNascimento").value = '';  
}

function verificaCamposNulos(listaCampos) {
    for (let i = 0; i < listaCampos.length; i++) {
        if (listaCampos[i][0] == '') {
            deixaCampoVermelho(listaCampos[i][1]);
            camposValidos = false;
        } else {
            deixaCampoVerde(listaCampos[i][1]);
        }
    }
}

function verificaCPF(cpf, inputCPF) {
    if (cpf.length == 11) {
        let objDados = leDados();

        let cpfJaVinculado = objDados.pacientes.some(paciente => paciente.objCpf === cpf);

        if (cpfJaVinculado) {
            deixaCampoVermelho(inputCPF);
            camposValidos = false;
            inputCPF.value = '';
            inputCPF.placeholder = 'CPF já vinculado';
        } else {
            deixaCampoVerde(inputCPF);
            inputCPF.placeholder = 'CPF';
        }
    } else if (cpf.length != 11 && cpf != '') {
        deixaCampoVermelho(inputCPF);
        camposValidos = false;
        inputCPF.value = '';
        inputCPF.placeholder = 'CPF inválido';
    }
}

function verificaDataDeNascimento(dataNascimento, inputNascimento) {
    let parte = dataNascimento.split('/')
    let dataAtual = new Date()
    let dataTeste = new Date('1850-01-01');

    dataNascimento = new Date(parte[2], parte[1] - 1, parte[0])

    if (dataNascimento > dataAtual || dataNascimento <= dataTeste || isNaN(dataNascimento)) {
        deixaCampoVermelho(inputNascimento);
        camposValidos = false;
        inputNascimento.removeAttribute('type', 'date');
        inputNascimento.setAttribute('type', 'text');
        inputNascimento.value = '';
        if (isNaN(dataNascimento)) {
            inputNascimento.placeholder = 'Data de nascimento';
        } else {
            inputNascimento.placeholder = 'Data de nascimento inválida';
        }

    } else {
        deixaCampoVerde(inputNascimento);
        inputNascimento.placeholder = 'Data de nascimento';
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

function cadastraUsuario(dataNascimento, email, cpf, nome) {
    
    let objDados = leDados();
    
    let novoPaciente = {
        objNome: nome,
        objCpf: cpf,
        objEmail: email,
        objDataNascimento: dataNascimento
    };

    let inputNascimento = document.getElementById('inputNascimento');
    
    objDados.pacientes.push(novoPaciente);
    
    salvaDados(objDados);
    
    inputNascimento.removeAttribute('type', 'date');
    inputNascimento.setAttribute('type', 'text');

    let textoToast = document.getElementById('toastBody');
    let botaoToast = document.getElementById('warningToast');
    textoToast.innerHTML = `Usuário ${nome}, inscrito no CPF ${cpf}, cadastrado com sucesso!`
    botaoToast.classList.remove('text-bg-danger');
    botaoToast.classList.add('text-bg-success')
    exibirToast();

}

function leDados() {
    let strDados = localStorage.getItem('usuarios');
    let objDados = {};

    if (!strDados) {
        objDados = { pacientes: [] };
    }else{
        objDados = JSON.parse(strDados);
    }

    return objDados;
}

function salvaDados(dados) {
    localStorage.setItem('usuarios', JSON.stringify(dados));
}

function insereTabela() {
    let tabelaPacientes = document.getElementById('tabelaPacientes');
    let strTabela = '';
    let objDados = leDados();

    for (i = 0; i < objDados.pacientes.length; i++) {
        strTabela += `<div class="row align-items-center text-center col">
                <div class="col-3">
                    ${objDados.pacientes[i].objNome}
                </div>
                <div class="col-3">
                    ${objDados.pacientes[i].objEmail}
                </div>
                <div class="col-3">
                    ${objDados.pacientes[i].objCpf}
                </div>
                <div class="col-3">
                    ${objDados.pacientes[i].objDataNascimento}
                </div>
            </div>`
    }

    tabelaPacientes.innerHTML = strTabela;
}

function deletaPaciente() {
    let modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    let textoModal = document.getElementById('textoModal');
    let tituloModal = document.getElementById('confirmationModalLabel');
    let btnFechar = document.getElementById('btnFechar');

    let textoToast = document.getElementById('toastBody');
    let botaoToast = document.getElementById('warningToast');

    tituloModal.innerHTML = 'Excluir';
    textoModal.innerHTML = `
        <div class="row mb-3">
            <div class="col-sm-10 m-auto">
                <input type="text" placeholder="CPF do paciente a ser excluído"
                    class="form-control form-control-lg border border-success" id="inputCPFExcluido">
            </div>
        </div>`;

    btnFechar.innerHTML = 'Excluir';

    modal.show();

    btnFechar.onclick = function () {
        let CPFExcluido = document.getElementById('inputCPFExcluido').value;
        let objDados = leDados();
        let achouCPF = false;

        for (let i = 0; i < objDados.pacientes.length; i++) {
            if (objDados.pacientes[i].objCpf == CPFExcluido) {
                achouCPF = true;
            }
        }


        if (CPFExcluido == '') {
            textoToast.innerHTML = `Campo não preenchido!`
            botaoToast.classList.remove('text-bg-success');
            botaoToast.classList.add('text-bg-danger')

            exibirToast();
        } else if (achouCPF) {
            objDados.pacientes = objDados.pacientes.filter(paciente => paciente.objCpf != CPFExcluido);

            salvaDados(objDados);

            insereTabela();

            textoToast.innerHTML = `Paciente inscrito no CPF ${CPFExcluido} foi excluído com sucesso!`
            botaoToast.classList.remove('text-bg-danger');
            botaoToast.classList.add('text-bg-success')

            exibirToast();


        } else {
            textoToast.innerHTML = `Paciente inscrito no CPF ${CPFExcluido} não foi encontrado!`
            botaoToast.classList.remove('text-bg-success');
            botaoToast.classList.add('text-bg-danger')

            exibirToast();

        }

    };
}

function editaPaciente() {
    let modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    let textoModal = document.getElementById('textoModal');
    let tituloModal = document.getElementById('confirmationModalLabel');
    let btnFechar = document.getElementById('btnFechar');

    let textoToast = document.getElementById('toastBody');
    let botaoToast = document.getElementById('warningToast');

    tituloModal.innerHTML = 'Editar';
    textoModal.innerHTML = `
        <div class="row mb-3">
            <div class="col-sm-10 m-auto">
                <input type="text" placeholder="CPF do paciente a ser editado"
                    class="form-control form-control-lg border border-success" id="inputEditar">
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-sm-10 m-auto">
                <input type="text" placeholder="Novo Nome"
                    class="form-control form-control-lg border border-success" id="inputEditarNome">
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-sm-10 m-auto">
                <input type="email" placeholder="Novo E-mail"
                    class="form-control form-control-lg border border-success" id="inputEditarEmail">
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-sm-10 m-auto">
                <input type="text" placeholder="Nova Data de nascimento" onfocus="this.type='date'"
                class="form-control form-control-lg border border-success" id="inputEditarNascimento">
            </div>
        </div>`;

    btnFechar.innerHTML = 'Editar';
    modal.show();

    btnFechar.onclick = function () {
        let CPFEditar = document.getElementById('inputEditar').value;
        let NomeEditar = document.getElementById('inputEditarNome').value;
        let EmailEditar = document.getElementById('inputEditarEmail').value;
        let NascimentoEditar = document.getElementById('inputEditarNascimento').value;

        let objDados = leDados();

        let pacienteIndex = objDados.pacientes.findIndex(paciente => paciente.objCpf == CPFEditar);

        if (pacienteIndex !== -1) {
            objDados.pacientes[pacienteIndex].objNome = NomeEditar || objDados.pacientes[pacienteIndex].objNome;
            objDados.pacientes[pacienteIndex].objEmail = EmailEditar || objDados.pacientes[pacienteIndex].objEmail;
            objDados.pacientes[pacienteIndex].objDataNascimento = NascimentoEditar || objDados.pacientes[pacienteIndex].objDataNascimento;

            salvaDados(objDados);
            insereTabela();

            textoToast.innerHTML = `Paciente inscrito no CPF ${CPFEditar} alterado!`
            botaoToast.classList.remove('text-bg-danger');
            botaoToast.classList.add('text-bg-success')
        } else {
            textoToast.innerHTML = `Paciente não encontrado!`
            botaoToast.classList.remove('text-bg-success');
            botaoToast.classList.add('text-bg-danger')
        }

        exibirToast();
        resetaModal();

    };
}

function resetaModal() {
    let btnFechar = document.getElementById('btnFechar');
    let tituloModal = document.getElementById('confirmationModalLabel');
    btnFechar.innerHTML = 'Fechar';
    tituloModal.innerHTML = 'Confirmação';
}

function exibirToast() {
    const toastElement = document.getElementById('warningToast');
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}

function mostrarPacientesVinculados() {
    let mostraTabela = document.getElementById('tabelaDePacientes');
    let btnExibir = document.getElementById('btnExibir');

    if (i % 2 == 0) {
        mostraTabela.style.display = 'none';
        btnExibir.innerHTML = `Exibir pacientes vinculados`;
    } else {
        mostraTabela.style.display = 'block';
        btnExibir.innerHTML = `Esconder pacientes vinculados`;
    }

    i++;

}




