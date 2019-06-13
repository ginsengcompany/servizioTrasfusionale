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
});
