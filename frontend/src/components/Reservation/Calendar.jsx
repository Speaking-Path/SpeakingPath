// import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styles from './Calendar.module.css'


function RevCalendar() {
  const [selected, setSelected] = useState()
  const timesList = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

  const [timeSelected, setTimeSelected] = useState({
    date : "",
    times : []
  })

  const selectTime = (checked, time) => {
    if (checked) {
      setTimeSelected({
        ...timeSelected,
        times: [...timeSelected.times, time]
    });
    } else {
      setTimeSelected({
        ...timeSelected,
        times: timeSelected.times.filter((el) => el !== time)
      });
    }
    console.log(timeSelected)
  }



  if (selected) {
    console.log(selected)
  }
  return (
    <div>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        locale={ko}
      />
      <div>
        {
          timesList.map((time, index) => {
            return (
              <div key={index}>
                <input type="checkbox" name="times" id={index} value={index}
                 onClick={(e) => {
                  selectTime(e.currentTarget.checked, time)
                }}/>
                <label htmlFor={index}>{time}</label>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default RevCalendar