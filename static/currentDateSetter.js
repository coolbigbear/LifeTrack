Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});

var elements = Array.from(document.getElementsByClassName('datePicker'))
elements.forEach(element => {
    element.value = new Date().toDateInputValue();
});
    