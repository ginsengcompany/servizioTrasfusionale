$(document).ready(function () {
    let idOp;
    $('#btnLogin').click(function () {
        idOp = $('#idOperatore').val();
        let passw = $('#password').val();
        let utente = {
            uid:idOp,
            password:passw
        };
        $.ajax({
            type: "POST",
            data: JSON.stringify(utente),
            url: "/loginMethod",
            contentType: 'application/json',
            success: function (data, textStatus, jqXHR) {
                window.location.href = 'home' + '?token=' + data + "&" + "uid=" + idOp;
            },
            error: function (jqXHR, textStatus, errorThrown) {
            },
        });
    });
});
