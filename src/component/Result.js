import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import pako from 'pako';
import {Buffer} from 'buffer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from '@amcharts/amcharts5/radar';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import emailjs from 'emailjs-com';
import { numberToString } from '@amcharts/amcharts5/.internal/core/util/Type';

const Result = ({
    career, money, per, rel, fun, physical, spirit, health
        }) => {
            const contentRef = useRef(null);
            const navigate = useNavigate();

            const params = new URLSearchParams();
            const [mail, setMail] = useState(false)
            const [style, setStyle] = useState({display:'block'})
            const [recipientEmail, setRecipientEmail] = useState('');
            const[msg, setMsg] = useState('')

            const categories = [
                { name: 'Identity Clarity', values: [career[0]] },
                { name: 'Value Articulation', values: [money[0]] },
                { name: 'Evidence Visibility', values: [health[0]] },
                { name: 'Signature Strength Recognition', values: [rel[0]] },
                { name: 'Trust Pattern Awareness', values: [per[0]] },
                { name: 'Positioning Strength', values: [fun[0]] },
                { name: 'Next-Move Clarity', values: [physical[0]] },
                { name: 'Leverage Utilization', values: [spirit[0]] },
            ];

            const sortedCategories = [...categories].sort((a, b) => b.values[0] - a.values[0]);

            categories.forEach(({ name, values }) => {
                values.forEach((value) => {
                  params.append(name, value);
                });
              });

            const baseUrl = '/email';

            const encodeCategoriesToShortUrl = (categories) => {
                const jsonString = JSON.stringify(categories);
                const compressed = pako.deflate(jsonString, { to: 'string' });
                const base64Encoded = Buffer.from(compressed).toString('base64');
                return `${baseUrl}?payload=${encodeURIComponent(base64Encoded)}`;
            };

            const newUrl = encodeCategoriesToShortUrl(categories);
            console.log(newUrl)

              //Magnitude and balance Calculation
              function calculateMean(values) {
                const sum = values.reduce((acc, value) => acc + value, 0);
                return sum / values.length;
              }

              function calculateStandardDeviation(values) {
                const mean = calculateMean(values);
                const variance = values.reduce((acc, value) => acc + Math.pow(value - mean, 2), 0) / values.length;
                return Math.sqrt(variance);
              }

              function roundUpToDecimal(number, decimalPlaces) {
                const factor = Math.pow(10, decimalPlaces);
                return Math.ceil(number * factor) / factor;
              }

                const startingValues = categories.map(category => parseInt(category.values[0]));
                const meanAvg = calculateMean(startingValues);
                const Standard = calculateStandardDeviation(startingValues);

                const mean = roundUpToDecimal(meanAvg, 2)
                const mean_percent = ((mean/10) * 100)
                const SD = roundUpToDecimal(Standard, 2)
                const balance = roundUpToDecimal(((1-(SD / mean)) * 100), 1);

            useEffect(() => {
                const root = am5.Root.new('chartdiv');
                root.setThemes([am5themes_Animated.new(root)]);

                const chart = root.container.children.push(
                    am5radar.RadarChart.new(root, {
                        panX: false,
                        panY: false,
                        wheelX: 'panX',
                        wheelY: 'zoomX',
                    })
                );

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

                const data = []
                sortedCategories.map((category, index) => {
                    data.push({ category: index+1, currentValue: category.values[0], columnSettings: { fill: chart.get('colors').next() } })
                })

                currentSeries.data.setAll(data);
                xAxis.data.setAll(data);

                currentSeries.appear(1000);
                chart.appear(1000, 100);

                return () => {
                    root.dispose();
                };

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

                    pdf.save('download.pdf');
                })
            }

            const sendMail = (e) => {
                e.preventDefault()

                const templateParams = {
                    from_name: "Wheel of life",
                    to_name: recipientEmail,
                    message: newUrl,
                    userEmail: recipientEmail
                }

                emailjs.send('service_3wq0hnk', 'template_jfeb0bd', templateParams, 'HUc7D9nog1ssZNiim')
                  .then((response) => {
                    setMsg('email sent!')
                  }, (err) => {
                    setMsg('FAILED...')
                  });
            }

            const navDownload = () => {
                setMail(true)
                console.log(newUrl)
            }

            const styleIt = {textAlign:"center", width:"50%"}

            useEffect(() => {
                const timer = setTimeout(() => {
                    console.log('Page A loaded. Navigating to Page B...');
                    navigate(newUrl);
                }, 1000);

                return () => clearTimeout(timer);
            }, [navigate]);

    return (
        <>
            <div id='res' style={style}>
            <h1 style={{textAlign:"center"}}>Your Results</h1>
            <div className="mean">
                         <div className='range'>
                        <h2> Your Wheel of Life score:</h2>
                        <p>0% <input id="range" type="range" min="0" max="100" value={((mean_percent + balance)/2).toFixed(2)} /> 100%
                        <p style={styleIt}> {((mean_percent + balance)/2).toFixed(2)}% </p>
                        </p>
                        </div>

                        <div className='range'>
                        <p>How balanced is your life right now: </p>
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
                        {sortedCategories.map((category, index) => (
                        <tr key={index}>
                            <td>Domain {index+1}</td>
                            <td style={{textAlign:"left"}}>{category.name}</td>
                            <td>{category.values[0]}</td>
                        </tr>
                    ))}
                    </table>
                </div>
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
            <button onClick={navDownload}>Proceed to Download </button>
            </div>
            </div>

            {mail === true && ( <div className="email" ref={contentRef} >
            <p>Enter Your Email </p>
            <form action="">
                <p style={{fontSize:"small"}}> {msg} </p>
            <input type="email" name="email" id="" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} required/>
            <input type="submit" value="Send Result to Mail" onClick={sendMail}/>
            </form>

            <button onClick={save} className=''>Download Result</button>

        </div> )}
        <div>
        <footer>	Made with ❤️ from Ibrahim Kaizen Coaching <a href="https://www.nextlevel10X.pro">Unleash your next level</a></footer>
        </div>
        </>
     );
}

export default Result;
