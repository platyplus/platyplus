import { canRemoveCollectionItem } from '@platyplus/rxdb-hasura'
import { useCallback, useEffect, useState } from 'react'
import { CollectionFieldProps } from './types'

export type Option = { value: string; label: string }

export const useCollectionFieldAccepter = ({
  tableinfo,
  role,
  initial,
  name,
  onChange
}: CollectionFieldProps) => {
  const [disabledItemValues, setDisabledItemValues] = useState<string[]>([])
  useEffect(() => {
    // ? use Suspense instead ?
    const go = async () => {
      const values: string[] = []
      for (const item of initial) {
        if (
          item &&
          !(await canRemoveCollectionItem(tableinfo, role, name, item))
        ) {
          values.push(item.id)
        }
      }
      // ? What about removable items not being part of initial values? Are they indeed always removable?
      setDisabledItemValues(values)
    }
    go()
  }, [initial, name, role, tableinfo])

  const isRemovable = useCallback(
    (option: Option) => {
      return !disabledItemValues.includes(option.value)
    },
    [disabledItemValues]
  )

  const onChangeProxy = useCallback(
    (newValue: string[], event) => {
      onChange(
        // newValue.filter((v) => !disabledItemValues.includes(v)),
        newValue,
        event
      )
    },
    [onChange]
  )
  return {
    overriddenProps: { disabledItemValues, onChange: onChangeProxy },
    isRemovable
  }
}
