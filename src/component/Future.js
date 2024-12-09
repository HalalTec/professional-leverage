import { useState } from "react";

const Future = (selectedOption, handleChange) => {

   
    return ( <>

            <div className="super-container">
            <div className='Header'>
            <h1><b>Wheel of Life</b></h1>
            <hr></hr>
            </div>
                <div className="main-upper">
                <h3> Select your preferred future year</h3>
                <select value={selectedOption} onChange={handleChange}>
                    <option value="">Select Future Span</option>
                    <option value="6 Months"> 6 Months</option>
                    <option value="1 Year"> 1 Year</option>
                    <option value="3 Years"> 3 Years</option>
                </select>
            </div>
            </div>
        
    </> );
}
 
export default Future;