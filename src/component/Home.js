import React, {useRef} from 'react'
import { Link } from 'react-router-dom';
import img from './Capture.PNG'

const Home = () => {

    const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
    const access = () => {
        window.location.href = '/wheel';
    }
    return (
        <>
        <div className="super-container">
            <div className='Header'>
            <h1><b>Kaizen C-Suit Wheel </b></h1>
            <hr></hr>
            </div>
                <div className="main-upper">
                    <div className="sect-1">
                        <img src={img} alt="wheel" srcset="" />
                    </div>
                    <div className="sect2">
                        <p className='sub-title'>The Wheel of Life is a quick and effective tool that gives you a visual snapshot of various areas of your life, helping you identify where you need the most improvement. 
                            It's free and takes just a minute to complete!</p>
                    <div className="min">
                        <button onClick={access}>Take The Accessment</button>
                    </div>
                    </div>
                </div>
                <hr/>
                <div style={{marginBottom:"40px"}} className='sect3'>
                <p>Do you wish to understand the concept of Wheel of Life before taking the test? </p>
                <p>There are 4 essential aspects that you should learn: </p>
                <div className='aspects' style={{marginBottom:"40px"}}>
                    <ol>
                        <li> <Link> How do I use the Wheel of Life? </Link></li>
                        <li> <Link>The Concept of Wheel of Life</Link></li>
                        <li><Link>How It Works</Link></li>
                        <li><Link>Purpose and Benefits </Link></li>
                        <li><Link>Aligning Your Wheel, Living Your Best Life </Link></li>
                    </ol>
                </div>
                                <h3>How do I use the Wheel of Life? </h3>
                            <div style={{marginBottom:"40px"}} className="steps">
                            <p>Step 1:  Click the "Take Assessment" button to start </p>
                            <p>Step 2:  Select an answer for the 10 questions presented to you </p>
                            <p>Step 3: Once completed, you see your results </p>
                            <p>Step 4: Download the guiding PDF </p>
                            </div>
                            
                            <div className='concept' style={{marginBottom:"40px"}}>
                          <h3>  The Concept of Wheel of Life </h3> 
              <p> The Wheel of Life is a simple yet profound metaphor illustrating how different areas of life need to be in alignment for you to move forward smoothly. </p>

<p> Much like how a wheel needs all its spokes to be even for it to roll without bumps, every aspect of life—career, health, relationships, finances, personal growth, and more—needs attention and nurturing to create a balanced, fulfilling existence. </p>

<p>When one area is neglected or underdeveloped, the “wheel” becomes uneven, causing life to feel stuck, frustrating, or off-track. This tool highlights the importance of achieving balance, where each area is attended to in a way that promotes continuous forward movement. </p>
                            </div>
    
                <div className="how" style={{marginBottom:"40px"}}>
               <h3> How It Works</h3>
<p> The Wheel is typically a circle divided into segments representing different areas of life. </p>

<p>Individuals rate each segment on a scale from 1 to 10, with 1 representing dissatisfaction and 10 representing peak fulfillment. </p>

<p>Once the ratings are plotted on the wheel, the result is a web-like pattern that provides a clear overview of balanced or imbalanced areas.</p>
                </div>

            <div className="purpose" style={{marginBottom:"40px"}}>
           <h3> Purpose and Benefits </h3>
<li>  Holistic View: It helps individuals see which parts of their life are thriving and which need improvement. </li>
<li>  Identify Imbalances: Gaps in the wheel point to areas requiring more focus to achieve a sense of balance. </li>
<li>  Prioritize Action: Once weak areas are identified, users can create goals to bring those areas closer to satisfaction. </li>
<li>  Visual Motivation: Seeing progress visually encourages further effort and highlights successes. </li>
            </div>

            <div className="align" style={{marginBottom:"40px"}} ref={scrollRef}>
           <h3> Aligning Your Wheel, Living Your Best Life </h3>
<p>The concept of the Wheel of Life underscores that balance isn't static; it requires ongoing attention and adjustments. Life is dynamic, and priorities will shift over time. </p>

<p>By regularly auditing your wheel, you can prevent burnout, foster sustainable growth, and keep rolling toward fulfillment and success without constantly hitting roadblocks. </p>

<p>Remember, when every part of the wheel is aligned, life flows with less resistance—making the journey smoother, more enjoyable, and ultimately more successful </p>
            </div>
                </div>
                
                
                <footer>	Made with ❤️ from Ibrahim Kaizen Coaching <a href="https://www.nextlevel10X.pro">Unleash your next level</a></footer>
                </div>
        </>
    );
};
export default Home;