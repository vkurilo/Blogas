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
  let articleForm = document.querySelector("#add-article");
  let formData = new FormData(articleForm);

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

  let photo = document.querySelector('#invisible input[name="photo"]').value;
  document.querySelector('#invisible input[name="photo"]').value = "";

  let mode = document.querySelector("#add-article").getAttribute("data-mode");
  let method = "POST";
  let id = "";

  if (mode == "edit") {
    method = "PUT";
    id = document.querySelector("#add-article").getAttribute("data-id");
  }

  fetch("http://localhost:3001/save-request" + id, {
    method,
    body: formData,
    //body: JSON.stringify({ name, about,date,photo }),
  })
    .then((resp) => resp.json())
    .then((jsonObject) => {
      if (jsonObject.status == "success")
        newDisplay(JSON.parse(jsonObject.jsonResp));
    });
});

const newDisplay = (jsonObject) => {
  let inside = "";
  jsonObject.forEach((val) => {
    console.log(val);
    inside += `     
    <div class="col-4">
    <img  class= "pt-5 img-fluid" src="http://localhost:3001${val.photo}" alt="">
    <h4 class= "pt-5" >${val.pavadinimas}</h4>
    <p style="color:gray;" >${val.date}</p>
    <h6 class = "fw-normal ">${val.aprasymas}</h6>
<a href="#" data-id='${val.id}' class="anchorA delete fs-6">IŠTRINTI</a>   <a href="#" data-mode="${val.id}" class='anchorB update fs-6'>REDAGUOTI</a>
  </div>`;
  });

  document.querySelector("#galery").innerHTML = inside;

  document.querySelectorAll(".delete").forEach((value) => {
    value.addEventListener("click", (event) => {
      event.preventDefault();

      let id = value.getAttribute("data-id");
      fetch(`http://localhost:3001/new-blog/${id}`, {
        method: "DELETE",
      })
        .then((resp) => resp.json())
        .then((jsonObject) => {
          if (jsonObject.status == "success")
            newDisplay(JSON.parse(jsonObject.jsonResp));

          document.querySelectorAll(".update").forEach((val) => {
            val.addEventListener("click", (event) => {
              event.preventDefault();
              let id = val.getAttribute("data-mode");

              fetch("http://localhost:3001/new-blog/" + id)
                .then((resp) => resp.json())
                .then((resp) => {
                  if (resp.status == "success") {
                    document.querySelector("#invisible").classList.remove =
                      "d-none";
                    document
                      .querySelector("#add-article")
                      .setAttribute("data-mode", "edit");                  
                    document
                      .querySelector("#add-article")
                      .setAttribute("data-id", id);             
                    document.querySelector('[name="pavadinimas"]').value =
                      resp.jsonResp.pavadinimas;
                    document.querySelector('[name="date"]').value =
                      resp.jsonResp.date;
                    document.querySelector('[name="aprasymas"]').value =
                      resp.jsonResp.aprasymas;
                    document.querySelector('[name= "photo"]').value =
                      resp.jsonResp.photo;
                  }
                });
            });
          });
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

 
