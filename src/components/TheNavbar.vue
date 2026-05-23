<template>
  <nav class="navbar-custom fixed top-0 left-0 right-0 z-50 shadow-lg">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex items-center justify-between h-12">
        <!-- Brand -->
        <div class="text-white font-display font-bold text-lg">
          {{ t.nav_resume }}
        </div>

        <!-- Desktop Nav -->
        <ul class="hidden sm:flex items-center space-x-6">
          <li>
            <router-link :to="currentLocale === 'zh' ? '/en' : '/zh'" class="text-white hover:text-brand-green transition font-display">
              <bdo dir="RTL">{{ currentLocale === 'zh' ? 'EN' : '中文' }}</bdo>
            </router-link>
          </li>
          <li v-for="link in navLinks" :key="link.id">
            <a :href="`#${link.id}`" @click.prevent="scrollToSection(link.id)" class="text-white hover:text-brand-green transition font-display">
              <bdo dir="RTL">{{ link.label }}</bdo>
            </a>
          </li>
        </ul>

        <!-- Mobile Hamburger -->
        <button @click="mobileOpen = !mobileOpen" class="sm:hidden text-white p-2 focus:outline-none" aria-label="Toggle navigation">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-show="mobileOpen" class="sm:hidden pb-4">
        <ul class="flex flex-col space-y-2 mt-2">
          <li>
            <router-link :to="currentLocale === 'zh' ? '/en' : '/zh'" @click="mobileOpen = false" class="text-white hover:text-brand-green block py-2 font-display">
              <bdo dir="RTL">{{ currentLocale === 'zh' ? 'EN' : '中文' }}</bdo>
            </router-link>
          </li>
          <li v-for="link in navLinks" :key="link.id">
            <a :href="`#${link.id}`" @click.prevent="scrollToSection(link.id); mobileOpen = false" class="text-white hover:text-brand-green block py-2 font-display">
              <bdo dir="RTL">{{ link.label }}</bdo>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLocale } from '../composables/useLocale'
import { useScroll } from '../composables/useScroll'

const { currentLocale, t } = useLocale()
const { scrollTo } = useScroll()
const mobileOpen = ref(false)

const navLinks = computed(() => [
  { id: 'introduction', label: t.value.nav_intro },
  { id: 'technology', label: t.value.nav_tech },
  { id: 'work', label: t.value.nav_work },
  { id: 'statement', label: t.value.nav_statement },
])

function scrollToSection(id) {
  scrollTo(`#${id}`)
}
</script>
