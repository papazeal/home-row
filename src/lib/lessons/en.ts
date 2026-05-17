export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  tips?: string;
  targetWPM?: number;
  difficulty?: string;
  words?: string;
}

export const lessons: Lesson[] = [
  {
    id: "home-row",
    title: "Home Row",
    description: "Master the home row keys: A S D F and J K L ;",
    tips: "Place your fingers on the middle row. Use the bumps on F and J to find your position without looking. Keep your wrists slightly elevated.",
    content: "asdf jkl; asdfjkl;",
    words: "sad dad fad lad ask all lass fall flask salad lads alfa lafs",
  },
  {
    id: "index-reaches-gh",
    title: "Index Reaches (G and H)",
    description: "Master the inner reaches of the home row.",
    tips: "Reach your left index finger to G and your right index finger to H. Always snap back to F and J immediately after.",
    content: "fgf jhj fgfjhj asdfg hjkl;",
    words: "had gas hag shag gash hash lag sag glad flag flask gaff half",
  },
  {
    id: "top-row-ei",
    title: "Top Row (E and I)",
    description: "Using your middle fingers to reach the top row.",
    tips: "Your left middle finger moves from D to E. Your right middle finger moves from K to I. Keep other fingers anchored.",
    difficulty: "beginner",
    content: "ded kik ded kik edik edik",
    words:
      "did die fed fig kid side dish fish dele file jade heal deaf desk elas",
  },
  {
    id: "top-row-ru",
    title: "Top Row (R and U)",
    description: "Using index fingers for the upper reaches.",
    tips: "Left index reaches from F to R. Right index reaches from J to U.",
    content: "frf juj frf juj rfju rfju",
    words:
      "rug red rid fur fire user sure rude surge guard urges redder freer rarer",
  },
  {
    id: "top-row-qw-op",
    title: "Top Row (Q W and O P)",
    description: "Using ring and pinky fingers for the top row.",
    tips: "Left ring to W, pinky to Q. Right ring to O, pinky to P. These fingers are weaker, so keep your touch light.",
    content: "sws aqa lol ;p; sws aqa lol ;p;",
    words:
      "was door pool power go loose world paper power proud squad guard judge power world power proud world power proud",
    // words: "was pool power paper proud wasp swop prep work prow pow swap soar",
  },
  {
    id: "top-row-ty",
    title: "Top Row (T and Y)",
    description: "The long index reaches for T and Y.",
    tips: "Left index reaches up and right for T. Right index reaches up and left for Y. Stretch without moving your whole hand.",
    content: "ftf jyj ftf jyj tfjy tfjy",
    words:
      "they that type your toy tray year study truth yesterday judge power quiet quote proud type year study type power year",
    // words: "they that your toy tray year study truth yet type star arty wary jury",
  },
  {
    id: "bottom-row-vm-bc",
    title: "Bottom Row (V M N B C)",
    description: "Reaching down with index and middle fingers.",
    tips: "F to V and B. J to M and N. D to C. Try not to rest your palms on the desk while reaching down.",
    content: "fvf fbf jmj jnj dcd vbmnc",
    words:
      "cave bob mind neck back come move much bean vanish cabin beacon common manage banish beacon manage vanish cabin common",
    // words:
    //   "cave babe bomb back come move much bean cabin common manage vim vane",
  },
  {
    id: "bottom-row-xz-comma",
    title: "Bottom Row (X Z , .)",
    description: "The most difficult reaches: ring and pinky fingers.",
    tips: "S to X, A to Z. K to comma, L to period. Precision is more important than speed here.",
    content: "sxs aza k,k l.l xz,.",
    words: "extra zero zone box axial vex mix max zap zoom sax tax next exit",
  },
  // {
  //   id: "shift-keys",
  //   title: "Shift Keys",
  //   description: "Learning to use the opposite Shift key.",
  //   tips: "If the letter is on the right hand, use the left Shift. If on the left hand, use the right Shift.",
  //   difficulty: "intermediate",
  //   content: "",
  //   words: "Quick Brown Fox Jumps Lazy Dog",
  // },
  {
    id: "comprehensive-basics",
    title: "Basic Sentence",
    description: "Combining all lowercase letters and basic punctuation.",
    tips: "Keep a steady rhythm. It is better to type slowly and steadily than to type fast and pause.",
    content: "the quick brown fox jumps over a lazy dog",
    words: "the quick brown fox jumps over a lazy dog",
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getLessonsByDifficulty(
  difficulty: Lesson["difficulty"],
): Lesson[] {
  return lessons.filter((lesson) => lesson.difficulty === difficulty);
}
