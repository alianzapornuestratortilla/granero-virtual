function checkDaBox(event) {

    let daCheckbox = event.target.closest('div.check-box').querySelector('input[type="checkbox"]');
    console.log(daCheckbox.checked);
    daCheckbox.checked = !daCheckbox.checked;
    daCheckbox.dispatchEvent(new Event('change'));
    console.log(daCheckbox.checked)
}