const GROQ_API_KEY = "your-groq-api-key-here";

document.addEventListener("mouseup", async (e) => {
  const selectedText = window.getSelection().toString().trim();
  removePopup();
  if (selectedText.length < 2) return;
  if (selectedText.length > 1000) {
   showPopup("⚠️ Select shorter text (max 1000 characters)", e.clientX, e.clientY);
    return;
  }
  showPopup("⏳ Translating...", e.clientX, e.clientY);
  try {
    const translation = await translateToDarija(selectedText);
    showPopup(translation, e.clientX, e.clientY);
  } catch (err) {
    showPopup("❌ Error: " + err.message, e.clientX, e.clientY);
  }
});

document.addEventListener("mousedown", (e) => {
  if (!e.target.closest("#darija-popup")) removePopup();
});

async function translateToDarija(text) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({
      action: "translate",
      apiKey: GROQ_API_KEY,
      text: text
    }, (response) => {
      if (response.success) resolve(response.text);
      else reject(new Error(response.error));
    });
  });
}