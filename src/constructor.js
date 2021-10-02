function importContent(res){
    console.log(res);
    $(document.body).append(res);
};

$(document).ready(()=>{
    $.get({
        url: "./componets/header.html", 
        success: (res) => importContent(res)
    });
    $.get({
        url: "./componets/homePage.html", 
        success: (res) => importContent(res)
    });
});