'use Strict' // Modo restrito

//Consumo de API ViaCEP
//viacep.com.br 

//Função para limpar formulário
const limparFormulario = () => {
    document.getElementById('cep').value = '';
    document.getElementById('rua').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

//Função para preencher formulário
const preencherFormulario = (endereco) => {
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.estado;
}
//Teste de regex www.regexpal.com BONUS DICA
//Verifica se o CEP é válido
const eNumero = (numero) => /^[0-9]+$/.test(numero);
//Confere se o CEP tem o tamanho correto
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

//Consumo de API viaCEP
const pesquisarCep = async () => {
    limparFormulario();
    const url = `https://viacep.com.br/ws/${cep.value}/json/`;

    if(cepValido(cep.value)) {
        const dados = await fetch(url);
        const addres = await dados.json();

        if(addres.hasOwnProperty('erro')) {
            alert('CEP não encontrado');
        } else {
            preencherFormulario(addres);
        }
    } else {
        alert('CEP incorreto');
    }
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);