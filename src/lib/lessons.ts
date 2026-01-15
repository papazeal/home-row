export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  content: string;
  tips?: string;
  targetWPM?: number;
}

export const lessons: Lesson[] = [
  // {
  //   id: "test-home-row",
  //   title: "Home Row",
  //   description: "Master the home row keys: A S D F and J K L ;",
  //   tips: "Place your fingers on the middle row. Use the bumps on F and J to find your position without looking. Keep your wrists slightly elevated.",
  //   difficulty: "beginner",
  //   content: "aaa sss",
  // },
  {
    id: "home-row",
    title: "Home Row",
    description: "Master the home row keys: A S D F and J K L ;",
    tips: "Place your fingers on the middle row. Use the bumps on F and J to find your position without looking. Keep your wrists slightly elevated.",
    difficulty: "beginner",
    content:
      "aaa sss ddd fff jjj kkk lll ;;; asdf jkl; asdf jkl; a s d f j k l ; fad dad slag flask falls",
  },
  {
    id: "index-reaches-gh",
    title: "Index Reaches (G and H)",
    description: "Master the inner reaches of the home row.",
    tips: "Reach your left index finger to G and your right index finger to H. Always snap back to F and J immediately after.",
    difficulty: "beginner",
    content:
      "fgf jhj fgf jhj f g f j h j had gas sash shag dash glad glass flags flash gas lash",
  },
  {
    id: "top-row-ei",
    title: "Top Row (E and I)",
    description: "Using your middle fingers to reach the top row.",
    tips: "Your left middle finger moves from D to E. Your right middle finger moves from K to I. Keep other fingers anchored.",
    difficulty: "beginner",
    content:
      "ded kik ded kik ed ik ed ik did die fed fig kid side dish fish flies hike field",
  },
  {
    id: "top-row-ru",
    title: "Top Row (R and U)",
    description: "Using index fingers for the upper reaches.",
    tips: "Left index reaches from F to R. Right index reaches from J to U.",
    difficulty: "beginner",
    content:
      "frf juj frf juj rf ju rf ju rug red run rid fur fire user sure higher rudder fruit",
  },
  {
    id: "top-row-qw-op",
    title: "Top Row (Q W and O P)",
    description: "Using ring and pinky fingers for the top row.",
    tips: "Left ring to W, pinky to Q. Right ring to O, pinky to P. These fingers are weaker, so keep your touch light.",
    difficulty: "beginner",
    content:
      "sws aqa lol ;p; west quit open pool power quick loose world paper quote proud",
  },
  {
    id: "top-row-ty",
    title: "Top Row (T and Y)",
    description: "The long index reaches for T and Y.",
    tips: "Left index reaches up and right for T. Right index reaches up and left for Y. Stretch without moving your whole hand.",
    difficulty: "beginner",
    content:
      "ftf jyj ftf jyj tf jy tf jy they that type your toy tray year study truth yesterday",
  },
  {
    id: "bottom-row-vm-bc",
    title: "Bottom Row (V M B C)",
    description: "Reaching down with index and middle fingers.",
    tips: "F to V and B. J to M and N. D to C. Try not to rest your palms on the desk while reaching down.",
    difficulty: "intermediate",
    content:
      "fvf fbf jmj jnj dcd v b m n c cave bomb mind neck back come move much bean",
  },
  {
    id: "bottom-row-xz-comma",
    title: "Bottom Row (X Z , .)",
    description: "The most difficult reaches: ring and pinky fingers.",
    tips: "S to X, A to Z. K to comma, L to period. Precision is more important than speed here.",
    difficulty: "intermediate",
    content:
      "sxs aza k,k l.l x z , . extra zero size zone mark. look, back. next. box zone.",
  },
  {
    id: "shift-keys",
    title: "Shift Keys (Capitalization)",
    description: "Learning to use the opposite Shift key.",
    tips: "If the letter is on the right hand, use the left Shift. If on the left hand, use the right Shift.",
    difficulty: "intermediate",
    content:
      "Aa Ss Dd Ff Jj Kk Ll Dad Said Japan Korea France London Paris Idaho Texas",
  },
  {
    id: "comprehensive-basics",
    title: "Basic Sentence Fluency",
    description: "Combining all lowercase letters and basic punctuation.",
    tips: "Keep a steady rhythm. It is better to type slowly and steadily than to type fast and pause.",
    difficulty: "intermediate",
    content:
      "the quick brown fox jumps over the lazy dog. jump high and move fast. study your keys daily.",
  },
  // {
  //   id: "numbers-index",
  //   title: "Numbers (4 5 6 7)",
  //   description: "Master the easiest number reaches using your index fingers.",
  //   tips: "Reach up from F to 4 and 5. Reach up from J to 6 and 7. Try to keep your middle and ring fingers anchored on the home row.",
  //   difficulty: "intermediate",
  //   content:
  //     "f4f f5f j6j j7j 45 67 456 765 47 56 4576 There are 45 birds and 76 trees.",
  // },
  // {
  //   id: "numbers-middle-ring",
  //   title: "Numbers (3 8 2 9)",
  //   description: "Using middle and ring fingers for numbers.",
  //   tips: "D to 3, K to 8. S to 2, L to 9. These are vertical reaches; try not to let your hand drift sideways.",
  //   difficulty: "advanced",
  //   content:
  //     "d3d k8k s2s l9l 38 29 32 89 238 982 3982 The code is 3829. Page 23 and page 89.",
  // },
  // {
  //   id: "numbers-pinky",
  //   title: "Numbers (1 0)",
  //   description: "The outer number reaches using your pinky fingers.",
  //   tips: "A to 1 and ; to 0. The pinky is your weakest finger, so focus on accuracy rather than force.",
  //   difficulty: "advanced",
  //   content:
  //     "a1a ;0; 10 101 010 1001 201 310 410 Level 10 is hard. There are 100 cents in 1 dollar.",
  // },
  // {
  //   id: "symbols-shift-index",
  //   title: "Symbols ($ % ^ &)",
  //   description: "Using the Shift key with the index finger numbers.",
  //   tips: "Hold Right Shift to type $ and %. Hold Left Shift to type ^ and &. Remember: use the opposite hand for Shift!",
  //   difficulty: "advanced",
  //   content:
  //     "F$F F%F J^J J&J $ % ^ & $50 100% Salt & Pepper. Use the 5% discount code.",
  // },
  // {
  //   id: "symbols-common",
  //   title: "Common Symbols (! @ # *)",
  //   description: "Mastering the most used symbols in passwords and emails.",
  //   tips: "Hold Right Shift for ! @ #. Hold Left Shift for * (on the 8 key) and ( ) on 9 and 0.",
  //   difficulty: "advanced",
  //   content:
  //     "A!A S@S D#D K*K ! @ # * Hello! Email me at test@site.com. #1 rated star *.",
  // },
  // {
  //   id: "brackets-quotes",
  //   title: "Brackets and Quotes",
  //   description: "Using the right-side pinky for punctuation.",
  //   tips: "Reach right of the P key for [ ] and right of the L key for ' and \". These keys are all controlled by the right pinky.",
  //   difficulty: "advanced",
  //   content:
  //     'p[p p]p l\'l l"l [brackets] \'single\' "double" [note] It\'s a "great" day.',
  // },
  // {
  //   id: "math-symbols",
  //   title: "Math and Advanced Symbols",
  //   description: "Learning +, -, =, and /.",
  //   tips: "The minus (-) and equals (=) are at the top right. The slash (/) is under the question mark key.",
  //   difficulty: "advanced",
  //   content:
  //     "- = + / 1+1=2. 10/2=5. The cost is -10 dollars. High + Low = Average.",
  // },
  // {
  //   id: "coding-basics",
  //   title: "Coding Basics",
  //   description: "A drill for common syntax characters.",
  //   tips: "This combines reaches from the previous three lessons. Stay calm and keep your rhythm steady.",
  //   difficulty: "advanced",
  //   content:
  //     'if (score > 10) { print("Win!"); } array[0] = 100; user@domain.com #tag',
  // },
];

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getLessonsByDifficulty(
  difficulty: Lesson["difficulty"]
): Lesson[] {
  return lessons.filter((lesson) => lesson.difficulty === difficulty);
}
