import React, { useState, createRef, useEffect } from 'react'
import { Container } from '@mui/system'
import { Link } from 'react-router-dom'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Button, FormControl, ImageList, ImageListItem, InputLabel, MenuItem, Modal, Select, Stack, Tab, TextField, TextareaAutosize, Typography } from '@mui/material'
import HeadPreview from '../../components/HeadPreview'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

import { JsonForms } from '@jsonforms/react';
import uischema from './uischema.json';
import dataschema from './dataschema.json';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import ReactHtmlParser from 'react-html-parser'

import { useScreenshot, createFileName } from 'use-react-screenshot';
// import { imgRef } from '../../components/HeadPreview';

const useStyles = makeStyles({
  container: {
    padding: '1em',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
  },
  resetButton: {
    margin: 'auto !important',
    display: 'block !important',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
})

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
  const [image, setImage] = useState()
  const [downloadedImage, downloadImage] = useScreenshot({
    type: 'image/jpg',
    quality: 1.0
  });
  const [decodedComponent, setDecodedComponent] = useState(null);
  const [component, setComponent] = useState(null);

  const imgRef = createRef(null);
  const classes = useStyles();

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

  const imgURL = React.useMemo(() => {
    if (image)
      return URL.createObjectURL(image);
  }, [image]);

  const handleChangeImage = e => {
    const target = e.target
    const files = [...target.files]
    setImage(files[0])
  }

  const handleLogout = () => {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // 'delete' cookie.
    window.location.href = "/";
  }

  const renderers = [
    ...materialRenderers,
  ];

  const YourComponentWrapper = ({ componentAsString, ref }) => {
    if (componentAsString)
      return <div ref={imgRef} >{ReactHtmlParser(componentAsString)}</div>;
  }

  const modifyAndRenderContent = () => {
    // let modifiedHtml = decodeURIComponent(decodedComponent); // Uncomment: Decode the component from the `image` hook.
    // Delete: Delete when we're sure about the html layout.
    
    let modifiedHtml = decodeURIComponent(`%3Cdiv%0A%20%20style%3D%22%0A%20%20%20%20position%3A%20relative%3B%0A%20%20%20%20background-color%3A%20%23fff%3B%0A%20%20%20%20width%3A%20100%25%3B%0A%20%20%20%20overflow%3A%20hidden%3B%0A%20%20%20%20display%3A%20flex%3B%0A%20%20%20%20flex-direction%3A%20column%3B%0A%20%20%20%20align-items%3A%20flex-start%3B%0A%20%20%20%20justify-content%3A%20flex-start%3B%0A%20%20%20%20gap%3A%2010px%3B%0A%20%20%20%20text-align%3A%20left%3B%0A%20%20%20%20font-size%3A%2070px%3B%0A%20%20%20%20object-fit%3A%20cover%3B%0A%20%20%20%20color%3A%20%23000%3B%0A%20%20%20%20font-family%3A%20%27Inter%27%3B%0A%20%20%22%0A%3E%0A%20%20%3Cimg%0A%20%20%20%20style%3D%22%0A%20%20%20%20%20%20position%3A%20relative%3B%0A%20%20%20%20%20%20width%3A%20100%25%3B%0A%20%20%20%20%20%20object-fit%3A%20cover%3B%0A%20%20%20%20%20%20z-index%3A%200%3B%0A%20%20%20%20%22%0A%20%20%20%20alt%3D%22%22%0A%20%20%20%20src%3D%22C%3A%5CUsers%5CASUS%5CDownloads%5Cpexels-pixabay-53610.jpg%22%0A%20%20%2F%3E%0A%0A%20%20%3Cdiv%0A%20%20%20%20style%3D%22%0A%20%20%20%20%20%20position%3A%20absolute%3B%0A%20%20%20%20%20%20margin%3A%200%20!important%3B%0A%20%20%20%20%20%20top%3A%20559px%3B%0A%20%20%20%20%20%20left%3A%200px%3B%0A%20%20%20%20%20%20width%3A%20100%25%3B%0A%20%20%20%20%20%20height%3A%2050%25%3B%0A%20%20%20%20%20%20z-index%3A%201%3B%0A%20%20%20%20%22%0A%20%20%3E%0A%20%20%20%20%3Cdiv%0A%20%20%20%20%20%20style%3D%22%0A%20%20%20%20%20%20%20%20position%3A%20absolute%3B%0A%20%20%20%20%20%20%20%20height%3A%20100%25%3B%0A%20%20%20%20%20%20%20%20width%3A%20100%25%3B%0A%20%20%20%20%20%20%20%20top%3A%200%25%3B%0A%20%20%20%20%20%20%20%20right%3A%200%25%3B%0A%20%20%20%20%20%20%20%20bottom%3A%200%25%3B%0A%20%20%20%20%20%20%20%20left%3A%200%25%3B%0A%20%20%20%20%20%20%20%20background-color%3A%20rgba(255%2C%20166%2C%2032%2C%200.4)%3B%0A%20%20%20%20%20%20%22%0A%20%20%20%20%3E%3C%2Fdiv%3E%0A%20%20%20%20%3Cdiv%20id%3D%22alamat%22%20style%3D%22position%3A%20absolute%3B%20top%3A%209.98%25%3B%20left%3A%2036.98%25%22%3E%0A%20%20%20%20%20%20ALamat%20Rumah%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%3Cdiv%20id%3D%22jenisperumahan%22%20style%3D%22position%3A%20absolute%3B%20top%3A%2033.78%25%3B%20left%3A%2035.21%25%22%3E%0A%20%20%20%20%20%20Jenis%20Perumahan%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%3Cdiv%20id%3D%22tingkat%22%20style%3D%22position%3A%20absolute%3B%20top%3A%2057.58%25%3B%20left%3A%2026.56%25%22%3ETingkat%3C%2Fdiv%3E%0A%20%20%20%20%3Cdiv%20id%3D%22panjang%22%20style%3D%22position%3A%20absolute%3B%20top%3A%2057.58%25%3B%20left%3A%2047.6%25%22%3Epanjang%3C%2Fdiv%3E%0A%20%20%20%20%3Cdiv%20id%3D%22arahmataangin%22%20style%3D%22position%3A%20absolute%3B%20top%3A%2057.58%25%3B%20left%3A%2067.19%25%22%3E%0A%20%20%20%20%20%20arahmataangin%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A`);
    const schema = dataschema.properties;

    Object.keys(schema).forEach((tagName) => {
      const regex = new RegExp(`(<div[^>]*\\sid="${tagName}"[^>]*>)[\\s\\S]*?(<\/div>)`);
      modifiedHtml = modifiedHtml.replace(regex, `$1${data[tagName]}$2`);
    })

    // Change the image src
    const imgRegex = new RegExp('<img[^>]*\\ssrc\\s*=\\s*["\']([^"\']*)["\'][^>]*>')
    if (!image)
      return;
    modifiedHtml = modifiedHtml.replace(imgRegex, (match, group1) => `<img src="${URL.createObjectURL(image)}"${match.slice(-1)}`);
    setComponent(modifiedHtml);
  }

  const handleOpenModal = () => {
    modifyAndRenderContent();
    setOpenModal(true);
  }

  // useEffect(() => {
  //   axios.get('http://localhost:8080/templates/all')
  //     .then(response => {
  //       if (!response)
  //         return;
  //       setDecodedComponent(response.data.data.string);
  //     })
  //     .catch(error => {
  //       console.error('Axios error:', error);
  //       alert('Error, please try again.')
  //     });
  // }, [])

  return (
    <>
      <Stack direction='row' spacing={3} mb={5}>
        <Link to='/head'>Head Page </Link>
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
          </Button><Button
            variant="contained"
            component="label"
            style={{ height: '100%' }}
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
          {
            image &&
            <div style={{ width: '300px', height: '300px', backgroundImage: `url(${imgURL})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
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
              <div className={classes.demoform}>
                <JsonForms
                  schema={dataschema}
                  uischema={uischema}
                  onChange={({ errors, data }) => setData(data)}
                  cells={materialCells}
                  renderers={renderers}
                  data={data}
                />
              </div>
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
              onClose={() => setOpenModal(false)}
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
                {
                  decodedComponent ? (
                    <YourComponentWrapper componentAsString={component} />
                  ) : <h1>diu</h1>
                }
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