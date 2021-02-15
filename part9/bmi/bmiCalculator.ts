interface inputs { height: number, weight: number };

const parseArguments = (args: Array<string>): inputs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return { 
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error("Provided values were not numbers!");
  }
}

const calculateBmi = (height: number, weight: number): string => {
  height /= 100; // cm to m
  const bmi = weight / (height * height);

  switch (true) {
    case bmi < 15:
      return "Very severely underweight";
    case bmi === 15 && bmi < 16:
      return "Severely underweight";
    case bmi >= 16 && bmi < 18.5:
      return "Underweight";
    case bmi >= 18.5 && bmi < 25:
      return "Normal (healthy weight)";
    case bmi >= 25 && bmi < 30:
      return "Overweight";
    case bmi >= 30 && bmi < 35:
      return "Obese Class I (Moderately obese)";
    case bmi >= 35 && bmi < 40:
      return "Obese Class II (Severely obese)";
    case bmi >= 40:
      return "Obese Class III (Very severely obese)";
  }
}

console.log(calculateBmi(180, 74));
