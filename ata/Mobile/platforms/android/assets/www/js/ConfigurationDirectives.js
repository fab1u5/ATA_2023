var arConfigurationTables = [];

var allscores = {};
//Event 2017 - Save also uploading examboard
allscores.uploadingExamboard = 0;
allscores.design1E = new Array();
allscores.design1C3 = new Array();
allscores.presentation = new Array();
allscores.scorecost = new Array();
allscores.acceleration = new Array();
allscores.skidpad = new Array();
allscores.autocross = new Array();
allscores.endurance = new Array();


function configuration_clear_step1() {

    if (isATablet()) {

        db.transaction(function (tx) {

            tx.executeSql(
                "SELECT name FROM sqlite_master WHERE (type='table') AND (name NOT LIKE '%sqlite_sequence%' AND name NOT LIKE '%webkitdatabaseinfotable%' AND name NOT LIKE 'TB_Versions')",
                [],
                function (tx, result) {

                    var dataset_tables = result.rows;
                    for (var i = 0; i < dataset_tables.length; i++) {
                        var item = dataset_tables.item(i);
                        arConfigurationTables.push(item['name'].toString().toUpperCase());
                    }

                    configuration_download_step2();

                    if (arConfigurationTables.length == 0) {
                        configuration_clear_step3();                        
                    }
                },
                function (tx, result) {
                    onError(tx, result);
                }
            );
        });
    }
}

function configuration_clear_step2() {

    if (isATablet()) {

        if (arConfigurationTables.length == 0) {
            return;
        }

        jQuery.each(arConfigurationTables, function (index, item) {

            arConfigurationTables = jQuery.grep(arConfigurationTables, function (value) {
                return value != item;
            });

            db.transaction(function (tx) {
                tx.executeSql(
                    'DELETE FROM ' + item,
                    [],
                    function (tx, result) {
                        configuration_download_step2();
                    },
                    function (tx, result) {
                        onError(tx, result);
                    }
                );
            });
        });
    }
}

function configuration_clear_step3() {

    if (isATablet()) {

        ataToast("Erasing data...");
        setTimeout(function () { ataToast("Redirecting...", 5000); }, 2500);
        setTimeout(function () {
            localStorage.setObj('ExamBoards2Handle', null);
            window.location = "Index.html";
        }, 5000);
    }
}

function configuration_download_step1() {

    if (isATablet()) {

        db.transaction(function (tx) {

            tx.executeSql(
                "SELECT name FROM sqlite_master WHERE (type='table') AND (name NOT LIKE '%sqlite_sequence%' AND name NOT LIKE '%webkitdatabaseinfotable%' AND name NOT LIKE 'TB_Versions')",
                [],
                function (tx, result) {

                    var dataset_tables = result.rows;
                    for (var i = 0; i < dataset_tables.length; i++) {
                        var item = dataset_tables.item(i);
                        arConfigurationTables.push(item['name'].toString().toUpperCase());
                    }

                    configuration_download_step2();

                    if (arConfigurationTables.length == 0) {
                        configuration_download_step3();
                    }
                },
                function (tx, result) {
                    onError(tx, result);
                }
            );
        });
    }
}

function configuration_download_step2() {
    if (isATablet()) {
        if (arConfigurationTables.length == 0) {
            return;
        }

        jQuery.each(arConfigurationTables, function (index, item) {
            arConfigurationTables = jQuery.grep(arConfigurationTables, function (value) {
                return value != item;
            });

            db.transaction(function (tx) {
                tx.executeSql(
                    'DELETE FROM ' + item,
                    [],
                    function (tx, result) {
                        configuration_download_step2();
                    },
                    function (tx, result) {
                        onError(tx, result);
                    }
                );
            });
        });
    }
}

