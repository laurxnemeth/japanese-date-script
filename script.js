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
    1: "ichi",
    2: "ni",
    3: "san",
    4: "shi",
    5: "go",
    6: "roku",
    7: "shichi",
    8: "hachi",
    9: "ku",
    10: "juu"
};

const irregularDayNumbers = {
    1: "tsuitachi",
    2: "futsuka",
    3: "mikka",
    4: "yokka",
    5: "itsuka",
    6: "muika",
    7: "nanoka",
    8: "yôka",
    9: "kokonoka",
    10: "tôka",
    14: "jûyokka",
    20: "hatsuka",
    24: "nijûyokka"
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
    return `${monthNumbers[month+1]}-gatsu`;
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

        return `${firstDigit}${secondDigit}-nichi`
    }
 };

 returnDate(){
    return `${this.translateYear()} ${this.translateMonth()} ${this.translateDay()}`;
 };
};

console.log(new translateDate().returnDate());
