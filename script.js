var imageFile;
var sessionComplete=false;
const extractBtn = document.querySelector(".extract-btn");
const textView=document.querySelector(".text-view");
const progressWrapper=document.querySelector("progress-wrapper")
var loadFile = function (event) {
  var image = document.getElementById("uploaded-img");
  image.src = URL.createObjectURL(event.target.files[0]);
  //loaded image stored in imageFile
  imageFile = event.target.files[0];
  console.log(imageFile)
  //enable extract again when another file is uploaded
  extractBtn.classList.remove("invisible");
  let lastChild = textView.lastElementChild;
  if(sessionComplete){
    textView.removeChild(lastChild);
  }
  //reset session when another file uploaded
  sessionComplete=false;
};

extractBtn.addEventListener("click", handleExtract);
function handleExtract() {
  //check if imagefile is loaded
  if(imageFile){
    performOCR(imageFile);
    extractBtn.classList.add("invisible");
    // progressWrapper.classList.remove("invisible");
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
  // alert(ret.data.text);
  const extractedText=document.createElement("div");
  extractedText.innerText=ret.data.text;
  textView.appendChild(extractedText);

  sessionComplete=true;
  await worker.terminate();
}
