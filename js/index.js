// Base url which path and endpoints are appended to
const baseURL = 'http://localhost:3008'

// Initial fetch for character data used to populate list on the front-end 
fetch(`${baseURL}/characters`)
    .then(response => response.json())
    .then(data => {
        const list = document.querySelector('.list')

        // Handles list item creation and adds events for the list section
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

        // Click event handler that deletes all votes for all animals
        document.querySelector('.clear').addEventListener('click', e => {
            deleteAllVotes(data)
        })
    })

// Form submit event handler when submit is clicked on the add new animal form
// Updates json-server values, adding new details
document.querySelector('form').addEventListener('submit', (e) => {

    e.preventDefault()
    const form = document.querySelector('form');

    const newItem = {}
    newItem.name = form.animal.value
    newItem.image = form.imageUrl.value
    newItem.votes = 0

    if (newItem.name !== '' && newItem.image !== '') {
        let response = fetch(`${baseURL}/characters`, {
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

// Click event handler to hide/show form when clicked, change arrow icon depending on form visibility
document.getElementById('heading').addEventListener('click', (e) => {
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

// Page background image handler after DOMContentLoaded
document.addEventListener('DOMContentLoaded', (e) => {
    const target = document.querySelector('.main-container')
    target.style.backgroundImage = `url(/assets/${Math.trunc(Math.random() * 10)}.jpg)`
})

/**
 * Creates a modal item displayed when a name is clicked on the animal list.
 * Generates event handlers and handles all functionality for created item inclusing voting, resets, delete, show/hide etc
 * 
 * @param {object} event 
 * @param {object} jsonData 
 */
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
    voteIcon.addEventListener('click', (e) => likeItem(e, jsonData))

    const voteCount = document.createElement('span')
    voteCount.innerText = `${jsonData.votes} ${(jsonData.votes === 1) ? 'vote' : 'votes'}`

    votesContainer.append(voteIcon)
    votesContainer.append(voteCount)

    const deleteIcon = document.createElement('i')
    deleteIcon.className = 'fa-solid fa-trash'
    deleteIcon.addEventListener('click', (e) => {
        fetch(`${baseURL}/characters/${jsonData.id}`, {
            method: 'DELETE'
        })
            .then(response => console.log(response))
    })

    const details = document.querySelector('.details')
    details.innerHTML = ''
    details.append(image)
    details.append(name)
    details.append(votesContainer)
    details.append(deleteIcon)

    // reset votes
    document.querySelector('.delete-votes').addEventListener('click', e => {
        fetch(`${baseURL}/characters/${jsonData.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ votes: 0 }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    })

    document.querySelector('.overlay-container').classList.add('show-overlay-container')
}

/**
 * Handles vote functionality from user vote click event for 'showItem(event, jsonData)' function
 * 
 * @param {object} event 
 * @param {object} jsonData 
 */
function likeItem(event, jsonData) {
    const newItem = {}
    newItem.votes = jsonData.votes + 1

    fetch(`${baseURL}/characters/${jsonData.id}`, {
        method: 'PATCH',
        body: JSON.stringify(newItem),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}

/**
 * Handles functionality to delete all votes for all animals for the click event of the list container 'clear all votes' button
 * 
 * @param {object} data Object that contains all animals and details
 */
function deleteAllVotes(data) {
    data.forEach(item => {
        fetch(`${baseURL}/characters/${item.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ votes: 0 }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    })
}

// Handles functionality of hiding the overlay (which includes the modal) showing animal details
document.querySelector('.close-icon').addEventListener('click', (e) => {
    document.querySelector('.overlay-container').classList.remove('show-overlay-container')
})
