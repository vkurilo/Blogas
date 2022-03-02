document.querySelector('.newBlog').addEventListener('click', () => {
    document.querySelector('#invisible').classList.remove('d-none')
})


document.querySelector('#send').addEventListener('click', (event) => {
event.preventDefault()


let name = document.querySelector('#invisible input[name="pavadinimas"]').value
document.querySelector('#invisible input[name="pavadinimas"]').value = ""
let about = document.querySelector('#invisible textarea[name="aprasymas"]').value
document.querySelector('#invisible textarea[name="aprasymas"]').value = ""


fetch('http://localhost:3001/post-request',{
    method:'POST',
    headers: {"Content-type" : 'application/json'},
    body:JSON.stringify({name,about})
})
.then(resp => resp.json())
.then(jsonObject => {
    console.log('post request', jsonObject)
})



})