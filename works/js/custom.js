// main
const $mouse = document.querySelector("#mouse");
const $contentSlideUl = document.querySelector("#contents-slide .inner ul");
const $contentSlideLi = document.querySelector("#contents-slide .inner ul li a");

const pointWidth = 1660;

const ONE_SLIDE_ELEMENTAL_WIDTH =  Number(getStlyeValue($contentSlideLi, "width").replace("px", "")) +
  Number(getStlyeValue($contentSlideUl, "gap").split(" ")[1].replace("px", ""));

const SLIDE_WIDTH = ONE_SLIDE_ELEMENTAL_WIDTH * $contentSlideUl.childElementCount;
const MAX_SLIDE = -SLIDE_WIDTH + ONE_SLIDE_ELEMENTAL_WIDTH * 1;

const $slider = document.querySelector("#slide-area .inner .slide-bg .slider");

let currContentsLeftPx = 0;
let currScrollEventEnv = 0;
let userMouseY;

const isMobile = checkMobile();

const scrollEvent = function (e) {

  let scroll = e.deltaY;
  if (
    currContentsLeftPx - scroll < 100 &&
    currContentsLeftPx - scroll > MAX_SLIDE
  ) {
    currContentsLeftPx -= e.deltaY;
    $contentSlideUl.style.left = currContentsLeftPx + "px";
    fillSlider(currContentsLeftPx);
  }
}


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

setScrollEvent(pointWidth);

window.addEventListener('resize', ()=>{
  setScrollEvent(pointWidth);
})


// function
function setScrollEvent(windowWidth){
  if (window.innerWidth <= windowWidth) {
    $contentSlideUl.style.left=0;
    $contentSlideUl.style.width = "100%";
    currContentsLeftPx = 0;
    fillSlider(currContentsLeftPx);
    if(currScrollEventEnv === 2) return;
    removeInitScrollEvent();
  } else {
    
    $contentSlideUl.style.width = SLIDE_WIDTH + "px";
    if(currScrollEventEnv === 1) return;
    initScrollEvent();
  }
}


function fillSlider(currContentsSlideLeft) {
  let currLeft = Math.abs(currContentsSlideLeft);
  let sliderWidth = (currLeft / Math.abs(MAX_SLIDE)) * 100;
  $slider.style.width = sliderWidth + "%";
}

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


function initScrollEvent(){
  currScrollEventEnv = 1;
  document.addEventListener("wheel", scrollEvent);
}

function removeInitScrollEvent(){
  currScrollEventEnv = 2;
  document.removeEventListener("wheel", scrollEvent);
}

function checkMobile(){
  try{
    document.createEvent("TouchEvent");
    return true;
  }catch(e){
    return false;
  }
}