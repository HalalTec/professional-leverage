import { useState } from "react";
import next from '../next-bt.png';
import back from '../previous-bt.png'

const Innovation = ({close, msg, submit}) => {
    const [currentIndex, setCurrentIndex] = useState(msg)

    const bands = {
        '1-3': {
            title: 'A 1–3 in Trust Pattern Awareness often looks like:',
            bullets: [
                'You may not notice your trust patterns.',
                'The same problems may keep coming to you.',
                'You may not yet see what that means.'
            ]
        },
        '4-6': {
            title: 'A 4–6 in Trust Pattern Awareness often looks like:',
            bullets: [
                'You see some trust patterns, but not all.',
                'People rely on you in ways you may not fully notice.',
                'The pattern is there, but still blurry.'
            ]
        },
        '7-8': {
            title: 'A 7–8 in Trust Pattern Awareness often looks like:',
            bullets: [
                'You can see what people trust you with.',
                'The pattern is mostly clear.',
                'There may still be deeper meaning inside it.'
            ]
        },
        '9-10': {
            title: 'A 9–10 in Trust Pattern Awareness often looks like:',
            bullets: [
                'You clearly know what people trust you with.',
                'The trust pattern is easy to spot.',
                'You can clearly see where your value is strongest.'
            ]
        }
    };

    const getBand = (index) => {
        if (index <= 2) return bands['1-3'];
        if (index <= 5) return bands['4-6'];
        if (index <= 7) return bands['7-8'];
        return bands['9-10'];
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 10);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + 10) % 10);
    };

    const band = getBand(currentIndex);

    return (
        <div className="message">
            <div className="card">
                <div className="confirm">
                    <h2>Confirm Your Selection of: {currentIndex + 1}</h2>
                    <button onClick={close} style={{color:"red"}} className="close">X</button>
                </div>
                <h5 style={{color:"red"}}>Go through the description below and confirm your selection, or use the page controls to make changes</h5>
                <h3>{band.title}</h3>
                <ul style={{textAlign:"left"}}>
                    {band.bullets.map((bullet, idx) => (
                        <li key={idx} style={{listStyle:"disc"}}>{bullet}</li>
                    ))}
                </ul>
                <div className="ref-button">
                    <button onClick={prevSlide} className="prev" style={{marginTop:"0px"}}><img src={back} /></button>
                    <button id="myButton" onClick={submit}>{currentIndex + 1}</button>
                    <label htmlFor="myButton" className="select">Confirm {currentIndex + 1}</label>
                    <button onClick={nextSlide} className="prev" style={{marginTop:"0px"}}><img src={next} /></button>
                </div>
            </div>
        </div>
    );
}

export default Innovation;
