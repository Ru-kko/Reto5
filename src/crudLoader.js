const clientUrl = 'https://g369d88cd72d64e-db202109232115.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client';
const farmsUrl = 'https://g369d88cd72d64e-db202109232115.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/farm/farm';
const messagesUrl = 'https://g369d88cd72d64e-db202109232115.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message';

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
                    '<td class="edit"><a class="btn btn-secondary btn-sm btn-edit-user">edit</a></td></tr>';
                $('#userRows').append(row);
            }
            $('td a.btn-edit-user').click(editUser);
            $('.btn-add-user').click(() => {
                $.get({
                    url: './componets/usersEditor.html',
                    success: (res) => {
                        $('#usersTable').css('display', 'none');
                        abileHeader = false;
                        $(document.body).append(res);

                        $('#idInput').remove();
                        $('#uploadUser').remove();
                        $('#removeUser').remove();

                        $('#addUser').css('display', 'block');

                        $('#addUser').click(() => {
                            var inputs = [
                                $('#inputs div #ageInput').val(),
                                $('#inputs div #nameInput').val(),
                                $('#inputs div #emailInput').val()
                            ];
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
                                .done(() => {
                                    $('.tableRow').remove();
                                    buildUsersTable();
                                })
                                .fail(() => {
                                    alert('An unexpected error')
                                })
                                .always(() => {
                                    abileHeader = true;
                                    $('#inputContainer').remove();
                                    $('#usersTable').css('display', 'block');
                                });
                        });
                    }
                })
            })
        }
    })
}
function editUser() {
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
            $('#usersTable').css('display', 'none');
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
                        abileHeader = true;
                        $('#inputContainer').remove();
                        $('#usersTable').css('display', 'block');
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
                        abileHeader = true;
                        $('#inputContainer').remove();
                        $('#usersTable').css('display', 'block');
                    });
            })
        }
    })
}

function buildFarmsTable() {
    $.ajax({
        type: 'GET',
        url: farmsUrl,
        success: (res) => {
            for (var i = 0; i < res.items.length; i++) {
                const row = `<tr class="tableRow">` +
                    `<th scope="row" class="id">${res.items[i].id}</th>` +
                    `<th scope="row" class="name">${res.items[i].name}</th>` +
                    `<th scope="row" class="address">${res.items[i].address}</th>` +
                    `<th scope="row" class="exension">${res.items[i].exension}</th>` +
                    `<th scope="row" class="category">${res.items[i].category_id}</th>` +
                    '<td class="edit"><a class="btn btn-secondary btn-sm btn-edit-farm">edit</a></td></tr>';
                $('#farmsRows').append(row);
            }
            $('td a.btn-edit-farm').click(editFarm);
            $('.btn-add-farm').click(() => {
                $.get({
                    url: './componets/farmsEditor.html',
                    success: (res) => {
                        $('#farmsTable').css('display', 'none');
                        abileHeader = false;
                        $(document.body).append(res);

                        $('#idInput').remove();
                        $('#uploadFram').remove();
                        $('#removeFram').remove();

                        $('#addFarm').css('display', 'block');

                        $('#addFarm').click(() => {
                            var inputs = [
                                $('#inputs div #nameInput').val(),
                                $('#inputs div #addressInput').val(),
                                $('#inputs div #exensionInput').val(),
                                $('#inputs div #categoryInput').val()
                            ];
                            $.ajax({
                                url: farmsUrl,
                                type: 'POST',
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    "name": inputs[0],
                                    "address": inputs[1],
                                    "exension": parseInt(inputs[2]),
                                    "category_id": parseInt(inputs[3])
                                })
                            })
                                .done(() => {
                                    $('.tableRow').remove();
                                    buildFarmsTable();
                                })
                                .fail(() => {
                                    alert('An unexpected error')
                                })
                                .always(() => {
                                    abileHeader = true;
                                    $('#inputContainer').remove();
                                    $('#farmsTable').css('display', 'block');
                                });
                        });
                    }
                })
            })
        }
    });
}

