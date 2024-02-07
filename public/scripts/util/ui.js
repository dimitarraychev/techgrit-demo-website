export function showUserMenu(e) {

    const menu = document.querySelector('.menu-items');
    const isClickOnMenu = e.target.classList.contains('open-menu') || e.target.classList.contains('.user-menu');

    if (isClickOnMenu && menu.style.display == 'none' || isClickOnMenu && menu.style.display == '') {
        menu.style.display = 'flex';
    } else {
        menu.style.display = 'none';
    }
}