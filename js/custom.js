// main
const $mouse = document.querySelector('#mouse');
const $imgSlideUl = document.querySelector('#img-slide ul');
const $leftSide = document.querySelector('#img-flip-area .left');
const $rightSide = document.querySelector('#img-flip-area .right');
const $$imgSlideController = document.querySelectorAll('.img-slide-controller ul li .control-box');
const $$imgSlideControllerA = document.querySelectorAll('.img-slide-controller ul li a');

let imgSlideIdx = 0;
let isSliding = false;
document.addEventListener('mousemove', (e)=>{
  setTimeout(100);
  mouse.style.left = e.clientX + "px";
  mouse.style.top = e.pageY + "px";
});

const mouseHoverEvent = () =>{
  $mouse.classList.add('hover-mouse');
}

const removeMouseHoverEvent = () => {
  $mouse.classList.remove('hover-mouse');
}

const $$a = document.querySelectorAll('a');
$$a.forEach(function ($element){
  $element.addEventListener('mouseover', mouseHoverEvent);
});

$$a.forEach(function ($element){
  $element.addEventListener('mouseout', removeMouseHoverEvent);
});


document.querySelectorAll('#img-flip-area>*').forEach(($e)=>{
  $e.removeEventListener('mouseover', mouseHoverEvent);
  $e.removeEventListener('mouseout', removeMouseHoverEvent);
});

$rightSide.addEventListener('click', function(){
  if(imgSlideIdx === 2){
    location.href = './works/index.html';
  }
  if(imgSlideIdx < 2 && !isSliding){
    $imgSlideUl.style.left = `${-(++imgSlideIdx) * 100}%`;
    selectedController(imgSlideIdx);
  }
});

$leftSide.addEventListener('click', function(){
  if(imgSlideIdx > 0 && !isSliding){
    $imgSlideUl.style.left = `${-(--imgSlideIdx) * 100}%`;
    selectedController(imgSlideIdx);
  }
});

$$imgSlideControllerA.forEach(function($e,idx){
  $e.addEventListener('click',function($e){
    imgSlideIdx = idx;
    $imgSlideUl.style.left = `${-(idx * 100)}%`;
    selectedController(imgSlideIdx);
  })
})


// function
function selectedController(imgIdx){
  $$imgSlideController.forEach(function($e){
    $e.classList.remove('selected-img-contller');
  })
  $$imgSlideController[imgIdx].classList.add('selected-img-contller');
}


