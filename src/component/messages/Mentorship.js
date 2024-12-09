import { useState } from "react";

import next from '../next-bt.png';
import back from '../previous-bt.png'

const Mentorship = ({close, msg, submit, quest}) => {
    const [currentIndex, setCurrentIndex] = useState(msg)

    const categories = [
        {
          score: 1,
          indication: [
            'No formal mentorship programs in place.',
            'Lack of succession planning initiatives.',
            'Employees are unaware of potential leadership pathways.'
          ],
          reflectiveQuestions: [
            'How often do you discuss career development with your team?',
            'Are there clear roles for future leaders in your organization?',
            'Do you feel prepared for unexpected leadership changes?'
          ],
          aspiIndication: [
            'Minimal or no involvement in mentoring others.',
            'No structured approach to succession planning.',
            "Little understanding of mentorship's importance."
          ],
          futureQuestions: [
                'Do I currently have any mentorship relationships, either as a mentor or mentee?',
                'Have I explored what mentorship and succession planning involve?',
                'Is it realistic for me to start engaging in mentorship and succession-related activities within the defined timeframe?'
            ]
        },
        {
            score: 2,
          indication: [
                    ' Minimal efforts in mentorship; few employees receive guidance.',
                    'Succession planning is reactive rather than proactive.',
                    'Limited communication about leadership opportunities.'
          ],
          reflectiveQuestions: [
                    'What barriers prevent effective mentorship in your organization?',
                    'Do employees express interest in mentorship, and how is that managed?',
                    'How often do you think about future leadership needs?',
          ],
          aspiIndication: [
                'Basic awareness of the need for mentoring and succession planning.',
                'Starting to observe how others approach it.'
          ],
          futureQuestions: [
                                'Am I beginning to understand how mentorship can influence leadership?',
                                'Can I identify at least one person I could mentor or learn from?',
                                "In the defined timeframe, can I take the first steps toward learning or contributing to succession planning?"
          ]
        },  

        {
            score: 3,
            indication: [
                'Some informal mentoring occurs, but it lacks structure.',
                'Few identified successors for key roles.',
                'Occasional discussions about career paths but no clear strategy.'
            ],
            reflectiveQuestions: [
                'How do you identify potential leaders within your team?',
                'What processes do you have for tracking employee development?',
                'How do you currently support employees aspiring to leadership roles?'
            ],
            aspiIndication: [
                    'Informal mentorship relationships exist.',
                    'Some involvement in knowledge-sharing within the organization.'
            ],
            futureQuestions: [
                'Do I currently share knowledge or skills with colleagues in an informal way?',
                'Have I started to identify potential successors in my area of work?',
                'Can I develop a more intentional approach to mentoring others in the defined timeframe?'
            ]
        },

        {
            score: 4,
            indication: [
                'Basic mentorship initiatives exist but are not widely utilized.',
                'Some succession plans are drafted but not implemented.',
                'Employees have limited access to leadership training.'
            ],
            reflectiveQuestions: [
                'How do you encourage employees to seek mentorship opportunities?',
                'What criteria do you use to identify potential successors?',
                'Are there any recent examples of successful leadership transitions?'
            ],
            aspiIndication: [
                'Active involvement in mentoring one or two individuals.',
                'Awareness of tools or systems for succession planning.'
            ],
            futureQuestions: [
                'Am I mentoring someone with clear goals and outcomes?',
                'Have I explored frameworks or tools that support succession planning?',
                'In the defined timeframe, can I enhance my mentorship practices and document my approach?'
            ]
        },
        {
            score: 5,
            indication: [
                'Mentorship programs are established but inconsistently applied.',
                'Some succession plans are in place for critical roles.',
                'Employees have access to occasional training sessions on leadership skills.'
            ],
            reflectiveQuestions: [
                'How regularly do you review and update your succession plans?',
                'What feedback mechanisms exist for mentoring relationships?',
                'How do you assess the effectiveness of your current mentorship initiatives?'
            ],
            aspiIndication: [
                'Consistently mentoring multiple individuals.',
                'Beginning to document a clear succession plan for a team or department.'                
            ],
            futureQuestions: [
                'Do I consistently provide guidance and support to mentees?',
                'Am I starting to draft or formalize a succession plan in my area?',
                'Can I realistically scale my mentorship efforts and refine my succession strategies within the defined timeframe?'
            ]
        },
        {
            score: 6,
            indication: [
                'Structured mentorship programs exist with defined goals.',
                'Clear succession plans are developed for key positions.',
                'Regular training and development opportunities are provided for potential leaders.'
            ],
            reflectiveQuestions: [
                "How aligned are your mentorship programs with organizational goals?",
                'What methods do you use to evaluate the success of your succession planning?',
                'How do you foster a culture of mentorship within your organization?'
            ],
            aspiIndication: [
                'Recognized as a mentor within the organization.',
                'Drafted succession plans are shared and reviewed for feedback.'
            ],
            futureQuestions: [
                'Am I seen as a go-to mentor by colleagues and team members?',
                'Have I created a preliminary succession plan that aligns with organizational needs?',
                'Can I lead by example in mentorship and succession planning in the defined timeframe?'
            ]
        },
        {
            score: 7,
            indication: [
                ' Active mentorship relationships lead to visible employee growth.',
                'Succession planning is integrated into strategic business objectives.',
                'Employees participate in cross-functional projects as part of their development.'
            ],
            reflectiveQuestions: [
                'How do you ensure that mentors are well-prepared for their roles?',
                'What impact has your succession planning had on organizational stability?',
                'How often do you celebrate successful transitions within the organization?'
            ],
            aspiIndication: [
                    'Mentorship is integrated into professional routine.',
                    'A formalized and reviewed succession plan is in place for a team or department.'
            ],
            futureQuestions: [
                'Do I actively balance mentorship responsibilities with my primary role?',
                'Has my succession plan been formalized and reviewed by relevant stakeholders?',
                'In the defined timeframe, can I extend my mentorship impact across the organization?'
            ]
        }, {
            score: 8,
            indication: [
                'Mentorship is a core component of the organizational culture.',
                'Strong internal talent pipeline ready for key roles.',
                'Continuous feedback loops exist between mentors and mentees regarding development progress.'
            ],
            reflectiveQuestions: [
                'In what ways does your organization leverage mentoring to enhance leadership capabilities?',
                'How do you measure the long-term impact of mentorship on employee retention and satisfaction?',
                'What strategies do you have in place to promote diverse leadership candidates?'
            ],
            aspiIndication: [
                ' Recognized as a thought leader in mentorship and succession planning.',
                'Driving organizational initiatives in this area.'
            ],
            futureQuestions: [
                'Am I influencing the organization’s approach to mentorship and succession planning?',
                'Have I started mentoring future leaders beyond my direct team?',
                'Can I further enhance my influence in shaping mentorship and succession planning across the organization in the defined timeframe?'
            ]
        },
        {
            score: 9,
            indication: [
                'Mentoring relationships yield significant organizational benefits, such as improved performance and engagement.',
                'Comprehensive succession plans cover all critical roles with defined timelines and training pathways.',
                'External resources are utilized effectively to enhance internal talent development.'
            ],
            reflectiveQuestions: [
                'How does your organization adapt its mentoring approach based on emerging trends and challenges?',
                'What role does feedback from mentees play in refining your mentoring programs?',
                'How prepared is your organization for unexpected leadership changes, based on current succession strategies?'
            ],
            aspiIndication: [
                'Frequently mentoring high-potential employees and guiding them to leadership roles.',
                'Institutionalizing mentorship and succession frameworks.'
            ],
            futureQuestions: [
                'Am I effectively mentoring individuals to step into leadership roles?',
                'Have I helped develop and implement mentorship and succession frameworks within the organization?',
                'In the defined timeframe, can I scale these efforts to further institutionalize this area across multiple levels of the organization?'
            ]
        },
        {
            score: 10,
            indication: [
                'A robust culture of mentorship drives innovation and organizational growth.',
                'Succession planning is viewed as a strategic advantage, with clear metrics for success.',
                'Continuous learning and development are prioritized across all levels of the organization, ensuring readiness for future challenges.'
            ],
            reflectiveQuestions: [
                'What legacy do you want to create through your mentoring and succession efforts?',
                'How does your organization influence industry standards through its approach to leadership development?',
                'In what ways can your organization further enhance its mentoring culture to prepare for future challenges?'
            ],
            aspiIndication: [
                'Fully integrated mentorship and succession systems are part of the organization’s culture, championed by you.'
            ],
            futureQuestions: [
                'Have I built a legacy of mentorship and succession planning that is self-sustaining?',
                'Am I regarded as a key architect of a leadership pipeline in the organization?',
                'Can I ensure that my mentorship and succession planning impact will continue to benefit the organization beyond the defined timeframe?'
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



 
export default Mentorship;