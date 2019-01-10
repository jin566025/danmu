<template>
	<div class="content" :class="result ? 'overflow-s':'overflow-h' ">
		<img  v-show="!result" src="/static/images/banner2.png" class="content-banner" />
		<div class="lists"  v-show="!result">
			<div class="list flex-box align-center move":style="{ animationDelay:item.delay+'ms', top:((index+1)%3)*120 + 'px',animationDuration:animationDuration+'s' }" :class="item.class" v-for="(item,index) in lists" :key="item.id" >
				<img :src="item.headUrl" class="list-img" />
				<div class="list-texts flex1">
					<div class="list-text1">{{item.content}}</div>
					<div class="list-text2">{{item.userName}}</div>
				</div>
			</div>
		</div>
		<div class="footer flex-box align-center just-center"  v-show="!result">
			<div class="footer-nav" @click="selectShowFun">选择中奖人数</div>
			<div class="footer-nav" @click="chou">抽奖</div>
			<div class="footer-nav" :class="index==currentIndex ? 'btn2':'' " @click="changeSpeed(index)" v-for="(item,index) in speed">{{item}}x</div>
			
		</div>
		
		<div class="results" v-show="result">
			<img src="/static/images/banner2.png" class="result-banner" />
			<div class="result">
				<div class="list flex-box align-center just-center" v-for="(item,index) in awardList" :key="item.id" >
					<img :src="item.headUrl" class="list-img" />
					<div class="list-texts flex1">
						<div class="list-text2">{{item.userName}}</div>
						<div class="list-text1">{{item.content}}</div>
					</div>
				</div>
				
				<div class="return" @click="back">返回</div>
			</div>
		</div>
		
		<div class="shadow" v-show="selectShow"></div>
		<div class="dialog absolute-center"  v-show="selectShow">
			<img src="/static/images/close.png"class="close" @click="closeSelct" />
			<div class="flex-box align-center ">
				<div @click="selectNum(index)" class="dialog-btn" :class="index==awardIndex ? 'award-btn':'' " v-for="(item,index) in awardNum">{{item}}</div>
			</div>
		</div>
	</div>
</template>