function editFarm() {
    const parent = $(this).parent().parent();
    var options = [
        parent.find('th.id'),
        parent.find('th.name'),
        parent.find('th.address'),
        parent.find('th.exension'),
        parent.find('th.category')
    ];
    $.get({
        url: './componets/farmsEditor.html',
        success: (res) => {
            $('#farmsTable').css('display', 'none');
            abileHeader = false;
            $(document.body).append(res);

            var inputs = [
                $('#inputs div #idInput'),
                $('#inputs div #nameInput'),
                $('#inputs div #addressInput'),
                $('#inputs div #exensionInput'),
                $('#inputs div #categoryInput')
            ];

            for (let i = 0; i < inputs.length; i++) {
                inputs[i].val(options[i].text());
            };
            $('#uploadFram').click(() => {
                var newInf = {
                    "id": parseInt(inputs[0].val()),
                    "name": inputs[1].val(),
                    "address": inputs[2].val(),
                    "exension": parseInt(inputs[3].val()),
                    "category_id": parseInt(inputs[4].val())
                };
                $.ajax({
                    url: farmsUrl,
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
                        abileHeader = true;
                        $('#inputContainer').remove();
                        $('#farmsTable').css('display', 'block');
                    });
            });
            $('#removeFram').click(() => {
                $.ajax({
                    url: farmsUrl,
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
                        abileHeader = true;
                        $('#inputContainer').remove();
                        $('#farmsTable').css('display', 'block');
                    });
            });
        }
    })
}

function buildMessagesTable() {
    $.ajax({
        type: 'GET',
        url: messagesUrl,
        success: (res) => {
            for (var i = 0; i < res.items.length; i++) {
                const row = `<tr class="tableRow">` +
                    `<th scope="row" class="id">${res.items[i].id}</th>` +
                    `<th scope="row" class="message">${res.items[i].messagetext}</th>` +
                    '<td class="edit"><a class="btn btn-secondary btn-sm btn-edit-message">edit</a></td></tr>';
                $('#messagesRows').append(row);
            }
            $('td a.btn-edit-message').click(editMessage);
            $('.btn-add-message').click(() => {
                $.get({
                    url: './componets/messagesEditor.html',
                    success: (res) => {
                        $('#messagesTable').css('display', 'none');
                        abileHeader = false;
                        $(document.body).append(res);

                        $('#idInput').remove();
                        $('#uploadMessage').remove();
                        $('#removeMessage').remove();

                        $('#addMessage').css('display', 'block');

                        $('#addMessage').click(() => {
                            var inputs = [
                                $('#inputs div #textInput').val(),
                            ];
                            $.ajax({
                                url: messagesUrl,
                                type: 'POST',
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    "messagetext": inputs[0],
                                })
                            })
                                .done(() => {
                                    $('.tableRow').remove();
                                    buildMessagesTable();
                                })
                                .fail(() => {
                                    alert('An unexpected error')
                                })
                                .always(() => {
                                    abileHeader = true;
                                    $('#inputContainer').remove();
                                    $('#messagesTable').css('display', 'block');
                                });
                        });
                    }
                })
            })
        }
    });
}
function editMessage(){
    const parent = $(this).parent().parent();
    var options = [
        parent.find('th.id'),
        parent.find('th.message')
    ];
    $.get({
        url: './componets/messagesEditor.html',
        success: (res) => {
            $('#messagesTable').css('display', 'none');
            abileHeader = false;
            
            $(document.body).append(res);

            var inputs = [
                $('#inputs div #idInput'),
                $('#inputs div #textInput')
            ];

            for (let i = 0; i < inputs.length; i++) {
                inputs[i].val(options[i].text());
            };
            $('#uploadMessage').click(() => {
                var newInf = {
                    "id": parseInt(inputs[0].val()),
                    "messagetext": inputs[1].val()
                };
                console.log(newInf);
                $.ajax({
                    url: messagesUrl,
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
                        abileHeader = true;
                        $('#inputContainer').remove();
                        $('#messagesTable').css('display', 'block');
                    });
            });
            $('#removeMessage').click(() => {
                $.ajax({
                    url: farmsUrl,
                    type: 'DELETE',
                    contentType: 'application/json',
                    data: JSON.stringify({ "id": parseInt(inputs[0].val())})
                })
                    .done(() => {
                        parent.remove();
                    })
                    .fail(() => {
                        alert('An unexpected error');
                    })
                    .always(() => {
                        abileHeader = true;
                        $('#inputContainer').remove();
                        $('#messagesTable').css('display', 'block');
                    })
            })
        }
    })
}