import Vue from 'vue'

Vue.filter('pluralize', (word: string, amount: number) =>
  amount > 1 || amount == 0 ? `${word}s` : word
)
