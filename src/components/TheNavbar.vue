<template>
  <nav class="navbar-glass fixed top-0 left-0 right-0 z-50">
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Brand -->
        <div class="font-mono text-xs tracking-widest uppercase text-[var(--text-muted)]">
          <span class="text-[var(--accent)]">&gt;</span> {{ t.nav_resume }}
        </div>

        <!-- Desktop Nav -->
        <ul class="hidden sm:flex items-center gap-8">
          <li v-for="link in navLinks" :key="link.id">
            <a :href="`#${link.id}`" @click.prevent="scrollToSection(link.id)" class="font-mono text-xs tracking-wider uppercase text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-300">
              {{ link.label }}
            </a>
          </li>
          <li>
            <router-link :to="currentLocale === 'zh' ? '/en' : '/zh'" class="font-mono text-xs tracking-wider uppercase px-3 py-1.5 rounded border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300">
              {{ currentLocale === 'zh' ? 'EN' : '中文' }}
            </router-link>
          </li>
        </ul>

        <!-- Mobile Hamburger -->
        <button @click="mobileOpen = !mobileOpen" class="sm:hidden text-[var(--text-secondary)] p-2 focus:outline-none" aria-label="Toggle navigation">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition name="mobile-menu">
        <div v-show="mobileOpen" class="sm:hidden py-4 border-t border-[var(--border)]">
          <ul class="flex flex-col gap-3">
            <li v-for="link in navLinks" :key="link.id">
              <a :href="`#${link.id}`" @click.prevent="scrollToSection(link.id); mobileOpen = false" class="font-mono text-xs tracking-wider uppercase text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors block py-2">
                {{ link.label }}
              </a>
            </li>
            <li>
              <router-link :to="currentLocale === 'zh' ? '/en' : '/zh'" @click="mobileOpen = false" class="font-mono text-xs tracking-wider uppercase text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors block py-2">
                {{ currentLocale === 'zh' ? 'EN' : '中文' }}
              </router-link>
            </li>
          </ul>
        </div>
      </transition>
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

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
