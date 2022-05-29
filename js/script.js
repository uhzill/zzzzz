document.cookie = "safeCookie1=foo; SameSite=Lax"; 
document.cookie = "safeCookie2=foo";  
document.cookie = "crossCookie=bar; SameSite=None; Secure";

gsap.registerPlugin(ScrollTrigger);
const pageContainer = document.querySelector(".container");



/* 부드러운 스크롤 */
const scroller = new LocomotiveScroll({
  el: pageContainer,
  smooth: true
});

scroller.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(pageContainer, {
  scrollTop(value) {
    return arguments.length
      ? scroller.scrollTo(value, 0, 0)
      : scroller.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  pinType: pageContainer.style.transform ? "transform" : "fixed"
});


window.addEventListener("load", function () {
  let pinBoxes = document.querySelectorAll(".pin-wrap > *");
  let pinWrap = document.querySelector(".pin-wrap");
  let pinWrapWidth = pinWrap.offsetWidth;
  let horizontalScrollLength = pinWrapWidth - window.innerWidth;


  // 고정 및 수평 스크롤

  gsap.to(".pin-wrap", {
    scrollTrigger: {
      trigger: "#sectionPin",
      scroller: pageContainer, //locomotive-scroll
      scrub: true, // 부드러운 스크러빙(scrub: 1스크롤바 잡는데 1초 걸림ㅁ)
      pin: true, // 활성 상태에서 트리거 요소 고정
      start: "top top",
      endTrigger : "#video"
      // end: "+=3000" // 시작 부분에서 3000px 까지 스크롤 한 후 종료
      // end: pinWrapWidth
    },
    x: -horizontalScrollLength,
    ease: "none"
  });

  ScrollTrigger.addEventListener("refresh", () => scroller.update()); //locomotive-scroll

  ScrollTrigger.refresh();
});



// 마우스 커서
window.onload = function(){
  let mouseCursor = document.querySelector(".cursor");// 마우스커서

  // 마우스 움직이기
  // window 객체에 scroll & mouse 이벤트를 추가하고 cursor함수 실행되도록 함
  window.addEventListener("scroll", myCursor);
  window.addEventListener("mousemove", myCursor);

  //커스텀 커서의 left값과 top값을 커서의 XY좌표값과 일치시킴
  function myCursor(e) {
    mouseCursor.style.left = e.pageX + "px";
    mouseCursor.style.top = e.pageY - scrollY + "px";
  }
}