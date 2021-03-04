import { CSSTransition } from 'react-transition-group'
import { useState } from 'react'

export const Submit = (props) => {
    const [showButton, setShowButton] = useState(!props.completed)
    return (
        <>
            <div className={'quiz-submit-container'}>
                {showButton &&
                    <button disabled={props.selected === ''} className={`quiz-submit-button ${props.completed ? 'remove' : ''}`} type={'submit'} onClick={props.handler}>Submit</button>
                }
                <CSSTransition
                    in={props.completed}
                    timeout={400}
                    classNames="quiz-feedback-animation"
                    unmountOnExit
                    appear
                    onEntered={() => setShowButton(false)}
                    onExited={() => setShowButton(true)}
                >
                    <div className="quiz-feedback">
                        <div className={'quiz-feedback-icon'}>
                            {props.isCorrect
                                ? <div>
                                    <p>Correct!</p>
                                    <img width={"32"} height={"40"} src={`${process.env.PUBLIC_URL}/checkmark.jpg`}/>
                                  </div>
                                : <div>
                                    <p>Incorrect</p>
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
        </>
    )

}