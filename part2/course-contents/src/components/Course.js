import React from 'react';

const Course = ({ course }) => {
    /* Pass the course name and parts */
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}


const Header = ({ course }) => {
    return (
        <h1>{course}</h1>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part) =>
                <Part key={part.id}
                    name={part.name}
                    exercises={part.exercises} />
            )}
        </div>
    )
}

const Part = ({ name, exercises }) => {
    return (
        <p>
            {name} {exercises}
        </p>
    )
}

const Total = ({ parts }) => {
    /* Using forloop */
    // let total_forLoop = 0;
    // for (let i = 0; i < parts.length; i++) {
    //     total_forLoop += parts[i].exercises;
    // }

    /* Using reduce */
    const total = parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)


    return <h4>total of {total} exercises</h4>
}

export default Course;