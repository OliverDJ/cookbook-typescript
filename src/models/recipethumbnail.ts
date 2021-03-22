
import ITotalDuration from "./Time"
import ICategory from './category'

interface IRecipeThumbnail{
    Id: number,
    Name: string,
    Duration : ITotalDuration
    Spiciness: number
    Category: ICategory
} 

export default IRecipeThumbnail