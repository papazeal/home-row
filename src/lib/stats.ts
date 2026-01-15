export interface TypingStats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  totalChars: number;
  timeElapsed: number;
}

export function calculateWPM(correctChars: number, timeInSeconds: number): number {
  if (timeInSeconds === 0) return 0;
  const wordsTyped = correctChars / 5; // Standard: 5 chars = 1 word
  const minutesElapsed = timeInSeconds / 60;
  return Math.round(wordsTyped / minutesElapsed);
}

export function calculateAccuracy(correctChars: number, totalChars: number): number {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
}

export function calculateStats(
  userInput: string,
  targetText: string,
  startTime: number,
  endTime: number
): TypingStats {
  const timeElapsed = (endTime - startTime) / 1000; // Convert to seconds
  
  let correctChars = 0;
  const totalChars = userInput.length;
  
  for (let i = 0; i < Math.min(userInput.length, targetText.length); i++) {
    if (userInput[i] === targetText[i]) {
      correctChars++;
    }
  }
  
  const wpm = calculateWPM(correctChars, timeElapsed);
  const accuracy = calculateAccuracy(correctChars, totalChars);
  
  return {
    wpm,
    accuracy,
    correctChars,
    totalChars,
    timeElapsed
  };
}