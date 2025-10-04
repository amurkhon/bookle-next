import React from 'react';
import { Stack, Box, Divider, Typography, Rating, Button, Fab } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Property } from '../../types/property/property';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { NEXT_PUBLIC_REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

interface TopPropertyCardProps {
    property: Property;
}

const TopCategoryPropertyCard = (props: TopPropertyCardProps) => {
    const { property } = props
    const device = useDeviceDetect();
    const router = useRouter();
    const user = useReactiveVar(userVar);

    /** HANDLERS **/

    const pushDetailHandler = async (propertyId: string) => {
        await router.push({pathname: '/books/detail', query: {id: propertyId}});
    };

    if (device === 'mobile') {
        return (
            <Stack></Stack>
        );
    } else {
        return (
            <Stack className={'card-box'}>
                <Box className={'card-img'}>
                    <img src={`${NEXT_PUBLIC_REACT_APP_API_URL}/${property?.propertyImages[0]}`} alt="" />
                </Box>
                <Stack className={'card-info'}>
                    <Rating
                        sx={{color: 'orange'}}
                        name="simple-uncontrolled"
                        onChange={(event, newValue) => {
                        console.log(newValue);
                        }}
                        defaultValue={2}
                    />
                    <Typography className={'info-item'} variant={'h3'}>
                        {property?.propertyType.charAt(0) + property?.propertyType.slice(1).toLowerCase()}
                    </Typography>
                    <Typography className={'info-item'} variant={'h2'}>
                        {property?.propertyTitle}
                    </Typography>
                    <Typography className={'info-item'}>
                        Only From ${property?.propertyPrice}.00
                    </Typography>
                    <Button 
                        className={'button'} 
                        variant={'outlined'}
                        onClick={() => {pushDetailHandler(property?._id)}}
                    >
                        Shop now
                    </Button>
                </Stack>
            </Stack>
        );
    }
};

export default TopCategoryPropertyCard;