$(document).ready(function () {
    let token = GetURLParameter('token');
    let uid = "Test";
    console.log(token);
    $.ajax({
        url: '/sacche/datisacca',
        type: 'POST',
        contentType: 'application/json',
        headers: {'access-token': token},
        data: JSON.stringify({uid: uid}),
        success: function (data, textStatus, jqXHR) {
            let prova = [data];
            console.log(prova);
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
                        data: 'dateStamp'
                    },
                    {
                        title: "DETTAGLI",
                        data: null
                    },

                ]
            });
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
