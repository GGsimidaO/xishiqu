<template>
	<div>
		<swipe class="my-swipe">
			<swipe-item v-for="data in datalist">
				<a :href="data.url"><img :src="data.imgUrl"/></a>
			</swipe-item>
		</swipe>
		<a class="address" href="#">上海<i class="iconfont icon-moreunfold"></i></a>
		<router-link class="search" tag='a' to="/search"><i class="iconfont icon-search"></i></router-link>
		<div class="wrapper">
			<ul class="nav">
				<li><router-link tag='a' class="item left" to='/category'>
					<div class="text">
						<span>分类</span>
						<span class="small">Classification</span>
					</div>
					<div class="icon"><span></span></div>
				</router-link></li>
				<li><router-link tag='a' class="item right" to=''>
					<div class="text">
						<span>个人中心</span>
						<span class="small">Personal Center</span>
					</div>
					<div class="icon"><span></span></div>
				</router-link></li>
			</ul>
			<section>
				<h3 class="title">
					Hot today
					<span>热门演出</span>
				</h3>
				<ul class="showlist">
					<li class='item'v-for="data in ticketlist.hot" @click='click([data.thumbnail,data.url])'>
						<img :src="data.thumbnail" class="ticketimg" />
						<h2 class="txt">{{data.actName}}</h2>
						<span class="data">{{data.date}}</span>
					</li>
				</ul>
			</section>
			<section>
				<h3 class="title">
					Stub Ticket
					<span>尾票</span>
				</h3>
				<ul class="showlist">
					<li class='item'v-for="data in ticketlist.last" @click='click([data.thumbnail,data.url])'>
						<img :src="data.thumbnail" class="ticketimg" />
						<h2 class="txt">{{data.actName}}</h2>
						<span class="data">{{data.date}}</span>
					</li>
				</ul>
			</section>
			<section>
				<ul class="activities">
					<li v-for="data in ticketlist.ads">
						<img :src='data.imgUrl'/>
					</li>
				</ul>
			</section>
			<section>
				<h3 class="title">
					On Sale
					<span>折扣票</span>
				</h3>
				<ul class="showlist">
					<li class='item'v-for="data in ticketlist.discount" @click='click([data.thumbnail,data.url])'>
						<img :src="data.thumbnail" class="ticketimg" />
						<h2 class="txt">{{data.actName}}</h2>
						<span class="data">{{data.date}}</span>
					</li>
				</ul>
			</section>
			<section>
				<h3 class="title">
					Rare
					<span>稀缺票</span>
				</h3>
				<ul class="showlist">
					<li class='item'v-for="data in ticketlist.rare" @click='click([data.thumbnail,data.url])'>
						<img :src="data.thumbnail" class="ticketimg" />
						<h2 class="txt">{{data.actName}}</h2>
						<span class="data">{{data.date}}</span>
					</li>
				</ul>
			</section>
			<div class="link">
				<a href="http://www.shjbzx.cn">
					<img src="../assets/hotline.png"/>
				</a>
				<span>举报电话:021-52398129&nbsp;&nbsp;分机号:403</span>
			</div>
			<footer>
				<span>版权所有 西十区Copyright2011 - 2016 All Rights Reserved 沪ICP备12004558 上海爱有网络科技有限公司</span>
			</footer>
		</div>		
	</div>
</template>

