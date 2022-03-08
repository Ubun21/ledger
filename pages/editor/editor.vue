<template>
	<view class="editor-wrapper">
		<view class="header">
			<view class="iconfont icon-fanhui"
				@click="goBack"
			></view>
			<view class="icon">
				<uni-icons
					:iconClassName="item?.tagName?.iconClassName"
					:title="item?.tagName?.name"
				></uni-icons>
			</view>
		</view>
		<view class="content">
			<u-input label="类型" :placeHolder="type" :disEditorAble="true"></u-input>
			<u-input v-model:value="item.amount" label="金额" :placeHolder="item?.amount"></u-input>
			<picker  mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
			    <view class="time-picker-h">
					<text class="label">时间</text>
					<view class="time">{{date}}</view>
				</view>
			</picker>
			<u-input v-model:value="item.mark" label="备注" :placeHolder="item?.mark"></u-input>
		</view>
		<view class="footer">
			<text class="complete" @click="completeFn">编辑完成</text>
			<view class="line"></view>
			<text class="dele" @click="deleFn">删除</text>
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js'
	import moment from 'moment'
	export default {
		data() {
			return {
				item: this.$store.getters.eidtorItem,
				activeName: 'in',
				text: ''
			}
		},
		methods: {
			goBack: function() {
				this.switchToIndex()
			},
			switchToIndex: function() {
				uni.switchTab({
					url: '../index/index'
				})
			},
			completeFn: function() {
				store.dispatch('updateItem', this.item)
				this.switchToIndex()
			},
			bindDateChange(event) {
				this.item.date = event.detail.value
			},
			deleFn: function() {
				store.dispatch('removeItem', this.item)
				this.switchToIndex()
			}
		},
		computed: {
			type: function() {
				if (this.item?.type === '-') {
					return '支出'
				} else {
					return '收入'
				}
			},
			date() {
				return moment(this.item.date).format('YYYY-MM-DD')
			},
			startDate() {
				const timeStr = moment(this.item.date)
					.subtract(10, 'years').format('YYYY-MM-DD')
			    return timeStr
			},
			endDate() {
				const timeStr = moment(this.item.date).format('YYYY-MM-DD')
			    return timeStr
			},
		},
		watch: {
		},
		onReady() {
		   console.info('editor ready')
		   
		},
		onUnload() {
			console.info('editor destory event')
			uni.$off('editorItem')
		}
	}
</script>

<style scoped lang="scss">
.editor-wrapper {
	.header {
		background: #ffda47;
		padding: 16rpx 32rpx;
		display: flex;
		align-items: center;
		.icon {
			flex: 1;
			text-align: center;
		}
	}
	.content {
		padding-left: 48rpx;
		.time-picker-h {
			display: flex;
			color: gray;
			align-items: center;
			border-bottom: 2rpx solid #ddd;
			font-size: 40rpx;
			padding: 40rpx;
			.label {
				padding-right: 32rpx;
			}
			.time {
				color: #333333;
				font-size: 36rpx;
			}
		}
	}
	.footer {
		position: fixed;
		display: flex;
		text-align: center;
		left: 0rpx;
		right: 0rpx;
		bottom: 0rpx;
		padding: 20rpx 0rpx;
		border-top: 2rpx solid #929292;
		font-size: 36rpx;
		color: gray;
		box-sizing: content-box;
		.complete {
			flex: 1;
			color: black;
			padding: 20rpx;
		}
		.line {
			border-right: 2rpx solid #929292;
		}
		.dele {
			flex: 1;
			color: red;
			padding: 20rpx;
		}
	}
}
</style>
