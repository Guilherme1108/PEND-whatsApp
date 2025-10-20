'use strict'

// URL da API
const API_URL = 'https://corsproxy.io/?url=https://api-whatsapp-1is3.onrender.com/v1/contacts/11987876567'

const nav = document.getElementById('listaContatos')

function criarContato(contato) {
    const divContato = document.createElement('div')
    const imgContato = document.createElement('img')
    const nomeContato = document.createElement('p')
    
    divContato.classList.add('contact')
    imgContato.classList.add('iconPerson')
    nomeContato.classList.add('name')

    imgContato.src = contato.image
    nomeContato.textContent = contato.name

    divContato.appendChild(imgContato)
    divContato.appendChild(nomeContato)

    return divContato
}

async function carregarContatos() {
    try {
        const response = await fetch(API_URL)
        const dados = await response.json()

        // agora acessa o array dentro de data.contacts
        dados.contacts.forEach(contato => {
            const elemento = criarContato(contato)
            nav.appendChild(elemento)
        })
    } catch (error) {
        console.error('Erro ao carregar os contatos: ', error)
    }
}

carregarContatos()