<script>
import "vue-swipe/dist/vue-swipe.css";
import { Swipe, SwipeItem } from 'vue-swipe';
import axios from "axios";
import {mapGetters} from "vuex";
import router from "@/router"
import { Indicator } from 'mint-ui';
export default {

  name: 'home',

  data () {
    return {
    	datalist:[]
    }
  },
  components:{
  	swipe:Swipe,
  	"swipe-item":SwipeItem
  },
  mounted(){
  	Indicator.open('Loading...');
  	axios.get("/ajax/home/banner").then(res=>{
  		//console.log(res.data.result)
  		this.datalist=res.data.result;
  		Indicator.close();
  	});
  	if(!this.$store.state.datalist){
  		this.$store.dispatch("getTicketlist","/ajax/home/tickets") 		
  	}	
  },
  computed:{
  	// ticketlist(){
  	// 	return this.$store.state.datalist?this.$store.state.datalist.result:{}
  	// }
  	...mapGetters(["ticketlist"])
  },
  methods:{
  	click(val){
  		var actCode=val[0].split('/')[7];
  		var id=val[1].split('=')[1]
  		//console.log(actCode);
  		router.push(`detail/${actCode+'&'+id}`)
  	}
  }
}
</script>
<style src="@/assets/iconfont/iconfont.css"></style>
<style lang="scss" scoped>
.my-swipe{
	height: 3.52rem;
	  img{
	  	width: 100%;
	  }
}
.wrapper{
	padding:0.35rem;
	.nav{
		display: flex;
	    overflow: hidden;
	    list-style: none;
	    margin: 0;
	    padding: 0.45rem 0;
	    text-align: center;
	    position: relative;
	    background: url(../assets/left-top-border.png) left top no-repeat,url(../assets/right-bottom-border.png) right bottom no-repeat;
    	background-size: 25%;
    	li{
    		flex:1;
    		position:relative;
    		font-size: 0.3rem;
    		.item{
    			color: #333;
    			text-decoration: none;
    			padding:0 0.24rem;
    			display:flex;
    			align-items:center;
    			justify-content: space-around;
    			.small{
    				display: block;
    				font-size: 0.15rem;
    			}   			
    		}
    		.left{
    			.icon{
    				span{
    					display: inline-block;
    					background:url(../assets/category-icon.png) no-repeat;
    					background-size: cover;
    					width:0.93rem;
    					height: 0.93rem;
    				}
    			}
    		}
    		.right{
    			    border-left: 0.01rem solid #dedede;
    			.icon{
    				span{
    					display: inline-block;
    					background:url(../assets/account-icon.png) no-repeat;
    					    background-size: cover;
    					width:0.93rem;
    					height: 0.93rem;
    				}
    			}
    		}
    	}
	}
	section{
		.title{
			font-size: 0.32rem;
			line-height: 0.5rem;
			border-left:0.16rem solid #333;
			padding-left: 0.26rem;
			color:#ff5400;
			margin:0.48rem 0;
			span{
				color:#333;
				line-height: 0.44rem;
				font-size: 0.3rem;
				width:2.10rem;
				text-align: right;
				padding-right:0.18rem;
				border-bottom: 0.01rem solid #333;
				display: block;
			}
		}
		.showlist{
			list-style: none;
			color: #333;
			display:flex;
			justify-content:space-between;
			flex-wrap:wrap;
			.item{
				width:30%;
				margin-bottom: 0.12rem;
				.ticketimg{
					display:block;
					width:100%;
					height:2.9rem;
				}
				.txt{
					font-size: 0.27rem;
					line-height: 0.36rem;
					height:0.72rem;
					margin:0.12rem 0;
					word-break: break-all;
					overflow: hidden;
				}
				.data{
					font-size: 0.18rem;
					word-break: break-all;
					overflow: hidden;
					display: block;
					line-height: 0.28rem;
					height: 0.56rem;
					vertical-align: top;
				}
			}
		}
		.activities{
			overflow: hidden;
			li{
				list-style: none;
				float: left;
				padding: 0.12rem;
				width:3.16rem;
				height:1.84rem;
				img{
					width:100%;
					height:100%;
				}
			}
			li:nth-child(1){
				height:3.7rem;
			}
		}
	}
	.link{
		font-size: 0.18rem;
		color:#333;
		text-align: center;
		img{
			width:60px;
			margin-right:0.24rem;
			vertical-align: middle;
		}
	}
	footer{
		margin:0.48rem 0 0;
		color: #333;
		text-align: center;
		font-size: 0.18rem;
	}
}
.address{
	position: absolute;
	left:0;
	top:0.23rem;
	text-decoration: none;
	width:1.74rem;
	height:0.68rem;
	line-height: 0.68rem;
	text-align: center;
	color:#fff;
	background:rgba(0,0,0,0.54);
	border:0.02rem solid #fff;
	border-top-right-radius: 0.36rem;
    border-bottom-right-radius: 0.36rem;
    font-size:0.28rem;
    i{
    	color:#fff;
    	margin-left:0.25rem;
    	width:0.17rem;
    } 
}
.search{
	position: absolute;
	right:0;
	top:0.23rem;
	text-decoration: none;
	width:1.36rem;
	height:0.68rem;
	line-height: 0.68rem;
	text-align: center;
	color:#fff;
	background:rgba(0,0,0,0.54);
	border:0.02rem solid #fff;
	border-top-left-radius: 0.36rem;
    border-bottom-left-radius: 0.36rem;
    font-size:0.28rem;
    i{
    	color:#fff;
    	font-weight: 700;
    	width:0.17rem;
    } 
}
</style>