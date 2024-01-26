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
    tentang: "Profile",
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
      <section class="flex items-center p-4">
        <div class="pr-10 pl-5 relative">
          <svg
            class="w-[90px] absolute top-1 left-1 rotate-[320deg]"
            viewBox="0 0 305 609"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M304.5 5.2113e-06C223.742 1.6924e-05 146.291 32.0812 89.1861 89.186C32.0812 146.291 9.22809e-05 223.742 9.78965e-05 304.5C0.000103512 385.258 32.0813 462.709 89.1861 519.814C146.291 576.919 223.742 609 304.5 609L304.5 559.526C236.863 559.526 171.996 532.657 124.17 484.83C76.3431 437.004 49.4744 372.137 49.4744 304.5C49.4744 236.863 76.3431 171.996 124.17 124.17C171.996 76.3431 236.863 49.4743 304.5 49.4743L304.5 5.2113e-06Z"
              class="fill-lime-600/50"
            />
          </svg>

          <img
            :src="user.image"
            class="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full relative"
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

      <section class="mt-8 p-4">
        <div class="pb-1">
          <div class="font-medium tracking-widest text-lg uppercase">
            <button
              class="px-6 flex uppercase items-center bg-lime-600/50 py-1 rounded-full text-white"
            >
              <svg
                class="mr-2"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.8 1L2.74967 0.99997C2.52122 0.999752 2.32429 0.999564 2.14983 1.04145C1.60136 1.17312 1.17312 1.60136 1.04145 2.14983C0.999564 2.32429 0.999752 2.52122 0.99997 2.74967L1 2.8V5.2L0.99997 5.25033C0.999752 5.47878 0.999564 5.67572 1.04145 5.85017C1.17312 6.39864 1.60136 6.82688 2.14983 6.95856C2.32429 7.00044 2.52122 7.00025 2.74967 7.00003L2.8 7H5.2L5.25033 7.00003C5.47878 7.00025 5.67572 7.00044 5.85017 6.95856C6.39864 6.82688 6.82688 6.39864 6.95856 5.85017C7.00044 5.67572 7.00025 5.47878 7.00003 5.25033L7 5.2V2.8L7.00003 2.74967C7.00025 2.52122 7.00044 2.32429 6.95856 2.14983C6.82688 1.60136 6.39864 1.17312 5.85017 1.04145C5.67572 0.999564 5.47878 0.999752 5.25033 0.99997L5.2 1H2.8ZM2.38328 2.01382C2.42632 2.00348 2.49222 2 2.8 2H5.2C5.50779 2 5.57369 2.00348 5.61672 2.01382C5.79955 2.05771 5.94229 2.20045 5.98619 2.38328C5.99652 2.42632 6 2.49222 6 2.8V5.2C6 5.50779 5.99652 5.57369 5.98619 5.61672C5.94229 5.79955 5.79955 5.94229 5.61672 5.98619C5.57369 5.99652 5.50779 6 5.2 6H2.8C2.49222 6 2.42632 5.99652 2.38328 5.98619C2.20045 5.94229 2.05771 5.79955 2.01382 5.61672C2.00348 5.57369 2 5.50779 2 5.2V2.8C2 2.49222 2.00348 2.42632 2.01382 2.38328C2.05771 2.20045 2.20045 2.05771 2.38328 2.01382ZM9.8 1L9.74967 0.99997C9.52122 0.999752 9.32429 0.999564 9.14983 1.04145C8.60136 1.17312 8.17312 1.60136 8.04145 2.14983C7.99956 2.32429 7.99975 2.52122 7.99997 2.74967L8 2.8V5.2L7.99997 5.25033C7.99975 5.47878 7.99956 5.67572 8.04145 5.85017C8.17312 6.39864 8.60136 6.82688 9.14983 6.95856C9.32429 7.00044 9.52122 7.00025 9.74967 7.00003L9.8 7H12.2L12.2503 7.00003C12.4788 7.00025 12.6757 7.00044 12.8502 6.95856C13.3986 6.82688 13.8269 6.39864 13.9586 5.85017C14.0004 5.67572 14.0003 5.47878 14 5.25033L14 5.2V2.8L14 2.74967C14.0003 2.52122 14.0004 2.32429 13.9586 2.14983C13.8269 1.60136 13.3986 1.17312 12.8502 1.04145C12.6757 0.999564 12.4788 0.999752 12.2503 0.99997L12.2 1H9.8ZM9.38328 2.01382C9.42632 2.00348 9.49222 2 9.8 2H12.2C12.5078 2 12.5737 2.00348 12.6167 2.01382C12.7995 2.05771 12.9423 2.20045 12.9862 2.38328C12.9965 2.42632 13 2.49222 13 2.8V5.2C13 5.50779 12.9965 5.57369 12.9862 5.61672C12.9423 5.79955 12.7995 5.94229 12.6167 5.98619C12.5737 5.99652 12.5078 6 12.2 6H9.8C9.49222 6 9.42632 5.99652 9.38328 5.98619C9.20045 5.94229 9.05771 5.79955 9.01382 5.61672C9.00348 5.57369 9 5.50779 9 5.2V2.8C9 2.49222 9.00348 2.42632 9.01382 2.38328C9.05771 2.20045 9.20045 2.05771 9.38328 2.01382ZM2.74967 7.99997L2.8 8H5.2L5.25033 7.99997C5.47878 7.99975 5.67572 7.99956 5.85017 8.04145C6.39864 8.17312 6.82688 8.60136 6.95856 9.14983C7.00044 9.32429 7.00025 9.52122 7.00003 9.74967L7 9.8V12.2L7.00003 12.2503C7.00025 12.4788 7.00044 12.6757 6.95856 12.8502C6.82688 13.3986 6.39864 13.8269 5.85017 13.9586C5.67572 14.0004 5.47878 14.0003 5.25033 14L5.2 14H2.8L2.74967 14C2.52122 14.0003 2.32429 14.0004 2.14983 13.9586C1.60136 13.8269 1.17312 13.3986 1.04145 12.8502C0.999564 12.6757 0.999752 12.4788 0.99997 12.2503L1 12.2V9.8L0.99997 9.74967C0.999752 9.52122 0.999564 9.32429 1.04145 9.14983C1.17312 8.60136 1.60136 8.17312 2.14983 8.04145C2.32429 7.99956 2.52122 7.99975 2.74967 7.99997ZM2.8 9C2.49222 9 2.42632 9.00348 2.38328 9.01382C2.20045 9.05771 2.05771 9.20045 2.01382 9.38328C2.00348 9.42632 2 9.49222 2 9.8V12.2C2 12.5078 2.00348 12.5737 2.01382 12.6167C2.05771 12.7995 2.20045 12.9423 2.38328 12.9862C2.42632 12.9965 2.49222 13 2.8 13H5.2C5.50779 13 5.57369 12.9965 5.61672 12.9862C5.79955 12.9423 5.94229 12.7995 5.98619 12.6167C5.99652 12.5737 6 12.5078 6 12.2V9.8C6 9.49222 5.99652 9.42632 5.98619 9.38328C5.94229 9.20045 5.79955 9.05771 5.61672 9.01382C5.57369 9.00348 5.50779 9 5.2 9H2.8ZM9.8 8L9.74967 7.99997C9.52122 7.99975 9.32429 7.99956 9.14983 8.04145C8.60136 8.17312 8.17312 8.60136 8.04145 9.14983C7.99956 9.32429 7.99975 9.52122 7.99997 9.74967L8 9.8V12.2L7.99997 12.2503C7.99975 12.4788 7.99956 12.6757 8.04145 12.8502C8.17312 13.3986 8.60136 13.8269 9.14983 13.9586C9.32429 14.0004 9.52122 14.0003 9.74967 14L9.8 14H12.2L12.2503 14C12.4788 14.0003 12.6757 14.0004 12.8502 13.9586C13.3986 13.8269 13.8269 13.3986 13.9586 12.8502C14.0004 12.6757 14.0003 12.4788 14 12.2503L14 12.2V9.8L14 9.74967C14.0003 9.52122 14.0004 9.32429 13.9586 9.14983C13.8269 8.60136 13.3986 8.17312 12.8502 8.04145C12.6757 7.99956 12.4788 7.99975 12.2503 7.99997L12.2 8H9.8ZM9.38328 9.01382C9.42632 9.00348 9.49222 9 9.8 9H12.2C12.5078 9 12.5737 9.00348 12.6167 9.01382C12.7995 9.05771 12.9423 9.20045 12.9862 9.38328C12.9965 9.42632 13 9.49222 13 9.8V12.2C13 12.5078 12.9965 12.5737 12.9862 12.6167C12.9423 12.7995 12.7995 12.9423 12.6167 12.9862C12.5737 12.9965 12.5078 13 12.2 13H9.8C9.49222 13 9.42632 12.9965 9.38328 12.9862C9.20045 12.9423 9.05771 12.7995 9.01382 12.6167C9.00348 12.5737 9 12.5078 9 12.2V9.8C9 9.49222 9.00348 9.42632 9.01382 9.38328C9.05771 9.20045 9.20045 9.05771 9.38328 9.01382Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
              {{ user.setting?.tentang }}
            </button>
          </div>
        </div>
        <div class="pt-2">
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                <div
                  v-for="item in user.skill_1"
                  class="flex items-center flex-wrap"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="3"
                    stroke="currentColor"
                    class="w-3 h-3 mr-2 text-amber-600/60"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                    />
                  </svg>
                  {{ item }}
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
                <div
                  v-for="item in user.skill_2"
                  class="flex items-center flex-wrap"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="3"
                    stroke="currentColor"
                    class="w-3 h-3 mr-2 text-lime-600/60"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                    />
                  </svg>
                  {{ item }}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="">
          <section>
            <div class="pb-1 cardia-top">
              <div class="font-bold text-lg text-lime-600/70 uppercase">
                {{ user.setting?.contact }}
              </div>
            </div>
            <div class="cardia-body pt-1 grid grid-cols-1 gap-y-1">
              <div class=" ">
                <div class="text-xs">Alamat</div>
                <div>{{ user.address }}</div>
              </div>

              <div class=" ">
                <div class="text-xs">Email</div>
                <div class="font-semibold">{{ user.email }}</div>
              </div>

              <div class=" ">
                <div class="text-xs">Phone</div>
                <div class="font-semibold">{{ user.phone }}</div>
              </div>
            </div>
          </section>

          <section class="mt-4">
            <div class="pb-1 cardia-top">
              <div class="font-bold text-lg uppercase text-lime-600/70">
                {{ user.setting?.pendidikan }}
              </div>
            </div>
            <div class="cardia-body pt-1">
              <div>
                <div
                  v-for="(item, index) in user.pendidikan"
                  class="flex items-start mb-4"
                >
                  <div
                    class="flex-none w-6 h-6 bg-lime-600/50 flex items-center justify-center text-white rounded-full"
                  >
                    {{ index + 1 }}
                  </div>
                  <div class="grow pl-2 -mt-1">{{ item }}</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section class="-mt-2">
        <div class="pb-1 bg-lime-600/10 cardia-top-r">
          <button
            class="px-6 flex uppercase items-center bg-lime-600/50 py-1 rounded-full text-white"
          >
            <svg
              class="mr-2"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.8 1L2.74967 0.99997C2.52122 0.999752 2.32429 0.999564 2.14983 1.04145C1.60136 1.17312 1.17312 1.60136 1.04145 2.14983C0.999564 2.32429 0.999752 2.52122 0.99997 2.74967L1 2.8V5.2L0.99997 5.25033C0.999752 5.47878 0.999564 5.67572 1.04145 5.85017C1.17312 6.39864 1.60136 6.82688 2.14983 6.95856C2.32429 7.00044 2.52122 7.00025 2.74967 7.00003L2.8 7H5.2L5.25033 7.00003C5.47878 7.00025 5.67572 7.00044 5.85017 6.95856C6.39864 6.82688 6.82688 6.39864 6.95856 5.85017C7.00044 5.67572 7.00025 5.47878 7.00003 5.25033L7 5.2V2.8L7.00003 2.74967C7.00025 2.52122 7.00044 2.32429 6.95856 2.14983C6.82688 1.60136 6.39864 1.17312 5.85017 1.04145C5.67572 0.999564 5.47878 0.999752 5.25033 0.99997L5.2 1H2.8ZM2.38328 2.01382C2.42632 2.00348 2.49222 2 2.8 2H5.2C5.50779 2 5.57369 2.00348 5.61672 2.01382C5.79955 2.05771 5.94229 2.20045 5.98619 2.38328C5.99652 2.42632 6 2.49222 6 2.8V5.2C6 5.50779 5.99652 5.57369 5.98619 5.61672C5.94229 5.79955 5.79955 5.94229 5.61672 5.98619C5.57369 5.99652 5.50779 6 5.2 6H2.8C2.49222 6 2.42632 5.99652 2.38328 5.98619C2.20045 5.94229 2.05771 5.79955 2.01382 5.61672C2.00348 5.57369 2 5.50779 2 5.2V2.8C2 2.49222 2.00348 2.42632 2.01382 2.38328C2.05771 2.20045 2.20045 2.05771 2.38328 2.01382ZM9.8 1L9.74967 0.99997C9.52122 0.999752 9.32429 0.999564 9.14983 1.04145C8.60136 1.17312 8.17312 1.60136 8.04145 2.14983C7.99956 2.32429 7.99975 2.52122 7.99997 2.74967L8 2.8V5.2L7.99997 5.25033C7.99975 5.47878 7.99956 5.67572 8.04145 5.85017C8.17312 6.39864 8.60136 6.82688 9.14983 6.95856C9.32429 7.00044 9.52122 7.00025 9.74967 7.00003L9.8 7H12.2L12.2503 7.00003C12.4788 7.00025 12.6757 7.00044 12.8502 6.95856C13.3986 6.82688 13.8269 6.39864 13.9586 5.85017C14.0004 5.67572 14.0003 5.47878 14 5.25033L14 5.2V2.8L14 2.74967C14.0003 2.52122 14.0004 2.32429 13.9586 2.14983C13.8269 1.60136 13.3986 1.17312 12.8502 1.04145C12.6757 0.999564 12.4788 0.999752 12.2503 0.99997L12.2 1H9.8ZM9.38328 2.01382C9.42632 2.00348 9.49222 2 9.8 2H12.2C12.5078 2 12.5737 2.00348 12.6167 2.01382C12.7995 2.05771 12.9423 2.20045 12.9862 2.38328C12.9965 2.42632 13 2.49222 13 2.8V5.2C13 5.50779 12.9965 5.57369 12.9862 5.61672C12.9423 5.79955 12.7995 5.94229 12.6167 5.98619C12.5737 5.99652 12.5078 6 12.2 6H9.8C9.49222 6 9.42632 5.99652 9.38328 5.98619C9.20045 5.94229 9.05771 5.79955 9.01382 5.61672C9.00348 5.57369 9 5.50779 9 5.2V2.8C9 2.49222 9.00348 2.42632 9.01382 2.38328C9.05771 2.20045 9.20045 2.05771 9.38328 2.01382ZM2.74967 7.99997L2.8 8H5.2L5.25033 7.99997C5.47878 7.99975 5.67572 7.99956 5.85017 8.04145C6.39864 8.17312 6.82688 8.60136 6.95856 9.14983C7.00044 9.32429 7.00025 9.52122 7.00003 9.74967L7 9.8V12.2L7.00003 12.2503C7.00025 12.4788 7.00044 12.6757 6.95856 12.8502C6.82688 13.3986 6.39864 13.8269 5.85017 13.9586C5.67572 14.0004 5.47878 14.0003 5.25033 14L5.2 14H2.8L2.74967 14C2.52122 14.0003 2.32429 14.0004 2.14983 13.9586C1.60136 13.8269 1.17312 13.3986 1.04145 12.8502C0.999564 12.6757 0.999752 12.4788 0.99997 12.2503L1 12.2V9.8L0.99997 9.74967C0.999752 9.52122 0.999564 9.32429 1.04145 9.14983C1.17312 8.60136 1.60136 8.17312 2.14983 8.04145C2.32429 7.99956 2.52122 7.99975 2.74967 7.99997ZM2.8 9C2.49222 9 2.42632 9.00348 2.38328 9.01382C2.20045 9.05771 2.05771 9.20045 2.01382 9.38328C2.00348 9.42632 2 9.49222 2 9.8V12.2C2 12.5078 2.00348 12.5737 2.01382 12.6167C2.05771 12.7995 2.20045 12.9423 2.38328 12.9862C2.42632 12.9965 2.49222 13 2.8 13H5.2C5.50779 13 5.57369 12.9965 5.61672 12.9862C5.79955 12.9423 5.94229 12.7995 5.98619 12.6167C5.99652 12.5737 6 12.5078 6 12.2V9.8C6 9.49222 5.99652 9.42632 5.98619 9.38328C5.94229 9.20045 5.79955 9.05771 5.61672 9.01382C5.57369 9.00348 5.50779 9 5.2 9H2.8ZM9.8 8L9.74967 7.99997C9.52122 7.99975 9.32429 7.99956 9.14983 8.04145C8.60136 8.17312 8.17312 8.60136 8.04145 9.14983C7.99956 9.32429 7.99975 9.52122 7.99997 9.74967L8 9.8V12.2L7.99997 12.2503C7.99975 12.4788 7.99956 12.6757 8.04145 12.8502C8.17312 13.3986 8.60136 13.8269 9.14983 13.9586C9.32429 14.0004 9.52122 14.0003 9.74967 14L9.8 14H12.2L12.2503 14C12.4788 14.0003 12.6757 14.0004 12.8502 13.9586C13.3986 13.8269 13.8269 13.3986 13.9586 12.8502C14.0004 12.6757 14.0003 12.4788 14 12.2503L14 12.2V9.8L14 9.74967C14.0003 9.52122 14.0004 9.32429 13.9586 9.14983C13.8269 8.60136 13.3986 8.17312 12.8502 8.04145C12.6757 7.99956 12.4788 7.99975 12.2503 7.99997L12.2 8H9.8ZM9.38328 9.01382C9.42632 9.00348 9.49222 9 9.8 9H12.2C12.5078 9 12.5737 9.00348 12.6167 9.01382C12.7995 9.05771 12.9423 9.20045 12.9862 9.38328C12.9965 9.42632 13 9.49222 13 9.8V12.2C13 12.5078 12.9965 12.5737 12.9862 12.6167C12.9423 12.7995 12.7995 12.9423 12.6167 12.9862C12.5737 12.9965 12.5078 13 12.2 13H9.8C9.49222 13 9.42632 12.9965 9.38328 12.9862C9.20045 12.9423 9.05771 12.7995 9.01382 12.6167C9.00348 12.5737 9 12.5078 9 12.2V9.8C9 9.49222 9.00348 9.42632 9.01382 9.38328C9.05771 9.20045 9.20045 9.05771 9.38328 9.01382Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
            {{ user.setting?.pengalaman }}
          </button>
        </div>
        <div class="cardia-body-r bg-lime-600/10 text-sm">
          <div>
            <div
              v-for="(item, index) in user.pengalaman"
              class="flex items-start mb-2"
            >
              <div
                class="flex-none w-5 h-5 bg-lime-600/50 flex items-center justify-center text-white rounded-full"
              >
                {{ index + 1 }}
              </div>
              <div class="grow pl-2">{{ item }}</div>
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
    <div class="helping-bar">
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
