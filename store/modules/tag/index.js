export default {
	// tag: {iconClassName: '', name: ''}
	// 餐饮 购物 居住 交通 娱乐 医疗 添加
	state: {
		tags: [
			{ iconClassName: 'icon-canshi', name: '餐饮'},
			{ iconClassName: 'icon-gouwu', name: '购物'},
			{ iconClassName: 'icon-a-juzhuguanli', name: '居住'},
			{ iconClassName: 'icon-gongjiao', name: '交通'},
			{ iconClassName: 'icon-yule', name: '娱乐'},
			{ iconClassName: 'icon-yiliaofuwu', name: '医疗'},
			{ iconClassName: 'icon-tianjia', name: '添加'},
		]
	},
	mutations: {
		addTag(state, newTag) {
			const len = state.tags.length - 1
			state.tags.splice(len, 0, newTag)
		}
	},
	actions: {
		addTag({commit}, newTag) {
			commit('addTag', newTag)
		}
	}
}