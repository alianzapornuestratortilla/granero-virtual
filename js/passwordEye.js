function changeEyeIcon(passwordInputContainer, template) {
    let leSVG = passwordInputContainer.querySelector('svg');        
    if (leSVG) {
        leSVG.remove();
    }
    passwordInputContainer.appendChild(document.importNode(template.content, true));
}

function toogleEyeIcon(event) {
    let passwordInputContainer = event.target.closest('label');
    let template;
    switch (passwordInputContainer.querySelector('input').type) {
        case 'password':
            passwordInputContainer.querySelector('input').type = 'text';
            template = document.getElementById('icono-no-ver');
            break;
        case 'text':
            passwordInputContainer.querySelector('input').type = 'password';
            template = document.getElementById('icono-ver');
            break;
        default:
            window.alert('Sucedió un error inesperado');
            console.error('input password no tiene definición');
            break;
    }
    
    void changeEyeIcon(passwordInputContainer, template);

}

let iconoVer = document.createElement('template');
iconoVer.id = "icono-ver";
iconoVer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" onclick="void  toogleEyeIcon(event)">
<path fill="currentColor"
    d="M12 16q1.875 0 3.188-1.313T16.5 11.5q0-1.875-1.313-3.188T12 7q-1.875 0-3.188 1.313T7.5 11.5q0 1.875 1.313 3.188T12 16Zm0-1.8q-1.125 0-1.913-.788T9.3 11.5q0-1.125.788-1.913T12 8.8q1.125 0 1.913.788T14.7 11.5q0 1.125-.787 1.913T12 14.2Zm0 4.8q-3.475 0-6.35-1.838T1.3 12.2q-.075-.125-.1-.312t-.025-.388q0-.2.025-.388t.1-.312q1.475-3.125 4.35-4.963T12 4q3.475 0 6.35 1.838T22.7 10.8q.075.125.1.313t.025.387q0 .2-.025.388t-.1.312q-1.475 3.125-4.35 4.963T12 19Z" />
</svg>`

let iconoNoVer = document.createElement('template');
iconoNoVer.id = "icono-no-ver";
iconoNoVer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" onclick="void  toogleEyeIcon(event)">
<path fill="currentColor"
    d="m19.3 16.5l-3.2-3.2q.2-.425.3-.863t.1-.937q0-1.875-1.312-3.188T12 7q-.5 0-.938.1t-.862.3L7.65 4.85q1.025-.425 2.1-.637T12 4q3.575 0 6.425 1.888T22.7 10.8q.075.125.1.313t.025.387q0 .2-.037.388t-.088.312q-.575 1.275-1.437 2.375T19.3 16.5Zm-.2 5.4l-3.5-3.45q-.875.275-1.762.413T12 19q-3.575 0-6.425-1.888T1.3 12.2q-.075-.125-.1-.312t-.025-.388q0-.2.025-.375t.1-.3Q1.825 9.7 2.55 8.75T4.15 7L2.075 4.9Q1.8 4.625 1.8 4.212t.3-.712q.275-.275.7-.275t.7.275l17 17q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275ZM12 16q.275 0 .513-.025t.512-.1l-5.4-5.4q-.075.275-.1.513T7.5 11.5q0 1.875 1.313 3.188T12 16Zm2.65-4.15l-3-3q1.425-.225 2.325.8t.675 2.2Z" />
</svg>`

document.body.appendChild(iconoVer);
document.body.appendChild(iconoNoVer);