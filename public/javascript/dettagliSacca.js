$('#fase2Card').hide();
$('#fase3Card').hide();
$('#fase4Card').hide();
$('#fase5Card').hide();
$('#fase2Hr').hide();
$('#fase3Hr').hide();
$('#fase4Hr').hide();
$('#fase5Hr').hide();

$(document).ready(function () {
    let modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    };

    let date = moment($('#dateStamp').val(), 'DD-MM-YYYY HH:mm ').toDate();
    $('#dateStamp').datetimepicker({
        date:date,
        locale: 'it',
        ignoreReadonly: true
    });
    let dateScadenza = moment($('#dataScadenzaInsert').val(), 'DD-MM-YYYY').toDate();
    $('#dataScadenzaInsert').datetimepicker({
        date:dateScadenza,
        locale: 'it',
        format: 'L',
        ignoreReadonly: true
    });
    let dateSomministrazione = moment($('#dataSomministrazioneInsert').val(), 'DD-MM-YYYY HH:mm ').toDate();
    $('#dataSomministrazioneInsert').datetimepicker({
        date:dateSomministrazione,
        locale: 'it',
        ignoreReadonly: true
    });
    let token = GetURLParameter('token');
    let uid = GetURLParameter('uid');
    let uidSacca = GetURLParameter('uidSacca');
    let sacca ;
    $.ajax({
        url: '/sacche/datiSacca',
        type: 'POST',
        data: JSON.stringify({'uid': uidSacca}),
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
            /*Fase 1*/
            $('#luogoRaccolta').val(sacca.luogoRaccolta);
            $('#tipoDonazione').val(sacca.tipoDonazione);
            $('#anticoagulante').val(sacca.anticoagulante);
            $('#conservante').val(sacca.conservante);
            $('#volumeEmocomponenti').val(sacca.volumeEmocomponenti);
            let a = moment(sacca.dateStamp).format('DD-MM-YYYY HH:mm ');
            console.log(a);
            $('#dateStamp').val(a);
            $('#durata').val(sacca.durata);
            $('#codiceFiscaleDonatore').val(sacca.codiceFiscaleDonatore);
            $('#esitoDonazione').val(sacca.esitoDonazione);
            $('#tipoEmocomponente').val(sacca.tipoEmocomponente);
            /*fase2*/
            $('#laboratorioProvenienza').val(sacca.laboratorioProvenienza);
            $('#fenotipo').val(sacca.fenotipo);
            $('#laboratorioAnalisi').val(sacca.laboratorioAnalisi);
            /*fase3*/
            $('#tipoEmoderivato').val(sacca.tipoEmoderivato);
            $('#tipoLavorazione').val(sacca.tipoLavorazione);
            /*fase4*/
            if(sacca.dataScadenza){
                let dataScadenza = moment(sacca.dataScadenza).format('DD-MM-YYYY');
                console.log(dataScadenza);
                $('#dataScadenza').val(dataScadenza);
            }
            else
                $('#dataScadenza').val('');
            /*fase5*/
            if(sacca.dataSomministrazione){
                let dataSomministrazione = moment(sacca.dataSomministrazione).format('DD-MM-YYYY HH:mm');
                console.log(dataSomministrazione);
                $('#dataSomministrazione').val(dataSomministrazione);
            }
            else
                $('#dataSomministrazione').val('');
            $('#medicoResponsabile').val(sacca.medicoResponsabile);
            $('#infermiereResponsabile').val(sacca.infermiereResponsabile);
            $('#nosograficoPaziente').val(sacca.nosograficoPaziente);

            if(sacca.fase > 1){
                if(sacca.fase > 3){
                    $('#fase2Hr').show();
                    $('#fase2Card').show();
                    $('#idFase2').removeAttr('hidden');
                    $('#fase3Hr').show();
                    $('#fase3Card').show();
                    $('#idFase3').removeAttr('hidden');
                    if(sacca.fase === 4){
                        $('#fase4Hr').show();
                        $('#fase4Card').show();
                        $('#idFase4').removeAttr('hidden');
                    }
                    else{
                        $('#fase4Hr').show();
                        $('#fase4Card').show();
                        $('#idFase4').removeAttr('hidden');
                        $('#fase5Hr').show();
                        $('#fase5Card').show();
                        $('#idFase5').removeAttr('hidden');
                    }
                }
                else if(sacca.fase === 3){
                    $('#fase2Hr').show();
                    $('#fase2Card').show();
                    $('#idFase2').removeAttr('hidden');
                    $('#fase3Hr').show();
                    $('#fase3Card').show();
                    $('#idFase3').removeAttr('hidden');
                }
                else{
                    $('#fase2Hr').show();
                    $('#fase2Card').show();
                    $('#idFase2').removeAttr('hidden');
                }
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + jqXHR.status);
        },
    });
    $(".homePage").focusin(function() {
        window.location.href = 'home' + '?token=' + token +  "&uid=" +uid ;
    });

    $(".aggiungiFase").click(function() {
        //Fase 2
        $('#laboratorioProvenienzaInvalid').fadeOut();
        $('#fenotipoInvalid').fadeOut();
        //Fase 3
        $('#tipoEmoderivatoInvalid').fadeOut();
        $('#tipoLavorazioneInvalid').fadeOut();
        //Fase 4
        $('#dataScadenzaInvalid').fadeOut();
        //Fase 5
        $('#dataSomministrazioneInvalid').fadeOut();
        $('#medicoResponsabileInvalid').fadeOut();
        $('#infermiereResponsabileInvalid').fadeOut();
        $('#nosograficoPazienteInvalid').fadeOut();

        if(sacca.fase === 1){
            $('#titoloModal').text("INSERISCI DATI FASE 2");
            $('#displayFase2').removeAttr('hidden');
        }
        else if(sacca.fase === 2){
            $('#titoloModal').text("INSERISCI DATI FASE 3");
            $('#displayFase3').removeAttr('hidden');
        }
        else if(sacca.fase === 3){
            $('#titoloModal').text("INSERISCI DATI FASE 4");
            $('#displayFase4').removeAttr('hidden');
        }
        else if(sacca.fase === 4){
            $('#titoloModal').text("INSERISCI DATI FASE 5");
            $('#displayFase5').removeAttr('hidden');
        }
        modal.style.display = "block";
    });

    $('#updateSacca').click( function () {
        let isValid = true;
        if(sacca.fase === 1){
            sacca.laboratorioProvenienza = $('#laboratorioProvenienzaInsert').val();
            sacca.fenotipo = $('#fenotipoInsert').val();
            sacca.laboratorioAnalisi = $('#laboratorioAnalisiInsert').val();
            if(!sacca.laboratorioProvenienza){
                $("#laboratorioProvenienzaInvalid").text("Attenzione, riempire il campo");
                $('#laboratorioProvenienzaInvalid').fadeIn();
                $('#laboratorioProvenienzaInvalid').addClass('red-text');
                isValid=false;
            }
            else{
                $('#laboratorioProvenienzaInvalid').fadeOut();
            }
            if(!sacca.fenotipo){
                $("#fenotipoInvalid").text("Attenzione, riempire il campo");
                $('#fenotipoInvalid').fadeIn();
                $('#fenotipoInvalid').addClass('red-text');
                isValid=false;
            }
            else{
                $('#fenotipoInvalid').fadeOut();
            }
            if(!sacca.fenotipo){
                $("#laboratorioAnalisiInvalid").text("Attenzione, riempire il campo");
                $('#laboratorioAnalisiInvalid').fadeIn();
                $('#laboratorioAnalisiInvalid').addClass('red-text');
                isValid=false;
            }
            else{
                $('#laboratorioAnalisiInvalid').fadeOut();
            }
        }
        else if(sacca.fase === 2){
            sacca.tipoEmoderivato = $('#tipoEmoderivatoInsert').val();
            sacca.tipoLavorazione = $('#tipoLavorazioneInsert').val();
            if(!sacca.tipoEmoderivato){
                $("#tipoEmoderivatoInvalid").text("Attenzione, riempire il campo");
                $('#tipoEmoderivatoInvalid').fadeIn();
                $('#tipoEmoderivatoInvalid').addClass('red-text');
                isValid=false;
            }
            else{
                $('#tipoEmoderivatoInvalid').fadeOut();
            }
            if(!sacca.tipoLavorazione){
                $("#tipoLavorazioneInvalid").text("Attenzione, riempire il campo");
                $('#tipoLavorazioneInvalid').fadeIn();
                $('#tipoLavorazioneInvalid').addClass('red-text');
                isValid=false;
            }
            else{
                $('#tipoLavorazioneInvalid').fadeOut();
            }
        }
        else if(sacca.fase === 3){
            sacca.dateScadenza = moment($('#dataScadenzaInsert').val(),"DD/MM/YYYY HH:mm").toDate();
            console.log(sacca.dataScadenza);
            if(!sacca.dateScadenza){
                $("#dataScadenzaInvalid").text("Attenzione, riempire il campo");
                $('#dataScadenzaInvalid').fadeIn();
                $('#dataScadenzaInvalid').addClass('red-text');
                isValid=false;
            }
            else{
                $('#dataScadenzaInvalid').fadeOut();
            }
        }
        else if(sacca.fase === 4){

            sacca.dataSomministrazione = moment($('#dataSomministrazioneInsert').val(),"DD/MM/YYYY HH:mm").toDate();
            sacca.medicoResponsabile = $('#medicoResponsabileInsert').val();
            sacca.infermiereResponsabile = $('#infermiereResponsabileInsert').val();
            sacca.nosograficoPaziente = $('#nosograficoPazienteInsert').val();
            if(!sacca.dataSomministrazione){
                $("#dataSomministrazioneInvalid").text("Attenzione, riempire il campo");
                $('#dataSomministrazioneInvalid').fadeIn();
                $('#dataSomministrazioneInvalid').addClass('red-text');
                isValid=false;
            }
            else{
                $('#dataSomministrazioneInvalid').fadeOut();
            }
            if(!sacca.medicoResponsabile){
                $("#medicoResponsabileInvalid").text("Attenzione, riempire il campo");
                $('#medicoResponsabileInvalid').fadeIn();
                $('#medicoResponsabileInvalid').addClass('red-text');
                isValid=false;
            }
            else{
                $('#medicoResponsabileInvalid').fadeOut();
            }
            if(!sacca.infermiereResponsabile){
                $("#infermiereResponsabileInvalid").text("Attenzione, riempire il campo");
                $('#infermiereResponsabileInvalid').fadeIn();
                $('#infermiereResponsabileInvalid').addClass('red-text');
                isValid=false;
            }
            else{
                $('#infermiereResponsabileInvalid').fadeOut();
            }
            if(!sacca.nosograficoPaziente){
                $("#nosograficoPazienteInvalid").text("Attenzione, riempire il campo");
                $('#nosograficoPazienteInvalid').fadeIn();
                $('#nosograficoPazienteInvalid').addClass('red-text');
                isValid=false;
            }
            else{
                $('#nosograficoPazienteInvalid').fadeOut();
            }
        }
        else{
            alert( " Message: " + "Non esistono altre fasi di lavorazione");
            isValid = false;
        }
        if(isValid){
            $.ajax({
                type: "POST",
                data: JSON.stringify(sacca),
                url: "/postModificaFase",
                contentType: 'application/json',
                dataType: "json",
                success: function (data, textStatus, jqXHR) {
                    console.log(data);
                    location.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    let responseText = jQuery.parseJSON(jqXHR.responseText);
                    alert( "Request failed: " +responseText.code + " Message: " + responseText.errmsg);
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
