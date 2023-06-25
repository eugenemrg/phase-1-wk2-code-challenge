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

    const votesContainer = document.createElement('div')
    votesContainer.className = 'votes'

    const voteIcon = document.createElement('i')
    voteIcon.className = 'fa-regular fa-heart'

    const voteCount = document.createElement('span')
    voteCount.innerText = `${jsonData.votes} votes`

    votesContainer.append(voteIcon)
    votesContainer.append(voteCount)

    const details = document.querySelector('.details')
    details.innerHTML = ''
    details.append(image)
    details.append(name)
    details.append(votesContainer)
    document.querySelector('.overlay-container').classList.add('show-overlay-container')
}

document.querySelector('.fa-circle-xmark').addEventListener('click', (e) => {
    document.querySelector('.overlay-container').classList.remove('show-overlay-container')
})