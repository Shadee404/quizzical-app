export default function MainScreen(props) {
    return (
        <div className="quizzaical-details">
            <h1 className="quizzaical-details__title">Quizzical</h1>
            <p className="quizzaical-details__description">Quiz on general knowledge</p>
            <button className="quizzaical-details__start" onClick={() => {props.setIsMainScreen(false)}}>Start quiz</button>
        </div>
    );
}