// inCome和outCome记录了每天的消费金额
// 格式为{id: '标识', type: '+/-', amout: '消费金额', date: '日期', mark: '备注', tagName: {name:'', value: ''}}
import moment from 'moment'

export default {
    state: {
		bills: [],
		editorItemId: -1,
		selectedMonth: moment().format('M'),
		selectedYear: moment().format('YYYY')
    },
	getters: {
		eidtorItem (state) {
			const index = state.editorItemId
			return index !== -1 ? state.bills[index] : {} 
		},
		allBills (state) {
			return state.bills
		},
		total (stae) {
			let result = 0
			state.bills.forEach(item => {
				if (item.type === '-') {
					result -= item.amount
				} else {
					result += item.amount
				}
			})
		},
		today (state) {
			const todayItem = moment().format('YYYY.MM.DD')
			return state.bills.filter(item => { 
			   return moment(item.date).format('YYYY.MM.DD') === todayItem
			})
		},
		currMonth (state) {
			const curr = moment().format('MM')
			const arr = new Array(moment().daysInMonth()).fill(0)
			state.bills.
				filter(item => (moment(item.date).format('MM') === curr) && (item.type === '-')).
				forEach(item => {
					const index = Number(moment(item.date).format('D')) - 1
					arr[index] = arr[index] + item.amount
				})
			return {
				keys: Object.keys(arr).map(item => Number(item) + 1),
				values: arr
			}
		},
		// refactor
		past7Day (state) {
			const map = {} // 
			for (let i = 0; i < 7; i++) {
			    const key =	moment().subtract(i, 'days').format('M.DD')
				map[key] = 0
			}
			const res = state.bills.filter((item) => {
				return moment(item.date).format('YYYY') === moment().format('YYYY') && 
					item.type === '-'
			})
			res.forEach(item => {
					const key = moment(item.date).format('M.DD')
					if (key in map) {
						map[key] += item.amount
					}
			})
			const keys = Object.keys(map).map((value, index) => {
				if (index === 0) {
					return '今天'
				} else if (index === 1) {
					return '昨天'
				} else {
					return value
				}
			})
			const values = Object.values(map)
		    return {
				keys,
				values
			}
		},
		lastYear (state) {
			const curr = moment().format('YYYY')
			const currYear = state.bills.filter(item => {
				return moment(item.date).format('YYYY') === curr &&
					item.type === '-'
			})
			const months = new Array(12).fill(0)
			currYear.forEach(item => {
				const index = Number(moment(item.date).format('M')) - 1
				months[index] +=  item.amount
			})
			return {
				keys: Object.keys(months).map(item => Number(item) + 1 + '月'),
				values: months
			}
		},
		outComeRanking (state) {
			const map = state.bills.filter(item => item.type === '-').reduce((acc, curr) => {
					const prop = curr?.tagName?.name
					if (!acc.hasOwnProperty(prop)) {
						acc[prop] = {
							amount: 0,
							tagName: { 
								iconClassName: curr?.tagName?.iconClassName,
								name: curr?.tagName?.name
							}
						}
					}
					acc[prop].amount += curr?.amount
					acc.total += curr?.amount
					return acc
				}, { total: 0})
			for (let p in map) {
				if (p === 'total') continue
				const percentage = Number(map[p].amount / (map.total ? map.total : 1)).toFixed(2) * 100 + '%'
				map[p].tagName.name += ' ' + percentage
			}
			return map
		}
	},
    mutations: {
		addItem (state, item) {
			const len = state.bills.length
			state.bills.push({id: len, ...item})
		},
		removeItem (state, nItem) {
			const index = state.bills.findIndex(item => item.id === nItem.id)
			if (index === -1) return
			state.bills.splice(index, 1)
		},
		updateItem (state, nItem) {
			const index = state.bills.findIndex(item => item.id === nItem.id)
			if (index === -1) return
			state.bills.splice(index, 1) // 删除元素
			state.bills.splice(index, 0, nItem) // 添加元素
		},
		setEditorItemId (state, nId) {
			state.editorItemId = nId
		},
		selectedMonth (state, newMonth) {
			state.selectedMonth = newMonth
		},
		selectedYear (state, newYear) {
			state.selectedYear = newYear
		}
    },
    actions: { 
		addItem({commit}, nItem) {
			commit('addItem', nItem)
		},
		removeItem({commit}, nItem) {
			commit('removeItem', nItem)
		},
		updateItem({commit}, nItem) {
			commit('updateItem', nItem)
			
		},
		setEditorItemId({commit}, nIndex) {
			commit('setEditorItemId', nIndex)
		},
		selectedMonth({commit}, newMonth) {
			commit('selectedMonth', newMonth)
		},
		selectedYear({commit}, newYear) {
			commit('selectedYear', newYear)
		}
    }
}
// console.info(moment("2022-03-8").format('dddd'), 'dddd')