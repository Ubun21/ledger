<template>
	<view class="list-wrapper">
		<view
			v-for="(item, index) in dataProps"
			:key="index"
			class="item"
			@touchstart="startHandle(item)"
			@touchend="endHandle(item)"
			>
			<view :class="['iconfont', item?.tagName?.iconClassName]"></view>
			<view :style="textStyle" class="text">{{item?.tagName?.name}}</view>
			<view class="amount">{{ format? format(amount(item)) : amount(item)}}</view>
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js'
	export default {
		name:"list",
		props: ['dataProps', 'format', 'textStyle'],
		emits:['shortClick', 'longClick'],
		data() {
			return {
				startTime: 0,
				timeId: null
			};
		},
		methods: {
			amount: function(item) {
				if (item.type === '-') {
					return 0 - item.amount
				} else {
					return item.amount
				}
			},
			startHandle: function(item) {
				this.startTime = Date.now()
				this.timeId = setTimeout(() => {
					this.$emit('longClick', item)
				}, 1000)
			},
			endHandle: function(item) {
				const endTime = Date.now()
				const duration = endTime - this.startTime
				if (duration < 900 ) {
					this.$emit('shortClick', item)
					clearTimeout(this.timeId)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
.list-wrapper {
	.item {
		display: flex;
		align-items: center;
		padding-bottom: 40rpx;
		.iconfont {
			color: #555555;
			font-size: 50rpx;
			line-height: 50rpx;
			padding-right: 30rpx;
			text-align: center;
		}
		.iconfont::before {
			border-radius: 50%;
			padding: 16rpx;
			background-color: #f5f5f5;;
		}
		.text {
			color: #555555;
			font-size: 50rpx;
			line-height: 50rpx;
			text-align: center;
		}
		.amount {
			flex: 1;
			font-size: 40rpx;
			text-align: right;
		}
	}
}
</style>