function configuration_download_step3() {
    if (isATablet()) {

        ataToast("Downloading data...");

        if (WS_dataset_configuration_dn != "undefined") {

            db.transaction(function (tx) {
                //Fuels
                for (var i = 0; i < WS_dataset_configuration_dn.Fuels.length; i++) {
                    var item = WS_dataset_configuration_dn.Fuels[i];
                    tx.executeSql(
                        "INSERT INTO TB_Fuels (id, fuelname) VALUES( ? , ?)",
                        [item.Id, item.Name],
                        function (tx, result) { foo(); },
                        function (tx, result) { onError(tx, result); }
                    );
                }

                //Classes
                for (var i = 0; i < WS_dataset_configuration_dn.Classes.length; i++) {
                    var item = WS_dataset_configuration_dn.Classes[i];
                    tx.executeSql(
                        "INSERT INTO TB_Classes (id, classname) VALUES( ? , ?)",
                        [item.Id, item.Name],
                        function (tx, result) { foo(); },
                        function (tx, result) { onError(tx, result); }
                    );
                }

                //Teams
                for (var i = 0; i < WS_dataset_configuration_dn.Teams.length; i++) {
                    var item = WS_dataset_configuration_dn.Teams[i];
                    tx.executeSql(
                        "INSERT INTO TB_Teams (id, teamname, university, country) VALUES (?, ?, ?, ?)",
                        [item.Id, item.Name, item.University, item.Country],
                        function (tx, result) { foo(); },
                        function (tx, result) { onError(tx, result); }
                    );
                }

                //Cars
                for (var i = 0; i < WS_dataset_configuration_dn.Cars.length; i++) {
                    var item = WS_dataset_configuration_dn.Cars[i];
                    tx.executeSql(
                        "INSERT INTO TB_Cars (id, carno, regno, teamid, classid, fuelid, deliverydocdate, boxno) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                        [item.Id, item.Carno, item.Regno, item.Team.Id, item.Class.Id, item.Fuel.Id, datefyJSON(item.DeliveryDocDate), item.BoxNo],
                        function (tx, result) { foo(); },
                        function (tx, result) { onError(tx, result); }
                    );
                }

                //Examiners
                for (var i = 0; i < WS_dataset_configuration_dn.Examiners.length; i++) {
                    var item = WS_dataset_configuration_dn.Examiners[i];
                    tx.executeSql(
                        "INSERT INTO TB_Examiners (id, firstname, surname, phone) VALUES (?, ?, ?, ?)",
                        [item.Id, item.FirstName, item.Surname, item.Phone],
                        function (tx, result) { foo(); },
                        function (tx, result) { onError(tx, result); }
                    );
                }

                //Examboards
                var item = WS_dataset_configuration_dn.ExamBoard;

                //AF - Giu 2016 - Examboard is connected to a single Event
                tx.executeSql(
                    "INSERT INTO TB_ExamBoards (id, examboardname, description, usecolor, color, eventid) VALUES (?, ?, ?, ?, ?, ?)",
                    [item.Id, item.Name, item.Description, item.IsColorUsed, item.Color, item.Event.Id],
                    function (tx, result) { foo(); },
                    function (tx, result) { onError(tx, result); }
                );

                //ExamBoards2Examiners
                for (var i = 0; i < WS_dataset_configuration_dn.ExamBoardToExaminers.length; i++) {
                    var item = WS_dataset_configuration_dn.ExamBoardToExaminers[i];
                    tx.executeSql(
                        "INSERT INTO TB_ExamBoards2Examiners (examboardid, examinerid) VALUES (?,?)",
                        [item.ExamBoardId, item.ExaminerId],
                        function (tx, result) { foo(); },
                        function (tx, result) { onError(tx, result); }
                    );
                }

                //ExamBoards2Cars
                for (var i = 0; i < WS_dataset_configuration_dn.ExamBoardToCars.length; i++) {
                    var item = WS_dataset_configuration_dn.ExamBoardToCars[i];
                    tx.executeSql(
                        "INSERT INTO TB_ExamBoards2Cars (examboardid, carid) VALUES (?,?)",
                        [item.ExamBoardId, item.CarId],
                        function (tx, result) { foo(); },
                        function (tx, result) { onError(tx, result); }
                    );
                }

                //Events
                for (var i = 0; i < WS_dataset_configuration_dn.Events.length; i++) {
                    var item = WS_dataset_configuration_dn.Events[i];
                    tx.executeSql(
                        "INSERT INTO TB_Events (id, eventtypeid, eventnameid, description, scoretypenumeric, maximumscore) VALUES (?, ?, ?, ?, ?, ?)",
                        [item.Id, item.EventTypeId, item.EventNameId, item.Description, item.IsScoreNumeric, item.MaximumScore],
                        function (tx, result) { foo(); },
                        function (tx, result) { onError(tx, result); }
                    );
                }

                //EventTypes
                for (var i = 0; i < WS_dataset_configuration_dn.EventTypes.length; i++) {
                    var item = WS_dataset_configuration_dn.EventTypes[i];
                    tx.executeSql(
                        "INSERT INTO TB_EventsTypes (id, eventtypename) VALUES (?, ?)",
                        [item.Id, item.Name],
                        function (tx, result) { foo(); },
                        function (tx, result) { onError(tx, result); }
                    );
                }

                //EventNames
                for (var i = 0; i < WS_dataset_configuration_dn.EventNames.length; i++) {
                    var item = WS_dataset_configuration_dn.EventNames[i];
                    tx.executeSql(
                        "INSERT INTO TB_EventsNames (id, eventname, eventtypeid) VALUES (?, ?, ?)",
                        [item.Id, item.Name, item.EventType.Id],
                        function (tx, result) { foo(); },
                        function (tx, result) { onError(tx, result); }
                    );
                }

                Materialize.toast('Creating menu...', 2500, 'rounded', function () {
                    $("#divActions").html('');
                    $("#divActions").append('<ul class="collection" id="ulCollection">');
                    $("#tbodyExamBoards").append('</ul>');

                    $("#ulCollection").append('<li class="collection-item avatar" id="liGoToScores">');
                    $("#ulCollection").append('</li>');

                    //$("#liGoToScores").append('<i class="mdi mdi-chart-bar circle ata-green"></i>');
                    $("#liGoToScores").append('<img src="images/150x150_Scores.jpg" alt="" class="circle">');
                    
                    $("#liGoToScores").append('<span class="title">Assign Scores</span>');
                    $("#liGoToScores").append('<p>Assign or View Scores for the Events/Cars you are been enabled</p>');
                    $("#liGoToScores").append('<a href="Scores.html" class="btn-floating secondary-content ata-green"><i class="mdi mdi-play"></i></a>');
                })
            });
        }
    }
}

