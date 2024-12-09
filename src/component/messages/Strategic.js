import { useState } from "react";

import next from '../next-bt.png';
import back from '../previous-bt.png'

const Strategic = ({close, msg, submit, quest}) => {
    const [currentIndex, setCurrentIndex] = useState(msg)

    const categories = [
        {
          score: 1,
          indication: [
            'Lacks clear understanding of strategic planning',
            'Reactive approach to challenges',
            'Minimal long-term vision',
            'Limited ability to connect dots between different business aspects'
          ],
          reflectiveQuestions: [
            "Can you articulate the organization's long-term goals?",
            'Do you typically respond to situations as they arise?',
            'Are you able to predict potential business challenges?',
            'Do you struggle to see how different business functions interconnect?'
          ],
          aspiIndication: [
            'Minimal or no understanding of C-suite-level strategic thinking.',
            'Lacks clarity on what C-suite readiness entails.',
            'Relies on limited personal experience or outdated methods.'
          ],
          futureQuestions: [
                'Am I currently aware of what is expected in a C-suite role?',
                'Can I realistically make significant progress in this area within the defined timeframe?'
            ]
        },
        {
            score: 2,
          indication: [
                    'Basic awareness of strategic concepts',
                    'Occasional forward-thinking moments',
                    'Limited understanding of competitive landscape',
                    'Sporadic attempts at systemic thinking'
          ],
          reflectiveQuestions: [
            'Have you started to think beyond immediate tasks?',
            'Can you identify 1-2 potential future trends in your industry?',
            'Do you sometimes consider broader implications of decisions?',
            'Are you beginning to recognize the importance of strategic planning?',
          ],
          aspiIndication: [
                'Basic awareness of the expectations for C-suite leaders.',
                'Starting to explore relevant concepts and frameworks.',
                'Occasional exposure to high-level decision-making.'
          ],
          futureQuestions: [
                                'Have I begun to explore the requirements of C-suite leadership?',
                                "Do I have access to any resources or mentors for guidance?"
          ]
        },  

        {
            score: 3,
            indication: [
                'Growing understanding of strategic principles',
                'Basic scenario planning skills',
                'Rudimentary competitive analysis',
                'Emerging ability to connect different business domains'
            ],
            reflectiveQuestions: [
                'Can you develop a simple strategic plan for a project?',
                'Are you becoming more proactive than reactive?',
                'Do you understand how different departments interact?',
                'Can you outline potential scenarios for a business challenge?'
            ],
            aspiIndication: [
                    'Some practical exposure to strategic leadership responsibilities.',
                    'Beginning to identify skill gaps for advancement.',
                    'Demonstrates sporadic application of advanced leadership principles.'
            ],
            futureQuestions: [
                "Have I identified my major gaps in C-suite readiness?",
                'Am I consistently working on improving a few relevant skills?'
            ]
        },

        {
            score: 4,
            indication: [
                'Consistent strategic thinking approach',
                'Moderate scenario planning skills',
                'Clear understanding of organizational goals',
                'Ability to anticipate some market changes',
                'Basic cross-functional strategic insights'
            ],
            reflectiveQuestions: [
                'Do you regularly consider long-term implications of decisions?',
                'Can you create a comprehensive strategic plan with multiple scenarios?',
                'Are you able to identify potential disruptions in your industry?',
                'Do you understand how your strategic decisions impact different business units?'
            ],
            aspiIndication: [
                'Foundational knowledge of C-suite responsibilities.',
                'Active participation in high-level discussions, though inconsistently.',
                'Awareness of key trends in business and leadership.',
                'Some collaboration with senior leaders.'
            ],
            futureQuestions: [
                "Am I regularly involved in strategic conversations?",
                'Can I envision myself taking on more complex responsibilities within the defined timeframe?'
            ]
        },
        {
            score: 5,
            indication: [
                'Robust strategic thinking framework',
                'Advanced scenario planning capabilities',
                'Comprehensive understanding of competitive landscape',
                'Strong cross-functional strategic integration',
                'Ability to balance short-term and long-term perspectives'
            ],
            reflectiveQuestions: [
                'Can you develop nuanced, multi-layered strategic plans?',
                'Do you consistently analyze potential future scenarios?',
                'Are you adept at connecting strategic initiatives across departments?',
                'Can you articulate how current actions align with long-term organizational vision?'
            ],
            aspiIndication: [
                'Moderate proficiency in strategic thinking and leadership.',
                'Actively building relationships with executive-level professionals.',
                'Experience leading cross-functional teams or projects.',
                'Demonstrates growing confidence in leadership roles.'                
            ],
            futureQuestions: [
                "Have I successfully led projects that align with C-suite demands?",
                'Do I have professional connections that help me learn about executive responsibilities?'
            ]
        },
        {
            score: 6,
            indication: [
                'Complex strategic thinking capabilities',
                'Sophisticated scenario planning and risk management',
                'Deep understanding of industry dynamics',
                'Ability to create innovative strategic frameworks',
                'Exceptional cross-functional and systems thinking'
            ],
            reflectiveQuestions: [
                "Can you develop groundbreaking strategic approaches?",
                'Do you anticipate and shape industry trends?',
                'Are you capable of transforming strategic challenges into opportunities?',
                'Can you create holistic strategies that transcend traditional boundaries?'
            ],
            aspiIndication: [
                'Solid understanding of key strategic and operational frameworks.',
                'Consistently contributes value in high-level initiatives.',
                'Actively investing in leadership development programs.',
                'Building a personal brand for visibility in executive spaces.'
            ],
            futureQuestions: [
                'Am I recognized as a valuable contributor in high-level projects?',
                'Do I have a plan for enhancing my executive presence?'
            ]
        },
        {
            score: 7,
            indication: [
                'Visionary strategic thinking',
                'Predictive and adaptive strategic capabilities',
                'Profound understanding of global business ecosystems',
                'Capacity to lead strategic transformation',
                'Exceptional foresight and intuition'
            ],
            reflectiveQuestions: [
                'Do you consistently think 5-10 years ahead?',
                'Can you redefine entire business models?',
                'Are you seen as a thought leader in strategic innovation?',
                'Do you create strategies that fundamentally reshape industry landscapes?'
            ],
            aspiIndication: [
                    'Demonstrated competence in leading strategic initiatives.',
                    'Strong reputation for problem-solving and decision-making.',
                    'Clear vision of personal and professional goals for C-suite readiness.',
                    'Actively sought for insights or contributions in leadership circles.'
            ],
            futureQuestions: [
                'Do I consistently demonstrate strategic thinking in my current role?',
                'Am I being recognized or recommended for leadership roles in my network?'
            ]
        }, {
            score: 8,
            indication: [
                'Extraordinary strategic intelligence',
                'Unparalleled predictive capabilities',
                'Ability to architect complex, adaptive strategies',
                'Profound influence on industry evolution',
                'Transformational strategic leadership'
            ],
            reflectiveQuestions: [
                'Can you create strategies that fundamentally alter market dynamics?',
                'Do you have a track record of successfully predicting and navigating disruptive changes?',
                'Are you recognized as a strategic visionary beyond your organization?',
                'Can you synthesize complex global trends into actionable strategic frameworks?'
            ],
            aspiIndication: [
                'Mastery in managing teams and delivering results at an organizational level.',
                'Strong professional network within C-suite or equivalent domains.',
                'Active engagement in thought leadership or public speaking.',
                'High alignment with the qualities expected of top leaders.'
            ],
            futureQuestions: [
                'Am I trusted with high-stakes decisions and responsibilities?',
                'Do I have a clear roadmap for achieving my C-suite aspirations in the defined timeframe?'
            ]
        },
        {
            score: 9,
            indication: [
                'Transcendent strategic cognition',
                'Near-prophetic strategic foresight',
                'Capacity to reshape entire industries',
                'Global strategic perspective',
                'Extraordinary systemic and lateral thinking'
            ],
            reflectiveQuestions: [
                'Have you fundamentally transformed entire industries?',
                'Can you see strategic opportunities invisible to others?',
                'Do you create strategies that seem revolutionary?',
                'Are you consistently ahead of global strategic curves?'
            ],
            aspiIndication: [
                'Exceptional strategic thinking and operational management.',
                'Regularly interfaces with executives and board members.',
                'Recognized as a mentor or role model within the organization.',
                'Prepared to transition into C-suite roles with minimal additional development.'
            ],
            futureQuestions: [
                'Am I consistently demonstrating C-suite-level leadership traits?',
                'Have I built strong relationships with key stakeholders and decision-makers?'
            ]
        },
        {
            score: 10,
            indication: [
                'Unmatched strategic wisdom',
                'Comprehensive understanding of global strategic dynamics',
                'Ability to architect strategies across multiple interconnected domains',
                'Transformative strategic leadership',
                'Complete alignment of vision, strategy, and execution'
            ],
            reflectiveQuestions: [
                'Do you consistently create strategies that redefine global business paradigms?',
                'Can you seamlessly integrate strategies across geopolitical, technological, and economic domains?',
                'Are you recognized as a global strategic thought leader?', 
                'Do your strategic insights transcend traditional strategic thinking?'
            ],
            aspiIndication: [
                'Fully ready for a C-suite position.',
                'Exceptional leadership, strategy, and execution skills.',
                'Trusted as a visionary and influential leader.',
                'Fully aligned with organizational and market demands for C-suite roles.'
            ],
            futureQuestions: [
                'Am I currently at a level where I can confidently assume a C-suite role?',
                'Is there anything critical left to achieve before stepping into this role?'
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



 
export default Strategic;