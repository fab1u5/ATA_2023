$(document).ready(function () {
    Body.navBar();
    Body.spinnerSignal();

    pageInitializeNavBar('Upload Tools');
    Body.footer();

    waitOFF();

    //Car info, common to all uploads classes
    function upload_carinfo(c, t, u) {
        this.carno = c;
        this.teamname = t;
        this.university = u;
    };

    //Event 2018 - new uploads added
    // ----------------- DynamicPenalties Section ---------------------------------
    $("#tblWaitDynamicPenalties").hide();
    $("#btnCloseDynamicPenalties").show();

    $('#bUploadDynamicPenalties').click(function (event) {
        event.preventDefault();
        openModalDialog('#modalUploadDynamicPenalties');
    });

    $('#btnCloseDynamicPenalties').click(function () {
        if (!$(this).hasClass('disabled')) { closeModalDialog('#modalUploadDynamicPenalties'); }
    });

    disableButton("#btnUploadDynamicPenalties");

    //Arrays of structs
    var dynamicpenalties = {};
    dynamicpenalties.skidpad = new Array();
    dynamicpenalties.autocross = new Array();
    dynamicpenalties.endurance = new Array();

    //Define all structs mapping the Excel sheets fields 
    function skidpadDynamicPenalties(c, t, u, c1, c2, c3, c4) {
        upload_carinfo.call(this, c, t, u);
        this.run1numofcones = c1;
        this.run2numofcones = c2;
        this.run3numofcones = c3;
        this.run4numofcones = c4;
    };
    function autocrossDynamicPenalties(c, t, u, c1, d1, c2, d2, c3, d3, c4, d4) {
        upload_carinfo.call(this, c, t, u);
        this.run1numofcones = c1;
        this.run1doc = d1;
        this.run2numofcones = c2;
        this.run2doc = d2;
        this.run3numofcones = c3;
        this.run3doc = d3;
        this.run4numofcones = c4;
        this.run4doc = d4;
    };
    function enduranceDynamicPenalties(c, t, u, c1, d1) {
        upload_carinfo.call(this, c, t, u, c1, d1);
        this.numofcones = c1;
        this.doc = d1;
    };

    var oFileInDynamicPenalties;
    var oFileDynamicPenalties;
    var sFilenameDynamicPenalties;


    $(function () {
        oFileInDynamicPenalties = document.getElementById('btnSelectDynamicPenalties');
        if (oFileInDynamicPenalties.addEventListener) {
            oFileInDynamicPenalties.addEventListener('change', filePickedDynamicPenalties, false);
        }
    });

    function filePickedDynamicPenalties(oEvent) {
        //Get The file from the input
        oFileDynamicPenalties = oEvent.target.files[0];
        sFilenameDynamicPenalties = oFileDynamicPenalties.name;
        enableButton("#btnUploadDynamicPenalties");
        oFileDynamicPenalties.name = '';
    }

    $("#btnUploadDynamicPenalties").click(function () {
        ExcelToJSONDynamicPenalties();
    });

    function ExcelToJSONDynamicPenalties() {
        // Create A File Reader HTML5
        var reader = new FileReader();

        // Ready The Event For When A File Gets Selected
        reader.onload = function (e) {

            dynamicpenalties.skidpad.length = 0;
            dynamicpenalties.autocross.length = 0;
            dynamicpenalties.endurance.length = 0;

            var data = e.target.result;
            var workbook = XLSX.read(data, { type: 'binary' });

            // Loop Over Each Sheet
            workbook.SheetNames.forEach(function (sheetName) {
                console.log("------------------- sheetName ------------------- ");
                console.log(sheetName);

                var excelToJson = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, raw: false, range: 2 });

                console.log("------------------- excelToJson ------------------- ");
                console.log(excelToJson);

                //Get rid of void items
                excelToJson = jQuery.grep(excelToJson, function (value) {
                    return (value.length > 0);
                });

                console.log("------------------- excelToJson ------------------- ");
                console.log(excelToJson);

                //Populate related struct
                switch (sheetName.toUpperCase()) {
                    case "SKIDPAD":
                        ataToast("Reading Skidpad");
                        excelToJson.forEach(function (el) {
                            dynamicpenalties.skidpad.push(new skidpadDynamicPenalties(el[0], el[1], el[2], el[3], el[4], el[5], el[6]));
                        });
                        console.log("------------------- dynamicpenalties.skidpad ------------------- ");
                        console.log(dynamicpenalties.skidpad);
                        break;
                    case "AUTOCROSS":
                        ataToast("Reading Autocross");
                        excelToJson.forEach(function (el) {
                            dynamicpenalties.autocross.push(new autocrossDynamicPenalties(el[0], el[1], el[2], el[3], el[4], el[5], el[6], el[7], el[8], el[9], el[10]));
                        });
                        console.log("------------------- dynamicpenalties.autocross ------------------- ");
                        console.log(dynamicpenalties.autocross);
                        break;
                    case "ENDURANCE-EFFICIENCY":
                        ataToast("Reading Endurance-Efficiency");
                        excelToJson.forEach(function (el) {
                            dynamicpenalties.endurance.push(new enduranceDynamicPenalties(el[0], el[1], el[2], el[3], el[4]));
                        });
                        console.log("------------------- dynamicpenalties.endurance ------------------- ");
                        console.log(dynamicpenalties.endurance);
                        break;
                }
            });

            sendExcelDynamicPenalties();
        };
        reader.onerror = function (ex) {
            console.log("reader.onerror");
            console.log(ex);
        };
        // Tell JS To Start Reading The File.. You could delay this if desired
        reader.readAsBinaryString(oFileDynamicPenalties);
    }

    function sendExcelDynamicPenalties() {
        console.log("sendExcel - dynamicpenalties");
        console.log(dynamicpenalties);

        var obj = {};
        obj.dynamicpenalties = dynamicpenalties;
        var theString = JSON.stringify(obj);

        console.log("sendExcel - JSON dynamicpenalties");
        console.log(theString);

        waitON();
        $("#tblWaitDynamicPenalties").show();
        $("#btnCloseDynamicPenalties").hide();

        ataToast("Wait please...", 4500);

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "https://app.polimatica.it/atabeta/services/ATA_ImportService.asmx/DynamicPenaltiesUpload",
            data: theString,
            dataType: "json",
            success: function (response) {
                if (response.hasOwnProperty("d")) { response = response.d; }

                if (response.length == 0) {
                    ataToast("Done");
                    $('#btnCloseDynamicPenalties').get(0).click();
                }
                else {
                    ataToast("Some data were not saved, maybe due to uncorrect car numbers. Check dowloaded result file for more info and try again", 5000);

                    $('#downloadFileDynamicPenalties').remove();
                    $('<a></a>')
                     .attr('id', 'downloadFileDynamicPenalties')
                     .attr('href', 'data:text/csv;charset=utf8,' + '\uFEFF' + encodeURIComponent(response))
                     .attr('download', 'dynamicpenaltiesUnsuccessfullySaved.csv')
                     .appendTo('body');

                    $('#downloadFileDynamicPenalties').ready(function () {
                        $('#downloadFileDynamicPenalties').get(0).click();
                    });
                }

                waitOFF();
                $("#tblWaitDynamicPenalties").hide();
                $("#btnCloseDynamicPenalties").show();
            },
            error: function (msg, error, errorThrown) {
                waitOFF();
                $("#tblWaitDynamicPenalties").hide();
                $("#btnCloseDynamicPenalties").show();
                WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
            }
        });
        disableButton("#btnUploadDynamicPenalties");
    }
    // ----------------- End of DynamicPenalties Section --------------------------

    //Event 2017 - new upload added
    // ----------------- Cost Section -----------------------------------
    $("#tblWaitCost").hide();
    $("#btnCloseCost").show();

    $('#bUploadCost').click(function (event) {
        event.preventDefault();
        openModalDialog('#modalUploadCost');
    });

    $('#btnCloseCost').click(function () {
        if (!$(this).hasClass('disabled')) { closeModalDialog('#modalUploadCost'); }
    });

    disableButton("#btnUploadCost");

    //Arrays of structs
    var cost = {};
    cost.costs = new Array();

    //Define all structs mapping the Excel sheets fields 
    function Cost(c, t, u, lc) {
        upload_carinfo.call(this, c, t, u);
        this.lowestcost = lc;
    };

    var oFileInCost;
    var oFileCost;
    var sFilenameCost;

    $(function () {
        oFileInCost = document.getElementById('btnSelectCost');
        if (oFileInCost.addEventListener) {
            oFileInCost.addEventListener('change', filePickedCost, false);
        }
    });

    function filePickedCost(oEvent) {
        //Get The file from the input
        oFileCost = oEvent.target.files[0];
        sFilenameCost = oFileCost.name;
        enableButton("#btnUploadCost");
    }

    $("#btnUploadCost").click(function () {
        ExcelToJSONCost();
    });

    function ExcelToJSONCost() {
        // Create A File Reader HTML5
        var reader = new FileReader();

        // Ready The Event For When A File Gets Selected
        reader.onload = function (e) {

            cost.costs.length = 0;

            var data = e.target.result;
            var workbook = XLSX.read(data, { type: 'binary' });

            // Loop Over Each Sheet
            workbook.SheetNames.forEach(function (sheetName) {
                console.log("------------------- sheetName ------------------- ");
                console.log(sheetName);

                var excelToJson = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, raw: false, range: 2 });

                console.log("------------------- excelToJson ------------------- ");
                console.log(excelToJson);

                //Get rid of void items
                excelToJson = jQuery.grep(excelToJson, function (value) {
                    return (value.length > 0);
                });

                console.log("------------------- excelToJson ------------------- ");
                console.log(excelToJson);

                //Populate related struct
                switch (sheetName.toUpperCase()) {
                    case "COST":
                        ataToast("Reading Cost");
                        excelToJson.forEach(function (el) {
                            //cost.costs.push(new Cost(el[0], el[1], el[2], el[3]));
                            c = new Cost(el[0], "", "", 0);
                            if (el[1] != undefined)
                                c.teamname = el[1];
                            if (el[2] != undefined)
                                c.university = el[2];
                            if (el[3] != undefined)
                                c.lowestcost = el[3];
                            cost.costs.push(c);
                        });
                        console.log("------------------- cost ------------------- ");
                        console.log(cost);
                        break;
                }
            });

            sendExcelCost();
        };
        reader.onerror = function (ex) {
            console.log("reader.onerror");
            console.log(ex);
        };
        // Tell JS To Start Reading The File.. You could delay this if desired
        reader.readAsBinaryString(oFileCost);
    }

    function sendExcelCost() {
        console.log("sendExcel - cost");
        console.log(cost);

        var obj = {};
        obj.cost = cost;
        var theString = JSON.stringify(obj);

        console.log("sendExcel - JSON cost");
        console.log(theString);

        waitON();
        $("#tblWaitCost").show();
        $("#btnCloseCost").hide();

        ataToast("Wait please...", 4500);

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "https://app.polimatica.it/atabeta/services/ATA_ImportService.asmx/CostUpload",
            data: theString,
            dataType: "json",
            success: function (response) {
                if (response.hasOwnProperty("d")) { response = response.d; }

                if (response.length == 0) {
                    ataToast("Done");
                    $('#btnCloseCost').get(0).click();
                }
                else {
                    ataToast("Some data were not saved, maybe due to uncorrect car numbers. Check dowloaded result file for more info and try again", 5000);

                    $('#downloadFileCost').remove();
                    $('<a></a>')
                     .attr('id', 'downloadFileCost')
                     .attr('href', 'data:text/csv;charset=utf8,' + '\uFEFF' + encodeURIComponent(response))
                     .attr('download', 'costUnsuccessfullySaved.csv')
                     .appendTo('body');

                    $('#downloadFileCost').ready(function () {
                        $('#downloadFileCost').get(0).click();
                    });
                }

                waitOFF();
                $("#tblWaitCost").hide();
                $("#btnCloseCost").show();
            },
            error: function (msg, error, errorThrown) {
                waitOFF();
                $("#tblWaitCost").hide();
                $("#btnCloseCost").show();
                WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
            }
        });
        disableButton("#btnUploadCost");
    }
    // ----------------- End of Cost Section ----------------------------


    // ----------------- Timing Section ---------------------------------
    $("#tblWaitTiming").hide();
    $("#btnCloseTiming").show();

    $('#bUploadTiming').click(function (event) {
        event.preventDefault();
        openModalDialog('#modalUploadTiming');
    });

    $('#btnCloseTiming').click(function () {
        if (!$(this).hasClass('disabled')) { closeModalDialog('#modalUploadTiming'); }
    });

    disableButton("#btnUploadTiming");

    //Arrays of structs
    var timing = {};
    timing.acceleration = new Array();
    timing.skidpad = new Array();
    timing.autocross = new Array();
    timing.endurance = new Array();

    //Define all structs mapping the Excel sheets fields 
    function accelerationTiming(c, t, u, r1, r2, r3, r4) {
        upload_carinfo.call(this, c, t, u);
        this.run1time = r1;
        this.run2time = r2;
        this.run3time = r3;
        this.run4time = r4;
    };
    function skidpadTiming(c, t, u, r1, r2, r3, r4) {
        upload_carinfo.call(this, c, t, u);
        this.run1time = r1;
        this.run2time = r2;
        this.run3time = r3;
        this.run4time = r4;
    };
    function autocrossTiming(c, t, u, r1, r2, r3, r4) {
        upload_carinfo.call(this, c, t, u);
        this.run1time = r1;
        this.run2time = r2;
        this.run3time = r3;
        this.run4time = r4;
    };
    function enduranceTiming(c, t, u, tm, l) {
        upload_carinfo.call(this, c, t, u);
        this.time = tm;
        this.laps = l;
    };

    var oFileInTiming;
    var oFileTiming;
    var sFilenameTiming;


    $(function () {
        oFileInTiming = document.getElementById('btnSelectTiming');
        if (oFileInTiming.addEventListener) {
            oFileInTiming.addEventListener('change', filePickedTiming, false);
        }
    });

    function filePickedTiming(oEvent) {
        //Get The file from the input
        oFileTiming = oEvent.target.files[0];
        sFilenameTiming = oFileTiming.name;
        enableButton("#btnUploadTiming");
        oFileTiming.name = '';
    }

    $("#btnUploadTiming").click(function () {
        ExcelToJSONTiming();
    });

    function ExcelToJSONTiming() {
        // Create A File Reader HTML5
        var reader = new FileReader();

        // Ready The Event For When A File Gets Selected
        reader.onload = function (e) {

            timing.acceleration.length = 0;
            timing.skidpad.length = 0;
            timing.autocross.length = 0;
            timing.endurance.length = 0;

            var data = e.target.result;
            var workbook = XLSX.read(data, { type: 'binary' });

            // Loop Over Each Sheet
            workbook.SheetNames.forEach(function (sheetName) {
                console.log("------------------- sheetName ------------------- ");
                console.log(sheetName);

                var excelToJson = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, raw: false, range: 2 });

                console.log("------------------- excelToJson ------------------- ");
                console.log(excelToJson);

                //Get rid of void items
                excelToJson = jQuery.grep(excelToJson, function (value) {
                    return (value.length > 0);
                });

                console.log("------------------- excelToJson ------------------- ");
                console.log(excelToJson);

                //Populate related struct
                switch (sheetName.toUpperCase()) {
                    case "ACCELERATION":
                        ataToast("Reading Acceleration");
                        excelToJson.forEach(function (el) {
                            timing.acceleration.push(new accelerationTiming(el[0], el[1], el[2], el[3], el[4], el[5], el[6]));
                        });
                        console.log("------------------- timing.acceleration ------------------- ");
                        console.log(timing.acceleration);
                        break;
                    case "SKIDPAD":
                        ataToast("Reading Skidpad");
                        excelToJson.forEach(function (el) {
                            timing.skidpad.push(new skidpadTiming(el[0], el[1], el[2], el[3], el[4], el[5], el[6]));
                        });
                        console.log("------------------- timing.skidpad ------------------- ");
                        console.log(timing.skidpad);
                        break;
                    case "AUTOCROSS":
                        ataToast("Reading Autocross");
                        excelToJson.forEach(function (el) {
                            timing.autocross.push(new autocrossTiming(el[0], el[1], el[2], el[3], el[4], el[5], el[6]));
                        });
                        console.log("------------------- timing.autocross ------------------- ");
                        console.log(timing.autocross);
                        break;
                    case "ENDURANCE-EFFICIENCY":
                        ataToast("Reading Endurance-Efficiency");
                        excelToJson.forEach(function (el) {
                            timing.endurance.push(new enduranceTiming(el[0], el[1], el[2], el[3], el[4]));
                        });
                        console.log("------------------- timing.endurance ------------------- ");
                        console.log(timing.endurance);
                        break;
                }
            });

            sendExcelTiming();
        };
        reader.onerror = function (ex) {
            console.log("reader.onerror");
            console.log(ex);
        };
        // Tell JS To Start Reading The File.. You could delay this if desired
        reader.readAsBinaryString(oFileTiming);
    }

    function sendExcelTiming() {
        console.log("sendExcel - timing");
        console.log(timing);

        var obj = {};
        obj.timing = timing;
        var theString = JSON.stringify(obj);

        console.log("sendExcel - JSON timing");
        console.log(theString);

        waitON();
        $("#tblWaitTiming").show();
        $("#btnCloseTiming").hide();

        ataToast("Wait please...", 4500);

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "https://app.polimatica.it/atabeta/services/ATA_ImportService.asmx/TimingUpload",
            data: theString,
            dataType: "json",
            success: function (response) {
                if (response.hasOwnProperty("d")) { response = response.d; }

               if (response.length == 0) {
                   ataToast("Done");
                    $('#btnCloseTiming').get(0).click();
                }
                else {
                   ataToast("Some data were not saved, maybe due to uncorrect car numbers. Check dowloaded result file for more info and try again", 5000);

                    $('#downloadFileTiming').remove();
                    $('<a></a>')
                     .attr('id', 'downloadFileTiming')
                     .attr('href', 'data:text/csv;charset=utf8,' + '\uFEFF' + encodeURIComponent(response))
                     .attr('download', 'timingUnsuccessfullySaved.csv')
                     .appendTo('body');

                    $('#downloadFileTiming').ready(function () {
                        $('#downloadFileTiming').get(0).click();
                    });
                }

               waitOFF();
               $("#tblWaitTiming").hide();
               $("#btnCloseTiming").show();
            },
            error: function (msg, error, errorThrown) {
                waitOFF();
                $("#tblWaitTiming").hide();
                $("#btnCloseTiming").show();
                WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
            }
        });
        disableButton("#btnUploadTiming");
    }
    // ----------------- End of Timing Section --------------------------

    // ----------------- Fuel Consumption Section -----------------------
    $("#tblWaitFuelConsumption").hide();
    $('#btnCloseFuelConsumption').show();

    $('#bUploadFuelConsumption').click(function (event) {
        event.preventDefault();
        openModalDialog('#modalUploadFuelConsumption');
    });

    $('#btnCloseFuelConsumption').click(function () {
        if (!$(this).hasClass('disabled')) { closeModalDialog('#modalUploadFuelConsumption'); }
    });

    disableButton("#btnUploadFuelConsumption");

    //Arrays of structs
    var fuelConsumption = {};
    fuelConsumption.endurance = new Array();

    //Define all structs mapping the Excel sheets fields 
    function enduranceFuelConsumption(c, t, u, fc, ft) {
        upload_carinfo.call(this, c, t, u);
        this.fuelconsumption = fc;
        this.fueltype = ft;
    };

    var oFileInFuelConsumption;
    var oFileFuelConsumption;
    var sFilenameFuelConsumption;

    $(function () {
        oFileInFuelConsumption = document.getElementById('btnSelectFuelConsumption');
        if (oFileInFuelConsumption.addEventListener) {
            oFileInFuelConsumption.addEventListener('change', filePickedFuelConsumption, false);
        }
    });

    function filePickedFuelConsumption(oEvent) {
        //Get The file from the input
        oFileFuelConsumption = oEvent.target.files[0];
        sFilenameFuelConsumption = oFileFuelConsumption.name;
        enableButton("#btnUploadFuelConsumption");
    }

    $("#btnUploadFuelConsumption").click(function () {
        ExcelToJSONFuelConsumption();
    });

    function ExcelToJSONFuelConsumption() {
        // Create A File Reader HTML5
        var reader = new FileReader();

        // Ready The Event For When A File Gets Selected
        reader.onload = function (e) {

            fuelConsumption.length = 0;

            var data = e.target.result;
            var workbook = XLSX.read(data, { type: 'binary' });

            // Loop Over Each Sheet
            workbook.SheetNames.forEach(function (sheetName) {
                console.log("------------------- sheetName ------------------- ");
                console.log(sheetName);

                var excelToJson = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, raw: false, range: 2 });

                console.log("------------------- excelToJson ------------------- ");
                console.log(excelToJson);

                //Get rid of void items
                excelToJson = jQuery.grep(excelToJson, function (value) {
                    return (value.length > 0);
                });

                console.log("------------------- excelToJson ------------------- ");
                console.log(excelToJson);

                //Populate related struct
                switch (sheetName.toUpperCase()) {
                    case "ENDURANCE-EFFICIENCY":
                        ataToast("Reading Endurance-Efficiency");
                        excelToJson.forEach(function (el) {
                            fuelConsumption.endurance.push(new enduranceFuelConsumption(el[0], el[1], el[2], el[3], el[4]));
                        });
                        console.log("------------------- fuelConsumption.endurance ------------------- ");
                        console.log(fuelConsumption);
                        break;
                }
            });

            sendExcelFuelConsumption();
        };
        reader.onerror = function (ex) {
            console.log("reader.onerror");
            console.log(ex);
        };
        // Tell JS To Start Reading The File.. You could delay this if desired
        reader.readAsBinaryString(oFileFuelConsumption);
    }

    function sendExcelFuelConsumption() {
        console.log("sendExcel - fuelConsumption");
        console.log(fuelConsumption);

        var obj = {};
        obj.fuelConsumption = fuelConsumption;
        var theString = JSON.stringify(obj);

        console.log("sendExcel - JSON fuelConsumption");
        console.log(theString);

        waitON();
        $("#tblWaitFuelConsumption").show();
        $('#btnCloseFuelConsumption').hide();

        ataToast("Wait please...", 4500);

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "https://app.polimatica.it/atabeta/services/ATA_ImportService.asmx/FuelConsumptionUpload",
            data: theString,
            dataType: "json",
            success: function (response) {
                if (response.hasOwnProperty("d")) { response = response.d; }

                if (response.length == 0) {
                    ataToast("Done");
                    $('#btnCloseFuelConsumption').get(0).click();
                }
                else {
                    ataToast("Some data were not saved, maybe due to uncorrect car numbers. Check dowloaded result file for more info and try again", 5000);

                    $('#downloadFileFuelConsumption').remove();
                    $('<a></a>')
                     .attr('id', 'downloadFileFuelConsumption')
                     .attr('href', 'data:text/csv;charset=utf8,' + '\uFEFF' + encodeURIComponent(response))
                     .attr('download', 'fuelConsumptionUnsuccessfullySaved.csv')
                     .appendTo('body');

                    $('#downloadFileFuelConsumption').ready(function () {
                        $('#downloadFileFuelConsumption').get(0).click();
                    });
                }

                waitOFF();
                $("#tblWaitFuelConsumption").hide();
                $('#btnCloseFuelConsumption').show();
            },
            error: function (msg, error, errorThrown) {
                waitOFF();
                $("#tblWaitFuelConsumption").hide();
                $('#btnCloseFuelConsumption').show();
                WS_Error("ERROR " + error + ":\r\n" + msg.responseText + ":\r\n" + errorThrown);
            }
        });
        disableButton("#btnUploadFuelConsumption");
    }
    // ----------------- End of Fuel Consumption Section -----------------

});