function configuration_upload() {
    if (isATablet()) {

        ataToast("Preparing data...");
        upload_prepare_design1E(upload_prepare_design1C3);
    }
};

function upload_prepare_design1E(upload_prepare_design1C3) {

    //ataToast("Preparing Design 1E...");

    db.transaction(function (tx) {
        console.log(selectStatement_scores_design1E_all);
        //SCORE DESIGN 1E
        tx.executeSql(
            selectStatement_scores_design1E_all,
            [],
            function (tx, data) {

                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {

                        var row = data.rows.item(i)
                        allscores.design1E.push(row);
                    }
                }

                upload_prepare_design1C3(upload_prepare_presentation);
            },
            function (tx, result) {
                console.log(result);
                ataToast("There was an error while sending data. Please contact the administrator.", 5000);
            }
        );
    });
};

function upload_prepare_design1C3(upload_prepare_presentation) {

    //ataToast("Preparing Design 1C-3...");

    db.transaction(function (tx) {

        tx.executeSql(
            selectStatement_scores_design1C3_all,
            [],
            function (tx, data) {

                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {

                        var row = data.rows.item(i)
                        allscores.design1C3.push(row);
                    }
                }

                upload_prepare_presentation(upload_prepare_scorecost);
            },
            function (tx, result) {
                ataToast("There was an error while sending data. Please contact the administrator.", 5000);
            }
        );
    });
}

function upload_prepare_presentation(upload_prepare_scorecost) {

    //ataToast("Preparing Presentation...");

    //SCORE PRESENTATION
    db.transaction(function (tx) {
        tx.executeSql(
            selectStatement_scores_presentation_all,
            [],
            function (tx, data) {

                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {

                        var row = data.rows.item(i)
                        allscores.presentation.push(row);
                    }
                }

                upload_prepare_scorecost(upload_prepare_acceleration);
            },
            function (tx, result) {
                ataToast("There was an error while sending data. Please contact the administrator.", 5000);
            }
        );
    });
}

