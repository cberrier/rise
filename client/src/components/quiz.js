import {CSSTransition} from "react-transition-group";
import { useState } from 'react'

export const Quiz = (props) => {
    const [showIcon, setShowIcon] = useState(!props.completed)
    const currClassName = `input-${props.count}`
    return (
        <div className={`quiz-group ${currClassName} ${props.submitted ? 'disabled-button' : ''}`} onClick={() => {props.onSelect(currClassName)}}>
            <div className={'quiz-input'}>
                {showIcon &&
                    <div className={`quiz-input-dot-indicator ${props.completed ? 'remove' : ''} ${props.selected === currClassName ? 'selected' : ''}`}/>
                }
                <CSSTransition
                    in={props.completed}
                    timeout={400}
                    classNames="quiz-input-icon-animation"
                    unmountOnExit
                    appear
                    onEntered={() => setShowIcon(false)}
                    onExited={() => setShowIcon(true)}
                >
                    <div className="quiz-input-container">
                        <div className={'quiz-input-icon-container'}>
                            {props.isCorrect
                                ? <div>
                                    <img width={"32"} height={"40"} src={`${process.env.PUBLIC_URL}/checkmark.jpg`}/>
                                </div>
                                : <div>
                                    <img width={"32"} height={"40"} src={`${process.env.PUBLIC_URL}/incorrect.jpg`}/>
                                </div>
                            }
                        </div>
                        <div className={"quiz-feedback-text"}>
                            {props.feedback}
                        </div>
                    </div>
                </CSSTransition>
            </div>
            <p className={'quiz-label'}>{props.text}</p>
        </div>
    )
}
