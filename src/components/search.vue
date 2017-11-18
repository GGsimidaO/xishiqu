<template>
	<div>
		<div class="search">
			<a href="/" class="iconfont icon-back left"></a>
			<input type='text' class="sea" placeholder="请输入演出/明星/活动" v-model='keyword' @input='changedata'/>
		</div>
		<div class="list">
			<ul v-show="show">
				<li v-for="data in datalist" @click="handleClick([data.actCode,data.url])">
					<div class="title">{{data.result}}</div>
					<div class="area">{{data.area}}</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<style src="@/assets/iconfont/iconfont.css"></style>
<script>
import axios from 'axios';
import router from "@/router"
export default {

  name: 'search',

  data () {
    return {
    	keyword:'',
    	datalist:[],
    	show:true
    }
  },
  computed:{
  	key(){
  		return encodeURI(this.keyword)
  	}
  },
  methods:{
  	changedata(){
  		this.show=true;
  		if(this.key){
  			axios.get(`/ajax/keywords?q=${this.key}`).then(res=>{
  				this.datalist=res.data.result;
  			})
  		} 		
  	},
  	handleClick(val){
  		var actCode=val[0];
  		var id=val[1].split('=')[1]
  		//console.log(actCode);
  		router.push(`detail/${actCode+'&'+id}`)
  	}
  }
}
</script>

<style lang="scss" scoped>
.search{
	height: 1.06rem;
	padding:0 0.24rem;
	border-bottom: 1px solid #dedede;
	line-height: 1.06rem;
	font-size: 0.24rem;
	a{
		text-decoration: none;		
	}
	.left{
		float: left;
		color:#666;
		width: 0.4rem;

	}
	.sea{
		float:left;
		margin:0.12rem 0rem 0.12rem 0.2rem;
		border:none;
		padding:0.2rem;
		background: #efefef;
		height:0.42rem;
		border-radius: 0.1rem;
		width:5.9rem;
	}
}
.list{
	background: #fff;
	list-style: none;
	ul{
		li{
			padding:0.25rem;
			overflow: hidden;
			border-bottom: 1px solid #dedede;
			color:#333;
			font-size: 0.28rem;
			line-height: 0.4rem;
			.title{
				float: left;
				width:5rem;
				overflow:hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
			.area{
				float:right;
				width:2rem;
				text-align: right;
			}
		}
	}
}
</style>