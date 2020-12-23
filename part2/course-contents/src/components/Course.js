import React from  'react';

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content course={course} />
      <Total parts={course.parts} />
    </div>
  )
};

const Total = ({ parts }) => {
  // console.log(parts);

  // using reduce
  const sum = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return (
    <div>
      <strong>
        total of {sum} {sum > 1 ? 'exercises' : 'exercise'}
      </strong>
    </div>
  )
}

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({ course }) => {
  // console.log(course);
  return (
    <div>
      {course.parts.map((part) => 
        <Part key={part.name} part={part} />
      )}
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

export default Course;