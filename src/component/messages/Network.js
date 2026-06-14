import { useState } from "react";
import next from '../next-bt.png';
import back from '../previous-bt.png'

const Network = ({close, msg, submit}) => {
    const [currentIndex, setCurrentIndex] = useState(msg)

    const bands = {
        '1-3': {
            title: 'A 1–3 in Positioning Strength often looks like:',
            bullets: [
                'Your outside image may feel smaller than your real value.',
                'People may not quickly see the depth you bring.',
                'Your positioning may be holding your career back.'
            ]
        },
        '4-6': {
            title: 'A 4–6 in Positioning Strength often looks like:',
            bullets: [
                'Some of your value is visible, but not all of it.',
                'Important parts of your story may still be missing.',
                'You may not fully sound like the level you\'ve reached.'
            ]
        },
        '7-8': {
            title: 'A 7–8 in Positioning Strength often looks like:',
            bullets: [
                'Your positioning is strong, but not complete.',
                'People can see your value, but maybe not your full depth.',
                'There may still be stronger ways to frame what you do.'
            ]
        },
        '9-10': {
            title: 'A 9–10 in Positioning Strength often looks like:',
            bullets: [
                'Your outside image matches your real value well.',
                'People quickly understand your depth.',
                'Your positioning feels strong, clear, and credible.'
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
                    <button onClick={prevSlide} className="prev" style={{marginTop:"0px"}}><img src={back} alt="Previous" /></button>
                    <button id="myButton" onClick={submit}>{currentIndex + 1}</button>
                    <label htmlFor="myButton" className="select">Confirm {currentIndex + 1}</label>
                    <button onClick={nextSlide} className="prev" style={{marginTop:"0px"}}><img src={next} alt="Next" /></button>
                </div>
            </div>
        </div>
    );
}

export default Network;
