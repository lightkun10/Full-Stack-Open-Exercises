interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};

/**
 * FUNCTION HELPERS
 */
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));