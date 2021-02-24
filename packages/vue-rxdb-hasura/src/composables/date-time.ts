import { DateTime } from 'luxon'
import { computed, Ref } from 'vue'

export const unicodeDateTimeFormat = 'dd/MM/yyyy HH:mm:ss'

export const unicodeDateFormat = 'dd/MM/yyyy'

export const useFormattedDateTime = (
  model: Ref<string | undefined>,
  format: string
): { model: Ref<string>; format: string } => ({
  model: computed<string>({
    get: () =>
      (model.value ? DateTime.fromISO(model.value) : DateTime.now()).toFormat(
        format
      ),
    set: (value: string) => {
      try {
        model.value = DateTime.fromFormat(value, format).toISO()
      } catch (e) {
        console.log('invalid date - do nothing', e)
      }
    }
  }),
  format: format.replace('yyyy', 'YYYY').replace('dd', 'DD') // TODO not ideal - eg 'ddd' exists
})
