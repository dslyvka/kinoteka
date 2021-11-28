const refs = {
  header: document.querySelector('.header-js'),
  formSearch: document.querySelector('.form-js'),
  navLibrary: document.querySelector('.nav-library-js'),
  logoBtn: document.querySelector('.js-button__logo'),
  homeBtn: document.querySelector('.js-button__home'),
  myLibraryBtn: document.querySelector('.js-button__myLibrary'),
  watchedBtn: document.querySelector('.js-button-watched'),
};

function toggleClass(refsRemove, refsAdd, classHiden) {
  refsRemove.classList.remove(classHiden);
  refsAdd.classList.add(classHiden)
}
refs.homeBtn.addEventListener('click', onHomeBtnClick);
refs.myLibraryBtn.addEventListener('click', onMyLibraryBtnClick);

function onHomeBtnClick() {
  toggleClass(refs.formSearch, refs.navLibrary, 'visually-hidden');
  toggleClass(refs.myLibraryBtn, refs.homeBtn, 'current-page');
  refs.header.classList.remove('header__myLibrary');
  refs.header.classList.add('header__bg-home')

}

function onMyLibraryBtnClick() {
  toggleClass(refs.navLibrary, refs.formSearch, 'visually-hidden');
  toggleClass(refs.homeBtn, refs.myLibraryBtn, 'current-page');
  refs.header.classList.add('header__myLibrary');
  refs.header.classList.remove('header__bg-home');
  // refs.watchedBtn.classList.add('button__current');
}