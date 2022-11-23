import { ListItemButton, TextField } from '@mui/material'
import Modal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

export default function OwnIlness({ open, onClose }) {
  const [illnesList, setIllnesList] = useState([
    {
      id: 1,
      text: 'COVID-19',
      date: '15/11/2021',
    },
    {
      id: 2,
      text: 'Stomache',
      date: '06/20/2022',
    },
  ])

  const [text, setText] = useState('')

  useEffect(() => {
    const savedList = JSON.parse(window.localStorage.getItem('illness'))

    if (savedList) {
      setIllnesList(savedList)
    }
  }, [])

  const onCreateIllness = () => {
    const date = new Date()

    const newList = [
      ...illnesList,
      {
        id: Date.now(),
        text,
        date: date.toLocaleDateString('en-GB'),
      },
    ]

    setIllnesList(newList)

    window.localStorage.setItem('illness', JSON.stringify(newList))
  }

  return (
    <Modal open={open} onClose={onClose} disablePortal>
      <div className="modal-content">
        <div className="modal-form">
          <TextField
            value={text}
            onChange={(event) => setText(event.target.value)}
            fullWidth
            placeholder="Add information about your illness"
            onKeyDown={(event) => {
              if (event.code === 'Enter') {
                onCreateIllness()
              }
            }}
          />
        </div>

        <List>
          {illnesList.map((ill) => (
            <ListItemButton sx={{ marginBottom: '10px' }} key={ill.id} selected>
              <ListItemText
                sx={{ justifyContent: 'flex-start' }}
                primary={ill.text}
                secondary={ill.date}
              />
            </ListItemButton>
          ))}
        </List>
      </div>
    </Modal>
  )
}
