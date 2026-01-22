<script lang="ts">
  import {
    getLessons,
    getLessonById,
    type Language,
    type Lesson,
  } from "$lib/lessons";
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import confetti from "canvas-confetti";

  const STORAGE_KEY_LANGUAGE = "homrow-language";
  const STORAGE_KEY_LESSON_ID = "homrow-lesson-id";

  const languages: Language[] = ["en", "th"];

  // Initialize with default values
  let selectedLanguage: Language = "en";
  let lessons: Lesson[] = getLessons("en");
  let selectedLesson: Lesson = lessons[0];
  let userInput = "";
  let startTime: number | null = null;
  let isStarted = false;
  let isFinished = false;

  $: currentCharIndex = userInput.length;
  $: isCorrect = (index: number) =>
    userInput[index] === selectedLesson.content[index];

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
    if (isFinished && event.key === "Enter") {
      const currentIndex = lessons.findIndex((l) => l.id === selectedLesson.id);
      if (currentIndex < lessons.length - 1) {
        event.preventDefault();
        selectLesson(lessons[currentIndex + 1]);
      }
      return;
    }

    // Ignore if lesson is finished
    if (isFinished) return;

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

    // Start timer on first keypress
    if (!isStarted && !event.key.startsWith("F")) {
      startTime = Date.now();
      isStarted = true;
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
    const expectedChar = selectedLesson.content[userInput.length];

    // Stop if we've reached the end
    if (!expectedChar) return;

    // Add the character (allow typing even if wrong for better UX)
    userInput += event.key;

    // Check if lesson is completed
    if (userInput.length === selectedLesson.content.length) {
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
    if (!startTime) return;

    isFinished = true;
    playSuccessMelody();
    triggerConfetti();
  }

  function resetLesson() {
    userInput = "";
    startTime = null;
    isStarted = false;
    isFinished = false;
  }

  function selectLesson(lesson: Lesson) {
    selectedLesson = lesson;
    resetLesson();
    saveToStorage();
  }

  onMount(() => {
    loadFromStorage();
    if (browser) {
      window.addEventListener("keydown", handleKeydown);
    }
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener("keydown", handleKeydown);
    }
  });
</script>

<div class="bg-white p-8 flex flex-col justify-center md:min-h-[70lvh]">
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
              class="w-2.5 h-2.5 rounded-full transition-colors bg-gray-200 cursor-pointer
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
        class="my-14 bg-white text-center text-3xl leading-relaxed relative cursor-text transition-all outline-0"
        class:font-mono={selectedLanguage == "en"}
        role="textbox"
        tabindex="0"
      >
        {#each selectedLesson.content.split("") as char, index}
          {@const isSpace = char === " "}
          <span
            class="relative transition-all duration-150 inline-block"
            class:text-green-600={index < userInput.length && isCorrect(index)}
            class:bg-red-100={index < userInput.length && !isCorrect(index)}
            class:text-gray-400={index > currentCharIndex || isFinished}
            class:font-bold-={index === currentCharIndex && !isFinished}
            class:whitespace-pre={isSpace}
            class:w-4={isSpace}
            class:font-mono={char !=
              selectedLesson.content.split("")[index + 1] &&
              char != selectedLesson.content.split("")[index - 1]}
          >
            {char}
            {#if index === currentCharIndex && !isFinished}
              <span
                class="absolute right-0 top-0 bottom-0 w-full bg-gray-500/10 animate-pulse"
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
        {#if !isFinished}
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
        {/if}
        {#if isFinished}
          <div class="flex gap-2">
            <div>Proceed</div>
            <button
              onclick={() => {
                const currentIndex = lessons.findIndex(
                  (l) => l.id === selectedLesson.id,
                );
                if (currentIndex < lessons.length - 1)
                  selectLesson(lessons[currentIndex + 1]);
              }}
              class="text-gray-600 cursor-pointer flex items-center gap-1"
            >
              <kbd
                class="px-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded"
                >Enter</kbd
              >
            </button>
          </div>
        {/if}
      </div>

      <!-- Language Selector -->
      <div class="mt-8">
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
