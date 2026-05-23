<template>
  <section id="introduction" class="section">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="introduction font-display font-extrabold text-center mt-5 mb-6 text-[30px] mobile:text-[30px] tablet:text-[40px] text-[#333]">
        {{ t.name }}
      </h1>

      <h2 class="strapline text-[14px] mobile:text-[14px] tablet:text-[18px] font-light text-[#888] leading-[1.5] max-w-3xl mx-auto mb-5 shadow-white font-display">
        {{ t.strapline }}
      </h2>

      <h4 class="strapline text-[14px] text-[#555] mb-4">
        Email: 1097692918@qq.com
      </h4>

      <!-- Social Links -->
      <nav id="social" class="mb-4">
        <ul id="social-icons" class="flex justify-center gap-4 flex-wrap">
          <li v-for="social in socialLinks" :key="social.name">
            <a :href="social.url" target="_blank" rel="noopener" :class="social.name" class="transition-transform hover:scale-110">
              {{ social.label[currentLocale] }}
            </a>
          </li>
        </ul>
      </nav>

      <!-- Environmental Message -->
      <p class="text-green-600 text-center my-3 flex items-center justify-center gap-2">
        <span class="heart-container inline-block">
          <canvas ref="heartCanvas" width="18" height="18"></canvas>
        </span>
        {{ t.env_message }}
        <span class="heart-container inline-block">
          <canvas ref="heartCanvas2" width="18" height="18"></canvas>
        </span>
      </p>

      <!-- Earth Canvas -->
      <div class="earth-container h-10 flex justify-center">
        <canvas ref="earthCanvas" width="40" height="40"></canvas>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLocale } from '../composables/useLocale'
import socialLinks from '../data/socialLinks'
import { useHeart } from '../canvas/useHeart'
import { useEarth } from '../canvas/useEarth'

const { t, currentLocale } = useLocale()

const heartCanvas = ref(null)
const heartCanvas2 = ref(null)
const earthCanvas = ref(null)

onMounted(() => {
  if (heartCanvas.value) useHeart(heartCanvas.value, { width: 18, height: 18, scale: 0.5 })
  if (heartCanvas2.value) useHeart(heartCanvas2.value, { width: 18, height: 18, scale: 0.5 })
  if (earthCanvas.value) useEarth(earthCanvas.value, { width: 40, height: 40 })
})
</script>
