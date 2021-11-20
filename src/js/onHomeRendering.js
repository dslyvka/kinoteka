const refs = {
    logoBtn: document.querySelector('.js-button__logo'),
    homeBtn: document.querySelector('.js-button__home'),
};

refs.logoBtn.addEventListener('click', toReloadPage);
refs.homeBtn.addEventListener('click', toReloadPage);

function toReloadPage() {
    window.location.reload();
}
