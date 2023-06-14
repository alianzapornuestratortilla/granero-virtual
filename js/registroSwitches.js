function despliegaOpcionesCorrectas() {
  const daSwitches = document.querySelectorAll('label.switch input[type="checkbox"]');
  let daSwitchInventory = new Object();
  for (let i = 0; i < daSwitches.length; i++) {
    let daSwitch = daSwitches[i];
    daSwitchInventory[daSwitch.closest('div.switch-statement').id] = !daSwitch.checked;
  }
}