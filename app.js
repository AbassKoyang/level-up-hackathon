// Global variables
const menuControl = document.querySelector('#menu-control');
const menu = document.querySelector('#menu');
const allMenuItems = menu.querySelectorAll('[role="menuitem"]');

// Menu Toggle
const showMenu = () => {
    menuControl.setAttribute('aria-expanded', 'true');
    allMenuItems.item(0).focus()
}
const hideMenu = () => {
    menuControl.setAttribute('aria-expanded', 'false');
    menuControl.focus()
}
const toggleMenu = () => {
    const isExpanded = menuControl.getAttribute('aria-expanded') === "true";
    menu.classList.toggle('menu-active');

    if (isExpanded) {
        hideMenu();
    } else {
        showMenu();
    }
}
menuControl.addEventListener('click', toggleMenu);


// Keyboard Navigation
const handleMenuEscapeKeyPress = (e) =>{
    if (e.key === 'Escape') {
        toggleMenu();
    }
}
menu.addEventListener('keyup', handleMenuEscapeKeyPress);

const handleMenuItemArrowKeyPress = (event, menuItemIndex) => {
    const isLastMenuItem = menuItemIndex === allMenuItems.length - 1;
    const isFirstMenuItem = menuItemIndex === 0;
    const nextMenuItem = menuItemIndex + 1;
    const previousMenuItem = menuItemIndex - 1;

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        if (isLastMenuItem) {
            allMenuItems.item(0).focus()
            return;
        }
        allMenuItems.item(nextMenuItem).focus();
    }
    
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        if (isFirstMenuItem) {
            allMenuItems.item(allMenuItems.length - 1).focus()
            return;
        }
        allMenuItems.item(previousMenuItem).focus();
    }
}
allMenuItems.forEach((menuItem, menuItemIndex) =>{
    menuItem.addEventListener('keyup', (event)=>{handleMenuItemArrowKeyPress(event, menuItemIndex)})
})

