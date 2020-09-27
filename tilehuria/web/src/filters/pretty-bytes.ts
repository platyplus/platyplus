import { format } from 'quasar'
import Vue from 'vue'
const { humanStorageSize } = format

Vue.filter('prettyBytes', function(num: number) {
  return humanStorageSize(num)
})
