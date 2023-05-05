import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Container, IconButton, ImageList, ImageListItem, Stack, Typography, Modal } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'

const Body = () => {
  const [images, setImages] = useState([])
  const [imagesResult, setImagesResult] = useState([])
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleChangeImage = e => {
    const target = e.target
    const files = [...target.files]
    setImages([...images, ...files])
    handleClickUpload()
    setOpenModal(true)
  }

  const handleRemoveImage = idx => {
    const imagesCopy = [...images]
    imagesCopy.splice(idx, 1)
    setImages(imagesCopy)
  }

  const handleClickUpload = () => {
    setImagesResult(images)
    setOpenModal(true)
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
              multiple
              hidden
            />
          </Button>
          {
            images.length > 0 &&
            <Stack spacing={2}>
              {
                images.map((img, idx) => (
                  <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between' }} bgcolor='grey.300'>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}> 
                      <img src={URL.createObjectURL(img)} alt={img.name} width={64} height={64} />
                      <Typography variant='p'>{img.name}</Typography>
                    </Box>
                    <IconButton onClick={() => handleRemoveImage(idx)} aria-label="delete" size="small">
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                ))
              }
            </Stack>
          }
        </Stack>
        {
          images.length > 0 &&
          <Button onClick={handleClickUpload} variant='contained'>UPLOAD</Button>
        }
        {
          imagesResult.length > 0 &&
          <>
            {/* <ImageList sx={{ width: 500, height: '100%' }} cols={3} rowHeight={164}>
              {
                imagesResult.map((img, idx) => (
                  <ImageListItem key={idx}>
                    <img
                      src={URL.createObjectURL(img)}
                      alt={img.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))
              }
            </ImageList> */}
            {/* <Button onClick={handleOpenModal} variant='contained'>PREVIEW</Button> */}
            {
              ((images.length % 2 === 0) && (images.length > 0)) &&
              <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display: 'flex', alignItems: 'center', padding: '20px'}}
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
                  <div style={{
                    flexDirection: 'column',
                    marginBottom: '20px',
                    width: '550px',
                    height: '550px',
                    backgroundImage: `url(${URL.createObjectURL(images[0])})`,
                    position: 'relative',
                    padding: '20px 10px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,.6)', top: 0, left: 0, right: 0, bottom: 0 }} />
                    <div style={{ zIndex: 999, position: 'absolute', top: '-24px', right: '-10px', width: '200px', height: '50px', backgroundColor: '#CDAC6E', transform: 'rotate(15deg)', opacity: '.8' }} />
                    <div style={{ zIndex: 999, position: 'absolute', bottom: '-24px', left: '-10px', width: '200px', height: '50px', backgroundColor: '#CDAC6E', transform: 'rotate(15deg)', opacity: '.8' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '550px', height: '550px', position: 'absolute' }}>
                      <div style={{ width: '100%', height: '3px', backgroundColor: '#AB9975' }} />
                      <img style={{ flex: 1, height: '225px', objectFit: 'cover' }} src={URL.createObjectURL(images[0])} alt='' />
                      <div style={{ width: '100%', height: '3px', backgroundColor: '#AB9975' }} />
                      <img style={{ flex: 1, height: '225px', objectFit: 'cover' }} src={URL.createObjectURL(images[1])} alt='' />
                      <div style={{ width: '100%', height: '3px', backgroundColor: '#AB9975' }} />
                    </div>
                  </div>
                  <Button variant='contained'>DOWNLOAD</Button>
                </Box>
              </Modal>
            }
          </>
        }
      </Container>
    </>
  )
}

export default Body