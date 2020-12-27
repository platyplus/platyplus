<template lang="pug">
component(:is="componentName" v-bind="props" :value="value")
</template>

<script lang="ts">
import { RxDocument } from 'rxdb'
import { PrimaryProperty, TopLevelProperty } from 'rxdb/dist/types/types'
import { computed, defineComponent, PropType } from 'vue'

import { useFieldValue, useProperty } from '../composables'

// TODO move somewhere else
/**
 * returns the property type as a string, even when the type is ['typename', 'null']
 * If string, returns the format
 * If string and ref, returns 'object'
 * does not allow composite types e.g. ['string', 'object']
 */
const propertyType = (property: TopLevelProperty | PrimaryProperty): string => {
  if (!property.type)
    throw Error(`No type in prop: ${JSON.stringify(property)}`)
  let type: string
  if (Array.isArray(property.type)) {
    const res = property.type.filter(v => v !== 'null')
    if (res.length === 1) type = res[0]
    else
      throw Error(
        `Composite types are not allowed: ${JSON.stringify(property)}`
      )
  } else {
    type = property.type
  }
  if (type === 'string') {
    if (property.ref) return 'object'
    if (property.format === 'date-time') return 'date-time'
  }
  return type
}

export default defineComponent({
  name: 'Field',
  props: {
    document: {
      type: Object as PropType<RxDocument<Record<string, unknown>>>,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const property = useProperty(props)
    const componentName = computed(
      () => 'field-' + propertyType(property.value)
    )
    const value = useFieldValue(props)
    return { componentName, props, value }
  }
})
</script>
