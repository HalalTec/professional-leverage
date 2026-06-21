const Career = ({ question, clarifier }) => {
    return (
        <div className="mb-10">
            <h2 className="text-3xl lg:text-4xl font-serif leading-snug text-white mb-5">
                {question}
            </h2>
            {clarifier && (
                <p className="text-white italic text-base">
                    {clarifier}
                </p>
            )}
        </div>
    );
}

export default Career;
