days = ['Once', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
lights = ['PC', 'Bedroom', 'Living Room'];
alarms = new Array();
loadAlarms();
$(alarms).each(function(index, alarm) {
    drawAlarm(alarm);
});

function drawAlarm(alarm) {
    // draw alarm cell
    var alarmcell = $('.alarms').append('<li><a href="#"><input type="checkbox"> ' + alarm["name"] + '<br>Weekdays, 7:30am</a></li>');
    if (alarm["enabled"]) {
        $('.alarms li:last input[type=checkbox]').attr("checked", true);
    }
    
    // make alarm cell clickable, and highlight work 
    $('.alarms li:last').unbind('click').click(function(e) {
        $(this).css("background-color", "green");
        $(this).siblings().css("background-color", "white");
        populateAlarmFields(alarm);
        $('.alarmDetails').show();
    })

    // make alarm cell checkbox actively enabled/disable alarm
    $('.alarms li:last input[type=checkbox]').unbind('click').click(function() {
        alarm["enabled"] = $('.alarms li:last input[type=checkbox]').attr("checked");
    })
}

$(days).each(function(index, value) {
    $('.days').append('<li><a href="#"><input type="checkbox" id="' + value + '"> ' + value + '</a></li>')
});

$(lights).each(function(index, value) {
    $('.lights').append('<li><a href="#"><input type="checkbox" id="' + value + '"> ' + value + '</a></li>')
});

$('.newAlarm').unbind('click').click(function() {
    alarm = newAlarm();
    alarms.push(alarm);
    drawAlarm(alarm);
})

// given a selected alarm, load alarm fields into javascript fields
function populateAlarmFields(alarm) {
    console.log("populating alarm fields for " + alarm['name'] + ": ");
    console.log(alarm);
    $(days).each(function(index, day) {
        $('#' + day).prop('checked', alarm[day]);
    });
    $(lights).each(function(index, light) {
        $('#' + light).prop('checked', alarm[light]);
    });
    $("#name").val(alarm["name"])
    $('#wakeTime').val(alarm['wakeTime']);
    $('#fadeTime').val(alarm['fadeTime']);
    $('#saveAlarm').unbind('click').click(function() {
        saveAlarm(alarm);
    });
}

// generate a blank alarm
function newAlarm() {
    var alarm = new Array();
    alarm["enabled"] = false;
    alarm["name"] = "New Alarm";
    $(days).each(function(index, value) {
        alarm[value] = false
    });
    alarm["wakeTime"] = "12:00am";
    alarm["fadeTime"] = "60s";
    alarm["hue"] = 30;
    alarm["xy"] = 20;
    alarm["ct"] = 10;
    alarm["mode"] = "hue";
    return alarm;
}

function saveAlarm(alarm) {
    // alarm["enabled"] = 
    $(days).each(function(index, day) {
        alarm[day] = $('#' + day).prop('checked');
    });
    $(lights).each(function(index, light) {
        alarm[light] = $('#' + light).prop('checked');
    });
    alarm["name"] = $("#name").val();
    alarm["wakeTime"] = $("#wakeTime").val();
    alarm["fadeTime"] = $("#fadeTime").val();
    alarm["hue"] = 30;
    alarm["xy"] = 20;
    alarm["ct"] = 10;
    alarm["mode"] = $("input[name=colour]:checked").val();
    console.log(alarm);
}

// loads alarms from file
function loadAlarms() {
    // TBD: read alarms

    // for now, just generate some random alarms
    for (var i = 0; i < 3; i++) {
        alarms.push(newAlarm());
    }
    alarms[2]["Once"] = true;
    alarms[0]["enabled"] = true;
    alarms[0]["name"] = "Test";
}