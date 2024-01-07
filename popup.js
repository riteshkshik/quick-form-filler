

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("addButton")
    .addEventListener("click", addKeyValuePair);

  document
    .getElementById("view-shortcut-btn")
    .addEventListener("click", openNewPage);
});

function addKeyValuePair() {
  
  var key = document.getElementById("key").value.trim();
  var value = document.getElementById("value").value.trim();

  if (!key) {
    alert("Key Can't be Empty!");
    return;
  }
  if (!value) {
    alert("Value Can't be Empty!");
    return;
  }
  

  chrome.storage.local.set({ [key]: value }, function () {
    console.log("Key-value pair added to chrome.storage.local:", key, value);
  });
  
  document.getElementById("key").value = "";
  document.getElementById("value").value = "";
}

function openNewPage(){
  chrome.tabs.create({ url: "list.html" });
}
