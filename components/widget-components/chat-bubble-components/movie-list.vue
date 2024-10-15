<template>
  <div class="bg-white rounded-lg ">
    <div class=" text-md font-extrabold  ">
      <button class="text-left m-2 hover:text-orange-500 w-full border-gray-200 border-b-[1px] last:border-b-0" v-for="(item, index) in items">
        <ul>
          <li>
            🎬 Phần {{ index + 1 }} : {{ item.name }}
          </li>
        </ul>
      </button>
    </div>
  </div>
</template>

<script lang="js" setup>
//Dùng để test giá trị items name
const items = 

  [
        { name: 'Thanh Gươm Diệt Quỷ' },
        { name: 'Chuyến Tàu Cuối Cùng' },
        { name: 'Kỹ Viện Trắng Án' },
        { name: 'Làng Rèn Ác Ma' },
        { name: 'Đại Trụ Đặc Biệt' }
  ]



</script>

<style></style>

