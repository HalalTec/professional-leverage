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

const Email = () => {

    const [eBook, seteBook] = useState(false)
    const [hide, setHide] = useState(false)

    const navigate = useNavigate();  

    const queryString = window.location.search;

    const params = new URLSearchParams(queryString)

    let  duration = ''; 
    if(params.get('i') == 'y'){
        duration = '1 year'
    }else if (params.get('i') =='yr') {
        duration = '3 years'
    }else {
        duration = '6 months'
    }



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
    const valueA = parseInt(a.values[2], 10) || 0; 
    const valueB = parseInt(b.values[2], 10) || 0; 
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

    const startingVal = decodedCategories.map(category => parseInt(category.values[3]));
    const gap = calculateMean(startingVal)
    const gap_avg = gap

// calculation ends here
      
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

        sorted.map((category, index) => {
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
    const ra = {
        marginLeft: `${gap_avg}%`,
        border:'none',
      }
    

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
                        <p>How balanced is your life right now: </p>
                        <p>0% <input id="range" type="range" min="0" max="100" value={balance}/> 100%
                        <p style={styleIt}>{balance}%</p>
                        </p>
                        </div>

                        <div className='range'>
                        <p>On the journey to your selected future self, you have covered: </p> 
                        <p> Past<input    id="range" type="range" min="0" max="100" value={gap_avg}/>{duration} 
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
                        {sorted.map((category, index) => (
                        <tr key={index}>
                            <td>Domain {index+1}</td>
                            <td style={{textAlign:"left"}}>{category.name}</td>
                            <td>{category.values[0]}</td>
                            <td>{category.values[1]}</td>
                            <td>{category.values[2]}</td>
                        </tr>
                    ))}

                    </table>
                    <button onClick={save} style={{width:'40%'}}>Download Your Result </button>

                </div>
            </div>
            <div>   
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
            <footer>	Made with ❤ by <a href="https://www.discoveryourvalues.com/">Discover Your Values</a></footer>
            </div>

            

    

    </> );
}
 
export default Email;