<template>
  <div class="flex min-h-full flex-col items-center justify-center bg-white-100 rounded">
    <div class="w-full max-w-md p-10 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign Up</h2>
      <form @submit.prevent="handleSignup">
        <div class="mb-4">
          <label class="block text-sm/6 font-medium text-gray-900">Username</label>
          <input
            type="text"
            v-model="username"
            class="w-full px-4 py-2 border rounded focus:outline-indigo-600"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm/6 font-medium text-gray-900">Password</label>
          <input 
            type="password"
            v-model="password"
            class="w-full px-4 py-2 border rounded focus:outline-indigo-600"
            required 
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
          <input 
            type="password"
            v-model="confirm_password"
            class="w-full px-4 py-2 border rounded focus:outline-indigo-600"
            required 
          />
        </div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Signup
        </button>
      </form>
      <p class="text-center text-xs text-gray-600">
        Already have an account?
        <NuxtLink to="/Login" class="text-blue-600 hover:text-blue-400">Log In</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  
  const router = useRouter();
  const username = ref("");
  const password = ref("");
  const confirm_password = ref("");

  const handleSignup = async () => {
    try {
      const response = await $fetch("/api/users", {
        method: "POST",
        body: {
          username: username.value,
          password: password.value,
          confirmPassword: confirm_password.value,
        },
      });
      router.push("/Login");
    } catch (error) {
      alert("Error, something went wrong!");
    }
  };
</script>
  
<style>

</style>