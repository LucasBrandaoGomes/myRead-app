import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import styled from 'styled-components'

export default class DemoApp extends React.Component {
  render() {
    return (
        <CalendarContainer>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
            />
        </CalendarContainer>
    )
  }
}

const CalendarContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    
`