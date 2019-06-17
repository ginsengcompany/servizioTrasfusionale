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


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + jqXHR.status);
        },
    });
    $(".homePage").focusin(function() {
        window.location.href = 'home' + '?token=' + token +  "&uid=" +uid ;
    });
    $("form").submit(function(e) {
        console.log("CIAONE");
        e.preventDefault(); // Prevents the page from refreshing
        var $this = $(this); // `this` refers to the current form element
        $.post(
            $this.attr("action"), // Gets the URL to sent the post to
            $this.serialize(), // Serializes form data in standard format
            function(data) { /** code to handle response **/ },
            "json" // The format the response should be in
        );
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
