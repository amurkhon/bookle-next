import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Property } from '../../types/property/property';
import Link from 'next/link';
import { formatterStr } from '../../utils';
import { NEXT_PUBLIC_REACT_APP_API_URL, topPropertyRank } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface PropertyCardType {
	property: Property;
	likePropertyHandler?: any;
	myFavorites?: boolean;
	recentlyVisited?: boolean;
}

const PropertyCard = () => {
	// const { property, likePropertyHandler, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	// const imagePath: string = property?.propertyImages[0]
	// 	? `${NEXT_PUBLIC_REACT_APP_API_URL}/${property?.propertyImages[0]}`
	// 	: '/img/banner/header1.svg';

	if (device === 'mobile') {
		return <div>PROPERTY CARD</div>;
	} else {
		return (
			<Stack className="card-config">
				<Stack className="top">
					<Link
						href={{
							pathname: '/property/detail',
							query: { id:'1'},
						}}
					>
						<img src={'/img/property/under-sky.webp'} alt="" />
					</Link>
					{ 4 > topPropertyRank && (
						<Box component={'div'} className={'top-badge'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<Typography>Top</Typography>
						</Box>
					)}
					{(
						<Stack className="buttons">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">43</Typography>
							<IconButton color={'default'} >
								{true ? (
									<FavoriteIcon color="primary" />
								) : false && false ? (
									<FavoriteIcon color="primary" />
								) : (
									<FavoriteBorderIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">32</Typography>
						</Stack>
					)}
				</Stack>
				<Stack className="bottom">
					<Stack className="name-address">
						<Stack className="name">
							<Link
								href={{
									pathname: '/property/detail',
									query: { id: 'qycxwbvwd21687' },
								}}
							>
								<Typography>Atomic Habits</Typography>
							</Link>
							<span>
								$39.00
							</span>
						</Stack>
						<Stack className="address">
							<Typography>
								About Psychology
							</Typography>
						</Stack>
					</Stack>
					<Stack className="options">
						<Stack className="option">
							<AutoStoriesIcon fontSize={'small'} /> <Typography>300 pages</Typography>
						</Stack>
						<Stack className="option">
							<StarBorderIcon fontSize={'small'} /> <Typography>3.4 (25)</Typography>
						</Stack>
					</Stack>
					<Stack className="type-buttons">
						<Stack className="type">
							<Typography
								sx={{ fontWeight: 500, fontSize: '13px' }}
								className={'disabled-type'}
							>
								By
							</Typography>
							<Typography
								sx={{ fontWeight: 500, fontSize: '13px' }}
								className={'disabled-type'}
							>
								Amurkhon
							</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default PropertyCard;
