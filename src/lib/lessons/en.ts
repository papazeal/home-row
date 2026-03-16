export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  tips?: string;
  targetWPM?: number;
  difficulty?: string;
}

export const lessons: Lesson[] = [
  {
    id: "home-row",
    title: "Home Row",
    description: "Master the home row keys: A S D F and J K L ;",
    tips: "Place your fingers on the middle row. Use the bumps on F and J to find your position without looking. Keep your wrists slightly elevated.",
    content:
      "aaa sss ddd fff jjj kkk lll ;;; asdf jkl; asdf jkl; asdfjkl; fad dad sad flask falls",
  },
  {
    id: "index-reaches-gh",
    title: "Index Reaches (G and H)",
    description: "Master the inner reaches of the home row.",
    tips: "Reach your left index finger to G and your right index finger to H. Always snap back to F and J immediately after.",
    content:
      "fgf jhj fgf jhj f g f j h j asdfg hjkl; had gas sash flag dash glad glass flags flash gas flag flask falls glad lag",
  },
  {
    id: "top-row-ei",
    title: "Top Row (E and I)",
    description: "Using your middle fingers to reach the top row.",
    tips: "Your left middle finger moves from D to E. Your right middle finger moves from K to I. Keep other fingers anchored.",
    difficulty: "beginner",
    content:
      "ded kik ded kik ed ik ed ik did die fed fig kid side dish fish flies hike field haggle shield field gilded skid jagged high idle slide hide",
  },
  {
    id: "top-row-ru",
    title: "Top Row (R and U)",
    description: "Using index fingers for the upper reaches.",
    tips: "Left index reaches from F to R. Right index reaches from J to U.",
    content:
      "frf juj frf juj rf ju rf ju rug red rid fur fire user sure higher rudder guard rude judge fraud dragged jagged urged huge surge guard",
  },
  {
    id: "top-row-qw-op",
    title: "Top Row (Q W and O P)",
    description: "Using ring and pinky fingers for the top row.",
    tips: "Left ring to W, pinky to Q. Right ring to O, pinky to P. These fingers are weaker, so keep your touch light.",
    content:
      "sws aqa lol ;p; was was door pool power go loose world paper power proud squad guard judge power world power proud world power proud",
  },
  {
    id: "top-row-ty",
    title: "Top Row (T and Y)",
    description: "The long index reaches for T and Y.",
    tips: "Left index reaches up and right for T. Right index reaches up and left for Y. Stretch without moving your whole hand.",
    content:
      "ftf jyj ftf jyj tf jy tf jy they that type your toy tray year study truth yesterday judge power quiet quote proud type year study type power year",
  },
  {
    id: "bottom-row-vm-bc",
    title: "Bottom Row (V M B C)",
    description: "Reaching down with index and middle fingers.",
    tips: "F to V and B. J to M and N. D to C. Try not to rest your palms on the desk while reaching down.",
    content:
      "fvf fbf jmj jnj dcd v b m n c cave bob mind neck back come move much bean vanish cabin beacon common manage banish beacon manage vanish cabin common",
  },
  {
    id: "bottom-row-xz-comma",
    title: "Bottom Row (X Z , .)",
    description: "The most difficult reaches: ring and pinky fingers.",
    tips: "S to X, A to Z. K to comma, L to period. Precision is more important than speed here.",
    content:
      "sxs aza k,k l.l x z , . extra zero size zone mark. look, back. next. box zone. vanish; box; zone; next; look; back; extra; size; zero; mark;",
  },
  {
    id: "shift-keys",
    title: "Shift Keys",
    description: "Learning to use the opposite Shift key.",
    tips: "If the letter is on the right hand, use the left Shift. If on the left hand, use the right Shift.",
    difficulty: "intermediate",
    content:
      "Aa Ss Dd Ff Gg Hh Jj Kk Ll Qq Ww Ee Rr Tt Yy Uu Ii Oo Pp Zz Xx Cc Vv Bb Nn Mm Had Gas Slab Dash Glad Flask Falls Quick Brown Fox Jumps Lazy Dog",
  },
  {
    id: "comprehensive-basics",
    title: "Basic Sentence",
    description: "Combining all lowercase letters and basic punctuation.",
    tips: "Keep a steady rhythm. It is better to type slowly and steadily than to type fast and pause.",
    content:
      "the quick brown fox jumps over the lazy dog. jump high and move fast. study your keys daily.",
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
