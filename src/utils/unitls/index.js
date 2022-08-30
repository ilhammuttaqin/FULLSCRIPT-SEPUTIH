import { Dimensions } from "react-native";
import { heightMobile, widthMobile } from "../constant";



export const responsiveWidth = (width)=>{
    return Dimensions.get('window').width*width/widthMobile;
}

export const responsiveHeight = (height)=>{
    return Dimensions.get('window').height*height/heightMobile;
}
export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const noWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{4})+(?!\d))/g, "-");
}