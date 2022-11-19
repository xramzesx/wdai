const buttonAdd = document.querySelector('button.add')
const buttonDelete = document.querySelector('button.delete')

const listContainer = document.querySelector('ul')

const createListElement = number => {
    const element = document.createElement('li')
    element.innerText = `Item nr ${number}`
    return element
}

console.log(listContainer.children)

buttonAdd.addEventListener('click', () => {
    const number = listContainer.children.length + 1
    listContainer.appendChild(
        createListElement( number )
    )
})

buttonDelete.addEventListener('click', () => {
    if ( listContainer.children.length )
        listContainer.removeChild(
            listContainer.children[0]
        )
})
