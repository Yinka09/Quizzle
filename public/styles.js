const myTry = document.querySelectorAll("#mytry");
myTry.forEach((i) => {
  i.addEventListener("click", (event) => {
    const addLoadingStyle2 = document.querySelector(".disappear");
    const addLoadingStyle3 = document.querySelector(".disappear1");
    const addLoadingStyle4 = document.querySelector(".disappear2");
    const addLoadingStyle5 = document.querySelector(".disappear3");

    addLoadingStyle2.classList.add("swirl-in-fwd");
    addLoadingStyle3.classList.add("tracking-out-contract-bck");
    addLoadingStyle4.classList.add("tracking-out-contract");
    addLoadingStyle5.classList.add("swirl-in-fwd");
    console.log("I am a girl");
  });
});

// myTry.forEach((i) => {
//   i.addEventListener("click", (event) => {
//     const addLoadingStyle2 = document.querySelector("h1.disappear");
//     addLoadingStyle2.classList.add("tracking-out-contract-bck");
//     console.log("I am a girl");
//   });
// });

const getStartBut = document.querySelectorAll(".start-but");
getStartBut.forEach((j) => {
  j.addEventListener("click", (event) => {
    const addLoadingStyle = document.querySelector(".my-load");
    addLoadingStyle.classList.add("loader");
  });
});
