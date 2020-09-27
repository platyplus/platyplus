import { Ref, ref } from '@vue/composition-api'

import { useFormFragment } from './form-fragment'

export const useFormEditor = <T extends Record<string, unknown>>(
  source: Readonly<Ref<Readonly<T | undefined>>> | Ref<Readonly<T>>,
  {
    save,
    edit = false
  }: {
    save: (value: T) => Promise<unknown> | unknown
    edit: boolean
  }
): {
  editing: Ref<boolean>
  edit: () => void
  save: () => Promise<void>
  cancel: () => void
  values: Ref<T>
  reset: () => void
} => {
  const editing = ref(edit)

  const { values, reset } = useFormFragment<T>(source, editing)

  const editAction = () => {
    editing.value = true
  }

  const _save = async () => {
    try {
      values.value && (await Promise.resolve(save(values.value)))
    } catch (error) {
      // console.log('Save failed', values.value)
      // console.log(error)
    }
    editing.value = false
  }

  const cancel = (): void => {
    editing.value = false
  }

  return { editing, edit: editAction, save: _save, cancel, values, reset }
}
