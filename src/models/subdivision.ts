

import IDuration from './duration'
import ITimeInfo from './timeinfo'

interface ISubdivision{
    Offline: boolean,
    Duration: IDuration,
    NumberOfSteps: number,
    Steps: ITimeInfo[]
}

export default ISubdivision
