<script setup lang="ts">
useSeoMeta({
  title: "Check Membership",
});

interface MembershipData {
  name: string;
  nim: string;
  paid: boolean;
  lastUpdated: string;
}

const queryClient = useQueryClient();
const { mutate, isPending, isError } = useMutation<MembershipData, Error, string, unknown>({
  mutationFn: (nim: string) =>
    $fetch("https://mpc-be.netlify.app/?nim=" + nim, { method: "GET" }),
  onSuccess: (data) => {
    queryClient.invalidateQueries({ queryKey: ["getMembershipData"] });
    console.log(data);
    store.name = data.name;
    store.nim = data.nim;
    store.lastUpdated = data.lastUpdated;
    store.paid = data.paid;
  },
});

function onButtonClick(nim: string) {
  store.name = "";
  store.nim = "";
  store.lastUpdated = "";
  store.paid = false;
  mutate(nim);
}
</script>

<script lang="ts">
import { ref } from "vue";
import { store } from "./store";

const nim = ref("");

export default {
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <main>
    <div class="max-w-[calc(384px+16px)] mx-auto mt-12 px-4">
      <h2 class="text-2xl font-bold mb-8">Check Membership</h2>
      <label for="price" class="block text-sm font-medium leading-6 text-gray-900">NIM</label>
      <div class="relative mt-2 rounded-md shadow-sm">
        <input type="text" name="price" id="price"
          class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="XXXXXXXXX" v-model="nim" />
      </div>
      <button class="border rounded-md w-full text-center py-2 mt-2" @click="onButtonClick(nim)">
        Search
      </button>

      <div class="mt-4">
        <p v-if="isPending">Loading ...</p>

        <div v-else-if="store.nim !== ''" class="border p-4 rounded-md mt-4">
          <div class="flex justify-between items-center">
            <p>NIM</p>
            <p>{{ store.nim }}</p>
          </div>
          <div class="flex justify-between items-center">
            <p>Name</p>
            <p>{{ store.name }}</p>
          </div>
          <div class="flex justify-between items-center">
            <p>Has Paid</p>
            <p>{{ store.paid }}</p>
          </div>
          <div class="flex justify-between items-center">
            <p>Last Updated</p>
            <p>{{ store.lastUpdated }}</p>
          </div>
        </div>

        <p v-else-if="isError">Failed to get the data</p>
      </div>
    </div>
  </main>
</template>
