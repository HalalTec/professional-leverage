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
    'Identity Clarity': 'identity_clarity',
    'Value Articulation': 'value_articulation',
    'Evidence Visibility': 'evidence_visibility',
    'Signature Strength Recognition': 'signature_strength_recognition',
    'Trust Pattern Awareness': 'trust_pattern_awareness',
    'Positioning Strength': 'positioning_strength',
    'Next-Move Clarity': 'next_move_clarity',
    'Leverage Utilization': 'leverage_utilization',
};

const Email = () => {

    const [eBook, seteBook] = useState(false)
    const [hide, setHide] = useState(false)
    const [interpretation, setInterpretation] = useState(null)
    const [loadingInterp, setLoadingInterp] = useState(false)
    const [interpError, setInterpError] = useState(null)

    const navigate = useNavigate();  

    const queryString = window.location.search;

    const params = new URLSearchParams(queryString)



// new setting


const decodeCategoriesFromUrl = (url) => {
    try {
        // Step 1: Parse the URL and extract query parameters
        const urlParams = new URL(url).searchParams;

        // Step 2: Get the Base64-encoded payload
        const base64EncodedPayload = urlParams.get('payload');

        if (!base64EncodedPayload) {
            throw new Error('Payload not found in the URL.');
        }

        // Step 3: Decode the Base64 string back to binary data
        const compressedData = Buffer.from(base64EncodedPayload, 'base64');

        // Step 4: Decompress the binary data using pako
        const decompressed = pako.inflate(compressedData, { to: 'string' });

        // Step 5: Parse the decompressed JSON string back into the original object
        const categories = JSON.parse(decompressed);

        return categories;
    } catch (error) {
        console.error('Error decoding the URL payload:', error);
        navigate('/'); 

    }
};

// Example usage with window.location.href
const decodedCategories = decodeCategoriesFromUrl(window.location.href);



  const sorted = [...decodedCategories].sort((a, b) => {
    const valueA = parseInt(a.values[0], 10) || 0;
    const valueB = parseInt(b.values[0], 10) || 0;
    return valueB - valueA;
  });


//end new setting

 //Magnitude and balance Calculation
 function calculateMean(values) {
    const sum = values.reduce((acc, value) => acc + value, 0);
    return sum / values.length;
  }
  
  
  // Function to calculate the standard deviation of an array of numbers
  function calculateStandardDeviation(values) {
    const mean = calculateMean(values);
    const variance = values.reduce((acc, value) => acc + Math.pow(value - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  }

  function roundUpToDecimal(number, decimalPlaces) {
    const factor = Math.pow(10, decimalPlaces);
    return Math.ceil(number * factor) / factor;
  }

    const startingValues = decodedCategories.map(category => parseInt(category.values[0]));
    const meanAvg = calculateMean(startingValues);
    const Standard = calculateStandardDeviation(startingValues);
    
    const mean = roundUpToDecimal(meanAvg, 2)
    const mean_percent = ((mean/10) * 100) 
    const SD = roundUpToDecimal(Standard, 2)
    const balance = roundUpToDecimal(((1-(SD / mean)) * 100), 1);                

// calculation ends here

    useEffect(() => {
        const scores = {};
        decodedCategories.forEach(category => {
            const key = CATEGORY_KEY_MAP[category.name];
            if (key) {
                scores[key] = parseInt(category.values[0], 10);
            }
        });

        setLoadingInterp(true);
        fetch('/api/interpret', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ scores }),
        })
            .then(async res => {
                const contentType = res.headers.get('content-type') || '';
                const data = contentType.includes('application/json')
                    ? await res.json()
                    : null;

                if (!res.ok) {
                    throw new Error(data?.error || `Interpretation API returned ${res.status}`);
                }

                if (!data) {
                    throw new Error('Interpretation API did not return JSON');
                }

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
    }, []);

      useEffect(() => {
        // Create root element
        const root = am5.Root.new('chartdiv');

        // Set themes
        root.setThemes([am5themes_Animated.new(root)]);

        // Create chart
        const chart = root.container.children.push(
            am5radar.RadarChart.new(root, {
                panX: false,
                panY: false,
                wheelX: 'panX',
                wheelY: 'zoomX',
            })
        );

        // Create axes and their renderers
        const xRenderer = am5radar.AxisRendererCircular.new(root, {});
        xRenderer.labels.template.setAll({
            radius: 10,
        });

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
                renderer: am5radar.AxisRendererRadial.new(root, {
                    minGridDistance: 20,
                }),
            })
        );

        yAxis.get('renderer').labels.template.set('forceHidden', true);

        // Create series for current satisfaction
        const currentSeries = chart.series.push(
            am5radar.RadarColumnSeries.new(root, {
                xAxis: xAxis,
                yAxis: yAxis,
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

     
        // Set data
        const data = []

        decodedCategories.map((category, index) => {
            data.push({ category: index+1, currentValue: category.values[0],  columnSettings: { fill: chart.get('colors').next() } })
        })

        



        currentSeries.data.setAll(data);
        xAxis.data.setAll(data);

        // Animate chart
        currentSeries.appear(1000);
        chart.appear(1000, 100);

        // Cleanup function
        return () => {
            root.dispose();
        };

    }, []);

    const save = () => {
        const input = document.getElementById('res');

        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 190; // PDF width in mm
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

            pdf.save('download.pdf');
        })
    }

    const styleIt = {textAlign:"center", width:"50%"}
    

      const display = () => {
        seteBook(true)
        setHide(true)
      }

      const hidden = () => {
        seteBook(false)
        setHide(false)
      }


    return ( <>

<div id='res'>
            <h1 style={{textAlign:"center"}}>Your Results</h1>
            <div className="mean">
                         <div className='range'>
                        <h2> Your Wheel of Life score:</h2>
                        <p>0% <input id="range" type="range" min="0" max="100" value={((mean_percent + balance)/2).toFixed(2)} /> 100%
                        <p style={styleIt}> {((mean_percent + balance)/2).toFixed(2)}% </p>
                        </p>
                        </div>

                        <div className='range'>
                        <p>How circular is your wheel (rough measure of balance across domains)?: </p>
                        <p>0% <input id="range" type="range" min="0" max="100" value={balance}/> 100%
                        <p style={styleIt}>{balance}%</p>
                        </p>
                        </div>

            </div>
            <div className="result" id="result">
                <div className="pie">
                    <div id="chartdiv" className='chartdiv'></div>
                   
                </div>

                <div className="chart">
                    <table>
                        
                    <tr>
                            <th>No.</th>
                            <th>Life Domain</th>
                            <th>Score</th>
                        </tr>
                        {decodedCategories.map((category, index) => (
                        <tr key={index}>
                            <td>Domain {index+1}</td>
                            <td style={{textAlign:"left"}}>{category.name}</td>
                            <td>{category.values[0]}</td>
                        </tr>
                    ))}

                    </table>
                    <button onClick={save} style={{width:'40%'}}>Download Your Result </button>

                </div>
            </div>
            {/* AI Interpretation Section */}
            <div className="interpretation" style={{padding:'20px 10% 20px 10%'}}>
                {loadingInterp && (
                    <p style={{textAlign:'center', fontStyle:'italic', color:'#555'}}>Generating your professional leverage interpretation...</p>
                )}
                {interpError && (
                    <p style={{textAlign:'center', color:'red'}}>{interpError}</p>
                )}
                {interpretation && (
                    <div className="interp-content">
                        <h2 style={{textAlign:'center', borderBottom:'2px solid #29ABE2', paddingBottom:'10px'}}>
                            Your Professional Leverage Pattern
                        </h2>

                        <div className="interp-section" style={{marginBottom:'24px'}}>
                            <h3 style={{color:'#29ABE2'}}>{interpretation.your_pattern.title}</h3>
                            <p style={{fontSize:'large', fontWeight:'bold'}}>{interpretation.your_pattern.value}</p>
                        </div>

                        <div className="interp-section" style={{marginBottom:'24px'}}>
                            <h3 style={{color:'#29ABE2'}}>{interpretation.what_this_pattern_suggests.title}</h3>
                            {interpretation.what_this_pattern_suggests.short.map((s, i) => (
                                <p key={i} style={{marginBottom:'6px'}}>{s}</p>
                            ))}
                            <ul style={{textAlign:'left', marginTop:'10px'}}>
                                {interpretation.what_this_pattern_suggests.expanded.map((s, i) => (
                                    <li key={i} style={{marginBottom:'6px', listStyle:'disc', fontSize:'medium'}}>{s}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="interp-section" style={{marginBottom:'24px'}}>
                            <h3 style={{color:'#29ABE2'}}>{interpretation.what_may_be_quietly_costing_you.title}</h3>
                            <ul style={{textAlign:'left'}}>
                                {interpretation.what_may_be_quietly_costing_you.points.map((p, i) => (
                                    <li key={i} style={{marginBottom:'6px', listStyle:'disc', fontSize:'medium'}}>{p}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="interp-section" style={{marginBottom:'24px'}}>
                            <h3 style={{color:'#29ABE2'}}>{interpretation.where_hidden_value_may_be_sitting.title}</h3>
                            <ul style={{textAlign:'left'}}>
                                {interpretation.where_hidden_value_may_be_sitting.points.map((p, i) => (
                                    <li key={i} style={{marginBottom:'6px', listStyle:'disc', fontSize:'medium'}}>{p}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="interp-section" style={{marginBottom:'24px'}}>
                            <h3 style={{color:'#29ABE2'}}>{interpretation.what_this_may_open_up.title}</h3>
                            <ul style={{textAlign:'left'}}>
                                {interpretation.what_this_may_open_up.points.map((p, i) => (
                                    <li key={i} style={{marginBottom:'6px', listStyle:'disc', fontSize:'medium'}}>{p}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="interp-section" style={{background:'#f5f5f5', padding:'16px', borderLeft:'4px solid #29ABE2', marginBottom:'24px'}}>
                            <h3 style={{color:'#29ABE2'}}>{interpretation.audit_bridge.title}</h3>
                            {interpretation.audit_bridge.body.map((b, i) => (
                                <p key={i} style={{fontSize:'medium', marginBottom:'8px'}}>{b}</p>
                            ))}
                        </div>
                    </div>
                )}
            </div>

                    <div className="observe">
                    <h3> Looking at your wheel above: </h3>
                    <li> How do you feel as you look at your wheel?</li>
                    <li>Are there any surprises for you?</li>
                    <li> How do you currently spend time in these areas?</li>
                    <li>How would you like to spend time in these areas?</li>
                    <li>What might you be avoiding looking at here?</li>
                    <li>For each one, what would make that score a 10/10?</li>
                    <li>What would definitely increase your score—even if it was really hard to do?</li>
                    <li>Describe what a score of 10 would look like in those areas?</li>
                    <li>Which of these categories would you most like to improve?</li>
                    <li>We're all so busy these days: How could you make space for these changes in your life?</li>
                    <li>What help and support might you need from others to make changes—and be more satisfied with your life?</li>
                    <li> So, what is the smallest step you could take to get started?</li>
                    <li>What will you do today or in the next 24 hours?</li>
                    <li>If there was one key action that would begin to bring everything into balance, what would it be?</li>
                    <li>What if time money/time/energy were not an issue? What could you do in each area?</li>
                    </div>
            <div className="below">
            <h3>Ready for the next step?</h3>
           {hide === false && <button onClick={display}> Get Your eBook </button> }
            <div className="eBook">
            {eBook === true && <Embed />} 
            </div>
            {hide === true && <button onClick={hidden}> Close </button> }
            </div>
            </div>
            <div>
                <footer>	Made with ❤️ from Ibrahim Kaizen Coaching <a href="https://www.nextlevel10X.pro">Unleash your next level</a></footer>
            </div>

            

    

    </> );
}
 
export default Email;
