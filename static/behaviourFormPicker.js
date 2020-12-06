const displayForm = () => {
    var radios = document.getElementsByName('behaviour-form-radio-button');
    if (radios[0].checked) {
        document.getElementById("morning-report-form").style.display = "block";
        document.getElementById("evening-report-form").style.display = "none";
    }
    else if (radios[1].checked) {
        document.getElementById("morning-report-form").style.display = "none";
        document.getElementById("evening-report-form").style.display = "block";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var currentLocation = window.location;
    if (currentLocation.pathname.includes('/behaviour/reporting')) {
        displayForm()
    }
}, false);