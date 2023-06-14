function checkDaBox(event) {
    let daCheckbox = event.target.closest('div.check-box').querySelector('input[type="checkbox"]');
    daCheckbox.checked = !daCheckbox.checked;
}