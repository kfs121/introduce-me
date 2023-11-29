const $title = document.querySelector("#history-wrap h3.title");
const $selfie = document.querySelector(".cover-letter .inner .left #selfie");
const $toMountain = document.querySelector(".cover-letter .inner .left #to-mountain");
const $$textSections = document.querySelectorAll(".right .text-section");

const SECTION_MARGIN = 2000;
console.log($$textSections.length);
gsap.from($title, {
  filter: "blur(30px)",
  scrollTrigger: {
    trigger: "#history-wrap .title-section",
    start: "top top",
    end: "+=3000",
    scrub: true,
    //markers: true,
    pin: true,
    anticipatePin: 1,
  },
});

gsap.to($selfie, {
  scrollTrigger: {
    trigger: $selfie,
    start: "top top",
    end: `+=${(3)*SECTION_MARGIN + 3*innerHeight + innerHeight + 80-6}`,
    pin: true,
    anticipatePin: 1,
    //markers: true,
  },
});

gsap.to($toMountain, {
  scrollTrigger: {
    trigger: $toMountain,
    start: "top top",
    end: `+=${(3)*SECTION_MARGIN + (3)*innerHeight - innerHeight}`,
    pin: true,
    anticipatePin: 1,
    //markers: true,
  },
});

$$textSections.forEach($textSection=>{
  textAni($textSection);
});





// textarea를 point-events none으로 다 막아둔 상태.
// css 효과 중 뒷면 안보이는 거 이용해서 그거 form에 겹쳐서 상하로 회전 시킬 때 마치 접는 것 처럼 할 수 있나?그러니까, 겹쳐놓은게 상하 섹션으로 있어서, 위쪽은 맨 처음에 아예 가로방향으로 돌려놔서 뒤쪽 다 보이고, 아래는 안돌려놔서 그냥 하얀 면.
// 그 상태에서 상하로 서서히 뒤집으면 마치 종이접듯이 그렇게 될듯? 뭔가 뒤쪽? 투명으로 만들면.. 부모를 투명으로 만들면?

// 일단은 textarea 영역 top부분 아래쪽으로 좀더 padding해서 
// 윗부분에 input으로 from, to 공간 만들자.

// 그리고 지금 height로 하긴 했는데, top 이미지 뒤에 zindex 더 낮은 거 설정하고, form을 그것보다 더 낮게하면 가릴 수 있을 듯. position으로 바꾸는 게 좋아 보임.
const $mailFormWrap = document.querySelector('#email-section .form-wrap');

gsap.from($mailFormWrap, {
  top:'-550px',
  scrollTrigger: {
    trigger: "#email-section",
    start: "top top",
    end: "+=2000",
    scrub: true,
    //markers: true,
    pin: true,
    anticipatePin: 1,
    onLeave:()=>{
      $mailFormWrap.querySelector('textarea').style.pointerEvents = 'all';
    }
  },
});





function textAni($section) {
  const ani = gsap.timeline();
  const $title = $section.querySelector("h4");
  const $$gauge = $section.querySelectorAll(".gauge");
  const $$description = $section.querySelectorAll(".text-wrap");
  ani.from($title, { duration: 0.3, y: 50, autoAlpha: 0, fontSize:36 })
    .from($$description, { duration: 0.3, y: 50, autoAlpha: 0, stagger:0.1 });
  ScrollTrigger.create({
    animation: ani,
    trigger: $section,
    start: "top top",
    end: "+=2000",
    pin: true,
    anticipatePin: 1,
    pinSpacing: false,
    //markers: true,
    toggleActions: "play none reverse none",
    onEnter:()=>{
      if($$gauge.length !== 0){
        $$gauge.forEach(($gauge)=>{
          $gauge.classList.add('ani');
        })
      }
    },
    // onLeave:()=>{
    //   if($$gauge.length !== 0){
    //     $$gauge.forEach(($gauge)=>{
    //       $gauge.style.animationDirection='reverse';
    //     })
    //   }
    // }
  });
}