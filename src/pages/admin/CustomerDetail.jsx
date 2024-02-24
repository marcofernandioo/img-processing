import React from 'react';
import { useParams } from 'react-router-dom';
// import { TabContext, TabList } from '@mui/lab';
import { Container } from '@mui/system'
import { Link } from 'react-router-dom'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Button, FormControl, ImageList, ImageListItem, InputLabel, MenuItem, Modal, Select, Stack, Tab, TextField, TextareaAutosize, Typography } from '@mui/material'

import * as api from '../../api';
import { template } from 'lodash';


const CustomerDetail = ({ user, handleChangeData }) => {
    const [templateList, setTemplateList] = React.useState(["a", "b"]);

    React.useEffect(() => {
        console.log("User's template IDs:")
        console.log(user.templateIds);
        // console.log("User's ID: ")
        // console.log(user._id);
        // api.getCustomerTemplate(user._id)
        //     .then((data) => {
        //         console.log("User's templates data:");
        //         console.log(data.data);
        //         setTemplateList(data.data);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
        api.getCustomerTemplates(user.templateIds)
        .then(data => {
            setTemplateList(data.data);
            console.log(data.data);
        })
        .catch(err => {
            console.log(err);
        })

    }, [])

    return (
        <div>
            Customer Details
            {
                templateList && templateList.map((val, index) => (
                    <>
                        <TextField name="Template Name" label='Template Name' defaultValue={templateList[index].name} />
                        <TextField label='UI Schema' value={templateList[index].uiSchema} />
                        <TextField label='Data Schema' value={templateList[index].dataSchema} />
                    </>
                ))
                // console.log(Array.isArray(templateList))
            }

            
            {/* <TabPanel p={0} >
                    <Stack mb={3} spacing={3}>
                        <TextField id="name" name='username' value={user.username} label="Name" variant="outlined" onChange={handleChangeData} />
                        <TextField id="jenisPerumahan" name='username' value={user.email} label="Email" variant="outlined" onChange={handleChangeData} />
                        <br></br>
                        {
                            templateList ?? templateList.map((val, index) => (
                                <>
                                    <TextField name="Template Name" label='Template Name' value={templateList[index].name} />
                                    <TextField label='UI Schema' value={templateList[index].uiSchema} />
                                    <TextField label='Data Schema' value={templateList[index].dataSchema} />
                                </>
                            ))
                        }
                    </Stack>
                </TabPanel> */}

        </div>
    );
};

export default CustomerDetail;