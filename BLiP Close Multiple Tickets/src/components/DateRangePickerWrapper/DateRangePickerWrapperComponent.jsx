import React from 'react'
import { DateRangePicker } from 'react-dates'
import './ReactDateOverrides.scss'
import moment from 'moment'
import { resetMomentTime } from 'utils/date'

export const DateRangePickerWrapperComponent = (props) => (
  <div className="date-range-wrapper">
    <DateRangePicker
      hideKeyboardShortcutsPanel={true}
      enableOutsideDays={true}
      isOutsideRange={(date) => {
        return resetMomentTime(date) > resetMomentTime(moment())
      }}
      displayFormat="DD/MM/YYYY"
      minimumNights={0}
      customArrowIcon="-"
      {...props}
    />
  </div>
)
