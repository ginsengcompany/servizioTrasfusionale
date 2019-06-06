$(document).ready(function () {
    $('#btnLogin').click(function () {
        let idOp = $('#idOperatore').val();
        let passw = $('#password').val();
        let utente = {
            uid:idOp,
            password:passw
        };
        $.ajax({
            type: "POST",
            data: JSON.stringify(utente),
            url: "/loginMethod",
            dataType: "json",
            contentType: 'application/json',
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                location.href = 'index';

            },
            error: function (jqXHR, textStatus, errorThrown) {
            },
        });
    });
});
