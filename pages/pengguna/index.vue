<template>
  <div class="flex min-h-full flex-col items-center justify-center bg-white-100">
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 mb-4">Detail Pengguna</h2>    

    <table class="w-3/4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 bg-rounded">
        <tr>
          <th scope="col" class="px-3 py-3">No</th>
          <th scope="col" class="px-6 py-3">Username</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(user, index) in users"
          :key="user.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{  index + 1 }}
          </th>
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ user.username }}
          </th>
          <td scope="row" class="px-6 py-4 text-left whitespace-nowrap">
            <button 
              @click="openModal"
              class="text-blue-700 hover:underline dark:text-blue-300"
              type="button">
              Delete
            </button>
            
            <div  
              v-if="isModalOpen"
              tabindex="-1" 
              class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button 
                          @click="closeModal"
                          type="button" 
                          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <div class="p-4 md:p-5 text-center">
                            <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this user?</h3>
                            <button @click="deleteUser(user.id)" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Yes, I'm sure
                            </button>
                            <button @click="closeModal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                        </div>
                    </div>
                </div>
            </div>

          </td>
        </tr>
      </tbody>
    </table>


    <div class="w-3/4 flex justify-end mt-4">
      <button 
        class="rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click="backToSignUp()">
        Back to Sign Up
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  
  const users = ref<User[]>([]);
  const isModalOpen = ref(false);
  const router = useRouter();
  
  interface User {
    id: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }

  onMounted(async () => {
    try {
      const response = await $fetch<User[]>(`/api/users`, {
        method: 'GET',
      });
      users.value = response;
    } catch (error) {
      console.error("Failed to fetch users: ", error);
    }
  });

  const openModal = () => {
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  const deleteUser = async (id: string) => {
    try {
      await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
      isModalOpen.value = false;
      users.value = users.value.filter((user) => user.id !== id);
    } catch (error) {
      alert('Error! Something went wrong!')
    }
  };

  const backToSignUp = () => {
    router.push(`/Signup`);
  };
</script>

<style>

</style>
