<template>
	<view class="bill-wrapper">
		<view class="list-mark">
			<view class="left">
				<text class="text">{{ time }}</text>
				<text>{{ getWeekDay() }}</text>
			</view>
			<view class="right">
				<text>{{ total > 0 ? '收入' : '支出'}}</text>
				<text>{{ total }}</text>
			</view>
		</view>
		<list class="list"
			@long-click="longClickHandle"
			@short-click="shortClickHandle"
			:dataProps="dates"
			></list>
		<confirm
			:show="show"
			@cancel="cancelHandle"
			@confirm="confirmHandle"
		></confirm>
	</view>
</template>

<script>
	import moment from 'moment';
	import store from '@/store/index.js'
	export default {
		name:"bill",
		props: ['dates', 'total', 'time'],
		emits: ['shortClick'],
		data() {
			return {
				show: false,
				item: null
			};
		},
		methods: {
			getWeekDay: function() {
				const map = {
					1: '星期一',
					2: '星期二',
					3: '星期三',
					4: '星期四',
					5: '星期五',
					6: '星期六',
					7: '星期天',
				}
				const index = moment(this.$props.time).isoWeekday()
				return map[index]
			},
			shortClickHandle: function(item) {
				uni.navigateTo({
					url: `../../pages/editor/editor`,
					success() {
						store.dispatch('setEditorItemId', item.id)
					}
				})
				this.$emit('shortClick', item)
			},
			longClickHandle: function(item) {
				this.show = true
				this.item = item
			},
			cancelHandle: function() {
				this.show = false
			},
			confirmHandle: function() {
				this.show = false
				store.dispatch('removeItem', this.item)
			}
		}
	}
</script>

<style scoped lang="scss">
.bill-wrapper {
	.list-mark {
		display: flex;
		padding: 5rpx 20rpx;
		border-bottom: 1px solid #ddd;
		.left {
			width: 40%;
			.text {
				padding-right: 10rpx;
			}
		}
		.right {
			flex: 1;
			text-align: right;
		}
	}
	.list {
		padding: 20rpx;
	}
}
</style>
