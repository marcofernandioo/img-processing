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
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import ReactHtmlParser from 'react-html-parser'

import { useScreenshot, createFileName } from 'use-react-screenshot';
import * as api from '../../api'

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
  const [templatesList, setTemplatesList] = useState(null);
  const [decodedComponent, setDecodedComponent] = useState(null);
  const [component, setComponent] = useState(null);
  const [uiSchema, setUiSchema] = useState(null);
  const [dataSchema, setDataSchema] = useState(null);

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
    let modifiedHtml = decodeURIComponent(templatesList[1].value);

    const schema = dataSchema.properties;

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

  useEffect(() => {
    const jwt = document.cookie.split('=')[1];
    api.getCustomerTemplate(jwt)
      .then((data) => {
        setUiSchema(JSON.parse(data.data[1].uiSchema));
        setDataSchema(JSON.parse(data.data[1].dataSchema));
        setTemplatesList(data.data);
        setDecodedComponent(data.data[0].value);
      })
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
            color="error"
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
              <Tab label='Input Data' value='manual' />
              {/* <Tab label='Text' value='text' /> */}
            </TabList>
          </Box>
          <TabPanel p={0} value='manual'>
            <Stack mb={3} spacing={3}>
              <div className={classes.demoform}>
                {
                  dataSchema && (
                    <JsonForms
                      schema={dataSchema}
                      uischema={uiSchema}
                      onChange={({ errors, data }) => setData(data)}
                      cells={materialCells}
                      renderers={renderers}
                      data={data}
                    />
                  )
                }
              </div>
            </Stack>
          </TabPanel>
          {/* <TabPanel value='text'>
            <Stack mb={3}>
              <TextareaAutosize minRows={8} />
            </Stack>
          </TabPanel> */}
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
                  component ? (
                    <YourComponentWrapper componentAsString={component} />
                  ) : <h1>Try Again</h1>
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