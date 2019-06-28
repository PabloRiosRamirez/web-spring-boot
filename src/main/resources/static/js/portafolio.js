
//<editor-fold defaultstate="collapsed" desc="UTIL">
$('#btn-api_rest').click(function () {
    dtbl_update_ajax();
    dtbl_delete_ajax();
    $('#cont-portfolio').css('opacity', '0');
    setTimeout(
            function ()
            {
                $('#cont-portfolio').addClass('d-none');
                $('#cont-api_rest').removeClass('d-none');
                $('#cont-api_rest').css('opacity', '1');
                AOS.init();
            }, 600);     
});
$('.toggle-api_rest').click(function () {
    $('#cont-api_rest').css('opacity', '0');
    setTimeout(
            function ()
            {
                $('#cont-api_rest').addClass('d-none');
                $('#cont-portfolio').removeClass('d-none');
                $('#cont-portfolio').css('opacity', '1');
                AOS.init();
            }, 600);
});


const toast = swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 4000
});
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="GET">


var t_get = $('#dtbl-get').DataTable({
    "columns": [
        {
            "data": "name",
            "render": function (data, type, row) {
                return data.toUpperCase();
            }
        },
        {
            "data": "lastName",
            "render": function (data, type, row) {
                return data.toUpperCase();
            }
        }
    ],
    "language": {
        "url": "/vendor/DataTables/1.10.16/language_file/Spanish.json"
    },
    //Se renderiza miestras se pagina (Es para fuente de datos grandes)
    "deferRender": true,
    stateSave: true,
    "info": false,
//    "paging": false,
    "ordering": false,
    "searching": false
});
$('#all-btn').click(function () {
    ajax_get(1);
});
$('#by_name-btn').click(function () {
    if ($('#by_name-inp1').val()) {
        $('#by_name-inp1').removeClass('is-invalid');
        ajax_get(2);
    } else {
        $('#by_name-inp1').addClass('is-invalid');
    }
});
$('#by_lastname-btn').click(function () {
    if ($('#by_lastname-inp1').val()) {
        $('#by_lastname-inp1').removeClass('is-invalid');
        ajax_get(3);
    } else {
        $('#by_lastname-inp1').addClass('is-invalid');
    }
});
$('#by_name_lastname-btn').click(function () {
    if ($('#by_name_lastname-inp1').val()
            && $('#by_name_lastname-inp2').val()) {
        $('#by_name_lastname-inp1').removeClass('is-invalid');
        $('#by_name_lastname-inp2').removeClass('is-invalid');
        ajax_get(4);
    } else {
        if ($('#by_name_lastname-inp1').val()) {
            $('#by_name_lastname-inp1').removeClass('is-invalid');
        } else {
            $('#by_name_lastname-inp1').addClass('is-invalid');
        }

        if ($('#by_name_lastname-inp2').val()) {
            $('#by_name_lastname-inp2').removeClass('is-invalid');
        } else {
            $('#by_name_lastname-inp2').addClass('is-invalid');
        }

    }
});
function ajax_get(item) {
    var datos = {};
    var id;
    switch (item) {
        case 2:
        {
            id = 'by_name';
            datos.name = $('#' + id + '-inp1').val().toString().toUpperCase();
            break;
        }
        case 3:
        {
            id = 'by_lastname';
            datos.lastName = $('#' + id + '-inp1').val().toString().toUpperCase();
            break;
        }
        case 4:
        {
            id = 'by_name_lastname';
            datos.name = $('#' + id + '-inp1').val().toString().toUpperCase();
            datos.lastName = $('#' + id + '-inp2').val().toString().toUpperCase();
            break;
        }

        default:
        {
            id = 'all';
            break;
        }

    }

    $.ajax({
        url: "/api_rest/v1/persons",
        data: datos,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr) {
            $('#' + id + '-btn').children('i').removeClass('d-none');
            $('#' + id + '-btn').attr('disabled', true);
            $('#codeWrapper').empty();
            $('#json-http_status').empty();
            t_get.clear().draw();
        },
        complete: function (jqXHR, textStatus) {
            $('#' + id + '-btn').children('i').addClass('d-none');
            $('#' + id + '-btn').attr('disabled', false);
        },
        success: function (data, textStatus, xhr) {
            $('#get-mdl').modal();
            var json = "{\n\n\}";
            if (xhr.status == 200) {
                t_get.rows.add(data).draw(true);
                json = JSON.stringify(data, null, '\t');
            }
            $('#get-json-http_status').html('(Status HTTP: ' + xhr.status + ' - ' + textStatus.toString().toUpperCase() + ')');
            if (Rainbow) {
                var div = document.createElement('div');
                div.innerHTML = '<pre><code data-language="json">' + json + '</code></pre>';
                Rainbow.color(div, function () {
                    document.getElementById('codeWrapper').appendChild(div);
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            swal(
                    'HTTP Status: ' + jqXHR.status + ' - ' + textStatus,
                    'Se ha presentado un error al intentar obtener la información!',
                    'error'
                    );
        }
    });
}

//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="POST">


$('#post-btn').click(function () {
    if ($('#post-inp1').val()
            && $('#post-inp2').val()) {
        $('#post-inp1').removeClass('is-invalid');
        $('#post-inp2').removeClass('is-invalid');
        ajax_post();
    } else {
        if ($('#post-inp1').val()) {
            $('#post-inp1').removeClass('is-invalid');
        } else {
            $('#post-inp1').addClass('is-invalid');
        }

        if ($('#post-inp2').val()) {
            $('#post-inp2').removeClass('is-invalid');
        } else {
            $('#post-inp2').addClass('is-invalid');
        }

    }
});
function ajax_post() {
    var dato = {};
    dato.name = $('#post-inp1').val().toString().toUpperCase();
    dato.lastName = $('#post-inp2').val().toString().toUpperCase();
    $.ajax({
        type: "POST",
        url: "/api_rest/v1/persons",
        data: JSON.stringify(dato),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr) {
            $('#post-btn').children('i').removeClass('d-none');
            $('#post-btn').attr('disabled', true);
            $('#post-header-code').empty();
            $('#post-json-http_status').empty();
        },
        complete: function () {
            $('#post-btn').children('i').addClass('d-none');
            $('#post-btn').attr('disabled', false);
        },
        success: function (data, textStatus, xhr) {
            $('#post-inp1').val('').keyup();
            $('#post-inp2').val('').keyup();
            $('#post-mdl').modal();
            $('#post-json-http_status').html('(Status HTTP: ' + xhr.status + ' - ' + textStatus.toString().toUpperCase() + ')');
            if (Rainbow) {
                var pre = document.createElement('pre');
                pre.innerHTML = '<code data-language="json">' + xhr.getAllResponseHeaders() + '</code>';
                Rainbow.color(pre, function () {
                    document.getElementById('post-header-code').appendChild(pre);
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            swal(
                    'HTTP Status: ' + jqXHR.status + ' - ' + textStatus,
                    'Se ha presentado un error al registrar a la persona!',
                    'error'
                    );
        }
    });
}

//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="PUT/PATCH">

var t_update = $('#dtbl-update').DataTable({
    "columns": [
        {
            "data": "name",
            "render": function (data, type, row) {
                return data.toUpperCase();
            }
        },
        {
            "data": "lastName",
            "render": function (data, type, row) {
                return data.toUpperCase();
            }
        }
    ],
    "language": {
        "url": "/vendor/DataTables/1.10.16/language_file/Spanish.json"
    },
    "select": {
        style: 'single'
    },
    "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
    "displayLength": 5,
    //Se renderiza miestras se pagina (Es para fuente de datos grandes)
    "deferRender": true,
//    stateSave: true,
    "info": false,
//    "paging": false,
    "ordering": false,
    "searching": true,
//    "lengthChange" : false,
});
function dtbl_update_ajax() {
    $.ajax({
        url: "/api_rest/v1/persons",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr) {
            t_update.clear().draw();
            $('#update-reload').children('i').addClass('fa-spin');
        },
        success: function (data, textStatus, xhr) {
            t_update.rows.add(data).draw(true);
            $('#update-reload').children('i').removeClass('fa-spin');
        },
        error: function (jqXHR, textStatus, errorThrown) {
//            swal(
//                    'Operacion Fallida!',
//                    'HTTP Status: ' + jqXHR.status + ' - ' + textStatus,
//                    'error'
//                    );
            toast({
                type: 'error',
                title: 'Error al obtener lista de personas: ' + jqXHR.status + ' - ' + textStatus
            });
            $('#update-reload').children('i').removeClass('fa-spin');
//            console.log(e);
        }
    });
}

$('#update-reload').click(function () {
    t_update.rows().deselect();
    dtbl_update_ajax();
});
var update_data = {};
t_update
        .on('select', function (e, dt, type, indexes) {
            if (type === 'row') {
                var data = t_update.rows(indexes).data()[0];
                $('#update-url-inp1-span').html(data.name.length >= 1 ? data.name : '{nombre}');
                $('#update-url-inp2-span').html(data.lastName.length >= 1 ? data.lastName : '{apellido}');
                $('#update-inp1').val(data.name.length >= 1 ? data.name : '').keyup();
                $('#update-inp2').val(data.lastName.length >= 1 ? data.lastName : '').keyup();
                update_data.name = data.name;
                update_data.lastName = data.lastName;
            }
        })
        .on('deselect', function (e, dt, type, indexes) {
            update_data.name = '';
            update_data.lastName = '';
            if (type === 'row') {
                $('#update-url-inp1-span').html(update_data.name.length >= 1 ? update_data.name : '{nombre}');
                $('#update-url-inp2-span').html(update_data.lastName.length >= 1 ? update_data.lastName : '{apellido}');
            }
        });

function ajax_update(old_data, data) {
    swal({
        title: '¿Quiere actualizar?',
        html:
                '<div class="col-lg-12">' +
                '<p class="align-middle">http://api.pabloriosramirez.com/v1/persons?name=<span class="font-weight-bold" style="color: #fed136">' + update_data.name + '</span>&amp;lastname=<span class="font-weight-bold" style="color: #fed136">' + update_data.lastName + '</span></p>' +
                '</div>',
        text: "Esta operación no puede ser revertida!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#fed136',
        cancelButtonColor: '#bdbdbd',
        confirmButtonText: 'Si, actualizalo!'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "PATCH",
                url: "/api_rest/v1/persons?name=" + old_data.name + "&lastname=" + old_data.lastName,
                data: JSON.stringify(data),
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: function (data, textStatus, xhr) {
                    t_update.rows().deselect();
                    dtbl_update_ajax();
                    $('#update-inp1').val('').keyup();
                    $('#update-inp2').val('').keyup();
                    swal({
                        title: 'HTTP Status: ' + xhr.status + ' - ' + textStatus,
                        text: 'Persona seleccionada actualizada correctamente',
                        type: 'success'
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    swal(
                            'HTTP Status: ' + jqXHR.status + ' - ' + textStatus,
                            'Se ha presentado un error al actualizar persona!',
                            'error'
                            );
                }
            });
        }

    });
}


$('#update-btn').click(function () {
    $(this).addClass('disabled');
    $(this).attr('aria-disabled', 'true');
    if (update_data.name == undefined || update_data.lastName == undefined || update_data.name == '' || update_data.lastName == '' || update_data.name.length <= 0 || update_data.lastName <= 0) {
        swal(
                'Seleccione una persona!',
                'Por favor debe seleccionar una persona de la tabla',
                'warning'
                );
    } else {
        if ($('#update-inp1').val()
                && $('#update-inp2').val()) {
            $('#update-inp1').removeClass('is-invalid');
            $('#update-inp2').removeClass('is-invalid');
            if ($('#update-inp1').val() == update_data.name && $('#update-inp2').val() == update_data.lastName) {
                swal(
                        'Ingrese nuevos datos!',
                        'Por favor debe ingresar nuevos datos para actualizar la persona seleccionada',
                        'warning'
                        );
            } else {
                var dato = {};
                dato.name = $('#update-inp1').val().toString().toUpperCase();
                dato.lastName = $('#update-inp2').val().toString().toUpperCase();
                ajax_update(update_data, dato);
            }
        } else {
            if ($('#update-inp1').val()) {
                $('#update-inp1').removeClass('is-invalid');
            } else {
                $('#update-inp1').addClass('is-invalid');
            }

            if ($('#update-inp2').val()) {
                $('#update-inp2').removeClass('is-invalid');
            } else {
                $('#update-inp2').addClass('is-invalid');
            }
        }
    }
    $(this).removeClass('disabled');
    $(this).attr('aria-disabled', 'false');
});
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="DELETE">

var t_delete = $('#dtbl-delete').DataTable({
    "columns": [
        {
            "data": "name",
            "render": function (data, type, row) {
                return data.toUpperCase();
            }
        },
        {
            "data": "lastName",
            "render": function (data, type, row) {
                return data.toUpperCase();
            }
        }
    ],
    "language": {
        "url": "/vendor/DataTables/1.10.16/language_file/Spanish.json"
    },
    "select": {
        style: 'single'
    },
    "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
    "displayLength": 5,
    //Se renderiza miestras se pagina (Es para fuente de datos grandes)
    "deferRender": true,
//    stateSave: true,
    "info": false,
//    "paging": false,
    "ordering": false,
    "searching": true,
//    "lengthChange" : false,
});
function dtbl_delete_ajax() {
    $.ajax({
        url: "/api_rest/v1/persons",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr) {
            t_delete.clear().draw();
            $('#delete-reload').children('i').addClass('fa-spin');
        },
        success: function (data, textStatus, xhr) {
            t_delete.rows.add(data).draw(true);
            $('#delete-reload').children('i').removeClass('fa-spin');
        },
        error: function (jqXHR, textStatus, errorThrown) {
//            swal(
//                    'Operacion Fallida!',
//                    'HTTP Status: ' + jqXHR.status + ' - ' + textStatus,
//                    'error'
//                    );
            toast({
                type: 'error',
                title: 'Error al obtener lista de personas: ' + jqXHR.status + ' - ' + textStatus
            });
            $('#delete-reload').children('i').removeClass('fa-spin');
//            console.log(e);
        }
    });
}

$('#delete-reload').click(function () {
    dtbl_delete_ajax();
});
var delete_data = {};
t_delete
        .on('select', function (e, dt, type, indexes) {
            if (type === 'row') {
                var data = t_delete.rows(indexes).data()[0];
                $('#delete-inp1-span').html(data.name.length >= 1 ? data.name : '{nombre}');
                $('#delete-inp2-span').html(data.lastName.length >= 1 ? data.lastName : '{apellido}');
                delete_data.name = data.name;
                delete_data.lastName = data.lastName;
            }
        })
        .on('deselect', function (e, dt, type, indexes) {
            delete_data.name = '';
            delete_data.lastName = '';
            if (type === 'row') {
                $('#delete-inp1-span').html(delete_data.name.length >= 1 ? delete_data.name : '{nombre}');
                $('#delete-inp2-span').html(delete_data.lastName.length >= 1 ? delete_data.lastName : '{apellido}');
            }
        });
$('#delete-btn').click(function () {
    $(this).addClass('disabled');
    $(this).attr('aria-disabled', 'true');
    if (delete_data.name == undefined || delete_data.lastName == undefined || delete_data.name == '' || delete_data.lastName == '' || delete_data.name.length <= 0 || delete_data.lastName <= 0) {
        swal(
                'Seleccione una persona!',
                'Por favor debe seleccionar una persona de la tabla',
                'warning'
                );
    } else {
        swal({
            title: 'Quiere eliminar?',
            html:
                    '<div class="col-lg-12">' +
                    '<p class="align-middle">http://api.pabloriosramirez.com/v1/persons?name=<span class="font-weight-bold" style="color: #fed136">' + delete_data.name + '</span>&amp;lastname=<span class="font-weight-bold" style="color: #fed136">' + delete_data.lastName + '</span></p>' +
                    '</div>',
            text: "Esta operación no puede ser revertida!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#fed136',
            cancelButtonColor: '#bdbdbd',
            confirmButtonText: 'Si, eliminalo!'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: "DELETE",
                    url: "/api_rest/v1/persons?name=" + delete_data.name + "&lastname=" + delete_data.lastName,
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    success: function (data, textStatus, xhr) {
                        dtbl_delete_ajax();
                        $('#delete-inp1-span').html('{nombre}');
                        $('#delete-inp2-span').html('{apellido}');
                        swal({
                            title: 'HTTP Status: ' + xhr.status + ' - ' + textStatus,
                            text: 'Persona seleccionada borrada correctamente',
                            type: 'success'
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        swal(
                                'HTTP Status: ' + jqXHR.status + ' - ' + textStatus,
                                'Se ha presentado un error al eliminar persona!',
                                'error'
                                );
                    }
                });
            }

        });
    }

    $(this).removeClass('disabled');
    $(this).attr('aria-disabled', 'false');
});
//</editor-fold>

    