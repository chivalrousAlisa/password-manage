
<template lang="html">
  <div class="wrap" v-if="show">{{text}}</div>
</template>
<style>
  .wrap{
    position:absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    padding:10px;
    border-radius: 5px;
    background: rgba(0,0,0,.35);
    color:#fff;
  }
</style>
