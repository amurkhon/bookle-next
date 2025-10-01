import React from 'react';
import { Stack } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Property } from '../../types/property/property';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Favorite from '@mui/icons-material/Favorite';
import Visibility from '@mui/icons-material/Visibility';
import { CssVarsProvider } from '@mui/joy/styles';
import { NEXT_PUBLIC_REACT_APP_API_URL } from '../../config';
import CommentIcon from '@mui/icons-material/Comment';

interface TrendPropertyCardProps {
	property: Property;
	likePropertyHandler: any
}

const TrendPropertyCard = (props: TrendPropertyCardProps) => {
	const { property, likePropertyHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const pushDetailHandler = async (propertyId: string) => {
		await router.push({pathname: '/books/detail', query: {id: propertyId}});
	};

	const pushAuthorDetailHandler = async (memberId: string | undefined) => {
		await router.push({pathname: '/agent/detail', query: {agentId: memberId}});
	};

	if (device === 'mobile') {
		return (
			<Stack className="trend-card-box" key={property._id}>
				
			</Stack>
		);
	} else {
		return (
			<CssVarsProvider>
			<Stack className="trend-card-box" key={property._id}>
				<Card 
					sx={{ width: "200",border: 0, p: 0 }}
				>
					<Box 
						className={'img-box'} 
						sx={{ position: 'relative', width: '200px'}}
					>
						<AspectRatio ratio="4/6">
						<figure>
							<img className={'card-img'}
							src={`${NEXT_PUBLIC_REACT_APP_API_URL}/${property?.propertyImages[0]}`}
							loading="lazy"
							alt="Yosemite by Casey Horner"
							/>
						</figure>
						</AspectRatio>
						<CardCover
						className="gradient-cover"
						sx={{
							'&:hover, &:focus-within': {
							opacity: 1,
							},
							opacity: 0,
							transition: '0.1s ease-in',
							background:
							'linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)',
						}}
						>
						{/* The first box acts as a container that inherits style from the CardCover */}
						<div>
							<Box
								sx={{
									p: 2,
									display: 'flex',
									alignItems: 'center',
									gap: 1.5,
									flexGrow: 1,
									alignSelf: 'flex-end',
									justifyContent: 'space-between'
								}}
							>
								<Typography level="h2" noWrap sx={{ fontSize: 'lg' }}>
									<Link
										onClick={() => {pushDetailHandler(property?._id)}}
										overlay
										underline="none"
										sx={{
											color: '#fff',
											textOverflow: 'ellipsis',
											overflow: 'hidden',
											display: 'block',
										}}
									>
										{property?.propertyCategory}
									</Link>
								</Typography>
								<Box sx={{position: 'absolute', bottom: '0px', right: '10px', display: 'flex', flexDirection: 'column'}}>
									<IconButton
										size="sm"
										variant="solid"
										color="neutral"
										sx={{ bgcolor: 'rgba(0 0 0 / 0.2)', mb: '5px' }}
										onClick={() => {likePropertyHandler(user?._id, property?._id)}}
									>
										{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
											<Favorite style={{ color: 'red' }} />
										) : (
											<Favorite />
										)}
										<span style={{marginLeft: '5px'}}>
											{property?.propertyLikes}
										</span>
									</IconButton>
									<IconButton
										size="sm"
										variant="solid"
										color="neutral"
										sx={{ bgcolor: 'rgba(0 0 0 / 0.2)', mb: '5px' }}
									>
										<CommentIcon />
										<span style={{marginLeft: '5px'}}>
											{property?.propertyComments}
										</span>
									</IconButton>
									<IconButton
										size="sm"
										variant="solid"
										color="neutral"
										sx={{ bgcolor: 'rgba(0 0 0 / 0.2)' }}
									>
										<Visibility />
										<span style={{marginLeft: '5px'}}>
											{property?.propertyViews}
										</span>
									</IconButton>
								</Box>
							</Box>
						</div>
						</CardCover>
					</Box>
					<Box className={'info'} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
						<Typography className={'title'} sx={{ fontSize: 'sm', fontWeight: 'md' }} onClick={() => {pushDetailHandler(property?._id)}}>
							{property?.propertyTitle && property?.propertyTitle.length >= 22 ? property?.propertyTitle.slice(0, 22) : property?.propertyTitle }
						</Typography>
						<Stack className={'stats-info'}>
							<Avatar
								onClick={() => {pushAuthorDetailHandler(property?.memberData?._id)}}
								src={`${NEXT_PUBLIC_REACT_APP_API_URL}/${property?.memberData?.memberImage}`}
								size="sm"
								sx={{ '--Avatar-size': '1.5rem' }}
							/>
							<Typography sx={{ fontSize: 'sm', fontWeight: 'md', ml:'5px' }}>
								{property?.propertyAuthor} (Author)
							</Typography>
						</Stack>
					</Box>
				</Card>
			</Stack>
			</CssVarsProvider>
		);
	}
};

export default TrendPropertyCard;
