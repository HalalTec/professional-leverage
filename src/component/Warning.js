const Warning = ({close}) => {
    const style = {backgroundColor: "white", color: "red", border: "1px solid red"}
    return ( 
        <>
            <div className="message">
                <div className="card" style={style}>
                    <p> Your future goal must be heigher than your present achievement </p>
                    <button onClick={close}> Close </button>
               </div>
            </div>
        </>
     );
}
 
export default Warning;