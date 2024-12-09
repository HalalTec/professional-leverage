import { useState } from "react";

import next from '../next-bt.png';
import back from '../previous-bt.png'

const Innovation = ({close, msg, submit, quest}) => {
    const [currentIndex, setCurrentIndex] = useState(msg)

    const categories = [
        {
          score: 1,
          indication: [
            'No innovation initiatives in place.',
            'Resistance to change is prevalent.',
            'Lack of awareness of industry trends'
          ],
          reflectiveQuestions: [
            'How often do you feel overwhelmed by changes in your industry?',
            'Do you believe that innovation is necessary for your organization?',
            'How comfortable are you with taking risks?'
          ],
          aspiIndication: [
            'Rarely introduces new ideas or strategies.',
            'Prefers to stick to traditional methods.',
            'Struggles to adapt to change.'
          ],
          futureQuestions: [
                'Am I willing to explore new ways of thinking and working in the defined timeframe?',
                'What steps can I take to improve my openness to change?'
            ]
        },
        {
            score: 2,
          indication: [
                    'Minimal attempts at innovation, mostly reactive.',
                    'Limited collaboration across teams.',
                    'Few employees feel empowered to propose new ideas.'
          ],
          reflectiveQuestions: [
            'What barriers do you face when trying to innovate?',
            'Are you open to feedback from your team regarding new ideas?',
            'How often do you celebrate small wins in innovation?',
          ],
          aspiIndication: [
                'Occasionally considers new ideas but hesitates to act.',
                'Sees change as challenging but necessary.'
          ],
          futureQuestions: [
                                'Can I identify one small change I can implement within the defined timeframe?',
                                'How often do I challenge my current assumptions?'
          ]
        },  

        {
            score: 3,
            indication: [
                'Some initiatives are in place but lack strategic direction.',
                'Innovation efforts are sporadic and uncoordinated.',
                'Limited understanding of agile methodologies among staff.'
            ],
            reflectiveQuestions: [
                'How frequently do you engage with your team about innovation?',
                'What processes do you have for evaluating new ideas?',
                'Are you familiar with agile practices, and how do they apply to your work?'
            ],
            aspiIndication: [
                    'Takes small steps to innovate.',
                    'Recognizes the importance of agility but needs external encouragement to adapt.'
            ],
            futureQuestions: [
                "Have I embraced any new practices or technologies in the defined timeframe?",
                'What stops me from acting on innovative ideas?'
            ]
        },

        {
            score: 4,
            indication: [
                'Basic innovation strategies exist but are not fully implemented.',
                "Some team members show initiative, but it's not widespread.",
                'Occasional training on agility concepts offered.'
            ],
            reflectiveQuestions: [
                'How do you prioritize innovation within your organization?',
                'What steps have you taken to foster a culture of agility?',
                'Can you identify any recent innovative successes in your team?'
            ],
            aspiIndication: [
                'Proactively looks for small-scale improvements.',
                'Open to change but struggles with large, disruptive shifts.'
            ],
            futureQuestions: [
                "Can I name one area where I’ve successfully adapted in the defined timeframe?",
                'How do I handle unexpected changes in my role?'
            ]
        },
        {
            score: 5,
            indication: [
                'Innovation is recognized as important, with moderate initiatives underway.',
                'Teams occasionally collaborate on projects.',
                'Some agile practices are adopted but not consistently applied.'
            ],
            reflectiveQuestions: [
                'How do you measure the success of your innovation efforts?',
                'In what ways do you encourage cross-functional collaboration?',
                'How often do you reflect on past innovations and learn from them?'
            ],
            aspiIndication: [
                'Balances tradition with occasional innovation.',
                'Adapts to moderate changes independently.',
                'Encourages team input.'                
            ],
            futureQuestions: [
                "Have I introduced or supported any innovative ideas that had a measurable impact?",
                'How do I foster a culture of flexibility?'
            ]
        },
        {
            score: 6,
            indication: [
                'Clear innovation goals align with business objectives.',
                'Regular brainstorming sessions are held across teams.',
                'Agile methodologies are being integrated into workflows.'
            ],
            reflectiveQuestions: [
                "How aligned are your innovation goals with overall business strategy?",
                'What mechanisms do you have for gathering employee insights on innovation?',
                'How comfortable are you with pivoting strategies based on feedback?'
            ],
            aspiIndication: [
                'Regularly suggests and tests new ideas.',
                'Reacts quickly to moderate changes.',
                'Comfortable leading small pivots.'
            ],
            futureQuestions: [
                'What innovations or strategies have I championed in the defined timeframe?',
                "How prepared am I to adjust plans when needed?"
            ]
        },
        {
            score: 7,
            indication: [
                ' Strong emphasis on continuous improvement and learning.',
                'Diverse teams actively contribute to innovative solutions.',
                'Agile practices are becoming a norm in project management.'
            ],
            reflectiveQuestions: [
                'How often do you seek external inspiration for innovation?',
                'What role does leadership play in fostering an innovative culture?',
                'How effectively does your organization respond to market changes?'
            ],
            aspiIndication: [
                    'Champions innovation in multiple areas.',
                    'Proactively plans for agility.',
                    'Encourages others to think creatively.'
            ],
            futureQuestions: [
                'Have I led a successful initiative that significantly impacted outcomes?',
                'How do I promote and reward innovation in my team?'
            ]
        }, {
            score: 8,
            indication: [
                ' Innovation is embedded in the organizational culture.',
                'High levels of employee engagement in creative processes.',
                'Regular training and development opportunities focused on agility and innovation.'
            ],
            reflectiveQuestions: [
                'What systems do you have in place to support ongoing innovation efforts?',
                'How do you celebrate and reward innovative contributions from employees?',
                'In what ways does your organization adapt quickly to new challenges?'
            ],
            aspiIndication: [
                'Creates systems to foster innovation.',
                'Thrives in environments requiring adaptability.',
                'Leads teams through change.'
            ],
            futureQuestions: [
                'Have I developed processes that consistently drive innovation?',
                'How do I navigate major disruptions effectively?'
            ]
        },
        {
            score: 9,
            indication: [
                'Leading-edge innovations are pursued proactively.',
                'Strong partnerships foster collaborative innovation efforts.',
                'Continuous feedback loops exist between teams and leadership regarding agility practices.'
            ],
            reflectiveQuestions: [
                'How does your organization leverage technology for innovative solutions?',
                'What future trends do you anticipate impacting your industry, and how prepared are you?',
                'How effectively does your organization share knowledge across teams to enhance agility?'
            ],
            aspiIndication: [
                'Consistently introduces transformational ideas.',
                'Shapes a culture of agility in the organization.',
                'Anticipates change.'
            ],
            futureQuestions: [
                'Have I inspired others to innovate and embrace change at scale?',
                'How do I ensure sustainability while driving bold innovation?'
            ]
        },
        {
            score: 10,
            indication: [
                'A culture of radical innovation thrives; failure is viewed as a learning opportunity.',
                'The organization is seen as an industry leader in agility and innovation practices.',
                'Comprehensive frameworks support rapid experimentation and implementation of ideas.'
            ],
            reflectiveQuestions: [
                'What legacy do you wish to leave regarding innovation within your organization?',
                'How does your organization influence industry standards through its innovative practices?',
                'In what ways can your leadership further enhance the culture of agility and creativity?'
            ],
            aspiIndication: [
                'Recognized as a thought leader in innovation.',
                'Sets trends and defines agility standards.',
                'Seamlessly navigates complex changes.'
            ],
            futureQuestions: [
                'Can I sustain my leadership position in innovation and agility?',
                'How do I continuously refine my methods to stay ahead?'
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



 
export default Innovation;