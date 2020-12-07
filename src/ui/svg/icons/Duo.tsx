import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme'

import { IconInterface } from './types'

export function Duo({ size = 32, color = ColorsEnum.BLACK, testID }: IconInterface): JSX.Element {
  return (
    <Svg width={size} height={size} testID={testID} fill={color} viewBox="4 0 40 40">
      <Path d="M32.4 17c4.197 0 7.6 3.358 7.6 7.5 0 4.142-3.403 7.5-7.6 7.5H15.6C11.403 32 8 28.642 8 24.5c0-4.142 3.403-7.5 7.6-7.5h16.8zm0 1.579H15.6c-3.314 0-6 2.65-6 5.921 0 3.27 2.686 5.921 6 5.921h16.8c3.314 0 6-2.65 6-5.921 0-3.27-2.686-5.921-6-5.921zM31.84 20c.63 0 1.183.131 1.657.394.475.263.845.632 1.108 1.108.263.476.395 1.022.395 1.64v2.679c0 .625-.132 1.18-.395 1.664s-.633.858-1.108 1.12c-.474.264-1.027.395-1.658.395-.622 0-1.171-.134-1.646-.4-.475-.268-.844-.641-1.107-1.12-.264-.48-.396-1.034-.396-1.66v-2.678c0-.618.132-1.164.396-1.64.263-.476.632-.845 1.107-1.108.475-.263 1.024-.394 1.646-.394zm-9.016.1c.136 0 .203.071.203.213v5.658c0 .442.13.799.39 1.07.259.271.6.407 1.023.407.423 0 .764-.136 1.024-.407.26-.271.389-.628.389-1.07v-5.658c0-.142.068-.213.203-.213h1.282c.135 0 .203.071.203.213v5.645c0 .593-.13 1.116-.39 1.571-.258.455-.622.808-1.089 1.058-.467.25-1.007.375-1.622.375-.614 0-1.155-.125-1.622-.375-.467-.25-.83-.603-1.09-1.058-.26-.455-.389-.978-.389-1.57v-5.646c0-.142.068-.213.204-.213h1.28zm-5.687 0c.598 0 1.123.11 1.574.332.451.221.8.532 1.048.932.247.401.371.864.371 1.39v3.455c0 .525-.124.988-.371 1.39-.248.4-.597.71-1.048.932-.45.22-.976.331-1.574.331h-2.933c-.136 0-.204-.07-.204-.212v-8.337c0-.142.068-.213.204-.213h2.933zm14.702 1.415c-.439 0-.792.148-1.06.444-.267.296-.4.686-.4 1.17v2.754c0 .484.133.872.4 1.164.268.292.621.438 1.06.438.44 0 .794-.146 1.066-.438.271-.292.407-.68.407-1.164V23.13c0-.484-.134-.874-.401-1.17-.268-.296-.625-.444-1.072-.444zm-14.654.1H15.76c-.048 0-.072.025-.072.075v5.583c0 .05.024.075.072.075h1.437c.367 0 .664-.13.892-.388.227-.259.345-.605.353-1.04v-2.878c0-.434-.114-.78-.341-1.04-.228-.258-.533-.387-.916-.387z" />
    </Svg>
  )
}