function upload_prepare_scorecost(upload_prepare_acceleration) {

    //ataToast("Preparing Cost...");

    //SCORE SCORECOST
    db.transaction(function (tx) {
        tx.executeSql(
            selectStatement_scores_Cost_all,
            [],
            function (tx, data) {

                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {

                        var row = data.rows.item(i)
                        allscores.scorecost.push(row);
                    }
                }

                upload_prepare_acceleration(upload_prepare_skidpad);
            },
            function (tx, result) {
                ataToast("There was an error while sending data. Please contact the administrator.", 5000);
            }
        );
    });
}

function upload_prepare_acceleration(upload_prepare_skidpad) {

    //ataToast("Preparing Acceleration...");

    //SCORE ACCELERATION
    db.transaction(function (tx) {
        tx.executeSql(
            selectStatement_scores_acceleration_all,
            [],
            function (tx, data) {

                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {

                        var row = data.rows.item(i)
                        allscores.acceleration.push(row);
                    }
                }

                upload_prepare_skidpad(upload_prepare_autocross);
            },
            function (tx, result) {
                ataToast("There was an error while sending data. Please contact the administrator.", 5000, 'rounded');
            }
        );
    });
}

function upload_prepare_skidpad(upload_prepare_autocross) {

    //ataToast("Preparing Skidpad...");

    //SCORE SKIDPAD
    db.transaction(function (tx) {
        tx.executeSql(
            selectStatement_scores_skidpad_all,
            [],
            function (tx, data) {

                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {

                        var row = data.rows.item(i)
                        allscores.skidpad.push(row);
                    }
                }

                upload_prepare_autocross(upload_prepare_endurance);
            },
            function (tx, result) {
                ataToast("There was an error while sending data. Please contact the administrator.", 5000);
            }
        );
    });
}

function upload_prepare_autocross(upload_prepare_endurance) {

    //ataToast("Preparing Autocross...");

    //SCORE AUTOCROSS
    db.transaction(function (tx) {
        tx.executeSql(
            selectStatement_scores_autocross_all,
            [],
            function (tx, data) {

                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {

                        var row = data.rows.item(i)
                        allscores.autocross.push(row);
                    }
                }

                upload_prepare_endurance(upload_prepare_examboard);
            },
            function (tx, result) {
                ataToast("There was an error while sending data. Please contact the administrator.", 5000);
            }
        );
    });
}

function upload_prepare_endurance(upload_prepare_examboard) {

    //ataToast("Preparing Autocross...");

    //SCORE ENDURANCE
    db.transaction(function (tx) {
        tx.executeSql(
            selectStatement_scores_endurance_all,
            [],
            function (tx, data) {

                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {

                        var row = data.rows.item(i)
                        allscores.endurance.push(row);
                    }
                }

                upload_prepare_examboard(upload_prepare_finish);
            },
            function (tx, result) {
                ataToast("There was an error while sending data. Please contact the administrator.", 5000);
            }
        );
    });
}

function upload_prepare_examboard(upload_prepare_finish) {

    ////Event 2017 - Save also uploading examboard
    db.transaction(function (tx) {
        tx.executeSql(
            "SELECT * FROM TB_Examboards ORDER BY ROWID ASC LIMIT 1",
            [],
            function (tx, data) {

                if (data.rows.length > 0) {
                    var row = data.rows.item(0);
                    allscores.uploadingExamboard = row['id'];
                }

                upload_prepare_finish();
            },
            function (tx, result) {
                ataToast("There was an error while sending data. Please contact the administrator.", 5000);
            }
        );
    });
}

function upload_prepare_finish() {

    ataToast("Sending data...");

    var obj = {};
    obj.scores = allscores;
    var theString = JSON.stringify(obj);
    console.log(theString);

    waitON();

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://ems.polimatica.it/ATA/services/ATA_ImportService.asmx/DataUpload",
        data: theString,
        dataType: "json",
        success: function (response) {
            if (response.hasOwnProperty("d")) { response = response.d; }

            if (response == true) {
                ataToast("Done");
                window.setTimeout(backToLogin(), 1000);
            }
            else {
                ataToast("There was an error while sending data. Please contact the administrator.", 5000);
            }

            waitOFF();
        },
        error: function (msg, error, errorThrown) {

            waitOFF();
            WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
        }
    });
}

function backToLogin() {
    window.location.replace('LoginTablet.html');
}
