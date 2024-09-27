var WS_dataset_examboards;
var WS_dataset_configuration_dn;

function WS_Error(msg, error, errorThrown) {
    //alert("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
    ataToast("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown, 4000);
};

function WS_loadExamBoards() {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetExamBoards",
        data: "",
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            WS_dataset_examboards = response;

            waitON();
            $("#tbodyLoginTabletStep1").html('');

            if (WS_dataset_examboards.length > 0) {
                $("#tbodyLoginTabletStep1").append('<tr><td><ul class="collection" id="ulCollection">');
                $("#tbodyLoginTabletStep1").append('</ul></td><tr>');

                for (var i = 0; i < WS_dataset_examboards.length; i++) {
                    var item = WS_dataset_examboards[i];
                    var lineId = item.Id.toString();

                    $("#ulCollection").append('<li class="collection-item avatar autoheight" id="li' + lineId + '">');
                    $("#ulCollection").append('</li>');

                    $("#li" + lineId).append('<i class="mdi mdi-gavel circle ata-green"></i>');
                    $("#li" + lineId).append('<span class="title ata-green-text">' + item.Name.toString() + '</span>&nbsp;-&nbsp;');
                    $("#li" + lineId).append('<span class="title ata-green-text">' + item.Description.toString() + '</span>');

                    $("#li" + lineId).append('<p id="p' + lineId + '">');
                    $("#li" + lineId).append('</p>');
                    if (item.Examiners != null) {
                        for (var ii = 0; ii < item.Examiners.length; ii++) {
                            var el = item.Examiners[ii];
                            if ((el.FirstName.toString().length > 0) || (els.toString().length > 0)) {
                                var img = '<i class="mdi mdi-account"></i>&nbsp;';
                                $("#p" + lineId).append(img + el.FirstName + '&nbsp;' + el.Surname.bold() + '&nbsp;&nbsp;');
                            }
                        }
                    }

                    $("#li" + lineId).append('<p id="pp' + lineId + '">');
                    $("#li" + lineId).append('</p>');
                    var img = '<i class="mdi mdi-car"></i>&nbsp;';
                    var string2append = '';
                    if (item.Cars != null) {
                        for (var ii = 0; ii < item.Cars.length; ii++) {
                            var el = item.Cars[ii];
                            if (el.Carno.toString().length > 0) {
                                string2append += img;
                                string2append += el.Carno.toString().bold() + '&nbsp;';
                                string2append += el.Team.Name.toString().bold() + '&nbsp;';
                                string2append += el.Team.University.toString() + '&nbsp;';
                            }
                        }
                    }
                    $("#pp" + lineId).append(string2append);
                    $("#li" + lineId).append('<a href="#!" class="btn-floating secondary-content ata-green" onclick="editRecord(' + i + ');"><i class="mdi mdi-play"></i></a>');
                }
            }
            waitOFF();


        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

//AF - Giu 2016 - Examboard is connected to a single Event
function WS_showRecords_examboards_events(preselectedValue) {
    preselectedValue = (typeof preselectedValue != 'undefined' ? preselectedValue : '');

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetEvents",
        data: "",
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            dataset_events = response;

            $('#eventid').empty();

            $('#eventid').append($('<option>', { value: '', text: 'Select an Event' }));

            for (var i = 0; i < dataset_events.length; i++) {
                var item = dataset_events[i];
                $('#eventid').append($('<option>', { value: item.Id, text: item.EventName.Name }));
            }

            if (preselectedValue.length > 0) {
                $('#eventid').val(preselectedValue.toString());
            }
            $('#eventid').material_select();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_loadExamBoardsWithCars() {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetExamBoardsWithCars",
        data: "",
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            WS_dataset_examboards = response;

            waitON();
            $("#tbodyLoginTabletStep1").html('');

            if (WS_dataset_examboards.length > 0) {
                $("#tbodyLoginTabletStep1").append('<tr><td><ul class="collection" id="ulCollection">');
                $("#tbodyLoginTabletStep1").append('</ul></td><tr>');

                for (var i = 0; i < WS_dataset_examboards.length; i++) {
                    var item = WS_dataset_examboards[i];
                    var lineId = item.Id.toString();

                    $("#ulCollection").append('<li class="collection-item avatar autoheight" id="li' + lineId + '">');
                    $("#ulCollection").append('</li>');

                    $("#li" + lineId).append('<i class="mdi mdi-gavel circle ata-green"></i>');
                    $("#li" + lineId).append('<span class="title ata-green-text">' + item.Name.toString() + '</span>&nbsp;-&nbsp;');
                    $("#li" + lineId).append('<span class="title ata-green-text">' + item.Description.toString() + '</span>');

                    $("#li" + lineId).append('<p id="p' + lineId + '">');
                    $("#li" + lineId).append('</p>');
                    if (item.Examiners != null) {
                        for (var ii = 0; ii < item.Examiners.length; ii++) {
                            var el = item.Examiners[ii];
                            if ((el.FirstName.toString().length > 0) || (el.Surname.toString().length > 0)) {
                                var img = '<i class="mdi mdi-account"></i>&nbsp;';
                                $("#p" + lineId).append(img + el.FirstName + '&nbsp;' + el.Surname.bold() + '&nbsp;&nbsp;');
                            }
                        }
                    }

                    $("#li" + lineId).append('<p id="pp' + lineId + '">');
                    $("#li" + lineId).append('</p>');
                    var img = '<i class="mdi mdi-car"></i>&nbsp;';
                    var string2append = '';
                    if (item.Cars != null) {
                        for (var ii = 0; ii < item.Cars.length; ii++) {
                            var el = item.Cars[ii];
                            if (el.Carno.toString().length > 0) {
                                string2append += img;
                                string2append += el.Carno.toString().bold() + '&nbsp;';
                                string2append += el.Team.Name.toString().bold() + '&nbsp;';
                                string2append += el.Team.University.toString() + '&nbsp;';
                            }
                        }
                    }
                    $("#pp" + lineId).append(string2append);
                    $("#li" + lineId).append('<a href="#!" class="btn-floating secondary-content ata-green" onclick="editRecord(' + i + ');"><i class="mdi mdi-play"></i></a>');
                }
            }
            waitOFF();


        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_loadExamBoardsWithExaminers() {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetExamBoardsWithExaminers",
        data: "",
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            WS_dataset_examboards = response;

            waitON();
            $("#tbodyLoginTabletStep1").html('');

            if (WS_dataset_examboards.length > 0) {
                $("#tbodyLoginTabletStep1").append('<tr><td><ul class="collection" id="ulCollection">');
                $("#tbodyLoginTabletStep1").append('</ul></td><tr>');

                for (var i = 0; i < WS_dataset_examboards.length; i++) {
                    var item = WS_dataset_examboards[i];
                    var lineId = item.Id.toString();

                    $("#ulCollection").append('<li class="collection-item avatar autoheight" id="li' + lineId + '">');
                    $("#ulCollection").append('</li>');

                    $("#li" + lineId).append('<i class="mdi mdi-gavel circle ata-red"></i>');
                    $("#li" + lineId).append('<span class="title ata-green-text">' + item.Name.toString() + '</span>&nbsp;-&nbsp;');
                    $("#li" + lineId).append('<span class="title ata-green-text">' + item.Description.toString() + '</span>');

                    //AF - Giu 2016 - Examboard is connected to a single Event
                    var img = '<br/><i class="mdi mdi-timer amber-text"></i>&nbsp;';
                    $("#li" + lineId).append(img + '<span class="title amber-text">' + item.Event.EventName.Name.toString() + '</span>');

                    $("#li" + lineId).append('<p id="p' + lineId + '">');
                    $("#li" + lineId).append('</p>');
                    if (item.Examiners != null) {
                        for (var ii = 0; ii < item.Examiners.length; ii++) {
                            var el = item.Examiners[ii];
                            if ((el.FirstName.toString().length > 0) || (el.Surname.toString().length > 0)) {
                                var img = '<i class="mdi mdi-account"></i>&nbsp;';
                                $("#p" + lineId).append(img + el.FirstName.toString() + '&nbsp;' + el.Surname.toString().bold() + '&nbsp;&nbsp;');
                            }
                        }
                    }

                    $("#li" + lineId).append('<a href="#" class="btn-floating secondary-content ata-green" onclick="editRecord(' + i + ');"><i class="mdi mdi-play"></i></a>');
                }
            }
            waitOFF();


        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_insertRecords_fuels(name) {
    //var obj = {};
    //obj.name = name; 
    //var theString = stringifyJSON(obj);

    //$.ajax({
    //    type: "POST",
    //    contentType: "application/json", 
    //    url: "http://77.108.25.178:782/services/ATA_WebService.asmx/InsertFuel",
    //    data: theString,
    //    dataType: "json",
    //    success: function (response) {
    //        if (response.hasOwnProperty("d")) { response = response.d; }
    //    }, //success
    //    error: function (msg, error, errorThrown) {
    //        ataToast("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown, 4000);
    //    }
    //});
}

function WS_insertRecords_classes(name) {
    //var obj = {};
    //obj.name = name;
    //var theString = stringifyJSON(obj);

    //$.ajax({
    //    type: "POST",
    //    contentType: "application/json",
    //    url: "http://77.108.25.178:782/services/ATA_WebService.asmx/InsertClass",
    //    data: theString,
    //    dataType: "json",
    //    success: function (response) {
    //        if (response.hasOwnProperty("d")) { response = response.d; }
    //    }, //success
    //    error: function (msg, error, errorThrown) {
    //        ataToast("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown, 4000);
    //    }
    //});
}

function WS_insertRecord_cars(carno, regno, teamid, classid, fuelid, deliverydocdate, boxno) {
    var obj = {};
    obj.carno = carno;
    obj.regno = regno;
    obj.teamid = teamid;
    obj.classid = classid;
    obj.fuelid = fuelid;
    obj.deliverydocdate = deliverydocdate;
    obj.boxno = boxno;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/InsertCar",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            loadAndReset_cars();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_deleteRecord_cars(id) {
    var obj = {};
    obj.id = id;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/DeleteCar",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            ataToast("The item has been successfully deleted", 4000);
            showRecords_cars();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_updateRecord_cars(id, carno, regno, teamid, classid, fuelid, deliverydocdate, boxno) {
    var obj = {};
    obj.id = id;
    obj.carno = carno;
    obj.regno = regno;
    obj.teamid = teamid;
    obj.classid = classid;
    obj.fuelid = fuelid;
    obj.deliverydocdate = deliverydocdate;
    obj.boxno = boxno;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/UpdateCar",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            loadAndReset_cars();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_updateRecord_cars_scores(id, fuelid, deliverydocdate, boxno) {
    var obj = {};
    obj.id = id;
    obj.fuelid = fuelid;
    obj.deliverydocdate = deliverydocdate;
    obj.boxno = boxno;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/UpdateCarFromScores",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            showRecords_scores();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_showRecords_cars() {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetCars",
        data: "",
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            waitON();
            $("#tbodyCars").html('');

            dataset_cars = response;

            for (var i = 0; i < dataset_cars.length; i++) {

                var item = dataset_cars[i];

                var text2Append = '';

                var deliveryDocDateParsed = datefyJSON(item.DeliveryDocDate);

                //Electric Car has to be green-colored - req.Ciadamidaro Set 2015
                var trClassName = '';
                if (Boolean(item.IsAnElectricCar)) {
                    trClassName = " class='electric' ";
                }
                else {
                    trClassName = " class='not-electric' ";
                }

                text2Append += '<tr' + trClassName + '>';

                text2Append += '<td align="right">';
                text2Append += '<a class="btn-floating waves-effect waves-light ata-green" onclick="editRecord(' + i + ');"><i class="mdi mdi-pencil"></i></a>&nbsp;';
                var isReadonly = (!Boolean(item.ReadOnly)) ? ' ata-green' : ' gray disabled ';
                text2Append += '<a class="btn-floating waves-effect waves-light ' + isReadonly + '" onclick="if (!$(this).hasClass(&#39;disabled&#39;)) {deleteRecord(' + i + ');} return false;"><i class="mdi mdi-delete"></i></a>';
                text2Append += '</td>';

                text2Append += '<td>' + item.Carno.toString() + '&nbsp;</td>';
                //text2Append += '<td>' + item.Regno.toString() + '&nbsp;</td>';
                text2Append += '<td>' + item.Team.Name.toString() + '&nbsp;</td>';
                text2Append += '<td>' + item.Team.University.toString() + '&nbsp;</td>';
                text2Append += '<td>' + item.Team.Country.toString() + '&nbsp;</td>';
                text2Append += '<td>' + item.Class.Name.toString() + '&nbsp;</td>';
                text2Append += '<td>' + item.Fuel.Name.toString() + '&nbsp;</td>';
                text2Append += '<td>' + deliveryDocDateParsed + '&nbsp;</td>';
                text2Append += '<td>' + item.BoxNo.toString() + '&nbsp;</td>';

                text2Append += '</tr>';

                $("#tbodyCars").append(text2Append);
            }
            $("#tCars").stupidtable();
            waitOFF();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_showRecords_cars_byfilters(carno, regno, teamid, classid, fuelid, deliverydocdate, boxno) {

    var obj = {};
    obj.carno = carno;
    obj.regno = regno;
    obj.teamid = teamid;
    obj.classid = classid;
    obj.fuelid = fuelid;
    obj.deliverydocdate = deliverydocdate;
    obj.boxno = boxno;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetCarsByFilters",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            waitON();
            $("#tbodyCars").html('');

            dataset_cars = response;

            for (var i = 0; i < dataset_cars.length; i++) {

                var item = dataset_cars[i];

                var text2Append = '';

                var deliveryDocDateParsed = datefyJSON(item.DeliveryDocDate);

                //Electric Car has to be green-colored - req.Ciadamidaro Set 2015
                var trClassName = '';
                if (Boolean(item.IsAnElectricCar)) {
                    trClassName = " class='electric' ";
                }
                else {
                    trClassName = " class='not-electric' ";
                }

                text2Append += '<tr' + trClassName + '>';

                text2Append += '<td align="right">';
                text2Append += '<a class="btn-floating waves-effect waves-light ata-green" onclick="editRecord(' + i + ');"><i class="mdi mdi-pencil"></i></a>&nbsp;';
                var isReadonly = (!Boolean(item.ReadOnly)) ? ' ata-green' : ' gray disabled ';
                text2Append += '<a class="btn-floating waves-effect waves-light ' + isReadonly + '" onclick="deleteRecord(' + i + ');"><i class="mdi mdi-delete"></i></a>';
                text2Append += '</td>';

                text2Append += '<td>' + item.Carno.toString() + '&nbsp;</td>';
                //text2Append += '<td>' + item.Regno.toString() + '&nbsp;</td>';
                text2Append += '<td>' + item.Team.Name.toString() + '&nbsp;</td>';
                text2Append += '<td>' + item.Team.University.toString() + '&nbsp;</td>';
                text2Append += '<td>' + item.Team.Country.toString() + '&nbsp;</td>';
                text2Append += '<td>' + item.Class.Name.toString() + '&nbsp;</td>';
                text2Append += '<td>' + item.Fuel.Name.toString() + '&nbsp;</td>';
                text2Append += '<td>' + deliveryDocDateParsed + '&nbsp;</td>';
                text2Append += '<td>' + item.BoxNo.toString() + '&nbsp;</td>';

                text2Append += '</tr>';

                $("#tbodyCars").append(text2Append);
            }
            waitOFF();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_showRecords_cars_classes(ooId) {
    ooId = (typeof ooId != 'undefined' ? ooId : 'classid');
    var firstOption = (typeof ooId != 'undefined' ? 'Class' : 'Select a Class');

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetClasses",
        data: "",
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            dataset_classes = response;

            $('#' + ooId).empty();

            $('#' + ooId).append($('<option>', { value: '', text: firstOption }));

            for (var i = 0; i < dataset_classes.length; i++) {
                var item = dataset_classes[i];
                $('#' + ooId).append($('<option>', { value: item.Id, text: item.Name }));
            }

            $('#' + ooId).material_select();


        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_showRecords_cars_fuels(ooId) {
    ooId = (typeof ooId != 'undefined' ? ooId : 'fuelid');
    var firstOption = (typeof ooId != 'undefined' ? 'Fuel' : 'Select a Fuel');

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetFuels",
        data: "",
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            dataset_fuels = response;

            $('#' + ooId).empty();

            $('#' + ooId).append($('<option>', { value: '', text: firstOption }));

            for (var i = 0; i < dataset_fuels.length; i++) {
                var item = dataset_fuels[i];
                $('#' + ooId).append($('<option>', { value: item.Id, text: item.Name }));
            }

            $('#' + ooId).material_select();


        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_showRecords_cars_teams(ooId) {
    ooId = (typeof ooId != 'undefined' ? ooId : 'teamid');
    var firstOption = (typeof ooId != 'undefined' ? 'Team' : 'Select a Team');

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetTeams",
        data: "",
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            dataset_teams = response;

            $('#' + ooId).empty();

            $('#' + ooId).append($('<option>', { value: '', text: firstOption }));

            for (var i = 0; i < dataset_teams.length; i++) {
                var item = dataset_teams[i];
                $('#' + ooId).append($('<option>', { value: item.Id, text: item.Name }));
            }

            $('#' + ooId).material_select();


        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_insertRecord_teams(teamname, university, country) {
    var obj = {};
    obj.name = teamname;
    obj.university = university;
    obj.country = country;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/InsertTeam",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            loadAndReset_teams();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_deleteRecord_teams(id) {
    var obj = {};
    obj.id = id;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/DeleteTeam",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            ataToast("The item has been successfully deleted", 4000);
            showRecords_teams();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_updateRecord_teams(id, teamname, university, country) {
    var obj = {};

    obj.id = id;
    obj.name = teamname;
    obj.university = university;
    obj.country = country;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/UpdateTeam",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            loadAndReset_teams();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_showRecords_teams() {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetTeams",
        data: "",
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            waitON();
            $("#tbodyTeams").html('');

            dataset_teams = response;

            for (var i = 0; i < dataset_teams.length; i++) {

                var item = dataset_teams[i];

                var text2Append = '';

                text2Append += '<tr>';

                text2Append += '<td align="right">';
                text2Append += '<a class="btn-floating waves-effect waves-light ata-green" onclick="editRecord(' + i + ');"><i class="mdi mdi-pencil"></i></a>&nbsp;';
                var isReadonly = (!Boolean(item.ReadOnly)) ? ' ata-green' : ' gray disabled ';
                text2Append += '<a class="btn-floating waves-effect waves-light ' + isReadonly + '" onclick="if (!$(this).hasClass(&#39;disabled&#39;)) { deleteRecord(' + i + ');} return false;"><i class="mdi mdi-delete"></i></a>';
                text2Append += '</td>';

                text2Append += '<td>' + item.Name + '</td>';
                text2Append += '<td>' + item.University + '</td>';
                text2Append += '<td>' + item.Country + '</td>';

                text2Append += '</tr>';

                $("#tbodyTeams").append(text2Append);
            }
            $('#tTeam').stupidtable();
            waitOFF();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_insertRecord_examiners(firstname, surname, phone) {
    var obj = {};
    obj.firstname = firstname;
    obj.surname = surname;
    obj.phone = phone;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/InsertExaminer",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            loadAndReset_examiners();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_deleteRecord_examiners(id) {
    var obj = {};
    obj.id = id;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/DeleteExaminer",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            ataToast("The item has been successfully deleted", 4000);
            showRecords_examiners();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_updateRecord_examiners(id, firstname, surname, phone) {
    var obj = {};

    obj.id = id;
    obj.firstname = firstname;
    obj.surname = surname;
    obj.phone = phone;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/UpdateExaminer",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            loadAndReset_examiners();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });

}

function WS_showRecords_examiners() {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetExaminers",
        data: "",
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            waitON();
            $("#tbodyExaminers").html('');

            dataset_examiners = response;

            for (var i = 0; i < dataset_examiners.length; i++) {

                var item = dataset_examiners[i];

                var text2Append = '';

                text2Append += '<tr>';

                text2Append += '<td align="right">';
                text2Append += '<a class="btn-floating waves-effect waves-light ata-green" onclick="editRecord(' + i + ');"><i class="mdi mdi-pencil"></i></a>&nbsp;';
                var isReadonly = (!Boolean(item.ReadOnly)) ? ' ata-green' : ' gray disabled ';
                text2Append += '<a class="btn-floating waves-effect waves-light ' + isReadonly + '" onclick="if (!$(this).hasClass(&#39;disabled&#39;)) {deleteRecord(' + i + ');} return false;"><i class="mdi mdi-delete"></i></a>';
                text2Append += '</td>';

                text2Append += '<td>' + item.Surname + '</td>';
                text2Append += '<td>' + item.FirstName + '</td>';
                text2Append += '<td>' + item.Phone + '</td>';

                text2Append += '</tr>';

                $("#tbodyExaminers").append(text2Append);
            }
            $('#tExaminers').stupidtable();
            waitOFF();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

//AF - Giu 2016 - Examboard is connected to a single Event
function WS_insertRecord_examboards(examboardname, description, usecolor, color, eventid) {
    var obj = {};
    obj.name = examboardname;
    obj.description = description;
    obj.isColorUsed = Boolean(usecolor);
    //AF - Giu 2016 - Examboard is connected to a single Event
    obj.eventid = eventid;
    obj.color = color;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/InsertExamBoard",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            loadAndReset_examboards();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_deleteRecord_examboards(id) {
    var obj = {};
    obj.id = id;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/DeleteExamBoard",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            ataToast("The item has been successfully deleted", 4000);
            showRecords_examboards();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_updateRecord_examboards(id, examboardname, description, usecolor, color, eventid) {
    var obj = {};
    obj.id = id;
    obj.name = examboardname;
    obj.description = description;
    obj.isColorUsed = Boolean(usecolor);
    obj.color = color;
    //AF - Giu 2016 - Examboard is connected to a single Event
    obj.eventid = eventid;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/UpdateExamBoard",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            loadAndReset_examboards();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_showRecords_examboards() {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetExamBoards",
        data: "",
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            dataset_examboards = response;

            waitON();
            $("#tbodyExamBoards").html('');

            if (dataset_examboards.length > 0) {
                $("#tbodyExamBoards").append('<tr><td><ul class="collection" id="ulCollection">');
                $("#tbodyExamBoards").append('</ul></td><tr>');

                for (var i = 0; i < dataset_examboards.length; i++) {
                    var item = dataset_examboards[i];
                    var lineId = item.Id.toString();

                    $("#ulCollection").append('<li class="collection-item avatar autoheight" id="li' + lineId + '">');
                    $("#ulCollection").append('</li>');

                    $("#li" + lineId).append('<i class="mdi mdi-gavel circle ata-red"></i>');
                    $("#li" + lineId).append('<span class="title ata-green-text">' + item.Name.toString() + '&nbsp;-&nbsp;' + item.Description.toString() + '</span>');

                    //AF - Giu 2016 - Examboard is connected to a single Event
                    var img = '<br/><i class="mdi mdi-timer amber-text"></i>&nbsp;';
                    $("#li" + lineId).append(img + '<span class="title amber-text">' + item.Event.EventName.Name.toString() + '</span>');

                    $("#li" + lineId).append('<p id="p' + lineId + '">');
                    $("#li" + lineId).append('</p>');
                    if (item.Examiners != null) {
                        for (var ii = 0; ii < item.Examiners.length; ii++) {
                            var el = item.Examiners[ii];
                            if ((el.FirstName.toString().length > 0) || (el.Surname.toString().length > 0)) {
                                var img = '<i class="mdi mdi-account"></i>&nbsp;';
                                $("#p" + lineId).append(img + el.FirstName + '&nbsp;' + el.Surname.bold() + '&nbsp;&nbsp;');
                            }
                        }
                    }

                    $("#li" + lineId).append('<a href="#!" class="secondary-content btn-floating ata-green" onclick="editRecord(' + i + ');"><i class="mdi mdi-magnify"></i></a>');
                }
            }
            waitOFF();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_insertRecord_examboards2examiners(examboardid, examinerid) {
    var obj = {};
    obj.examboardid = examboardid;
    obj.examinerid = examinerid;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/InsertExamBoardExaminer",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_deleteRecord_examboards2examiners(examboardid, examinerid) {
    var obj = {};
    obj.examboardid = examboardid;
    obj.examinerid = examinerid;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/DeleteExamBoardExaminer",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_showRecords_examboards2examiners(id) {
    var obj = {};
    obj.id = id;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetExamBoardExaminersAssignable",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            $("#tbodyExamBoards2Examiners").html('');

            dataset_examiners = response;

            for (var i = 0; i < dataset_examiners.length; i++) {

                var item = dataset_examiners[i];
                var examinerid = (item.Id).toString();

                var linkcheck = '';

                var isAssigned = item.AlreadyAssigned;

                linkcheck += '<tr>';
                linkcheck += '<td>';
                linkcheck += '<input type="checkbox" class="filled-in" id="chkExaminer' + examinerid + '" name="chkExaminer" onclick="checkExaminer(this);" value="' + examinerid + '" />';
                linkcheck += '<label for="chkExaminer' + examinerid + '">&nbsp;</label>';
                linkcheck += '</td>';

                linkcheck += '<td>' + item.FirstName + '</td>';
                linkcheck += '<td>' + item.Surname + '</td>';

                linkcheck += '</tr>';

                $("#tbodyExamBoards2Examiners").append(linkcheck);

                $('#chkExaminer' + examinerid).prop('checked', isAssigned);
            }
            $('#tExaminers').stupidtable();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_insertRecord_examboards2cars(examboardid, carid) {
    var obj = {};
    obj.examboardid = examboardid;
    obj.carid = carid;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/InsertExamBoardCar",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_deleteRecord_examboards2cars(examboardid, carid) {
    var obj = {};
    obj.examboardid = examboardid;
    obj.carid = carid;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/DeleteExamBoardCar",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_showRecords_examboards2cars(id) {
    var obj = {};
    obj.id = id;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetExamBoardCarsAssignable",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            $("#tbodyExamBoards2Cars").html('');

            dataset_cars = response;

            for (var i = 0; i < dataset_cars.length; i++) {

                var item = dataset_cars[i];
                var carid = (item.Id).toString();

                var linkcheck = '';

                var isAssigned = item.AlreadyAssigned;
                var deliveryDocDateParsed = datefyJSON(item.DeliveryDocDate);

                //Electric Car has to be green-colored - req.Ciadamidaro Set 2015
                var trClassName = '';
                if (Boolean(item.IsAnElectricCar)) {
                    trClassName = " class='electric' ";
                }
                else {
                    trClassName = " class='not-electric' ";
                }

                linkcheck += '<tr' + trClassName + '>';

                linkcheck += '<td>';
                linkcheck += '<input type="checkbox" class="filled-in" id="chkCar' + carid + '" name="chkCar" onclick="checkCar(this);" value="' + carid + '" />';
                linkcheck += '<label for="chkCar' + carid + '">&nbsp;</label>';
                linkcheck += '</td>';

                linkcheck += '<td>' + item.Carno + '</td>';
                //linkcheck += '<td>' + item.Regno + '</td>';
                linkcheck += '<td>' + item.Team.Name + '</td>';
                linkcheck += '<td>' + item.Team.University + '</td>';
                linkcheck += '<td>' + item.Class.Name + '</td>';
                linkcheck += '<td>' + item.Fuel.Name + '</td>';
                linkcheck += '<td>' + deliveryDocDateParsed + '</td>';
                linkcheck += '<td>' + item.BoxNo + '</td>';

                linkcheck += '</tr>';

                $("#tbodyExamBoards2Cars").append(linkcheck);

                $('#chkCar' + carid).prop('checked', isAssigned);
            }
            $('#tCars').stupidtable();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_insertRecords_eventstypes(name) {
    //var obj = {};
    //obj.name = name; 
    //var theString = stringifyJSON(obj);

    //$.ajax({
    //    type: "POST",
    //    contentType: "application/json", 
    //    url: "http://77.108.25.178:782/services/ATA_WebService.asmx/InsertEventType",
    //    data: theString,
    //    dataType: "json",
    //    success: function (response) {
    //        if (response.hasOwnProperty("d")) { response = response.d; }
    //    }, //success
    //    error: function (msg, error, errorThrown) {
    //        WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
    //    }
    //});

}

function WS_insertRecords_eventsnames(name, eventTypeId) {
    //var obj = {};
    //obj.name = name; 
    //obj.eventTypeId = eventTypeId; 
    //var theString = stringifyJSON(obj);

    //$.ajax({
    //    type: "POST",
    //    contentType: "application/json", 
    //    url: "http://77.108.25.178:782/services/ATA_WebService.asmx/InsertEventName",
    //    data: theString,
    //    dataType: "json",
    //    success: function (response) {
    //        if (response.hasOwnProperty("d")) { response = response.d; }
    //    }, //success
    //    error: function (msg, error, errorThrown) {
    //        WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
    //    }
    //});
}

function WS_insertRecord_events(eventTypeId, eventNameId, description, isScoreNumeric, maximumscore) {
    var obj = {};
    obj.eventTypeId = eventTypeId;
    obj.eventNameId = eventNameId;
    obj.description = description;
    obj.isScoreNumeric = Boolean(isScoreNumeric);
    obj.maximumscore = maximumscore;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/InsertEvent",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            endurance_otherFields_update();
            loadAndReset_events();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_deleteRecord_events(id) {
    var obj = {};
    obj.id = id;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/DeleteEvent",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            showRecords_events();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_updateRecord_events(id, eventTypeId, eventNameId, description, isScoreNumeric, maximumscore) {
    var obj = {};
    obj.id = id;
    obj.eventTypeId = eventTypeId;
    obj.eventNameId = eventNameId;
    obj.description = description;
    obj.isScoreNumeric = Boolean(isScoreNumeric);
    obj.maximumscore = maximumscore;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/UpdateEvent",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            endurance_otherFields_update();
            loadAndReset_events();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_showRecords_events() {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetEvents",
        data: "",
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            waitON();
            $("#tbodyEvents").html('');

            dataset_events = response;

            for (var i = 0; i < dataset_events.length; i++) {

                var item = dataset_events[i]

                var text2Append = '';

                text2Append += '<tr>';

                text2Append += '<td>';
                text2Append += '<a class="btn-floating waves-effect waves-light ata-green" onclick="editRecord(' + i + ');"><i class="mdi mdi-pencil"></i></a>&nbsp;';
                var isReadonly = (!Boolean(item.ReadOnly)) ? ' ata-green' : ' gray disabled ';
                text2Append += '<a class="btn-floating waves-effect waves-light ' + isReadonly + '" onclick="deleteRecord(' + i + ');"><i class="mdi mdi-delete"></i></a>';
                text2Append += '</td>';

                text2Append += '<td>' + item.EventType.Name + '</td>';
                text2Append += '<td>' + item.EventName.Name + '</td>';
                text2Append += '<td>' + item.Description + '</td>';

                var scoreType = (Boolean(item.IsScoreNumeric)) ? 'Numeric (pt.)' : 'Timing (secs)';
                text2Append += '<td>' + scoreType + '</td>';

                var maximumscore = item.MaximumScore;
                if (Number(maximumscore == 0))
                    text2Append += '<td>-</td>';
                else
                    text2Append += '<td>' + maximumscore + '&nbsp;pt.</td>';

                text2Append += '</tr>';

                $("#tbodyEvents").append(text2Append);
            }
            $('#tEvents').stupidtable();
            waitOFF();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_showRecords_events_eventstypes(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetEventsTypes",
        data: "",
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            dataset_eventstypes = response;

            $('#eventtype').empty();

            $('#eventtype').append($('<option>', { value: '', text: 'Select an Event Type' }));

            for (var i = 0; i < dataset_eventstypes.length; i++) {
                var item = dataset_eventstypes[i];
                $('#eventtype').append($('<option>', { value: item.Id, text: item.Name }));
            }

            $('#eventtype').material_select();


        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_showRecords_events_eventsnames(id, preselectedValue) {
    var obj = {};
    obj.id = id;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetEventNameByEventTypeId",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            dataset_eventsnames = response;

            $('#eventname').empty();
            $('#eventname').append($('<option>', { value: '', text: 'Select an Event Name' }));

            for (var i = 0; i < dataset_eventsnames.length; i++) {
                var item = dataset_eventsnames[i];
                $('#eventname').append($('<option>', { value: item.Id, text: item.Name }));
            }

            $('#eventname').removeAttr('disabled');
            $('#eventname').material_select();

            if (preselectedValue.length > 0) {
                $('#eventname').val(preselectedValue);
                $('#eventname').material_select();
            }

            if (typeof (endurance_otherFields) == "function") {
                endurance_otherFields();
            }

        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_showRecords_eventsResults(id, classId) {

    var obj = {};
    obj.id = id;
    var theString = stringifyJSON(obj);
    var firstId, firstTab;

    if (id != 0) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetEventNameByEventTypeId",
            data: theString,
            dataType: "json",
            success: function (response) {
                if (response.hasOwnProperty("d")) { response = response.d; }
                dataset_eventsnames = response;
                $("#div_events").empty();
                $("#div_events").append('<div class=""> <ul id="tab_eventsResults"></ul>');
                // append tab headers
                for (var i = 0; i < dataset_eventsnames.length; i++) {
                    var item = dataset_eventsnames[i];
                    var myTab = item.Name.replace(/\s/g, '');
                    $('#tab_eventsResults').append('<li class="tab col s3 ata-green-text"><a href="#' + myTab + '" onclick=WS_showScoresEvent("' + item.Id + '","' + myTab + '","' + classId + '") data-id="' + item.Id + '">' + item.Name + '</a></li> ');
                    //append tabs div
                    if (i == 0) {
                        firstId = item.Id;
                        firstTab = myTab;
                    }
                }

                $("#div_events").append("</div>");
                $("#tab_eventsResults").addClass("tabs");
                $('#tab_eventsResults').tabs();
                WS_showScoresEvent(firstId.toString(), firstTab, classId);

            }, //success
            error: function (msg, error, errorThrown) {
                WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
            }
        });
    } else {
        var obj = {};
        obj.classid = classId;
        var theString = stringifyJSON(obj);
        $('#btnExport').attr('data-id', 0);
        $('#btnExportCSV').attr('data-id', 0);
        $("#div_events").empty();
        waitON();
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetOverallRanking",
            data: theString,
            dataType: "json",
            success: function (response) {
                if (response.hasOwnProperty("d")) { response = response.d; }

                $("#div_events").append('<table id="tabRankingOverall" class="responsive-table bordered centered hoverable" style="margin-top: 20px;"><thead><tr><th data-field="CarNum">Car No.</th><th data-field="TeamName">Team Name</th><th data-field="University" >University</th><th data-field="ScoreValue">Score</th><th data-field="PenalityScore">Penalties</th> <th data-field="CorrectedScore">Total Score</th></thead><tbody id="tbodyOverall">');

                var trophyImg = "";

                for (var i = 0; i < response.length; i++) {
                    console.log(response[i]);
                    var item = response[i];

                    var text2Append = "";

                    //Display the car with the color of the committee, if valued and whether to use
                    //otherwise, "mix" of colors (class ex4 in ATA.css) - req.Ciadamidaro Set 2015
                    if (i < 3) {
                        switch (i) {
                            case 0:
                                text2Append += '<tr class="firstPlace">';
                                break;
                            case 1:
                                text2Append += '<tr class="secondPlace">';
                                break;
                            case 2:
                                text2Append += '<tr class="thirdPlace">';
                                break;
                        }
                        trophyImg = "<i class='mdi mdi-trophy'></i>&nbsp;";
                    }
                    else {
                        text2Append += '<tr>';
                        trophyImg = "";
                    }

                    text2Append += '<td>' + trophyImg + item.CarNum + '</td>';
                    text2Append += '<td>' + item.TeamName + '</td>';
                    text2Append += '<td>' + item.University + '</td>';
                    text2Append += '<td>' + item.ScoreValue + '</td>';
                    text2Append += '<td>' + item.PenalityScore + '</td>';
                    text2Append += '<td>' + item.CorrectedScore + '</td>';

                    text2Append += '</tr>';

                    $("#tbodyOverall").append(text2Append);
                }
                $("#tbodyOverall").append('</tbody> </table>');
                waitOFF();

                enableExportButtons(response.length > 0);

            }, //success
            error: function (msg, error, errorThrown) {
                WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
            }
        });
    }
}

function enableExportButtons(bEnable)
{
    if (bEnable) {
        enableButton("#btnExport");
        enableButton("#btnExportCSV");
    }
    else {
        disableButton("#btnExport");
        disableButton("#btnExportCSV");
    }
}

function WS_showScoresEvent(id, name, classId) {
    var obj = {};
    obj.classId = classId;
    var theString = stringifyJSON(obj);

    waitON();
    $('#btnExport').attr('data-id', id);
    $('#btnExportCSV').attr('data-id', id);
    switch (id) {
        case TypeOfEventByName.Presentation.value:
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://77.108.25.178:782/services/ATA_WebService.asmx/CalculateScorePresentation",
                data: theString,
                dataType: "json",
                success: function (response) {
                    if (response.hasOwnProperty("d")) { response = response.d; }

                    if ($('#' + name).length) {
                        $("#" + name).empty();
                    }
                    else {
                        $("#div_events").append('<div id="' + name + '" data-id="' + id + '"  class="row col s12"></div>');
                    }

                	//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
                	//$("#" + name).append('<table id="tabRankingPresentation" class="responsive-table bordered centered hoverable" style="margin-top: 20px;"><thead><tr><th data-field="CarNum">Car No.</th><th data-field="TeamName">Team Name</th><th data-field="University" >University</th><th data-field="ScoreValue">Score</th><th data-field="NormalizedScore">Normalized Score</th></thead><tbody id="tbodyPresentation">');
                    $("#" + name).append('<table id="tabRankingPresentation" class="responsive-table bordered centered hoverable" style="margin-top: 20px;"><thead><tr><th data-field="CarNum">Car No.</th><th data-field="TeamName">Team Name</th><th data-field="University" >University</th><th data-field="ScoreValue">Score</th><th data-field="Finals">Finals</th><th data-field="NormalizedScore">Normalized Score</th></thead><tbody id="tbodyPresentation">');

                    for (var i = 0; i < response.length; i++) {
                        console.log(response[i]);
                        var item = response[i];

                        var text2Append = "";

                        //Display the car with the color of the committee, if valued and whether to use
                        //otherwise, "mix" of colors (class ex4 in ATA.css) - req.Ciadamidaro Set 2015
                        var trBackStyle = colorizeCar(item.CarColorMix, item.CarColor);

                        text2Append += '<tr' + trBackStyle + '>';

                        text2Append += '<td>' + item.CarNum + '</td>';
                        text2Append += '<td>' + item.TeamName + '</td>';
                        text2Append += '<td>' + item.University + '</td>';
                        text2Append += '<td>' + item.ScoreValue + '</td>';

                    	//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
                        text2Append += '<td>' + (item.FinalsScore) + '</td>';
                        text2Append += '<td>' + (item.NormalizedScore + item.FinalsScore) + '</td>';

                        text2Append += '</tr>';

                        $("#tbodyPresentation").append(text2Append);
                    }
                    $("#tbodyPresentation").append('</tbody> </table>');
                    $('#div_events').tabs();
                    waitOFF();

                    enableExportButtons(response.length > 0);

                }, //success
                error: function (msg, error, errorThrown) {
                    waitOFF();
                    WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
                }
            });
            break;
        case TypeOfEventByName.Cost.value:
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://77.108.25.178:782/services/ATA_WebService.asmx/CalculateScoreCost2015",
                data: theString,
                dataType: "json",
                success: function (response) {
                    if (response.hasOwnProperty("d")) { response = response.d; }

                    if ($('#' + name).length) {
                        $("#" + name).empty();
                    }
                    else {
                        $("#div_events").append('<div id="' + name + '" data-id="' + id + '"  class="row col s12"></div>');
                    }

                    $("#" + name).append('<table id="tabRankingCost" class="responsive-table bordered centered hoverable" style="margin-top: 20px;"><thead><tr><th data-field="CarNum">Car No.</th><th data-field="TeamName">Team Name</th><th data-field="University" >University</th><th data-field="ScoreValue">Score</th><th data-field="NormalizedScore">Normalized Score</th></thead><tbody id="tbodyCost">');

                    for (var i = 0; i < response.length; i++) {
                        var item = response[i];
                        var text2Append = "";

                        //Display the car with the color of the committee, if valued and whether to use
                        //otherwise, "mix" of colors (class ex4 in ATA.css) - req.Ciadamidaro Set 2015
                        var trBackStyle = colorizeCar(item.CarColorMix, item.CarColor);

                        text2Append += '<tr' + trBackStyle + '>';

                        text2Append += '<td>' + item.CarNum + '</td>';
                        text2Append += '<td>' + item.TeamName + '</td>';
                        text2Append += '<td>' + item.University + '</td>';
                        text2Append += '<td>' + item.ScoreValue + '</td>';
                        text2Append += '<td>' + item.NormalizedScore + '</td>';
                        text2Append += '</tr>';

                        $("#tbodyCost").append(text2Append);
                    }
                    $("#tbodyCost").append('</tbody> </table>');
                    $('#div_events').tabs();
                    waitOFF();

                    enableExportButtons(response.length > 0);

                }, //success
                error: function (msg, error, errorThrown) {
                    waitOFF();
                    WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
                }
            });
            break;
        case TypeOfEventByName.Design.value:
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://77.108.25.178:782/services/ATA_WebService.asmx/CalculateDesignScore",
                data: theString,
                dataType: "json",
                success: function (response) {
                    if (response.hasOwnProperty("d")) { response = response.d; }

                    if ($('#' + name).length) {
                        $("#" + name).empty();
                    }
                    else {
                        $("#div_events").append('<div id="' + name + '" data-id="' + id + '"  class="row col s12"></div>');
                    }

                    $("#" + name).append('<table id="tabRankingDesign" class="responsive-table bordered centered hoverable" style="margin-top: 20px;"><thead><tr><th data-field="CarNum">Car No.</th><th data-field="TeamName">Team Name</th><th data-field="University" >University</th><th data-field="ExamBoardName" data-sort="string">ExamBoard</th><th data-field="ScoreValue">Score</th><th data-field="NormalizedScore">Normalized Score</th></thead><tbody id="tbodyDesign">');

                    for (var i = 0; i < response.length; i++) {
                        var item = response[i];
                        var text2Append = "";

                        //Display the car with the color of the committee, if valued and whether to use
                        //otherwise, "mix" of colors (class ex4 in ATA.css) - req.Ciadamidaro Set 2015
                        var trBackStyle = colorizeCar(item.CarColorMix, item.CarColor);

                        text2Append += '<tr' + trBackStyle + '>';

                        text2Append += '<td>' + item.CarNum + '</td>';
                        text2Append += '<td>' + item.TeamName + '</td>';
                        text2Append += '<td>' + item.University + '</td>';
                        text2Append += '<td>' + item.ExamBoardName + '</td>';
                        text2Append += '<td>' + item.ScoreValue + '</td>';
                        text2Append += '<td>' + item.NormalizedScore + '</td>';
                        text2Append += '</tr>';

                        $("#tbodyDesign").append(text2Append);
                    }
                    $("#tbodyDesign").append('</tbody> </table>');
                    $('#div_events').tabs();
                    waitOFF();

                    enableExportButtons(response.length > 0);

                }, //success
                error: function (msg, error, errorThrown) {
                    waitOFF();
                    WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
                }
            });
            break;
        case TypeOfEventByName.Acceleration.value:
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://77.108.25.178:782/services/ATA_WebService.asmx/CalculateScoreAcceleration",
                data: theString,
                dataType: "json",
                success: function (response) {
                    if (response.hasOwnProperty("d")) { response = response.d; }

                    if ($('#' + name).length) {
                        $("#" + name).empty();
                    }
                    else {
                        $("#div_events").append('<div id="' + name + '" data-id="' + id + '"  class="row col s12"></div>');
                    }

                    $("#" + name).append('<table id="tabRankingAcceleration" class="responsive-table bordered centered hoverable" style="margin-top: 20px;"><thead><tr><th data-field="CarNum">Car No.</th><th data-field="TeamName">Team Name</th><th data-field="University" >University</th><th data-field="BestTime">Best Time</th><th data-field="ScoreValue">Score</th></thead><tbody id="tbodyAcc">');

                    for (var i = 0; i < response.length; i++) {
                        var item = response[i];
                        var text2Append = "";

                        //Display the car with the color of the committee, if valued and whether to use
                        //otherwise, "mix" of colors (class ex4 in ATA.css) - req.Ciadamidaro Set 2015
                        var trBackStyle = colorizeCar(item.CarColorMix, item.CarColor);

                        text2Append += '<tr' + trBackStyle + '>';

                        text2Append += '<td>' + item.CarNum + '</td>';
                        text2Append += '<td>' + item.TeamName + '</td>';
                        text2Append += '<td>' + item.University + '</td>';
                        text2Append += '<td>' + item.BestTime + '</td>';
                        text2Append += '<td>' + item.ScoreValue + '</td>';
                        text2Append += '</tr>';

                        $("#tbodyAcc").append(text2Append);
                    }
                    $("#tbodyAcc").append('</tbody> </table>');
                    $('#div_events').tabs();
                    waitOFF();

                    enableExportButtons(response.length > 0);

                }, //success
                error: function (msg, error, errorThrown) {
                    waitOFF();
                    WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
                }
            });
            break;
        case TypeOfEventByName.SkidPad.value:
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://77.108.25.178:782/services/ATA_WebService.asmx/CalculateScoreSkidPad",
                data: theString,
                dataType: "json",
                success: function (response) {
                    if (response.hasOwnProperty("d")) { response = response.d; }

                    if ($('#' + name).length) {
                        $("#" + name).empty();
                    }
                    else {
                        $("#div_events").append('<div id="' + name + '" data-id="' + id + '"  class="row col s12"></div>');
                    }

                    $("#" + name).append('<table id="tabRankingSkidPad" class="responsive-table bordered centered hoverable" style="margin-top: 20px;"><thead><tr><th data-field="CarNum">Car No.</th><th data-field="TeamName">Team Name</th><th data-field="University" >University</th><th data-field="BestTime">Best Time</th><th data-field="ScoreValue">Score</th></thead><tbody id="tbodySkidPad">');

                    for (var i = 0; i < response.length; i++) {
                        var item = response[i];
                        var text2Append = "";

                        //Display the car with the color of the committee, if valued and whether to use
                        //otherwise, "mix" of colors (class ex4 in ATA.css) - req.Ciadamidaro Set 2015
                        var trBackStyle = colorizeCar(item.CarColorMix, item.CarColor);

                        text2Append += '<tr' + trBackStyle + '>';

                        text2Append += '<td>' + item.CarNum + '</td>';
                        text2Append += '<td>' + item.TeamName + '</td>';
                        text2Append += '<td>' + item.University + '</td>';
                        text2Append += '<td>' + item.BestTime + '</td>';
                        text2Append += '<td>' + item.ScoreValue + '</td>';
                        text2Append += '</tr>';

                        $("#tbodySkidPad").append(text2Append);
                    }
                    $("#tbodySkidPad").append('</tbody> </table>');
                    $('#div_events').tabs();
                    waitOFF();

                    enableExportButtons(response.length > 0);

                }, //success
                error: function (msg, error, errorThrown) {
                    waitOFF();
                    WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
                }
            });
            break;
        case TypeOfEventByName.Autocross.value:
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://77.108.25.178:782/services/ATA_WebService.asmx/CalculateScoreAutocross",
                data: theString,
                dataType: "json",
                success: function (response) {
                    if (response.hasOwnProperty("d")) { response = response.d; }

                    if ($('#' + name).length) {
                        $("#" + name).empty();
                    }
                    else {
                        $("#div_events").append('<div id="' + name + '" data-id="' + id + '"  class="row col s12"></div>');
                    }

                    $("#" + name).append('<table id="tabRankingAutocross" class="responsive-table bordered centered hoverable" style="margin-top: 20px;"><thead><tr><th data-field="CarNum">Car No.</th><th data-field="TeamName">Team Name</th><th data-field="University" >University</th><th data-field="BestTime">Best Time</th><th data-field="ScoreValue">Score</th></thead><tbody id="tbodyAutocross">');

                    for (var i = 0; i < response.length; i++) {
                        var item = response[i];
                        var text2Append = "";

                        //Display the car with the color of the committee, if valued and whether to use
                        //otherwise, "mix" of colors (class ex4 in ATA.css) - req.Ciadamidaro Set 2015
                        var trBackStyle = colorizeCar(item.CarColorMix, item.CarColor);

                        text2Append += '<tr' + trBackStyle + '>';

                        text2Append += '<td>' + item.CarNum + '</td>';
                        text2Append += '<td>' + item.TeamName + '</td>';
                        text2Append += '<td>' + item.University + '</td>';
                        text2Append += '<td>' + item.BestTime + '</td>';
                        text2Append += '<td>' + item.ScoreValue + '</td>';
                        text2Append += '</tr>';

                        $("#tbodyAutocross").append(text2Append);
                    }
                    $("#tbodyAutocross").append('</tbody> </table>');
                    $('#div_events').tabs();
                    waitOFF();

                    enableExportButtons(response.length > 0);

                }, //success
                error: function (msg, error, errorThrown) {
                    waitOFF();
                    WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
                }
            });
            break;
        case TypeOfEventByName.Endurance.value:
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://77.108.25.178:782/services/ATA_WebService.asmx/CalculateScoreEndurance",
                data: theString,
                dataType: "json",
                success: function (response) {
                    if (response.hasOwnProperty("d")) { response = response.d; }

                    if ($('#' + name).length) {
                        $("#" + name).empty();
                    }
                    else {
                        $("#div_events").append('<div id="' + name + '" data-id="' + id + '"  class="row col s12"></div>');
                    }

                    $("#" + name).append('<table id="tabRankingEndurance" class="responsive-table bordered centered hoverable" style="margin-top: 20px;"><thead><tr><th data-field="CarNum">Car No.</th><th data-field="TeamName">Team Name</th><th data-field="Laps">Laps</th><th data-field="AdjTime">AdjTimes</th><th data-field="EnduranceScore">Endurance Score </th><th data-field="EfficienctyScore">Efficiency Score</th><th data-field="ScoreValue">Total Score</th><th>&nbsp</th></thead><tbody id="tbodyEndurance">');

                    for (var i = 0; i < response.length; i++) {
                        var item = response[i];
                        var text2Append = "";
                        //Display the car with the color of the committee, if valued and whether to use
                        //otherwise, "mix" of colors (class ex4 in ATA.css) - req.Ciadamidaro Set 2015
                        var trBackStyle = colorizeCar(item.CarColorMix, item.CarColor);

                        text2Append += '<tr' + trBackStyle + '>';

                        text2Append += '<td>' + item.CarNum + '</td>';
                        text2Append += '<td>' + item.TeamName + '</td>';
                        text2Append += '<td>' + item.Laps + '</td>';
                        text2Append += '<td>' + item.AdjTime + '</td>';
                        text2Append += '<td>' + item.EnduranceScore + '</td>';
                        text2Append += '<td>' + item.EfficiencyScore + '</td>';
                        text2Append += '<td>' + item.TotalScore + '</td>';
                        text2Append += '<td><i class="secondary-content mdi mdi-eye" style="cursor: pointer;" onclick="showDetail(' + item.Id + '); return false"></i></td>'
                        text2Append += '</tr>';

                        $("#tbodyEndurance").append(text2Append);
                    }
                    $("#tbodyEndurance").append('</tbody> </table>');
                    $('#div_events').tabs();
                    waitOFF();

                    enableExportButtons(response.length > 0);

                }, //success
                error: function (msg, error, errorThrown) {
                    waitOFF();
                    WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
                }
            });
            break;
    }

}

function WS_showRecords_scores_cars_classes(preselectedClass) {

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetScoresClassesEvents",
        data: "",
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            waitON();
            $("#divScores_cars_classes").html('');

            dataset_scores_cars_classes = response;

            var currentClass = '';
            var currentClassInside = '';

            var text2append = '';

            if (dataset_scores_cars_classes.length > 0) {
                text2append = '<ul class="collapsible" data-collapsible="accordion">';

                for (var i = 0; i < dataset_scores_cars_classes.length; i++) {
                    var item = dataset_scores_cars_classes[i];
                    var lineId = item.ClassId.toString();

                    if (currentClass.toString() != lineId.toString()) {

                        var active = (lineId == preselectedClass) ? ' active ' : '';

                        //New car class
                        text2append += '<li>';
                        text2append += '<div class="collapsible-header ata-red white-text ' + active + '"><i class="mdi mdi-car"></i>CLASS ' + item.ClassName.toString() + '</div>';
                        text2append += '<div class="collapsible-body">';
                        text2append += '<div class="collection">';

                        currentClassInside = item.ClassId.toString();
                    }

                    var eventtypeInside = '';
                    var colorCounter = 0;
                    var color = 0;

                    for (var j = i; j < dataset_scores_cars_classes.length; j++) {
                        var itemInside = dataset_scores_cars_classes[j];
                        var lineIdInside = itemInside.ClassId.toString();

                        if (eventtypeInside != itemInside.EventTypeId.toString()) {
                            //Event has been changed, so change the color
                            eventtypeInside = itemInside.EventTypeId.toString();
                            colorCounter++;
                        }

                        if (currentClassInside.toString() == lineIdInside.toString()) {
                            //Same class, different event, add new line
                            var eventid = itemInside.EventId.toString();
                            var description = itemInside.Description.toString();
                            var eventnameid = itemInside.EventNameId.toString();
                            var eventname = itemInside.EventName.toString();
                            var eventtypeid = itemInside.EventTypeId.toString();
                            var eventtypename = itemInside.EventTypeName.toString();

                            var lineText = eventname.toString().bold() + ' ' + description;
                            color = (colorCounter % 2 == 0) ? ' ata-green-text' : ' ata-red-text';
                            var scorePresent = (parseFloat(itemInside.GivenScore) > 0) ? '<span class="badge"><i class="small mdi mdi-poll" title="Scores available"></i></span>' : '';
                            text2append += '<a href="#!" class="collection-item ' + color + '" onclick="editRecord(' + currentClassInside + ', ' + eventid + ');"><i class="mdi mdi-timer"></i>&nbsp;' + lineText + '</i>' + scorePresent + '</a>';
                            i++;
                        }
                        else {
                            i = --j;
                            break;
                        }
                    }

                    if (currentClass.toString() != lineId.toString()) {
                        //Class changes, close the item
                        text2append += ' </div>';
                        text2append += '</div>';
                        text2append += '</li>';
                    }

                    currentClass = lineId;
                }
                text2append += '</ul>';
                $("#divScores_cars_classes").append(text2append);

                $('.collapsible').collapsible({
                    accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                });
            }
            waitOFF();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_showRecords_scores(classid, eventid) {
    var obj = {};
    obj.classid = classid;
    obj.eventid = eventid;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetScoresByClassAndEvent",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            waitON();
            $("#tbodyScores").html('');

            dataset_scores_bycar = response;

            //Event 2018 - Show partials scores for Presentation and Design
            //Will contains scores list ids
            var scoresidlist = new Array();

            for (var i = 0; i < dataset_scores_bycar.length; i++) {
                var item = dataset_scores_bycar[i];

                var lineId = '_' + item.CarId;

                var editParameters = item.ClassId + ',' + item.EventId + ',' + item.CarId + ',' + item.ScoreId + ',\'' + item.PageToJump + '\'' + ',' + item.MaximumScore + ',' + item.GivenScore + ',' + item.CarNo + ',' + item.FuelId;

                var text2Append = '';
                var deliveryDocDateParsed = datefyJSON(item.DeliveryDocDate);

                //Electric Car has to be green-colored - req.Ciadamidaro Set 2015
                var trClassName = '';
                if (Boolean(item.IsAnElectricCar)) {
                    trClassName = " class='electric' ";
                }
                else {
                    trClassName = " class='not-electric' ";
                }

                //Event 2018 - Show partials scores for Presentation and Design
                //I give to row an attribute to easily find it if i have to add partial scores
                trDataScoreId = " data-scoreid ='" + item.ScoreId + "' ";
                text2Append += '<tr' + trClassName + trDataScoreId + '>';

                text2Append += '<td align="right">';
                text2Append += '<a class="btn-floating waves-effect waves-light ata-green" id="iframe" onclick="editRecord(' + editParameters + ');" href="#"><i class="mdi mdi-pencil"></i></a>&nbsp;';
                text2Append += '</td>';

                text2Append += '<td>' + item.CarNo + '</td>';
                text2Append += '<td>' + item.TeamName + '</td>';
                text2Append += '<td>' + item.University + '</td>';
                text2Append += '<td>' + item.ExamBoardName + '</td>';
                var totScore = item.GivenScore;
                if (totScore != 0)
                    text2Append += '<td class="bold">' + item.GivenScore + '</td>';
                else
                    text2Append += '<td class="bold"> 0 </td>';

                //var score = item.GivenScore;
                //text2Append += '<td><div class="input-field" col s1>';
                //text2Append += score;
                //text2Append += '</div></td>';
                text2Append += '</tr>';

                $("#tbodyScores").append(text2Append);

                //Event 2018 - Show partials scores for Presentation and Design
                //Add score to list
                scoresidlist.push(item.ScoreId);
            }
            $('#tScoreCar').stupidtable();
            waitOFF();

            //Event 2018 - Show partials scores for Presentation and Design
            //For all rows add partial scores (for the involved events)
            if (item.PageToJump.indexOf(TypeOfEventByName.Presentation.name) != -1)
                WS_showRecords_scores_presentation_partial(scoresidlist.join(","));
            if ((item.PageToJump.indexOf(TypeOfEventByName.Design.name) != -1) && (item.PageToJump.indexOf('1C3') != -1))
                WS_showRecords_scores_design1C3_partial(scoresidlist.join(","));
            if ((item.PageToJump.indexOf(TypeOfEventByName.Design.name) != -1) && (item.PageToJump.indexOf('1E') != -1))
                WS_showRecords_scores_design1E_partial(scoresidlist.join(","));

        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_insertMultipleRecord_scores(multipleScores2Insert) {
    var obj = {};
    obj.pairs = multipleScores2Insert;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/InsertScoresOneShot",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_insertRecord_scores(eventid, carid, score, penalityscore, penalitynotes, correctedscore) {
    var obj = {};
    obj.eventid = eventid;
    obj.carid = carid;
    obj.givenscore = score;
    obj.penalityscore = penalityscore;
    obj.penalitynotes = penalitynotes;
    obj.correctedscore = correctedscore;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/InsertScore",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_deleteRecord_scores(eventid, carid) {
    var obj = {};
    obj.eventid = eventid;
    obj.carid = carid;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/DeleteScoresOneShot",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            showRecords_scores();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_updateRecord_scores(eventid, carid, score, penalityscore, penalitynotes, correctedscore) {
    var obj = {};
    obj.eventid = eventid;
    obj.carid = carid;
    obj.givenscore = score;
    obj.penalityscore = penalityscore;
    obj.penalitynotes = penalitynotes;
    obj.correctedscore = correctedscore;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/UpdateScore",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_updateRecord_scores_score(id, score) {
    var obj = {};
    obj.id = id;
    obj.givenscore = score;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/UpdateScoreGivenScore",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_showRecords_scores_eventdetails(classid, eventid) {
    var obj = {};
    obj.classid = classid;
    obj.eventid = eventid;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetScoreEventDetail",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            var item = response;

            $('#classname').val(item.ClassName);
            $('#eventtypename').val(item.EventTypeName);
            $('#eventname').val(item.EventName);
            $('#description').val(item.Description);
            $('#classname-spn').html(item.ClassName);
            $('#eventtypename-spn').html(item.EventTypeName);
            $('#eventname-spn').html(item.EventName);
            $('#description-spn').html(item.Description);
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function showRecords_scores_cars_fuels(carid, fuelid) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetFuels",
        data: "",
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            dataset_fuels = response;

            $('#fuelid_' + carid).empty();

            $('#fuelid_' + carid).append($('<option>', { value: '', text: 'Select a Fuel' }));

            for (var i = 0; i < dataset_fuels.length; i++) {
                var item = dataset_fuels[i];
                $('#fuelid_' + carid).append($('<option>', { value: item.Id, text: item.Name }));
            }

            $('#fuelid_' + carid).val(fuelid);
            $('#fuelid_' + carid).material_select();

        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_configuration_download(examboardid) {
    var obj = {};
    obj.examboardid = examboardid;
    var theString = JSON.stringify(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_ExportService.asmx/ConfigurationDownload",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            ataToast("Requesting configuration...", 4000);

            WS_dataset_configuration_dn = response;

            configuration_download_step1();

        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error(msg, error, errorThrown);
        }
    });
}

//SERVER SIDE ONLY: the total score (automatically calculated) can be modified by the user - req.Ciadamidaro Set 2015
//So add total as parameter
function WS_insertRecord_scores_design1E(eventid, carid, scoreid, suspension, framebodyaero, tractivedriverecoverysystem, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, overall, suspensionnotes, framebodyaeronotes, tractivedriverecoverysystemnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes) {
    var obj = {};
    obj.eventid = eventid;
    obj.carid = carid;
    obj.scoreid = scoreid;
    obj.suspension = suspension;
    obj.framebodyaero = framebodyaero;
    obj.tractivedriverecoverysystem = tractivedriverecoverysystem;
    obj.cockpitcontrolsbrakessafety = cockpitcontrolsbrakessafety;
    obj.systemmanagementintegration = systemmanagementintegration;
    obj.manufacturabilityserviceability = manufacturabilityserviceability;
    obj.aestheticsstyle = aestheticsstyle;
    obj.creativity = creativity;
    obj.carweight = carweight;
    obj.overall = overall;

    obj.suspensionnotes = suspensionnotes;
    obj.framebodyaeronotes = framebodyaeronotes;
    obj.tractivedriverecoverysystemnotes = tractivedriverecoverysystemnotes;
    obj.cockpitcontrolsbrakessafetynotes = cockpitcontrolsbrakessafetynotes;
    obj.systemmanagementintegrationnotes = systemmanagementintegrationnotes;
    obj.manufacturabilityserviceabilitynotes = manufacturabilityserviceabilitynotes;
    obj.aestheticsstylenotes = aestheticsstylenotes;
    obj.creativitynotes = creativitynotes;

    obj.miscellaneous = miscellaneous;
    obj.miscellaneousnotes = miscellaneousnotes;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/InsertScoreDesign1E",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            backToScores();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

//SERVER SIDE ONLY: the total score (automatically calculated) can be modified by the user - req.Ciadamidaro Set 2015
//So add total as parameter
function WS_updateRecord_scores_design1E(scoreid, suspension, framebodyaero, tractivedriverecoverysystem, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, overall, suspensionnotes, framebodyaeronotes, tractivedriverecoverysystemnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes) {
    var obj = {};
    obj.scoreid = scoreid;
    obj.suspension = suspension;
    obj.framebodyaero = framebodyaero;
    obj.tractivedriverecoverysystem = tractivedriverecoverysystem;
    obj.cockpitcontrolsbrakessafety = cockpitcontrolsbrakessafety;
    obj.systemmanagementintegration = systemmanagementintegration;
    obj.manufacturabilityserviceability = manufacturabilityserviceability;
    obj.aestheticsstyle = aestheticsstyle;
    obj.creativity = creativity;
    obj.carweight = carweight;
    obj.overall = overall;

    obj.suspensionnotes = suspensionnotes;
    obj.framebodyaeronotes = framebodyaeronotes;
    obj.tractivedriverecoverysystemnotes = tractivedriverecoverysystemnotes;
    obj.cockpitcontrolsbrakessafetynotes = cockpitcontrolsbrakessafetynotes;
    obj.systemmanagementintegrationnotes = systemmanagementintegrationnotes;
    obj.manufacturabilityserviceabilitynotes = manufacturabilityserviceabilitynotes;
    obj.aestheticsstylenotes = aestheticsstylenotes;
    obj.creativitynotes = creativitynotes;

    obj.miscellaneous = miscellaneous;
    obj.miscellaneousnotes = miscellaneousnotes;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/UpdateScoreDesign1E",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            backToScores();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_deleteRecord_scores_design1E(scoreid) {
    var obj = {};
    obj.scoreid = scoreid;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/DeleteScoreDesign1E",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_showRecords_scores_design1E(scoreid) {
    var obj = {};
    obj.scoreid = scoreid;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetScoreDesign1E",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            waitON();

            var id = -1;
            var scoreid = -1;
            var suspension = 0;
            var framebodyaero = 0;
            var tractivedriverecoverysystem = 0;
            var cockpitcontrolsbrakessafety = 0;
            var systemmanagementintegration = 0;
            var manufacturabilityserviceability = 0;
            var aestheticsstyle = 0;
            var creativity = 0;
            var carweight = 0;

            var suspensionnotes = '';
            var framebodyaeronotes = '';
            var tractivedriverecoverysystemnotes = '';
            var cockpitcontrolsbrakessafetynotes = '';
            var systemmanagementintegrationnotes = '';
            var manufacturabilityserviceabilitynotes = '';
            var aestheticsstylenotes = '';
            var creativitynotes = '';

            var miscellaneous = 0;
            var miscellaneousnotes = '';

            if (response != null) {
                var item = response;

                id = item.Id;
                scoreid = item.Score.Id;
                suspension = item.Suspension;
                framebodyaero = item.FrameBodyAero;
                tractivedriverecoverysystem = item.TractiveDriveRecoverySystem;
                cockpitcontrolsbrakessafety = item.CockpitControlsBrakesSafety;
                systemmanagementintegration = item.SystemManagementIntegration;
                manufacturabilityserviceability = item.ManufacturabilityServiceability;
                aestheticsstyle = item.AestheticsStyle;
                creativity = item.Creativity;
                carweight = item.CarWeight;

                suspensionnotes = item.SuspensionNotes;
                framebodyaeronotes = item.FrameBodyAeroNotes;
                tractivedriverecoverysystemnotes = item.TractiveDriveRecoverySystemNotes;
                cockpitcontrolsbrakessafetynotes = item.CockpitControlsBrakesSafetyNotes;
                systemmanagementintegrationnotes = item.SystemManagementIntegrationNotes;
                manufacturabilityserviceabilitynotes = item.ManufacturabilityServiceabilityNotes;
                aestheticsstylenotes = item.AestheticsStyleNotes;
                creativitynotes = item.CreativityNotes;

                miscellaneous = item.Miscellaneous;
                miscellaneousnotes = item.MiscellaneousNotes;
            }

            $("#id").val(id);
            $("#scoreid").val(scoreid);
            $("#suspension").val(suspension);
            $("#framebody").val(framebodyaero);
            $("#tractive").val(tractivedriverecoverysystem);
            $("#cockpit").val(cockpitcontrolsbrakessafety);
            $("#systemmanag").val(systemmanagementintegration);
            $("#manufact").val(manufacturabilityserviceability);
            $("#aesthetics").val(aestheticsstyle);
            $("#creativity").val(creativity);
            $("#carweight").val(carweight);

            $("#suspensionnotes").val(suspensionnotes);
            $("#framebodynotes").val(framebodyaeronotes);
            $("#tractivenotes").val(tractivedriverecoverysystemnotes);
            $("#cockpitnotes").val(cockpitcontrolsbrakessafetynotes);
            $("#systemmanagnotes").val(systemmanagementintegrationnotes);
            $("#manufactnotes").val(manufacturabilityserviceabilitynotes);
            $("#aestheticsnotes").val(aestheticsstylenotes);
            $("#creativitynotes").val(creativitynotes);

            $("#miscellaneous").val(miscellaneous);
            $("#miscellaneousnotes").val(miscellaneousnotes);

            //Event 2017 - Display partial totals on section title
            $("#suspensionBadge").html(suspension);
            $("#framebodyBadge").html(framebodyaero);
            $("#tractiveBadge").html(tractivedriverecoverysystem);
            $("#cockpitBadge").html(cockpitcontrolsbrakessafety);
            $("#systemmanagBadge").html(systemmanagementintegration);
            $("#manufactBadge").html(manufacturabilityserviceability);
            $("#aestheticsBadge").html(aestheticsstyle);
            $("#creativityBadge").html(creativity);
            $("#miscellaneousBadge").html(miscellaneous);

            waitOFF();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

//SERVER SIDE ONLY: the total score (automatically calculated) can be modified by the user - req.Ciadamidaro Set 2015
//So add total as parameter
function WS_insertRecord_scores_design1C3(eventid, carid, scoreid, suspension, framebodyaero, powertrain, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, overall, suspensionnotes, framebodyaeronotes, powertrainnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes) {
    var obj = {};
    obj.eventid = eventid;
    obj.carid = carid;
    obj.scoreid = scoreid;
    obj.suspension = suspension;
    obj.framebodyaero = framebodyaero;
    obj.powertrain = powertrain;
    obj.cockpitcontrolsbrakessafety = cockpitcontrolsbrakessafety;
    obj.systemmanagementintegration = systemmanagementintegration;
    obj.manufacturabilityserviceability = manufacturabilityserviceability;
    obj.aestheticsstyle = aestheticsstyle;
    obj.creativity = creativity;
    obj.carweight = carweight;
    obj.overall = overall;

    obj.suspensionnotes = suspensionnotes;
    obj.framebodyaeronotes = framebodyaeronotes;
    obj.powertrainnotes = powertrainnotes;
    obj.cockpitcontrolsbrakessafetynotes = cockpitcontrolsbrakessafetynotes;
    obj.systemmanagementintegrationnotes = systemmanagementintegrationnotes;
    obj.manufacturabilityserviceabilitynotes = manufacturabilityserviceabilitynotes;
    obj.aestheticsstylenotes = aestheticsstylenotes;
    obj.creativitynotes = creativitynotes;

    obj.miscellaneous = miscellaneous;
    obj.miscellaneousnotes = miscellaneousnotes;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/InsertScoreDesign1C3",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            backToScores();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

//SERVER SIDE ONLY: the total score (automatically calculated) can be modified by the user - req.Ciadamidaro Set 2015
//So add total as parameter
function WS_updateRecord_scores_design1C3(scoreid, suspension, framebodyaero, powertrain, cockpitcontrolsbrakessafety, systemmanagementintegration, manufacturabilityserviceability, aestheticsstyle, creativity, carweight, overall, suspensionnotes, framebodyaeronotes, powertrainnotes, cockpitcontrolsbrakessafetynotes, systemmanagementintegrationnotes, manufacturabilityserviceabilitynotes, aestheticsstylenotes, creativitynotes, miscellaneous, miscellaneousnotes) {
    var obj = {};
    obj.scoreid = scoreid;
    obj.suspension = suspension;
    obj.framebodyaero = framebodyaero;
    obj.powertrain = powertrain;
    obj.cockpitcontrolsbrakessafety = cockpitcontrolsbrakessafety;
    obj.systemmanagementintegration = systemmanagementintegration;
    obj.manufacturabilityserviceability = manufacturabilityserviceability;
    obj.aestheticsstyle = aestheticsstyle;
    obj.creativity = creativity;
    obj.carweight = carweight;
    obj.overall = overall;

    obj.suspensionnotes = suspensionnotes;
    obj.framebodyaeronotes = framebodyaeronotes;
    obj.powertrainnotes = powertrainnotes;
    obj.cockpitcontrolsbrakessafetynotes = cockpitcontrolsbrakessafetynotes;
    obj.systemmanagementintegrationnotes = systemmanagementintegrationnotes;
    obj.manufacturabilityserviceabilitynotes = manufacturabilityserviceabilitynotes;
    obj.aestheticsstylenotes = aestheticsstylenotes;
    obj.creativitynotes = creativitynotes;

    obj.miscellaneous = miscellaneous;
    obj.miscellaneousnotes = miscellaneousnotes;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/UpdateScoreDesign1C3",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            backToScores();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_deleteRecord_scores_design1C3(scoreid) {
    var obj = {};
    obj.scoreid = scoreid;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/DeleteScoreDesign1C3",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_showRecords_scores_design1C3(scoreid) {
    var obj = {};
    obj.scoreid = scoreid;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetScoreDesign1C3",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            waitON();

            var id = -1;
            var scoreid = -1;
            var suspension = 0;
            var framebodyaero = 0;
            var powertrain = 0;
            var cockpitcontrolsbrakessafety = 0;
            var systemmanagementintegration = 0;
            var manufacturabilityserviceability = 0;
            var aestheticsstyle = 0;
            var creativity = 0;
            var carweight = 0;

            var suspensionnotes = '';
            var framebodyaeronotes = '';
            var powertrainnotes = '';
            var cockpitcontrolsbrakessafetynotes = '';
            var systemmanagementintegrationnotes = '';
            var manufacturabilityserviceabilitynotes = '';
            var aestheticsstylenotes = '';
            var creativitynotes = '';

            var miscellaneous = 0;
            var miscellaneousnotes = '';

            if (response != null) {
                var item = response;

                id = item.Id;
                scoreid = item.Score.Id;
                suspension = item.Suspension;
                framebodyaero = item.FrameBodyAero;
                powertrain = item.Powertrain;
                cockpitcontrolsbrakessafety = item.CockpitControlsBrakesSafety;
                systemmanagementintegration = item.SystemManagementIntegration;
                manufacturabilityserviceability = item.ManufacturabilityServiceability;
                aestheticsstyle = item.AestheticsStyle;
                creativity = item.Creativity;
                carweight = item.CarWeight;

                suspensionnotes = item.SuspensionNotes;
                framebodyaeronotes = item.FrameBodyAeroNotes;
                powertrainnotes = item.PowertrainNotes;
                cockpitcontrolsbrakessafetynotes = item.CockpitControlsBrakesSafetyNotes;
                systemmanagementintegrationnotes = item.SystemManagementIntegrationNotes;
                manufacturabilityserviceabilitynotes = item.ManufacturabilityServiceabilityNotes;
                aestheticsstylenotes = item.AestheticsStyleNotes;
                creativitynotes = item.CreativityNotes;

                miscellaneous = item.Miscellaneous;
                miscellaneousnotes = item.MiscellaneousNotes;
            }

            $("#id").val(id);
            $("#scoreid").val(scoreid);
            $("#suspension").val(suspension);
            $("#framebody").val(framebodyaero);
            $("#powertrain").val(powertrain);
            $("#cockpit").val(cockpitcontrolsbrakessafety);
            $("#systemmanag").val(systemmanagementintegration);
            $("#manufact").val(manufacturabilityserviceability);
            $("#aesthetics").val(aestheticsstyle);
            $("#creativity").val(creativity);
            $("#carweight").val(carweight);

            $("#suspensionnotes").val(suspensionnotes);
            $("#framebodynotes").val(framebodyaeronotes);
            $("#powertrainnotes").val(powertrainnotes);
            $("#cockpitnotes").val(cockpitcontrolsbrakessafetynotes);
            $("#systemmanagnotes").val(systemmanagementintegrationnotes);
            $("#manufactnotes").val(manufacturabilityserviceabilitynotes);
            $("#aestheticsnotes").val(aestheticsstylenotes);
            $("#creativitynotes").val(creativitynotes);

            $("#miscellaneous").val(miscellaneous);
            $("#miscellaneousnotes").val(miscellaneousnotes);

            //Event 2017 - Display partial totals on section title
            $("#suspensionBadge").html(suspension);
            $("#framebodyBadge").html(framebodyaero);
            $("#powertrainBadge").html(powertrain);
            $("#cockpitBadge").html(cockpitcontrolsbrakessafety);
            $("#systemmanagBadge").html(systemmanagementintegration);
            $("#manufactBadge").html(manufacturabilityserviceability);
            $("#aestheticsBadge").html(aestheticsstyle);
            $("#creativityBadge").html(creativity);
            $("#miscellaneousBadge").html(miscellaneous);

            waitOFF();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

//SERVER SIDE ONLY: the total score (automatically calculated) can be modified by the user - req.Ciadamidaro Set 2015
//so get the value from the Scores table
function WS_showRecords_scores_presentation(scoreid) {
    var obj = {};
    obj.scoreid = scoreid;
    var theString = stringifyJSON(obj);
    
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetScorePresentation",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            waitON();

            if (response != null) {
                scoreP.id = response.Id;
                scoreP.scoreid						= response.Score.Id;

            	//Event 2019 - Presentation Event has been changed
            	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
                //scoreP.executiveSummary[0] = response.ExecutiveSummary0;
                //scoreP.executiveSummary[1]		= response.ExecutiveSummary1;
                //scoreP.executiveSummary[2]		= response.ExecutiveSummary2;
                //scoreP.executiveSummary[3]		= response.ExecutiveSummary3;
                //scoreP.executiveSummaryNotes		= response.ExecutiveSummaryNotes;

                scoreP.novelty[0]						= response.Novelty0;
                scoreP.novelty[1]						= response.Novelty1;
                scoreP.novelty[2]						= response.Novelty2;
            	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte novelty3
                //scoreP.novelty[3]						= response.Novelty3;
                scoreP.noveltyNotes						= response.NoveltyNotes;

                scoreP.content[0]						= response.Content0;
                scoreP.content[1]						= response.Content1;
                scoreP.content[2]						= response.Content2;
                scoreP.content[3]						= response.Content3;
                scoreP.content[4]						= response.Content4;
                scoreP.content[5]						= response.Content5;
                scoreP.content[6]						= response.Content6;
                scoreP.content[7]						= response.Content7;
                scoreP.content[8]						= response.Content8;
            	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN Add Content9
                //scoreP.content[9]						= response.Content9;

                scoreP.contentNotes						= response.ContentNotes;

            	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte Finances2 e Finances4
                scoreP.finances[0]						= response.Finances0;
                scoreP.finances[1]						= response.Finances1;
                scoreP.finances[2]						= response.Finances2;
                //scoreP.finances[3]					= response.Finances3;
                //scoreP.finances[4]					= response.Finances4;
                //scoreP.finances[5]					= response.Finances5;
                //scoreP.finances[6]					= response.Finances6;
                scoreP.financesNotes					= response.FinancesNotes;

                scoreP.deepDiveTopic[0]					= response.DeepDiveTopic0;
                scoreP.deepDiveTopic[1]					= response.DeepDiveTopic1;
                scoreP.deepDiveTopic[2]					= response.DeepDiveTopic2;
                //scoreP.deepDiveTopic[3]					= response.DeepDiveTopic3;
            	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add deepdivetopic4
                //scoreP.deepDiveTopic[4]					= response.DeepDiveTopic4;
                scoreP.deepDiveTopicNotes				= response.DeepDiveTopicNotes;

            	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery> - BEGIN
                scoreP.demonstrationAndDelivery[0]		= response.DemonstrationAndDelivery0;
                scoreP.demonstrationAndDelivery[1]		= response.DemonstrationAndDelivery1;
                scoreP.demonstrationAndDelivery[2]		= response.DemonstrationAndDelivery2;
                scoreP.demonstrationAndDelivery[3]		= response.DemonstrationAndDelivery3;
                scoreP.demonstrationAndDelivery[4]		= response.DemonstrationAndDelivery4;
                //scoreP.demonstrationAndDelivery[5]		= response.DemonstrationAndDelivery5;
                scoreP.demonstrationAndDeliveryNotes	= response.DemonstrationAndDeliveryNotes;                
            	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery> - END

                scoreP.demonstrationAndStructure[0]		= response.DemonstrationAndStructure0;
                scoreP.demonstrationAndStructure[1]		= response.DemonstrationAndStructure1;
                scoreP.demonstrationAndStructure[2]		= response.DemonstrationAndStructure2;
                scoreP.demonstrationAndStructure[3]		= response.DemonstrationAndStructure3;
                scoreP.demonstrationAndStructure[4]		= response.DemonstrationAndStructure4;
                scoreP.demonstrationAndStructureNotes	= response.DemonstrationAndStructureNotes;

                scoreP.delivery[0]						= response.Delivery0;
                scoreP.delivery[1]						= response.Delivery1;
                scoreP.delivery[2]						= response.Delivery2;
                scoreP.delivery[3]						= response.Delivery3;
                scoreP.delivery[4]						= response.Delivery4;
                scoreP.delivery[5]						= response.Delivery5;
                scoreP.delivery[6]						= response.Delivery6;
                scoreP.delivery[7]						= response.Delivery7;
                scoreP.delivery[8]						= response.Delivery8;
                scoreP.deliveryNotes					= response.DeliveryNotes;

                scoreP.questions[0]						= response.Questions0;
                scoreP.questions[1]						= response.Questions1;
                scoreP.questions[2]						= response.Questions2;
                scoreP.questions[3]						= response.Questions3;
                scoreP.questions[4]						= response.Questions4;
                scoreP.questions[5]						= response.Questions5;
                scoreP.questions[6]						= response.Questions6;
                scoreP.questions[7]						= response.Questions7;
                scoreP.questions[8]						= response.Questions8;
                scoreP.questions[9]						= response.Questions9;
                scoreP.questionsNotes					= response.QuestionsNotes;

                scoreP.generalImpression[0]				= response.GeneralImpression0;
                scoreP.generalImpression[1]				= response.GeneralImpression1;
                scoreP.generalImpression[2]				= response.GeneralImpression2;
                scoreP.generalImpressionNotes			= response.GeneralImpressionNotes;

                scoreP.miscellaneous					= response.Miscellaneous;
                scoreP.miscellaneousNotes				= response.MiscellaneousNotes;

                scoreP.presentationNotes				= response.PresentationNotes;
                scoreP.totalPresentation				= response.Score.GivenScore;

                //FD 2021.07.27 - ATA 2021  - Add Stage1
                scoreP.stage1							= response.Stage1;

            	//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
                scoreP.finals							= response.Finals;

            	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
                //BUSINESSFIGURE
                scoreP.st2BusinnesFigures[0]			= response.St2BusinnesFigures0;
                scoreP.st2BusinnesFigures[1]			= response.St2BusinnesFigures1;
                scoreP.st2BusinnesFigures[2]			= response.St2BusinnesFigures2;
                scoreP.st2BusinnesFigures[3]			= response.St2BusinnesFigures3;
                //FDT - ATA 2022 - modify Stage 2
                //scoreP.st2BusinnesFigures[4]			= response.St2BusinnesFigures4;
                scoreP.st2BusinnesFiguresNotes			= response.St2BusinnesFiguresNotes;

				//CONTENT
                scoreP.st2Content[0]					= response.St2Content0;
                scoreP.st2Content[1]					= response.St2Content1;
                scoreP.st2Content[2]					= response.St2Content2;
                scoreP.st2Content[3]					= response.St2Content3;
                scoreP.st2Content[4]					= response.St2Content4;
                scoreP.st2ContentNotes					= response.St2ContentNotes;

                //DEMONSTRATIONANDDELIVERY
                scoreP.st2DemonstrationAndDelivery[0]	= response.St2DemonstrationAndDelivery0;
                scoreP.st2DemonstrationAndDelivery[1]	= response.St2DemonstrationAndDelivery1;
                scoreP.st2DemonstrationAndDelivery[2]	= response.St2DemonstrationAndDelivery2;
                scoreP.st2DemonstrationAndDelivery[3]	= response.St2DemonstrationAndDelivery3;
                scoreP.st2DemonstrationAndDelivery[4]	= response.St2DemonstrationAndDelivery4;
                scoreP.st2DemonstrationAndDeliveryNotes = response.St2DemonstrationAndDeliveryNotes;
                

				//INVESTITORS)
                scoreP.st2Investitors[0]				= response.St2Investitors0;
                scoreP.st2Investitors[1]				= response.St2Investitors1;
                scoreP.st2Investitors[2]				= response.St2Investitors2;
                //FDT - ATA 2022 - modify Stage 2
                //scoreP.st2Investitors[3]				= response.St2Investitors3;
                scoreP.st2InvestitorsNotes				= response.St2InvestitorsNotes;
            	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

                scoreP.Debug();
			}

            $("#id").val(scoreP.id);
            $("#scoreid").val(scoreP.scoreid);

        	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
            //$.each(scoreP.executiveSummary, function (index, value) {
            //	$("#chkExecutiveSummary" + index).prop('checked', (parseFloat(value) > 0));
            //	scoreP.totalExecutiveSummary += parseFloat(value);
            //});
            //$("#totalExecutiveSummary").val(scoreP.totalExecutiveSummary);
            //$('#executiveSummaryNotes').val(scoreP.executiveSummaryNotes);
        	////Event 2017 - Display partial totals on section title
            //$("#totalExecutiveSummaryBadge").html(scoreP.totalExecutiveSummary);

            $.each(scoreP.novelty, function (index, value) {
            	$("#chkNovelty" + index).prop('checked', (parseFloat(value) > 0));
            	scoreP.totalNovelty += parseFloat(value);
            });
            $("#totalNovelty").val(scoreP.totalNovelty);
            $('#noveltyNotes').val(scoreP.noveltyNotes);
        	//Event 2017 - Display partial totals on section title
            $("#totalNoveltyBadge").html(scoreP.totalNovelty);

            $.each(scoreP.content, function (index, value) {
            	$("#chkContent" + index).prop('checked', (parseFloat(value) > 0));
            	scoreP.totalContent += parseFloat(value);
            });
            $("#totalContent").val(scoreP.totalContent);
            $('#contentNotes').val(scoreP.contentNotes);
        	//Event 2017 - Display partial totals on section title
            $("#totalContentBadge").html(scoreP.totalContent);

            $.each(scoreP.finances, function (index, value) {
            	//Some of these items are radio buttons and some values could be 0 
            	//I cannot test "value > 0" but "value equals to input value" to check the input correctly even when is set to 0
            	//$("#chkFinances" + index).prop('checked', (parseFloat(value) > 0));
            	$("#chkFinances" + index).prop('checked', (parseFloat($("#chkFinances" + index).prop('value')) == parseFloat(value)));
            	scoreP.totalFinances += parseFloat(value);
            });
            $("#totalFinances").val(scoreP.totalFinances);
            $('#financesNotes').val(scoreP.financesNotes);
        	//Event 2017 - Display partial totals on section title
            $("#totalFinancesBadge").html(scoreP.totalFinances);

            $.each(scoreP.deepDiveTopic, function (index, value) {
            	$("#chkDeepDiveTopic" + index).prop('checked', (parseFloat(value) > 0));
            	scoreP.totalDeepDiveTopic += parseFloat(value);
            });
            $("#totalDeepDiveTopic").val(scoreP.totalDeepDiveTopic);
            $('#deepDiveTopicNotes').val(scoreP.deepDiveTopicNotes);
        	//Event 2017 - Display partial totals on section title
            $("#totalDeepDiveTopicBadge").html(scoreP.totalDeepDiveTopic);

        	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery> - BEGIN
            $.each(scoreP.demonstrationAndDelivery, function (index, value) {
            	$("#chkDemonstrationAndDelivery" + index).prop('checked', (parseFloat(value) > 0));
            	scoreP.totalDemonstrationAndDelivery += parseFloat(value);
            });
            $("#totalDemonstrationAndDelivery").val(scoreP.totalDemonstrationAndDelivery);
            $('#demonstrationAndDeliveryNotes').val(scoreP.demonstrationAndDeliveryNotes);
            $("#totalDemonstrationAndDeliveryBadge").html(scoreP.totalDemonstrationAndDelivery);
        	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery> - END

            $.each(scoreP.demonstrationAndStructure, function (index, value) {
            	$("#chkDemonstrationAndStructure" + index).prop('checked', (parseFloat(value) > 0));
            	scoreP.totalDemonstrationAndStructure += parseFloat(value);
            });
            $("#totalDemonstrationAndStructure").val(scoreP.totalDemonstrationAndStructure);
            $('#demonstrationAndStructureNotes').val(scoreP.demonstrationAndStructureNotes);
        	//Event 2017 - Display partial totals on section title
            $("#totalDemonstrationAndStructureBadge").html(scoreP.totalDemonstrationAndStructure);

            $.each(scoreP.delivery, function (index, value) {
            	$("#chkDelivery" + index).prop('checked', (parseFloat(value) > 0));
            	scoreP.totalDelivery += parseFloat(value);
            });
            $("#totalDelivery").val(scoreP.totalDelivery);
            $('#deliveryNotes').val(scoreP.deliveryNotes);
        	//Event 2017 - Display partial totals on section title
            $("#totalDeliveryBadge").html(scoreP.totalDelivery);

            $.each(scoreP.questions, function (index, value) {
            	//Some of these items are radio buttons and some values could be 0 
            	//I cannot test "value > 0" but "value equals to input value" to check the input correctly even when is set to 0
            	//$("#chkQuestions" + index).prop('checked', (parseFloat(value) > 0));
            	$("#chkQuestions" + index).prop('checked', (parseFloat($("#chkQuestions" + index).prop('value')) == parseFloat(value)));
            	scoreP.totalQuestions += parseFloat(value);
            });
            $("#totalQuestions").val(scoreP.totalQuestions);
            $('#questionsNotes').val(scoreP.questionsNotes);
        	//Event 2017 - Display partial totals on section title
            $("#totalQuestionsBadge").html(scoreP.totalQuestions);

            $.each(scoreP.generalImpression, function (index, value) {
            	$("#chkGeneralImpression" + index).prop('checked', (parseFloat(value) > 0));
            	scoreP.totalGeneralImpression += parseFloat(value);
            });
            $("#totalGeneralImpression").val(scoreP.totalGeneralImpression);
            $('#generalImpressionNotes').val(scoreP.generalImpressionNotes);
        	//Event 2017 - Display partial totals on section title
            $("#totalGeneralImpressionBadge").html(scoreP.totalGeneralImpression);

            $("#miscellaneous").val(scoreP.miscellaneous);
            $("#miscellaneousNotes").val(scoreP.miscellaneousNotes);
            $("#miscellaneousBadge").html(scoreP.miscellaneous);

            $("#presentationNotes").val(scoreP.presentationNotes);
            $("#totalPresentation").val(scoreP.totalPresentation);

            $("#chiptotalpoints").text('  TOTAL POINTS : ' + scoreP.totalPresentation + '  ').css({ 'font-weight': 'bold' });

        	//FD 2021.07.27 - ATA 2021  - Add Stage1
            $("#stage1").val(scoreP.stage1);
            $("#stage1Badge").html(scoreP.stage1);

        	//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
            $("#finals").val(scoreP.finals);
            $("#finalsBadge").html(scoreP.finals);

        	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
        	//BUSINESSFIGURES
            $.each(scoreP.st2BusinnesFigures, function (index, value) {
            	$("#chkst2BusinessFigures" + index).prop('checked', (parseFloat(value) > 0));
            	scoreP.totalSt2BusinnesFigures += parseFloat(value);
            });
            $("#totalSt2BusinessFigures").val(scoreP.totalSt2BusinnesFigures);
            $("#totalSt2BusinnesFiguresBadge").html(scoreP.totalSt2BusinnesFigures);
            
            $('#st2businessFiguresNotes').val(scoreP.st2BusinnesFiguresNotes);

        	//CONTENT
            $.each(scoreP.st2Content, function (index, value) {
            	$("#chkSt2Content" + index).prop('checked', (parseFloat(value) > 0));
            	scoreP.totalSt2Content += parseFloat(value);
            });
            $("#totalSt2Content").val(scoreP.totalSt2Content);
            $("#totalSt2ContentBadge").html(scoreP.totalSt2Content);
            $('#st2contentNotes').val(scoreP.st2ContentNotes);

        	//DEMONSTRATIONANSDELIVERY
            $.each(scoreP.st2DemonstrationAndDelivery, function (index, value) {
            	$("#chkSt2DemonstrationAndDelivery" + index).prop('checked', (parseFloat(value) > 0));
            	scoreP.totalSt2DemonstrationAndDelivery += parseFloat(value);
            });
            $("#totalSt2DemonstrationAndDelivery").val(scoreP.totalSt2DemonstrationAndDelivery);
            $("#totalSt2DemonstrationAndDeliveryBadge").html(scoreP.totalSt2DemonstrationAndDelivery);
            $('#st2demonstrationAndDeliveryNotes').val(scoreP.st2DemonstrationAndDeliveryNotes);

        	//INVESTITORS
            $.each(scoreP.st2Investitors, function (index, value) {
            	$("#chkSt2Investitors" + index).prop('checked', (parseFloat($("#chkSt2Investitors" + index).prop('value')) == parseFloat(value)));
            	scoreP.totalSt2Investitors += parseFloat(value);
            });
            $("#totalSt2Investitors").val(scoreP.totalSt2Investitors);
            $("#totalSt2InvestitorsBadge").html(scoreP.totalSt2Investitors);

            $('#st2investitorsNotes').val(scoreP.st2InvestitorsNotes);
        	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

            waitOFF();

            return scoreP;
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

//SERVER SIDE ONLY: the total score (automatically calculated) can be modified by the user - req.Ciadamidaro Set 2015
//So add total given as parameter
function WS_insertRecord_scores_presentation(eventid, carid, scoreP) {

	var obj = {};
    obj.eventid								= eventid;
    obj.carid								= carid;
    obj.scoreid								= scoreP.scoreid;

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
    //obj.executiveSummary					= scoreP.executiveSummary;
    //obj.executiveSummaryNotes				= scoreP.executiveSummaryNotes;
    obj.novelty								= scoreP.novelty;
    obj.noveltyNotes						= scoreP.noveltyNotes;
	obj.content								= scoreP.content;
	obj.contentNotes						= scoreP.contentNotes;
	obj.finances							= scoreP.finances;
	obj.financesNotes						= scoreP.financesNotes;
	obj.deepDiveTopic						= scoreP.deepDiveTopic;
	obj.deepDiveTopicNotes					= scoreP.deepDiveTopicNotes;

	obj.demonstrationAndStructure			= scoreP.demonstrationAndStructure;
	obj.demonstrationAndStructureNotes		= scoreP.demonstrationAndStructureNotes;

	obj.delivery							= scoreP.delivery;
	obj.deliveryNotes						= scoreP.deliveryNotes;
	obj.questions							= scoreP.questions;
	obj.questionsNotes						= scoreP.questionsNotes;
	obj.generalImpression					= scoreP.generalImpression;
	obj.generalImpressionNotes				= scoreP.generalImpressionNotes;
	obj.miscellaneous						= scoreP.miscellaneous;
	obj.miscellaneousNotes					= scoreP.miscellaneousNotes;
	obj.presentationNotes					= scoreP.presentationNotes;
	obj.totalPresentation					= scoreP.totalPresentation;

    //FD 2021.07.27 - ATA 2021  - Add Stage1
	obj.stage1								= scoreP.stage1;

	//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
	obj.finals								= scoreP.finals;

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
	obj.demonstrationAndDelivery			= scoreP.demonstrationAndDelivery;
	obj.demonstrationAndDeliveryNotes		= scoreP.demonstrationAndDeliveryNotes;

	//Event 2019 - Presentation Event has been changed
	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
	obj.st2BusinessFigure					= scoreP.st2BusinnesFigures;
	obj.st2BusinessFigureNotes				= scoreP.st2BusinnesFiguresNotes;
	obj.st2Content							= scoreP.st2Content;
	obj.st2ContentNotes						= scoreP.st2ContentNotes;
	obj.st2DemonstrationAndDelivery			= scoreP.st2DemonstrationAndDelivery;
	obj.st2DemonstrationAndDeliveryNotes	= scoreP.st2DemonstrationAndDeliveryNotes;
	obj.st2Investitors						= scoreP.st2Investitors;
	obj.st2InvestitorsNotes					= scoreP.st2InvestitorsNotes;
	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

	var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/InsertScorePresentation",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            backToScores();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });

}

//SERVER SIDE ONLY: the total score (automatically calculated) can be modified by the user - req.Ciadamidaro Set 2015
//So add total given as parameter
function WS_updateRecord_scores_presentation(scoreP) {
    var obj = {};
    obj.scoreid								= scoreP.scoreid;

	//Event 2019 - Presentation Event has been changed
	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
    //obj.executiveSummary					= scoreP.executiveSummary;
    //obj.executiveSummaryNotes				= scoreP.executiveSummaryNotes;
    obj.novelty								= scoreP.novelty;
    obj.noveltyNotes						= scoreP.noveltyNotes;
    obj.content								= scoreP.content;
    obj.contentNotes						= scoreP.contentNotes;
    obj.finances							= scoreP.finances;
    obj.financesNotes						= scoreP.financesNotes;
    obj.deepDiveTopic						= scoreP.deepDiveTopic;
    obj.deepDiveTopicNotes					= scoreP.deepDiveTopicNotes;

    obj.demonstrationAndStructure			= scoreP.demonstrationAndStructure;
    obj.demonstrationAndStructureNotes		= scoreP.demonstrationAndStructureNotes;

    obj.delivery							= scoreP.delivery;
    obj.deliveryNotes						= scoreP.deliveryNotes;
    obj.questions							= scoreP.questions;
    obj.questionsNotes						= scoreP.questionsNotes;
    obj.generalImpression					= scoreP.generalImpression;
    obj.generalImpressionNotes				= scoreP.generalImpressionNotes;
    obj.miscellaneous						= scoreP.miscellaneous;
    obj.miscellaneousNotes					= scoreP.miscellaneousNotes;
    obj.presentationNotes					= scoreP.presentationNotes;
    obj.totalPresentation					= scoreP.totalPresentation;

    //FD 2021.07.27 - ATA 2021  - Add Stage1
    obj.stage1								= scoreP.stage1;

	//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
    obj.finals								= scoreP.finals;

	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
    obj.demonstrationAndDelivery			= scoreP.demonstrationAndDelivery;
    obj.demonstrationAndDeliveryNotes		= scoreP.demonstrationAndDeliveryNotes;

	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - BEGIN
    obj.st2BusinessFigure					= scoreP.st2BusinnesFigures;
    obj.st2BusinessFigureNotes				= scoreP.st2BusinnesFiguresNotes;
    obj.st2Content							= scoreP.st2Content;
    obj.st2ContentNotes						= scoreP.st2ContentNotes;
    obj.st2DemonstrationAndDelivery			= scoreP.st2DemonstrationAndDelivery;
    obj.st2DemonstrationAndDeliveryNotes	= scoreP.st2DemonstrationAndDeliveryNotes;
    obj.st2Investitors						= scoreP.st2Investitors;
    obj.st2InvestitorsNotes					= scoreP.st2InvestitorsNotes;
	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2> - END

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/UpdateScorePresentation",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            backToScores();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });

}

function WS_deleteRecord_scores_presentation(scoreid) {
    var obj = {};
    obj.scoreid = scoreid;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/DeleteScorePresentation",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_insertRecord_scores_cost(eventid, carid, scoreid, LowestCost, Accuracy, EventDay, Presentation, Penalties, Notes) {
    var obj = {};
    obj.eventid = eventid;
    obj.carid = carid;
    obj.scoreid = scoreid;
    obj.lowestCost = (LowestCost.toString() != "" ? LowestCost.toString() : "0");
    obj.accuracy = (Accuracy.toString() != "" ? Accuracy.toString() : "0");
    obj.eventDay = (EventDay.toString() != "" ? EventDay.toString() : "0");;
    obj.penalties = (Penalties.toString() != "" ? Penalties.toString() : "0");
    obj.presentation = (Presentation.toString() != "" ? Presentation.toString() : "0");
    obj.Notes = Notes;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/InsertScoreCost2015",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            backToScores();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_updateRecord_scores_cost(scoreid, LowestCost, Accuracy, EventDay, Presentation, Penalties, Notes) {
    var obj = {};
    obj.scoreid = scoreid;
    obj.lowestCost = (LowestCost.toString() != "" ? LowestCost.toString() : "0");
    obj.accuracy = (Accuracy.toString() != "" ? Accuracy.toString() : "0");
    obj.eventDay = (EventDay.toString() != "" ? EventDay.toString() : "0");;
    obj.penalties = (Penalties.toString() != "" ? Penalties.toString() : "0");
    obj.presentation = (Presentation.toString() != "" ? Presentation.toString() : "0");
    obj.Notes = Notes;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/UpdateScoreCost2015",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            backToScores();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_deleteRecord_scores_cost(scoreid) {

    var obj = {};
    obj.scoreid = scoreid;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/DeleteScoreCost2015",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_showRecords_scores_cost(scoreid) {
    var obj = {};
    obj.scoreid = scoreid;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetScoreCost2015",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            waitON();

            var id = -1;
            var scoreid = -1;
            var LowerstCost = 0;
            var Accuracy = 0;
            var EventDay = 0;
            var Presentation = 0;
            var Penalities = 0;
            var TotalAchivedPoints = 0;
            var NormalizedScore = 0;
            var Notes = "";

            if (response != null) {
                var item = response;


                id = item.Id;
                scoreid = item.Score.Id;
                Accuracy = item.Accuracy;
                LowerstCost = item.LowerstCost;
                EventDay = item.EventDay;
                Presentation = item.Presentation;
                Penalities = item.Penalties;
                TotalAchivedPoints = item.TotalAchivedPoints;
                Notes = item.Notes;

                $("#id").val(id);
                $("#scoreid").val(scoreid);
                $("#LowestCost").val(LowerstCost);
                $("#Accuracy").val(Accuracy);
                $("#EventDay").val(EventDay);
                $("#Presentation").val(Presentation);
                $("#Penalties").val(Penalities);
                $("#Notes").val(Notes);

                //$("#lbl_CostBeforAddendum").addClass("active");   
                //$("#lbl_AddendumeAdjustment").addClass("active");
                //$("#lbl_VisualInspection").addClass("active");
                //$("#lbl_EventDay").addClass("active");
                //$("#lbl_Penalities").addClass("active");
                //$("#lbl_DelayPenalities").addClass("active");
                //$("#lbl_Notes").addClass("active");

            }

            waitOFF();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_insertRecord_scores_acceleration(eventid, carid, scoreid, r1time, r1numofcones, r2time, r2numofcones, r3time, r3numofcones, r4time, r4numofcones) {
    var obj = {};
    obj.eventid = eventid;
    obj.carid = carid;
    obj.scoreid = scoreid;
    obj.r1Time = r1time;
    obj.r1Cones = r1numofcones;
    obj.r2Time = r2time;
    obj.r2Cones = r2numofcones;
    obj.r3Time = r3time;
    obj.r3Cones = r3numofcones;
    obj.r4Time = r4time;
    obj.r4Cones = r4numofcones;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/InsertScoreAcceleration",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            backToScores();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_updateRecord_scores_acceleration(scoreid, r1time, r1numofcones, r2time, r2numofcones, r3time, r3numofcones, r4time, r4numofcones) {
    var obj = {};
    obj.scoreid = scoreid;
    obj.r1Time = r1time;
    obj.r1Cones = r1numofcones;
    obj.r2Time = r2time;
    obj.r2Cones = r2numofcones;
    obj.r3Time = r3time;
    obj.r3Cones = r3numofcones;
    obj.r4Time = r4time;
    obj.r4Cones = r4numofcones;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/UpdateScoreAcceleration",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            backToScores();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_deleteRecord_scores_acceleration(scoreid) {
    var obj = {};
    obj.scoreid = scoreid;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/DeleteScoreAcceleration",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_showRecords_scores_acceleration(scoreid) {
    var obj = {};
    obj.scoreid = scoreid;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetScoreAcceleration",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            waitON();

            var id = -1;
            var scoreid = -1;

            var r1time = 0;
            var r2time = 0;
            var r3time = 0;
            var r4time = 0;

            var r1numofcones = 0;
            var r2numofcones = 0;
            var r3numofcones = 0;
            var r4numofcones = 0;

            var r1timeadj = 0;
            var r2timeadj = 0;
            var r3timeadj = 0;
            var r4timeadj = 0;

            if (response != null) {
                var item = response;

                id = item.Id;
                scoreid = item.Score.Id;

                r1time = item.Run1Time;
                r2time = item.Run2Time;
                r3time = item.Run3Time;
                r4time = item.Run4Time;

                r1numofcones = item.Run1NumOfCones;
                r2numofcones = item.Run2NumOfCones;
                r3numofcones = item.Run3NumOfCones;
                r4numofcones = item.Run4NumOfCones;

                r1timeadj = item.Run1TimeAdj;
                r2timeadj = item.Run2TimeAdj;
                r3timeadj = item.Run3TimeAdj;
                r4timeadj = item.Run4TimeAdj;
            }

            if (parseFloat(r1timeadj) == -1) r1timeadj = "DNA";
            if (parseFloat(r2timeadj) == -1) r2timeadj = "DNA";
            if (parseFloat(r3timeadj) == -1) r3timeadj = "DNA";
            if (parseFloat(r4timeadj) == -1) r4timeadj = "DNA";

            $("#id").val(id);
            $("#scoreid").val(scoreid);

            $("#run1time").val(r1time);
            $("#run2time").val(r2time);
            $("#run3time").val(r3time);
            $("#run4time").val(r4time);

            $("#run1numofcones").val(r1numofcones);
            $("#run2numofcones").val(r2numofcones);
            $("#run3numofcones").val(r3numofcones);
            $("#run4numofcones").val(r4numofcones);

            $("#run1timeadj").val(r1timeadj);
            $("#run2timeadj").val(r2timeadj);
            $("#run3timeadj").val(r3timeadj);
            $("#run4timeadj").val(r4timeadj);

            waitOFF();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_insertRecord_scores_skidpad(eventid, carid, scoreid, r1time, r1numofcones, r2time, r2numofcones, r3time, r3numofcones, r4time, r4numofcones) {
    var obj = {};
    obj.eventid = eventid;
    obj.carid = carid;
    obj.scoreid = scoreid;
    obj.r1Time = r1time;
    obj.r1Cones = r1numofcones;
    obj.r2Time = r2time;
    obj.r2Cones = r2numofcones;
    obj.r3Time = r3time;
    obj.r3Cones = r3numofcones;
    obj.r4Time = r4time;
    obj.r4Cones = r4numofcones;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/InsertScoreSkidPad",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            backToScores();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_updateRecord_scores_skidpad(scoreid, r1time, r1numofcones, r2time, r2numofcones, r3time, r3numofcones, r4time, r4numofcones) {
    var obj = {};
    obj.scoreid = scoreid;
    obj.r1Time = r1time;
    obj.r1Cones = r1numofcones;
    obj.r2Time = r2time;
    obj.r2Cones = r2numofcones;
    obj.r3Time = r3time;
    obj.r3Cones = r3numofcones;
    obj.r4Time = r4time;
    obj.r4Cones = r4numofcones;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/UpdateScoreSkidPad",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            backToScores();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_deleteRecord_scores_skidpad(scoreid) {
    var obj = {};
    obj.scoreid = scoreid;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/DeleteScoreSkidPad",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_showRecords_scores_skidpad(scoreid) {
    var obj = {};
    obj.scoreid = scoreid;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetScoreSkidPad",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            waitON();

            var id = -1;
            var scoreid = -1;

            var r1time = 0;
            var r2time = 0;
            var r3time = 0;
            var r4time = 0;

            var r1numofcones = 0;
            var r2numofcones = 0;
            var r3numofcones = 0;
            var r4numofcones = 0;

            var r1timeadj = 0;
            var r2timeadj = 0;
            var r3timeadj = 0;
            var r4timeadj = 0;

            if (response != null) {
                var item = response;

                id = item.Id;
                scoreid = item.Score.Id;

                r1time = item.Run1Time;
                r2time = item.Run2Time;
                r3time = item.Run3Time;
                r4time = item.Run4Time;

                r1numofcones = item.Run1NumOfCones;
                r2numofcones = item.Run2NumOfCones;
                r3numofcones = item.Run3NumOfCones;
                r4numofcones = item.Run4NumOfCones;

                r1timeadj = item.Run1TimeAdj;
                r2timeadj = item.Run2TimeAdj;
                r3timeadj = item.Run3TimeAdj;
                r4timeadj = item.Run4TimeAdj;
            }

            if (parseFloat(r1timeadj) == -1) r1timeadj = "DNA";
            if (parseFloat(r2timeadj) == -1) r2timeadj = "DNA";
            if (parseFloat(r3timeadj) == -1) r3timeadj = "DNA";
            if (parseFloat(r4timeadj) == -1) r4timeadj = "DNA";

            $("#id").val(id);
            $("#scoreid").val(scoreid);

            $("#run1time").val(r1time);
            $("#run2time").val(r2time);
            $("#run3time").val(r3time);
            $("#run4time").val(r4time);

            $("#run1numofcones").val(r1numofcones);
            $("#run2numofcones").val(r2numofcones);
            $("#run3numofcones").val(r3numofcones);
            $("#run4numofcones").val(r4numofcones);

            $("#run1timeadj").val(r1timeadj);
            $("#run2timeadj").val(r2timeadj);
            $("#run3timeadj").val(r3timeadj);
            $("#run4timeadj").val(r4timeadj);

            waitOFF();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_insertRecord_scores_autocross(eventid, carid, scoreid, r1time, r1numofcones, r1doc, r2time, r2numofcones, r2doc, r3time, r3numofcones, r3doc, r4time, r4numofcones, r4doc) {
    var obj = {};
    obj.eventid = eventid;
    obj.carid = carid;
    obj.scoreid = scoreid;
    obj.r1Time = r1time;
    obj.r1Cones = r1numofcones;
    obj.r1Doc = r1doc;
    obj.r2Time = r2time;
    obj.r2Cones = r2numofcones;
    obj.r2Doc = r2doc;
    obj.r3Time = r3time;
    obj.r3Cones = r3numofcones;
    obj.r3Doc = r3doc;
    obj.r4Time = r4time;
    obj.r4Cones = r4numofcones;
    obj.r4Doc = r4doc;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/InsertScoreAutoCross",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            backToScores();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_updateRecord_scores_autocross(scoreid, r1time, r1numofcones, r1doc, r2time, r2numofcones, r2doc, r3time, r3numofcones, r3doc, r4time, r4numofcones, r4doc) {
    var obj = {};
    obj.scoreid = scoreid;
    obj.r1Time = r1time;
    obj.r1Cones = r1numofcones;
    obj.r1Doc = r1doc;
    obj.r2Time = r2time;
    obj.r2Cones = r2numofcones;
    obj.r2Doc = r2doc;
    obj.r3Time = r3time;
    obj.r3Cones = r3numofcones;
    obj.r3Doc = r3doc;
    obj.r4Time = r4time;
    obj.r4Cones = r4numofcones;
    obj.r4Doc = r4doc;

    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/UpdateScoreAutoCross",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            backToScores();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_deleteRecord_scores_autocross(scoreid) {
    var obj = {};
    obj.scoreid = scoreid;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/DeleteScoreAutoCross",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_showRecords_scores_autocross(scoreid) {
    var obj = {};
    obj.scoreid = scoreid;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetScoreAutoCross",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            waitON();

            var id = -1;
            var scoreid = -1;

            var r1time = 0;
            var r2time = 0;
            var r3time = 0;
            var r4time = 0;

            var r1numofcones = 0;
            var r2numofcones = 0;
            var r3numofcones = 0;
            var r4numofcones = 0;

            var r1doc = 0;
            var r2doc = 0;
            var r3doc = 0;
            var r4doc = 0;

            var r1timeadj = 0;
            var r2timeadj = 0;
            var r3timeadj = 0;
            var r4timeadj = 0;

            if (response != null) {
                var item = response;

                id = item.Id;
                scoreid = item.Score.Id;

                r1time = item.Run1Time;
                r2time = item.Run2Time;
                r3time = item.Run3Time;
                r4time = item.Run4Time;

                r1numofcones = item.Run1NumOfCones;
                r2numofcones = item.Run2NumOfCones;
                r3numofcones = item.Run3NumOfCones;
                r4numofcones = item.Run4NumOfCones;

                r1doc = item.Run1Doc;
                r2doc = item.Run2Doc;
                r3doc = item.Run3Doc;
                r4doc = item.Run4Doc;

                r1timeadj = item.Run1TimeAdj;
                r2timeadj = item.Run2TimeAdj;
                r3timeadj = item.Run3TimeAdj;
                r4timeadj = item.Run4TimeAdj;
            }

            if (parseFloat(r1timeadj) == -1) r1timeadj = "DNA";
            if (parseFloat(r2timeadj) == -1) r2timeadj = "DNA";
            if (parseFloat(r3timeadj) == -1) r3timeadj = "DNA";
            if (parseFloat(r4timeadj) == -1) r4timeadj = "DNA";

            $("#id").val(id);
            $("#scoreid").val(scoreid);

            $("#run1time").val(r1time);
            $("#run2time").val(r2time);
            $("#run3time").val(r3time);
            $("#run4time").val(r4time);

            $("#run1numofcones").val(r1numofcones);
            $("#run2numofcones").val(r2numofcones);
            $("#run3numofcones").val(r3numofcones);
            $("#run4numofcones").val(r4numofcones);

            $("#run1doc").val(r1doc);
            $("#run2doc").val(r2doc);
            $("#run3doc").val(r3doc);
            $("#run4doc").val(r4doc);

            $("#run1timeadj").val(r1timeadj);
            $("#run2timeadj").val(r2timeadj);
            $("#run3timeadj").val(r3timeadj);
            $("#run4timeadj").val(r4timeadj);

            waitOFF();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_LoadEventsTypeResults() {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetEventsTypes",
        data: "",
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            dataset_eventstypes = response;

            $('#ddl_type_event').empty();
            //$('#ddl_type_event').append($('<li><a href="#' +item.id +  '>' +  'Select an Event Type </a> </li>' ));

            $('#ddl_type_event').append($('<option>', { value: '-1', text: 'Select an Event Type' }));
            $('#ddl_type_event').append($('<option>', { value: '0', text: 'Overall' }));

            for (var i = 0; i < dataset_eventstypes.length; i++) {
                var item = dataset_eventstypes[i];
                $('#ddl_type_event').append($('<option>', { value: item.Id, text: item.Name }));
            }

            $('#ddl_type_event').material_select();


            LoadRankingClasses()


        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function LoadRankingClasses() {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetClasses",
        data: "",
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            dataset_eventstypes = response;

            $('#ddl_class_car').empty();
            //$('#ddl_type_event').append($('<li><a href="#' +item.id +  '>' +  'Select an Event Type </a> </li>' ));

            $('#ddl_class_car').append($('<option>', { value: '-1', text: 'Select a Class' }));

            for (var i = 0; i < dataset_eventstypes.length; i++) {
                var item = dataset_eventstypes[i];
                $('#ddl_class_car').append($('<option>', { value: item.Id, text: item.Name }));
            }

            $('#ddl_class_car').material_select();

        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_insertRecord_scores_endurance(eventid, carid, scoreid, time, laps, penalities, cones, doc, fuelused, fueltype) {
    var obj = {};
    obj.eventid = eventid;
    obj.carid = carid;
    obj.scoreid = scoreid;
    obj.time = time;
    obj.laps = laps;
    obj.penalities = penalities;
    obj.cones = cones;
    obj.doc = doc;
    obj.fuelUsed = fuelused;
    obj.fuel_type = fueltype;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/InsertScoreEndurance",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            backToScores();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_updateRecord_scores_endurance(scoreid, time, laps, penalities, cones, doc, fuelused, fueltype) {
    var obj = {};
    obj.scoreid = scoreid;
    obj.time = time;
    obj.laps = laps;
    obj.penalities = penalities;
    obj.cones = cones;
    obj.doc = doc;
    obj.fuelUsed = fuelused;
    obj.fuel_type = fueltype;
    var theString = stringifyJSON(obj);

    console.log(theString);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/UpdateScoreEndurance",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            backToScores();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_deleteRecord_scores_endurance(scoreid) {
    var obj = {};
    obj.scoreid = scoreid;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/DeleteScoreEndurance",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_showRecords_scores_endurance(scoreid, carfuelid) {
    var obj = {};
    obj.scoreid = scoreid;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetScoreEndurance",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            waitON();

            var id = -1;
            var scoreid = -1;

            var time = 0;
            var laps = 0;
            var penalities = 0;
            var cones = 0;
            var doc = 0;
            var fuelused = 0;
            var fueltype = carfuelid;

            if (response != null) {
                var item = response;

                id = item.Id;
                scoreid = item.Score.Id;

                time = item.Time
                laps = item.Laps;
                penalities = item.Penalities;
                cones = item.Cone;
                doc = item.Doc;
                fuelused = item.FuelUsed;
                fueltype = item.FuelType;
            }

            $("#id").val(id);
            $("#scoreid").val(scoreid);

            $("#time").val(time);
            $("#laps").val(laps);
            $("#penalities").val(penalities);
            $("#cones").val(cones);
            $("#doc").val(doc);
            $("#fuelused").val(fuelused);
            $("#fueltype").val(fueltype);

            //Refresh selects otherwise does not work!
            $('#fueltype').material_select();

            waitOFF();
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_showDetailsEndurance(id) {
    var obj = {};
    obj.scoreid = id;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetScoreDetailsEndurance",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            waitON();
            if (response != null) {
                $("#Time").val(response.Time);
                $("#Laps").val(response.Laps);
                $("#Penalties").val(response.Penalities);
                $("#Cone").val(response.Cone);
                $("#Doc").val(response.Doc);
                $("#AdjTimeDNF").val(response.AdjTimeDNF);
                $("#AdjTime").val(response.AdjTime);
                $("#AvgLapTime").val(response.AvgLapTime);
                $("#AvgLapTimeEfficiency").val(response.AvgLapTimeEfficiency);
                $("#EnduranceScore").val(response.EnduranceScore);
                $("#FuelUsed").val(response.FuelUsed);
                $("#FuelType").val(response.FuelType);
                $("#Co2Used").val(response.Co2Used);
                $("#Co2Lap").val(response.Co2Lap);
                $("#TminAvgForEfficiency").val(response.TminAvg);
                $("#driverChangeStart").val(response.DriverChangeStart);
                $("#EfficiencyFactor").val(response.EfficencyFactor);
                $("#EfficiencyScore").val(response.EfficienctyScore);
                $("#TotalScore").val(response.TotalScore);
            }

            waitOFF();
            openModalDialog("#modalEdit");
        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_set_endurance_settings(totallaps, laplenght, consumptionmax) {
    var obj = {};
    obj.totalLaps = totallaps;
    obj.lapLenght = laplenght;
    obj.consumptionmax = consumptionmax;
    var theString = stringifyJSON(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/SetEnduranceSettings",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
        }, //success
        error: function (msg, error, errorThrown) {
            ataToast("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown, 4000);
        }
    });
}

function WS_getTotalLapEndurance() {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/getTotalLapEndurance",
        data: "",
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            if (response != null) {
                var totallaps = response;
                $("#totallaps").val(totallaps);
            }

        }, //success
        error: function (msg, error, errorThrown) {
            ataToast("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown, 4000);
        }
    });
}

function WS_getLapLenghtEndurance() {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/getLapLenghtEndurance",
        data: "",
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            if (response != null) {
                var lapslength = response;
                $("#lapslength").val(lapslength);
            }

        }, //success
        error: function (msg, error, errorThrown) {
            ataToast("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown, 4000);
        }
    });
}

function WS_getConsumptionMaxEndurance() {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/getConsumptionMaxEndurance",
        data: "",
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            if (response != null) {
                var consumptionmax = response;
                $("#consumptionmax").val(consumptionmax);
            }

        }, //success
        error: function (msg, error, errorThrown) {
            ataToast("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown, 4000);
        }
    });
}

function WS_ShowPenalties() {
    $("#tbodyPenalties").html('');
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetPenalties",
        data: "",
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            var mylist = response;

            for (var i = 0; i < mylist.length; i++) {

                var item = mylist[i];

                var text2Append = '';

                //Electric Car has to be green-colored - req.Ciadamidaro Set 2015
                var trClassName = '';
                var tdClassName = '';
                if (Boolean(item.IsAnElectricCar)) {
                    trClassName = " class='electric' ";
                    tdClassName = " electric ";
                }
                else {
                    trClassName = " class='not-electric' ";
                    tdClassName = " black-text ";
                }

                text2Append += '<tr' + trClassName + ' penality-id=" ' + item.PenalityID + '" car-id=" ' + item.CarID + '">';

                text2Append += '<td>&nbsp;</td>';
                text2Append += '<td><label class="' + tdClassName + ' carNo">' + item.CarNo + '</label></td>';
                text2Append += '<td><label class="' + tdClassName + ' teamName" >' + item.TeamName.toString() + '<label/></td>';

                text2Append += '<td><input placeholder=" " type="number" class="documents" value="' + item.Documents.toString() + '"  /></td>';
                text2Append += '<td><input placeholder=" " type="number" class="lackOfSef" value="' + item.LackOfSEF.toString() + '"  /></td>';
                text2Append += '<td><input placeholder=" " type="number" class="driverMeeting" value="' + item.DriverMeetingAttendance.toString() + '"  /></td>';
                text2Append += '<td><input placeholder=" " type="number" class="driverPenalties" value="' + item.DriverPenalties.toString() + '"  /></td>';
                text2Append += '<td><input placeholder=" " type="number" class="postEndurance" value="' + item.PostEnduranceScrutineering.toString() + '"  /></td>';
                text2Append += '<td><input placeholder=" " type="number" class="totalPenalties" value="' + item.TotalPenalties.toString() + '"  /></td>';
                text2Append += '<td><input placeholder=" " type="text"   class="penaltiesnotes" value="' + item.PenaltiesNotes.toString() + '"  /></td>';

                text2Append += '</tr>';
                $("#tbodyPenalties").append(text2Append);
            }

            $("#tbodyPenalties tr>td>input").bind("focusout", function () {
                calcPenalties();
            });
            //$("#tPenalties").stupidtable();
            waitOFF();

        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function WS_SavePenalties() {

    var body = $("#tbodyPenalties tr");
    var data = [];
    body.each(function (i, m) {

        var PenalityId = $(this).attr("penality-id");
        var CarId = $(this).attr("car-id");
        var CarNo = $(this).find(".carNo").text();
        var TeamName = $(this).find(".teamName").text();
        var Documents = $(this).find(".documents").val();
        var lack = $(this).find(".lackOfSef").val();
        var DriverMeeting = $(this).find(".driverMeeting").val();
        var DriverPenalties = $(this).find(".driverPenalties").val();
        var PostEndurance = $(this).find(".postEndurance").val();
        var TotalPenalties = $(this).find(".totalPenalties").val();
        var PenaltiesNotes = $(this).find(".penaltiesnotes").val();

        var obj = {};
        obj.CarID = CarId;
        obj.PenalityID = PenalityId;
        obj.CarNo = CarNo;
        obj.TeamName = TeamName;
        obj.Documents = Documents;
        obj.LackOfSEF = lack;
        obj.DriverMeetingAttendance = DriverMeeting;
        obj.DriverPenalties = DriverPenalties;
        obj.PostEnduranceScrutineering = PostEndurance;
        obj.TotalPenalties = TotalPenalties;
        obj.PenaltiesNotes = PenaltiesNotes;

        data.push(obj);
    });

    var obj = {};
    obj.penalities = data;
    var theString = JSON.stringify(obj);
    console.log(theString);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/SavePenalties",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            ataToast("Penalties correctly saved", 4000);
            WS_ShowPenalties();
            return true;

        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });

}

function colorizeCar(carColorMix, carColor) {
    //Display the car with the color of the committee, if valued and whether to use
    //otherwise, "mix" of colors (class ex4 in ATA.css) - req.Ciadamidaro Set 2015

    var bkStyle = "";
    if (Boolean(carColorMix)) {
        bkStyle = ' class="ex4" ';
    }
    else {
        if (carColor == "") {
            bkStyle = '';
        }
        else {
            bkStyle = ' style="background-color:' + carColor + ' !important;" ';
        }
    }
    return bkStyle;
}

// -----------------------------------------------------------------------------------------------------------------------
// SCORES PARTIALS -------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
//Event 2018 - Show partials scores for Presentation and Design
//Event 2019 - Presentation Event has been changed
function WS_showRecords_scores_presentation_partial(scoresidlist) {
    //console.log("scoresidlist " + scoresidlist);

    var obj = {};
    obj.scoresidlist = scoresidlist;
    var theString = JSON.stringify(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetScoresPresentationPartials",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            var partials = response;
            //Get columns number before inserting partial ones
            var initialCellsNumber = getTableNumOfCells("#tScoreCar");

            //Column headers to add
            var headersToAdd = PartialCells.Presentation.headers;
            
            //Fields for sorting
            var headersToAdd_sortfield = PartialCells.Presentation.sortfield;
            
            //Add columns to the header row
            addCellsToTableHeader("#tScoreCar", headersToAdd, headersToAdd_sortfield);

            //Add columns
            var cellsToAdd = new Array();
            for (var i = 0; i < partials.length; i++) {
                var item = partials[i];
                var scoreid = item.ScoreId;

                cellsToAdd.length = 0;

                //FD 2021.07.27 - ATA 2021  - Add Stage1
                //cellsToAdd.push(item.Stage1, item.ExecutiveSummary, item.Novelty, item.Content, item.Finances, item.DeepDiveTopic, item.DemonstrationAndStructure, item.Delivery, item.Questions, item.GeneralImpression, item.Miscellaneous);
            	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
            	//cellsToAdd.push(item.Stage1, item.ExecutiveSummary, item.Novelty, item.Content, item.Finances, item.DeepDiveTopic, item.DemonstrationAndStructure, item.Delivery, item.Questions, item.GeneralImpression, item.Miscellaneous);
            	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
            	//cellsToAdd.push(item.Stage1, item.Novelty, item.Content, item.Finances, item.DeepDiveTopic, item.DemonstrationAndStructure, item.Delivery, item.Questions, item.GeneralImpression, item.Miscellaneous);
            	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Remove Sezione <DemonstrationAndStructure>
            	//cellsToAdd.push(item.Stage1, item.Novelty, item.Content, item.Finances, item.DeepDiveTopic, item.DemonstrationAndDelivery, item.DemonstrationAndStructure, item.Delivery, item.Questions, item.GeneralImpression, item.Miscellaneous);

            	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2>
            	//cellsToAdd.push(item.Stage1, item.Novelty, item.Content, item.Finances, item.DeepDiveTopic, item.DemonstrationAndDelivery, item.Delivery, item.Questions, item.GeneralImpression, item.Miscellaneous);
            	//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
            	//cellsToAdd.push(item.Stage1, item.Stage2, item.Novelty, item.Content, item.Finances, item.DeepDiveTopic, item.DemonstrationAndDelivery, item.Delivery, item.Questions, item.GeneralImpression, item.Miscellaneous);
                cellsToAdd.push(item.Stage1, item.Stage2, item.Novelty, item.Content, item.Finances, item.DeepDiveTopic, item.DemonstrationAndDelivery, item.Delivery, item.Questions, item.GeneralImpression, item.Miscellaneous, item.Finals);

                var row = $('tr[data-scoreid="' + scoreid + '"]');
                addCellsToTableRow(row, cellsToAdd, 'partial outlined');
            }
            //Search for rows with no scores yet, we have to fill columns with something
            var rowsStillWithoutScore = $('#tScoreCar tr[data-scoreid="-1"]');
            addMissingCellsToRows(rowsStillWithoutScore, initialCellsNumber, headersToAdd.length, 'partial');

            //Hide University and Examboard
            toggleTableCellByIndex("#tScoreCar", 4, false);
            toggleTableCellByIndex("#tScoreCar", 5, false);

        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

//Event 2018 - Show partials scores for Presentation and Design
function WS_showRecords_scores_design1C3_partial(scoresidlist) {
    //console.log("scoresidlist " + scoresidlist);

    var obj = {};
    obj.scoresidlist = scoresidlist;
    var theString = JSON.stringify(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetScoresDesign1C3Partials",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            var partials = response;

            //Get columns number before inserting partial ones
            var initialCellsNumber = getTableNumOfCells("#tScoreCar");

            //Column headers to add
            var headersToAdd = PartialCells.Design1C3.headers;
            //Fields for sorting
            var headersToAdd_sortfield = PartialCells.Design1C3.sortfield;

            //Add columns to the header row
            addCellsToTableHeader("#tScoreCar", headersToAdd, headersToAdd_sortfield);

            //Add columns
            var cellsToAdd = new Array();
            for (var i = 0; i < partials.length; i++) {
                var item = partials[i];
                var scoreid = item.ScoreId;

                cellsToAdd.length = 0;
                cellsToAdd.push(item.Suspension, item.FrameBodyAero, item.Powertrain, item.CockpitControlsBrakesSafety, item.SystemManagementIntegration, item.ManufacturabilityServiceability, item.AestheticsStyle, item.Creativity, item.Miscellaneous);

                var row = $('tr[data-scoreid="' + scoreid + '"]');
                addCellsToTableRow(row, cellsToAdd, 'partial');
            }
            //Search for rows with no scores yet, we have to fill columns with something
            var rowsStillWithoutScore = $('#tScoreCar tr[data-scoreid="-1"]');
            addMissingCellsToRows(rowsStillWithoutScore, initialCellsNumber, headersToAdd.length, 'partial');

            //Hide University and Examboard
            toggleTableCellByIndex("#tScoreCar", 4, false);
            toggleTableCellByIndex("#tScoreCar", 5, false);

        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

//Event 2018 - Show partials scores for Presentation and Design
function WS_showRecords_scores_design1E_partial(scoresidlist) {
    //console.log("scoresidlist " + scoresidlist);

    var obj = {};
    obj.scoresidlist = scoresidlist;
    var theString = JSON.stringify(obj);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://77.108.25.178:782/services/ATA_WebService.asmx/GetScoresDesign1EPartials",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }
            var partials = response;

            //Get columns number before inserting partial ones
            var initialCellsNumber = getTableNumOfCells("#tScoreCar");

            //Column headers to add
            var headersToAdd = PartialCells.Design1E.headers;
            //Fields for sorting
            var headersToAdd_sortfield = PartialCells.Design1E.sortfield;

            //Add columns to the header row
            addCellsToTableHeader("#tScoreCar", headersToAdd, headersToAdd_sortfield);

            //Add columns
            var cellsToAdd = new Array();
            for (var i = 0; i < partials.length; i++) {
                var item = partials[i];
                var scoreid = item.ScoreId;

                cellsToAdd.length = 0;
                cellsToAdd.push(item.Suspension, item.FrameBodyAero, item.TractiveDriveRecoverySystem, item.CockpitControlsBrakesSafety, item.SystemManagementIntegration, item.ManufacturabilityServiceability, item.AestheticsStyle, item.Creativity, item.Miscellaneous);

                var row = $('tr[data-scoreid="' + scoreid + '"]');
                addCellsToTableRow(row, cellsToAdd, 'partial');
            }
            //Search for rows with no scores yet, we have to fill columns with something
            var rowsStillWithoutScore = $('#tScoreCar tr[data-scoreid="-1"]');
            addMissingCellsToRows(rowsStillWithoutScore, initialCellsNumber, headersToAdd.length, 'partial');

            //Hide University and Examboard
            toggleTableCellByIndex("#tScoreCar", 4, false);
            toggleTableCellByIndex("#tScoreCar", 5, false);

        }, //success
        error: function (msg, error, errorThrown) {
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

