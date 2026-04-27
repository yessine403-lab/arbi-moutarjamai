chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "translate") {
    fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${request.apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 300,
        messages: [
          {
            role: "system",
            content: "You are a translator. Translate the given French or English text to Modern Standard Arabic (فصحى). If the text is already Arabic, translate it to English. Reply with ONLY the translation, nothing else."
          },
          { role: "user", content: request.text }
        ]
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.choices && data.choices[0]) {
        sendResponse({ success: true, text: data.choices[0].message.content.trim() });
      } else {
        sendResponse({ success: false, error: JSON.stringify(data) });
      }
    })
    .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }
});