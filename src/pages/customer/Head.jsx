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
    console.log(ReactHtmlParser(componentAsString));
    if (componentAsString)
      return <div ref={imgRef} >{ReactHtmlParser(componentAsString)}</div>;
  }

  const modifyAndRenderContent = () => {
    // let modifiedHtml = decodeURIComponent(decodedComponent); // Uncomment: Decode the component from the `image` hook.
    // Delete: Delete when we're sure about the html layout.
    let modifiedHtml = decodeURIComponent(`%3Cdiv%20class%3D%22w-full%20sm%3Aw-1%2F2%20md%3Aw-1%2F3%20flex%20flex-col%20p-3%22%3E%0A%20%20%3Cdiv%0A%20%20%20%20class%3D%22bg-white%20rounded-lg%20shadow-lg%20overflow-hidden%20flex-1%20flex%20flex-col%22%0A%20%20%3E%0A%20%20%20%20%3Cimg%0A%20%20%20%20%20%20class%3D%22bg-cover%20h-48%22%0A%20%20%20%20%20%20src%3D%22https%3A%2F%2Fimages.unsplash.com%2Fphoto-1523978591478-c753949ff840%3Fw%3D900%22%0A%20%20%20%20%20%20alt%3D%22Image%20Description%22%0A%20%20%20%20%2F%3E%0A%20%20%20%20%3Cdiv%20class%3D%22p-4%20flex-1%20flex%20flex-col%22%20style%3D%22%22%3E%0A%20%20%20%20%20%20%3Cp%20id%3D%22jenisperumahan%22%20class%3D%22mb-4%20text-2xl%22%3EMy%20heading%3C%2Fp%3E%0A%20%20%20%20%20%20%3Cdiv%20class%3D%22mb-4%20text-grey-darker%20text-sm%20flex-1%22%3E%0A%20%20%20%20%20%20%20%20%3Cp%20id%3D%22harga%22%3ELorem%20ipsum%20dolor%20sit%20amet%2C%20consectetur%20adipisicing%20elit.%3C%2Fp%3E%0A%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%3Ca%0A%20%20%20%20%20%20%20%20href%3D%22%23%22%0A%20%20%20%20%20%20%20%20class%3D%22border-t%20border-grey-light%20pt-2%20text-xs%20text-grey%20hover%3Atext-red%20uppercase%20no-underline%20tracking-wide%22%0A%20%20%20%20%20%20%20%20style%3D%22%22%0A%20%20%20%20%20%20%20%20%3EDiull%3C%2Fa%0A%20%20%20%20%20%20%3E%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20%3C%2Fdiv%3E%0A%3C%2Fdiv%3E`)
    const schema = dataschema.properties;

    Object.keys(schema).forEach((tagName) => {
      const regex = new RegExp(`<p id="${tagName}"(?: class="[^"]*")?>.*?</p>`)
      modifiedHtml = modifiedHtml.replace(regex, `<p id="${tagName}">${data[tagName]}</p>`)
      console.log(`${tagName}`, data[tagName]);
      console.log(`<p id="${tagName}">${data[tagName]}</p>`)

    })

    // Change the image src
    // const imgRegex = new RegExp('<img[^>]*src="([^"]+)"[^>]*(?: class="[^"]*")?>');
    const imgRegex = new RegExp('<img[^>]*\\ssrc\\s*=\\s*["\']([^"\']*)["\'][^>]*>')
    // const imgRegex = new RegExp('<img[^>]*\\ssrc\\s*=[^>]*>')
    // const imgRegex = new RegExp('<img src="([^"]+)" alt="([^"]+)"\/>');
    if (!image)
      return;
    modifiedHtml = modifiedHtml.replace(imgRegex, `<img src="${URL.createObjectURL(image)}">`);
    setComponent(modifiedHtml);
  }

  const handleOpenModal = () => {
    modifyAndRenderContent();
    setOpenModal(true);
  }

  useEffect(() => {
    axios.get('http://localhost:8080/templates/all')
      .then(response => {
        if (!response)
          return;
        setDecodedComponent(response.data.data.string);
      })
      .catch(error => {
        console.error('Axios error:', error);
        alert('Error, please try again.')
      });
  }, [])

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