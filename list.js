document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("edit_icon")) {
      editKeyVal.call(event.target); // Use call to set 'this' to the clicked element
    }
    if (event.target.classList.contains("delete_icon")) {
      deleteKeyValPopup.call(event.target); 
    }
  });

  chrome.storage.local.get(null, function (result) {
    if (Object.keys(result).length > 0) {
      var olElement = document.createElement("ol");
      olElement.className = "olcards";

      Object.keys(result).forEach(function (key) {
        var liElement = document.createElement("li");
        var colors = getRandomColor(); // Get colors object
        liElement.style.setProperty("--cardColor", colors.background);

        var divContent = document.createElement("div");
        divContent.className = "content";

        var divIcon = document.createElement("div");
        divIcon.className = "icon";
        divIcon.textContent = getRandomEmoji();

        var divText = document.createElement("div");
        divText.style.color = colors.text;
        divText.innerHTML = `<div class="title">${key}</div><div class="text">${result[key]}</div>`;

        var divEditDeleteBtn = document.createElement("div");
        divEditDeleteBtn.className = "editDeleteBtnDiv";

        var imgEdit = document.createElement("img");
        imgEdit.className = "edit_icon";
        imgEdit.src = "assets/edit_icon_colorful.png";
        imgEdit.alt = "edit_icon";
        imgEdit.style.height = "35px";
        imgEdit.style.width = "35px";
        imgEdit.style.cursor = "pointer";
        imgEdit.style.color = colors.text; // Set text color

        var imgDelete = document.createElement("img");
        imgDelete.className = "delete_icon";
        imgDelete.src = "assets/delete_icon_colorful.png";
        imgDelete.alt = "delete_icon";
        imgDelete.style.height = "35px";
        imgDelete.style.width = "35px";
        imgDelete.style.cursor = "pointer";

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

  // Calculate luminance to determine text color
  const getLuminance = (color) => {
    const rgb = parseInt(color.substring(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    return 0.299 * r + 0.587 * g + 0.114 * b;
  };

  const luminance = getLuminance(color);
  const textColor = luminance > 128 ? "#000000" : "#ffffff";

  return { background: color, text: textColor };
}

function getRandomEmoji() {
  var emojis = ["😀", "😎", "🚀", "🌈", "🎉", "🌟", "❤️", "🍕", "🎸", "🌺"];

  var randomIndex = Math.floor(Math.random() * emojis.length);

  return emojis[randomIndex];
}


function deleteKeyValPopup(){
  var listItem = this.closest("li");
  var title = this.parentNode.parentNode.querySelector(".title").innerText; // key
  var text = this.parentNode.parentNode.querySelector(".text").innerText; // value

  document.getElementById("deletePopup").style.display = "block";
  document.getElementById("deleteKey").innerText = title;
  document.getElementById("deleteValue").innerText = text;

  var cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
  cancelDeleteBtn.addEventListener("click", function () {
    document.getElementById("deletePopup").style.display = "none";
  });

  var confirmBtn = document.getElementById("confirmDelete");
  confirmBtn.addEventListener('click', function(){
    chrome.storage.local.remove(title, function () {
      listItem.remove();
      document.getElementById("deletePopup").style.display = "none";
    });
  })
}

function editKeyVal() {
  var listItem = this.closest("li");
  var title = this.parentNode.parentNode.querySelector(".title").innerText;  // key 
  var text = this.parentNode.parentNode.querySelector(".text").innerText;    // value

  document.getElementById("editPopup").style.display = "block";
  document.getElementById("editKey").value = title;
  document.getElementById("editValue").value = text;

  var saveBtn = document.getElementById("saveChanges");

  saveBtn.addEventListener('click', function(){
    chrome.storage.local.remove(title); // delete old key data

    var editedTitle = document.getElementById("editKey").value.trim();
    var editedText = document.getElementById("editValue").value.trim();

    chrome.storage.local.set({ [editedTitle]: editedText }, function () {
      document.getElementById("editPopup").style.display = "none";
      location.reload();
    });
  })

  var cancelBtn = document.getElementById("cancelBtn");
  cancelBtn.addEventListener('click', function(){
    document.getElementById("editPopup").style.display = "none";
  })

  // alert(`title is ${title} and value is ${text}`);
}
