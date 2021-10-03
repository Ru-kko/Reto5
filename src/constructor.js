let actualPage = null;
let pageBuilders = new Map();


$(document).ready(() => {
    pageBuilders.set('homePage', undefined);
    pageBuilders.set('usersTeble', () => buildUsersTable());
    // pageBuilders.set('farmsTeble', buildFarmsTable());

    changePage('homePage');
    $.get({
        url: "./componets/header.html",
        success: (res) => $(document.body).prepend(res)
    });
});

function changePage(newPage) {
    if (newPage == actualPage) return;
    $(`#${actualPage}`).remove();
    $.get({
        url: `./componets/${newPage}.html`,
        success: (res) => $(document.body).append(res)
    })
    actualPage = newPage;
    if (newPage == 'homePage') return;
    pageBuilders.get(newPage)();
};