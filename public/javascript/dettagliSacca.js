$(document).ready(function () {
    let date = moment($('#dateStamp').val(), 'DD-MM-YYYY HH:mm ').toDate();
    $('#dateStamp').datetimepicker({
        date:date,
        locale: 'it',
        ignoreReadonly: true
    });
    let dateScadenza = moment($('#dataScadenza').val(), 'DD-MM-YYYY').toDate();
    $('#dataScadenza').datetimepicker({
        date:dateScadenza,
        locale: 'it',
        format: 'L',
        ignoreReadonly: true
    });
    let dateSomministrazione = moment($('#dataSomministrazione').val(), 'DD-MM-YYYY HH:mm ').toDate();
    $('#dataSomministrazione').datetimepicker({
        date:dateSomministrazione,
        locale: 'it',
        ignoreReadonly: true
    });

    let token = GetURLParameter('token');
    let uid = GetURLParameter('uid');
    console.log(uid);
    let sacca ;
    console.log(token);
    $.ajax({
        url: '/sacche/datiSacca',
        type: 'POST',
        data: JSON.stringify({'uid': uid}),
        contentType: 'application/json',
        headers: {'access-token': token},
        success: function (data, textStatus, jqXHR) {
            sacca=data;
            $('#uid').val(sacca.uid);
            $('#uidPaziente').val(sacca.uidPaziente);
            $('#uidPersonale').val(sacca.uidPersonale);
            $('#fase').val(sacca.fase);
            $('#trasfusa').val(sacca.trasfusa);
            $('#luogoRaccolta').val(sacca.luogoRaccolta);


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + jqXHR.status);
        },
    });
    function GetURLParameter(sParam) {
        let sPageURL = window.location.search.substring(1);
        let sURLVariables = sPageURL.split('&');
        for (let i = 0; i < sURLVariables.length; i++) {
            let sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1];
            }
        }
    }
});
