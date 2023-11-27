// Global variables
//Global variables for menu
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

//Global variables for notification
const notificationTrigger = document.querySelector('.notification-button');
const notificationCon = document.querySelector('#notification-con');
const notification = document.querySelector('.notification');

// Notification Toggle
const showNotification = () => {
    notificationTrigger.setAttribute('aria-expanded', 'true');
    notification.focus();
}
const hideNotification = () => {
    notificationTrigger.setAttribute('aria-expanded', 'false');
    notificationTrigger.focus();
}
const toggleNotification = () => {
    const isExpanded = notificationTrigger.getAttribute('aria-expanded') === "true";
    notificationCon.classList.toggle('notification-con-active');

    if (isExpanded) {
        hideNotification();
    } else {
        showNotification();
    }
}
notificationTrigger.addEventListener('click', toggleNotification);
// Keyboard Navigation
const handleNotificationEscapeKeyPress = (e) =>{
    if (e.key === 'Escape') {
        toggleNotification()
    }
}
notificationCon.addEventListener('keyup', handleNotificationEscapeKeyPress);


// Dashboard Global variables
const dashboardNotification = document.querySelector('.dashboard-notification');
const cancelButton = document.querySelector('.cancel-button');

const closeDashboardNotification = () => {
    dashboardNotification.style.display = 'none';
}
cancelButton.addEventListener('click', closeDashboardNotification)


// SetUp variables
document.addEventListener('DOMContentLoaded', () => {
const step = document.querySelectorAll('.step');
const CheckBoxes = document.querySelectorAll('#check-box')
const NotCompletedIcon = document.querySelectorAll('#not-completed-icon');
const LoadingSpinner = document.querySelectorAll('#loading-spinner');
const CompletedIcon = document.querySelectorAll('#completed-icon');
const description = document.querySelectorAll('#description');
const learnMore = document.querySelectorAll('#learn-more');
const label = document.querySelectorAll('#label');
const image = document.querySelectorAll('#image');
const MARK_AS_DONE = 'mark-as-done';
const progressbar = document.querySelector('#progress');
const progress_count = document.querySelector('#progress-count');
let progress = 0;
let progressCount = 0;
const arrow = document.querySelector('#arrowdown-button');
const arrowDown = document.querySelector('#arrowdown-icon');
const arrowUp = document.querySelector('#arrowup-icon');
const Aria_live = document.querySelector('#aria-live');



const openOrCloseSetUP = () => {
    const isFirstStepHidden = step[0].classList.contains('active');
        step.forEach((step) => {
        step.classList.toggle('active');
        });
    if (!isFirstStepHidden) {
        arrowDown.classList.add('hidden');
        arrowUp.classList.remove('hidden');
    } else {
        arrowDown.classList.remove('hidden');
        arrowUp.classList.add('hidden');
    }
}
arrow.addEventListener('click', openOrCloseSetUP);

// Toggle each steps

CheckBoxes.forEach((checkbox, index) => {
    const handleMarkAsDone = () => {
        Aria_live.ariaLabel = 'Marking as done, please wait.'
        NotCompletedIcon[index].classList.add('hidden');
        LoadingSpinner[index].classList.remove('hidden');
        setTimeout(() => {
            LoadingSpinner[index].classList.add('hidden');
            CompletedIcon[index].classList.remove('hidden');
            CheckBoxes[index].ariaLabel = CheckBoxes[index].ariaLabel.replace('as done', 'as not done');
        }, 2000);
        CheckBoxes[index].classList.add(MARK_AS_DONE);
        description[index].classList.remove('hidden');
        label[index].classList.remove('hidden');
        learnMore[index].classList.remove('hidden');
        image[index].classList.remove('hidden');
        Aria_live.ariaLabel = 'Succesfully marked as done.'
    }
    const handleMarkAsNotDone = () => {
        Aria_live.ariaLabel = 'Marking as not done, please wait.'
        CompletedIcon[index].classList.add('hidden');
        LoadingSpinner[index].classList.remove('hidden');
        setTimeout(() => {
            LoadingSpinner[index].classList.add('hidden');
            NotCompletedIcon[index].classList.remove('hidden');
            CheckBoxes[index].ariaLabel = CheckBoxes[index].ariaLabel.replace('as not done', 'as done');
        }, 2000);
        CheckBoxes[index].classList.remove(MARK_AS_DONE)
        description[index].classList.add('hidden');
        label[index].classList.add('hidden');
        learnMore[index].classList.add('hidden');
        image[index].classList.add('hidden');
        Aria_live.ariaLabel = 'Succesfully marked as not done.'
    }
    
    const handleMarkAsDoneOrNotDone = () => {
        const MarkAsDone = CheckBoxes[index].classList.contains(MARK_AS_DONE);
        if (!MarkAsDone) {
            handleMarkAsDone()
            progress += 20;
            progressCount += 1;
        }else{
            handleMarkAsNotDone()
            progress -= 20;
            progressCount -= 1;
        }
    }
    checkbox.addEventListener('click', () => {
        handleMarkAsDoneOrNotDone();
        progressbar.style.width = progress + '%';
        progress_count.innerHTML = progressCount;
    })
})
})