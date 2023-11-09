const $title = document.querySelector("#history-wrap h3.title");
const $selfie = document.querySelector(".cover-letter .inner .left");
const $$textSections = document.querySelectorAll(".text-section");

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
    start: "-=80",
    end: `+=${$$textSections.length*2000*2}`,
    pin: true,
    anticipatePin: 1,
    //markers: true,
  },
});

$$textSections.forEach($textSection=>{
  textAni($textSection);
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
