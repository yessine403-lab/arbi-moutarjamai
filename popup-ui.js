function showPopup(text, x, y) {
  removePopup();

  const popup = document.createElement("div");
  popup.id = "darija-popup";

  const header = document.createElement("div");
  header.className = "darija-header";
  header.innerHTML = `✨ <span>Arbi Moutarjam AI</span>`;

  const content = document.createElement("div");
  content.className = "darija-content";
  content.textContent = text;

  const closeBtn = document.createElement("button");
  closeBtn.className = "darija-close";
  closeBtn.textContent = "✕";
  closeBtn.onclick = removePopup;

  // Copy button
  const copyBtn = document.createElement("button");
  copyBtn.className = "darija-copy";
  copyBtn.textContent = "📋 Copy";
  copyBtn.onclick = () => {
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.textContent = "✅ Copied!";
      setTimeout(() => copyBtn.textContent = "📋 Copy", 2000);
    });
  };

  popup.appendChild(header);
  popup.appendChild(closeBtn);
  popup.appendChild(content);
  popup.appendChild(copyBtn);
  document.body.appendChild(popup);

  const popupWidth = 280;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const winWidth = window.innerWidth;

  let left = x + scrollX;
  let top = y + scrollY + 15;

  if (left + popupWidth > winWidth + scrollX) {
    left = winWidth + scrollX - popupWidth - 10;
  }

  popup.style.left = left + "px";
  popup.style.top = top + "px";
}

function removePopup() {
  const existing = document.getElementById("darija-popup");
  if (existing) existing.remove();
}