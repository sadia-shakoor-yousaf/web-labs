document.addEventListener('DOMContentLoaded', function() {
    const megaMenuTrigger = document.querySelector('.mega-menu-trigger > a');
    const megaMenu = document.querySelector('.mega-menu');

    megaMenuTrigger.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        megaMenu.classList.toggle('active');
    });

    document.addEventListener('click', function(e){
            megaMenu.classList.remove('active');
        
    });

    megaMenu.addEventListener('click', function(e){
            megaMenu.classList.remove('active');
        
    });

    console.log('Script loaded');
    console.log('Mega menu trigger:', megaMenuTrigger);
    console.log('Mega menu element:', megaMenu);
});

