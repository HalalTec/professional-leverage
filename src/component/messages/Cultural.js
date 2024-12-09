import { useState } from "react";

import next from '../next-bt.png';
import back from '../previous-bt.png'

const Cultural = ({close, msg, submit, quest}) => {
    const [currentIndex, setCurrentIndex] = useState(msg)

    const categories = [
        {
          score: 1,
          indication: [
            "Little to no understanding of the organization's culture and values.",
            'Actions and decisions often misalign with organizational ethics.',
            'Struggles to embody the mission.'
          ],
          reflectiveQuestions: [
            'Do I understand my organization’s core values and culture?',
            'Have my actions contradicted the organization’s ethical standards?',
            'Do I align with the mission?'
          ],
          aspiIndication: [
            'Minimal awareness of organizational culture.',
            'Limited understanding of ethical practices.',
            'Rarely reflects on personal or company alignment.'
          ],
          futureQuestions: [
                'Do I have a basic understanding of the culture I aim to align with?',
                'Am I aware of gaps in my ethical understanding in the defined timeframe?'
            ]
        },
        {
            score: 2,
          indication: [
                    'Initial awareness of organizational culture but not fully integrated into behaviors.',
                    'Limited alignment between personal and company values.',
                    'Rarely considers culture in decisions.'
          ],
          reflectiveQuestions: [
            'Do I have a basic understanding of cultural expectations?',
            'How often do I reflect on alignment with organizational values?',
            'Do ethics guide my decisions?',
          ],
          aspiIndication: [
                'Beginning to explore cultural alignment.',
                'Some awareness of ethical challenges in leadership.',
                'Basic recognition of personal integrity in decision-making.'
          ],
          futureQuestions: [
                                'Am I familiar with the foundational values of the target culture?',
                                'Can I identify areas where my personal values need improvement to align with organizational integrity?'
          ]
        },  

        {
            score: 3,
            indication: [
                'Growing understanding of cultural norms.',
                'Some inconsistencies in actions with values.',
                'Beginning to consider culture in decisions occasionally.'
            ],
            reflectiveQuestions: [
                'Do I understand cultural norms but struggle to live them fully?',
                'Are there gaps between my actions and company standards?',
                'Do I factor culture into decisions?'
            ],
            aspiIndication: [
                    'Basic understanding of organizational culture but lacks deeper insights.',
                    'Occasionally demonstrates integrity in leadership.',
                    'Struggles with consistent value alignment.'
            ],
            futureQuestions: [
                'Can I identify one or two areas where my integrity could be tested?',
                'Am I confident I can start aligning my actions with cultural expectations in the defined timeframe?'
            ]
        },

        {
            score: 4,
            indication: [
                'Moderate understanding of norms and values.',
                'Efforts to align behavior with values.',
                'Rare instances of compromised integrity.'
            ],
            reflectiveQuestions: [
                'Am I making intentional efforts to align with organizational values?',
                'Do I occasionally misalign with expectations?',
                'Do I reflect on culture in leadership?'
            ],
            aspiIndication: [
                'Understands cultural norms but has difficulty embodying them consistently.',
                'Demonstrates integrity in most situations but faces occasional lapses.',
                'Open to feedback on culture.'
            ],
            futureQuestions: [
                'Have I identified practical steps to improve my alignment with cultural expectations?',
                'Can I identify a mentor or role model who exemplifies cultural integrity?'
            ]
        },
        {
            score: 5,
            indication: [
                'Regularly integrates cultural values into decisions.',
                'Actions are consistently ethical.',
                'Recognized for cultural alignment by peers.'
            ],
            reflectiveQuestions: [
                'Do I reflect on cultural alignment regularly?',
                'Am I recognized as someone who embodies the organization’s values?',
                'Is consistency improving?'
            ],
            aspiIndication: [
                'Moderate understanding of cultural expectations and their importance.',
                'Integrity is becoming a consistent leadership trait.',
                'Takes responsibility for alignment gaps.'                
            ],
            futureQuestions: [
                'Can I consistently model integrity in most professional situations?',
                'Am I actively working on bridging gaps between my values and the organization’s culture?'
            ]
        },
        {
            score: 6,
            indication: [
                'Strong understanding of norms and values.',
                'Rarely questioned on integrity.',
                'Prioritizes culture in decision-making.'
            ],
            reflectiveQuestions: [
                "Am I a role model for cultural alignment?",
                'Do others rarely question my integrity?',
                'Do I consistently use cultural values as a guiding principle?'
            ],
            aspiIndication: [
                'Stronger alignment with cultural expectations, though occasional challenges persist.',
                'Integrity-driven decision-making is evident.',
                'Actively seeks feedback on alignment.'
            ],
            futureQuestions: [
                'Have I identified specific challenges I might face in maintaining cultural alignment?',
                'Am I taking proactive steps to understand cultural nuances in the defined timeframe?'
            ]
        },
        {
            score: 7,
            indication: [
                'Trusted advocate of organizational values.',
                'Proactively addresses cultural misalignments.',
                'Mentors others on integrity and alignment.'
            ],
            reflectiveQuestions: [
                'Am I recognized as a trusted advocate for company values?',
                'Have I addressed cultural misalignment in teams?',
                'Do I mentor others in embracing the culture?'
            ],
            aspiIndication: [
                    'Understands and aligns with organizational culture.',
                    'Demonstrates integrity as a leadership standard.',
                    'Actively models cultural alignment for others to follow.'
            ],
            futureQuestions: [
                'Can I confidently say my actions align with my organization’s values?',
                'Am I prepared to address and resolve cultural misalignment issues if they arise?'
            ]
        }, {
            score: 8,
            indication: [
                'Embedded in the organization’s culture as a role model.',
                'Drives initiatives to strengthen alignment.',
                'Widely recognized for promoting values'
            ],
            reflectiveQuestions: [
                'Do others look to me for cultural guidance?',
                'Have I initiated programs that reinforce values?',
                'Is my behavior exemplary in representing the culture?'
            ],
            aspiIndication: [
                'Deep understanding of cultural expectations.',
                'Recognized as a model of integrity and alignment.',
                'Able to influence others in upholding cultural and ethical standards.'
            ],
            futureQuestions: [
                'Can I lead others in maintaining high cultural and ethical standards?',
                'Am I prepared to resolve complex cultural alignment challenges in the defined timeframe?'
            ]
        },
        {
            score: 9,
            indication: [
                'Actively shapes the organization’s culture strategically.',
                'Recognized across the organization for integrity.',
                'Consulted for cultural guidance.'
            ],
            reflectiveQuestions: [
                'Am I influencing organizational culture at the strategic level?',
                'Do leaders seek my advice on culture?',
                'Is my cultural alignment respected widely?'
            ],
            aspiIndication: [
                'Exceptional alignment with organizational culture.',
                'Regularly advocates for ethical practices.',
                'Trusted by peers and leaders to resolve cultural and ethical dilemmas.'
            ],
            futureQuestions: [
                'Have I successfully navigated significant cultural or ethical challenges?',
                'Can I consistently balance personal and organizational values effectively?'
            ]
        },
        {
            score: 10,
            indication: [
                'Embodiment of organizational culture and values.',
                'Influences cultural standards across the industry.',
                'Synonymous with integrity and leadership.'
            ],
            reflectiveQuestions: [
                'Am I synonymous with my organization’s culture and values?',
                'Do I influence cultural standards industry-wide?',
                'Do I inspire others to uphold integrity?'
            ],
            aspiIndication: [
                'Complete mastery of cultural alignment and integrity.',
                'Known for shaping and enhancing organizational culture.',
                'Inspires others to achieve alignment and ethical excellence.'
            ],
            futureQuestions: [
                'Am I recognized as a cultural alignment leader within the organization?',
                'Can I confidently ensure the organization thrives through cultural integrity in the defined timeframe?'
            ]
        },
        {
            score: 10,
            indication: 'Exceptional spiritual connection, profound inner peace, complete alignment with purpose, deeply fulfilling spiritual practices, strong sense of transcendence.',
            reflectiveQuestions: [
                'Do you feel a profound, unbreakable connection to your spirituality and purpose?',
                'Are you consistently at peace, with a deep sense of fulfillment and clarity?',
                'Does your spirituality define and elevate your daily life?'


            ]
        }

      ];

      const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
      };
    
      const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
      };
      

      
      if (quest < 1) {
        return ( 
            <>
                       <div className="message" >
                    <div className="card"> 
                    <div className="confirm">
                    <h2> Confirm Your Selection of: {categories[currentIndex].score} </h2>
                    <button onClick={close} style={{color:"red"}} className="close">X</button>
                    </div>  
                    <h5 style={{color:"red"}}>Go through the description below and confirm your selection, or use the page controls to make changes</h5>
                    <h3>Indicators for level {currentIndex+1}:</h3>
                    <p style={{fontSize:"15px"}}> {categories[currentIndex].indication} </p>
                    <h3> Reflective Questions:</h3>
                    <ul style={{textAlign:"left"}}>
                    <li style={{listStyle:"disc"}}> {categories[currentIndex].reflectiveQuestions[0]}</li>
                    <li style={{listStyle:"disc"}}> {categories[currentIndex].reflectiveQuestions[1]}</li>
                    <li style={{listStyle:"disc"}}> {categories[currentIndex].reflectiveQuestions[2]}</li>
                    </ul>
                    <div className="ref-button">
                    <button onClick={prevSlide} className=" prev" style={{marginTop:"0px"}}><img src={back}  /></button> <button  id="myButton" onClick={submit} >{currentIndex+1}</button>
                    
                    <label htmlFor="myButton" className="select"> Confirm {currentIndex+1}</label> <button onClick={nextSlide} className=" prev" style={{marginTop:"0px"}}><img src={next} /></button>
                    </div>
                    </div>
                </div>
                </>
        )
      }else {
        return (<> 
        
            {/* future */}
                  <div className="message" >
               <div className="card"> 
               <div className="confirm">
               <h2> Confirm Your Selection of: {categories[currentIndex].score} </h2>
               <button onClick={close} style={{color:"red"}} className="close">X</button>
               </div>
               <h5 style={{color:"red"}}>Go through the description below and confirm your selection, or use the page controls to make changes</h5>
               <h3>Aspirational Indicators {currentIndex+1}:</h3>
               <ul style={{textAlign:"left"}}>
               {categories[currentIndex].aspiIndication.map((indication, index) => (
                   <li key={index} style={{ listStyle: "disc" }}>
                   {indication}
                   </li>
               ))}
               </ul>
               <h3> Reflective Questions:</h3>
               <ul style={{textAlign:"left"}}>
               {categories[currentIndex].futureQuestions.map((indication, index) => (
                   <li key={index} style={{ listStyle: "disc" }}>
                   {indication}
                   </li>
               ))}
               </ul>                
               <div className="ref-button">
               <button onClick={prevSlide} className=" prev" style={{marginTop:"0px"}}><img src={back}  /></button> <button  id="myButton" onClick={submit} >{currentIndex+1}</button>
               
               <label htmlFor="myButton" className="select"> Confirm {currentIndex+1}</label> <button onClick={nextSlide} className=" prev" style={{marginTop:"0px"}}><img src={next} /></button>
               </div>
               </div>
           </div>
           </>
           
       
    );
     }
   

          
}



 
export default Cultural;