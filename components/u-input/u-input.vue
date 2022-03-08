<template>
	<view class="u-input-wrapper">
		<text class="text">{{label}}</text>
		<view class="editor">
			<input @input="inputHandle" v-if="!disEditorAble" :placeholder="placeHolderProp" />
			<text class="text" v-else>{{placeHolder}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"u-input",
		props: {
			label: {
				type: String,
				required: true
			},
			placeHolder: [String, Number],
			disEditorAble: {
				type: Boolean,
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			inputHandle: function(input) {
				console.info(input)
				if (!input?.detail?.value) return
				console.info(input?.detail?.value)
				this.$emit('update:value', input?.detail?.value)
			}
		},
		computed: {
			// 用来匹配input组件placeholder必须输入字符串的问题。
			placeHolderProp: function() {
				if (typeof (this.$props.placeHolder) === 'number') {
					return String(this.$props.placeHolder)
				}
				return this.$props.placeHolder
			}
		}
	}
</script>

<style scoped lang="scss">
.u-input-wrapper {
	display: flex;
	align-items: center;
	border-bottom: 2rpx solid #ddd;
	padding: 40rpx;
	.text {
		color: gray;
		padding-right: 32rpx;
		font-size: 40rpx;
	}
	.uni-input-placeholder {
		color: #333333;
	}
	.editor {
		.text {
			color: #333333;
			font-size: 40rpx;
		}
	}
}
</style>
