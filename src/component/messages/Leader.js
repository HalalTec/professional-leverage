import { useState } from "react";

import next from '../next-bt.png';
import back from '../previous-bt.png'

const Leader = ({close, msg, submit, quest}) => {
    const [currentIndex, setCurrentIndex] = useState(msg)

    const categories = [
        {
          score: 1,
          indication: [
            'No leadership experience, Lack awareness about leadership principles'
          ],
          reflectiveQuestions: [
            'Have you ever taken on a leadership role?',
            'Do you understand basic leadership concepts?'
          ],
          aspiIndication: [
            'Basic understanding of leadership roles',
            'Minimal experience leading teams',
                'Eager to learn'
          ],
          futureQuestions: [
                'Do I understand the foundational responsibilities of C-suite roles?',
                'Am I ready to start learning leadership basics in the defined timeframe?'
            ]
        },
        {
            score: 2,
          indication: [
                    'Limited understanding of team dynamics, rarely takes initiative'
          ],
          reflectiveQuestions: [
            'How often do you contribute ideas in group settings?',
            'Am you aware of your impact on team morale?',
          ],
          aspiIndication: [
                'Participation in small leadership tasks',
                'Developing communication and organizational skills'
          ],
          futureQuestions: [
                                'Have I begun taking ownership of small leadership responsibilities?',
                                'Can I see tangible improvement in communication or delegation within the defined timeframe?'
          ]
        },  

        {
            score: 3,
            indication: [
                'Occasionally leads small projects, Struggles with decision-making'
            ],
            reflectiveQuestions: [
                'Have you led any projects, however small?',
                'Do you find it difficult to make decisions under pressure?'
            ],
            aspiIndication: [
                    'Leading small projects or teams',
                    'Growing self-awareness as a leader'
            ],
            futureQuestions: [
                "Have I successfully led a team or project, even on a small scale?",
                'Am I aware of areas I need to improve to grow into a stronger leader in the defined timeframe?'
            ]
        },

        {
            score: 4,
            indication: [
                'Basic understanding of leadership styles, some experience in guiding peers'
            ],
            reflectiveQuestions: [
                'Can you identify different leadership styles?',
                'How comfortable am you in providing feedback to others?'
            ],
            aspiIndication: [
                'Comfortable leading medium-sized projects',
                'Gaining insights into decision-making in leadership'
            ],
            futureQuestions: [
                "Can I see myself effectively leading medium-sized initiatives within the defined timeframe?",
                'Have I developed some confidence in making impactful decisions?'
            ]
        },
        {
            score: 5,
            indication: [
                ' Moderate experience in leadership roles, Able to motivate others'
            ],
            reflectiveQuestions: [
                'Do you have experience leading teams or initiatives?',
                'How do you encourage my peers to perform better?'
            ],
            aspiIndication: [
                'Strong team leadership abilities',
                'Familiarity with cross-functional collaboration',
                'Eager for growth'                
            ],
            futureQuestions: [
                'Am I leading with competence and confidence in multi-team or multi-department collaborations?',
                'Is my desire for growth matched by my capacity to handle new challenges?'
            ]
        },
        {
            score: 6,
            indication: [
                'Recognizes personal leadership strengths and weaknesses, engages in self-reflection'
            ],
            reflectiveQuestions: [
                "What are my key strengths as a leader?",
                'How often do I reflect on my leadership practices?'
            ],
            aspiIndication: [
                'Demonstrated impact in a leadership role',
                'Able to mentor or guide others',
                'Actively networking'
            ],
            futureQuestions: [
                'Have I consistently delivered results as a leader?',
                'Am I prepared to take on the additional responsibilities that come with higher leadership roles within the timeframe?'
            ]
        },
        {
            score: 7,
            indication: [
                'Actively seeks feedback on leadership style, shows adaptability in various situations'
            ],
            reflectiveQuestions: [
                'How do you respond to feedback from my team?',
                'Am you flexible in my approach to different team dynamics?'
            ],
            aspiIndication: [
                    'Track record of measurable achievements in leadership',
                    'Strategic thinker',
                    'Embracing complexity'
            ],
            futureQuestions: [
                'Have I made significant progress in strategic thinking and execution?',
                'Do I see myself thriving under complex, high-stakes responsibilities within the defined timeframe?'
            ]
        }, {
            score: 8,
            indication: [
                'Demonstrates effective conflict resolution skills, mentors junior colleagues'
            ],
            reflectiveQuestions: [
                'Can I handle conflicts constructively within my team?',
                'Do I take time to mentor others?'
            ],
            aspiIndication: [
                'Trusted as a leader in multiple capacities',
                'Mastery of core leadership skills',
                'Growing thought leader'
            ],
            futureQuestions: [
                'Am I known as a reliable and impactful leader in my organization?',
                'Have I begun establishing myself as a thought leader within the defined timeframe?'
            ]
        },
        {
            score: 9,
            indication: [
                'Inspires and influences others positively, has a clear vision for team goals'
            ],
            reflectiveQuestions: [
                ' How do you inspire my team towards common goals?',
                'Do you communicate my vision effectively?'
            ],
            aspiIndication: [
                'Visionary leadership skills',
                'Driving innovation and transformation',
                'Recognized as a key organizational pillar'
            ],
            futureQuestions: [
                'Am I actively shaping the future of my organization through vision and innovation?',
                'Do I see myself consistently leading in transformative and high-impact roles?'
            ]
        },
        {
            score: 10,
            indication: [
                'Recognized as a leader within the organization, actively develops future leaders'
            ],
            reflectiveQuestions: [
                'Am you seen as a role model by my peers?',
                'How do you cultivate leadership qualities in others?'
            ],
            aspiIndication: [
                'Ready to confidently take on or thrive in a C-suite role',
                'Fully embodying strategic and transformational leadership'
            ],
            futureQuestions: [
                'Can I confidently see myself excelling in a C-suite role within the defined timeframe?',
                'Have I fully developed the skills and mindset to lead at the highest level?'
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



 
export default Leader;