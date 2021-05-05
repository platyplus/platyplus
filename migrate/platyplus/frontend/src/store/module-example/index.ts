import { Module } from 'vuex'

import { StateInterface } from '../index'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state, { ExampleStateInterface } from './state'

const exampleModule: Module<ExampleStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default exampleModule
