import { useState } from 'react'
import { Container } from '@mui/system'
import { Link } from 'react-router-dom'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Button, FormControl, ImageList, ImageListItem, InputLabel, MenuItem, Select, Stack, Tab, TextField, TextareaAutosize, Typography } from '@mui/material'

const Home = () => {
  const [tab, setTab] = useState('manual')
  const [mataAngin, setMataAngin] = useState('utara')
  const [image, setImage] = useState()

  const handleChangeTab = (e, newVal) => {
    setTab(newVal)
  }

  const handleChangeMataAngin = e => {
    setMataAngin(e.target.value)
  }

  const handleChangeImage = e => {
    const target = e.target
    const files = [...target.files]
    setImage(files[0])
  }

  return (
    <>
      <Stack direction='row' spacing={3} mb={5}>
        <Link to='/'>Head</Link>
        <Link to='/body'>Body</Link>
      </Stack>
      <Container maxWidth='lg'>
        <Stack spacing={4} direction='row' mb={5}>
          <Button
            variant="contained"
            component="label"
            style={{ height: '100%' }}
          >
            Select File
            <input
              type="file"
              id='image'
              accept='image/*'
              onChange={handleChangeImage}
              hidden
            />
          </Button>
          {
            image &&
            <ImageList sx={{ width: 300, height: 250 }} cols={1}>
              <ImageListItem>
                <img
                  src={URL.createObjectURL(image)}
                  srcSet={URL.createObjectURL(image)}
                  alt={image.name}
                />
              </ImageListItem>
            </ImageList>
          }
        </Stack>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab}>
              <Tab label='Manual' value='manual' />
              <Tab label='Text' value='text' />
            </TabList>
          </Box>
          <TabPanel p={0} value='manual'>
            <Stack spacing={3}>
              <TextField id="alamat" label="Alamat" variant="outlined" />
              <TextField id="harga" label="Harga" variant="outlined" />
              <TextField id="jenisPerumahan" label="Jenis Perumahan" variant="outlined" />
              <Typography variant="h6">
                Spesifikasi
              </Typography>
              <TextField id="ukuran" label="Ukuran" variant="outlined" />
              <TextField id="tingkat" label="Tingkat" variant="outlined" />
              <TextField id="siapHuni" label="Siap Huni" variant="outlined" />
              <FormControl>
                <InputLabel>Arah Mata Angin</InputLabel>
                <Select
                  id="demo-simple-select"
                  value={mataAngin}
                  label="Arah Mata Angin"
                  onChange={handleChangeMataAngin}
                > 
                  <MenuItem value={'utara'}>Utara</MenuItem>
                  <MenuItem value={'barat'}>Barat</MenuItem>
                  <MenuItem value={'selatan'}>Selatan</MenuItem>
                  <MenuItem value={'timur'}>Timur</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </TabPanel>
          <TabPanel value='text'>
            <Stack>
              <TextareaAutosize minRows={8} />
            </Stack>
          </TabPanel>
        </TabContext>
        <Button variant='contained'>
          DOWNLOAD
        </Button>
      </Container>
    </>
  )
}

export default Home