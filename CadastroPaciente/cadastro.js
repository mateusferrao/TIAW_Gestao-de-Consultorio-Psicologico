fetch("usuarios.json").then((resposta) => {
    resposta.json().then((usuarios) => {
        console.log(usuarios[0]);
        let obj = JSON.parse(usuarios);
        console.log(obj);
    })
})