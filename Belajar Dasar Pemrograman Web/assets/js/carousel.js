// get selector 
let counter = 0
const testimonies = document.querySelectorAll(".testimoni-item")
const buttonNext = document.querySelector("#carousel-next")
const buttonPrev = document.querySelector("#carousel-prev")
n = testimonies.length
buttonNext.addEventListener("click", nextPage)
buttonPrev.addEventListener("click", prevPage)
// Get next Element
function getNextTestimoni() {
    // Select index 
    // change display to block 
    testimonies[Math.abs(counter) % n].style.display = "block"
}

// Next Page
function nextPage() {
    removeAll();
    counter++;
    getNextTestimoni();
}

// Prev Page
function prevPage() {
    removeAll();
    counter--;
    if (counter<0){
        counter=2;
    }
    getNextTestimoni();
}

// funct to remove all item
function removeAll() {
    testimonies.forEach(element => element.style.display = "none");
}

removeAll()
getNextTestimoni()