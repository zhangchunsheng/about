<template>
  <div class="min-h-screen bg-[#f1f2f6] font-sans text-[#333] text-[11px] leading-[1.28]">
    <TheNavbar />
    <router-view />
    <BackToTop />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import TheNavbar from './components/TheNavbar.vue'
import BackToTop from './components/BackToTop.vue'

onMounted(() => {
  // Google AdSense
  const adsense = document.createElement('script')
  adsense.async = true
  adsense.crossOrigin = 'anonymous'
  adsense.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6096731848877113'
  document.head.appendChild(adsense)

  // Google Analytics (legacy)
  const gaqCode = `var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-31588662-3']);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();`
  const gaScript = document.createElement('script')
  gaScript.textContent = gaqCode
  document.head.appendChild(gaScript)

  // Baidu Analytics
  const baiduCode = `var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?12a0d13963b589e9095ccecdd327f3fa";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();`
  const baiduScript = document.createElement('script')
  baiduScript.textContent = baiduCode
  document.head.appendChild(baiduScript)
})
</script>
