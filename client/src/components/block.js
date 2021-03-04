import { useState, useEffect } from 'react'
import { Question, Quiz, Submit } from './index'

export const Block = () => {
    const [knowledgeCheckBlock, setKnowledgeCheckBlock] = useState([])
    const [selected, setSelected] = useState('')
    const [completed, setCompleted] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)

    console.log("K", knowledgeCheckBlock)

    useEffect( () => {
        const fetchData = async () => {
            await fetch("/api/knowledge-check-blocks", {
                method: 'GET',
            }).then(res => {
                if (res.ok) {
                    res.json().then(result => {
                        if (result && result[0]) {
                            setKnowledgeCheckBlock(result[0])
                        }
                    });
                }
            })
        }

        fetchData()
    }, [])

    useEffect(() => {
        const fetchCache = async () => {
            await fetch("/api/getCacheValues", {
                method: 'GET',
            }).then(res => {
                if (res.ok) {
                    res.json().then(result => {
                        if(result.selected) {
                            setSelected(result.selected)
                        }
                        if(result.completed) {
                            setCompleted(result.completed)
                        }
                        if(result.correct) {
                            setIsCorrect(result.correct)
                        }
                    });
                }
            })
        }
        fetchCache()
    }, [])

    const onSelect = async (e) => {
        await fetch("/api/saveSelected", {
            method: 'POST',
            body: JSON.stringify({ selected: e }),
            headers: { 'Content-Type': 'application/json' },
        })
        setSelected(e)
    }

    const handleSubmit = async () => {
        const answer = selected.split('-')[1]
        const correct = knowledgeCheckBlock.answers[answer].isCorrect
        await fetch("/api/submit", {
            method: 'POST',
            body: JSON.stringify({ completed: true, correct: correct }),
            headers: { 'Content-Type': 'application/json' },
        }).then(() => {
            setCompleted(true)
            setSubmitted(true)
            setIsCorrect(correct)
        })
    }

    const handleRetry = async () => {
        await fetch("/api/retry", {
            method: 'POST',
            body: JSON.stringify({}),
            headers: { 'Content-Type': 'application/json' },
        }).then((res) => {
            if (res.ok) {
                setSelected('')
                setCompleted(false)
                setSubmitted(false)
                setIsCorrect(false)
            }
        })
    }

    return (
        <div className={'block-container'}>
            <div className={`question-container ${submitted ? 'submitted' : ''}`}>
                {knowledgeCheckBlock.question &&
                    <Question question={knowledgeCheckBlock.question} />
                }
            </div>
            <div className={"quiz-container"}>
                {knowledgeCheckBlock.answers && knowledgeCheckBlock.answers.map((elem, index) => {
                    return (
                        <Quiz key={index} isCorrect={elem.isCorrect} submitted={submitted} completed={completed} count={index} text={elem.text} selected={selected} onSelect={onSelect} />
                    )
                })}
                <div className={'quiz-submit-container'}>
                    <Submit handler={handleSubmit} selected={selected} completed={completed} feedback={knowledgeCheckBlock.feedback} isCorrect={isCorrect}/>
                    {completed &&
                        <div className={'quiz-retry-button'} onClick={handleRetry}>
                            <p>Take Again</p>
                            <img width={"32"} height={"40"} src={`${process.env.PUBLIC_URL}/retry-240.png`}/>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}