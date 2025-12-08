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
import { useRouter } from 'next/router';

interface PropertyCardType {
	property: Property;
	likePropertyHandler?: any;
}

const PropertyCard = (props: PropertyCardType) => {
	const { property, likePropertyHandler } = props;
	const router = useRouter();
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = property?.propertyImages[0]
		? `${NEXT_PUBLIC_REACT_APP_API_URL}/${property?.propertyImages[0]}`
		: '/img/banner/header1.svg';

	/* Handlers*/

	const pushDetailHandler = async (memberId: string) => {
		await router.push({pathname: '/author/detail', query: {authorId: memberId}});
	};

	if (device === 'mobile') {
		return <div>PROPERTY CARD</div>;
	} else {
		return (
			<Stack className="card-config">
				<Stack className="top">
					<Link
						href={{
							pathname: '/books/detail',
							query: {id: property?._id},
						}}
					>
						<img src={imagePath} alt="" />
					</Link>
					{ property?.propertyRank > topPropertyRank && (
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
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
							<IconButton color={'default'} onClick={() => likePropertyHandler(user, property?._id)} >
								{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon color="primary" />
								) : (
									<FavoriteBorderIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{property?.propertyLikes}</Typography>
						</Stack>
					)}
				</Stack>
				<Stack className="bottom">
					<Stack className="name-address">
						<Stack className="name">
							<Link
								href={{
									pathname: '/books/detail',
									query: { id: property?._id },
								}}
							>
								<Typography>{property?.propertyTitle}</Typography>
							</Link>
							<span>
								${property?.propertyPrice}.00
							</span>
						</Stack>
						<Stack className="address">
							<Typography>
								About {property?.propertyCategory}
							</Typography>
						</Stack>
					</Stack>
					<Stack className="options">
						<Stack className="option">
							<AutoStoriesIcon fontSize={'small'} /> <Typography>{property?.propertyPages} pages</Typography>
						</Stack>
						<Stack className="option">
							<StarBorderIcon fontSize={'small'} sx={{color: 'orange'}} /> <Typography>3.4 (25)</Typography>
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
								onClick={() => {pushDetailHandler(property?.memberId)}}
							>
								{property?.propertyAuthor}
							</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default PropertyCard;
