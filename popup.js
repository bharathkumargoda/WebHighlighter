function highlight(color) {
  // Query the currently active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: applyHighlight,
      args: [color]
    });
  });
}

// Function that will be injected into the page
function applyHighlight(color) {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const span = document.createElement("span");
  span.style.backgroundColor = color;
  range.surroundContents(span);
}
