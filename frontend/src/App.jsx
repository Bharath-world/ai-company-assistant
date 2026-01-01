sendBtn.onclick = async () => {
  if (sendBtn.disabled) return;   
  sendBtn.disabled = true;

  const question = input.value.trim();
  if (!question) {
    sendBtn.disabled = false;
    return;
  }

  chatBox.innerHTML += `<div class="user">You: ${question}</div>`;
  const thinking = document.createElement("div");
  thinking.className = "ai";
  thinking.innerText = "AI is thinking...";
  chatBox.appendChild(thinking);

  input.value = "";

  try {
    const res = await fetch("http://localhost:5000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await res.json();
    thinking.remove();
    chatBox.innerHTML += `<div class="ai">AI: ${data.reply}</div>`;
  } catch (e) {
    thinking.remove();
    chatBox.innerHTML += `<div class="ai error">Error</div>`;
  } finally {
    sendBtn.disabled = false;   
  }
};
