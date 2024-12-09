import { useState } from "react";

import next from '../next-bt.png';
import back from '../previous-bt.png'

const Executive = ({close, msg, submit, quest}) => {
    const [currentIndex, setCurrentIndex] = useState(msg)

    const categories = [
        {
          score: 1,
          indication: [
            'Rarely engages in professional conversations.',
            'Lacks confidence when presenting or speaking.',
            'Does not dress appropriately for professional settings.'
          ],
          reflectiveQuestions: [
            'Do you struggle to communicate your ideas clearly in meetings?',
            'Am you often overlooked in discussions or decision-making?',
            'How do you feel when speaking to groups or senior leaders?'
          ],
          aspiIndication: [
            'Struggles with consistent professional demeanor.',
            'Limited confidence in high-pressure situations.',
            'Rarely takes the lead in presenting ideas or initiatives.'
          ],
          futureQuestions: [
                'Do I feel overwhelmed in high-stakes situations?',
                'Am I uncomfortable taking center stage in discussions or decisions?'
            ]
        },
        {
            score: 2,
          indication: [
                    'Infrequently participates in discussions and avoids eye contact.', 
                    'Limited awareness of body language and its impact on others.', 
                    'Struggles to articulate thoughts clearly when asked.'
          ],
          reflectiveQuestions: [
            'Do you often feel anxious or uncomfortable in professional settings?',
            'Have you received feedback indicating a lack of professionalism?',
            'Do you find it difficult to engage with colleagues or clients?',
          ],
          aspiIndication: [
                'Occasionally maintains composure but lacks consistency.',
                'Hesitates to communicate with clarity and assertiveness.',
                " Minimal impact on others' perceptions."
          ],
          futureQuestions: [
                                'Do I find myself doubting my ability to command attention?',
                                "Do I rarely influence group dynamics positively?"
          ]
        },  

        {
            score: 3,
            indication: [
                'Occasionally speaks up but lacks clarity and confidence.', 
                'Shows some awareness of personal appearance but is inconsistent.', 
                'Body language may appear closed or defensive at times.'
            ],
            reflectiveQuestions: [
                'Do you sometimes hesitate to share your thoughts in meetings?',
                'How often do you prepare for presentations or important conversations?',
                'Do you feel that your contributions are valued by others?'
            ],
            aspiIndication: [
                    'Demonstrates calmness in familiar settings but struggles under pressure.',
                    'Basic ability to articulate thoughts but lacks authority in delivery.'
            ],
            futureQuestions: [
                "Am I sometimes able to project confidence, but only in familiar or low-pressure environments?"
            ]
        },

        {
            score: 4,
            indication: [
                'Participates more regularly but still struggles to make an impact.', 
                'Beginning to understand the importance of executive presence.',
                'Some awareness of the effect of non-verbal cues on others.'
            ],
            reflectiveQuestions: [
                'Are you able to articulate your ideas, but struggle with confidence?',
                'How do you handle questions or challenges during discussions?',
                'Do you seek feedback on your presentation style?'
            ],
            aspiIndication: [
                'Can display confidence in one-on-one or small group settings.',
                'Occasionally takes initiative but avoids high-visibility opportunities.'
            ],
            futureQuestions: [
                "Am I comfortable engaging in smaller settings but hesitant to address larger audiences?"
            ]
        },
        {
            score: 5,
            indication: [
                'Engages in conversations but lacks assertiveness and clarity.', 
                'Dresses appropriately for most situations but lacks personal style.', 
                'Body language is occasionally open, but not consistent.'
            ],
            reflectiveQuestions: [
                'Are you comfortable speaking to small groups but feel intimidated by larger audiences?',
                'How often do you practice active listening during conversations?',
                'Do you actively work on improving your communication skills?'
            ],
            aspiIndication: [
                'Steady presence in small to mid-sized group discussions.',
                'Beginning to develop clarity and assertiveness in speech.',
                'Takes initiative in defined areas.'                
            ],
            futureQuestions: [
                'Am I showing signs of growth in communicating with authority?',
                'Do I often take the lead in areas I’m confident about?'
            ]
        },
        {
            score: 6,
            indication: [
                'Engages effectively with peers and some leaders, showing moderate confidence.', 
                'Understands the importance of executive presence and works to improve it.', 
                'Maintains good eye contact and posture during interactions.'
            ],
            reflectiveQuestions: [
                "Are you able to express your ideas clearly and confidently in most situations?",
                'How do you prepare for high-stakes conversations or meetings?',
                'Do you receive positive feedback about your communication style from peers?'
            ],
            aspiIndication: [
                'Projects confidence in routine meetings.',
                'Frequently delivers clear, structured messages.',
                'Starting to influence peers positively and consistently.'
            ],
            futureQuestions: [
                'Am I comfortable taking the lead in structured group discussions?',
                'Do others look to me for clear and decisive input?'
            ]
        },
        {
            score: 7,
            indication: [
                'Regularly participates in discussions with confidence and clarity.', 
                'Demonstrates a professional appearance consistently, reflecting personal style.', 
                'Body language is generally open and inviting, fostering engagement.'
            ],
            reflectiveQuestions: [
                'Are you seen as a credible contributor by your colleagues and superiors?',
                'How do you handle criticism or differing opinions during discussions?',
                'Do you actively mentor others in developing their executive presence?'
            ],
            aspiIndication: [
                    'Commands respect in most professional settings.',
                    'Regularly delivers compelling presentations and arguments.',
                    'Recognized for fostering trust and collaboration.'
            ],
            futureQuestions: [
                'Do I often feel I leave a strong impression during interactions?',
                'Do others frequently seek my input and leadership?'
            ]
        }, {
            score: 8,
            indication: [
                'Frequently leads discussions and is respected by peers and leaders alike.',
                'Personal style is professional yet distinctive, enhancing presence.', 
                'Non-verbal cues consistently align with verbal messages, enhancing clarity.'
            ],
            reflectiveQuestions: [
                'Are you comfortable addressing large groups and engaging them effectively?',
                'How do you adapt your communication style based on the audience?',
                'Do I inspire confidence in others through your presence and communication?'
            ],
            aspiIndication: [
                'Effectively inspires and motivates teams.',
                'Displays consistent composure under all circumstances.',
                'Trusted by peers and superiors as a go-to leader.'
            ],
            futureQuestions: [
                'Am I known for my ability to stay composed and influential even in highly dynamic environments?'
            ]
        },
        {
            score: 9,
            indication: [
                'Often sought after for leadership roles and opportunities to present ideas.', 
                'Exemplifies strong executive presence in all interactions, inspiring trust.', 
                'Uses body language effectively to enhance communication and engagement.'
            ],
            reflectiveQuestions: [
                'Are you recognized as a thought leader within my organization or industry?',
                'How do others describe your influence and impact in meetings or presentations?',
                'Do you actively contribute to shaping the culture of professionalism within your organization?'
            ],
            aspiIndication: [
                'Consistently demonstrates gravitas and authority.',
                'Viewed as a role model for communication and presence.',
                'Regularly drives alignment and inspires action.'
            ],
            futureQuestions: [
                'Do others often describe me as inspiring or commanding in my presence?',
                'Am I able to align diverse teams toward a goal?'
            ]
        },
        {
            score: 10,
            indication: [
                'Consistently demonstrates exceptional executive presence across all settings.',
                'Inspires trust, respect, and admiration from all stakeholders consistently.',
                'Mastery of verbal and non-verbal communication skills that engage audiences effectively.'
            ],
            reflectiveQuestions: [
                'Are you seen as a role model for executive presence by colleagues at all levels?',
                'How do I leverage my executive presence to mentor and develop others into leadership roles?',
                'What steps do I take to continuously improve my executive presence and influence within the organization?'
            ],
            aspiIndication: [
                'Effortlessly exudes confidence, authority, and inspiration.',
                'Viewed as a pinnacle of executive presence by peers and superiors.',
                'A natural influencer at all levels.'
            ],
            futureQuestions: [
                'Do I naturally lead conversations and inspire others to follow my vision?',
                'Is my executive presence seen as industry-leading?'
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



 
export default Executive;