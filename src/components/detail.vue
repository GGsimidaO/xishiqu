<template>
	<div>
		<headerbar></headerbar>
		<section>
			<div class="banner" v-if="maindata">
				<div class="thumbnail">
					<img :src='maindata.activity.thumbnail'/>
				</div>
				<div class="info">
					<h2 class="name">{{maindata.activity.actName}}</h2>
					<P class='time'>{{maindata.activity.actDate}}</P>
					<p class="address">{{maindata.activity.veName}}</p>
					<div class="hot">
						<p class="level">{{maindata.activity.hotLevel}}℃</p>
						<p>西十区指数</p>
					</div>
					<p class="price"><span>￥{{maindata.activity.minPrice}}</span>起</p>
				</div>
			</div>
			<div class="nav">
				<mt-navbar v-model="selected">
				  <mt-tab-item id="1">票品</mt-tab-item>
				  <mt-tab-item id="2">详情</mt-tab-item>
				</mt-navbar>		
			</div>
			<div class="content">
				<mt-tab-container v-model="selected">
				  <mt-tab-container-item id="1">
				  	<ticket v-model="alldata"></ticket>
				  </mt-tab-container-item>
				  <mt-tab-container-item id="2">
				  	<showdetail v-model="maindata"></showdetail>
				  </mt-tab-container-item>
				</mt-tab-container>	
			</div>
		</section>
		<footerbar></footerbar>	
	</div>
</template>

<script>
import headerbar from '@/components/common/header'
import footerbar from '@/components/common/footer'
import ticket from '@/components/ticket'
import showdetail from '@/components/showdetail'
import axios from "axios"
import {Navbar, TabItem,TabContainer, TabContainerItem} from 'mint-ui'
import { Indicator } from 'mint-ui';
export default {

  name: 'detail',

  data () {
    return {
    	maindata:null,
    	selected:"1",
    	alldata:null,
    }
  },
  mounted(){
  	Indicator.open('Loading...');
  	var actCode=this.$route.params.id.split('&')[0];
  	var tid=this.$route.params.id.split('&')[1];
	axios.get(`/ajax/activity/detail?actCode=${actCode}`).then(res=>{
		this.maindata=res.data.result;
	});
	Promise.all([axios.get(`/ajax/activity/getEventList?actCode=${actCode}&eventId=${tid}`),axios.get(`/ajax/activity/detail?actCode=${actCode}`)]).then(res=>{
		this.alldata=res;
		Indicator.close();
	})
  },
  components:{
  	headerbar,
  	footerbar,
  	"mt-navbar":Navbar,
  	"mt-tab-item":TabItem,
  	"mt-tab-container":TabContainer,
  	'mt-tab-container-item':TabContainerItem,
  	ticket,
  	showdetail,

  },
  methods:{
  }
}
</script>

<style lang="scss" scoped>
section{
	position: relative;
	margin:1.08rem 0 0.96rem 0;
	.banner{
		padding:0.2rem;
		overflow: hidden;
		background: linear-gradient(to right bottom, #060606, rgba(51,51,51,0.6));
		border-top:0.01rem solid #333;
		color:#fff;
		.thumbnail{
			float: left;
			img{
				display: block;
				width:2.4rem;
				height:3.2rem;
				border-radius: 0.2rem;
			}
		}
		.info{
			float:right;
			width:4.5rem;
			.name{
				font-size: 0.32rem;
				line-height: 0.42rem;
			}
			.time{
				background:url(../assets/time.png) no-repeat;
				background-size: 0.4rem;
				padding-left:0.6rem;
				font-size: 0.24rem;
				line-height: 0.4rem;
				margin:0.24rem 0;
			}
			.address{
				background:url(../assets/address.png) no-repeat;
				background-size: 0.4rem;
				padding-left:0.6rem;
				font-size: 0.24rem;
				line-height: 0.4rem;
			}
			.hot{
				margin-top:0.2rem;
				background:#5a5a5b url(../assets/hot.png) no-repeat left center ;
				background-size: 0.82rem;
				font-size: 0.26rem;
				padding-left: 0.82rem;
				line-height: 0.56rem;
				height:1.12rem;
				width:1.38rem;
				border-radius: 0.2rem;
			}
			.price{
				font-size:0.24rem;
				padding-left: 0.2rem;
				margin-top:0.40rem;
				span{
					font-size: 0.36rem;
					color:#ff5400;
					font-weight: 700;
					margin-right:0.05rem;
				}
			}
		}
	}
	.nav{
		height:0.9rem;
			
		.mint-navbar{
			font-weight: 100;
			background:#efefef;
			color:#999;				
			line-height: 0.9rem;
		}
		.is-selected{
			background:#fff;
			color:#333;
			margin-bottom: 0;
			font-weight: 700;
			border-bottom:0.01rem solid #efefef;
		}
	}
}
</style>