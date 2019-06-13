$(document).ready(function () {
    let token = GetURLParameter('token');

    $("#homeAncor").attr("href","home?token="+token);
    $("#NuovaSacca").attr("href","NuovaSacca?token="+token);

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
