import {  useState } from "react";
import Career from "./Career";
import Result from "./Result";
import Carousel from "./Carousel";
import Message from "./Message";
import Warning from "./Warning";

const Test = ({selected}) => {
    const [warning, setWarning] = useState(false)
    const [val, setVal] = useState()
    const [counter, setCounter] = useState(1);
    const [style, setSty] = useState({backgroundColor: "#ED6A56"})
    const [p, setP] = useState("Leadership Development")
    const [career, setCareer] = useState([])
    const [health, setHealth] = useState([])
    const [money, setMoney] = useState([])
    const [per, setPer] = useState([])
    const [rel, setRel] = useState([])
    const [fun, setFun] = useState([])
    const [physical, setPhysical] = useState([])
    const [spirit, setSpirit] = useState([])
    const [cont, setCont] = useState([])
    const [pur, setPur] = useState([])
    const [item, setItem] = useState([ "Do you regularly make decisions that align with your organization’s vision and inspire your team?",
                                        "Have you actively develop your emotional intelligence and conflict-resolution skills?",
                                        "Are you able to align your team effectively during challenging situations?"
])
    const tip =["Tip 1", "Tip 2", "Tip 3"]
    const [message, setMessage] = useState(false)
    const [msg, setMsg] = useState(0)
    const [check, setChecker] = useState(false)



    const confirm = (e) => {
        setMsg(e.target.textContent)
        setMessage(true)
   }
const confirmFuture = (e) => {
        setMsg(e.target.textContent)
        setChecker(true)
    }
   
    const submit = (e) => {
        e.preventDefault();
        let ans= e.target.textContent
        setCounter(counter + 1);
        setVal(ans)

        if (counter <= 2) {
            setCareer([...career, ans]);
            
        }

       
        if (counter === 2 && counter < 4) {
            setSty({ backgroundColor: "#F09B36" });
            setP("Strategic Thinking");
       
            setItem([
                "Do you consistently analyze industry trends to inform long-term strategies?",
                "Have you implemented a clear risk management or financial forecasting process in your strategic planning?",
                "Have your strategic decisions directly contributed to organizational growth or success?"
            ])
            
          
        } 
       if(counter > 2 && counter <= 4){ 
            setMoney([...money, ans]);

        }
        
        
         if (counter ===4 && counter < 6) {
            setSty({ backgroundColor: "#FFC74E" });
            setP("Executive Presence");
            setItem([
                "Do you remain confident and composed in high-pressure situations?",
                "Have you developed public speaking skills to represent your organization effectively on large platforms?",
                "Do you regularly build and maintain professional relationships with other leaders?"
            ])
            
        } 
        
        if(counter > 4 && counter <= 6){ 
            setHealth([...health, ans]);

        }
        
        if (counter === 6 && counter < 8) {
            setSty({ backgroundColor: "#A0B470" });
            setP("Business Acumen");
            setItem([
                "Do you have a comprehensive understanding of finance, marketing, and operations within your organization?",
                "Are you well-informed about emerging technologies and digital transformation in your industry?",
                "Do you make data-driven decisions to enhance business outcomes?"
            ])
        }
        
        if(counter > 6 && counter <= 8){ 
            setRel([...rel, ans]);

        }
        
        if (counter === 8 && counter < 10) {
            setSty({ backgroundColor: "#6E9E75" });
            setP("Innovation and Agility");
            setItem([
                "Do you encourage a culture of innovation and adaptability within your team?",
                "Have you successfully led organizational changes in response to a fast-changing environment?",
                "Do you actively promote creativity and idea-sharing among your teams?"
            ])
        } 
        if(counter > 8 && counter <= 10){ 
            setPer((e) => [...e, ans]);
        }
        if (counter === 10 && counter < 12) {
            setSty({ backgroundColor: "#73CCE4" });
            setP("Network & Industry Influence");
            setItem([
                "Have you built a strong personal brand within your industry?",
                "Do you have a network of high-profile contacts, including investors, board members, or influencers?",
                "Have you taken opportunities to engage in thought leadership, such as keynote speaking or publishing?"
            ])
        } 
        if(counter > 10 && counter <= 12){ 
            setFun((p) => [...p, ans]);
        }
        
         if (counter === 12 && counter < 14) {
            setSty({ backgroundColor: "#869ACF" });
            setP("Mentorship and Succession Planning");
            setItem([
                "Do you regularly mentor and develop future leaders in your organization?",
                "Have you established systems that allow your teams to operate efficiently in your absence?",
                "Is there a clear succession plan in place for your role?"
            ])

        } 

        if(counter > 12 && counter <= 14){ 
            setPhysical((res) => [...res, ans]);
        }

        if (counter === 14 && counter < 16) {
            setSty({ backgroundColor: "#895881" });
            setP("Cultural Alignment and Integrity");
            setItem([
                "Do you consistently align your leadership decisions with your company’s mission and values?",
                "Have you taken active steps to promote diversity, equity, and inclusion in your leadership practices?",
                "Do you uphold corporate governance and ethics in all decision-making?"
            ])


        } 

        if(counter > 14 && counter <= 16){ 
            setSpirit((re) => [...re, ans]);
        }

         if (counter === 16 && counter < 18) {
            setSty({ backgroundColor: "#ff5733" });
            setP("Personal Growth and Continuous Learning");
            setItem([
                "Are you committed to lifelong learning through executive education or personal development programs?",
                "Do you regularly assess your strengths and areas for improvement?",
                "Have you pursued personal development programs or certifications that enhanced your leadership abilities?"
            ])
        } 

        if(counter > 16 && counter <= 18){ 
            setPur((v) => [...v, ans]);
        }

         if (counter === 18 && counter < 20) {
            setSty({ backgroundColor: "#58261b" });
            setP("Global Perspective");
            setItem([
                "Do you stay informed about global market trends and geopolitical issues that impact your organization?",
                "Have you led multinational teams effectively in your career?",
                "Do you understand and apply cross-cultural leadership principles in your work?"
            ])
        }
        
        if(counter > 18 && counter <= 20){ 
            setCont((pr) => [...pr, ans]);
        }

        if(counter === 20 ) {
            if (career.length < 1 || health.length < 1 || money.length < 1 ||
                per.lenght < 1 || rel.length < 1 || fun.length < 1 || physical.length < 1 ||
                spirit.length < 1 || cont.length < 1 || pur.length < 1) {
        
                    alert("Please answer all the questions!");
                    setCounter(1)
                    setSty({backgroundColor: "#ED6A56"})
                    setP("Career and Professional Growth")
            }
        }
            close()
    }

    const close = () => {
        setMessage(false)
        setWarning(false)
        setChecker(false)
    }
    


 
       
   
    

   

    

      
   

    return ( 
       
       <div>
                     {counter <= 20 && (   <header style={style}> {p}  </header> )}
                <div className="section">
                {counter === 1 && (
                <Career question="How well-developed are your leadership skills in inspiring, guiding, and empowering teams effectively?" />

            )}
           
                {counter === 2 && (
                <Career question="How well-developed do you want your leadership skills in inspiring, guiding, and empowering teams effectively in the next" select={selected}/>
            )}

        {counter === 3 && (
                <Career question= "How confident are you in your ability to think strategically and align decisions with long-term organizational goals?" />
            )}
        {counter === 4 && (
                <Career question="How confident do you want to be in your ability to think strategically and align decisions with long-term organizational goals in the next" select={selected}/>
            )}
        {counter === 5 && (
                <Career question= "How strong is your executive presence, including your ability to command respect and project confidence?" />
            )}
        {counter === 6 && (
                <Career question= "How strong do you want your executive presence, including your ability to command respect and project confidence in the next" select={selected}/>
            )}
        {counter === 7 && (
                <Career question="How well do you understand and navigate complex business operations and financial landscapes?" />
            )}
        {counter === 8 && (
                <Career question="How well do you want to understand and navigate complex business operations and financial landscapes in the next" select={selected}/>
            )}
        {counter === 9 && (
                <Career question="How proficient are you in driving innovation and adapting to rapidly changing environments?" />
            )}
        {counter === 10 && (
                <Career question="How proficient do you want to be in driving innovation and adapting to rapidly changing environments in the next" select={selected} />
            )}
         {counter === 11 && (
                <Career question="How strong is your network and influence within your industry and professional circles?" />
            )}
        {counter === 12 && (
                <Career question="How strong do you want your network and influence within your industry and professional circles in the next" select={selected} />
            )}
        {counter === 13 && (
                <Career question="How effectively do you mentor others and contribute to succession planning within your organization?" />
            )}
        {counter === 14 && (
                <Career question="How effectively do you want your mentor others and contribute to succession planning within your organization in the next" select={selected} />
            )}
        {counter === 15 && (
                <Career question= "How aligned are you with your organization’s culture and how strong is your reputation for integrity?" />
            )}
        {counter === 16 && (
                <Career question= "How aligned do you want to be with your organization’s culture and how strong is your reputation for integrity in the next" select={selected} />
            )}
        {counter === 17 && (
                <Career question="How committed are you to personal development and continuous learning to stay ahead in your field?" />
            )}
         {counter === 18 && (
                <Career question="How committed do you want to be to personal development and continuous learning to stay ahead in your field in the next" select={selected}/>
            )}
         {counter === 19 && (
                <Career question= "How well-developed is your global perspective, including understanding diverse markets, cultures, and international trends?" />
            )}
         {counter === 20 && (
                <Career question= "How well-developed do you want your global perspective, including understanding diverse markets, cultures, and international trends in the next" select={selected}/>
            )}

        {message === true && (< Message msg= {msg-1} close={close} p={p} submit={submit} quest={0} />)}
        {check === true && (< Message msg= {msg-1} close={close} p={p} submit={submit} quest={1} />)}
            {counter <= 20 && ( 
                <>
                    {counter % 2 === 1 && (<Carousel items={item} tips = {tip}/>)}
                    <ol>
                    {counter % 2 === 1 &&( <>    
                <span onClick={confirm}> 1 </span>
                <span onClick={confirm}>2</span>
                <span onClick={confirm}>3</span>
                <span onClick={confirm}>4</span>
                <span onClick={confirm}>5</span>
                <span onClick={confirm}>6</span>
                <span onClick={confirm}>7</span>
                <span onClick={confirm}> 8</span>
                <span onClick={confirm}>9</span>
                <span onClick={confirm}>10</span>
                </>
                 )}
        {counter % 2 != 1 &&( <>     
                    <span onClick={confirmFuture} style={{filter: 1 < val ? 'blur(2px)' : 'none',
                                        cursor: 1 < val ? 'not-allowed' : 'pointer',
                                        pointerEvents: 1 < val ? 'none' : 'auto'}}> 1 </span>
                <span onClick={confirmFuture} style={{filter: 2 < val ? 'blur(2px)' : 'none',
                                        cursor: 2 < val ? 'not-allowed' : 'pointer',
                                        pointerEvents: 2 < val ? 'none' : 'auto'}}>2</span>
                <span onClick={confirmFuture} style={{filter: 3 < val ? 'blur(2px)' : 'none',
                                        cursor: 3 < val ? 'not-allowed' : 'pointer',
                                        pointerEvents: 3 < val ? 'none' : 'auto'}}>3</span>
                <span onClick={confirmFuture} style={{filter: 4 < val ? 'blur(2px)' : 'none',
                                        cursor: 4 < val ? 'not-allowed' : 'pointer',
                                        pointerEvents: 4 < val ? 'none' : 'auto'}}>4</span>
                <span onClick={confirmFuture} style={{filter: 5 < val ? 'blur(2px)' : 'none',
                                        cursor: 5 < val ? 'not-allowed' : 'pointer',
                                        pointerEvents: 5 < val ? 'none' : 'auto'}}>5</span>
                <span onClick={confirmFuture} style={{filter: 6 < val ? 'blur(2px)' : 'none',
                                        cursor: 6 < val ? 'not-allowed' : 'pointer',
                                        pointerEvents: 6 < val ? 'none' : 'auto'}}>6</span>
                <span onClick={confirmFuture} style={{filter: 7 < val ? 'blur(2px)' : 'none',
                                        cursor: 7 < val ? 'not-allowed' : 'pointer',
                                        pointerEvents: 7 < val ? 'none' : 'auto'}}>7</span>
                <span onClick={confirmFuture} style={{filter: 8 < val ? 'blur(2px)' : 'none',
                                        cursor: 8 < val ? 'not-allowed' : 'pointer',
                                        pointerEvents: 8 < val ? 'none' : 'auto'}}> 8</span>
                <span onClick={confirmFuture} style={{filter: 9 < val ? 'blur(2px)' : 'none',
                                        cursor: 9 < val ? 'not-allowed' : 'pointer',
                                        pointerEvents: 9 < val ? 'none' : 'auto'}}>9</span>
                <span onClick={confirmFuture} style={{filter: 10 < val ? 'blur(2px)' : 'none',
                                        cursor: 10 < val ? 'not-allowed' : 'pointer',
                                        pointerEvents: 10 < val ? 'none' : 'auto'}}>10</span>
                </>
                 )}
                </ol>
                </>
                   )}
                </div>
                {counter <= 16 && ( 
                    <footer style={style} className="foot"> </footer>
                )}
                    {counter > 20 && (
                <Result career={career}  
                        money={money}
                        per= {per}
                        rel= {rel}
                        fun = {fun}
                    physical = {physical} 
                    spirit = {spirit}
                    health = {health}
                    contribution = {cont}
                    purpose = {pur}
                    selected = {selected}
                

                />
            )}
             
                </div>
            )
            
}
 
export default Test;