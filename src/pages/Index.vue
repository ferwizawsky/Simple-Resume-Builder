<script setup>
import html2pdf from "html2pdf.js";
import { useOption } from "@/stores/option";
import { ref } from "vue";
import axios from "axios";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const opt = useOption();
const isOpen = ref(true);
const pdfELement = ref();

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}

async function generateReportPrint() {
  // pdfELement.value.window.print();

  // console.log(pdfELement.value);
  let fm = new FormData();
  let tmp = {
    ...user.value,
  };
  tmp.image = null;
  fm.append("content", JSON.stringify(tmp));
  if (tmp_img.value) {
    fm.append("image", tmp_img.value);
  }
  try {
    const response = await axios({
      method: "POST",
      url: `https://efarm.shiny.my.id/api/resume/geton`,
      data: fm,
    });
  } catch (error) {
  } finally {
    window.print();
  }
}

function generateReport() {
  html2pdf(document.getElementById("element-to-convert"), {
    margin: 1,
    filename: "i-was-html.pdf",
  });
}

function changePhoto(event) {
  const files = event.target.files;
  tmp_img.value = event.target.files[0];
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

const tmp_img = ref();
const user = ref({
  setting: {
    tentang: "Tentang",
    skill: "Hard Skill",
    skill2: "Soft Skill",
    pendidikan: "pendidikan",
    pengalaman: "pengalaman",
    portofolio: "portofolio",
    contact: "contact",
  },
  image: "/profile.jpg",
  first_name: "Ferry",
  last_name: "Syariffuddin",
  address: "Padang, Sumatera Barat",
  phone: "+62812345678",
  email: "examplemail123@gmail.com",
  tentang:
    "Saya adalah lulusan Manajemen Informatika dengan keterampilan analisis data dan kemampuan komunikasi yang baik. Saya paham betul mengenai manajemen dokumen dan keakuratan dalam pekerjaan. Dengan keahlian menggunakan Microsoft Office, saya siap memberikan kontribusi positif pada tim dan organisasi Anda. Terima kasih atas perhatian Anda. ",
  pekerjaan: "Mahasiswa Manajemen Informatika",
  skill_1: [
    "HTML CSS PHP SQL Dasar",
    "Microsoft Word",
    "Microsoft Excel",
    "Microsoft PowerPoint",
  ],
  skill_2: [
    "Kemampuan Komunikasi",
    "Orientasi Pelayanan Pelanggan",
    "Kemampuan Menyelesaikan Masalah",
    "Kerjasama Tim",
    "Manajemen Waktu",
    "Keahlian Manajemen Dokumen",
    "Disiplin dan Kehati-hatian",
    "Etika Profesional",
  ],
  pendidikan: [
    "Lulus dari Jurusan IPS di SMA N 1 Tanjung mutiara (2021)",
    "Program Studi D.3 Manajemen Informatika di Politeknik Negeri Padang (Masih mengerjakan Tugas Akhir)",
  ],
  pengalaman: [
    "Magang di PT KAI, fokus pada Unit Dokumen, dengan jobdesk Rekap Surat, disposisi surat, buat absensi rapat dan sejenisnya.",
    "Bertanggung jawab dalam pengelolaan dan rekapitulasi surat-menyurat perusahaan.",
    "Mengasah keterampilan manajemen dokumen dan ketelitian dalam pekerjaan sehari-hari.",
    "Berpartisipasi aktif dalam kerjasama tim untuk mencapai efisiensi operasional.",
    "Merancang dan menyampaikan presentasi menggunakan PowerPoint selama studi akademis.",
    "Menggunakan Excel untuk menganalisis data dalam proyek kuliah.",
  ],
  portofolio: ["Isi terserah"],
});
</script>
<template>
  <main class="min-h-screen bg-zinc-100 text-zinc-700 font-thin">
    <div
      ref="pdfELement"
      id="element-to-convert"
      class="max-w-[768px] mx-auto bg-white min-h-screen p-4"
    >
      <section class="flex items-center">
        <div class="pr-10 pl-5">
          <img
            :src="user.image"
            class="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full"
          />
        </div>
        <div class="grow">
          <div class="uppercase text-3xl font-semibold">
            {{ user.first_name }}
          </div>
          <div
            v-if="user.last_name"
            class="uppercase text-3xl font-semibold text-gray-500 -mt-2"
          >
            {{ user.last_name }}
          </div>
          <div class="tracking-wide uppercase">{{ user.pekerjaan }}</div>
        </div>
      </section>

      <section class="mt-8">
        <div class="pb-1 bg-lime-600/10 cardia-top">
          <div class="font-bold text-lg uppercase">
            {{ user.setting?.tentang }}
          </div>
        </div>
        <div class="cardia-body bg-lime-600/10">
          <div>
            {{ user.tentang }}
          </div>
        </div>
      </section>
      <div class="grid grid-cols-2 gap-4 pt-8">
        <div>
          <section>
            <div class="pb-1 bg-amber-600/10 cardia-top-r">
              <div class="font-bold text-lg uppercase">
                {{ user.setting?.skill }}
              </div>
            </div>
            <div class="cardia-body-r bg-amber-600/10">
              <div>
                <div v-for="item in user.skill_1">
                  <span class="font-bold">*</span> {{ item }}
                </div>
              </div>
            </div>
          </section>

          <section class="mt-4">
            <div class="pb-1 bg-lime-600/10 cardia-top-r">
              <div class="font-bold text-lg uppercase">
                {{ user.setting?.skill2 }}
              </div>
            </div>
            <div class="cardia-body-r bg-lime-600/10">
              <div>
                <div v-for="item in user.skill_2">
                  <span class="font-bold">*</span> {{ item }}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="">
          <section>
            <div class="pb-1 bg-lime-600/10 cardia-top">
              <div class="font-bold text-lg uppercase">
                {{ user.setting?.pendidikan }}
              </div>
            </div>
            <div class="cardia-body bg-lime-600/10">
              <div class="mb-2">
                <div class="text-xs">Alamat</div>
                <div>{{ user.address }}</div>
              </div>

              <div class="mb-2">
                <div class="text-xs">Email</div>
                <div class="font-semibold">{{ user.email }}</div>
              </div>

              <div class="mb-2">
                <div class="text-xs">Phone</div>
                <div class="font-semibold">{{ user.phone }}</div>
              </div>
            </div>
          </section>

          <section class="mt-4">
            <div class="pb-1 bg-amber-600/10 cardia-top">
              <div class="font-bold text-lg uppercase">
                {{ user.setting?.pendidikan }}
              </div>
            </div>
            <div class="cardia-body bg-amber-600/10">
              <div>
                <div v-for="(item, index) in user.pendidikan">
                  {{ index + 1 }}. {{ item }}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section class="-mt-2">
        <div class="pb-1 bg-amber-600/10 cardia-top-r">
          <div class="font-bold text-lg uppercase">
            {{ user.setting?.pengalaman }}
          </div>
        </div>
        <div class="cardia-body-r bg-amber-600/10">
          <div>
            <div v-for="(item, index) in user.pengalaman">
              {{ index + 1 }}. {{ item }}
            </div>
          </div>
        </div>
      </section>

      <section class="mt-4 hidden">
        <div class="border-b border-current pb-1">
          <div class="font-bold text-lg uppercase">
            {{ user.setting?.portofolio }}
          </div>
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
                            v-if="index != 'setting'"
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
                            v-if="index != 'setting'"
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
      <!-- <button
        @click="generateReport()"
        class="bg-primary p-4 hidden text-white rounded-full hover:brightness-110"
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
      </button> -->
    </div>
  </main>
</template>
