interface InputsCalc {
  target: number,
  hours: Array<number>
}

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};

const generateRating = (rating: number): string => {
  switch (rating) {
    case 1:
      return "please try harder next time";
    case 2:
      return "not too bad but could be better";
    case 3:
      return "you did great!";
  }
}

const calculateExercises = (hours: Array<number>, target: number): Result => {
  const periodLength = hours.length;
  const average = hours.reduce((total, day) => total + day, 0) / hours.length;
  const success = average > target;
  const trainingDays = hours.reduce((totalDays, day) => {
    if (day > 0) totalDays++;
    return totalDays;
  }, 0);
  const rating = success ? 3 : (average > 1) ? 2 : 1;

  let ratingDescription = generateRating(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

const parseExercisesArgs = (argsNum: Array<string>): InputsCalc => {
  if (argsNum.length < 4) throw new Error('Not enough arguments');

  const target = Number(argsNum[2]);
  if (isNaN(target)) throw new Error("target hour must be a number");

  let hours = [];
  for (let i = 3; i < argsNum.length; i++) {
    hours.push(Number(argsNum[i]));
  }

  return {
    target, hours
  }
}

try {
  const{ hours, target } = parseExercisesArgs(process.argv);
  console.log(calculateExercises(hours, target));
} catch(e) {
  console.log(e);
}