import { useState } from "react";

import next from '../next-bt.png';
import back from '../previous-bt.png'

const Network = ({close, msg, submit, quest}) => {
    const [currentIndex, setCurrentIndex] = useState(msg)

    const categories = [
        {
          score: 1,
          indication: [
            'You have limited connections in your industry.',
            'Little to no effort has been made to establish a professional network.',
            'No visibility or recognition within your field.'
          ],
          reflectiveQuestions: [
            'Do I know key players in my industry?',
            'Have I intentionally built relationships with peers or mentors?',
            'Is my professional influence limited to my immediate team or workplace?'
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
                    'Starting to identify key players and influencers in the industry.',
                    'Initial steps have been taken to expand your network (e.g., attending one or two events).',
                    'Limited recognition outside your current organization.'
          ],
          reflectiveQuestions: [
                    'Have I recently begun attending industry events or conferences?',
                    'Do I have professional connections outside my organization?',
                    'Am I taking steps to develop visibility in my field?',
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
                'A few meaningful relationships exist outside your workplace.',
                'Some knowledge of industry trends and key stakeholders.',
                'Infrequent participation in industry-related events or discussions.'
            ],
            reflectiveQuestions: [
                'Do I have at least 2-3 meaningful professional connections in my industry?',
                'Am I aware of the major trends and influencers in my sector?',
                'Have I participated in any industry-related activities recently?'
            ],
            aspiIndication: [
                    'Takes small steps to innovate.',
                    'Recognizes the importance of agility but needs external encouragement to adapt.'
            ],
            futureQuestions: [
                'Have I embraced any new practices or technologies in the defined timeframe?',
                'What stops me from acting on innovative ideas?'
            ]
        },

        {
            score: 4,
            indication: [
                'Growing network but still relatively small and inconsistent.',
                'Occasional engagement with industry forums, webinars, or events.',
                'Limited recognition within smaller professional circles.'
            ],
            reflectiveQuestions: [
                'Do I actively participate in professional groups or forums?',
                'Have I been able to share ideas or collaborate with peers in my industry?',
                'Do I feel recognized in any way beyond my workplace?'
            ],
            aspiIndication: [
                'Proactively looks for small-scale improvements.',
                'Open to change but struggles with large, disruptive shifts.'
            ],
            futureQuestions: [
                'Can I name one area where I’ve successfully adapted in the defined timeframe?',
                'How do I handle unexpected changes in my role?'
            ]
        },
        {
            score: 5,
            indication: [
                'A growing network across multiple organizations or regions.',
                'Regular participation in industry events, panels, or forums.',
                'Some recognition as a knowledgeable professional within specific niches.'
            ],
            reflectiveQuestions: [
                'Do I have a steady number of industry contacts I interact with?',
                'Have I been invited to participate in panels or share insights in industry events?',
                'Am I recognized for my contributions in specific areas of my field?'
            ],
            aspiIndication: [
                'Balances tradition with occasional innovation.',
                'Adapts to moderate changes independently.',
                'Encourages team input.'                
            ],
            futureQuestions: [
                'Have I introduced or supported any innovative ideas that had a measurable impact?',
                'How do I foster a culture of flexibility?'
            ]
        },
        {
            score: 6,
            indication: [
                'Solid network across various levels within the industry.',
                'Regularly approached for collaboration, mentorship, or advice.',
                'Recognized for contributions within professional communities.'
            ],
            reflectiveQuestions: [
                "Do professionals frequently seek my input or advice?",
                'Have I actively mentored or collaborated with others in my industry?',
                'Am I known within at least one professional community or niche?'
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
                'Regularly featured or invited to contribute at industry events.',
                'Widely recognized within the professional community for expertise.',
                'Consistently leveraging your network for mutual benefit.'
            ],
            reflectiveQuestions: [
                'Am I invited to present, write, or lead in industry forums?',
                'Do I frequently interact with industry leaders and decision-makers?',
                'Is my influence felt across multiple groups or organizations?'
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
                'Strong network spanning multiple organizations and levels.',
                'Recognized as a thought leader in your field.',
                'Actively shaping discussions and decisions within your industry.'
            ],
            reflectiveQuestions: [
                'Am I consistently recognized as a thought leader in my field?',
                'Have I shaped significant initiatives or decisions in my industry?',
                'Is my name associated with innovation or leadership in the industry?'
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
                'Exceptional network with access to key industry players.',
                'Regularly sought after for guidance, mentorship, or leadership roles.',
                'Actively driving change and innovation within the industry.'
            ],
            reflectiveQuestions: [
                'Do industry leaders frequently approach me for advice or collaboration?',
                'Have I initiated or driven impactful changes within my industry?',
                'Am I considered an authority in my field by peers and competitors?'
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
                'Unparalleled network with global recognition and influence.',
                'Your opinions and actions significantly shape the industry landscape.',
                'Recognized as a visionary leader and trendsetter in the industry.'
            ],
            reflectiveQuestions: [
                'Am I globally recognized as a key influencer in my field?',
                'Do my actions or initiatives significantly impact the industry?',
                'Have I established a legacy or movement that defines part of my industry?'
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



 
export default Network;