import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Container, IconButton, ImageList, ImageListItem, Stack, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'

const Body = () => {
  const [images, setImages] = useState([])
  const [imagesResult, setImagesResult] = useState([])

  const handleChangeImage = e => {
    const target = e.target
    const files = [...target.files]
    setImages([...images, ...files])
  }

  const handleRemoveImage = idx => {
    const imagesCopy = [...images]
    imagesCopy.splice(idx, 1)
    setImages(imagesCopy)
  }

  const handleClickUpload = () => {
    setImagesResult(images)
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
            <ImageList sx={{ width: 500, height: '100%' }} cols={3} rowHeight={164}>
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
            </ImageList>
            <Button variant='contained'>
              DOWNLOAD
            </Button>
          </>
        }
      </Container>
    </>
  )
}

export default Body