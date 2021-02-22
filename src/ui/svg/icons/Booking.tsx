import * as React from 'react'
import Svg, { Path, G } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme'

import { IconInterface } from './types'

export const Booking: React.FunctionComponent<IconInterface> = ({
  size = 32,
  color = ColorsEnum.BLACK,
  testID,
}) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" testID={testID}>
    <G fill="none" fill-rule="evenodd">
      <G fill={color}>
        <Path d="M23.5 8.167c1.246 0 2.263.976 2.33 2.205l.003.128v1.973c-.026.652-.487 1.205-1.109 1.345-.996.256-1.692 1.154-1.692 2.182s.696 1.926 1.678 2.179c.599.134 1.042.632 1.114 1.25l.01.118V21.5c0 1.246-.977 2.263-2.206 2.33l-.128.003h-2.167c-.276 0-.5-.224-.5-.5 0-.253.188-.462.432-.495l.068-.005H23.5c.703 0 1.279-.544 1.33-1.233l.003-.1v-1.934c-.006-.177-.118-.33-.29-.395l-.067-.02c-1.439-.37-2.444-1.666-2.444-3.151 0-1.485 1.005-2.781 2.458-3.155.173-.038.304-.176.336-.332l.007-.06V10.5c0-.703-.544-1.279-1.233-1.33l-.1-.003h-15c-.703 0-1.279.544-1.33 1.233l-.003.1-.001 1.974c.008.158.108.294.262.354l.07.021C8.936 13.22 9.94 14.515 9.94 16c0 1.485-1.005 2.781-2.46 3.155-.157.034-.276.159-.307.302l-.007.063v1.995c.007.697.55 1.265 1.234 1.315l.099.003h10.167c.276 0 .5.224.5.5 0 .253-.188.463-.432.496l-.068.004H8.5c-1.236 0-2.25-.961-2.329-2.185l-.004-.128v-2.014c.018-.643.472-1.19 1.082-1.324.996-.256 1.692-1.154 1.692-2.182s-.696-1.926-1.674-2.178c-.58-.127-1.014-.605-1.09-1.208l-.01-.114v-2c0-1.246.976-2.263 2.205-2.33l.128-.003h15zm-4.833 3.666c.253 0 .462.188.495.432l.005.068v7.334c0 .276-.224.5-.5.5-.253 0-.463-.188-.496-.432l-.004-.068v-7.334c0-.276.224-.5.5-.5z" />
      </G>
    </G>
  </Svg>
)