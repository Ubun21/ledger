<template>
	<view class="qiun-wrapper">
		<qiun-data-charts
		    type="line"
			:opts="options"
		    :chartData="chartData"
		    background="none"
		  />
	</view>
</template>

<script>
	export default {
		name:"uni-chart",
		props: ['category', 'model', 'categoriesProp', 'seriesDataProp'],
		data() {
			return {
				options: {
					yAxis: {
						"disabled": true,
						"disableGrid": true,
					},
					legend: {
						"show": false
					},
					xAxis: {
						"fontSize": 6
					},
					extra: {
						markLine: {
							"type": "dash",
							"dashLength": "5",
						    data: [
								{
								  lineColor: "#333",	
								  value: 0 ,
								}
							]
						}
					}
				},
				chartData: {
				    "categories": this.$store.getters.past7Day.keys,
				    "series": [
				        {
							"color": '#ffda47',
				            "data": this.$store.getters.past7Day.values,
							"markLine": {
							    "data": [{ "type": 'average', "name": 'Avg' }]
							}
				        }
				    ]
				}
			};
		},
		watch: {
			model: function(newVal) {
				this.chartData.categories = newVal.keys
				this.chartData.series[0].data = newVal.values
			},
			categoriesProp: function(newVal) {
				this.chartData.categories = newVal
			},
			seriesDataProp: function(newVal) {
				this.chartData.series[0].data = newVal
				let value = 0
				for (let p of newVal) {
					value += p
				}
				this.options.extra.markLine.data[0].value = value / newVal.length
			}
		}
	}
</script>

<style>
.qiun-wrapper {
	height: 400rpx;
}
</style>
