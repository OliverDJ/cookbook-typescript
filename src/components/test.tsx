
import React, { useState } from "react";

import User from "../models/test";

const TestComp = ({name, age }: User): JSX.Element => {

    return(
        <div>
            <p>my name is: {name}</p>
            <p>my age is: {age}</p>

        </div>
    )
}

export default TestComp

