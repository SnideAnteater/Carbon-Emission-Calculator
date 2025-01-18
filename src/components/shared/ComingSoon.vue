<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh]">
    <div class="text-center">
      <h2 class="text-4xl font-bold mb-8 text-white">Coming Soon!</h2>

      <!-- Animated loading message -->
      <div class="mb-8">
        <p class="text-xl animated-text">
          {{ currentMessage }}
          <span class="dots">{{ dots }}</span>
        </p>
      </div>

      <!-- Animated illustration -->
      <div class="relative w-48 h-48 mx-auto">
        <img
          src="../../assets/leaf.svg"
          alt="Scope 3"
          class="w-full h-full object-contain animate-bounce"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComingSoon",
  data() {
    return {
      messages: [
        "Cooking up some calculations",
        "Teaching AI to count carbon",
        "Planting virtual trees",
        "Measuring butterfly effects",
        "Converting coffee to code",
        "Charging sustainable batteries",
        "Recycling old data",
        "Consulting with climate experts",
        "Calculating carbon footprints",
        "Saving the planet, one byte at a time",
      ],
      currentMessageIndex: 0,
      dots: "",
      dotsCount: 0,
    };
  },
  computed: {
    currentMessage() {
      return this.messages[this.currentMessageIndex];
    },
  },
  mounted() {
    // Rotate through messages
    setInterval(this.rotateMessage, 3000);

    // Animate dots
    setInterval(this.animateDots, 500);
  },
  methods: {
    rotateMessage() {
      this.currentMessageIndex =
        (this.currentMessageIndex + 1) % this.messages.length;
    },
    animateDots() {
      this.dotsCount = (this.dotsCount + 1) % 4;
      this.dots = ".".repeat(this.dotsCount);
    },
  },
};
</script>

<style scoped>
.dots {
  display: inline-block;
  min-width: 24px;
  text-align: left;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(-5%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes colorChange {
  0% {
    color: #60a5fa;
  } /* Blue */
  25% {
    color: #34d399;
  } /* Green */
  50% {
    color: #f87171;
  } /* Red */
  75% {
    color: #fbbf24;
  } /* Yellow */
  100% {
    color: #60a5fa;
  } /* Back to Blue */
}

.animated-text {
  animation: colorChange 8s infinite;
  font-weight: 500;
}
</style>
