<template>
	<view class="tabs-wrapper">
		<view 
			class="tabs-title" 
			v-if="labels.length"
			:style="titleHeadStyle"
			>
			<view :class="['t-title-item', (activeName === item.name)? 'selected' : '']"
				v-for="(item, index) in labels"
				@click="clickHandle({id: index, ...item})"
				:style="[tabItemStyle, (activeName === item.name)? selectedItemStyle : {} ]"
				>
				{{item.label}}
			</view>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	import { defineComponent, provide, ref } from 'vue'
	export default defineComponent({
		name: 'Tab',
		props: {
			activeName: {
				type: String,
				required: true,
				default: ''
			},
			titleHeadStyle: {
				type: Object,
				default: {}
			},
			tabItemStyle: {
				type: Object,
				default: {}
			},
			selectedItemStyle: {
				type: Object,
				default: {}
			}
		},
		emits: ['tab-click', 'update:activeName'],
		setup(props, { emit }) {
			const activeName = ref('')
			const labels = ref([])
			const clickHandle = (item) => {
				activeName.value = item.name
				emit('tab-click', item)
				emit('update:activeName', activeName.value)
			}
			activeName.value = props.activeName
			provide('parent', {
				activeName,
				labels
			})
			return {
				activeName,
				labels,
				clickHandle
			}
		}
	})
</script>

<style scoped lang="scss">
.tabs-wrapper {
	.tabs-title {
		.t-title-item {
			display: inline-block;
		}
	}
}
</style>
