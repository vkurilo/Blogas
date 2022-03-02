let hide = document.querySelector("#invisible").classList;
let galery = document.querySelector("#galery").classList;

document.querySelector(".newBlog").addEventListener("click", () => {
  if (hide.value == "d-none") {
    document.querySelector("#invisible").classList.remove("d-none");
    document.querySelector("#galery").classList.add("d-none");
  } else {
    document.querySelector("#invisible").classList.add("d-none");
    document.querySelector("#galery").classList.remove("d-none");
  }
});

document.querySelector("#send").addEventListener("click", (event) => {
  event.preventDefault();

  let name = document.querySelector(
    '#invisible input[name="pavadinimas"]'
  ).value;
  document.querySelector('#invisible input[name="pavadinimas"]').value = "";
  let about = document.querySelector(
    '#invisible textarea[name="aprasymas"]'
  ).value;
  document.querySelector('#invisible textarea[name="aprasymas"]').value = "";


  let date = document.querySelector('#invisible input[name="date"]').value;
  document.querySelector('#invisible input[name="date"]').value = "";

  fetch("http://localhost:3001/save-request", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ name, about, date }),
  })
    .then((resp) => resp.json())
    .then((jsonObject) => {
      newDisplay(JSON.parse(jsonObject.jsonResp));
    });
});



const newDisplay = (jsonObject) => {
      let inside = "";
      jsonObject.forEach((val) => {
        inside += `     
    <div class="col-4">
    <img src="" alt="">
    <h5>${val.name}</h5>
    <p>${val.date}</p>
    <p>${val.about}</p>
<a href="#" data-id='${val.id}' class="anchorA delete">IŠTRINTI</a>   <a href="#" class='anchorB'>REDAGUOTI</a>
  </div>`;
      });

      document.querySelector("#galery").innerHTML = inside;
    

  document.querySelectorAll(".delete").forEach((value) => {
    value.addEventListener("click", (event) => {
      event.preventDefault();

      let id = value.getAttribute("data-id");
      fetch(`http://localhost:3001/${id}`, {
        method: "DELETE",
      })
        .then((resp) => resp.json())
        .then((jsonObject) => {
          if (jsonObject.status == "success")
            newDisplay(JSON.parse(jsonObject.jsonResp));
        });
    });
  });
};

document.querySelector("#send").addEventListener("click", (event) => {
  event.preventDefault();
  hide.add("d-none");
  galery.remove("d-none");
});





fetch("http://localhost:3001")
  .then((resp) => resp.json())
  .then((jsonObject) => {
    newDisplay(jsonObject);
  });
