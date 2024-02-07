


console.log("we are on google .com")
// console.log("ritesh -> ",document.activeElement)



document.addEventListener("keydown", function (event) {
  console.log("key down");
  if (event.ctrlKey && event.key === " ") {
    if (
      document.activeElement.isContentEditable ||
      document.activeElement.tagName === "INPUT" ||
      document.activeElement.tagName === "INPUT" ||
      document.activeElement.type === "text" ||
      document.activeElement.tagName === "TEXTAREA"
    ) {
      const shortKey = document.activeElement.value;
      replaceValue(shortKey);
    }
  }
});

function replaceValue(shortKey) {
  chrome.storage.local.get(shortKey, function (result) {
    var value = result[shortKey];
    // console.log("Value retrieved from chrome.storage.local:", value);
    if (value) {
      document.activeElement.value = value;
    } else {
      console.log("Value not found for key:", shortKey);
    }
  });
}
