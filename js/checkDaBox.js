function checkDaBox(event) {
    console.log('entró');
    let daCheckbox = event.target.closest('div.check-box').querySelector('input[type="checkbox"]');
    // debugger
    // console.log(daCheckbox.checked);
    daCheckbox.checked = !daCheckbox.checked;
    daCheckbox.dispatchEvent(new Event('change'));
    // console.log(daCheckbox.checked);
    // console.log('sale');
    // debugger
    // 
    // daCheckbox.click();
    // debugger
}