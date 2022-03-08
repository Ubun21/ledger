<template>
	<view 
		v-if="isActive"
	    class="tab-pane-wrapper">
		<slot></slot>
	</view>
</template>

<script>
	import { defineComponent, inject, computed } from 'vue'
	export default defineComponent({
		name: 'TabPane',
		props: {
			label: String,
			name: String
		},
		setup(props) {
			const parent = inject('parent')
			const isActive = computed(() => parent.activeName.value === props.name)
			parent.labels.value.push({name: props.name, label: props.label})
			return {
				isActive
			}
		}
	})
</script>

<style>

</style>
