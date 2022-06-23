export function TexttoID(text){
    /**
     * Steps:
     *      1. Remove spaces
     *      2. Replace æ = ae, ø = o, å = aa
     */
    return text.replace(/\s/g, '').replace('æ', 'ae').replace('ø', 'o').replace('å', 'aa');
}
export function removeSpaces(inputString) {
    return inputString.replace(/\s/g, '');
}
export function readableNumber(inputString, rounding=false) {
    if(rounding){
        return String(Math.round(inputString.replace(/\s/g, ''))).replace(/ /g,"").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    } else {
        return String((inputString.replace(/\s/g, ''))).replace(/ /g,"").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
}
export function roundPercent(inputInteger) {
    return Math.round(inputInteger * 100) / 100;;
}
export function diffMonths(dt1, dt2) {
    //var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    //diff /= (60 * 60 * 24 * 7 * 4);
    //return Math.abs(Math.round(diff));

    var diffyear = (dt2.getYear() - dt1.getYear());
    return ((dt2.getMonth() - dt1.getMonth() - 1) + (diffyear * 12));
}