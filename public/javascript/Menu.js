$(document).ready(function () {
    let token = GetURLParameter('token');
    let uid = GetURLParameter('uid');

    $("#homeAncor").attr("href","home?token="+token+"&uid="+uid);
    $("#NuovaSacca").attr("href","nuovaSacca?token="+token+ "&uid="+uid);

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
