import React from 'react'

export default function Tile ({ value }) {
  const DEFAULT_COLOR = 'rgba(238, 228, 218, 0.35)'
  const [color, setColor] = React.useState(DEFAULT_COLOR)

  React.useEffect(() => {
    switch (value) {
      case 2:
        return setColor('#EEE4DA')
      case 4:
        return setColor('#EDE068')
      case 8:
        return setColor('#F2B179')
      case 16:
        return setColor('#F59563')
      case 32:
        return setColor('#F67C5F')
      case 64:
        return setColor('#F65E3B')
      case 128:
        return setColor('#EDCF72')
      case 256:
        return setColor('#EDCC61')
      case 512:
        return setColor('#EDC850')
      case 1024:
        return setColor('#EDC53F')
      case 2048:
        return setColor('#EDC22E')
      default:
        return setColor(DEFAULT_COLOR)
    }
  }, [value])

  return (
    <div
      className='BoardContainer__tile'
      style={{
        backgroundColor: color,
        fontSize: value >= 1024 ? '2rem' : '3rem'
      }}
    >
      {value === 0 ? '' : value}
    </div>
  )
}
