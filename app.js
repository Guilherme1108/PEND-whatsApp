'use strict'

// URLs da API
const USER_URL = 'https://corsproxy.io/?url=https://api-whatsapp-1is3.onrender.com/v1/userdados/11987876567'
const CONTATOS_URL = 'https://corsproxy.io/?url=https://api-whatsapp-1is3.onrender.com/v1/contacts/11987876567'

const nav = document.getElementById('listaContatos')
const imgUser = document.getElementById('iconPerson')

async function getImagemUser() {
    try {
        const response = await fetch(USER_URL)
        const dados = await response.json()
        const user = dados.userDados[0]

        imgUser.src = `./img/${user['profile-image']}`
    } catch (error) {
        console.error('Erro ao carregar imagem do usuário:', error)
    }
}


function criarContatos(contato) {
    const divContato = document.createElement('div')
    const imgContato = document.createElement('img')
    const nomeContato = document.createElement('p')
    
    divContato.classList.add('contact')
    imgContato.classList.add('iconPerson')
    nomeContato.classList.add('name')

    imgContato.src = `./img/${contato.image}`
    nomeContato.textContent = contato.name

    divContato.appendChild(imgContato)
    divContato.appendChild(nomeContato)

    return divContato
}

async function carregarContatos() {
    try {
        const response = await fetch(CONTATOS_URL)
        const dados = await response.json()

        // agora acessa o array dentro de data.contacts
        dados.contacts.forEach(contato => {
            const elemento = criarContatos(contato)
            nav.appendChild(elemento)
        })
    } catch (error) {
        console.error('Erro ao carregar os contatos: ', error)
    }
}

getImagemUser()
carregarContatos()
