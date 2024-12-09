const Career = ({question, style, select}) => {
   const selected = select;

    

    return ( 
        <>
        
        <div className="question-answer">
            <p style={style} className="pq">
                {question} {select && (<i><u>{selected}</u></i>)}
            </p>

        </div>
        </>
     );
}
 
export default Career;