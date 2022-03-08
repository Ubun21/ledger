<template>
	<view class="ledger-wrapper">
		<view class="header">
			<text @click="goBack">取消</text>
		</view>
		<view class="content">
			<tab class="tab" 
				v-model:activeName="activeName"
				@tab-click="tabClickHandle"
				:titleHeadStyle="titleHeadStyle"
				:tabItemStyle="tabItemStyle"
				:selectedItemStyle="selectedItemStyle"
				>
				<tab-pane class="tab-item" label="支出" name="out">
					<outcome-pane @activeChange="activeChangleHandle"></outcome-pane>
				</tab-pane>
				<tab-pane class="tab-item" label="收入" name="in">
					<income-pane @inComeActiveCh="inComeActiveChHan"></income-pane>
				</tab-pane>
			</tab>
		</view>
		<view class="footer">
			<view class="note">
				<view class="left">
					<view class="iconfont icon-gongjiao"></view>
					<view>备注:</view>
				</view>
				<input v-model="text" class="right" placeholder="写点备注吧!" />
			</view>
			<view class="pad">{{ (!numStr)? '0' : numStr }}</view>
			<num-pad @change="changeHandle"></num-pad>
		</view>
	</view>
</template>

<script>
	// 格式为{id: '标识', type: '+/-', amout: '消费金额', date: '日期', mark: '备注', tagName: {name:'', value: ''}}
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				activeName: 'out',  
				numStr: '',
				text: '',
				tagName: {
					iconClassName: 'icon-canshi',
					name: '餐饮'
				},
				titleHeadStyle: {
					display: 'flex',
					justifyContent: 'center',
					background: '#ffda47',
				},
				tabItemStyle: {
					paddingLeft: '48rpx',
					paddingTop: '32rpx',
					paddingRight: '48rpx',
					paddingBottom: '32rpx',
					fontSize: '60rpx'
				},
				selectedItemStyle: {
					borderBottom: '1px solid #333'
				}
			}
		},
		watch: {
			text: function(val) {
				console.info(val)
			}
		},
		methods: {
			goBack () {
				uni.showTabBar({})
				uni.switchTab({
				    url: '/pages/index/index'
				})
			},
			hasSymbol () {
				return /[\+-\.]/.test(this.numStr)
			},
			handleClick(tab, event) {
			    console.log(tab, event);
			},
			tabClickHandle (item) {
				if (item.id === 0) {
					this.tagName = {
						iconClassName: 'icon-canshi',
						name: '餐饮'
					}
				} else {
					this.tagName = {
						iconClassName: 'icon-yuangonggongzi',
						name: '工资'
					}
				}
			},
			activeChangleHandle (item) {
				if (item.name === '完成') return
				this.tagName = {
					iconClassName: item.iconClassName,
					name: item.name
				}
			},
			inComeActiveChHan (item) {
				this.tagName = {
					...item
				}
			},
			changeHandle (item) {
				const map = {
					'number': (item) => {
						if ((this.numStr.length > 6) && !this.hasSymbol()) {
							return
						}
						if (!this.numStr) {
							this.numStr = String(item)
						} else {
							this.numStr += String(item)
						}
					},
					'+': () => {
						if (!this.numStr) {
							return
						}
						this.numStr += '+'
					},
					'-': () => {
						if (!this.numStr) {
							return
						}
						this.numStr += '-'
					},
					'.': () => {
						if (!this.numStr)  {
							return
						}
						this.numStr += '.'
					},
					'dele': () => {
						if (!this.numStr) {
							this.numStr = '0'
						} else {
							const arr = Array.from(this.numStr)
							arr.pop()
							this.numStr = arr.join('')
						}
					},
					'完成': () => {
						const add = this.numStr.indexOf('+') > 0 ? true : false
						const sub = this.numStr.indexOf('-', 1) > 0 ? true : false 
						let result = 0
						if (add) {
							const arr = this.numStr.split('+')
							result = Number(arr[0]) + Number(arr[1])
						} else if (sub) {
							const arr = this.numStr.split('-')
							result = arr.length === 3 ? Number(arr[1]) - Number(arr[2]) :
								Number(arr[0]) - Number(arr[1])
						} else {
							result = Number(this.numStr)
						}
						
						if (!result) return
						store.dispatch('addItem', {
							type: this.activeName === 'out' ? '-' : '+',
							amount: result,
							date: Date.now(),
							mark: this.text,
							tagName: this.tagName
						})
						this.numStr = ''
					}
				}
				if (typeof item === 'number') {
					map['number'](item)
				} else {
					map[item]()
				}
			}
		},
		onShow() {
			uni.hideTabBar({
				fail() {
					console.info('隐藏tabbar失败')
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
.ledger-wrapper {
	position: relative;
	.header {
		position: absolute;
		top: 100rpx;
		right: 10rpx;
		font-size: 36rpx;
	}
	.content {
	}
	.footer {
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		right: 0rpx;
		.note {
			display: flex;
			align-items: center;
			border-top: 2rpx solid #f5f5f5;
			background: #fff;
			.left {
				display: flex;
				justify-content: space-around;
				flex-basis: 150rpx;
				align-items: center;
			}
			.right {
				flex: 1;
				padding-left: 24rpx;
			}
		}
		.pad {
			background: #f5f5f5;
			vertical-align: middle;
			word-spacing: 15px;
			padding: 12rpx 24rpx;
			font-size: 48rpx;
			line-height: 48rpx;
			text-align: right;
		}
	}
}
</style>
