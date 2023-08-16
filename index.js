const btnComments = document.querySelector(".btn.btn-primary");

fetch("https://jsonplaceholder.typicode.com/posts", { method: "GET" })
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
      li.addEventListener("click", () => {
        fetch("https://jsonplaceholder.typicode.com/posts/" + element.id)
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            document.querySelector(".modal-title").textContent = data.title;
            document.querySelector("#ideal").textContent = data.body;
            btnComments.dataset.postId = element.id;
          });
        fetch("https://jsonplaceholder.typicode.com/users/" + element.userId)
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
    });

    btnComments.addEventListener("click", () => {
      fetch(
        `https://jsonplaceholder.typicode.com/posts/${btnComments.dataset.postId}/comments`
      )
        .then(function (post) {
          return post.json();
        })
        .then(function (comments) {
          comments.forEach((element) => {
            const pComents = document.createElement("p");
            pComents.className = "comContainer";
            pComents.textContent = element.postId;
            const comLabel = document.querySelector(".comLabel");
            comLabel.appendChild(pComents);
          });
        });
    });
  });

//<span class="material-icons">edit_note</span
//       ><span class="material-icons">clear</span>
