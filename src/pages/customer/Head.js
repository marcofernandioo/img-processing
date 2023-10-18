import { useState, createRef, useEffect } from 'react'
import { Container } from '@mui/system'
import { Link } from 'react-router-dom'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Button, FormControl, ImageList, ImageListItem, InputLabel, MenuItem, Modal, Select, Stack, Tab, TextField, TextareaAutosize, Typography } from '@mui/material'
import HeadPreview from '../../components/HeadPreview'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import { useScreenshot, createFileName } from 'use-react-screenshot';
import { imgRef } from '../../components/HeadPreview';

const Home = () => {
  const [data, setData] = useState({
    alamat: '',
    harga: 0,
    jenisPerumahan: '',
    ukuran: '',
    tingkat: '',
    siapHuni: '',
  })
  const [openModal, setOpenModal] = useState(false)
  const [tab, setTab] = useState('manual')
  const [mataAngin, setMataAngin] = useState('utara')
  const [image, setImage] = useState()
  const [downloadedImage, downloadImage] = useScreenshot({
    type: 'image/jpg',
    quality: 1.0
  });

  const handleChangeData = e => {
    const name = e.target.name
    const val = e.target.value
    setData({ ...data, [name]: val })
  }

  const handleChangeTab = (e, newVal) => {
    setTab(newVal)
  }

  const handleDownload = () => {
    downloadImage(imgRef.current)
      .then((downloadedImage) => {
        download(downloadedImage)
      })
      .catch(err => {
        console.log(err);
      })
  }


  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };


  const handleChangeMataAngin = e => {
    setMataAngin(e.target.value)
  }

  const handleChangeImage = e => {
    const target = e.target
    const files = [...target.files]
    setImage(files[0])
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Stack direction='row' spacing={3} mb={5}>
        <Link to='/'>Head Page </Link>
        <Link to='/body'>Body Page</Link>
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
            <div style={{ width: '300px', height: '300px', backgroundImage: `url(${URL.createObjectURL(image)})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
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
            <Stack mb={3} spacing={3}>
              <TextField id="jenisPerumahan" name='jenisPerumahan' value={data.jenisPerumahan} label="Name" variant="outlined" onChange={handleChangeData} />
              <TextField id="alamat" name='alamat' label="Address" variant="outlined" value={data.alamat} onChange={handleChangeData} />
              <TextField type='number' id="harga" name='harga' label="Price" variant="outlined" value={data.harga} onChange={handleChangeData} />
              <Typography variant="h6">
                Property Specification
              </Typography>
              <TextField id="ukuran" name='ukuran' value={data.ukuran} label="Size" variant="outlined" onChange={handleChangeData} />
              {/* <TextField id="siapHuni" name='siapHuni' value={data.siapHuni} label="Fully Furnished" variant="outlined" onChange={handleChangeData} /> */}
              <FormLabel id="demo-radio-buttons-group-label">Furnishing Status</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Fully Furnished"
                name="radio-buttons-group"
              >
                <FormControlLabel value="Fully Furnished" control={<Radio />} label="Fully Furnished" />
                <FormControlLabel value="Partially Furnished" control={<Radio />} label="Partially Furnished" />
                <FormControlLabel value="Unfurnished" control={<Radio />} label="Unfurnished" />
              </RadioGroup>
              <TextField id="tingkat" name='tingkat' value={data.tingkat} label="Property Type" variant="outlined" onChange={handleChangeData} />
              <FormControl>
                <InputLabel>Direction</InputLabel>
                <Select
                  id="demo-simple-select"
                  value={mataAngin}
                  label="Direction"
                  onChange={handleChangeMataAngin}
                >
                  <MenuItem value={'utara'}>North</MenuItem>
                  <MenuItem value={'timur'}>East</MenuItem>
                  <MenuItem value={'selatan'}>South</MenuItem>
                  <MenuItem value={'barat'}>West</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </TabPanel>
          <TabPanel value='text'>
            <Stack mb={3}>
              <TextareaAutosize minRows={8} />
            </Stack>
          </TabPanel>
        </TabContext>
        {
          image &&
          <>
            <Button onClick={handleOpenModal} variant='contained'>PREVIEW</Button>
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{ display: 'flex', alignItems: 'center', padding: '20px' }}
            >
              <Box sx={{
                backgroundColor: '#fff',
                width: '100%',
                maxWidth: '600px',
                margin: 'auto',
                maxHeight: '90vh',
                padding: '20px',
                overflow: 'auto'
              }}>
                <Typography variant="h6" component="h2" mb={3}>Image Preview</Typography>
                <HeadPreview image={image} mataAngin={mataAngin} data={data} />
                <Button variant='contained' onClick={handleDownload}>DOWNLOAD</Button>
              </Box>
            </Modal>
          </>
        }
      </Container>
    </>
  )
}

export default Home