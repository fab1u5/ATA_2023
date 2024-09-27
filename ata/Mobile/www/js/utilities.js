$(function () {
    $(':input').on('keypress', function (e) {
        var ingnore_key_codes = [34, 39];
        if ($.inArray(e.which, ingnore_key_codes) >= 0) {
            e.preventDefault();
            ataToast("Single/Double quotes are not allowed");
        }
    });

    $(':input').on('paste', function () {
        var element = $(this);
        setTimeout(function () {
            element.val(element.val().replace(/['"]/g, ""));
        }, 1);
    });
});

$(function () {
    $('body').bind("contextmenu", function (e) {
        e.preventDefault();
    });
});

var KindOfUse = {
    onATablet: { kindOfUse: "T"},
    onAServer: { kindOfUse: "S"}
};

var TypeOfEventByName = {
    Overall: { value: "0", name: "Overall" },
    Presentation: { value: "1", name: "Presentation" },
    Cost: { value: "2", name: "Cost" },
    Design: { value: "3", name: "Design" },
    Acceleration: { value: "4", name: "Acceleration" },
    SkidPad: { value: "5", name: "SkidPad" },
    Autocross: { value: "6", name: "Autocross" },
    Endurance: { value: "7", name: "Endurance" }
};

var TypeOfClass = {
    Class1C : { value: "1", name: "1C" },
    Class1E : { value: "2", name: "1E" },
    Class3 : { value: "3", name: "3" }
};

//Event 2018 - Show partials scores for Presentation and Design
//Event 2019 - Presentation Event has been changed
//Cell headers to be displayed for the correspondant event and the correspondant field for sorting
//FD 2021.07.27 - ATA 2021  - Add Stage1
var PartialCells = {
	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - BEGIN tolta parte di executive summary
	//Presentation: { headers: ['Stage1', 'Executive Summary', 'Novelty', 'Content', 'Finances', 'Deep Dive Topic', 'Demonstr. & Structure', 'Delivery', 'Questions', 'General Impression', 'Miscellaneous'], sortfield: ['Stage1', 'ExecutiveSummary', 'Novelty', 'Content', 'Finances', 'DeepDiveTopic', 'DemonstrationAndStructure', 'Delivery', 'Questions', 'GeneralImpression', 'Miscellaneous'] },
	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Add Sezione <DemonstrationAndDelivery>
	//Presentation: { headers: ['Stage1', 'Novelty', 'Content', 'Finances', 'Deep Dive Topic', 'Demonstr. & Structure', 'Delivery', 'Questions', 'General Impression', 'Miscellaneous'], sortfield: ['Stage1', 'Novelty', 'Content', 'Finances', 'DeepDiveTopic', 'DemonstrationAndStructure', 'Delivery', 'Questions', 'GeneralImpression', 'Miscellaneous'] },
	//FD 2021.08.02 - ATA 2021 - Modify Stage3 - Remove Sezione <DemonstrationAndStructure>
	//Presentation: { headers: ['Stage1', 'Novelty', 'Content', 'Finances', 'Deep Dive Topic', 'Demonstr. & Delivery', 'Demonstr. & Structure', 'Delivery', 'Questions', 'General Impression', 'Miscellaneous'], sortfield: ['Stage1', 'Novelty', 'Content', 'Finances', 'DeepDiveTopic', 'DemonstrationAndStructure', 'Delivery', 'Questions', 'GeneralImpression', 'Miscellaneous'] },

	//FD 2021.08.02 - ATA 2021 - Adding Stage2 - Add Section <Stage2>
	//Presentation: { headers: ['Stage1', 'Novelty', 'Content', 'Finances', 'Deep Dive Topic', 'Demonstr. & Delivery', 'Structure', 'Questions', 'General Impression', 'Miscellaneous'], sortfield: ['Stage1', 'Novelty', 'Content', 'Finances', 'DeepDiveTopic', 'DemonstrationAndDelivery', 'Delivery', 'Questions', 'GeneralImpression', 'Miscellaneous'] },
	//FD 2021.09.12 - ATA 2021 - Add Section <Finals in Stage3>
	//Presentation: { headers: ['Stage1', 'Stage2', 'Novelty', 'Content', 'Finances', 'Deep Dive Topic', 'Demonstr. & Delivery', 'Structure', 'Questions', 'General Impression', 'Miscellaneous'], sortfield: ['Stage1', 'Novelty', 'Content', 'Finances', 'DeepDiveTopic', 'DemonstrationAndDelivery', 'Delivery', 'Questions', 'GeneralImpression', 'Miscellaneous'] },
	Presentation: { headers: ['Stage1', 'Stage2', 'Novelty', 'Content', 'Finances', 'Deep Dive Topic', 'Demonstr. & Delivery', 'Structure', 'Questions', 'General Impression', 'Miscellaneous', 'Finals'], sortfield: ['Stage1', 'Novelty', 'Content', 'Finances', 'DeepDiveTopic', 'DemonstrationAndDelivery', 'Delivery', 'Questions', 'GeneralImpression', 'Miscellaneous', 'Finals'] },


	Design1C3: { headers: ['Suspensions', 'Body /Aero', 'Powertrain', 'Cockpit /Safety', 'System Integration', 'Manufact. & Service', 'Style', 'Creativity', 'Misc'], sortfield: ['Suspensions', 'FrameBodyAero', 'PowerTrain', 'CockpitControlsBrakes/Safety', 'SystemManagementIntegration', 'ManufacturabilityServiceability', 'AestheticsStyle', 'Creativity', 'Miscellaneous'] },
    Design1E: { headers: ['Suspensions', 'Body /Aero', 'E-Powertain', 'Cockpit /Safety', 'System Integration', 'Manufact. & Service', 'Style', 'Creativity', 'Misc'], sortfield: ['Suspensions', 'FrameBodyAero', 'TractiveDriveRecoverySystem', 'CockpitControlsBrakes/Safety', 'SystemManagementIntegration', 'ManufacturabilityServiceability', 'AestheticsStyle', 'Creativity', 'Miscellaneous'] }
};

function isATablet() {
    var bIsATablet = (sessionStorage.kindOfUse == KindOfUse.onATablet.kindOfUse);
    return (bIsATablet);
}

function nbspToSpace(txt) {
    return (txt.toLowerCase() == "&nbsp;") ? "" : txt;
}

function closeModalDialog(oo) {
    $(oo).closeModal();
}

function openModalDialog(oo) {
    $(oo).openModal({
        dismissible: false,
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
    });
}

function disableButton(oo) {
    $(oo).prop("disabled", true);
    $(oo).toggleClass("disabled", true);
}

function enableButton(oo) {
    $(oo).prop("disabled", false);
    $(oo).toggleClass("disabled", false);
}

function isNumber(evt, element) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (
        (charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
        (charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function onlyNumbersWith4Decimals(oo) {
    $(oo).bind("keypress", function () {
        return isNumber(event, this);
    });

    $(oo).bind("blur", function () {
        if ($(oo).val().length > 0) {
            var num = parseFloat($(oo).val());
            if (isNaN(num)) num = 0;
            $(oo).val(num.toFixed(4));
        }
    });
}

function onlyNumbersWith1Decimals(oo) {
    $(oo).bind("keypress", function () {
        return isNumber(event, this);
    });

    $(oo).bind("blur", function () {
        if ($(oo).val().length > 0) {
            var num = parseFloat($(oo).val());
            if (isNaN(num)) num = 0;
            $(oo).val(num.toFixed(1));
        }
    });
}

function onlyNumbers(oo) {
    $(oo).bind("keypress", function () {
        return isNumber(event, this);
    });

    $(oo).bind("blur", function () {
        if ($(oo).val().length > 0) {
            var num = parseFloat($(oo).val());
            if (isNaN(num)) num = 0;
            $(oo).val(num.toFixed(0));
        }
    });
}

function onlyNumbersWithMinMax(oo) {
    $(oo).bind("keypress", function () {
        return isNumber(event, this);
    });

    $(oo).bind("blur", function () {
        if ($(oo).val().length > 0) {

            var min = parseFloat($(oo).attr('min'));
            var max = parseFloat($(oo).attr('max'));

            var num = parseFloat($(oo).val());

            if ((num >= min) && (num <= max)) {
                $(oo).val(num.toFixed(0));
                return true;
            }
            else {
                ataToast("The value you inserted is bigger than the maximum allowed", 4000);
                $(oo).val('0');
                $(oo).focus();
                return false;
            }
        }
    });
}

function findArrayElement(array, search) {
    for (var ii in array) {
        if (array[ii] == search)
            return ii;
    }
    return -1;
}

function findArrayElementById(array, search) {
    for (var ii in array) {
        if (array[ii].id == search)
            return ii;
    }
    return -1;
}

//Gets page params
function getParam(name) {
    var start = location.search.indexOf("?" + name + "=");
    if (start < 0) start = location.search.indexOf("&" + name + "=");
    if (start < 0) return '';
    start += name.length + 2;
    var end = location.search.indexOf("&", start) - 1;
    if (end < 0) end = location.search.length;
    var result = '';

    for (var i = start; i <= end; i++) {
        var c = location.search.charAt(i);
        result = result + (c == '+' ? ' ' : c);
    }
    return unescape(result);
}

function pageInitializeTitleOnly(title) {

    $('#divNavBar').html('');

    //Standard Menu
    $('#divNavBar').append('<img src="images/ATA.png" title="Formula SAE Italy & Formula Electric Italy 2015"/><label class="white-text" style="vertical-align:top;font-size: x-large; padding-left: 10px;">' + title + '</label>');

    $(".button-collapse").sideNav();
    $(".dropdown-button").dropdown();

    $("body").fadeIn(2000);             // Fade In Effect when Page Load..

    $('.collapsible').collapsible({
        accordion: false                // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
}

function pageInitializeVoidMenu(title) {

    $('#divNavBar').html('');

    //Standard Menu
    $('#divNavBar').append('<img src="images/ATA.png" title="Formula SAE Italy & Formula Electric Italy 2015"/><label class="white-text" style="vertical-align:top;font-size: x-large; padding-left: 10px;">' + title + '</label>');
    //$('#divNavBar').append('<a href="#" data-activates="mobileNavBar" class="button-collapse"><i class="mdi-navigation-menu"></i></a>');
    $('#divNavBar').append('<ul class="right hide-on-small-and-down" id="ulNavBar">');
    //$('#ulNavBar').append('<li class="active"><a href="Login.html"><i class="white-text mdi-action-home" title="Home"></i></a></li>');
    $('#divNavBar').append('</ul>');

    //Mobile Menu
    $('#divNavBar').append('<ul class="side-nav" id="mobileNavBar">');
    $('#mobileNavBar').append('<li><a href="LoginTablet.html">Home</a></li>');
    $('#divNavBar').append('</ul>');

    $(".button-collapse").sideNav();
    $(".dropdown-button").dropdown();

    $("body").fadeIn(2000);             // Fade In Effect when Page Load..

    $('.collapsible').collapsible({
        accordion: false                // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
}

function pageInitializeNavBar(title) {

    var tabToSelect = document.location.href.match(/[^\/]+$/)[0].toUpperCase().replace('.HTML', '');

    $('#divNavBar').html('');

    //Standard Menu
    $('#divNavBar').append('<img src="images/ATA.png" title="Formula SAE Italy & Formula Electric Italy 2015"/><label class="white-text" style="vertical-align:top;font-size: x-large; padding-left: 10px; ">' + title + '</label>');
    //$('#divNavBar').append('<a href="#" data-activates="mobileNavBar" class="button-collapse"><i class="mdi-navigation-menu"></i></a>');
    $('#divNavBar').append('<ul class="right hide-on-small-and-down" id="ulNavBar">');

    if (!isATablet()) {
        $('#ulNavBar').append('<li id="navBarINDEX"><a href="#" onclick="exitFromApplication();"><i class="white-text mdi mdi-home" title="Home"></i></a></li>');
        $('#ulNavBar').append('<li id="navBarTEAMS"><a href="Teams.html"><i class="white-text mdi mdi-tshirt-crew" title="Teams"></i></a></li>');
        $('#ulNavBar').append('<li id="navBarCARS"><a href="Cars.html"><i class="white-text mdi mdi-car" title="Cars"></i></a></li>');
        $('#ulNavBar').append('<li id="navBarEXAMINERS"><a href="Examiners.html"><i class="white-text mdi mdi-library" title="Examiners"></i></a></li>');
        $('#ulNavBar').append('<li id="navBarEXAMBOARDS"><a href="ExamBoards.html"><i class="white-text mdi mdi-gavel" title="Examination Boards"></i></a></li>');
        $('#ulNavBar').append('<li id="navBarEVENTS"><a href="Events.html"><i class="white-text mdi mdi-timer" title="Events"></i></a></li>');
    }
    else {
        $('#ulNavBar').append('<li id="navBarLOGINTABLET"><a href="LoginTablet.html"><i class="white-text mdi mdi-home" title="Home"></i></a></li>');
    }

    $('#ulNavBar').append('<li id="navBarSCORES"><a href="Scores.html"><i class="white-text mdi mdi-poll" title="Scores"></i></a></li>');

    if (!isATablet()) {
        $('#ulNavBar').append('<li id="navBarPENALTIES"><a href="Penalties.html"><i class="white-text mdi mdi-thumb-down" title="Penalties"></i></a></li>');
        $('#ulNavBar').append('<li id="navBarRANKING"><a href="Ranking.html"><i class="white-text mdi mdi-flag" title="Ranking"></i></a></li>');
        $('#ulNavBar').append('<li id="navBarTOOLSDN"><a href="ToolsDN.html"><i class="white-text mdi mdi-download" title="Download Tools"></i></a></li>');
        $('#ulNavBar').append('<li id="navBarTOOLSUP"><a href="ToolsUP.html"><i class="white-text mdi mdi-upload" title="Upload Tools"></i></a></li>');
    }

    $('#divNavBar').append('</ul>');

    //Mobile Menu
    $('#divNavBar').append('<ul class="side-nav" id="mobileNavBar">');

    $('#mobileNavBar').append('<li id="mobBarINDEX"><a href="LoginTablet.html">Home</a></li>');

    if (!isATablet()) {
        $('#mobileNavBar').append('<li id="mobBarTEAMS"><a href="Teams.html">Teams</a></li>');
        $('#mobileNavBar').append('<li id="mobBarCARS"><a href="Cars.html">Cars</a></li>');
        $('#mobileNavBar').append('<li id="mobBarEXAMINERS"><a href="Examiners.html">Examiners</a></li>');
        $('#mobileNavBar').append('<li id="mobBarEXAMBOARDS"><a href="ExamBoards.html">Examination Boards</a></li>');
        $('#mobileNavBar').append('<li id="mobBarEVENTS"><a href="Events.html">Events</a></li>');
    }

    $('#mobileNavBar').append('<li id="mobBarSCORES"><a href="Scores.html">Scores</a></li>');

    if (!isATablet()) {
        $('#mobileNavBar').append('<li id="mobBarEVENTRANKING"><a href="EventRanking.html">Event Ranking</a></li>');
        $('#mobileNavBar').append('<li id="mobBarRANKING"><a href="OverallRanking.html">Overall Ranking</a></li>');
        $('#mobileNavBar').append('<li id="mobBarTOOLSDN"><a href="ToolsDN.html">Download Tools</a></li>');
        $('#mobileNavBar').append('<li id="mobBarTOOLSUP"><a href="ToolsUP.html">Upload Tools</a></li>');
    }
    $('#divNavBar').append('</ul>');

    $(".button-collapse").sideNav();
    $(".dropdown-button").dropdown();

    $("body").fadeIn(2000);             // Fade In Effect when Page Load..

    $('.collapsible').collapsible({
        accordion: false                // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    $('#navBar' + tabToSelect).toggleClass("active", true);
    $('#mobBar' + tabToSelect).toggleClass("active", true);
}

function pageInitilizeHomeOnly(title) {

    $('#divNavBar').html('');

    //Standard Menu
    $('#divNavBar').append('<img src="images/ATA.png" title="Formula SAE Italy & Formula Electric Italy 2015"/><label class="white-text" style="vertical-align:top;font-size: x-large; padding-left: 10px;">' + title + '</label>');
    //$('#divNavBar').append('<a href="#" data-activates="mobileNavBar" class="button-collapse"><i class="mdi-navigation-menu"></i></a>');
    $('#divNavBar').append('<ul class="right hide-on-small-and-down" id="ulNavBar">');

    if (isATablet()) {
        $('#ulNavBar').append('<li id="navBarLOGINTABLET"><a href="LoginTablet.html"><i class="mdi mdi-home" title="Home"></i></a></li>');
    }
    $('#divNavBar').append('</ul>');

    $(".button-collapse").sideNav();
    $(".dropdown-button").dropdown();

    $("body").fadeIn(2000);             // Fade In Effect when Page Load..

    $('.collapsible').collapsible({
        accordion: false                // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
}

function exitFromApplication() {
    event.preventDefault();
    mbox.confirm('Disconnect from Formula ATA?', function (yes) {
        if (yes) {
            window.location = "Login.html";
        }
    })
}

function encodeLogin(username, password) {
    var tok = username + ':' + password;
    var hash = btoa(tok);
    return hash;
}

function decodeLogin(tok) {
    return atob(tok);
}

function encodeSomething(something) {
    return btoa(something);
}

function pad(num) {
    num = "0" + num;
    return num.slice(-2);
}

function datefyJSON(JSONdate) {

    if (JSONdate != null) {

        var d = new Date(parseInt(JSONdate.substr(6)));
        var year = d.getFullYear();
        var month = pad(d.getMonth() + 1);
        var day = pad(d.getDate());

        return year + "-" + month + "-" + day;
    }
}

function stringifyJSON(obj) {
    var theString = JSON.stringify(obj);
    return theString;
}

function datepickerSetValue(oo, value) {
    //var $j = jQuery.noConflict();
    //$j(oo).datepicker('setDate', value);

    //$(".datepicker").each(function () {
    //    alert($(this).val());
    //    $(this).datepicker('setDate', $(this).val());
    //});
}

Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
};

Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
};

Array.prototype.clean = function (deleteValue) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == deleteValue) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
};

jQuery.exists = function (selector) { return ($(selector).length > 0); }

$(function () {
    $('.stupidtable-sorted').on("beforetablesort", function (event, data) {
        // data.column - the index of the column sorted after a click
        // data.direction - the sorting direction (either asc or desc)
        //$("#msg").text("Sorting index " + data.column)
    });

    $('.stupidtable-sorted').on("aftertablesort", function (event, data) {
        var th = $(this).find("th");
        th.find(".arrow").remove();
        var dir = $.fn.stupidtable.dir;

        console.log(dir);
        var arrow = data.direction === dir.ASC ? "&uarr;" : "&darr;";
        th.eq(data.column).append('<span class="arrow">&nbsp;' + arrow + '</span>');
    });
});

function ataToast(message, delay) {
    delay = delay || 2500;
    Materialize.toast(message, delay, 'rounded');
}

Body = {
    navBarHome: function () {
        $("body").prepend(function () {
            return $('<nav/>').html('<div class="nav-wrapper ata-red" id="divNavBar"></div>')
        });
    },
    navBar: function () {
        $("body").prepend(function () {
            return $('<nav/>').html('<div class="nav-wrapper navbar-ata-backgrounded-1" id="divNavBar"></div>')
        });
    },
    spinner: function () {
        $("body").prepend(function () {
            return $('<div/>').html('<div></div><div></div><div></div><div></div>')
                .attr('id', 'tblWait')
                .addClass('spinner')
        });
    },
    spinnerSignal: function () {
        $("body").prepend(function(){
            return $('<div/>').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
                .attr('id','tblWait')
                .addClass('spinner-signal')
                .append($('<span/>').html('...loading...'))
                    .addClass('ata-red-text')
        });
    },
    addButton: function (fn, icon) {
        $("body").prepend(function () {
            return $('<div/>').html('<a onclick="' + fn + '();"><i class="white-text mdi ' + icon + '"></i>&nbsp;&nbsp;&nbsp;NEW</a>')
                .attr('id', 'div-fixed-to-right')
        });
    },
    saveButton: function (fn, icon) {
        $("body").prepend(function () {
            return $('<div/>').html('<a onclick="' + fn + '();"><i class="white-text mdi ' + icon + '"></i>&nbsp;&nbsp;&nbsp;SAVE</a>')
                .attr('id', 'div-fixed-to-right')
        });
    },
    footer: function () {
        $("body").append(function () {
            return $('<footer/>').html('<div class="footer-copyright"><div class="container">&copy; 2024 Formula ATA<a class="grey-text text-lighten-4 right" href="http://www.polimatica.it">Powered by Polimatica S.r.l</a></div></div>')
                .addClass('page-footer')
        });
    },
    navBarScores: function (title, fn) {
        $("body").prepend(function () {
            return $('<div/>').html('<nav><div class="nav-wrapper navbar-ata-backgrounded-1"><label class="white-text" style="vertical-align:top;font-size: x-large;">&nbsp;' + title + '</label><ul class="right"><li class="padded"><a href="#!"><i class="mdi mdi-car left"></i>Car No. <span id="carno"></span></a></li><li class="padded"><a class="btn-floating btn-large ata-green" id="btnSave"><i class="mdi mdi-content-save"></i></a></li><li class="padded"><a class="btn-floating btn-large ata-red" onclick="' + fn + '();" id="btnBack"><i class="mdi mdi-close"></i></a></li></ul></div></nav>')
                .addClass('navbar-fixed')
        });
    },
    navBarScoresAdv: function (title, fn) {
        $("body").prepend(function () {
            return $('<div/>').html('<nav><div class="nav-wrapper navbar-ata-backgrounded-1"><label class="white-text" style="vertical-align:top;font-size: x-large;">&nbsp;' + title + '</label><ul class="right"><li class="padded"><a href="#!"><i class="mdi mdi-car left"></i>Car No. <span id="carno"></span></a></li><li><a><span class="white black-text" id="chiptotalpoints" style="padding:10px; border:dashed red"></span></a></li><li class="padded"><a class="btn-floating btn-large ata-green" id="btnSave"><i class="mdi mdi-content-save"></i></a></li><li class="padded"><a class="btn-floating btn-large ata-red" onclick="' + fn + '();" id="btnBack"><i class="mdi mdi-close"></i></a></li></ul></div></nav>')
                .addClass('navbar-fixed')
        });
    }
}

waitON = function () {
    $('#tblWait').show();
}

waitOFF = function () {
    $('#tblWait').hide();
}

$(function () {
    $(".left-menu-action").click(function () {
        //Remove gray background for all menu items
        $(".left-menu-action").each(function () {
            $(this).removeClass('left-menu-action-active');
        });

        //Add  gray background to the current
        $(this).addClass('left-menu-action-active');

        //Replace selected id -> -anchor -> -tab -> to obtain tab id to display
        var tabId = $(this).prop('id').replace('-anchor', '-tab');
        //Hide all tabs [all having id that ends with '-tab']
        $("div[id$='-tab']").hide();
        //Show selected tab
        $("div[id='" + tabId + "']").show();
    });
});


function getTableNumOfCells(tableSelector) {
    var numOfCols = $(tableSelector + " tbody tr:first").find('td').length;
    //console.log("numOfCols " + numOfCols);
    return numOfCols;
}

//Event 2018 - Show partials scores for Presentation and Design
//Add more table headers
function addCellsToTableHeader(tableSelector, headersToAdd, headersToAdd_sortfield) {
    var header = $(tableSelector + " thead:first tr");
    //console.log("header " + header);

    for (var i = 0; i < headersToAdd.length; i++) {
        var headerCell = $("<th />");

        headerCell.attr("style", "cursor:pointer");
        headerCell.attr("data-sort", "int");
        headerCell.attr("data-field", headersToAdd_sortfield[i]);

        headerCell.html(headersToAdd[i]);
        header.append(headerCell);
    }
}

//Event 2018 - Show partials scores for Presentation and Design
//Add more cells to the selected row
function addCellsToTableRow(row, cellsToAdd, cellsClass) {
    //console.log(cellsClass);
    for (var j = 0; j < cellsToAdd.length; j++) {
        var cell = $("<td />");
        cell.html(cellsToAdd[j]);
        if (cellsClass != undefined)
            cell.addClass(cellsClass);
        row.append(cell);
    }
}

//Event 2018 - Show partials scores for Presentation and Design
//If no scores found fill with blanks cells until the end
function addMissingCellsToRows(rowsToFill, initialCellsNum, colsToAddNum, cellsClass) {
    console.log("addMissingCellsToRows table rows " + rowsToFill + " " + rowsToFill.length);
    console.log("initialCellsNum " + initialCellsNum + " colsToAddNum " + colsToAddNum);
    console.log(cellsClass);

    rowsToFill.each(function () {
        //console.log("$(this).find('td') " + $(this).find('td') + " length " + $(this).find('td').length);
        if (($(this).find('td').length == initialCellsNum)) {
            for (var j = 0; j < colsToAddNum; j++) {
                var cell = $("<td />");
                cell.html('0');
                if (cellsClass != undefined)
                    cell.addClass(cellsClass);
                $(this).append(cell);
            }
        }
    });
}

//Event 2018 - Hide/Show a column
function toggleTableCellByIndex(tableSelector, cellIndex, bShow) {
    if(bShow)
        $(tableSelector + " tr > *:nth-child(" + cellIndex + ")").show();
    else
        $(tableSelector + " tr > *:nth-child(" + cellIndex + ")").hide();
}

var TabletTitles = {
	Design1C3: { cockpit: "Cockpit/Ctrls/Brakes/Safety ", systemmanag: "Systems Mgmt./Integration ", manufact: "Manufact./Serviceability " },
	Design1E: { cockpit: "Cockpit/Ctrls/Brakes/Safety ", systemmanag: "Systems Mgmt./Integration ", manufact: "Manufact./Serviceability " }
};
var TabletScenarios = {
	Presentation: { scenario: "P", col1: "l3", col2: "l9" },
	Design: { scenario: "D", col1: "l4", col2: "l8" }
}

function needToChangeLayoutForTablet(divSelector, scenario) {
	if ((isATablet()) && (window.mobileAndTabletCheck())) {
		//var col1size, col2size;
		//if (scenario == TabletScenarios.Presentation.scenario) {
		//	col1size = TabletScenarios.Presentation.col1;
		//	col2size = TabletScenarios.Presentation.col2;
		//}
		//else
		//{
		//	col1size = TabletScenarios.Design.col1;
		//	col2size = TabletScenarios.Design.col2;
		//}

		//var col1 = $(divSelector + " div.row div.col").first();
		//col1.attr("class", col1.attr("class").replace('l5', col1size));

		//var col2 = $(divSelector + " div.row div.col").next();
		//col2.attr("class", col2.attr("class").replace('l7', col2size));
		return true;
	}
	else
		return false;
}

window.mobileCheck = function () {
	var check = false;
	(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
	console.log("mobileCheck " + check);
	return check;
}

window.mobileAndTabletCheck = function () {
	var check = false;
	(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
	console.log("mobileAndTabletCheck " + check);
	return check;
}