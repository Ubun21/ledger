<template>
	<view class="outcome-pane-wrapper">
		<view class="item"
		 v-for="(item, index) in tags"
		 @click="clickHandle({index, ...item})"
		>
			<uni-icons
				:iconClassName="item.iconClassName"
				:title="item.name"
				:isSelected="activeIndex === index"
			></uni-icons>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name:"outcome-pane",
		data() {
			return {
				activeIndex: 0
			};
		},
		computed: {
			...mapState({
				tags: (state) => state.tag.tags
			})
		},
		methods: {
		 	clickHandle: function (item) {
				this.activeIndex = item.index
				this.$emit('activeChange', item)
			}
		}
	}
</script>

<style scoped lang="scss">
.outcome-pane-wrapper {
	padding-top: 20rpx;
	.item {
		padding-top: 10rpx;
		display: inline-block;
		width: 25%;
		text-align: center;
	}
}
</style>
