const Career = ({question, clarifier}) => {
    return (
        <>
        <div className="question-answer">
            <p className="pq">{question}</p>
            {clarifier && <p className="clarifier"><i>{clarifier}</i></p>}
        </div>
        </>
     );
}
 
export default Career;