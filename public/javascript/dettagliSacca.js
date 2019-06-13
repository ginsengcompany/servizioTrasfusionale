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
    let sacca ;
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
            if(sacca.trasfusa)
                $('#trasfusa').prop('checked', true);
            else
                $('#trasfusa').prop('checked', false);
            $('#luogoRaccolta').val(sacca.luogoRaccolta);
            $('#tipoDonazione').val(sacca.tipoDonazione);
            $('#anticoagulante').val(sacca.anticoagulante);
            $('#conservante').val(sacca.conservante);
            $('#volumeEmocomponenti').val(sacca.volumeEmocomponenti);
            let a = moment(sacca.dateStamp).format('DD-MM-YYYY HH:mm ');
            console.log(a);
            $('#dateStamp').val(a);


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
