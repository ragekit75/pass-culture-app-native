import * as React from 'react'
import Svg, { Defs, G, LinearGradient, Path, Stop } from 'react-native-svg'

import { BicolorIconInterface } from 'ui/svg/icons/types'
import { ColorsEnum } from 'ui/theme'

export function JeuxVideo({
  size = 32,
  color = ColorsEnum.PRIMARY,
  color2,
  testID,
}: BicolorIconInterface): JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" testID={testID}>
      <Defs>
        <LinearGradient id="85krvrom2a" x1="0%" x2="100%" y1="18.569%" y2="81.431%">
          <Stop offset="0%" stopColor={color ?? ColorsEnum.PRIMARY} />
          <Stop offset="100%" stopColor={color2 ?? color ?? ColorsEnum.SECONDARY} />
        </LinearGradient>
      </Defs>
      <G fill="none" fill-rule="evenodd" opacity=".9">
        <G fill="url(#85krvrom2a)">
          <Path d="M27.73 12.001l.275.012c2.876.283 5.082 2.652 5.183 5.513l.004.233v.34c0 .226.162.414.377.453l.083.007h3.62c.414 0 .75.336.75.75 0 .38-.283.694-.649.743l-.101.007h-3.62c-1.034 0-1.88-.8-1.955-1.814l-.005-.146v-.344c.01-2.193-1.65-4.035-3.81-4.248-1.128-.074-2.236.321-3.062 1.093-.771.72-1.232 1.708-1.292 2.754l-.006.225-.001 3.93h7.23c3.6.072 6.564 2.906 6.77 6.55.09 3.379-2.332 6.303-5.669 6.843-3.336.54-6.558-1.47-7.54-4.714-.027-.091-.103-.158-.212-.175l-.068-.004H22.47c-.115-.005-.217.068-.25.174-.991 3.335-4.356 5.37-7.77 4.7-3.414-.67-5.76-3.826-5.417-7.289.343-3.463 3.262-6.097 6.741-6.085.414.002.749.339.748.753-.002.414-.339.749-.753.747-2.706-.01-4.976 2.04-5.243 4.733-.267 2.693 1.557 5.147 4.213 5.669 2.656.521 5.272-1.062 6.045-3.659.216-.717.863-1.211 1.574-1.243l1.793.001c.693.031 1.303.47 1.55 1.111l.048.14c.763 2.516 3.268 4.08 5.863 3.66 2.595-.42 4.48-2.694 4.41-5.3-.16-2.825-2.462-5.038-5.277-5.11l-.223-.002h-10.75c-.415 0-.75-.336-.75-.75s.335-.75.75-.75h2.249v-3.931c.004-1.545.646-3.02 1.775-4.075 1.062-.992 2.467-1.53 3.933-1.502zm2.542 16.758c.552 0 1 .448 1 1s-.448 1-1 1c-.553 0-1-.448-1-1s.447-1 1-1zm-14-3.75c.38 0 .693.282.743.648l.007.102-.001 1.25h1.25c.415 0 .75.336.75.75 0 .38-.282.694-.648.743l-.101.007H17.02v1.25c0 .414-.335.75-.75.75-.38 0-.693-.282-.743-.648l-.006-.102-.001-1.25h-1.25c-.414 0-.75-.336-.75-.75 0-.38.283-.693.649-.743l.102-.007h1.249v-1.25c0-.414.336-.75.75-.75zm12 1.75c.552 0 1 .448 1 1s-.448 1-1 1c-.553 0-1-.448-1-1s.447-1 1-1zm4 0c.552 0 1 .448 1 1s-.448 1-1 1c-.553 0-1-.448-1-1s.447-1 1-1zm-2-2c.552 0 1 .448 1 1s-.448 1-1 1c-.553 0-1-.448-1-1s.447-1 1-1z" />
        </G>
      </G>
    </Svg>
  )
}
