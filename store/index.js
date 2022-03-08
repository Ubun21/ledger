import {createStore, createLogger} from "vuex"
import bill from '@/store/modules/bill/index.js'
import tag from '@/store/modules/tag/index.js'

import createPersistedState from 'vuex-persistedstate'
import { localStorage } from 'mp-storage'


export default createStore({
    modules: {
		bill,
		tag
    },
	plugins: [createLogger(), 
		createPersistedState({
			storage: localStorage
		})]
})
