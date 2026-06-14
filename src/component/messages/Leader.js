import { useState } from "react";
import next from '../next-bt.png';
import back from '../previous-bt.png'

const Leader = ({close, msg, submit}) => {
    const [currentIndex, setCurrentIndex] = useState(msg)

    const bands = {
        '1-3': {
            title: 'A 1–3 in Identity Clarity often looks like:',
            bullets: [
                'You mostly describe your job, not who you are.',
                'Your deeper edge feels hard to name.',
                'Your full professional story still feels unclear.'
            ]
        },
        '4-6': {
            title: 'A 4–6 in Identity Clarity often looks like:',
            bullets: [
                'You can explain your experience, but not your deeper pattern.',
                'Your identity still feels tied to titles and roles.',
                'You know you have value, but your edge is still fuzzy.'
            ]
        },
        '7-8': {
            title: 'A 7–8 in Identity Clarity often looks like:',
            bullets: [
                'You know who you are, but some parts are still hard to explain.',
                'Your story is strong, but not fully sharp yet.',
                'Some deeper value may still be sitting in the background.'
            ]
        },
        '9-10': {
            title: 'A 9–10 in Identity Clarity often looks like:',
            bullets: [
                'You know your professional identity very well.',
                'Your deeper value is easy to name.',
                'Your career feels clear and grounded.'
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

export default Leader;
