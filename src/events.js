// page component functionalities
$(window).scroll(() => {
    if($(window).scrollTop() >= $('#navbar').height()){
        $('#navbar').addClass('fixed-top');
    }else{
        $('#navbar').remove('fixed-top');
    }
});