const goTopBtn = document.querySelector('.back_to_top');
const openFooterModal = document.querySelector('[data-modal-open]');
const closeFooterModal = document.querySelector('[data-modal-close]');
const footerModal = document.querySelector('.backdrop_footer');
const cardMovie = document.querySelector('.collection');

window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);
openFooterModal.addEventListener('click', hideUpBtn);
closeFooterModal.addEventListener('click', showUpBtn);
cardMovie.addEventListener('click', hideUpBtn);

function trackScroll() {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      showUpBtn()
    }
    if (scrolled < coords) {
      hideUpBtn();
    }
  }

  function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      setTimeout(backToTop, 0);
    }
  }

 function hideUpBtn(){
   goTopBtn.classList.remove('back_to_top-show');
 }
function showUpBtn(){
   goTopBtn.classList.add('back_to_top-show');
 }