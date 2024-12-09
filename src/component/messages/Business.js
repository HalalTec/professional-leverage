import { useState } from "react";

import next from '../next-bt.png';
import back from '../previous-bt.png'

const Business = ({close, msg, submit, quest}) => {
    const [currentIndex, setCurrentIndex] = useState(msg)

    const categories = [
        {
          score: 1,
          indication: [
            "Basic understanding of company's primary products/services",
            'Limited knowledge of revenue streams',
            'Minimal exposure to financial statements'
          ],
          reflectiveQuestions: [
            "Can you explain your company's main revenue sources?",
            'Do you understand basic financial terms like revenue, profit, and margins?'
          ],
          aspiIndication: [
            'Limited exposure to leadership roles.',
            'Minimal understanding of C-suite responsibilities.',
            'No current plan for readiness.'
          ],
          futureQuestions: [
                'Am I ready to start learning about the core responsibilities of C-suite roles?',
                'Have I outlined a basic plan to explore executive leadership?'
            ]
        },
        {
            score: 2,
          indication: [
                    'Little to no involvement in business strategy discussions',
                    'Focused mainly on own department/function'
          ],
          reflectiveQuestions: [
            "How familiar are you with your company's competitive landscape?",
            'What is your level of comfort in discussing business metrics?'
          ],
          aspiIndication: [
                'Basic understanding of leadership concepts.',
                'Emerging awareness of the C-suite landscape.',
                'Initial steps taken toward leadership development.'
          ],
          futureQuestions: [
                                'Have I explored foundational skills necessary for executive leadership?',
                                "Am I committed to developing my leadership capabilities further?"
          ]
        },  

        {
            score: 3,
            indication: [
                "Understanding of company's business model",
                'Ability to read and interpret basic financial statements',
                'Knowledge of key industry trends'
            ],
            reflectiveQuestions: [
                'How do different departments contribute to overall business success?',
                "Can you explain your company's competitive advantages?"
            ],
            aspiIndication: [
                    'Consistent effort in acquiring leadership skills.',
                    'Moderate knowledge of industry trends and C-suite dynamics.',
                    'Beginning to build a professional network.'
            ],
            futureQuestions: [
                "Am I expanding my leadership skills consistently?",
                'Have I identified specific areas I need to grow to pursue C-suite aspirations?'
            ]
        },

        {
            score: 4,
            indication: [
                'Basic understanding of market dynamics',
                'Awareness of cross-functional dependencies',
                'Contributing to departmental strategy'
            ],
            reflectiveQuestions: [
                'How do you track and measure business performance in your area?',
                'What market trends are currently affecting your industry?'
            ],
            aspiIndication: [
                'Proven ability to lead small teams or projects.',
                'Some familiarity with strategic decision-making.',
                'Regularly following and analyzing C-suite level discussions.'
            ],
            futureQuestions: [
                "Have I successfully demonstrated leadership in small-scale scenarios?",
                'Can I make strategic decisions that align with organizational goals?'
            ]
        },
        {
            score: 5,
            indication: [
                'Strong grasp of company financials and KPIs',
                'Active participation in strategy discussions',
                'Understanding of market positioning'
            ],
            reflectiveQuestions: [
                "How do your decisions impact the company's bottom line?",
                'What strategic initiatives have you led or contributed to?'
            ],
            aspiIndication: [
                'Experience leading moderate-scale teams or initiatives.',
                'Active participation in strategic planning.',
                'Gaining visibility within the organization.'                
            ],
            futureQuestions: [
                "Am I contributing meaningfully to my organization’s strategic direction?",
                'Have I begun to establish visibility as a leader within my professional circle?'
            ]
        },
        {
            score: 6,
            indication: [
                'Ability to link operational decisions to financial outcomes',
                'Experience in budget management',
                'Track record of cost optimization initiatives'
            ],
            reflectiveQuestions: [
                "How do you balance short-term results with long-term value creation?",
                'How do you assess and mitigate business risks?'
            ],
            aspiIndication: [
                'Clear expertise in leadership roles.',
                'Demonstrated ability to influence and drive organizational success.',
                'Strong network of mentors and peers.'
            ],
            futureQuestions: [
                'Have I developed a solid track record of impactful leadership?',
                "Am I actively engaging with a network that supports my C-suite goals?"
            ]
        },
        {
            score: 7,
            indication: [
                'Demonstrated success in P&L management',
                'Strong track record of strategic planning',
                'Deep understanding of industry ecosystem'
            ],
            reflectiveQuestions: [
                'How have you influenced company-wide strategy?',
                'What major business transformations have you led?'
            ],
            aspiIndication: [
                    'Proven results in large-scale leadership roles.',
                    'High proficiency in strategic thinking and execution.',
                    'Gaining recognition as a thought leader.'
            ],
            futureQuestions: [
                'Have I consistently delivered results in complex, high-impact leadership roles?',
                'Do others see me as a thought leader in my industry?'
            ]
        }, {
            score: 8,
            indication: [
                'Experience in market expansion or new business development',
                'History of successful change management',
                'Ability to spot and capitalize on market opportunities'
            ],
            reflectiveQuestions: [
                'How do you approach investment decisions and resource allocation?',
                'How do you analyze and respond to competitive threats?'
            ],
            aspiIndication: [
                'Leading multiple strategic initiatives with measurable success.',
                'Expertise in C-suite-level decision-making processes.',
                'Clear alignment with organizational vision and values.'
            ],
            futureQuestions: [
                'Am I seen as a trusted advisor to senior executives?',
                'Have I mastered the art of balancing strategic priorities with organizational culture?'
            ]
        },
        {
            score: 9,
            indication: [
                'Extensive P&L management experience',
                'Proven ability to drive business growth',
                'Track record of successful business transformation'
            ],
            reflectiveQuestions: [
                'How have you shaped or pivoted business models?',
                'What significant market opportunities have you identified and captured?'
            ],
            aspiIndication: [
                'Near-ready to take on a C-suite role.',
                'Extensive leadership achievements with industry-wide recognition.',
                'Confidently driving long-term strategies.'
            ],
            futureQuestions: [
                'Can I confidently envision myself stepping into a C-suite role?',
                'Do my achievements and network fully support my transition to top leadership?'
            ]
        },
        {
            score: 10,
            indication: [
                'Experience in M&A or strategic partnerships',
                'Recognized thought leader in industry',
                'History of creating sustainable competitive advantages'
            ],
            reflectiveQuestions: [
                'How do you approach long-term value creation vs. short-term performance?',
                'How do you balance stakeholder interests in strategic decisions?'
            ],
            aspiIndication: [
                'Fully prepared for a C-suite role.',
                'Established thought leader with industry respect.',
                'Driving systemic organizational and industry-wide changes.'
            ],
            futureQuestions: [
                'Am I already acting in capacities that resemble a C-suite role?',
                'Do I have the reputation, skillset, and network to succeed at the highest level of leadership?'
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



 
export default Business;