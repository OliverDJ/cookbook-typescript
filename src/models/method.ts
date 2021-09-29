
import IIngredientQuantity from "./ingredientquantity"
import ITimeInfo from './timeinfo'
import ITemperatureInfo from './temperatureinfo'


interface IMethod {
    Title: string
    Description: string
    IngredientQuantities: IIngredientQuantity[]
    Duration?: ITimeInfo
    Order: number
    TemperatureInfo?: ITemperatureInfo
    Info?: string
    Offline: boolean
}

export default IMethod
