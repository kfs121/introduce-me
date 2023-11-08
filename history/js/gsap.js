const $title = document.querySelector("#history-wrap h3.title");
const $selfie = document.querySelector(".cover-letter .inner .left");

gsap.from($title, {
  filter: "blur(30px)",
  scrollTrigger: {
    trigger: "#history-wrap .title-section",
    start: "top top",
    end: "+=2000",
    scrub: true,
    markers: true,
    pin: true,
    anticipatePin: 1,
  },
});

gsap.to($selfie, {
  scrollTrigger: {
    trigger: $selfie,
    start: "-=80",
    end: "+=10000",
    pin: true,
    anticipatePin: 1,
    markers: true,
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


const $technique = document.querySelector("#technique");
const $techniqueTitle = document.querySelector("#technique h4");
const $techniqueWords = document.querySelectorAll("#technique .text-wrap");

textAni($technique, $techniqueTitle, $techniqueWords);




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
    markers: true,
    toggleActions: "play none reverse none",
  });
}
