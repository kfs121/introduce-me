const $title = document.querySelector("#history-wrap h3.title");
const $selfie = document.querySelector(".cover-letter .inner .left #selfie");
const $toMountain = document.querySelector(
  ".cover-letter .inner .left #to-mountain"
);
const $scrollSection = document.querySelector("#arrow--section");
const $$textSections = document.querySelectorAll(".right .text-section");

let isMobileAtHistory = false;

const MOBILE_WIDTH = 615;
const textAnimations = [];

const SECTION_MARGIN = 2000;

let titleGsap;
let selfieGsap;
let scrollGsap;
let selfie2Gsap;
let emailGsap;

class TextAnimation {
  animation;
  scrollAnimation;

  constructor(textAnimation, scrollAnimation) {
    this.animation = textAnimation;
    this.scrollAnimation = scrollAnimation;
  }
}

if (window.innerWidth <= MOBILE_WIDTH) {
  isMobileAtHistory = true;
} else {
  pcAnimation();
}

window.addEventListener("resize", (e) => {
  if (window.innerWidth <= MOBILE_WIDTH) {
    if (isMobileAtHistory) return;
    isMobileAtHistory = true;
    killAnimation();
  } else {
    if(!isMobileAtHistory) return;
    isMobileAtHistory = false;
    pcAnimation();
  }
});

function killAnimation(){
  if(titleGsap !== undefined){
    if (titleGsap.scrollTrigger) {
      titleGsap.scrollTrigger.kill();
    }
    titleGsap.revert().kill();
    if (selfieGsap.scrollTrigger) {
      selfieGsap.scrollTrigger.kill();
    }
    selfieGsap.revert().kill();
    if (selfie2Gsap.scrollTrigger) {
      selfie2Gsap.scrollTrigger.kill();
    }
    scrollGsap.revert().kill();
    if (scrollGsap.scrollTrigger) {
      scrollGsap.scrollTrigger.kill();
    }
    scrollGsap.revert().kill();

    textAnimations.forEach(textAnimation=>{
      textAnimation.animation.revert().kill();
      textAnimation.scrollAnimation.kill();
    });

    if(emailGsap.scrollTrigger){
      emailGsap.scrollTrigger.kill();
    }
    emailGsap.revert().kill();
  }
}

function pcAnimation() {
  titleGsap = gsap.from($title, {
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

  selfieGsap = gsap.to($selfie, {
    scrollTrigger: {
      trigger: $selfie,
      start: "top top",
      end: `+=${4 * SECTION_MARGIN + 4 * innerHeight + innerHeight + 80 - 6}`,
      pin: true,
      anticipatePin: 1,
      //markers: true,
    },
  });

  scrollGsap = gsap.to($scrollSection, {
    scrollTrigger: {
      trigger: $scrollSection,
      start: "top top",
      end: `+=2000`,
      pin: true,
      anticipatePin: 1,
      // markers: true,
    },
  });

  selfie2Gsap = gsap.to($toMountain, {
    scrollTrigger: {
      trigger: $toMountain,
      start: "top top",
      end: `+=${3 * SECTION_MARGIN + 3 * innerHeight - innerHeight}`,
      pin: true,
      anticipatePin: 1,
      //markers: true,
    },
  });

  $$textSections.forEach(($textSection) => {
    textAni($textSection);
  });

  const $mailFormWrap = document.querySelector("#email-section .form-wrap");
  const $sendBtn = $mailFormWrap.querySelector("button");
  emailGsap = gsap.from($mailFormWrap, {
    top: "-600px",
    scrollTrigger: {
      trigger: "#email-section",
      start: "top top",
      end: "+=2000",
      scrub: true,
      //markers: true,
      pin: true,
      anticipatePin: 1,
      onLeave: () => {
        const $textArea = $mailFormWrap.querySelector("textarea");
        $textArea.style.pointerEvents = "all";
        if ($textArea.value.trim().length === 0) {
          $textArea.value = "";
        }
        $sendBtn.classList.add("active");
      },
    },
  });
  isMobileAtHistory = false;
}

function textAni($section) {
  const ani = gsap.timeline();
  const $title = $section.querySelector("h4");
  const $$gauge = $section.querySelectorAll(".gauge");
  const $$description = $section.querySelectorAll(".text-wrap");

  const textAnimation = ani
    .from($title, { duration: 0.3, y: 50, autoAlpha: 0, fontSize: 36 })
    .from($$description, { duration: 0.3, y: 50, autoAlpha: 0, stagger: 0.1 });

  const scrollAnimation = ScrollTrigger.create({
    animation: ani,
    trigger: $section,
    start: "top top",
    end: "+=2000",
    pin: true,
    anticipatePin: 1,
    pinSpacing: false,
    //markers: true,
    toggleActions: "play none reverse none",
    onEnter: () => {
      if ($$gauge.length !== 0) {
        $$gauge.forEach(($gauge) => {
          $gauge.classList.add("ani");
        });
      }
    },
  });

  textAnimations.push(new TextAnimation(textAnimation, scrollAnimation));
}
