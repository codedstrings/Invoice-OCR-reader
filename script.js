var loadFile = function (event) {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
        // Perform OCR when an image is loaded
        performOCR(event.target.files[0]);
};

async function performOCR(imageFile) {
    // Initialize Tesseract.js
    const worker = createWorker({
        logger: info => console.log(info),
    });

    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    // Recognize text from the image
    const { data: { text } } = await worker.recognize(imageFile);
    console.log('Recognized Text:', text);

    // Display the recognized text (you might want to update this based on your UI)
    alert('Recognized Text:\n' + text);

    // Terminate the worker
    await worker.terminate();
}
