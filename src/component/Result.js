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
    career, money, per, rel, fun, physical, spirit, health, purpose, contribution, selected 

        }) => {
            const contentRef = useRef(null);
            const navigate = useNavigate();  

            const params = new URLSearchParams();
            const [mail, setMail] = useState(false)
            const [style, setStyle] = useState({display:'block'})
            const [recipientEmail, setRecipientEmail] = useState('');
            const[msg, setMsg] = useState('')

            const categories = [
                { name: 'Career and Professional Growth', values: [career[0], career[1], career[1] - career[0], ((career[0]/career[1])*100)] },
                { name: 'Financial Health', values: [money[0], money[1], money[1] - money[0], ((money[0]/money[1])*100)] },
                { name: 'Personal growth', values: [per[0], per[1], per[1] - per[0], ((per[0]/per[1])*100)] },
                { name: 'Relationships and Social Life', values: [rel[0], rel[1], rel[1] - rel[0], ((rel[0]/rel[1])*100)] },
                { name: 'Fun and Recreation', values: [fun[0], fun[1], fun[1] - fun[0], ((fun[0]/fun[1])*100)] },
                { name: 'Living and Work Environment', values: [physical[0], physical[1], physical[1] - physical[0], ((physical[0]/physical[1])*100)] },
                { name: 'Spirituality and Inner Growth', values: [spirit[0], spirit[1], spirit[1] - spirit[0], ((spirit[0]/spirit[1])*100)] },
                { name: 'Physical and Emotional Health ', values: [health[0], health[1], health[1] - health[0], ((health[0]/health[1])*100)] },
                { name: 'Purpose and Fulfillment ', values: [purpose[0], purpose[1], purpose[1] - purpose[0], ((purpose[0]/purpose[1])*100)] },
                { name: 'Contribution and Legacy ', values: [contribution[0], contribution[1], contribution[1] - contribution[0], ((contribution[0]/contribution[1])*100)] },
            ];

        

            const sortedCategories = [...categories].sort((a, b) => b.values[2] - a.values[2]);
         
            
            categories.forEach(({ name, values }) => {
                values.forEach((value) => {
                  params.append(name, value);
                });
              });

            // const baseUrl = 'wheel-of-life-free-app.vercel.app/email';
            const baseUrl = '/email';
            // const newUrl = `${baseUrl}?${params.toString()}`;
              let timeFrame = '';
              if(selected == '6 Months') {
                timeFrame = 'm'
              }else if (selected == '1 Year') {
                timeFrame = 'y'
              }else {
                timeFrame = 'yr'
              }

                console.log(timeFrame)
            //new url
            const encodeCategoriesToShortUrl = (categories) => {
                // Step 1: Convert categories to JSON string
                const jsonString = JSON.stringify(categories);
            
                // Step 2: Compress the JSON string using pako
                const compressed = pako.deflate(jsonString, { to: 'string' });
            
                // Step 3: Encode the compressed data to Base64
                const base64Encoded = Buffer.from(compressed).toString('base64');
            
                // Step 4: Construct the URL
                return `${baseUrl}?payload=${encodeURIComponent(base64Encoded)}&i=${timeFrame}`;
            };

            // const shortenUrl = async (longUrl) => {
            //     const response = await fetch('https://api.tinyurl.com/create', {
            //         method: 'POST',
            //         headers: {
            //             'Authorization': `Bearer YOUR_TINYURL_ACCESS_TOKEN`,
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify({ url: longUrl }),
            //     });
            //     const data = await response.json();
            //     return data.data.tiny_url;
            // };
        
            const newUrl = encodeCategoriesToShortUrl(categories);
            //end url
            console.log(newUrl)

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

                const startingValues = categories.map(category => parseInt(category.values[0]));
                const meanAvg = calculateMean(startingValues);
                const Standard = calculateStandardDeviation(startingValues);
                
                const mean = roundUpToDecimal(meanAvg, 2)
                const mean_percent = ((mean/10) * 100) 
                const SD = roundUpToDecimal(Standard, 2)
                const balance = roundUpToDecimal(((1-(SD / mean)) * 100), 1);                

                const startingVal = categories.map(category => parseInt(category.values[3]));
                const gap = calculateMean(startingVal)
                const gap_avg = gap

                             
                
  

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

                sortedCategories.map((category, index) => {
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
       

            let message ='';
           

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

            
            const sendMail = (e) => {
                e.preventDefault()
        
                        // Configure your EmailJS service

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
    
                    // });


                   
            }

            const navDownload = () => {
                setMail(true)
                console.log(newUrl)
                // setStyle({display:'none'})
            }


            const styleIt = {textAlign:"center", width:"50%"}
            const ra = {
                marginLeft: `${gap_avg}%`,
                border:'none',
              }

              useEffect(() => {
                // Logic for page load complete
                const timer = setTimeout(() => {
                    console.log('Page A loaded. Navigating to Page B...');
                    navigate(newUrl); // Navigate to Page B
                }, 1000); // Delay to simulate page load
        
                return () => clearTimeout(timer); // Cleanup on component unmount
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

                        <div className='range'>
                        <p>On the journey to your selected future self, you have covered: </p> 
                        <p> Past<input    id="range" type="range" min="0" max="100" value={gap_avg}/>{selected} 
                        <div style={{width:'50%', marginTop:'-10px'}}> <span style={ra}>Now </span>
                        <p style={{width:'100%', marginTop:'-30px', textAlign:'center'}}> {gap_avg.toFixed(2)}%</p>
                        </div>
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
                            <th>Now</th>
                            <th>Future</th>
                            <th>Difference</th>
                        </tr>
                        {sortedCategories.map((category, index) => (
                        <tr key={index}>
                            <td>Domain {index+1}</td>
                            <td style={{textAlign:"left"}}>{category.name}</td>
                            <td>{category.values[0]}</td>
                            <td>{category.values[1]}</td>
                            <td>{category.values[2]}</td>

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
            

            {mail === true && ( <div className="email"         ref={contentRef} >
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