
// selector
const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");

// Setiap kali burger ditekan, toggle class show untuk show/hide menu 
burger.addEventListener("click", ()=>menu.classList.toggle("show"));
// Setiap kali menu ditekan, hapus class show untuk hide menu dropdown 
menuLink = document.querySelectorAll(".menu-link");
menuLink.forEach(element => element.addEventListener("click",()=>menu.classList.remove("show")));