<template>
	<div class="content">
		<div class="result">
			<div class="list flex-box align-center">
				<img src="/static/images/logo2.png" class="list-img" />
				<div class="list-texts flex1">
					<div class="list-text2">宁波霍建华</div>
					<div class="list-text1">猪年吉祥万事大吉猪年吉祥</div>
				</div>
			</div>
			<div class="list flex-box align-center">
				<img src="/static/images/logo2.png" class="list-img" />
				<div class="list-texts flex1">
					<div class="list-text2">宁波霍建华</div>
					<div class="list-text1">猪年吉祥万事大吉猪年吉祥</div>
				</div>
			</div>
			<div class="list flex-box align-center">
				<img src="/static/images/logo2.png" class="list-img" />
				<div class="list-texts flex1">
					<div class="list-text2">宁波霍建华</div>
					<div class="list-text1">猪年吉祥万事大吉猪年吉祥</div>
				</div>
			</div>
			<div class="return" @click="back">返回</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			back(){
				history.go(-1)
			},
		}
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.content{
	width: 100%;height: 100%;background: url(/static/images/banner2.png) no-repeat center/100% 100%;position: relative;min-width: 1360px;background-attachment: fixed;
	.result{
		position: absolute;top: 50%;transform: translateY(-50%);-webkit-transform:translateY(-50%) ;-moz-transform:translateY(-50%) ;-ms-transform:translateY(-50%) ;width: 100%;
		.list{
			margin-left: 20%;margin-top: 50px;
			.list-img{width: 70px;height: 70px;border-radius: 50%;margin: 0 10px;}
			.list-texts{
				color: #ffffff;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;
				.list-text1{font-size: 32px;}
				.list-text2{font-size: 16px;}
			}
		}
		.return{width: 200px;text-align: center;height: 40px;line-height: 40px;color: #fff;border-radius: 40px;cursor: pointer;background: url(/static/images/btn1.png) no-repeat center/contain;margin: 0 auto;margin-top:100px ;}
	}
}
</style>
