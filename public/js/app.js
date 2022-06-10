console.log('Clien site javascript file is loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    
    fetch('/weather?address='+ location).then((response) => { //https:localhost:3000/weather?address.... if on localhost || if on hosting site remove the localhost url
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        }
        else{
            messageOne.textContent = data.address
            messageTwo.textContent = data.foreCast
        }
    })
})
})
