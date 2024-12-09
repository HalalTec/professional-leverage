import { useState } from "react";

import next from '../next-bt.png';
import back from '../previous-bt.png'

const Global = ({close, msg, submit, quest}) => {
    const [currentIndex, setCurrentIndex] = useState(msg)

    const categories = [
        {
          score: 1,
          indication: [
            'Minimal awareness of global trends and dynamics.',
            'Limited exposure to international markets or diverse cultural experiences.'
          ],
          reflectiveQuestions: [
            'Do I have any understanding of global business trends or cross-cultural practices?',
            'Have I engaged with professionals or markets outside my country?'
          ],
          aspiIndication: [
            'Limited awareness of global markets and cultural nuances.',
                'Rarely considers global implications in decisions.'
          ],
          futureQuestions: [
                'Do I have basic awareness of how global markets or cultural differences affect business?',
                'Can I commit to gaining some exposure in the defined timeframe?'
            ]
        },
        {
            score: 2,
          indication: [
                    'Beginning to learn about global issues and trends.',
                    'Limited international professional connections or exposure to cross-cultural environments.'
          ],
          reflectiveQuestions: [
            'Have I recently started exploring global business dynamics?',
            'Am I aware of the challenges and opportunities posed by globalization in my industry?',
          ],
          aspiIndication: [
                'Recognizes the existence of diverse global markets but has minimal engagement.',
                'Has taken initial steps to learn about global trends.'
          ],
          futureQuestions: [
                                'Have I explored any international business trends relevant to my industry?',
                                'Can I plan to research and connect with global networks in the timeframe?'
          ]
        },  

        {
            score: 3,
            indication: [
                'Initial efforts to engage with international markets or cultures (e.g., projects or studies).',
                'Basic understanding of a few global business trends.'
            ],
            reflectiveQuestions: [
                'Have I participated in any initiatives with an international component?',
                'Can I identify any global trends that impact my role or industry?'
            ],
            aspiIndication: [
                    'Acknowledges the importance of global thinking for leadership.',
                    'Has begun learning about international business practices or diverse cultures.'
            ],
            futureQuestions: [
                'Have I identified areas where global perspectives could improve my leadership?',
                'Can I commit to a small initiative for cross-cultural learning?'
            ]
        },

        {
            score: 4,
            indication: [
                'Some exposure to global teams, markets, or trends.',
                'Moderate awareness of cultural differences and their impact on business.'
            ],
            reflectiveQuestions: [
                'Do I work with colleagues or partners from different countries?',
                'Have I developed an appreciation for cultural differences in communication and leadership styles?'
            ],
            aspiIndication: [
                'Some experience collaborating with international teams.',
                'Has studied a few examples of global business strategies.'
            ],
            futureQuestions: [
                'Have I participated in any cross-border collaboration?',
                'Can I engage in a project that strengthens my global exposure within the timeframe?'
            ]
        },
        {
            score: 5,
            indication: [
                'Actively participating in cross-border projects or global teams.',
                'Growing awareness of geopolitical and economic trends affecting business.'
            ],
            reflectiveQuestions: [
                'Do I have consistent professional interactions with people or organizations from different countries?',
                'Do I stay updated on global trends and their impact on my industry?'
            ],
            aspiIndication: [
                'Consistently integrates basic global insights into decisions.',
                'Understands key geopolitical and economic trends affecting their industry.'                
            ],
            futureQuestions: [
                'Do I regularly consider global trends in my decision-making?',
                'Can I enhance my understanding of geopolitical dynamics within the timeframe?'
            ]
        },
        {
            score: 6,
            indication: [
                'Significant involvement in global markets or projects.',
                'Demonstrates cultural sensitivity and adapts leadership style to different regions.'
            ],
            reflectiveQuestions: [
                "Have I led cross-border teams or initiatives?",
                'Do I adjust my communication and leadership style based on cultural differences?'
            ],
            aspiIndication: [
                'Demonstrates moderate fluency in global markets and practices.',
                'Has successfully managed or contributed to an international project.'
            ],
            futureQuestions: [
                'Have I contributed meaningfully to an international project or discussion?',
                'Can I expand my global expertise through practical application?'
            ]
        },
        {
            score: 7,
            indication: [
                'Strong knowledge of global markets, economies, and cultural practices.',
                'Recognized within the organization for successfully navigating international opportunities.'
            ],
            reflectiveQuestions: [
                'Have I developed strategies that effectively address global challenges?',
                'Am I recognized as a leader who thrives in international or multicultural environments?'
            ],
            aspiIndication: [
                    'Viewed as knowledgeable about global markets by peers.',
                    'Maintains relationships across multiple countries and leverages them for insights or opportunities.'
            ],
            futureQuestions: [
                'Do others seek my input on global market dynamics?',
                'Can I deepen my cross-cultural connections and collaboration skills in the timeframe?'
            ]
        }, {
            score: 8,
            indication: [
                'Thought leader in addressing global challenges and opportunities.',
                'Regularly collaborates with international stakeholders to drive innovation.'
            ],
            reflectiveQuestions: [
                'Have I influenced organizational strategies to align with global business trends?',
                'Do I proactively seek global partnerships or opportunities for growth?'
            ],
            aspiIndication: [
                'Actively leads cross-border initiatives.',
                'Can adapt business strategies to suit different cultural and economic contexts effectively.'
            ],
            futureQuestions: [
                'Have I successfully led initiatives requiring cross-border understanding?',
                'Can I refine my ability to drive impactful global strategies within the timeframe?'
            ]
        },
        {
            score: 9,
            indication: [
                'Exceptional global expertise with a proven record of impact on international business strategies.',
                'Highly respected for cross-cultural leadership and global vision.'
            ],
            reflectiveQuestions: [
                ' Have I driven significant business results through global market strategies?',
                'Am I frequently sought out for my global perspective and leadership skills?'
            ],
            aspiIndication: [
                'Recognized as a thought leader in global strategy within their organization or industry.',
                'Regularly provides guidance on global trends and innovation.'
            ],
            futureQuestions: [
                'Do I influence strategic decisions at a global level?',
                'Can I leverage my expertise to drive innovation and foster international growth in the timeframe?'
            ]
        },
        {
            score: 10,
            indication: [
                'Renowned global leader shaping international business landscapes.',
                'Sets visionary global strategies and inspires others across multiple regions.'
            ],
            reflectiveQuestions: [
                'Have I created industry-wide impact through my global leadership?',
                'Am I recognized globally as a thought leader with unmatched expertise and influence?'
            ],
            aspiIndication: [
                'Known for exceptional mastery of global perspectives.',
                'Inspires others with visionary global leadership and serves as a mentor for aspiring global leaders.'
            ],
            futureQuestions: [
                'Am I acknowledged as an industry leader in global strategy?',
                'Can I mentor others and continuously innovate for global impact in the timeframe?'
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



 
export default Global;