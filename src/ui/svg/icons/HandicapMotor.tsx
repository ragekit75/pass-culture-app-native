import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { ColorsEnum } from 'ui/theme'

import { IconInterface } from './types'

export const HandicapMotor = ({ color = ColorsEnum.BLACK, size = 32, testID }: IconInterface) => {
  return (
    <Svg width={size} height={size} testID={testID} viewBox="0 0 48 48">
      <Path
        d="M18.808 22v2.443c-1.172.953-1.875 2.442-1.875 4.11 0 2.979 2.402 5.481 5.39 5.481 2.577 0 4.744-1.847 5.271-4.29L29 31.77C27.828 34.272 25.31 36 22.38 36c-4.1 0-7.38-3.336-7.38-7.447A7.514 7.514 0 0118.808 22zm1.949-5c.969 0 1.756.76 1.756 1.694v2.454h4.3c.667 0 1.273.525 1.273 1.227l-.006.12a1.263 1.263 0 01-1.266 1.106h-4.3v1.694h5.33c.484 0 .908.234 1.15.643l2.969 4.09 1.03-.702c.545-.409 1.332-.292 1.756.292l.078.109c.328.517.184 1.208-.38 1.644l-2.06 1.402c-.424.292-.97.292-1.394.058-.077-.05-.79-.99-1.578-2.049l-.318-.428c-.958-1.292-1.92-2.605-1.92-2.605h-6.905c-.727 0-1.272-.526-1.272-1.227v-7.828c0-.935.787-1.694 1.757-1.694zm.743-5c1.369 0 2.5 1.131 2.5 2.5S22.869 17 21.5 17 19 15.869 19 14.5s1.131-2.5 2.5-2.5z"
        fill={color}
        fillRule="evenodd"
      />
    </Svg>
  )
}
