export default function Die(props) {
        const styles = {
            backgroundColor:props.isHeld ? "#59E391" : "white"
        }
    return (    
        <div className="dice" style={styles}>
           {props.value}
        </div>
    )
}
