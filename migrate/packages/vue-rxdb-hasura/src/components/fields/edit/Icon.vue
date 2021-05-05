<template lang="pug">
q-select(
    :label="title"
    v-model="model"
    :options="options"
    label="Select an icon"
    clearable
    use-input
    input-debounce="0"
    @filter="filterFn")
    template(#prepend)
        q-icon(:name="model")
    template(#option="scope")
        q-item(v-bind="scope.itemProps")
            q-item-section(avatar)
                q-icon(:name="scope.opt") 
            q-item-section
                q-item-label {{scope.opt}}
</template>

<script lang="ts">
import { ContentsDocument } from '@platyplus/rxdb-hasura'
import * as fa from '@quasar/extras/fontawesome-v5'
import { paramCase } from 'param-case'
import { defineComponent, PropType, ref, toRefs } from 'vue'

import { useFormProperty } from '../../../composables'
const paramCaseOptions = {
  splitRegexp: [/([a-zA-Z])([A-Z])/g, /([0-9A-Z])([A-Z])/g]
}

const list = Object.keys(fa)
  .filter(
    name =>
      ![
        'fabFontAwesomeLogoFull',
        'farFontAwesomeLogoFull',
        'fasFontAwesomeLogoFull'
      ].includes(name)
  )
  .map(
    name =>
      `${name.slice(0, 3)} fa-${paramCase(name.substring(3), paramCaseOptions)}`
  )
export default defineComponent({
  name: 'FieldEditIcon',
  props: {
    document: {
      type: Object as PropType<ContentsDocument>,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { name, document } = toRefs(props)
    const { model, title } = useFormProperty<string>(document, name)
    const options = ref<string[]>(list)
    const filterFn = (val: string, update: (fn: () => void) => void) => {
      if (val === '') {
        update(() => {
          options.value = list
        })
      }

      update(() => {
        const needle = val.toLowerCase()
        options.value = list.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }

    return { model, title, filterFn, options }
  }
})
</script>
