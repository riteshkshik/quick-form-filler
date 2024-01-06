

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("addButton")
    .addEventListener("click", addKeyValuePair);
});

function addKeyValuePair() {
  var key = document.getElementById("key").value.trim();
  var value = document.getElementById("value").value.trim();

  chrome.storage.local.set({ [key]: value }, function () {
    console.log("Key-value pair added to chrome.storage.local:", key, value);
  });
  
  document.getElementById("key").value = "";
  document.getElementById("value").value = "";
}
