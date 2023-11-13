const yearNumbers = {
    0: "",
    1: "いち",
    2: "に",
    3: "さん",
    4: "ゆん",
    5: "ご",
    6: "ろく",
    7: "なな",
    8: "はち",
    9: "きゅ",
    "ten": "じゅう",
    "hundred": "ひゃく",
    "thousand": "せん"
};

const monthNumbers = {
    1: "いち",
    2: "に",
    3: "さん",
    4: "し",
    5: "ご",
    6: "ろく",
    7: "しち",
    8: "はち",
    9: "く",
    10: "じゅう"
};

const irregularDayNumbers = {
    1: "ついたち",
    2: "ふつか",
    3: "みっか",
    4: "よっか",
    5: "いつか",
    6: "むいか",
    7: "なのか",
    8: "ようか",
    9: "ここのか",
    10: "とおか",
    14: "じゅうよっか",
    20: "はつか",
    24: "にじゅうよっか"
};

monthNumbers[11] = monthNumbers[10]+monthNumbers[1];
monthNumbers[12] = monthNumbers[10]+monthNumbers[2];

class translateDate {
 constructor() {
    this.date = new Date();
 };

 translateYear(){
    const year = Array.from(String(this.date.getFullYear()), Number);

    let firstDigit;
    switch(year[0]){
        case 0:
            firstDigit = "";
            break;
        case 1:
            firstDigit = yearNumbers.thousand;
            break;
        default:
            firstDigit = `${yearNumbers[year[0]]}${yearNumbers.thousand}`
    };

    let secondDigit;
    switch(year[1]){
        case 0:
            secondDigit = "";
            break;
        case 1:
            secondDigit = yearNumbers.hundred;
            break;
        default:
            secondDigit = `${yearNumbers[year[1]]}${yearNumbers.hundred}`
    };

    let thirdDigit;
    switch(year[2]){
        case 0:
            thirdDigit = "";
            break;
        case 1:
            thirdDigit = yearNumbers.ten;
            break;
        default:
            thirdDigit = `${yearNumbers[year[2]]}-${yearNumbers.ten}`;
    };

    const lastDigit = yearNumbers[year[3]];
    return firstDigit+secondDigit+thirdDigit+lastDigit;
 };

 translateMonth() {
    const month = this.date.getMonth();
    return `${monthNumbers[month+1]}がつ[月]`;
 };

 translateDay() {
    const day = this.date.getDate();
    if (irregularDayNumbers.hasOwnProperty(day)){
        return dayNumbers[day];
    } else {
        // regular day numbers are always two digits, so need not check array length
        const regularDay = Array.from(String(day), Number);

        const firstDigit = regularDay[0] === 1 ? yearNumbers.ten : `${yearNumbers[regularDay[0]]}-${yearNumbers.ten}`;
        const secondDigit = monthNumbers[regularDay[1]];

        return `${firstDigit}${secondDigit}-にち[日]`
    }
 };

 returnDate(){
    return `きょうは ${this.translateYear()} ${this.translateMonth()} ${this.translateDay()}。`;
 };
};

console.log(new translateDate().returnDate());
