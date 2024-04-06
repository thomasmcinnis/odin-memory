import PropTypes from "prop-types"

export default function Score({ currScore, highScore }) {
    return (
        <div className="scores">
            <div className="currentScore">
                <p>Current Streak: {currScore}</p>
            </div>
            <div className="highScore">
                <p>Longest Streak: {highScore}</p>
            </div>
        </div>
    )
}
Score.propTypes = {
    currScore: PropTypes.number.isRequired,
    highScore: PropTypes.number.isRequired,
}
