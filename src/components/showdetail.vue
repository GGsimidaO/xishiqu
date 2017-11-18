<template>
	<div v-if="value" class="get">
		<h2>演出详情</h2>
		<div v-html="value.activity.content" ></div>
	</div>
</template>

<script>
export default {

  name: 'showdetail',
  props:['value'],

  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
.get{
	font-size: 0.2rem;
	color:#666;
	padding:0.2rem;
	h2{
		text-align: center;
		font-size: 0.24rem;
		color:#666;
		margin:0.3rem 0;
	}
	p{
		margin-bottom: 0.24rem;
		img{
			max-width:7.2rem;
		}
	}
}
	

</style>