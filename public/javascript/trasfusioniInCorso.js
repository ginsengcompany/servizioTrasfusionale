$(document).ready(function () {
    let token = GetURLParameter('token');
    let uid = GetURLParameter('uid');
    let sacca ;
    console.log(token);
    $.ajax({
        url: '/postTrasfusioni',
        type: 'POST',
        contentType: 'application/json',
        headers: {'access-token': token},
        success: function (data, textStatus, jqXHR) {
            sacca=data;
            let prova = data;
            console.log(data);
            let tabellaSacche =
                $("#tabTrasfusioniInCorso").DataTable({
                    data: prova,
                    columns: [
                        {
                            title: "UID SACCA",
                            data: 'uidSacca'
                        },
                        {
                            title: "UID INFERMIERE",
                            data: 'uidInfermiere'
                        },
                        {
                            title: "UID MEDICO",
                            data: 'uidMedico'
                        },
                        {
                            title: "Paziente",
                            data:null,
                            render: function (data, type, row) {
                                return data.paziente.nome + ' ' + data.paziente.cognome;
                            },
                        },
                        {
                            title:"Inizio Trasfusione",
                            data:null,
                            render: function (data, type, row) {
                                let date = moment(data.inizioTrasfusione).format("DD/MM/YYYY hh:mm");
                                return date;
                            },
                        }, {
                            title:"Fine Trasfusione",
                            data:null,
                            render: function (data, type, row) {
                                let dataFineTrasf = moment(data.fineTrasfusione,"YYYY-MM-DD hh:mm:ss").toDate();
                                return dataFineTrasf;
                            },
                        },
                        {
                            title: "Aggiornamento",
                            data:null,
                            render: function (data, type, row) {
                                let dataAgg = moment(data.ultimoAggiornamento,"YYYY-MM-DD hh:mm:ss").toDate();
                                console.log(data.ultimoAggiornamento);
                                return dataAgg;
                            },
                        },
                        {
                            title: "AVANZAMENTO",
                            data: null
                        },
                        { //prima colonna per aprire la riga e visualizzare i dati del contatto selezionato
                            orderable: false,
                            data: null,
                            render: function (data, type, row) {
                                return '<button type="button" class="btn btn-color-primary btn-sm btn-rounded dettagliSacca">Dettagli</button>'
                            },
                        }
                    ]
                });
            $('#tabSacche tbody').on('click', '.dettagliSacca', function () {
                if (tabellaSacche.row(this).data() !== undefined){
                    data = tabellaSacche.row(this).data();
                }else{
                    data = tabellaSacche.row($(this).parents('tr')).data();
                }

                console.log(data.uid);
                window.location.href = 'dettagliSacca' + '?token=' + token + "&" + "uid=" + uid + "&" + "uidSacca=" + data.uid;
            } );
        },
        error: function (jqXHR, textStatus, errorThrown) {
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
