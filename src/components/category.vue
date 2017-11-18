<template>
	<div>
		<div class="search">
			<a href="/" class="iconfont icon-back left"></a>
			<a href="/#/search"><input type='text' class="sea" placeholder="请输入演出/明星/活动"/></a>
			<a href="#" class="iconfont icon-account right"></a>
		</div>
		<nav>
			<ul>
				<li @click='checkType'>
					<i class="iconfont icon-category type"></i>
					<span>{{title}}</span>
				</li>
				<li>
					<span>日历</span>
					<i class="iconfont icon-moreunfold jiantou"></i>
				</li>
				<li>
					<span>排序</span>
					<i class="iconfont icon-moreunfold jiantou"></i>
				</li>
			</ul>
		</nav>
		<div class="typelist" v-show="show">
			<ul>
				<li @click="filter(['','全部'])">全部</li>
				<li @click="filter(['yanchanghui','演唱会'])">演唱会</li>
				<li @click="filter(['huajugeju','话剧歌剧'])">话剧歌剧</li>
				<li @click="filter(['yinyuehui','音乐会'])">音乐会</li>
				<li @click="filter(['ertongqinzi','儿童亲子'])">儿童亲子</li>
				<li @click="filter(['wudaobalei','舞蹈芭蕾'])">舞蹈芭蕾</li>
				<li @click="filter(['quyizaji','曲艺杂技'])">曲艺杂技</li>
				<li @click="filter(['tiyusaishi','体育赛事'])">体育赛事</li>
				<li @click="filter(['xiuxianyulei','休闲娱乐'])">休闲娱乐</li>
				<li>电影</li>
			</ul>
			<div class="close"><i class='iconfont icon-less'></i></div>
		</div>
		<section>
			<ul class="list">
				<li v-for="data in datalist" @click="todetail([data.actImgUrl,data.url])">
					<div class="thumbnail">
						<img :src="data.actImgUrl"/>
					</div>
					<div class="info">
						<h3 class="name">{{data.actName}}</h3>
						<p class="date">{{data.actTo}}</p>
						<p class="address">{{data.address}} {{data.name}}</p>
						<div class="i">
							<span class="status">{{data.actStatusName}}</span>
							<span class="price">￥{{data.lowPrice
							}}</span>
							起
						</div>
					</div>
				</li>
			</ul>
			<div class="loadmore" v-show="hasmore" @click="handleClick">加载更多</div>
			<div class="allresult" v-show="!hasmore">以上为全部结果</div>
		</section>
	</div>
</template>

<script>
import axios from 'axios';
import router from "@/router"
export default {

  name: 'category',

  data () {
    return {
    	datalist:[],
    	hasmore:true,
    	current:1,
    	title:'演唱会',
    	show:false,
    	currenttype:'yanchanghui'
    }
  },
  mounted(){
  	this.currenttype=location.href.split('#')[2]?location.href.split('#')[2]:'yanchanghui';
  	axios.get(`/ajax/activity/list?frontCate=${this.currenttype}&date=&order=&page=${this.current}`).then(res=>{
  		this.datalist=res.data.result.list;
  		this.hasmore=res.data.result.hasMore;
  	})
  },
  methods:{
  	handleClick(){
  		this.current++;
  		axios.get(`/ajax/activity/list?frontCate=${this.currenttype}&date=&order=&page=${this.current}`).then(res=>{
	  		this.datalist=[...this.datalist,...res.data.result.list];
	  		this.hasmore=res.data.result.hasMore;
  		})
  	},
  	checkType(){
  		this.show=!this.show;
  	},
  	todetail(val){
  		var actCode=val[0].split('/')[7];
  		var id=val[1].split('=')[1]
  		//console.log(actCode);
  		router.push(`detail/${actCode+'&'+id}`)
  	},
  	filter(val){
  		this.current=1;
  		this.hasmore=true;
  		this.currenttype=val[0];
  		this.title=val[1];
  		this.show=false;
  		router.push(`category#${val[0]}`)
  		axios.get(`/ajax/activity/list?frontCate=${this.currenttype}&date=&order=&page=${this.current}`).then(res=>{
	  		this.datalist=res.data.result.list;
	  		this.hasmore=res.data.result.hasMore;
  		})
  	}
  }
}
</script>
<style src="@/assets/iconfont/iconfont.css"></style>
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
		margin:0.12rem 0.61rem;
		border:none;
		padding:0.2rem;
		background: #efefef;
		height:0.42rem;
		border-radius: 0.1rem;
		width:4.6rem;
	}
	.right{
		float:right;
		color:#666;
		width: 0.4rem;
	}
}
nav{
	ul{
		padding:0.24rem 0;
		overflow: hidden;
		list-style: none;
		border-bottom: 1px solid #dedede;
		li{
			float: left;
			text-align: center;
			line-height: 0.42rem;
			font-size: 0.26rem;
			color:#666;
			width:2.48rem;
			i{
				vertical-align: middle;
				margin: 0.05rem;
			}		
		}
		li:nth-child(2){
			border-left: 1px solid #dedede;
			border-right: 1px solid #dedede;
		}

	}
}
section{
	.list{
		li{
			list-style: none;
			padding:0.24rem;
			overflow: hidden;
			.thumbnail{
				float:left;
				border: 2px solid #fff;
				img{
					display: block;
					width:2.08rem;
					height:auto;
				}
			}
			.info{
				float:left;
				width:4.62rem;
				padding-left: 0.24rem;
				min-height: 2.6rem;
				padding-bottom: 0.2rem;
				border-bottom: 1px solid #dedede;
				color:#666;
				.name{
					font-size: 0.28rem;
					line-height: 0.48rem;
					color: #333;
					font-weight: 100;
				}
				.date{
					font-size: 0.26rem;
					line-height: 0.36rem;
					margin:0.24rem 0 0.12rem 0;
				}
				.address{
					font-size: 0.24rem;
					line-height: 0.36rem;
					margin-bottom: 0.12rem;
				}
				.i{
					overflow:hidden;
					color:#666;
					font-size: 0.28rem;
					line-height: 0.36rem;
					.status{
						display:inline-block;
						border:1px solid #ff5400;
						padding: 0 0.12rem;
						border-radius: 0.05rem;
						color:#ff5400;
						margin-right: 0.12rem;
					}
					.price{
						color:#ff5400;
					}
				}
			}
		}
	}
	.loadmore{
		text-align: center;
		color:#666;
		line-height: 0.4rem;
		font-size: 0.26rem;
		padding-bottom: 0.24rem;
	}
	.allresult{
		text-align: center;
		color:#666;
		line-height: 0.4rem;
		font-size: 0.26rem;
		padding-bottom: 0.24rem;
	}
}
.typelist{
	position: absolute;
	background: #fff;
	width:100%;
	ul{
		li{
			line-height: 0.42rem;
			font-size: 0.26rem;
			color:#333;
			border-bottom: 1px solid #dedede;
			padding:0.24rem 0.6rem;
		}
	}
	.close{
		text-align: center;
		height:0.92rem;
		line-height: 0.92rem;
		border-bottom: 1px solid #dedede;
		i{
			display:block;
			width:0.2rem;
			font-weight: 700;
			margin:0 auto;
		}
	}
}
</style>