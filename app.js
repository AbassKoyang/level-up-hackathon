const menuControl = document.querySelector('#menu-control');

const showMenu = 
menuControl.addEventListener('click', () => {
    const isExpanded = menuControl.attributes['aria-expanded'].value === true;
    const menu = document.querySelector('#menu');

    menu.classList.toggle('menu-active');

    if (isExpanded) {
        menuControl.ariaExpanded = false;
    } else {
        menuControl.ariaExpanded = true;
    }
    console.log(isExpanded)
});


  