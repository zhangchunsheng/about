<template>
  <a
    v-show="showBackToTop"
    href="#introduction"
    id="to-top-button"
    class="fixed z-50 w-10 h-10 bottom-5 right-5 rounded-full transition-opacity duration-300"
    :style="{ backgroundImage: 'url(/images/back-to-top.png)', backgroundRepeat: 'no-repeat', backgroundSize: '80px 40px' }"
    @click.prevent="scrollToTop"
    :title="t.back_to_top"
  ></a>
</template>

<script setup>
import { useScroll } from '../composables/useScroll'
import { useLocale } from '../composables/useLocale'

const { showBackToTop, scrollToTop } = useScroll()
const { t } = useLocale()
</script>
