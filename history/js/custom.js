// main
const $mouse = document.querySelector("#mouse");

const POINT_WIDTH = 615;


let isMobile;
let checkSystemMobile = checkMobile();


const mouseEvent = (e) => {
  mouse.style.left = e.clientX + -17 + "px";
  mouse.style.top = e.clientY + -20 + "px";
}

const mouseHoverEvent = () => {
  $mouse.classList.add("hover-mouse");
};

const removeMouseHoverEvent = () => {
  $mouse.classList.remove("hover-mouse");
};


if(!checkMobile()){
  initMouseEnv();
}else{
  removeInitMouseEnv();
}

window.addEventListener("resize", (e)=>{
  if(!checkMobile()){
    if(isMobile) return;
    console.log("is not mobile");
    initMouseEnv();
    
  }else{
    if(!isMobile) return;
    console.log("is mobile");
    removeInitMouseEnv();
  }
});



// function


function getStlyeValue($element, styleName) {
  return getComputedStyle($element).getPropertyValue(styleName);
}


function initMouseEnv(){
  document.addEventListener("mousemove", mouseEvent);
  const $$a = document.querySelectorAll("a");
  $$a.forEach(function ($element) {
    $element.addEventListener("mouseover", mouseHoverEvent);
  });

  $$a.forEach(function ($element) {
    $element.addEventListener("mouseout", removeMouseHoverEvent);
  });
  isMobile = true;
  $mouse.style.display = 'block';
}


function removeInitMouseEnv(){
  document.removeEventListener("mousemove", mouseEvent);
  
  const $$a = document.querySelectorAll("a");
  $$a.forEach(function ($element) {
    $element.removeEventListener("mouseover", mouseHoverEvent);
  });

  $$a.forEach(function ($element) {
    $element.removeEventListener("mouseout", removeMouseHoverEvent);
  });
  isMobile = false;
  $mouse.style.display = 'none';
}

// function checkMobile(){
//   try{
//     document.createEvent("TouchEvent");
//     return true;
//   }catch(e){
//     return false;
//   }
// }


function checkMobile() {
  const mobileRegex = [
    /Android/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ]

  return mobileRegex.some(mobile => window.navigator.userAgent.match(mobile))
}