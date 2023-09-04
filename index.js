const btnComments = document.querySelector(".btn.btn-primary");

fetch(" http:///localhost:3000/posts", { method: "GET" })
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    json.forEach((element) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.setAttribute("data-bs-toggle", "modal");
      li.setAttribute("data-bs-target", "#myModal5");
      const ptitle = document.createElement("p");
      const pbody = document.createElement("p");
      ptitle.textContent = element.title;
      li.appendChild(ptitle);
      const ul = document.querySelector(".list-group");
      ul.appendChild(li);
      pbody.textContent = element.body;
      li.appendChild(pbody);
      const button1 = document.createElement("button");
      button1.innerHTML = '<i class="fas fa-trash"></i>';
      button1.className = "btn btn-muted";
      li.appendChild(button1);

      const button2 = document.createElement("button");
      button2.innerHTML = '<i class="fas fa-pencil-alt"></i>';
      button2.className = "btn btn-muted";
      li.appendChild(button2);

      li.addEventListener("click", () => {
        fetch(" http:///localhost:3000/posts/" + element.id)
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            document.querySelector(".modal-title").textContent = data.title;
            document.querySelector("#ideal").textContent = data.body;
            btnComments.dataset.postId = element.id;
          });
        fetch(" http:///localhost:3000/users/" + element.userId)
          .then(function (usuario) {
            return usuario.json();
          })
          .then(function (usu) {
            const nombreusuario = document.querySelector(".juan");
            nombreusuario.style.fontWeight = 1000;
            nombreusuario.textContent = "User: " + usu.username;
            const userMail = document.querySelector(".emilio");
            userMail.textContent = usu.email;
          });
      });
      button1.addEventListener("click", (event) => {
        pbody.textContent = "";
        ptitle.textContent = "";

        spinner.style.display = "inline-block";

        event.stopPropagation();

        setTimeout(() => {
          spinner.style.display = "none";
        }, 1000);
      });

      button2.addEventListener("click", function () {
        const textPtitle = prompt("Ingrese un nuevo título");
        if (textPtitle !== "") {
          ptitle.textContent = textPtitle;
        }
        const textPbody = prompt("Ingrese un nuevo cuerpo");
        if (textPbody !== "") {
          pbody.textContent = textPbody;
        }
        setTimeout(() => {
          spinner.style.display = "none";
        }, 1000);
      });
    });

    var datosCargados = false;

    btnComments.addEventListener("click", () => {
      if (!datosCargados) {
        fetch(
          ` http:///localhost:3000/posts/${btnComments.dataset.postId}/comments`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (comments) {
            comments.forEach((element) => {
              const pComents = document.createElement("p");
              pComents.className = "comContainer";
              pComents.textContent = element.body;
              const comLabel = document.querySelector(".comLabel");
              comLabel.appendChild(pComents);
            });

            datosCargados = true;
          });
      }
    });
    const closeModalButton = document.querySelector(".modal .btn-close");
    closeModalButton.addEventListener("click", () => {
      datosCargados = false;
      const comLabel = document.querySelector(".comLabel");
      comLabel.innerHTML = ""; //
    });
  });

//<span class="material-icons">edit_note</span
//       ><span class="material-icons">clear</span>
