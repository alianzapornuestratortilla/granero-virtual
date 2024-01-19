function nameGenerator() {
    const leDate = new Date();

    return generateRandomCharacter() + '_' + leDate.getDay() + 'd' + leDate.getMonth() + 'm' + leDate.getFullYear() + 'y' + leDate.getHours() + 'h' + leDate.getMinutes() + 'm' + leDate.getSeconds() + 's' + leDate.getMilliseconds() + 'ms';
}
function generateRandomCharacter() {
    //replace random char with user's unique identifier
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var randomIndex = Math.floor(Math.random() * chars.length);
    return chars[randomIndex];
}