<script>
  import { allShowActiveUser } from '@/api/api'
  export default {
  	data(){
  		return{
			lists:[],
			activeColor:"red",
			fontSize:30,
			result:false,
			chouNum:3,
			awardList:[],
			animationDuration:20,
			speed:[1,5,10],
			currentIndex:0,
			awardNum:[3,4,5,6,7,8,9,10],
			awardIndex:0,
			selectShow:false,
			uuid:"ed59e63d296942b8868e21d77b1974c3"
  		}
  	},
	mounted(){
		let that = this;
		that.getList()
		this.$nextTick(()=>{
			setInterval(()=>{
				that.getList()
			},5000)
		})
	},
	created(){
		
		
	},
	methods:{
		closeSelct(){
			this.selectShow = !this.selectShow 
		},
		selectShowFun(){
			this.selectShow = !this.selectShow 
		},
		selectNum(index){
			this.awardIndex = index;
			this.chouNum = this.awardNum[index]
		},
		changeSpeed(speed){
			this.currentIndex = speed
			console.log(speed)
			switch(speed){
				case 0:
					this.animationDuration = 20
					break;
				case 1:
					this.animationDuration = 15
					break;
				case 2:
					this.animationDuration = 10
					break;
				default: 
					this.animationDuration = 20
					break; 
			}
		},
		chou(){
			this.result = !this.result;
			let lists = this.lists;
			let maxNum = lists.length-1;
			let chouNum = this.chouNum;
			let indexlist = [];
			let awardList = [];
			let idx = 0;
			let getChouNum = () =>{
				if(idx<chouNum){
					let randomNum = this.randomNum(0,maxNum);
					if(indexlist.indexOf(randomNum)==-1){
						indexlist.push(randomNum);
						awardList.push(lists[randomNum])
						idx = idx+1
					}
					getChouNum()
				}
			}
			getChouNum();
			this.awardList = awardList;
		},

		back(){
			this.result = !this.result
		},
		getList(){
			let that = this;
			let maxNum = 9;
			allShowActiveUser({uuid:that.uuid}).then(res=>{
				let lists = res.data.items;
				lists.map((item,index)=>{
					let _randomNum = that.randomNum(0,maxNum);
					_randomNum = _randomNum+1
					item.class = "bgc"+_randomNum;
					item.delay = index*1000
				})
				console.log(lists)
				that.lists = lists;
			})
			
		},
		setDelay(index){
			let lists = this.lists;
			console.log(lists[index].delay)
			return lists[index].delay
		},
		randomNum(minNum,maxNum){ 
			switch(arguments.length){ 
				case 1: 
					return parseInt(Math.random()*minNum+1,10); 
				break; 
				case 2: 
					return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
				break; 
					default: 
						return 0; 
					break; 
			} 
		} 
	}
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
	.content{
		 width: 100%;height: 100vh;position: relative;min-width: 1360px;
		 .content-banner{position: fixed;top:0; width: 100%;height: 100vh;}
		.footer{
			position: absolute;bottom: 50px;height: 80px;width: 100%;
			.footer-nav{
				width: 200px;text-align: center;height: 40px;line-height: 40px;color: #fff;margin: 0 20px;border-radius: 40px;cursor: pointer;
				background: url(/static/images/btn1.png) no-repeat center/contain;
			}
			.btn2{background: url(/static/images/btn2.png) no-repeat center/contain;}
		}
		.lists{
			height: 100%;width: 100%;position: relative;margin-top: 30px;
			.list{
				position: absolute;top: 100px;padding: 0 20px 0 0;height:80px;border-radius: 80px;max-width:500px;left:100%;
				.list-img{width: 70px;height: 70px;border-radius: 50%;margin: 0 10px;}
				.list-texts{
					color: #ffffff;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;max-width:500px;
					.list-text1{font-size: 24px;margin-bottom: 5px;}
					.list-text2{font-size: 16px;}
				}
			}
		}
		.results{
			width: 100%;height: 100%;position: relative;min-width: 1360px;
			.result-banner{width: 100%;height: 100vh;position: fixed;top: 0;z-index: -1;}
			.result{
				width: 100%;
				.list{
					margin-left: 20%;margin-top: 50px;
					.list-img{width: 70px;height: 70px;border-radius: 50%;margin: 0 10px;}
					.list-texts{
						color: #ffffff;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;
						.list-text1{font-size: 32px;}
						.list-text2{font-size: 16px;}
					}
				}
				.return{width: 200px;text-align: center;height: 40px;line-height: 40px;color: #fff;border-radius: 40px;cursor: pointer;background: url(/static/images/btn1.png) no-repeat center/contain;margin: 50px auto;}
			
			}
		}
		
		.shadow{width: 100%;height: 100%;position: fixed;background-color: rgba(0,0,0,0.6);z-index: 998;top: 0;left: 0;}
		.dialog{
			position: fixed;width: 600px;height: 100px;border-radius: 10px;z-index: 999;background-color: #fff;text-align: right;
			.close{width: 30px;height: 30px;cursor: pointer;margin-bottom: 10px ;}
			.dialog-btn{width:60px;height: 30px;line-height: 30px;text-align: center;background-color: #FF4B31;border-radius: 30px;color: #fff;font-size: 14px;margin: 0 10px;cursor: pointer;}
			.award-btn{background-color: #FF2E10;}
		}
	}
	.move{animation: move linear forwards;}
	.overflow-h{overflow: hidden;}
	.overflow-s{overflow: scroll;}
	.bgc1{background-color: rgba(240,80,160,0.6);}
	.bgc2{background-color: rgba(180,80,180,0.6);}
	.bgc3{background-color: rgba(130,190,130,0.6);}
	.bgc4{background-color: rgba(240,80,90,0.6);}
	.bgc5{background-color: rgba(130,160,180,0.6);}
	.bgc6{background-color: rgba(250,190,170,0.6);}
	.bgc7{background-color: rgba(240,110,150,0.6);}
	.bgc8{background-color: rgba(255,75,50,0.6);}
	.bgc9{background-color: rgba(170,80,180,0.6);}
	.bgc10{background-color: rgba(14,141,195,0.6);}
	@keyframes move {
	   from {
		left: 100%;
	  }
	  to {
		left: -100%;
	  }
	}
</style>