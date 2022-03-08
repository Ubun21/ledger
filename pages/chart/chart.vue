<template>
	<view class="chart-wrapper">
		<view class="text">支出</view>
		<tab 
			v-model:activeName="activeName"
			:titleHeadStyle="titleHeadStyle"
			:tabItemStyle="tabItemStyle"
			:selectedItemStyle="selectedItemStyle"
			>
			<tab-pane class="item" label="周" name="week">
				本周
			</tab-pane>
			<tab-pane class="item" label="月" name="month">
				本月
			</tab-pane>
			<tab-pane class="item" label="年" name="year">
				本年
			</tab-pane>
		</tab>
		<view class="calctor">
			<view class="total">总支出: ￥{{totalOut}}</view>
			<view class="avg">平均值: ￥{{Number(totalAvg).toFixed(2)}}</view>
		</view>
		<uni-chart 
			:categoriesProp="echartData.keys"
			:seriesDataProp="echartData.values"
			></uni-chart>
		<view class="outRanking">
			<view class="title">支出排行榜</view>
			<view class="body">
				<list 
					:dataProps="list"
					:textStyle="textStyle"></list>
			</view>
		</view>	
	</view>
</template>

<script>
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				activeName: 'week',
				tabItemStyle: {
					textAlign: 'center',
					width: '33.3%',
					boxSizing: 'border-box',
					border: '1px solid #333',
					fontSize: '14px',
				},
				titleHeadStyle: {
					background: '#ffda47',
					padding: '20px'
				},
				selectedItemStyle: {
					color: '#ffda47',
					background: '#333'
				},
				textStyle: {
					fontSize: '12px'
				},
				echartData: {
					keys: [],
					values: []
				},
				totalOut: 0,
				totalAvg: 0
			}
		},
		computed: {
			list: function() { 
				const vals = Object.values(store.getters.outComeRanking)
				vals.splice(0, 1)
				return vals
			}
		},
		watch:{
			// 根据tabItem动态切换图表
			activeName: function(newVal) {
				if (newVal === 'week') {
				   this.setechartDataAndTotal(store.getters.past7Day)
				} else if (newVal === 'month') {
				    this.setechartDataAndTotal(store.getters.currMonth)
				} else {
				   this.setechartDataAndTotal(store.getters.lastYear)
				}
			}
		},
		methods: {
			sum: function(arr) {
				return arr.reduce((acc, curr) => acc + curr, 0)
			},
			setechartDataAndTotal: function(data) {
				this.echartData.keys = data.keys
				this.echartData.values = data.values
				const value = this.sum(data.values)
				this.totalOut = value
				this.totalAvg = value / data.keys.length
			}
		},
		onShow() {
			this.setechartDataAndTotal(store.getters.past7Day)
		}	
	}
</script>

<style lang="scss" scoped>
.charts-box{
  width: 100%;
  height:300px;
}
.chart-wrapper {
	.text {
		font-size: 18px;
		text-align: center;
		background: #ffda47;
	}
	.item {
		padding: 0px 10px;
		font-size: 16rpx;
		border-bottom: 1rpx solid #B2B2B2;
	}
	.calctor {
		color: #B2B2B2;
		.total {
			font-size: 14px;
		}
		.avg {
			font-size: 12px;
		}
	}
	.outRanking {
		padding: 10px;
		.title {
			padding-bottom: 5px;
		}
		.body {
			
		}
	}
}
</style>
