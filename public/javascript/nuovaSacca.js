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
    let isValid = true;
    let uidPersonale = $('#uidPersonale').val(uid);
    $(".inserisciSacca").focusin(function() {
    });



    $('#btnInvioDati').click(function () {

        let uid = $('#uid').val();
        let fase = 1;
        let trasfusa = $('#trasfusa').val();
        let luogoRaccolta = $('#luogoRaccolta').val();
        let tipoDonazione = $('#tipoDonazione').val();
        let anticoagulante = $('#anticoagulante').val();
        let conservante = $('#conservante').val();
        let volumeEmocomponenti = $('#volumeEmocomponenti').val();
        let dateStamp = moment($('#dateStamp').val(),"DD/MM/YYYY hh:mm").toDate();
        let durata = $('#durata').val();
        let codiceFiscaleDonatore = $('#codiceFiscaleDonatore').val();
        let esitoDonazione = $('#esitoDonazione').val();
        let tipoEmocomponente = $('#tipoEmocomponente').val();

        /*    if(!uid){
                $("#invalidUid").text("Uid non valido");
                $('#invalidUid').addClass('red-text');
                $('#invalidUid').fadeIn();
                isValid=false;

            }*/
        let saccaNuova = {
                uid: uid,
                uidPersonale:uidPersonale,
                fase : fase,
                trasfusa:trasfusa,
                /*Fase 1*/
                luogoRaccolta : luogoRaccolta,
                tipoDonazione : tipoDonazione,
                anticoagulante : anticoagulante,
                conservante : conservante,
                volumeEmocomponenti : volumeEmocomponenti,
                dateStamp : dateStamp,
                durata : durata,
                codiceFiscaleDonatore : codiceFiscaleDonatore,
                esitoDonazione : esitoDonazione,
                tipoEmocomponente : tipoEmocomponente
            };
        $.ajax({
            type: "POST",
            data: JSON.stringify(saccaNuova),
            url: "/PostModificaFase",
            contentType: 'application/json',
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                console.log(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus)
               /* $('#modalErrore').modal('toggle');
                $('#modalErrore').modal('show');*/
              //  $('#idModal').text("erroraccio");
            },
        });
    });


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
