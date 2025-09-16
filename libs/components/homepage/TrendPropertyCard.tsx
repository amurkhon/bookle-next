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

interface TrendPropertyCardProps {
	property: Property;
	likePropertyHandler: any
}

const TrendPropertyCard = () => {
	// const { property, likePropertyHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	const property = {
		_id: "bwfdg436frg4538888888888888879",
		propertyStatus: "ACTIVE",
		propertyCategory: "Fiction",
		propertyTitle: "Cold Island",
		propertyAuthor: "Amurkhon Akramjonov",
		propertyPrice: 17,
		propertyPages: 239,
		isbn: "978-1662530388",
		propertyViews: 0,
		propertyLikes: 0,
		propertyComments: 0,
		propertyRank: 0,
		propertyDownloads: 0,
		propertyLanguages: [
			"Eng",
			"Kor"
		],
		propertyImages: [],
		propertyFile: "",
		propertyAudio: "",
		memberId: {
			$oid: "68be50c5cd93b2dc035b1434"
		},
		publicationDate: {
			$date: "2025-09-01T00:00:00.000Z"
		},
		createdAt: {
			$date: "2025-09-10T06:12:06.508Z"
		},
		updatedAt: {
			date: "2025-09-10T07:30:35.064Z"
		},
	}

	/** HANDLERS **/
	const pushDetailHandler = async (propertyId: string) => {
		await router.push({pathname: '/property/detail', query: {id: propertyId}});
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
				<Card sx={{ width: "200",border: 0, p: 0 }}>
					<Box className={'img-box'} sx={{ position: 'relative', width: '200px'}}>
						<AspectRatio ratio="4/6">
						<figure>
							<img className={'card-img'}
							src="/img/property/under-sky.webp"
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
									href="#dribbble-shot"
									overlay
									underline="none"
									sx={{
										color: '#fff',
										textOverflow: 'ellipsis',
										overflow: 'hidden',
										display: 'block',
									}}
									>
									Yosemite
									</Link>
								</Typography>
								<IconButton
									size="sm"
									variant="solid"
									color="neutral"
									sx={{ bgcolor: 'rgba(0 0 0 / 0.2)' }}
								>
									<Favorite />
								</IconButton>
							</Box>
						</div>
						</CardCover>
					</Box>
					<Box className={'info'} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
						<Typography className={'title'} sx={{ fontSize: 'sm', fontWeight: 'md' }}>
							National Park
						</Typography>
						<Stack className={'stats-info'}>
							<Avatar
								src="https://images.unsplash.com/profile-1502669002421-a8d274ad2897?dpr=2&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff"
								size="sm"
								sx={{ '--Avatar-size': '1.5rem' }}
							/>
							<Typography sx={{ fontSize: 'sm', fontWeight: 'md', ml:'5px' }}>
								Amir
							</Typography>
							<Link
								href="#dribbble-shot"
								level="body-xs"
								underline="none"
								startDecorator={<Favorite />}
								sx={{
									fontWeight: 'md',
									ml: 'auto',
									color: 'text.secondary',
									'&:hover': { color: 'danger.plainColor' },
								}}
							>
								117
							</Link>
							<Link
								href="#dribbble-shot"
								level="body-xs"
								underline="none"
								startDecorator={<Visibility />}
								sx={{
									fontWeight: 'md',
									color: 'text.secondary',
									ml: '5px',
									'&:hover': { color: 'primary.plainColor' },
								}}
							>
								10.4k
							</Link>
						</Stack>
					</Box>
				</Card>
			</Stack>
			</CssVarsProvider>
		);
	}
};

export default TrendPropertyCard;
