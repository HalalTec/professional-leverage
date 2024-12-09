import { useState } from "react";

import next from '../next-bt.png';
import back from '../previous-bt.png'

const Personal = ({close, msg, submit, quest}) => {
    const [currentIndex, setCurrentIndex] = useState(msg)

    const categories = [
        {
          score: 1,
          indication: [
            'Rarely or never engage in professional or personal development activities.',
            'No clear growth or learning plan in place.',
            'Unaware of industry or leadership trends.'
          ],
          reflectiveQuestions: [
            'Have I actively pursued learning opportunities in the last 12 months?',
            'Do I reflect on self-improvement?',
            'Am I stagnating in personal and professional growth?'
          ],
          aspiIndication: [
            'No ongoing commitment to personal growth.',
            'No regular activities or plans for learning.',
            'No clear plan for acquiring new skills or knowledge.'
          ],
          futureQuestions: [
                'Have you been actively engaging in any form of personal or professional learning in the last year?',
                'Are you consistently applying any new knowledge or skills to your current role?',
                'Do you feel overwhelmed by the idea of learning or growing professionally?'
            ]
        },
        {
            score: 2,
          indication: [
                    'Beginning to recognize the importance of learning.',
                    'Sporadic attempts to develop skills.',
                    'Limited knowledge of modern leadership or industry practices.'
          ],
          reflectiveQuestions: [
            'Do I understand why personal growth is essential for my career?',
            'Have I sought learning resources recently?',
            'Is my development mostly reactive?',
          ],
          aspiIndication: [
                'Acknowledges the importance of learning but lacks consistency.',
                'Occasionally reads or attends webinars, but without a long-term strategy.',
                'No structured approach to learning or improvement.'
          ],
          futureQuestions: [
                                'Have you started setting any specific goals for personal or professional growth in the past 6 months?',
                                "How often do you take time to reflect on your learning journey and its relevance to your role?",
                                'Do you often get distracted by day-to-day tasks rather than focusing on growth and learning?'
          ]
        },  

        {
            score: 3,
            indication: [
                'Actively exploring growth opportunities, but inconsistent.',
                'Basic understanding of relevant skills.',
                'Learning driven by external prompts (e.g., employer).'
            ],
            reflectiveQuestions: [
                'Have I completed any training or attended events in the last year?',
                'Am I identifying areas for improvement?',
                'Do I take irregular steps toward growth?'
            ],
            aspiIndication: [
                    'Has a desire to grow but lacks a focused approach.',
                    'Occasionally seeks learning opportunities, but there’s no clear roadmap.',
                    'Learning is often passive and sporadic, such as watching videos or reading articles.'
            ],
            futureQuestions: [
                "Do you have any structured goals for your learning or growth, even if they are loosely defined?",
                'Are you tracking your progress or measuring how new knowledge has helped you perform in your role?',
                'How often do you reassess your learning objectives and update them to stay aligned with career goals?'
            ]
        },

        {
            score: 4,
            indication: [
                'Recognizing improvement areas and beginning to address them.',
                'Regular participation in learning activities.',
                'Applying new knowledge inconsistently.'
            ],
            reflectiveQuestions: [
                'Do I dedicate time for self-improvement regularly?',
                'Am I applying what I’ve learned to improve work or mindset?',
                'Do I have clear goals but lack consistency?'
            ],
            aspiIndication: [
                'Some active learning, but often inconsistent and unorganized.',
                'Occasional reading or attending workshops, but lack of follow-through.',
                'Focuses on learning new skills but struggles to apply them in real-time situations.'
            ],
            futureQuestions: [
                "How often do you schedule dedicated time for learning and personal growth?",
                'Do you integrate learning into your daily routine, or is it something you do only when time permits?',
                'Are there areas in which you feel you lack the expertise to take on more leadership responsibility?'

            ]
        },
        {
            score: 5,
            indication: [
                'Regularly engage in development activities.',
                'Established a learning routine (e.g., courses or self-study).',
                'Recognized improvement in skills or understanding.'
            ],
            reflectiveQuestions: [
                'Have I consistently pursued learning opportunities over the past year?',
                'Do I feel equipped for leadership challenges?',
                'Am I seeing results from growth?'
            ],
            aspiIndication: [
                'Regular engagement in learning and personal growth, though still unstructured.',
                'Taking part in professional development programs but not fully utilizing the learnings.',
                'Starting to see some improvement in skills but without a clear integration plan.'                
            ],
            futureQuestions: [
                "Have you defined clear, measurable learning objectives for the next few months?",
                'How do you apply the knowledge you acquire to enhance your leadership capabilities?',
                'In what areas do you feel that learning could significantly enhance your performance or leadership skills in the defined timeframe?'
            ]
        },
        {
            score: 6,
            indication: [
                'Strong commitment to growth through structured plans.',
                'Frequently seek feedback and work on improvements.',
                'Growing confidence in advanced skills or knowledge.'
            ],
            reflectiveQuestions: [
                "Do I have a clear personal growth plan?",
                'Do I regularly review and adapt strategies?',
                'Am I seen as someone who values continuous learning?'
            ],
            aspiIndication: [
                'Has a plan for learning and growth, with some consistent activities.',
                'Regularly attends relevant courses, reads, and reflects on personal development.',
                'Learning activities are generally aligned with career goals but could be more focused.'
            ],
            futureQuestions: [
                'Are you actively seeking mentorship or opportunities to learn from others in your industry?',
                "How often do you evaluate the effectiveness of your learning efforts and adjust strategies accordingly?",
                'Have you begun integrating feedback from peers or mentors to guide your learning path?'
            ]
        },
        {
            score: 7,
            indication: [
                ' Demonstrated ability to acquire and apply new skills.',
                'Stay updated on trends in leadership or industry.',
                'Known as an advocate for learning among peers.'
            ],
            reflectiveQuestions: [
                'Am I recognized for dedication to self-improvement?',
                'Do I actively mentor or share knowledge?',
                'Are my growth efforts aligned with trends and leadership?'
            ],
            aspiIndication: [
                    'Consistent learning with a clear roadmap, but not yet fully integrated into all areas of life.',
                    'Actively seeking mentors and experts, but still in the process of applying new skills effectively.',
                    'Starts to integrate learning with strategic goals but has room for more alignment.'
            ],
            futureQuestions: [
                'How committed are you to pushing your boundaries and consistently seeking knowledge that challenges your current abilities?',
                'How do you ensure you are learning in areas that directly impact your leadership potential?',
                'Have you built a personal development plan that is updated regularly to track and refine your growth?'
            ]
        }, {
            score: 8,
            indication: [
                'Actively mentor others and encourage growth in the organization.',
                'Sought after for expertise.',
                'Demonstrated mastery in key areas through learning.'
            ],
            reflectiveQuestions: [
                'Do I inspire others to prioritize personal growth?',
                'Am I a go-to resource for knowledge?',
                'Do I confidently adapt and grow in any circumstance?'
            ],
            aspiIndication: [
                'Strong focus on continuous learning, with clear goals and action plans.',
                'Actively integrates new knowledge into decision-making and leadership activities.',
                'Frequently assesses personal growth areas and takes deliberate actions.'
            ],
            futureQuestions: [
                'Are you regularly attending leadership-focused development programs, and actively applying your learnings in your role?',
                'How do you balance ongoing personal development with the practical demands of your current role?',
                'Are you seeing measurable improvements in your leadership performance due to your personal learning efforts?'
            ]
        },
        {
            score: 9,
            indication: [
                'Leading initiatives to foster learning within teams or organizations.',
                'Recognized as a pioneer in development practices.',
                'Significant impact through growth.'
            ],
            reflectiveQuestions: [
                'Am I seen as a leader in growth?',
                'Have I initiated impactful programs for others’ development?',
                'Do my learning practices set benchmarks in my industry?'
            ],
            aspiIndication: [
                'Mastering the application of personal growth strategies.',
                'Taking leadership in learning initiatives and guiding others in their personal growth journey.',
                'Continually pushing the envelope, seeking innovative approaches to learning and leadership.'
            ],
            futureQuestions: [
                'Do you feel confident in your ability to lead and innovate, using a wide range of skills and knowledge acquired through learning?',
                'How often do you take initiative in your organization or community to lead learning initiatives, such as workshops or training sessions?',
                "How do you identify emerging trends in your industry and ensure you're learning to stay ahead of these changes?"
            ]
        },
        {
            score: 10,
            indication: [
                'Global recognition for contributions to growth.',
                'Influence extends to shaping industry standards.',
                'Lifelong learning seamlessly integrated into all aspects.'
            ],
            reflectiveQuestions: [
                'Have I built a legacy around growth and learning?',
                'Do my efforts shape industry approaches to learning?',
                'Is my learning transformative or revolutionary?'
            ],
            aspiIndication: [
                'Fully committed to learning and personal growth as a lifelong pursuit.',
                'Exemplifies mastery of personal growth practices, serving as a role model to others.',
                'Consistently sets the standard for leadership and continuous learning within the organization.'
            ],
            futureQuestions: [
                'Do you see yourself as a thought leader in your field, constantly contributing new knowledge and insights to others?',
                'How do you continuously reinvent yourself to ensure you stay on the cutting edge of your field and leadership capabilities?',
                'Are you actively mentoring and guiding others on their growth journeys, shaping the future of your organization and community?'
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



 
export default Personal;