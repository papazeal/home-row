<script lang="ts">
  import { lessons, type Lesson } from "$lib/lessons";
  import { calculateStats, type TypingStats } from "$lib/stats";
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import confetti from "canvas-confetti";

  let selectedLesson: Lesson = lessons[0];
  let userInput = "";
  let startTime: number | null = null;
  let endTime: number | null = null;
  let stats: TypingStats | null = null;
  let isStarted = false;
  let isFinished = false;
  let isFocused = false;

  $: currentCharIndex = userInput.length;
  $: isCorrect = (index: number) =>
    userInput[index] === selectedLesson.content[index];

  $: lessonIndex = lessons.findIndex((l) => l.id === selectedLesson.id);

  function handleKeydown(event: KeyboardEvent) {
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

    if (event.key === "Escape") {
      event.preventDefault();
      resetLesson();
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

    endTime = Date.now();
    stats = calculateStats(
      userInput,
      selectedLesson.content,
      startTime,
      endTime
    );
    isFinished = true;
    playSuccessMelody();
    triggerConfetti();
  }

  function resetLesson() {
    userInput = "";
    startTime = null;
    endTime = null;
    stats = null;
    isStarted = false;
    isFinished = false;
  }

  function selectLesson(lesson: Lesson) {
    selectedLesson = lesson;
    resetLesson();
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  function handleClick() {
    isFocused = true;
  }

  onMount(() => {
    if (browser) {
      window.addEventListener("keydown", handleKeydown);
      window.addEventListener("click", handleClick);
    }
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("click", handleClick);
    }
  });
</script>

<div class="min-h-screen bg-white p-8">
  <div class="max-w-3xl mx-auto">
    <!-- Header -->
    <header class="text-center mb-12 hidden">
      <h1 class="text-3xl font-light text-gray-900 mb-2">Typing</h1>
      <p class="text-gray-600">basic typing practice</p>
    </header>

    <!-- Main Typing Area -->
    <div class="">
      <div class="text-center">
        <h3 class="text-3xl text-gray-900 mb-2">
          {selectedLesson.title}
        </h3>
        <p class=" text-gray-400 text-lg">{selectedLesson.description}</p>
        <div class="flex gap-2 justify-center mt-4">
          {#each lessons as lesson}
            <button
              onclick={() => selectLesson(lesson)}
              class="w-2.5 h-2.5 text-left border rounded-full transition-colors border-0 bg-gray-200 cursor-pointer
                   {selectedLesson.id === lesson.id
                ? ' !bg-green-600'
                : ' hover:border-gray-300 '}"
            >
            </button>
          {/each}
        </div>
      </div>

      <!-- Target Text Display -->
      <div
        class="my-14 bg-white rounded-lg border-0 text-center border-gray-200 font-mono text-3xl leading-relaxed relative cursor-text transition-all flex flex-wrap outline-0"
        role="textbox"
        tabindex="0"
      >
        <div class="relative">
          {#each selectedLesson.content.split("") as char, index}
            {@const isSpace = char === " "}
            <span
              class="relative transition-all duration-150 inline-block"
              class:text-green-600={index < userInput.length &&
                isCorrect(index)}
              class:bg-red-100={index < userInput.length && !isCorrect(index)}
              class:text-gray-400={index > currentCharIndex || isFinished}
              class:font-bold-={index === currentCharIndex && !isFinished}
              class:whitespace-pre={isSpace}
              class:w-4={isSpace}
              class:bg-gray-100-={index === currentCharIndex}
            >
              {char}
              {#if index === currentCharIndex && !isFinished}
                <span
                  class="absolute left-0 top-0 bottom-0 w-full bg-gray-500/10 animate-pulse"
                  style="animation: blink 1s infinite;"
                ></span>
              {/if}
            </span>
          {/each}
        </div>
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
        {#if isFinished}
          <div class="text-gray-600">
            Press <kbd
              class="px-2 py-1 bg-gray-100 border border-gray-300 rounded mx-1"
              >Enter</kbd
            > to proceed
          </div>
        {/if}
        {#if !isFinished}
          <div class="text-gray-600">
            <kbd
              class="px-2 py-1 bg-gray-100 border border-gray-300 rounded mr-1"
              >←</kbd
            >
            <kbd
              class="px-2 py-1 bg-gray-100 border border-gray-300 rounded mx-1"
              >→</kbd
            >
            prev / next lessons
          </div>
          <div class="text-gray-600 hidden">
            Press <kbd
              class="px-2 py-1 bg-gray-100 border border-gray-300 rounded mx-1"
              >Tab</kbd
            > to restart
          </div>
          <div class="text-gray-600">
            Press <kbd
              class="px-2 py-1 bg-gray-100 border border-gray-300 rounded mx-1"
              >Esc</kbd
            > to reset
          </div>
        {/if}
      </div>
    </div>

    <!-- Lesson Selection -->

    <div class="mb-8 mt-18 hidden">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each lessons as lesson}
          <button
            onclick={() => selectLesson(lesson)}
            class="p-3 text-left border rounded-lg transition-colors
                   {selectedLesson.id === lesson.id
              ? 'border-blue-500 bg-blue-50 text-blue-900'
              : 'border-gray-200 hover:border-gray-300 text-gray-700'}"
          >
            <div class="font-medium text-sm">{lesson.title}</div>
            <div class="text-xs text-gray-500 mt-1 hidden">
              {lesson.description}
            </div>
            <div class="text-xs text-gray-400 mt-1 hidden">
              Target: {lesson.targetWPM} WPM
            </div>
          </button>
        {/each}
      </div>
    </div>

    <!-- Results -->
    {#if stats}
      <div class="bg-green-50 border border-green-200 rounded-lg p-6 hidden">
        <h3 class="text-lg font-medium text-green-900 mb-4">Results</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-green-900">{stats.wpm}</div>
            <div class="text-sm text-green-700">WPM</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-900">
              {stats.accuracy}%
            </div>
            <div class="text-sm text-green-700">Accuracy</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-900">
              {stats.correctChars}
            </div>
            <div class="text-sm text-green-700">Correct Chars</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-900">
              {formatTime(stats.timeElapsed)}
            </div>
            <div class="text-sm text-green-700">Time</div>
          </div>
        </div>
        {#if selectedLesson.targetWPM}
          <div class="mt-4 text-center">
            {#if stats.wpm >= selectedLesson.targetWPM}
              <span class="text-green-700 font-medium">🎉 Target achieved!</span
              >
            {:else}
              <span class="text-yellow-700 font-medium">
                Target: {selectedLesson.targetWPM} WPM (keep practicing!)
              </span>
            {/if}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>
