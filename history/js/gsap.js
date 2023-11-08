const $title = document.querySelector("#history-wrap h3.title");
const $selfie = document.querySelector(".cover-letter .inner .left");
const $$textSections = document.querySelectorAll(".text-section");
gsap.from($title, {
  filter: "blur(30px)",
  scrollTrigger: {
    trigger: "#history-wrap .title-section",
    start: "top top",
    end: "+=2000",
    scrub: true,
    //markers: true,
    pin: true,
    anticipatePin: 1,
  },
});

gsap.to($selfie, {
  scrollTrigger: {
    trigger: $selfie,
    start: "-=80",
    end: `+=${$$textSections.length*2000*2}`,
    pin: true,
    anticipatePin: 1,
    //markers: true,
  },
});

const $history = document.querySelector("#history");
const $historyTitle = document.querySelector("#history h4");
const $historyWords = document.querySelectorAll("#history .text-wrap");

textAni($history, $historyTitle, $historyWords);


const $etc = document.querySelector("#etc");
const $etcTitle = document.querySelector("#etc h4");
const $etcWords = document.querySelectorAll("#etc .text-wrap");

textAni($etc, $etcTitle, $etcWords);


const $techniqueFront = document.querySelector("#technique-front");
const $techniqueFrontTitle = document.querySelector("#technique-front h4");
const $techniqueFrontWords = document.querySelectorAll("#technique-front .text-wrap");

textAni($techniqueFront, $techniqueFrontTitle, $techniqueFrontWords);


const $techniqueBackend = document.querySelector("#technique-backend");
const $techniqueBackendTitle = document.querySelector("#technique-backend h4");
const $techniqueBackendWords = document.querySelectorAll("#technique-backend .text-wrap");

textAni($techniqueBackend, $techniqueBackendTitle, $techniqueBackendWords);


const $techniqueEtc = document.querySelector("#technique-etc");
const $techniqueEtcTitle = document.querySelector("#technique-etc h4");
const $techniqueEtcWords = document.querySelectorAll("#technique-etc .text-wrap");

textAni($techniqueEtc, $techniqueEtcTitle, $techniqueEtcWords);




function textAni($section, $title, $description) {
  const ani = gsap.timeline();
  ani.from($title, { duration: 0.3, y: 50, autoAlpha: 0 })
    .from($description, { duration: 0.3, y: 50, autoAlpha: 0,stagger:0.1 });
  ScrollTrigger.create({
    animation: ani,
    trigger: $section,
    start: "-=100",
    end: "+=2000",
    pin: true,
    anticipatePin: 1,
    pinSpacing: false,
    //markers: true,
    toggleActions: "play none reverse none",
  });
}
