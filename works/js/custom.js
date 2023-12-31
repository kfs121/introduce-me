// main
const $mouse = document.querySelector("#mouse");
const $contentSlideUl = document.querySelector("#contents-slide .inner ul");
const $contentSlideLi = document.querySelector("#contents-slide .inner ul li");
const $contentSlideLiWork = document.querySelector("#contents-slide .inner ul li .work");
const $$contentSlideLi = document.querySelectorAll("#contents-slide .inner ul li");
const $$foldBtn = $contentSlideUl.querySelectorAll(".fold--btn");

const POINT_WIDTH = 1660;

const ONE_SLIDE_ELEMENTAL_WIDTH =  640

const SLIDE_WIDTH = ONE_SLIDE_ELEMENTAL_WIDTH * $contentSlideUl.childElementCount;
const MAX_SLIDE = -SLIDE_WIDTH + ONE_SLIDE_ELEMENTAL_WIDTH * 1;

const $slider = document.querySelector("#slide-area .inner .slide-bg .slider");

let currContentsLeftPx = 0;
let currScrollEventEnv = 0;
let userMouseY;

const isMobile = checkMobile();

//휠이벤트 막기
const scrollEvent = function (e) {
  if(e.target.classList.contains("no-scroll-event")) return;
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


$$foldBtn.forEach($foldBtn=>{
  $foldBtn.down = true;
  $foldBtn.addEventListener("click", (e)=>{
    if( e.target.parentElement.classList.contains("show") ){
      e.target.parentElement.classList.remove("show");
    }else{
      e.target.parentElement.classList.add("show");
    }

  });
})


if(!isMobile){
  initMouseEnv();
  document.addEventListener("scroll", (e)=>{
    mouse.style.top = window.scrollY + userMouseY + "px";
  });

  const $$desciption = document.querySelectorAll('.work .description');
  $$desciption.forEach(($desciption)=>{
    const $p = $desciption.querySelector('p');
    const $sourceWrap = $desciption.querySelector('.source-wrap');
    if($p.clientHeight + 127 < $p.scrollHeight){
      $p.classList.add('no-scroll-event');
    }
    if($sourceWrap.clientHeight < $sourceWrap.scrollHeight){
      $sourceWrap.classList.add('no-scroll-event');
      const $$sources = $sourceWrap.children;
      for(let i = 0; i < $$sources.length; i++){
        $$sources[i].classList.add('no-scroll-event');
        $$sources[i].querySelector('a').classList.add('no-scroll-event');
        $$sources[i].querySelector('span').classList.add('no-scroll-event');
      }
    }
  })
}else{
  removeInitMouseEnv();
}

setScrollEvent(POINT_WIDTH);

window.addEventListener('resize', ()=>{
  setScrollEvent(POINT_WIDTH);
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
    if(!isMobile) return;
  } else {
    $contentSlideUl.style.width = SLIDE_WIDTH + "px";
    if(currScrollEventEnv === 1) return;
    if(isMobile) return;
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
  
  // $$contentSlideLi.forEach(function ($element) {
  //   $element.addEventListener("mouseover", mouseHoverEvent);
  // });

  // $$contentSlideLi.forEach(function ($element) {
  //   $element.addEventListener("mouseout", removeMouseHoverEvent);
  // });
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
  $$contentSlideLi.forEach(function ($element) {
    $element.removeEventListener("mouseover", mouseHoverEvent);
  });

  $$contentSlideLi.forEach(function ($element) {
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
