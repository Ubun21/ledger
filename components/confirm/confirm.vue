<template>
	<teleport to="body">
		<view v-if="show"  class="confirm-wrapper">
			<view class="content">
				<view class="title">确定要删除?</view>
				<view class="body">
					<view class="cancel" @click="cancelHandle">取消</view>
					<view class="line"></view>
					<view class="confirm" @click="confirmHandle">确定</view>
				</view>
			</view>
		</view>
	</teleport>
</template>

<script>
	import { defineComponent, ref } from 'vue'
	export default defineComponent({
		props:{
			show: {
				type: Boolean,
				default: false
			}
		},
		emits: ['cancel', 'confirm'],
		setup(props, { emit }) {
			const cancelHandle = () => {
				emit('cancel', false)
			}
			const confirmHandle = () => {
				emit('confirm', true)
			}
			return {
				cancelHandle,
				confirmHandle
			}
		}
	})
</script>

<style lang="scss" scoped>
.confirm-wrapper {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	background-color: #00000080;
	display: flex;
	justify-content: center;
	padding-top: 500rpx;
	.content {
		background-color: #ffda47;
		position: absolute;
		border-radius: 4px;
		.title {
			font-size: 48rpx;
			padding: 0 12px;
		}
		.body {
			display: flex;
			justify-content: space-around;
			border-top: 1px solid rgba(255, 255, 255, 0.5);
			.cancel {
				font-size: 40rpx;
			}
			.line {
			 	border-right: 1px solid rgba(255, 255, 255, 0.5);
			}
			.confirm {
				font-size: 40rpx;
			}
		}
	}
}
</style>
