'use strict'

const numeroUsuario = '11987876567'
// URLs da API
const USER_URL = `https://corsproxy.io/?url=https://api-whatsapp-1is3.onrender.com/v1/userdados/${numeroUsuario}`
const CONTATOS_URL = `https://corsproxy.io/?url=https://api-whatsapp-1is3.onrender.com/v1/contacts/${numeroUsuario}`

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

    divContato.addEventListener('click', () => {
        abrirConversa(contato)
    })

    return divContato
}

async function abrirConversa(contato) {

    const dadosContato = document.getElementById('dadosContato')
    const divMensagens = document.getElementById('mensagens')

    // Limpa o conteúdo anterior
    dadosContato.replaceChildren()
    divMensagens.replaceChildren()

    // Adicionando um fundo para as conversas
    divMensagens.style.backgroundImage = "url('./img/background-chat.jpg')";
    divMensagens.style.backgroundPosition = "center"
    divMensagens.style.backgroundRepeat = "no-repeat"
    divMensagens.style.backgroundSize = "cover"


    // Exibe o contato selecionado
    const imgContato = document.createElement('img')
    const nomeContato = document.createElement('p')

    imgContato.src = `./img/${contato.image}`
    nomeContato.textContent = contato.name

    dadosContato.append(imgContato, nomeContato)

    try {
        const response = await fetch(`https://corsproxy.io/?url=https://api-whatsapp-1is3.onrender.com/v1/user/messages/?userNumber=${numeroUsuario}&contactNumber=${contato.number}`)
        const dados = await response.json()

        if (!dados.status || !dados.conversation) {
            throw new Error('Nenhuma conversa encontrada.')
        }

        const fragment = document.createDocumentFragment()

        for (const msg of dados.conversation) {
            const divMensagem = document.createElement('div')
            const mensagem = document.createElement('p')
            const hora = document.createElement('span')

            divMensagem.classList.add('mensagem', msg.sender === 'me' ? 'me' : 'other')
            mensagem.classList.add('content')
            hora.classList.add('time')

            mensagem.textContent = msg.content
            hora.textContent = msg.time

            divMensagem.append(mensagem, hora)
            fragment.appendChild(divMensagem)
        }

        const divSendMessage = document.createElement('div')
        const emoji = document.createElement('i')
        const arquivos = document.createElement('i')
        const button = document.createElement('button')

        divMensagens.appendChild(fragment)

        // Rola automaticamente até a última mensagem
        divMensagens.scrollTop = divMensagens.scrollHeight

    } catch (error) {
        console.error('Erro ao carregar mensagens:', error)
    }
}

async function carregarContatos() {
    try {
        const response = await fetch(USER_URL)
        const dados = await response.json()

        // pega os contatos do primeiro usuário
        const contatos = dados.userDados[0].contacts

        contatos.forEach(contato => {
            const elemento = criarContatos(contato)
            nav.appendChild(elemento)
        })
    } catch (error) {
        console.error('Erro ao carregar os contatos: ', error)
    }
}

getImagemUser()
carregarContatos()
