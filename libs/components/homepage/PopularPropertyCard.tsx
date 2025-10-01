import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Property } from '../../types/property/property';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

import Rating from '@mui/material/Rating';
import Box from '@mui/joy/Box';
import { NEXT_PUBLIC_REACT_APP_API_URL } from '../../config';

interface PopularPropertyCardProps {
	property: Property;
}

const PopularPropertyCard = (props: PopularPropertyCardProps) => {
	const { property } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/

	const pushDetailHandler = async (propertyId: string) => {
		await router.push({pathname: '/books/detail', query: {id: propertyId}});
	};

	if (device === 'mobile') {
			return (
				<Stack className="trend-card-box" key={property._id}>
					
				</Stack>
			);
		} else {
			return (
				<Stack className={'popular-card-box'} onClick={() => {pushDetailHandler(property?._id)}}>
					<Box className={'image-box'}>
						<img src={`${NEXT_PUBLIC_REACT_APP_API_URL}/${property?.propertyImages[0]}`} />
					</Box>
					<Stack className={'info-box'}>
						<Rating
							sx={{color: 'white'}}
							name="simple-uncontrolled"
							onChange={(event, newValue) => {
							console.log(newValue);
							}}
							defaultValue={2}
						/>
						<Typography className={'info-item'} variant={'h4'}>
							{property?.propertyType.charAt(0) + property?.propertyType.slice(1).toLowerCase()}
						</Typography>
						<Typography onClick={() => {pushDetailHandler(property?._id)}} className={'info-item'} variant={'h2'}>
							{property?.propertyTitle}
						</Typography>
						<Typography className={'info-item'}>
							Only From ${property?.propertyPrice}.00
						</Typography>
						<Button 
							className={'button'} 
							variant={'outlined'} 
							sx={{mt: '20px', width: "200px", fontSize:"20px",}}
							onClick={() => {pushDetailHandler(property?._id)}}
						>
							Shop now
						</Button>
					</Stack>
				</Stack>
			);
		}
};

export default PopularPropertyCard;
