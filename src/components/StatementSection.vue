<template>
  <section id="statement" class="section">
    <div class="max-w-4xl mx-auto px-4">
      <div class="content">
        <h2 class="text-xl font-bold mb-4">{{ t.statement_ref }}</h2>
        <ul class="space-y-1">
          <li>
            <a href="http://www.facebook.com" class="text-[#3B5998] hover:underline">
              http://www.facebook.com
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLocale } from '../composables/useLocale'

const { t } = useLocale()
</script>
