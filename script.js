var imageFile;
const extractBtn = document.querySelector(".extract-btn");

var loadFile = function (event) {
  var image = document.getElementById("uploaded-img");
  image.src = URL.createObjectURL(event.target.files[0]);
  //loaded image stored in imageFile
  imageFile = event.target.files[0];
  console.log(imageFile)

};

extractBtn.addEventListener("click", handleExtract);
function handleExtract() {
  //check if imagefile is loaded
  if(imageFile){
    performOCR(imageFile);
  }
  else (
    alert("Upload image!")
  )

  //to disable extract button after extraction.
  // extractBtn.removeEventListener("click", handleExtract);
}

async function performOCR(imageFile) {
  // const worker=await Tesseract.createWorker('eng');
  const worker = await Tesseract.createWorker("eng", 1, {
    logger: (m) => console.log(m), // Add logger here
  });
  const ret = await worker.recognize(imageFile);
  console.log(ret.data.text);
  alert(ret.data.text);
  await worker.terminate();
}
