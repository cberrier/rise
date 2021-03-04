export const Question = (props) => {
    return (
        <>
            <p className={'question-title'}>{props.question.text}</p>
            <div>
                <img className={'img'} src={props.question.media.url} alt={'Question Image'} />
            </div>
        </>
    )
}