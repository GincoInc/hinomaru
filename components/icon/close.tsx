import Icon from '@/public/images/close.svg'
import css from '@styles/components/icon.module.scss'

type CloseIconProps = {
  onClose: () => void
}

export const CloseIcon = (props: CloseIconProps) => {
  const { onClose } = props
  return (
    <button className={css.iconContainer} onClick={onClose}>
      <Icon width={20} height={20} />
    </button>
  )
}
