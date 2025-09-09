// Wire UI events without inline handlers
(function init() {
  const fileInput = document.getElementById('imageFile');
  const chooser = document.getElementById('fileInputContainer');

  chooser.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', recognizeImage);
})();

function recognizeImage() {
  const fileInput = document.getElementById('imageFile');
  if (!fileInput.files.length) return;

  // Show loading animation and hide file input container
  document.getElementById('fileInputContainer').style.display = 'none';
  document.getElementById('loadingAnimation').style.display = 'block';

  $.ajax({
    url: 'https://analyzeimage-leivadaros.cognitiveservices.azure.com/vision/v3.2/analyze?visualFeatures=Description',
    beforeSend: function (xhrObj) {
      xhrObj.setRequestHeader('Content-Type', 'application/octet-stream');
      // Replace this placeholder with your actual subscription key
      xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', 'your subscription key');
    },
    type: 'POST',
    data: fileInput.files[0],
    processData: false
  })
  .done(function (data) {
    // Display the image (no jQuery .attr for XSS cleanliness)
    const imageURL = URL.createObjectURL(fileInput.files[0]);
    document.getElementById('imageDisplay').src = imageURL;

    // Safely render the description without innerHTML/html()
    const descRoot = document.getElementById('descriptionDisplay');
    while (descRoot.firstChild) descRoot.removeChild(descRoot.firstChild);

    const description = (data && data.description) ? data.description : {};
    const captionObj = (description.captions && description.captions[0]) ? description.captions[0] : { text: 'N/A', confidence: 0 };
    const tagsArr = Array.isArray(description.tags) ? description.tags : [];

    const addLine = (label, valueText) => {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = label + ': ';
      p.appendChild(strong);
      p.appendChild(document.createTextNode(valueText));
      descRoot.appendChild(p);
    };

    addLine('Description', String(captionObj.text || 'N/A'));
    addLine('Tags', tagsArr.length ? tagsArr.join(', ') : '—');
    addLine('Accuracy', ((Number(captionObj.confidence) || 0) * 100).toFixed(2) + '%');

    // Update visibility
    document.getElementById('loadingAnimation').style.display = 'none';
    document.getElementById('recognizedImageSection').style.display = 'block';
    document.getElementById('descriptionDisplay').style.display = 'block';
    document.getElementById('fileInputContainer').style.display = 'block';
  })
  .fail(function () {
    alert('Error: request failed');
    document.getElementById('loadingAnimation').style.display = 'none';
    document.getElementById('fileInputContainer').style.display = 'block';
  });
}
