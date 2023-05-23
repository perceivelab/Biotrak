import { start, stop, vehicle } from "../../assets/svg/svg"

export const image = (type: string | undefined) => {
    return type && type === 'transporter' ? vehicle 
    : type === 'productionStart' ? start 
    : stop   
}