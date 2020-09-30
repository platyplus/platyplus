import { Module } from 'vuex'

import { StoreInterface } from '../index'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state, { ExampleStateInterface } from './state'

const exampleModule: Module<ExampleStateInterface, StoreInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default exampleModule
