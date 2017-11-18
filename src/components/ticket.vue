<template>
	<div v-if="value">
		<div class="shortTap">
			<ul class="date">
				<li v-for="data,index in value[1].data.result.events.data" @click="handleClick([data.eventId,index])" :class="currentindex==index?'active':''">
					<span>{{data.date.day}}<br>{{data.date.week}}{{data.date.time}}<br>￥{{data.price}}起</span>
				</li>
			</ul>
		</div>
		<div class="select">
			<div class="left" @click="leftclick">选票面价<i class="iconfont icon-moreunfold"></i></div>
			<div class="right" @click="rightclick">销售价比价<i class="iconfont icon-moreunfold"></i></div>
		</div>
		<div class="faceprice" v-show="show">
			<ul>
				<li :class="isTrue?'active':''" @click="allClick">全部</li>
				<li v-for="data,index in pricelist" @click="priceClick([data.dId,index])" :class="priceindex==index?'active':''">
					￥{{data.facePriceValue}}
				</li>
			</ul>
		</div>
		<div v-show="show2" class="sort">
			<ul>
				<li class="active">默认排序</li>
				<li>价格从低到高</li>
			</ul>
		</div>
		<div class="tickets-list">
			<ul>
				<li v-for="data in datalist">
					<div class="left">
						<h3>{{data.title}}</h3>
						<p>{{data.deliveryTime}}</p>
						<p>卖家保证金:{{data.depositText}}</p>
						<span v-for="data in data.tags">
							{{data}}
						</span>										
					</div>
					<div class="right">
						<p class="price">￥{{data.price}}</p>
						<p class="face-price">票面价: ￥{{data.facePrice}}</p>
						<p class="left-qty">剩余张数: {{data.leftQuantity}}</p>
						<a class="btn">购买</a>
					</div>
				</li>
			</ul>
		</div>
		<div class="loadmore" @click="click" v-if="hasmore">
			点击加载更多
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { DatetimePicker } from 'mint-ui';
export default {

  name: 'ticket',
  props:['value'],

  data () {
    return {
    	show:false,
    	show2:false,
    	datalist:[],
    	pricelist:[],
    	hasmore:false,
    	tid:'',
    	isTrue:true,
    	current:1,
    	currentindex:0,
    	priceindex:-1,
    	did:'',
    }
  },
  mounted(){
  	this.tid=location.href.split('&')[1];
  	axios.get(`/ajax/activity/tickets?eventId=${this.tid}&dId=&order=0&seat=&page=${this.current}`).then(res=>{
  			this.datalist=res.data.result.list;
  			this.hasmore=res.data.result.hasMore;
  		});
  	axios.get(`/ajax/activity/tickets/facePrice?eventId=${this.tid}`).then(res=>{
  			this.pricelist=res.data.result;
  		})

  },
  computed:{
  	
  },
  methods:{
  	leftclick(){
  		this.show=!this.show;
  		this.show2=false;
  	},
  	rightclick(){
  		this.show2=!this.show2;
  		this.show=false;
  	},
  	click(){
  		this.current++;
  		axios.get(`/ajax/activity/tickets?eventId=${this.tid}&dId=&order=0&seat=&page=${this.current}`).then(res=>{
  			this.datalist=[...this.datalist,...res.data.result.list];
  			this.hasmore=res.data.result.hasMore;
  		}) 		
  	},
  	handleClick(val){
  		this.tid=val[0];
  		this.currentindex=val[1];
  		this.current=1;
  		this.isTrue=true;
  		this.priceindex=-1;
  		this.hasmore=false;
  		axios.get(`/ajax/activity/tickets?eventId=${this.tid}&dId=&order=0&seat=&page=${this.current}`).then(res=>{
  			this.datalist=res.data.result.list;
  			this.hasmore=res.data.result.hasMore;
  		});
  		axios.get(`/ajax/activity/tickets/facePrice?eventId=${this.tid}`).then(res=>{
  			this.pricelist=res.data.result;
  		})
  	},
  	allClick(){
  		this.isTrue=true;
  		this.show=false;
  		this.priceindex=-1;
  		this.current=1;
  		this.hasmore=false;
  		axios.get(`/ajax/activity/tickets?eventId=${this.tid}&dId=&order=0&seat=&page=${this.current}`).then(res=>{
  			this.datalist=res.data.result.list;
  			this.hasmore=res.data.result.hasMore;
  		})
  	},
  	priceClick(val){
  		this.isTrue=false;
  		this.show=false;
  		this.current=1;
  		this.did=val[0];
  		this.priceindex=val[1];
  		this.hasmore=false;
  		axios.get(`/ajax/activity/tickets?eventId=${this.tid}&dId=${this.did}&order=0&seat=&page=${this.current}`).then(res=>{
  			this.datalist=res.data.result.list;
  			this.hasmore=res.data.result.hasMore;
  		})
  	}
  },
  components:{
  	
  }
}
</script>
<style src="@/assets/iconfont/iconfont.css"></style>
<style lang="scss" scoped>
	.shortTap{
		width: 100%; 
		background-color:#fff;
		overflow-x: scroll; 
		-webkit-overflow-x: scroll;
		.date{
			padding:0.30rem;
			overflow: hidden;
			display: flex;
			justify-content: flex-start;
			font-size: 0.24rem;
			width: 100rem;
			li{
				list-style: none;
				float: left;
				display: inline-block;
				margin-right:0.24rem;
				padding:0.2rem;
				border:1px solid #dbdbdb;
				color:#ccc;
				text-overflow: ellipsis;
				word-break: keep-all;
				text-align: center;
				border-radius:0.08rem;
			}
			.active{
				color: #ff5400;
				border-color: #ff5400;
				background:url(../assets/event-check.png) no-repeat right bottom;
				background-size: 0.6rem 0.6rem;
			}
		}
	}
	.shortTap::-webkit-scrollbar{ 
	  width: 0; 
	  height: 0;   
	  background-color: #fff;  
	}

	.select{
		height: 0.96rem;
		overflow: hidden;
		border-bottom: 1px solid #e3e3e3;
		border-top: 1px solid #e3e3e3;
		text-align: center;
		font-size: 0.26rem;
		line-height: 0.96rem;
		i{
			margin-left:0.05rem;
		}
		.left{
			float: left;
			width:50%;
		}
		.right{
			float: left;
			width:50%;
		}
	}
	.faceprice{
		background: #efefef;
		padding:0.2rem;
		ul{
			overflow: hidden;
			li{
				list-style: none;
				float: left;
				border: 1px solid #666;
				border-radius: 0.1rem;
				margin:0.14rem;
				text-align: center;
				font-size: 0.28rem;
				width:1.4rem;
				line-height: 0.92rem;
			}
			.active{
				color: #ff5400;
				border-color: #ff5400;
				background:url(../assets/event-check.png) no-repeat right bottom;
				background-size: 0.6rem 0.6rem;
			}
		}
	}
	.sort{
		background: #efefef;
		padding:0.2rem;
		li{
			font-size: 0.26rem;
			line-height: 0.76rem;
			color: #333;
		}
		.active{
			color: #ff5400;
			background:url(../assets/filter-check.png) no-repeat right center;
			background-size: 0.3rem 0.3rem;
		}
	}
	.tickets-list{
		ul{
			list-style: none;
			li{
				padding:0.25rem;
				overflow:hidden;
				border-top:1px solid #f5f5f5;
				.left{
					width:4.2rem;
					float: left;
					h3{
						margin-bottom: 0.36rem;
						color:#333;
						font-size: 0.36rem;
						font-weight: 700;
					}
					p{
						font-size: 0.24rem;
						margin-bottom:0.24rem;
						color: inherit;
					}
					span{
						display:block;
						float:left;
						color: rgba(255,84,0,0.54);
						border:1px solid rgba(255,84,0,0.54);
						border-radius:0.05rem;
						padding:0.1rem 0.12rem;
						margin:0 0.1rem 0.12rem 0;
						font-size: 0.24rem;
						line-height: 1;
					}
				}
				.right{
					float:right;
					text-align: right;
					.price{
						color:#ff5400;
						font-weight: 700;
						font-size: 0.46rem;
					}
					.face-price{
						color:#999;
						margin-bottom: 0.12rem;
						font-size: 0.24rem;
					}
					.left-qty{
						margin-bottom: 0.12rem;
						color:#ff5400;
						font-size: 0.26rem;
					}
					.btn{
						display: block;
						color:#fff;
						background:#ff5400;
						width:2.64rem;
						line-height: 0.7rem;
						font-size:0.3rem;
						text-align: center;
					}
				}
			}
		}
	}
	.loadmore{
		text-align: center;
		color:#666;
		font-size: 0.24rem;
		line-height: 1;
		padding-bottom: 0.24rem;
	}
</style>