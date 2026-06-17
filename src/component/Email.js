import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pako from 'pako';
import { Buffer } from 'buffer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from '@amcharts/amcharts5/radar';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import Embed from './Embed';

const CATEGORY_KEY_MAP = {
    'Identity Clarity':               'identity_clarity',
    'Value Articulation':             'value_articulation',
    'Evidence Visibility':            'evidence_visibility',
    'Signature Strength Recognition': 'signature_strength_recognition',
    'Trust Pattern Awareness':        'trust_pattern_awareness',
    'Positioning Strength':           'positioning_strength',
    'Next-Move Clarity':              'next_move_clarity',
    'Leverage Utilization':           'leverage_utilization',
};

const REFLECTION_QUESTIONS = [
    "How do you feel as you look at your results?",
    "Are there any surprises for you?",
    "How do you currently spend time in these areas?",
    "How would you like to spend time in these areas?",
    "What might you be avoiding looking at here?",
    "For each one, what would make that score a 10/10?",
    "What would definitely increase your score — even if it was really hard to do?",
    "Describe what a score of 10 would look like in those areas.",
    "Which of these categories would you most like to improve?",
    "How could you make space for these changes in your life?",
    "What help and support might you need from others?",
    "What is the smallest step you could take to get started?",
    "What will you do today or in the next 24 hours?",
    "If there was one key action that would begin to bring everything into balance, what would it be?",
    "What if time, money and energy were not an issue? What could you do in each area?",
];

