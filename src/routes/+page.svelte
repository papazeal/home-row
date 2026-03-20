<script lang="ts">
  import {
    getLessons,
    getLessonById,
    type Language,
    type Lesson,
  } from "$lib/lessons";
  import { browser } from "$app/environment";
  import confetti from "canvas-confetti";

  const STORAGE_KEY_LANGUAGE = "homrow-language";
  const STORAGE_KEY_LESSON_ID = "homrow-lesson-id";

  const languages: Language[] = ["en", "th"];

  let selectedLanguage = $state<Language>("en");
  let lessons = $state<Lesson[]>(getLessons("en"));
  let selectedLesson = $state<Lesson>(getLessons("en")[0]);
  let userInput = $state("");

  let isStarted = $state(false);
  let isFinished = $state(false);
  let shuffleKey = $state(0);

  let currentCharIndex = $derived(userInput.length);
  let isCorrect = $derived(
    (index: number) => userInput[index] === currentContent[index],
  );

  let currentContent = $derived.by(() => {
    void shuffleKey;
    const words = selectedLesson.words?.split(" ");
    if (!words) return selectedLesson.content;
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    // return shuffled.slice(0, 10).join(" ");
    return selectedLesson.content + " " + shuffled.slice(0, 10).join(" ");
  });

  function loadFromStorage() {
    if (!browser) return;

    const savedLanguage = localStorage.getItem(
      STORAGE_KEY_LANGUAGE,
    ) as Language;
    const savedLessonId = localStorage.getItem(STORAGE_KEY_LESSON_ID);

    if (savedLanguage === "en" || savedLanguage === "th") {
      selectedLanguage = savedLanguage;
    }

    lessons = getLessons(selectedLanguage);

    if (savedLessonId) {
      const lesson = getLessonById(selectedLanguage, savedLessonId);
      if (lesson) {
        selectedLesson = lesson;
      } else {
        selectedLesson = lessons[0];
      }
    } else {
      selectedLesson = lessons[0];
    }
  }

  function saveToStorage() {
    if (!browser) return;
    localStorage.setItem(STORAGE_KEY_LANGUAGE, selectedLanguage);
    localStorage.setItem(STORAGE_KEY_LESSON_ID, selectedLesson.id);
  }

  function switchLanguage(language: Language) {
    selectedLanguage = language;
    lessons = getLessons(language);
    selectedLesson = lessons[0];
    resetLesson();
    saveToStorage();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      resetLesson();
      return;
    }

    // Handle navigation shortcuts
    if (event.key === "ArrowLeft") {
      const currentIndex = lessons.findIndex((l) => l.id === selectedLesson.id);
      if (currentIndex > 0) {
        event.preventDefault();
        selectLesson(lessons[currentIndex - 1]);
      }
      return;
    }

    if (event.key === "ArrowRight") {
      const currentIndex = lessons.findIndex((l) => l.id === selectedLesson.id);
      if (currentIndex < lessons.length - 1) {
        event.preventDefault();
        selectLesson(lessons[currentIndex + 1]);
      }
      return;
    }

    // Handle keyboard shortcuts
    if (event.key === "Tab") {
      event.preventDefault();
      selectLesson(selectedLesson);
      return;
    }

    // Handle backspace
    if (event.key === "Backspace") {
      if (userInput.length > 0) {
        userInput = userInput.slice(0, -1);
      }
      event.preventDefault();
      return;
    }

    // Ignore modifier keys
    if (event.ctrlKey || event.altKey || event.metaKey) return;
    // Ignore non-character keys
    if (event.key.length !== 1) return;

    // Get the expected character
    const expectedChar = currentContent[userInput.length];

    // Stop if we've reached the end
    if (!expectedChar) return;

    // Add the character (allow typing even if wrong for better UX)
    userInput += event.key;

    // Check if lesson is completed
    if (userInput.length === currentContent.length) {
      finishLesson();
    }

    event.preventDefault();
  }

  function playSuccessMelody() {
    if (!browser) return;

    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (C major chord arpeggio)
    const duration = 0.15;

    notes.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = freq;
      oscillator.type = "sine";

      const startTime = audioContext.currentTime + index * duration;
      const endTime = startTime + duration;

      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, endTime);

      oscillator.start(startTime);
      oscillator.stop(endTime);
    });
  }

  function triggerConfetti() {
    if (!browser) return;
    confetti();
  }

  function finishLesson() {
    isFinished = true;
    playSuccessMelody();
    triggerConfetti();
  }

  function resetLesson() {
    userInput = "";
    isStarted = false;
    isFinished = false;
    shuffleKey++;
  }

  function selectLesson(lesson: Lesson) {
    selectedLesson = lesson;
    resetLesson();
    saveToStorage();
  }

  $effect(() => {
    loadFromStorage();
    if (browser) {
      window.addEventListener("keydown", handleKeydown);
    }
    return () => {
      if (browser) {
        window.removeEventListener("keydown", handleKeydown);
      }
    };
  });
