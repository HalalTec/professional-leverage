import Dashboard from "./component/Dashboard";
import First from "./component/First";
import PopReg from "./component/PopReg";
import Second from "./component/Second";
import Third from "./component/Third"
import { useState } from "react";


const Home = () => {
    const [tab, setTab] = useState('first')
    const [reg, setReg] = useState(false)

    const handleClick = (checker) => {
       setTab(checker)
    }

    const initial = () => {  
        if (tab === 'first') {  
             return {
                  
                  borderBottom : '1px solid blue',
                  color: 'blue'
             }
        }  
        return {}; // Return an empty object if the condition is not met  
    }  

    const secon = () => {  
        if (tab === 'second') {  
            return {
                  
                borderBottom : '1px solid blue',
                color: 'blue'
           }
        }  
        return {}; // Return an empty object if the condition is not met  
    }  

    const thir = () => {  
        if (tab === 'third') {  
            return {
                  
                borderBottom : '1px solid blue',
                color: 'blue'
           } 
        }  
        return {}; // Return an empty object if the condition is not met  
    }  

    const setPop = () => {
        setReg(true)
    }
    const close = () => {

        setReg(false)
    }

    const style = {
                  width: '70%'
    
    }
    

    const init = initial();
    const sec = secon();
    const th = thir();
    
    return ( 
        <>
        <Dashboard active='Home'/>
             <div className="dash-center">
                <h1>Home </h1>
                <nav>
                    <li  
                       style={init}
                        onClick={() => handleClick("first")}  
                    >  
                        First  
                    </li>  
                    <li  
                        style={sec}
                        onClick={() => handleClick("second")}  
                    >  
                        Second  
                    </li>  
                    <li  
                        style={th}
                        onClick={() => handleClick("third")}    
                    >  
                        Third  
                    </li>  

                </nav>
                <div className="mini-tab">
                  {tab === 'first' ?  <First /> : '' }
                  {tab === 'second' ? <Second /> : ''}
                  {tab === 'third' ? <Third /> : ''}

                  <button className="pop" onClick={setPop}> Register with us </button> 
                </div>
                {reg && <PopReg close={close}/>}
                </div>

        </>
     );
}
 
export default Home;