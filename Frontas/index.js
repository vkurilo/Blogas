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

  let photo = document.querySelector('#invisible input[name="photo"]').value
  document.querySelector('#invisible input[name="photo"]').value = ""
  fetch("http://localhost:3001/save-request", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ name, about,date,photo }),
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
    <h4 >${val.name}</h4>
    <p style="color:gray;">${val.date}</p>
    <h6 class = "fw-normal">${val.about}</h6>
<a href="#" data-id='${val.id}' class="anchorA delete fs-6">IŠTRINTI</a>   <a href="#" class='anchorB update fs-6'>REDAGUOTI</a>
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
