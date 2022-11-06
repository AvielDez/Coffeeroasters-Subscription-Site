
//General Event Listener
document.addEventListener('click', (event)=>{
    //For Mobile Hamburger Menu
    if(event.target.id === 'nav-dropdown'){
      handleDropdownMenu()
    }
})


function handleDropdownMenu(){
    document.getElementById('nav-links').classList.toggle('hidden')
    if (!document.getElementById('nav-links').classList.contains("hidden")) {
        // Disable scroll
        document.body.style.overflow = "hidden";
    } else {
        // Enable scroll
        document.body.style.overflow = "auto";
    }

    document.getElementById('nav-dropdown').classList.toggle('nav-dropdown-opened')
}
