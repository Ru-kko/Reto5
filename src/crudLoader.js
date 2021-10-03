function buildUsersTable(){
    $.ajax({
        type: 'GET',
        url: 'https://g369d88cd72d64e-db202109232115.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/farm/farm',
        success: (res) => {
            console.log(res.items);
        }
    })
}