const clientUrl = 'https://g369d88cd72d64e-db202109232115.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client';

function buildUsersTable() {
    $.ajax({
        type: 'GET',
        url: clientUrl,
        success: (res) => {
            for (var i = 0; i < res.items.length; i++) {
                const row = '<tr class="tableRow">' +
                    `<th scope="row" class="id">${res.items[i].id}</th>` +
                    `<th class="name">${res.items[i].name}</th>` +
                    `<th class="email">${res.items[i].email}</th>` +
                    `<th class="age">${res.items[i].age}</th>` +
                    '<td class="edit"><a class="btn btn-secondary btn-sm btn-edit">edit</a></td></tr>';
                $('#userRows').append(row);
            }
            $('td a.btn-edit').click(edit);
            $('.btn-add-user').click(() => {
                $.get({
                    url: './componets/usersEditor.html',
                    success: (res) => {
                        $('#usersTeble').css('display', 'none');
                        abileHeader = false;
                        $(document.body).append(res);

                        $('#idInput').remove();
                        $('#uploadUser').remove();
                        $('#removeUser').remove();

                        const newButtom = '<a href="#" class="btn btn-secondary" id="addUser">Add</a>'
                        $('#userController').append(newButtom)
                        
                        var inputs = [
                            $('#inputs div #ageInput').val(),
                            $('#inputs div #nameInput').val(),
                            $('#inputs div #emailInput').val()
                        ];

                        $('#addUser').click(()=>{
                            $.ajax({
                                url: clientUrl,
                                type: 'POST',
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    "name": inputs[1],
                                    "email": inputs[2],
                                    "age": inputs[0]
                                })
                            })
                                .done(()=>{
                                    $('.tableRow').remove();
                                    buildUsersTable();
                                })
                                .fail(() => {
                                    alert('An unexpected error')
                                })
                                .always(()=>{
                                    $('#inputContainer').remove();
                                    $('#usersTeble').css('display', 'block');
                                });
                        });
                    }
                })
            })
        }
    })
}

function edit() {
    const parent = $(this).parent().parent();
    var options = [
        parent.find('th.id'),
        parent.find('th.age'),
        parent.find('th.name'),
        parent.find('th.email'),
    ];
    $.get({
        url: './componets/usersEditor.html',
        success: (res) => {
            $('#usersTeble').css('display', 'none');
            abileHeader = false;
            $(document.body).append(res);

            var inputs = [
                $('#inputs div #idInput'),
                $('#inputs div #ageInput'),
                $('#inputs div #nameInput'),
                $('#inputs div #emailInput')
            ];

            for (let i = 0; i < inputs.length; i++) {
                inputs[i].val(options[i].text());
            }

            $('#uploadUser').click(() => {
                var newInf = {
                    "id": parseInt(inputs[0].val()),
                    "name": inputs[2].val(),
                    "email": inputs[3].val(),
                    "age": parseInt(inputs[1].val())
                };
                $.ajax({
                    url: clientUrl,
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(newInf)
                })
                    .done(() => {
                        for (let i = 0; i < inputs.length; i++) {
                            options[i].text(inputs[i].val());
                        };
                    })
                    .fail(() => {
                        alert('An unexpected error')
                    })
                    .always(() => {
                        $('#inputContainer').remove();
                        $('#usersTeble').css('display', 'block');
                    });
            });
            $('#removeUser').click(() => {
                $.ajax({
                    url: clientUrl,
                    type: 'DELETE',
                    contentType: 'application/json',
                    data: JSON.stringify({ "id": parseInt(inputs[0].val()) })
                })
                    .done(() => {
                        parent.remove();
                    })
                    .fail(() => {
                        alert('An unexpected error')
                    })
                    .always(() => {
                        $('#inputContainer').remove();
                        $('#usersTeble').css('display', 'block');
                    });
            })
        }
    })
}