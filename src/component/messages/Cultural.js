import { useState } from "react";
import next from '../next-bt.png';
import back from '../previous-bt.png'

const Cultural = ({close, msg, submit}) => {
    const [currentIndex, setCurrentIndex] = useState(msg)

    const bands = {
        '1-3': {
            title: 'A 1–3 in Leverage Utilization often looks like:',
            bullets: [
                'A lot of your energy may be going into low-return work.',
                'Your strongest assets may not be fully used.',
                'You may be working hard without enough return.'
            ]
        },
        '4-6': {
            title: 'A 4–6 in Leverage Utilization often looks like:',
            bullets: [
                'Some of your strengths are working well, but not all.',
                'There may be more upside than your current setup is capturing.',
                'Your effort may not be aimed at your highest-return work yet.'
            ]
        },
        '7-8': {
            title: 'A 7–8 in Leverage Utilization often looks like:',
            bullets: [
                'Your leverage is strong, but not fully stretched.',
                'You are using your strengths well, but there may still be more in them.',
                'There may still be room to raise your return.'
            ]
        },
        '9-10': {
            title: 'A 9–10 in Leverage Utilization often looks like:',
            bullets: [
                'Your strongest assets are being used in smart ways.',
                'Your effort feels well placed.',
                'Your experience is likely compounding well.'
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

export default Cultural;
