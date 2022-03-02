

let hide = document.querySelector('#invisible').classList
let galery = document.querySelector('#galery').classList

document.querySelector('.newBlog').addEventListener('click', () => {
   if(hide.value == 'd-none')
   { document.querySelector('#invisible').classList.remove('d-none')
   document.querySelector('#galery').classList.add('d-none')}
   else{
    document.querySelector('#invisible').classList.add('d-none')
    document.querySelector('#galery').classList.remove('d-none')
   }
})


document.querySelector('#send').addEventListener('click', (event) => {
event.preventDefault()


let name = document.querySelector('#invisible input[name="pavadinimas"]').value
document.querySelector('#invisible input[name="pavadinimas"]').value = ""
let about = document.querySelector('#invisible textarea[name="aprasymas"]').value
document.querySelector('#invisible textarea[name="aprasymas"]').value = ""
let date = document.querySelector('#invisible input[name="date"]').value
document.querySelector('#invisible input[name="date"]').value = ''
fetch('http://localhost:3001/save-request',{
    method:'POST',
    headers: {"Content-type" : 'application/json'},
    body:JSON.stringify({name,about,date})
})
.then(resp => resp.json())
.then(jsonObject => {
    console.log('post request', jsonObject)
})




})



fetch('http://localhost:3001')
.then(resp => resp.json())
.then((jsonObject) => {
console.log(jsonObject)
})

