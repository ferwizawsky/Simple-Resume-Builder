<script setup>
import html2pdf from "html2pdf.js";
import { useOption } from "@/stores/option";
import { ref } from "vue";
const opt = useOption();
const html2Pdf = ref();

function generateReport() {
  html2pdf(document.getElementById("element-to-convert"), {
    margin: 1,
    filename: "i-was-html.pdf",
  });
}

const user = ref({
  first_name: "Ferry",
  last_name: "Syariffuddin",
  address: "Malo, Bojonegoro",
  email: "ferrysyariffuddin34@gmail.com",
  job: "Fullstack Developer",
  skill_1: [
    "Frontend: Vue.js, Tailwind CSS",
    "Backend: Laravel, Node js",
    "Version Control: Git",
    "RESTful API Development",
    "Responsive Web Design",
    "Cross-Browser Compatibility",
    "Problem Solving and Troubleshooting",
  ],
  skill_2: [
    "Frontend: Vue.js, Tailwind CSS",
    "Backend: Laravel, Node js",
    "Version Control: Git",
    "RESTful API Development",
    "Responsive Web Design",
    "Cross-Browser Compatibility",
    "Problem Solving and Troubleshooting",
  ],
  educational: [
    "Vocational School Electronics Engineering in SMK N 2 Bojonegoro - 2018",
    "Bachelor's degree in Informatics Engineering in Universitas Nahdlatul Ulama Sunan Giri Bojonegoro - 2023",
  ],
});
</script>
<template>
  <main class="min-h-screen bg-gray-100 text-gray-800">
    <div
      id="element-to-convert"
      class="max-w-[768px] mx-auto bg-white min-h-screen p-8"
    >
      <section class="flex items-center">
        <div class="pr-10 pl-5">
          <img src="/profile.jpg" class="w-32 h-32 object-cover rounded-full" />
        </div>
        <div class=" ">
          <div class="uppercase text-2xl font-semibold">
            {{ user.first_name }}
          </div>
          <div class="uppercase text-2xl font-semibold text-gray-500 -mt-2">
            {{ user.last_name }}
          </div>
          <div class="pt-4">
            <div>Based in {{ user.address }}</div>
            <div class="font-semibold">{{ user.email }}</div>
            <div class="text-primary font-bold">{{ user.job }}</div>
          </div>
        </div>
      </section>
      <section class="mt-8">
        <div class="border-b border-current pb-1">
          <div class="font-bold text-lg uppercase">Skill</div>
        </div>
        <div class="grid grid-cols-2 gap-4 pt-4">
          <div>
            <div v-for="item in user.skill_1">* {{ item }}</div>
          </div>
          <div>
            <div v-for="(item, index) in user.skill_2">* {{ item }}</div>
          </div>
        </div>
      </section>

      <section class="mt-8">
        <div class="border-b border-current pb-1">
          <div class="font-bold text-lg uppercase">Educational</div>
        </div>
        <div class="pt-4">
          <div>
            <div v-for="(item, index) in user.educational">
              {{ index + 1 }}. {{ item }}
            </div>
          </div>
        </div>
      </section>

      <section class="mt-8">
        <div class="border-b border-current pb-1">
          <div class="font-bold text-lg uppercase">Experienced</div>
        </div>
        <div class="pt-4">
          <div>
            <div v-for="(item, index) in user.educational">
              {{ index + 1 }}. {{ item }}
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="fixed bottom-4 right-4">
      <button
        @click="generateReport()"
        class="bg-primary p-4 text-white rounded-full hover:brightness-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v12m6-6H6"
          />
        </svg>
      </button>
    </div>
  </main>
</template>
