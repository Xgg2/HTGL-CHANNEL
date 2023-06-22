<template>
  <div>
    <Card></Card>
    <Sale></Sale>
    <Observe></Observe>
  </div>
</template>

<script>
import Card from "@/views/dashboard/Card/Card";
import Sale from "@/views/dashboard/Sale/Sale";
import Observe from "@/views/dashboard/Observe/Observe";
export default {
  name: 'dashboard',
  components: {
    Card,
    Sale,
    Observe
  },


}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
