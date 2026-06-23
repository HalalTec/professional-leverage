import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock3, Info } from "lucide-react";
import Career from "./Career";
import ResultCard from "./ResultCard";
import Header from "./Header";
import FinalStepForm from "./form";
import { encodeResultPayload } from "../utils/resultPayload";

const Test = () => {
    const navigate = useNavigate();
    const [counter, setCounter] = useState(1);
    const [p, setP] = useState("Identity Clarity")
    const [career, setCareer] = useState([])
    const [health, setHealth] = useState([])
    const [money, setMoney] = useState([])
    const [per, setPer] = useState([])
    const [rel, setRel] = useState([])
    const [fun, setFun] = useState([])
    const [physical, setPhysical] = useState([])
    const [spirit, setSpirit] = useState([])
    const [message, setMessage] = useState(false)
    const [msg, setMsg] = useState(0)
    const [formCompleted, setFormCompleted] = useState(false)
    const [phase, setPhase] = useState("questions")
    const [generationError, setGenerationError] = useState(null)
    const [preparedResultUrl, setPreparedResultUrl] = useState("")
    const [finalScores, setFinalScores] = useState(null)

    const generateResult = async (scores) => {
        setPhase("generating");
        setGenerationError(null);
        try {
            const response = await fetch("/api/interpret", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ scores }) });
            const contentType = response.headers.get("content-type") || "";
            const data = contentType.includes("application/json") ? await response.json() : null;
            if (!response.ok || !data || data.error) throw new Error(data?.error || "The result could not be generated.");
            const payload = encodeResultPayload({ scores, interpretation: data });
            setPreparedResultUrl("/email#r=" + payload);
            setPhase("form");
        } catch (error) {
            console.error("Result generation error:", error);
            setGenerationError(error.message === "The generated result is too large for a safe URL." ? error.message : "We couldn't calculate your result. Please try again.");
            setPhase("error");
        }
    };

    const confirm = (e) => {
        setMsg(Number(e.currentTarget.textContent))
        setMessage(true)
    }

    const submit = (ans) => {
        setCounter(counter + 1);

        if (counter === 1) {
            setCareer([...career, ans]);
            setP("Value Articulation");

        }
        if (counter === 2) {
            setMoney([...money, ans]);
            setP("Evidence Visibility");

        }
        if (counter === 3) {
            setHealth([...health, ans]);
            setP("Signature Strength Recognition");

        }
        if (counter === 4) {
            setRel([...rel, ans]);
            setP("Trust Pattern Awareness");

        }
        if (counter === 5) {
            setPer((prev) => [...prev, ans]);
            setP("Positioning Strength");

        }
        if (counter === 6) {
            setFun((prev) => [...prev, ans]);
            setP("Next-Move Clarity");

        }
        if (counter === 7) {
            setPhysical((prev) => [...prev, ans]);
            setP("Leverage Utilization");

        }
        if (counter === 8) {
            setSpirit((prev) => [...prev, ans]);
            const scores = {
                identity_clarity: career[0], value_articulation: money[0],
                evidence_visibility: health[0], signature_strength_recognition: rel[0],
                trust_pattern_awareness: per[0], positioning_strength: fun[0],
                next_move_clarity: physical[0], leverage_utilization: ans,
            };
            setFinalScores(scores);
            generateResult(scores);
        }

        close();
    }

    const close = () => 
        setMessage(false)


    return (
        <div className="diagnostic-page min-h-screen bg-[#0A0A0A] text-white">

            <Header />
            {phase === "questions" && counter <= 8 && (
                <main className="px-6 py-10">
                    <div className="max-w-6xl mx-auto border border-[#1f2937] rounded-2xl bg-[#050C17] px-8 md:px-20 py-16">

                        {/* Progress */}
                        <div className="max-w-3xl mx-auto">
                            <div className="text-center text-[#D4A24A] text-xl mb-4">
                                Question {counter} of 8
                            </div>
                            <div className="h-2 bg-[#1f2937] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#D4A24A] transition-all duration-500"
                                    style={{ width: `${((counter - 1) / 8) * 100}%` }}
                                />
                            </div>
                            <div className="flex justify-center items-center gap-2 text-gray-400 mt-6">
                                <Clock3 size={18} />
                                <span>Takes ~5 minutes</span>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="text-center mt-16">
                            <span className="uppercase tracking-[0.25em] text-[#D4A24A] text-sm font-semibold">
                                {p}
                            </span>
                        </div>

                        {/* Question */}
                        <div className="max-w-4xl mx-auto text-center mt-6">
                            {counter === 1 && <Career question="Can you clearly define who you are professionally beyond your title?" clarifier="Most professionals can explain what they've done. Far fewer can explain the deeper pattern underneath it." />}
                            {counter === 2 && <Career question="Can you clearly explain the value you create?" clarifier="If your value takes too long to understand, it often gets underestimated." />}
                            {counter === 3 && <Career question="Have you properly extracted the proof of your value from your career?" clarifier="Wins, trust, and outcomes are not just memories. They are evidence." />}
                            {counter === 4 && <Career question="Do you know the strengths that drive your best results?" clarifier="The abilities that create your best results often feel normal to you." />}
                            {counter === 5 && <Career question="Do you understand what people repeatedly trust you with?" clarifier="Repeated trust is rarely random." />}
                            {counter === 6 && <Career question="Does the way you present yourself reflect the full depth of what you've built?" clarifier="Many strong professionals carry far more value than their current positioning shows." />}
                            {counter === 7 && <Career question="Do you know what your strongest next move should be?" clarifier="More experience often creates more options. Not always more clarity." />}
                            {counter === 8 && <Career question="Are your strongest assets being used where they create the highest return?" clarifier="Being busy is not the same as being leveraged." />}
                        </div>

                        {/* Note */}
                        <div className="flex justify-center mt-10">
                            <div className="flex items-center gap-2 text-gray-500">
                                <Info size={16} />
                                <span>There are no right answers. Go with what feels most true right now.</span>
                            </div>
                        </div>

                        {/* Score grid */}
                        <div className="max-w-5xl mx-auto mt-14">
                            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                                    <button
                                        key={n}
                                        onClick={confirm}
                                        className={`!h-14 !w-full !flex !items-center !justify-center !rounded-xl !border-2 !border-[#D4A24A] !text-xl !font-semibold !cursor-pointer !transition-all !duration-200 hover:!bg-[#D4A24A] hover:!text-black ${message && msg === n ? "!bg-[#D4A24A] !text-black" : "!bg-transparent !text-[#D4A24A]"}`}
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>
                            <div className="flex justify-between mt-5 text-gray-400 text-xl">
                                <span>Strong No</span>
                                <span>Strong Yes</span>
                            </div>


                            {message && (
                                <ResultCard
                                    category={p}
                                    score={msg}
                                    onAdjust={close}
                                    onConfirm={() => submit(msg)}
                                />
                            )}
                        </div>

                    </div>
                </main>
            )}

            {phase === "generating" && (
                <main className="flex min-h-[70vh] items-center justify-center px-6">
                    <div className="text-center">
                        <div className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-2 border-[#D9A44A] border-t-transparent" />
                        <p className="text-sm uppercase tracking-widest text-[#D9A44A]">Your result is being calculated</p>
                    </div>
                </main>
            )}

            {phase === "error" && (
                <main className="flex min-h-[70vh] items-center justify-center px-6">
                    <div className="max-w-lg text-center">
                        <p className="mb-6 text-red-400">{generationError}</p>
                        <button type="button" onClick={() => finalScores && generateResult(finalScores)} className="!rounded-lg !bg-[#D4A24A] !px-6 !py-3 !font-semibold !text-black">Try again</button>
                    </div>
                </main>
            )}

            {/* Final details form */}
            {phase === "form" && !formCompleted && (
                <main className="px-4 py-10 md:px-6">
                    <div className="max-w-6xl mx-auto">
                        <FinalStepForm
                            resultUrl={preparedResultUrl}
                            onComplete={() => { setFormCompleted(true); navigate(preparedResultUrl); }}
                        />
                    </div>
                </main>
            )}

        </div>
    )
}

export default Test;
