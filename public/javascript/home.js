$(document).ready(function () {
    let token = GetURLParameter('token');
    let uid = GetURLParameter('uid');
    let sacca ;
    console.log(token);
    $.ajax({
        url: '/sacche/datiSacche',
        type: 'POST',
        contentType: 'application/json',
        headers: {'access-token': token},
        success: function (data, textStatus, jqXHR) {
            sacca=data;
            let prova = data;
            console.log(prova);
            let tabellaSacche =
                $("#tabSacche").DataTable({
                data: prova,
                columns: [
                    {
                        title: "UID SACCA",
                        data: 'uid'
                    },
                    {
                        title: "TIPO EMOCOMPONENTE",
                        data: 'tipoEmocomponente'
                    },
                    {
                        title: "ESITO DONAZIONE",
                        data: 'esitoDonazione'
                    },
                    {
                        title: "FASE",
                        data: 'fase'
                    },
                    {
                        title: "DATA CREAZIONE",
                        data: null,
                        render: function (data, type, row) {
                            let date = moment(data).format("DD/MM/YYYY hh:mm");
                            return date;
                        }
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
