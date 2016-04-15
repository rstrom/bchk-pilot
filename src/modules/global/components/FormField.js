import React from 'react'
import Radium from 'radium'
import gstyles from '../styles'
import { type } from '../types'

export const FIELD_TYPES = type.Enumerate({
  TEXT_FIELD: type.Object({
    label: type.string
  }),
  OPTION_FIELD: type.Object({
    label: type.string,
    options: type.array
  })
})

export default Radium((field) => {
  switch (field.type) {
    case 'TEXT_FIELD':
      return (
        <div style={[styles.row]}>
          <span style={[styles.item]}>
            {field.label}
          </span>
          <input
            type="text"
            style={{ flex: 1 }}
            onChange={(e) => field.handler(e.target.value)}
          />
        </div>
      )

    case 'OPTION_FIELD':
      return (
        <div style={[styles.row]}>
          <span style={[styles.item]}>
            {field.label}
          </span>
          <select
            defaultValue={'unselected'}
            style={{ flex: 1 }}
            onChange={(e) => field.handler(e.target.value)}
          >
            <option disabled={true} value={'unselected'}> -- </option>
            {
              field.options &&
              field.options.map((o, i) => (
                <option key={i}>{o}</option>
              ))
            }
          </select>
        </div>
      )

    default:
      return (
        <div></div>
      )
  }
})

const styles = {
  ...gstyles,
  row: {
    ...gstyles.row,
    ...gstyles.padding(1),
    justifyContent: 'center'
  },
  item: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'right',
    ...gstyles.padding(0, 1)
  }
}