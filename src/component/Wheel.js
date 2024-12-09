import { useState } from "react";
import Test from "./Test";

const Wheel = () => {
    const [future, setFuture] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')

    const handleChange = (e) => {
        setSelectedOption(e.target.value)
        setFuture(true)
    }

    const style=  {
                    marginTop: "50px",
                    textAlign:"center"
    }

    const style2 = {
                        padding:"10px 30px 10px 30px",
                        width: "200px",
                        cursor: "pointer"


    }


    if (future) {
        return <Test selected={selectedOption} />
    }else{
    return ( <>

<div className="super-container">
            <div className='Header'>
            <h1><b>Kaizen C-Suit Wheel </b></h1>
            <hr></hr>
            </div>
            <h3 className="title">This tool works by comparing your current state against a selected future state </h3>
                <div style={style} >
                <h3> Select your preferred future time you want to compare against</h3>
                <select value={selectedOption} onChange={handleChange} style={style2}>
                    <option value="">Select future time                    </option>
                    <option value="6 Months"> 6 Months</option>
                    <option value="1 Year"> 1 Year</option>
                    <option value="3 Years"> 3 Years</option>
                </select>
            </div>
            </div>
    
</> );
    }
}
 
export default Wheel;