</script>

<div class="bg-white p-8 flex flex-col justify-center md:min-h-dvh pb-30">
  <div class="max-w-3xl mx-auto">
    <!-- Main Typing Area -->
    <div class="">
      <div class="text-center">
        <h3 class="text-2xl text-gray-900 mb-2 font-mono">
          {selectedLesson.title}
        </h3>
        <p class="text-gray-400 text-lg">{selectedLesson.description}</p>
        <div class="flex gap-2 justify-center mt-4">
          {#each lessons as lesson, index}
            <button
              onclick={() => selectLesson(lesson)}
              aria-label="Lesson {index + 1}"
              class="w-4.5 h-2.5 rounded-full transition-colors bg-gray-200 cursor-pointer
                   {selectedLesson.id === lesson.id
                ? 'bg-green-600!'
                : 'hover:border-gray-300'}"
            >
            </button>
          {/each}
        </div>
      </div>

      <!-- Target Text Display -->

      <div
        class="my-16 bg-white text-center text-4xl leading-relaxed relative cursor-text transition-all outline-0"
        class:font-mono={selectedLanguage == "en"}
        role="textbox"
        tabindex="0"
      >
        {#each currentContent.split("") as char, index}
          {@const isSpace = char === " "}
          {@const isAlone =
            currentContent.split("")[index - 1] == " " &&
            currentContent.split("")[index + 1] == " "}
          <span
            class="relative transition-all duration-150 inline-block"
            class:text-green-600={index < userInput.length && isCorrect(index)}
            class:bg-red-100={index < userInput.length && !isCorrect(index)}
            class:text-gray-400={index > currentCharIndex || isFinished}
            class:font-bold-={index === currentCharIndex && !isFinished}
            class:whitespace-pre={isSpace}
            class:w-4={isSpace}
            class:font-mono={char != currentContent.split("")[index + 1] &&
              char != currentContent.split("")[index - 1] &&
              !isAlone}
          >
            {char}
            {#if index === currentCharIndex && !isFinished}
              <span
                class="absolute right-0 top-0 bottom-0 min-w-3 w-full bg-gray-500/10 animate-pulse"
                style="animation: blink 1s infinite;"
              ></span>
            {/if}
          </span>
        {/each}
      </div>

      <style>
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
      </style>

      <!-- Focus Indicator -->
      <div class="mb-4 flex justify-center gap-8 items-center flex-wrap">
        <div class="flex gap-2">
          <div>Restart</div>
          <button
            onclick={resetLesson}
            class="text-gray-600 cursor-pointer flex items-center gap-1 outline-0"
          >
            <kbd
              class="px-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded mx-1"
              >ESC</kbd
            >
          </button>
        </div>

        <div class="flex gap-2">
          <div class="mr-2">Prev / Next Lesson</div>
          <button
            onclick={() => {
              const currentIndex = lessons.findIndex(
                (l) => l.id === selectedLesson.id,
              );
              if (currentIndex > 0) selectLesson(lessons[currentIndex - 1]);
            }}
            class="text-gray-600 cursor-pointer flex items-center gap-1 outline-0"
          >
            <kbd
              class="px-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded"
              >←</kbd
            >
          </button>
          <button
            onclick={() => {
              const currentIndex = lessons.findIndex(
                (l) => l.id === selectedLesson.id,
              );
              if (currentIndex < lessons.length - 1)
                selectLesson(lessons[currentIndex + 1]);
            }}
            class="text-gray-600 cursor-pointer flex items-center gap-1 outline-0"
          >
            <kbd
              class="px-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded"
              >→</kbd
            >
          </button>
        </div>
      </div>

      <!-- Language Selector -->
      <div class="mt-6">
        <div class="flex gap-2 justify-center">
          <div class="mr-2">Language</div>
          {#each languages as lang}
            <button
              onclick={() => switchLanguage(lang)}
              class="px-2 rounded cursor-pointer bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 uppercase {selectedLanguage ===
              lang
                ? 'bg-green-600! text-white border-0'
                : ''}"
            >
              {lang}
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
