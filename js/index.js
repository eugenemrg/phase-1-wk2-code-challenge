const list = document.querySelector('.list')

fetch('http://localhost:3001/characters')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const listItem = document.createElement('li')
            listItem.className = 'list-item'

            const listItemName = document.createElement('p')
            listItemName.innerText = item.name

            const listItemIcon = document.createElement('i')
            listItemIcon.className = 'fa-solid fa-arrow-right'

            listItem.append(listItemName)
            listItem.append(listItemIcon)
            list.append(listItem)
        });
    })

const formSectionHeader = document.getElementById('heading')
formSectionHeader.addEventListener('click', (e) => {
    e.preventDefault()
    const form = document.getElementById('form')

    if(form.classList.contains('form-visible')){
        form.classList.toggle('form-visible')
        document.querySelector('#heading i').classList.replace('fa-chevron-down', 'fa-chevron-right')
    }else{
        form.classList.toggle('form-visible')
        document.querySelector('#heading i').classList.replace('fa-chevron-right', 'fa-chevron-down')
    }
})