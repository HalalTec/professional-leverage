import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pako from 'pako';
import { Buffer } from 'buffer';

const Result = ({
    career, money, per, rel, fun, physical, spirit, health
}) => {
    const navigate = useNavigate();

    const categories = [
        { name: 'Identity Clarity',               values: [career[0]] },
        { name: 'Value Articulation',             values: [money[0]] },
        { name: 'Evidence Visibility',            values: [health[0]] },
        { name: 'Signature Strength Recognition', values: [rel[0]] },
        { name: 'Trust Pattern Awareness',        values: [per[0]] },
        { name: 'Positioning Strength',           values: [fun[0]] },
        { name: 'Next-Move Clarity',              values: [physical[0]] },
        { name: 'Leverage Utilization',           values: [spirit[0]] },
    ];

    const encodeCategoriesToShortUrl = (cats) => {
        const jsonString = JSON.stringify(cats);
        const compressed = pako.deflate(jsonString, { to: 'string' });
        const base64Encoded = Buffer.from(compressed).toString('base64');
        return `/email?payload=${encodeURIComponent(base64Encoded)}`;
    };

    const newUrl = encodeCategoriesToShortUrl(categories);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(newUrl);
        }, 1000);
        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    return (
        <div className="diagnostic-page min-h-screen bg-[#070d16] flex items-center justify-center">
            <div className="text-center">
                <div className="w-10 h-10 border-2 border-[#D9A44A] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                <p className="text-[#D9A44A] uppercase tracking-widest text-sm">
                    Analysing your results…
                </p>
            </div>
        </div>
    );
}

export default Result;
