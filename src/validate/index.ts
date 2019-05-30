import idCard from "./data/idCard";
console.log(idCard);

export function isIdCard(str:string):boolean{
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;//
    return true;
}