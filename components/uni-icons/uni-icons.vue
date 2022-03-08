<template>
	<view class="icon-wrapper">
		<view :class="['iconfont', 
			iconClassName, 
			(isSelected)? 'selected' : '']"
			></view>
		<br />
		<view class="text">{{ title }}</view>
	</view>
</template>

<script>
	export default {
		name:"uni-icons",
		props:['iconClassName', 'title', 'isSelected'],
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
.icon-wrapper {
	display: inline-block;
	text-align: center;
	.iconfont {
		display: inline-block;
		line-height: 90rpx;
		font-size: 90rpx;
	}
	.selected::before {
		padding: 10rpx;
		border-radius: 50%;
		background: #ffda47;
	}
	.text {
		display: inline-block;
		padding-top: 10rpx;
	}
}
</style>
