import {  useState } from "react";
import Career from "./Career";
import Result from "./Result";
import Carousel from "./Carousel";
import Message from "./Message";

const Test = () => {
    const [counter, setCounter] = useState(1);
    const [style, setSty] = useState({backgroundColor: "#ED6A56"})
    const [p, setP] = useState("Identity Clarity")
    const [career, setCareer] = useState([])
    const [health, setHealth] = useState([])
    const [money, setMoney] = useState([])
    const [per, setPer] = useState([])
    const [rel, setRel] = useState([])
    const [fun, setFun] = useState([])
    const [physical, setPhysical] = useState([])
    const [spirit, setSpirit] = useState([])
    const [item, setItem] = useState([
        "You mostly describe your job, not who you are.",
        "You can explain your experience, but not your deeper pattern.",
        "You know who you are, but some parts are still hard to explain.",
        "You know your professional identity very well."
    ])
    const tip = ["Scores 1-3", "Scores 4-6", "Scores 7-8", "Scores 9-10"]
    const [message, setMessage] = useState(false)
    const [msg, setMsg] = useState(0)

    const confirm = (e) => {
        setMsg(e.target.textContent)
        setMessage(true)
    }

    const submit = (e) => {
        e.preventDefault();
        let ans = e.target.textContent;
        setCounter(counter + 1);

        if (counter === 1) {
            setCareer([...career, ans]);
            setSty({ backgroundColor: "#F09B36" });
            setP("Value Articulation");
            setItem([
                "It is hard to explain what you really bring.",
                "You can explain your value, but it takes time.",
                "Your value is mostly clear.",
                "People quickly understand your value."
            ]);
        }
        if (counter === 2) {
            setMoney([...money, ans]);
            setSty({ backgroundColor: "#FFC74E" });
            setP("Evidence Visibility");
            setItem([
                "Your wins feel buried.",
                "You have proof, but some of it is scattered.",
                "Your proof is strong.",
                "Your proof is easy to find."
            ]);
        }
        if (counter === 3) {
            setHealth([...health, ans]);
            setSty({ backgroundColor: "#A0B470" });
            setP("Signature Strength Recognition");
            setItem([
                "You may not know your strongest repeat strengths.",
                "You know some strengths, but not the full pattern.",
                "Your strengths are mostly clear.",
                "You know your strongest abilities well."
            ]);
        }
        if (counter === 4) {
            setRel([...rel, ans]);
            setSty({ backgroundColor: "#6E9E75" });
            setP("Trust Pattern Awareness");
            setItem([
                "You may not notice your trust patterns.",
                "You see some trust patterns, but not all.",
                "You can see what people trust you with.",
                "You clearly know what people trust you with."
            ]);
        }
        if (counter === 5) {
            setPer((prev) => [...prev, ans]);
            setSty({ backgroundColor: "#73CCE4" });
            setP("Positioning Strength");
            setItem([
                "Your outside image may feel smaller than your real value.",
                "Some of your value is visible, but not all of it.",
                "Your positioning is strong, but not complete.",
                "Your outside image matches your real value well."
            ]);
        }
        if (counter === 6) {
            setFun((prev) => [...prev, ans]);
            setSty({ backgroundColor: "#869ACF" });
            setP("Next-Move Clarity");
            setItem([
                "Your next move feels foggy or stuck.",
                "You have good options, but no clear best one.",
                "Your direction is mostly clear.",
                "Your next move feels clear and grounded."
            ]);
        }
        if (counter === 7) {
            setPhysical((prev) => [...prev, ans]);
            setSty({ backgroundColor: "#895881" });
            setP("Leverage Utilization");
            setItem([
                "A lot of your energy may be going into low-return work.",
                "Some of your strengths are working well, but not all.",
                "Your leverage is strong, but not fully stretched.",
                "Your strongest assets are being used in smart ways."
            ]);
        }
        if (counter === 8) {
            setSpirit((prev) => [...prev, ans]);
        }

        close();
    }

    const close = () => {
        setMessage(false)
    }

    return (
        <div>
            {counter <= 8 && (<header style={style}> {p} </header>)}
            <div className="section">
                {counter === 1 && (
                    <Career
                        question="Can you clearly define who you are professionally beyond your title?"
                        clarifier="Most professionals can explain what they've done. Far fewer can explain the deeper pattern underneath it."
                    />
                )}
                {counter === 2 && (
                    <Career
                        question="Can you clearly explain the value you create?"
                        clarifier="If your value takes too long to understand, it often gets underestimated."
                    />
                )}
                {counter === 3 && (
                    <Career
                        question="Have you properly extracted the proof of your value from your career?"
                        clarifier="Wins, trust, and outcomes are not just memories. They are evidence."
                    />
                )}
                {counter === 4 && (
                    <Career
                        question="Do you know the strengths that drive your best results?"
                        clarifier="The abilities that create your best results often feel normal to you."
                    />
                )}
                {counter === 5 && (
                    <Career
                        question="Do you understand what people repeatedly trust you with?"
                        clarifier="Repeated trust is rarely random."
                    />
                )}
                {counter === 6 && (
                    <Career
                        question="Does the way you present yourself reflect the full depth of what you've built?"
                        clarifier="Many strong professionals carry far more value than their current positioning shows."
                    />
                )}
                {counter === 7 && (
                    <Career
                        question="Do you know what your strongest next move should be?"
                        clarifier="More experience often creates more options. Not always more clarity."
                    />
                )}
                {counter === 8 && (
                    <Career
                        question="Are your strongest assets being used where they create the highest return?"
                        clarifier="Being busy is not the same as being leveraged."
                    />
                )}

                {message === true && (<Message msg={msg - 1} close={close} p={p} submit={submit} quest={0} />)}

                {counter <= 8 && (
                    <>
                        <Carousel items={item} tips={tip} />
                        <ol>
                            <span onClick={confirm}> 1 </span>
                            <span onClick={confirm}>2</span>
                            <span onClick={confirm}>3</span>
                            <span onClick={confirm}>4</span>
                            <span onClick={confirm}>5</span>
                            <span onClick={confirm}>6</span>
                            <span onClick={confirm}>7</span>
                            <span onClick={confirm}> 8</span>
                            <span onClick={confirm}>9</span>
                            <span onClick={confirm}>10</span>
                        </ol>
                    </>
                )}
            </div>
            {counter <= 8 && (
                <footer style={style} className="foot"> </footer>
            )}
            {counter > 8 && (
                <Result
                    career={career}
                    money={money}
                    per={per}
                    rel={rel}
                    fun={fun}
                    physical={physical}
                    spirit={spirit}
                    health={health}
                />
            )}
        </div>
    )
}

export default Test;
