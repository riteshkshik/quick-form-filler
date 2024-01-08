document.addEventListener("DOMContentLoaded", function () {

  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("edit_icon")) {
      editKeyVal.call(event.target); // Use call to set 'this' to the clicked element
    }
  });

  chrome.storage.local.get(null, function (result) {
    if (Object.keys(result).length > 0) {
      var olElement = document.createElement("ol");
      olElement.className = "olcards";

      Object.keys(result).forEach(function (key) {
        var liElement = document.createElement("li");
        liElement.style.setProperty("--cardColor", getRandomColor());

        var divContent = document.createElement("div");
        divContent.className = "content";

        var divIcon = document.createElement("div");
        divIcon.className = "icon";
        divIcon.textContent = getRandomEmoji();

        var divText = document.createElement("div");
        divText.innerHTML = `<div class="title">${key}</div><div class="text">${result[key]}</div>`;

        var divEditDeleteBtn = document.createElement("div");
        divEditDeleteBtn.className = "editDeleteBtnDiv";

        var imgEdit = document.createElement("img");
        imgEdit.className = "edit_icon";
        imgEdit.src = "assets/edit_icon_colorful.png";
        imgEdit.alt = "edit_icon";
        imgEdit.style.height = "35px";
        imgEdit.style.width = "35px";

        var imgDelete = document.createElement("img");
        imgDelete.className = "delete_icon";
        imgDelete.src = "assets/delete_icon_colorful.png";
        imgDelete.alt = "delete_icon";
        imgDelete.style.height = "35px";
        imgDelete.style.width = "35px";

        divEditDeleteBtn.appendChild(imgEdit);
        divEditDeleteBtn.appendChild(imgDelete);

        divContent.appendChild(divIcon);
        divContent.appendChild(divText);
        divContent.appendChild(divEditDeleteBtn);
        liElement.appendChild(divContent);
        olElement.appendChild(liElement);
      });

      document.body.appendChild(olElement);
    } else {
      console.log("No Shortcut key-values found!");
    }
  });
});

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function getRandomEmoji() {
  var emojis = ["😀", "😎", "🚀", "🌈", "🎉", "🌟", "❤️", "🍕", "🎸", "🌺"];

  var randomIndex = Math.floor(Math.random() * emojis.length);

  return emojis[randomIndex];
}

function editKeyVal() {
  var title = this.parentNode.parentNode.querySelector(".title").innerText;
  var text = this.parentNode.parentNode.querySelector(".text").innerText;
  alert(`title is ${title} and value is ${text}`);
}