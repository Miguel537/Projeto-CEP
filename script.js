'use strict';

// Limpa os campos do formulário de endereço
const limparFormulario = () => {
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
};

// Preenche os campos com os dados da API
const preencherFormulario = (endereco) => {
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
};

// Verifica se o que foi digitado é um número
const eNumero = (numero) => /^[0-9]+$/.test(numero);

// Verifica se o CEP é válido
const cepValido = (cep) => cep.length === 8 && eNumero(cep);

// Consulta a API do ViaCEP
const pesquisarCep = async () => {
    const cepInput = document.getElementById('cep');
    const cep = cepInput.value.replace(/\D/g, ''); // remove qualquer caractere não numérico

    if (cepValido(cep)) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const endereco = await response.json();

            if (endereco.hasOwnProperty('erro')) {
                alert('CEP não encontrado!');
                limparFormulario();
            } else {
                preencherFormulario(endereco);
            }
        } catch (error) {
            alert('Erro ao buscar CEP.');
            console.error(error);
        }
    } else {
        alert('CEP inválido! Digite exatamente 8 números.');
        limparFormulario();
    }
};

// Quando sair do campo CEP, ativa a busca
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cep').addEventListener('blur', pesquisarCep);
});
