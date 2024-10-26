let listaDeNumerosSorteados = [];
let numeroLimite = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


mensagemInicial();


function mensagemInicial() {
    colocarTextoNaTela('h1', 'Jogo do número secreto');
    colocarTextoNaTela('p', 'Escolha um número entre 1 a 50');
}


function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados ==[];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }

}


function colocarTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}


function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {

        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;

        colocarTextoNaTela('h1', 'Parabéns, você acertou!');
        colocarTextoNaTela('p', mensagemTentativas);
        document.getElementById('chute').setAttribute('disabled', true);
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        
        if (chute < numeroSecreto) {
            colocarTextoNaTela('p', 'O número secreto é maior');
        } else {
            colocarTextoNaTela('p', 'O número secreto é menor');
        }

        tentativas++;
        limparCampo();
    }
}


function gerarNumeroAleatorio() {
    return parseInt(Math.random() * 10 + 1);
}


function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}


function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    mensagemInicial();
    limparCampo();
    tentativas = 1;
    document.getElementById('chute').removeAttribute('disabled');
    document.getElementById('reiniciar').setAttribute('disabled', true);
}