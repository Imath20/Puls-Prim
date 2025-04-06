function changeModel(modelId, description) {
  const iframe = document.getElementById('modelFrame');
  const desc = document.getElementById('modelDescription');
  iframe.src = `https://sketchfab.com/models/${modelId}/embed`;
  desc.innerHTML = `${description}<br>🔁 Poți roti și mări cu mouse-ul<br>🗨 Textul din model este în engleză`;
}