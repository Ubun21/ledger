<template>
	<view class="date-picker-wrapper">
		<picker @change="bindPickerChange" :value="index" :range="array">
		    <view class="uni-input" :style="titleStyle">{{ monthsFormater }}</view>
		</picker>
	</view>
</template>

<script>
	import { getLabelTime } from '@/utils/index.js'
	export default {
		name:"date-picker",
		props: ['type', 'titleStyle'],
		emits: ['selectDate'],
		data() {
			return {
				array: this.getArrayDate(),
				index: 0
			}
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.detail.value
				this.$emit('selectDate', this.array[this.index])
			},
			getArrayDate: function() {
				if (this.type === 'years') {
					return getLabelTime('years', 10)
				} else {
					return getLabelTime('months', 10)
				}
			}
		},
		computed: {
			monthsFormater: function() {
				const dateStr = this.array[this.index].split('/')
				if (this.type === 'months') {
					return dateStr[0] + '月'
				}
				return dateStr[0] + '年'
			}
		}
	}
</script>

<style lang="scss" scoped>
.date-picker-wrapper {
	display: inline-block;
	.uni-input {
		padding: 0px;
	}
}
</style>
