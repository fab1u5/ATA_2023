$(document).ready(function () {
    Body.navBar();
    Body.spinnerSignal();

    pageInitializeNavBar('Download Tools');
    Body.footer();

    waitOFF();

    $('#bDownloadTeams').click(function (event) {
        event.preventDefault();

        waitON();

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "services/ATA_ExportService.asmx/DownloadTeams",
            dataType: "json",
            success: function (response) {
                if (response.hasOwnProperty("d")) { response = response.d; }

                $('<a></a>')
                    .attr('id', 'downloadFileTeams')
                    .attr('href', 'data:text/csv;charset=utf8,' + '\uFEFF' + encodeURIComponent(response))
                    .attr('download', 'teams.csv')
                    .appendTo('body');

                $('#downloadFileTeams').ready(function () {
                    $('#downloadFileTeams').get(0).click();
                });

                waitOFF();
            }, //success
            error: function (msg, error, errorThrown) {
                waitOFF();
                WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
            }
        });
    });
   
    $('#bDownloadExaminers').click(function (event) {
        event.preventDefault();

        waitON();

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "services/ATA_ExportService.asmx/DownloadExaminers",
            dataType: "json",
            success: function (response) {
                if (response.hasOwnProperty("d")) { response = response.d; }

                $('<a></a>')
                    .attr('id', 'downloadFileExaminers')
                    .attr('href', 'data:text/csv;charset=utf8,' + '\uFEFF' + encodeURIComponent(response))
                    .attr('download', 'examiners.csv')
                    .appendTo('body');

                $('#downloadFileExaminers').ready(function () {
                    $('#downloadFileExaminers').get(0).click();
                });

                waitOFF();
            }, //success
            error: function (msg, error, errorThrown) {
                waitOFF();
                WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
            }
        });
    });

    $('#bDownloadCars').click(function (event) {
        event.preventDefault();

        waitON();

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "services/ATA_ExportService.asmx/DownloadCars",
            dataType: "json",
            success: function (response) {
                if (response.hasOwnProperty("d")) { response = response.d; }

                $('<a></a>')
                    .attr('id', 'downloadFileCars')
                    .attr('href', 'data:text/csv;charset=utf8,' + '\uFEFF' + encodeURIComponent(response))
                    .attr('download', 'cars.csv')
                    .appendTo('body');

                $('#downloadFileCars').ready(function () {
                    $('#downloadFileCars').get(0).click();
                });

                waitOFF();
            }, //success
            error: function (msg, error, errorThrown) {
                waitOFF();
                WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
            }
        });
    });

});