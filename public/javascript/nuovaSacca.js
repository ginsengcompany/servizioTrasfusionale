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

    let uidPersonale = $('#uidPersonale').val(uid).toString();
    $(".inserisciSacca").focusin(function() {
    });



    $('#btnInvioDati').click(function () {
        let isValid = true;
        let uid = $('#uid').val();
        let fase = 1;
       // let trasfusa = $('#trasfusa').val();
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

            if(!uid){
                $("#invalidUid").text("Attenzione, riempire il campo");

                $('#invalidUid').fadeIn();
                $('#invalidUid').addClass('red-text');
                isValid=false;
            }
            else{
                $('#invalidUid').fadeOut();
            }

            if(!uidPersonale){
            $("#uidPersonaleInvalid").text("Attenzione, riempire il campo");
            $('#uidPersonaleInvalid').addClass('red-text');
            $('#uidPersonaleInvalid').fadeIn();
            isValid=false;
            }
         /*   if(!trasfusa){
                $("#trasfusaInvalid").text("Attenzione, riempire il campo");
                $('#trasfusaInvalid').addClass('red-text');
                $('#trasfusaInvalid').fadeIn();
                isValid=false;
            }*/
            if(!luogoRaccolta){
                $("#luogoRaccoltaInvalid").text("Attenzione, riempire il campo");
                $('#luogoRaccoltaInvalid').addClass('red-text');
                $('#luogoRaccoltaInvalid').fadeIn();
                isValid=false;
            }
            else{
                $('#luogoRaccoltaInvalid').fadeOut();
            }
            if(!tipoDonazione){
                $("#tipoDonazioneInvalid").text("Attenzione, riempire il campo");
                $('#tipoDonazioneInvalid').addClass('red-text');
                $('#tipoDonazioneInvalid').fadeIn();
                isValid=false;
            }
            else{
                $('#tipoDonazioneInvalid').fadeOut();
            }
            if(!anticoagulante){
                $("#anticoagulanteInvalid").text("Attenzione, riempire il campo");
                $('#anticoagulanteInvalid').addClass('red-text');
                $('#anticoagulanteInvalid').fadeIn();
                isValid=false;
            }else{
                $('#anticoagulanteInvalid').fadeOut();
            }
           if(!conservante){
                $("#conservanteInvalid").text("Attenzione, riempire il campo");
                $('#conservanteInvalid').addClass('red-text');
                $('#conservanteInvalid').fadeIn();
                isValid=false;
            }else{
               $('#conservanteInvalid').fadeOut();
           }
            if(!volumeEmocomponenti){
                $("#volumeEmocomponentiInvalid").text("Attenzione, riempire il campo");
                $('#volumeEmocomponentiInvalid').addClass('red-text');
                $('#volumeEmocomponentiInvalid').fadeIn();
                isValid=false;
            }else{
                $('#volumeEmocomponentiInvalid').fadeOut();
            }
            if(!conservante){
                $("#dateStampInvalid").text("Attenzione, riempire il campo");
                $('#dateStampInvalid').addClass('red-text');
                $('#dateStampInvalid').fadeIn();
                isValid=false;
            }else{
                $('#dateStampInvalid').fadeOut();
            }
            if(!durata){
                $("#durataInvalid").text("Attenzione, riempire il campo");
                $('#durataInvalid').addClass('red-text');
                $('#durataInvalid').fadeIn();
                isValid=false;
            }else{
                $('#durataInvalid').fadeOut();
            }
            if(codiceFiscaleDonatore.length !==16){
                $("#codiceFiscaleDonatoreInvalid").text("Attenzione, riempire il campo correttamente");
                $('#codiceFiscaleDonatoreInvalid').addClass('red-text');
                $('#codiceFiscaleDonatoreInvalid').fadeIn();
                isValid=false;
            }else{
                $('#codiceFiscaleDonatoreInvalid').fadeOut();
            }
            if(!esitoDonazione){
                $("#esitoDonazioneInvalid").text("Attenzione, riempire il campo");
                $('#esitoDonazioneInvalid').addClass('red-text');
                $('#esitoDonazioneInvalid').fadeIn();
                isValid=false;
            }else{
                $('#esitoDonazioneInvalid').fadeOut();
            }
            if(!tipoEmocomponente){
                $("#tipoEmocomponenteInvalid").text("Attenzione, riempire il campo");
                $('#tipoEmocomponenteInvalid').addClass('red-text');
                $('#tipoEmocomponenteInvalid').fadeIn();
                isValid=false;
            }else{
                $('#tipoEmocomponenteInvalid').fadeOut();
            }
        let saccaNuova = {
                uid: uid,
                uidPersonale:uidPersonale,
                fase : fase,
               // trasfusa:trasfusa,
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
            console.log(saccaNuova);
            if(isValid){
                $.ajax({
                    type: "POST",
                    data: JSON.stringify(saccaNuova),
                    url: "/postNuovaSacca",
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
            }

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
