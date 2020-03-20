import React from 'react'

export default function Tile ({ value }) {
  const DEFAULT_BACKGROUND_COLOR = 'rgba(238, 228, 218, 0.35)'
  const [backgroundColor, setbackgroundColor] = React.useState(DEFAULT_BACKGROUND_COLOR)

  React.useEffect(() => {
    switch (value) {
      case 2:
        return setbackgroundColor('#EEE4DA')
      case 4:
        return setbackgroundColor('#EDE0C8')
      case 8:
        return setbackgroundColor('#F2B179')
      case 16:
        return setbackgroundColor('#F59563')
      case 32:
        return setbackgroundColor('#F67C5F')
      case 64:
        return setbackgroundColor('#F65E3B')
      case 128:
        return setbackgroundColor('#EDCF72')
      case 256:
        return setbackgroundColor('#EDCC61')
      case 512:
        return setbackgroundColor('#EDC850')
      case 1024:
        return setbackgroundColor('#EDC53F')
      case 2048:
        return setbackgroundColor('#EDC22E')
      default:
        return setbackgroundColor(DEFAULT_BACKGROUND_COLOR)
    }
  }, [value])

  return (
    <div
      className='BoardContainer__tile'
      style={{
        backgroundColor,
        fontSize: value >= 1024 ? '2rem' : '3rem',
        color: value > 4 ? 'white' : '#776e65'
      }}
    >
      {value === 0 ? '' : value}
    </div>
  )
}
