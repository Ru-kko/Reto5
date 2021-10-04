function buildUsersTable(){
    $.ajax({
        type: 'GET',
        url: 'https://g369d88cd72d64e-db202109232115.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
        success: (res) => {
            console.log(res);

            for (var i = 0; i < res.items.length; i++) {
                const row = '<tr class="tableRow">' +
                    `<th scope="row" class="id">${res.items[i].id}</th>`  +
                    `<th class="name">${res.items[i].name}</th>` + 
                    `<th class="email">${res.items[i].email}</th>` +
                    `<th class="age">${res.items[i].age}</th>` +
                    '<td class="edit"><a class="btn btn-secondary btn-sm">edit</a></td>';
                $('#userRows').append(row);
            }
        }
    })
}