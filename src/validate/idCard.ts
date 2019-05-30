import idCard from "../data/idCard";
import { isBoolean } from "../type/index";
import { DigestList, DigestShine } from "./config";

export default class IdCard{
    rigid = true;
    gender = 1;
    idNum = null;
    isValid = true;
    province = null;
    city = null;
    area = null;
    birthday = null;
    birthdayObj = {};
    reason = "";
    
    constructor(idNum: string, rigid: boolean){
        this.idNum = idNum + '';
        if(isBoolean(rigid)){
            this.rigid = rigid;
        }
        this.checkNormal()
    }

    checkNormal(){
        let longReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        let shortReg = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;
        if(!longReg.test(this.idNum) && !shortReg.test(this.idNum)){
            this.isValid = false;
        }
        if(this.rigid && this.isValid){
            this.checkArea();
            this.getBirthday();
            this.getGender();
            this.checkLastDigst()
        }
    }

    checkProvince(){
        let provinceNum = this.idNum.slice(0,2) + "0000";
        this.province = idCard.find(item=>{
            return item.code === provinceNum;
        })
        if(!this.province){
            this.setReason("省份信息有误")
        }
    }

    checkCity(){
        let cityNum = this.idNum.slice(0,4) + "00";
        this.city = idCard.find(item=>{
            return item.code === cityNum;
        })
        if(this.city){
            this.checkProvince()
        }else{
            this.setReason("城市信息有误")
        }
    }

    checkArea(){
        let areaNum = this.idNum.slice(0,6);
        this.area = idCard.find(item=>{
            return item.code === areaNum;
        })
        if(!this.area){
            this.isValid = false;
            this.setReason("区县信息有误")
        }else{
            this.checkCity()
        }
    }

    checkLastDigst(){
        if(this.idNum.length === 18){
            let lastDist = this.idNum.slice(-1);
        
            let sumNum = 0;
            this.idNum.split("").map((item,index)=>{
                sumNum += item * DigestList[index];
            })
            
            let num:string = DigestShine[sumNum%11];
            if(num !== lastDist.toString().toUpperCase()){
                this.isValid = false;
                this.setReason("校验位有误")
            }
        }
    }

    getBirthday(separation = '/'){
        let year = this.idNum.slice(6,10);
        let month = this.idNum.slice(10,12);
        let day = this.idNum.slice(12,14);
        this.birthdayObj = {year, month, day};
        this.birthday = [year,month,day].join(separation);
    }

    getGender(){
        let genderNumber :number;
        if(this.idNum.length === 15){
            genderNumber = this.idNum.slice(-1) - 0;
        }else{
            genderNumber = this.idNum.slice(-2, -1) - 0;
        }
        this.gender = genderNumber % 2;
    }

    setReason(reason: stiring){
        this.reason = reason;
    }

}

export function isIdCard(idNum:string):boolean{
    let idCard =  new IdCard(idNum)
    return idCard.isValid;
}