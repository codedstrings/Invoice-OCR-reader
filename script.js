var loadFile = function (event) {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
        // Perform OCR when an image is loaded
        performOCR(event.target.files[0]);
};


async function performOCR(imageFile){
    const worker=await Tesseract.createWorker('eng')
    const ret = await worker.recognize(imageFile);
  console.log(ret.data.text);
  alert(ret.data.text);
  await worker.terminate();
}
  