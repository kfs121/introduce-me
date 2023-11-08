// main
const $mouse = document.querySelector("#mouse");

const pointWidth = 1660;

let userMouseY;

const isMobile = checkMobile();


const mouseEvent = (e) => {
  mouse.style.left = e.clientX + "px";
  userMouseY = e.clientY;
  mouse.style.top = e.pageY + "px";
  
}

const mouseHoverEvent = () => {
  $mouse.classList.add("hover-mouse");
};

const removeMouseHoverEvent = () => {
  $mouse.classList.remove("hover-mouse");
};


if(!isMobile){
  initMouseEnv();
  document.addEventListener("scroll", (e)=>{
    mouse.style.top = window.scrollY + userMouseY + "px";
  });
}else{
  removeInitMouseEnv();
}



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
}

function checkMobile(){
  try{
    document.createEvent("TouchEvent");
    return true;
  }catch(e){
    return false;
  }
}
