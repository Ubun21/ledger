<template>
	<view class="numpan-wrapper">
		<button class="but"
		  v-for="(val, index) in numPad"
		  :key="index"
		  :class="[(val === '完成')? 'done' : '']"
		  @click="clickHandle(index)">{{val}}</button>
	</view>
</template>

<script>
	export default {
		name:"num-pad",
		data() {
			return {
				numPad: [
					1, 2, 3, '+',
					4, 5, 6, '-',
					7, 8, 9, '完成',
					'.', 0, 'dele'
				]
			};
		},
		methods: {
			clickHandle (index) {
				console.info(this.numPad[index])
				this.$emit('change', this.numPad[index])
			}
		}
	}
</script>

<style scoped lang="scss">
.numpan-wrapper {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: 120rpx 120rpx 120rpx 120rpx;
	.but {
		line-height: 120rpx;
		border-radius: 0px;
		margin: 0rpx;
		font-size: 20rpx;
	}
	.but.done {
		grid-column: 4;
		grid-row: 3 / 5;
		line-height: 240rpx;
	}
	.but:after {
		content: '',;
		border: 0px solid #F8F8F8;
	}
	.but:first-child {
		// 1
		background: #f2f2f2;
	}
	.but:nth-child(2) {
		//2
		background: #e8e8e8;
	}
	.but:nth-child(3) {
		// 3
		background: #dedede
	}
	.but:nth-child(4) {
		// +
		background: #d3d3d3
	}
	.but:nth-child(5) {
		// 4
		background: #dedede;
	}
	.but:nth-child(6) {
		// 5
		background: #d3d3d3
	}
	.but:nth-child(7) {
		// 6
		background: #c9c9c9;
	}
	.but:nth-child(8) {
		// -
		background: #c9c9c9;
	}
	.but:nth-child(9) {
		// 7
		background: #dedede
	}
	.but:nth-child(10) {
		// 8
		background: #d3d3d3;
	}
	.but:nth-child(11) {
		// 9
		background: #c9c9c9;
	}
	.but:nth-child(12) {
		// done
	    background: #b5b5b5;
	}
	.but:nth-child(13) {
		// dot
		background: #d3d3d3;
	}
	.but:nth-child(14) {
		// 0
		background: #c9c9c9;
	}
	.but:nth-child(15) {
		// del
		background: #bfbfbf;
	}
}
</style>
