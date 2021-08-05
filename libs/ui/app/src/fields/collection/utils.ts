import { canRemoveCollectionItem } from '@platyplus/rxdb-hasura'
import { useCallback, useMemo } from 'react'
import { CollectionFieldProps } from './types'

export type Option = { value: string; label: string }

export const useCollectionFieldAccepter = ({
  metadata,
  initial,
  name,
  onChange
}: CollectionFieldProps) => {
  const initialIds = useMemo(() => initial.map((doc) => doc.id), [initial])
  const canRemoveItem = useMemo(
    () => canRemoveCollectionItem(metadata, name),
    [metadata, name]
  )
  const disabledItemValues = useMemo(
    () => (canRemoveItem ? [] : initialIds),
    [canRemoveItem, initialIds]
  )
  const isRemovable = useCallback(
    (option: Option) => canRemoveItem || !initialIds.includes(option.value),
    [canRemoveItem, initialIds]
  )

  const onChangeProxy = useCallback(
    (newValue: string[], event) => {
      onChange(
        canRemoveItem
          ? newValue
          : [
              ...initialIds,
              ...(newValue?.filter((val) => !initialIds.includes(val)) || [])
            ],
        event
      )
    },
    [canRemoveItem, initialIds, onChange]
  )
  return {
    overriddenProps: { disabledItemValues, onChange: onChangeProxy },
    isRemovable
  }
}
