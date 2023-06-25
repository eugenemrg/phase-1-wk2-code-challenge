const list = document.querySelector('.list')

fetch('http://localhost:3001/characters')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const listItem = document.createElement('li')
            listItem.className = 'list-item'
            listItem.addEventListener('click', (e) => showItem(e, item))

            const listItemName = document.createElement('p')
            listItemName.innerText = item.name

            const listItemIcon = document.createElement('i')
            listItemIcon.className = 'fa-solid fa-arrow-right'

            listItem.append(listItemName)
            listItem.append(listItemIcon)
            list.append(listItem)
        });
    })

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()

    const form = document.querySelector('form');

    const newItem = {}
    newItem.name = form.animal.value
    newItem.image = form.imageUrl.value
    newItem.votes = 0

    if (newItem.name !== '' && newItem.image !== '') {
        let response = fetch('http://localhost:3001/characters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newItem)
        })
        console.log(response)
    } else {
        alert('Empty/Invalid name or url')
    }

})

const addButton = document.getElementById('heading')
addButton.addEventListener('click', (e) => {
    e.preventDefault()
    const form = document.getElementById('form')

    if (form.classList.contains('form-visible')) {
        form.classList.toggle('form-visible')
        document.querySelector('#heading i').classList.replace('fa-chevron-down', 'fa-chevron-right')
    } else {
        form.classList.toggle('form-visible')
        document.querySelector('#heading i').classList.replace('fa-chevron-right', 'fa-chevron-down')
    }
})

document.addEventListener('DOMContentLoaded', (e) => {
    const target = document.querySelector('.main-container')
    target.style.backgroundImage = `url(/assets/${Math.trunc(Math.random() * 10)}.jpg)`
})

function showItem(event, jsonData) {
    const image = document.createElement('img')
    image.alt = jsonData.image
    image.className = 'animal'
    image.src = jsonData.image

    const name = document.createElement('p')
    name.className = 'name'
    name.innerText = jsonData.name

    const deleteIcon = document.createElement('i')
    deleteIcon.className = 'fa-solid fa-trash'
    deleteIcon.addEventListener('click', (e) => {
        fetch(`http://localhost:3001/characters/${jsonData.id}`, {
            method: 'DELETE'
        })
            .then(response => console.log(response))
    })

    const votesContainer = document.createElement('div')
    votesContainer.className = 'votes'

    const voteIcon = document.createElement('i')
    voteIcon.className = 'fa-regular fa-heart'
    voteIcon.addEventListener('click', (e) => likeItem(e, jsonData))

    const voteCount = document.createElement('span')
    voteCount.innerText = `${jsonData.votes} ${(jsonData.votes === 1) ? 'vote' : 'votes'}`

    votesContainer.append(voteIcon)
    votesContainer.append(voteCount)

    const details = document.querySelector('.details')
    details.innerHTML = ''
    details.append(image)
    details.append(name)
    details.append(votesContainer)
    details.append(deleteIcon)

    // reset votes
    const deleteButton = document.querySelector('.delete-votes')
    deleteButton.addEventListener('click', e => {
        fetch(`http://localhost:3001/characters/${jsonData.id}`, {
            method: 'PATCH',
            body: JSON.stringify({votes: 0}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    })

    document.querySelector('.overlay-container').classList.add('show-overlay-container')
}

function likeItem(event, jsonData) {

    const newItem = {}
    newItem.votes = jsonData.votes + 1

    fetch(`http://localhost:3001/characters/${jsonData.id}`, {
        method: 'PATCH',
        body: JSON.stringify(newItem),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}

document.querySelector('.fa-circle-xmark').addEventListener('click', (e) => {
    document.querySelector('.overlay-container').classList.remove('show-overlay-container')
})