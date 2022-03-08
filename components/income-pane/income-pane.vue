<template>
	<view class="income-pane-wrapper">
		<uni-icons
			v-for="(item, index) in icons"
			:iconClassName="item.iconClassName"
			:title="item.name"
			:isSelected="index === activeIndex"
			class="item"
			@click="clickHandle({id: index, ...item})"
		></uni-icons>
	</view>
</template>

<script>
	export default {
		name:"income-pane",
		data() {
			return {
				activeIndex: 0,
				icons: [
					{ iconClassName: 'icon-yuangonggongzi', name: '工资'},
					{ iconClassName: 'icon-jianzhi', name: '兼职'},
					{ iconClassName: 'icon-jiangjinguize', name: '奖金'},
					{ iconClassName: 'icon-baoxiao', name: '报销'},
					{ iconClassName: 'icon-lijin', name: '礼金'},
				],
			};
		},
		methods: {
			clickHandle: function(item) {
				this.activeIndex = item.id
				this.$emit('inComeActiveCh', item)
			}
		}
	}
</script>

<style scoped lang="scss">
.income-pane-wrapper {
	.item {
		padding-top: 24rpx;
		width: 25%;
	}
}
</style>
