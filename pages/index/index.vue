<template>
	<view class="index-wrapper">
		<view class="header">
			<image src="../../static/logo.png"></image>
			<view class="bottom">
				<view class="selector">
					<date-picker
						type="years"
						:titleStyle="yearsTitelStyle"
						@selectDate="yearSelectHandle"
					></date-picker>
					<date-picker
						type="months"
						:titleStyle="monthsTitleStyle"
						@selectDate="monthSelectHandle"
					></date-picker>
				</view>
				<view class="line"></view>
				<view class="inCome">
					<view>收入</view>
					<view>{{allInComeByDate}}</view>
				</view>
				<view class="outCome">
					<view>支出</view>
					<view>{{allOutComeByDate}}</view>
				</view>
			</view>
		</view>
		<view class="body">
			<view v-for="(item, index) in bills" class="record">
				<bill 
					:dates="item.list" 
					:total="item.total"
					:key="index"
					:time="index"
					></bill>
			</view>
			<view v-if="Object.keys(bills).length === 0" class="no-record">
				<view class="iconfont icon-gongjiao"></view>
				<view class="text">你暂时还没有记录,赶快去记录一笔吧!</view>
			</view>
		</view>
	</view>
</template>

<script>
import { defineComponent, ref, computed, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { getDateStr } from '@/utils/index.js'


export default defineComponent({
	name: 'Index',
	setup () {
		// console.info(store.getters.today, 'index')
		const date = ref(getDateStr('MM-YYYY'))
		const store = useStore()
		const monthsTitleStyle = ref({
			"fontSize": "16px",
			"background": "#ffda47"
		})
		const yearsTitelStyle = ref({
			"background": "#ffda47"
		})
		const allBills = computed(() => {
			return store.getters.allBills.filter(item => {
				return getDateStr('MM-YYYY', item.date) === date.value
			})
		})
		const allInComeByDate = computed(() => getInOrOutCome('+'))
		const allOutComeByDate = computed(() => getInOrOutCome('-'))
		const getInOrOutCome = (inOrOut) => {
			return allBills.value.filter(item => {
				return item.type === inOrOut && (getDateStr('MM-YYYY', item.date) === date.value)
			}).reduce((acc, curr) => {
				return acc + curr.amount
			}, 0)
		}
		const yearSelectHandle = (newDate) => {
			const dateStr = date.value.split('-')
			date.value = dateStr[0] + '-' + newDate	
		}
		const monthSelectHandle = (newDate) => {
			const dateStr = date.value.split('-')
			date.value = newDate + '-' + dateStr[1]
		}
		const bills = computed(() => {
			return allBills.value.reduce((acc, curr) => {
				const date = getDateStr('YYYY-M-D', curr.date)
				if (!acc.hasOwnProperty(date)) {
					acc[date] = {
						list: [],
						'total': 0
					}
				}
				acc[date].list.push(curr)
				curr.type === '+' ? (acc[date].total += curr.amount) : 
					(acc[date].total -= curr.amount)
				return acc
			}, {})
		})
		watchEffect(() => console.info(bills.value))
		watchEffect(() => console.info(date.value))
		return {
			date,
			monthsTitleStyle,
			yearsTitelStyle,
			allInComeByDate,
			allOutComeByDate,
			yearSelectHandle,
			monthSelectHandle,
			bills
		}
	},
	onShow() {
	}
})
</script>

<style scoped lang="scss">
.index-wrapper {
	.header {
	    background: #ffda47;
		text-align: center;	
		image {
			width: 50%;
			height: 100rpx;
		}
		.bottom {
			display: flex;
			align-items: center;
			.selector {
				display: flex;
				flex-direction: column;
				padding: 12px;
			}
			.line {
				background: #333333;
				width: 1px;
				height: 30px;
			}
			.inCome {
				padding: 12px;
				margin-right: 48px;
			}
			.outCome {
				padding: 12px;
			}
		}
	}
	.body {
		.record {
		}
		.no-record {
			display: flex;
			align-items: center;
			flex-direction: column;
			.iconfont {
				font-size: 96rpx;
			}
		}
	}
}
</style>