const ScoreBar = ({ label, value, percent }) => (
    <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300 text-sm">{label}</span>
            <span className="text-[#D9A44A] font-semibold">{percent.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-[#111827] rounded-full h-2">
            <div
                className="bg-[#D9A44A] h-2 rounded-full transition-all"
                style={{ width: `${Math.min(percent, 100)}%` }}
            />
        </div>
    </div>
);

const Email = () => {
    const [eBook, seteBook] = useState(false)
    const [hide, setHide] = useState(false)
    const [interpretation, setInterpretation] = useState(null)
    const [loadingInterp, setLoadingInterp] = useState(false)
    const [interpError, setInterpError] = useState(null)

    const navigate = useNavigate();

    const decodeCategoriesFromUrl = (url) => {
        try {
            const urlParams = new URL(url).searchParams;
            const base64EncodedPayload = urlParams.get('payload');
            if (!base64EncodedPayload) throw new Error('Payload not found.');
            const compressedData = Buffer.from(base64EncodedPayload, 'base64');
            const decompressed = pako.inflate(compressedData, { to: 'string' });
            return JSON.parse(decompressed);
        } catch (error) {
            console.error('Error decoding the URL payload:', error);
            navigate('/');
        }
    };

    const decodedCategories = decodeCategoriesFromUrl(window.location.href);

    function calculateMean(values) {
        return values.reduce((acc, v) => acc + v, 0) / values.length;
    }

    function calculateStandardDeviation(values) {
        const mean = calculateMean(values);
        const variance = values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / values.length;
        return Math.sqrt(variance);
    }

    function roundUpToDecimal(number, decimalPlaces) {
        const factor = Math.pow(10, decimalPlaces);
        return Math.ceil(number * factor) / factor;
    }

    const startingValues = decodedCategories.map(c => parseInt(c.values[0]));
    const meanAvg = calculateMean(startingValues);
    const Standard = calculateStandardDeviation(startingValues);
    const mean = roundUpToDecimal(meanAvg, 2);
    const mean_percent = (mean / 10) * 100;
    const SD = roundUpToDecimal(Standard, 2);
    const balance = roundUpToDecimal(((1 - (SD / mean)) * 100), 1);
    const overallScore = ((mean_percent + balance) / 2).toFixed(1);

    useEffect(() => {
        const scores = {};
        decodedCategories.forEach(category => {
            const key = CATEGORY_KEY_MAP[category.name];
            if (key) scores[key] = parseInt(category.values[0], 10);
        });

        setLoadingInterp(true);
        fetch('/api/interpret', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ scores }),
        })
            .then(async res => {
                const contentType = res.headers.get('content-type') || '';
                const data = contentType.includes('application/json') ? await res.json() : null;
                if (!res.ok) throw new Error(data?.error || `API returned ${res.status}`);
                if (!data) throw new Error('API did not return JSON');
                return data;
            })
            .then(data => {
                if (data.error) throw new Error(data.error);
                setInterpretation(data);
            })
            .catch(err => {
                console.error('Interpretation error:', err);
                setInterpError('Could not load your interpretation. Please try again later.');
            })
            .finally(() => setLoadingInterp(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const root = am5.Root.new('chartdiv');
        root.setThemes([am5themes_Animated.new(root)]);

        const chart = root.container.children.push(
            am5radar.RadarChart.new(root, { panX: false, panY: false, wheelX: 'panX', wheelY: 'zoomX' })
        );

        const xRenderer = am5radar.AxisRendererCircular.new(root, {});
        xRenderer.labels.template.setAll({ radius: 10 });

        const xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                maxDeviation: 0,
                categoryField: 'category',
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(root, {}),
            })
        );

        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                min: 0,
                max: 10,
                renderer: am5radar.AxisRendererRadial.new(root, { minGridDistance: 20 }),
            })
        );

        yAxis.get('renderer').labels.template.set('forceHidden', true);

        const currentSeries = chart.series.push(
            am5radar.RadarColumnSeries.new(root, {
                xAxis,
                yAxis,
                valueYField: 'currentValue',
                categoryXField: 'category',
            })
        );

        currentSeries.columns.template.setAll({
            tooltipText: 'Domain {category}',
            templateField: 'columnSettings',
            strokeOpacity: 0,
            width: am5.p100,
        });

        const data = decodedCategories.map((category, index) => ({
            category: index + 1,
            currentValue: category.values[0],
            columnSettings: { fill: chart.get('colors').next() }
        }));

        currentSeries.data.setAll(data);
        xAxis.data.setAll(data);
        currentSeries.appear(1000);
        chart.appear(1000, 100);

        return () => { root.dispose(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const save = () => {
        const input = document.getElementById('res');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 190;
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            pdf.save('professional-leverage-results.pdf');
        });
    };

    const display = () => { seteBook(true); setHide(true); };
    const hidden  = () => { seteBook(false); setHide(false); };

    return (
        <div className="diagnostic-page min-h-screen bg-[#070d16] text-white" id="res">

            {/* Header */}
            <div className="border-b border-[#D9A44A]/10">
                <div className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center">
                    <p className="text-[#D9A44A] uppercase tracking-widest text-xs">
                        Professional Leverage Diagnostic
                    </p>
                    <button
                        onClick={save}
                        className="text-xs text-gray-400 border border-gray-700 rounded px-4 py-2 hover:border-[#D9A44A] hover:text-[#D9A44A] transition"
                    >
                        Download PDF
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-14">

                {/* Page title */}
                <div className="mb-14 text-center">
                    <h1 className="text-5xl lg:text-6xl font-serif mb-4">Your Results</h1>
                    <p className="text-gray-400">Here is a read on where your professional leverage currently sits.</p>
                </div>

                {/* Score summary bars */}
                <div className="grid md:grid-cols-2 gap-8 mb-14">
                    <div className="border border-[#D9A44A]/20 rounded-xl bg-[#0b1220] p-8">
                        <ScoreBar
                            label="Overall Professional Leverage Score"
                            value={overallScore}
                            percent={parseFloat(overallScore)}
                        />
                        <ScoreBar
                            label="Balance Across Domains"
                            value={balance}
                            percent={parseFloat(balance)}
                        />
                    </div>

                    {/* Domain scores */}
                    <div className="border border-[#D9A44A]/20 rounded-xl bg-[#0b1220] p-8">
                        <p className="text-[#D9A44A] uppercase tracking-widest text-xs mb-6">Domain Scores</p>
                        <div className="space-y-3">
                            {decodedCategories.map((cat, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <span className="text-gray-400 text-sm">{cat.name}</span>
                                    <span className="text-white font-semibold text-sm w-6 text-right">
                                        {cat.values[0]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Radar chart */}
                <div className="border border-[#D9A44A]/20 rounded-xl bg-white p-4 mb-14 flex justify-center">
                    <div id="chartdiv" style={{ width: '100%', maxWidth: '500px', height: '500px' }} />
                </div>

                {/* AI Interpretation */}
                {loadingInterp && (
                    <div className="text-center py-12 mb-14">
                        <div className="w-8 h-8 border-2 border-[#D9A44A] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-gray-500 italic text-sm">Generating your professional leverage interpretation…</p>
                    </div>
                )}

                {interpError && (
                    <div className="border border-red-800 bg-red-900/20 rounded-xl p-6 mb-14 text-center">
                        <p className="text-red-400 text-sm">{interpError}</p>
                    </div>
                )}

                {interpretation && (
                    <div className="mb-14">
                        <h2 className="text-3xl font-serif text-center mb-10">
                            Your Professional Leverage Pattern
                        </h2>

                        <div className="space-y-6">

                            {/* Pattern */}
                            <div className="border border-[#D9A44A]/20 rounded-xl bg-[#0b1220] p-8">
                                <p className="text-[#D9A44A] uppercase tracking-widest text-xs mb-3">
                                    {interpretation.your_pattern.title}
                                </p>
                                <p className="text-2xl font-serif">{interpretation.your_pattern.value}</p>
                            </div>

                            {/* What this pattern suggests */}
                            <div className="border border-[#D9A44A]/20 rounded-xl bg-[#0b1220] p-8">
                                <p className="text-[#D9A44A] uppercase tracking-widest text-xs mb-4">
                                    {interpretation.what_this_pattern_suggests.title}
                                </p>
                                {interpretation.what_this_pattern_suggests.short.map((s, i) => (
                                    <p key={i} className="text-gray-300 mb-2">{s}</p>
                                ))}
                                <ul className="mt-4 space-y-2">
                                    {interpretation.what_this_pattern_suggests.expanded.map((s, i) => (
                                        <li key={i} className="text-gray-400 text-sm flex gap-3">
                                            <span className="text-[#D9A44A] flex-shrink-0">◈</span>
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Quiet cost */}
                            <div className="border border-[#D9A44A]/20 rounded-xl bg-[#0b1220] p-8">
                                <p className="text-[#D9A44A] uppercase tracking-widest text-xs mb-4">
                                    {interpretation.what_may_be_quietly_costing_you.title}
                                </p>
                                <ul className="space-y-2">
                                    {interpretation.what_may_be_quietly_costing_you.points.map((p, i) => (
                                        <li key={i} className="text-gray-400 text-sm flex gap-3">
                                            <span className="text-[#D9A44A] flex-shrink-0">◈</span>
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Hidden value */}
                            <div className="border border-[#D9A44A]/20 rounded-xl bg-[#0b1220] p-8">
                                <p className="text-[#D9A44A] uppercase tracking-widest text-xs mb-4">
                                    {interpretation.where_hidden_value_may_be_sitting.title}
                                </p>
                                <ul className="space-y-2">
                                    {interpretation.where_hidden_value_may_be_sitting.points.map((p, i) => (
                                        <li key={i} className="text-gray-400 text-sm flex gap-3">
                                            <span className="text-[#D9A44A] flex-shrink-0">◈</span>
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* What this may open up */}
                            <div className="border border-[#D9A44A]/20 rounded-xl bg-[#0b1220] p-8">
                                <p className="text-[#D9A44A] uppercase tracking-widest text-xs mb-4">
                                    {interpretation.what_this_may_open_up.title}
                                </p>
                                <ul className="space-y-2">
                                    {interpretation.what_this_may_open_up.points.map((p, i) => (
                                        <li key={i} className="text-gray-400 text-sm flex gap-3">
                                            <span className="text-[#D9A44A] flex-shrink-0">◈</span>
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Audit bridge */}
                            <div className="border-l-2 border-[#D9A44A] bg-[#0b1220] rounded-r-xl p-8">
                                <p className="text-[#D9A44A] uppercase tracking-widest text-xs mb-4">
                                    {interpretation.audit_bridge.title}
                                </p>
                                {interpretation.audit_bridge.body.map((b, i) => (
                                    <p key={i} className="text-gray-300 text-sm mb-3">{b}</p>
                                ))}
                            </div>

                        </div>
                    </div>
                )}

                {/* Reflection questions */}
                <div className="border border-[#D9A44A]/20 rounded-xl bg-[#0b1220] p-8 mb-14">
                    <h3 className="text-[#D9A44A] uppercase tracking-widest text-xs mb-8">
                        Looking at your results — questions worth sitting with
                    </h3>
                    <div className="space-y-4">
                        {REFLECTION_QUESTIONS.map((q, i) => (
                            <div key={i} className="flex gap-4">
                                <span className="text-[#D9A44A]/50 text-xs mt-1 flex-shrink-0 font-mono">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <p className="text-gray-400 text-sm leading-relaxed">{q}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* eBook CTA */}
                <div className="text-center mb-14">
                    <h3 className="text-2xl font-serif mb-6">Ready for the next step?</h3>
                    {!hide && (
                        <button
                            onClick={display}
                            className="bg-[#D9A44A] text-black font-semibold px-10 py-4 rounded-md hover:bg-[#c89435] transition text-base"
                        >
                            Get Your eBook
                        </button>
                    )}
                    <div className="eBook mt-8" />
                    {hide && (
                        <button
                            onClick={hidden}
                            className="text-sm text-gray-500 border border-gray-700 rounded px-4 py-2 hover:border-gray-500 transition mt-4"
                        >
                            Close
                        </button>
                    )}
                </div>
                {eBook && <Embed />}

            </div>

            {/* Footer */}
            <div className="border-t border-[#D9A44A]/10">
                <div className="max-w-6xl mx-auto px-6 py-8 text-center">
                    <p className="text-gray-600 text-sm">
                        Made with care by Ibrahim Kaizen Coaching ·{' '}
                        <a
                            href="https://www.nextlevel10X.pro"
                            className="text-[#D9A44A] hover:text-white transition"
                        >
                            Unleash your next level
                        </a>
                    </p>
                </div>
            </div>

        </div>
    );
}

export default Email;
