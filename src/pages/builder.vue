<script setup>
import html2pdf from "html2pdf.js";
import { useOption } from "@/stores/option";
import { onMounted, ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

onMounted(() => {
  addEventListeners();
});
function addEventListeners() {
  const section = document.querySelectorAll("section");
  //   console.log(section);
  //   section.addEventListener("click", (event) => handleEvent(event, "Click"));
  section.forEach((e) => {
    e.addEventListener("click", (event) => handleEvent(event, "click"));
    e.addEventListener("mouseover", (event) => handleEvent(event, "hover"));
    e.addEventListener("mouseleave", (event) => handleEvent(event, "leave"));
  });
}

function handleEvent(e, str) {
  if (str == "click") {
    e.currentTarget.classList.remove("bg-primary/10");
    e.currentTarget.classList.remove("cursor-pointer");
    popup.value = e.currentTarget;

    console.log(popup.value);
    console.log(popup.value.querySelectorAll("span"));
    popup.value.querySelectorAll("span")[0].innerHTML = "TEST";
  }
  if (str == "hover") {
    // console.log(e.currentTarget);
    e.currentTarget.classList.add("bg-primary/10");
    e.currentTarget.classList.add("cursor-pointer");
  }
  if (str == "leave") {
    e.currentTarget.classList.remove("bg-primary/10");
    e.currentTarget.classList.remove("cursor-pointer");
    console.log(e.currentTarget.classList);
  }
}
const popup = ref();
const opt = useOption();
const isOpen = ref(false);
const pdfELement = ref();

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}

function generateReportPrint() {
  // pdfELement.value.window.print();
  window.print();
  // console.log(pdfELement.value);
}

function generateReport() {
  html2pdf(document.getElementById("element-to-convert"), {
    margin: 1,
    filename: "i-was-html.pdf",
  });
}

function changePhoto(event) {
  const files = event.target.files;
  if (files) {
    Array.from(files).forEach((file, index) => {
      if (!file.type.startsWith("image/")) {
        console.error(`File at index ${index} is not an image.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        // modelImage.value = file;
        user.value.image = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }
}

const user = ref({
  image: "/profile.jpg",
  first_name: "Ferry",
  last_name: "Syariffuddin",
  address: "Based in Bojonegoro",
  email: "examplemail123@gmail.com",
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
    "Vocational School Electronics Engineering in SMK N 2 Bojonegoro",
    "Bachelor's degree in Informatics Engineering in Universitas Nahdlatul Ulama Sunan Giri Bojonegoro",
  ],
  experienced: [
    "Vocational School Electronics Engineering in SMK N 2 Bojonegoro",
    "Bachelor's degree in Informatics Engineering in Universitas Nahdlatul Ulama Sunan Giri Bojonegoro",
  ],
  portofolio: [
    "Making some Project like Hello World with Lorem Ipsum Dolor sit amet",
    "Making some Project like Hello World with Lorem Ipsum Dolor sit amet",
  ],
});
</script>
<template>
  <main class="min-h-screen bg-gray-100 text-gray-800">
    <Transition>
      <div
        class="bg-black/20 z-50 fixed top-0 w-screen h-screen"
        @click.self="popup = null"
        v-if="popup"
      >
        <div
          class="max-w-[768px] bg-white max-h-[80vh] p-8 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div v-html="popup.outerHTML"></div>
        </div>
      </div>
    </Transition>
    <div
      ref="pdfELement"
      id="element-to-convert"
      class="max-w-[768px] mx-auto bg-white min-h-screen p-8"
    >
      <section class="flex items-center" id="first">
        <div class="pr-10 pl-5">
          <img
            :src="user.image"
            class="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full"
          />
        </div>
        <div class="grow">
          <div class="uppercase text-2xl font-semibold">
            <span> {{ user.first_name }}</span>
          </div>
          <div class="uppercase text-2xl font-semibold text-gray-500 -mt-2">
            <span>{{ user.last_name }}</span>
          </div>
          <div class="pt-4 text-xs lg:text-base">
            <div>{{ user.address }}</div>
            <div class="font-semibold">{{ user.email }}</div>
            <div class="text-primary font-bold">{{ user.job }}</div>
          </div>
        </div>
      </section>
      <section class="" id="second">
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

      <section class="mt-8" id="eaaa">
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
            <div v-for="(item, index) in user.experienced">
              {{ index + 1 }}. {{ item }}
            </div>
          </div>
        </div>
      </section>

      <section class="mt-8">
        <div class="border-b border-current pb-1">
          <div class="font-bold text-lg uppercase">portofolio</div>
        </div>
        <div class="pt-4">
          <div>
            <div v-for="(item, index) in user.portofolio">
              {{ index + 1 }}. {{ item }}
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="">
      <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div
              class="flex min-h-full items-center justify-center p-4 text-center"
            >
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                  class="w-full max-w-md transform rounded-2xl bg-white pl-6 py-6 text-left align-middle shadow-xl transition-all"
                >
                  <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit Form
                  </DialogTitle>
                  <div class="mt-2 overflow-auto max-h-[600px] pr-8">
                    <div v-for="(item, index) in user" class="mb-4">
                      <span class="capitalize font-semibold">{{
                        index.replace("_", " ")
                      }}</span>
                      <div
                        v-if="
                          Array.isArray(user[index]) ||
                          typeof user[index] === 'object'
                        "
                      >
                        <div v-for="(a, b) in user[index]" class="relative">
                          <input
                            v-model="user[index][b]"
                            type="text"
                            class="w-full border px-4 py-1"
                          />
                          <svg
                            @click="user[index]?.splice(b, 1)"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6 text-rose-600 absolute -right-2 top-1.5 hover:brightness-0 cursor-pointer"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
                            />
                          </svg>
                        </div>

                        <div class="mt-2">
                          <button
                            type="button"
                            class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-2 py-2 text-xs font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            @click="user[index].push('')"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                      <div v-else>
                        <input
                          v-if="index == 'image'"
                          @change="changePhoto($event)"
                          type="file"
                          class="w-full border px-4 py-1"
                        />

                        <input
                          v-else
                          v-model="user[index]"
                          type="text"
                          class="w-full border px-4 py-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="mt-4">
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      @click="closeModal"
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
    <div class="fixed bottom-4 right-4">
      <div class="mb-4">
        <button
          @click="openModal()"
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
      <div class="mb-4">
        <button
          @click="generateReportPrint()"
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
              d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
            />
          </svg>
        </button>
      </div>
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
            d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"
          />
        </svg>
      </button>
    </div>
  </main>
</template>
<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
