import React from 'react';
import { Stack, Box} from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import BlurOnIcon from '@mui/icons-material/BlurOn';

import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from '@mui/joy/styles';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';

const userOpinions = [
	{
		name: 'Alan Wolker',
		image: '/img/profile/feature-author.jpg',
		address: 'South Korea, Daegu',
		opinion: 'I love how shopping from Bookle supports my local bookstores! Plus, they have great deals and the books always arrive quickly.'

	},
	{
		name: 'Shari Lapena',
		image: '/img/profile/feature-author-1-3.jpg',
		address: 'USA, California',
		opinion: 'Perfectly fine online bookstore. You pay a little for that—shipping charges and relatively slow delivery. Bit then, you seldom need a book next day. I try to relax into it.'

	},
	{
		name: 'Sharly Bon',
		image: '/img/profile/secondGirl.jpg',
		address: 'England, Manchester',
		opinion: 'I love that I was able to support one of my favorite local independent bookstores and still get the books I wanted. I even found a few books that I haven’t been able to find at the bigger retail bookstores!'

	},
	{
		name: 'Akramjonov Amurkhon',
		image: '/img/profile/feature-author-1-6.jpg',
		address: 'Uzbekistan, Tashkent',
		opinion: 'An author led me to this company and I love the vision and mission. It was easy to order online and my books showed up when expected.'

	},
];

const FeedBackCard = (props: any) => {
	const { opinion } = props;
	return (
		<CssVarsProvider>
		<Stack className={'card-box'}>
			<Stack className={'introduction'}>
				<img
					src={opinion?.image}
					loading="lazy"
					alt=""
				/>
				<Stack>
					<Typography level="title-lg" id="card-description">
						{opinion?.name}
					</Typography>
					<Typography
					level="body-sm"
					aria-describedby="card-description"
					sx={{ mb: 1 }}
					>
						{opinion?.address}
					</Typography>
				</Stack>
			</Stack>
			<Stack className={'card-body'}>
				<Stack className={'feedback-purpose'}>
					<BlurOnIcon className={'icon'} sx={{ fontSize: 40, marginRight: '10px', color: '#42a5f5' }} /> {/* Lighter blue */}
					<Typography>User About Platform</Typography>
				</Stack>
				<Typography>
					{opinion?.opinion}
				</Typography>
			</Stack>
		</Stack>
		</CssVarsProvider>
	);
}

const FeedBacks = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return (
			<Stack className={'client-feedback'}>
				<Stack className={'container'}>
					<Box className={'title'}>
						Our Client's feedbacks
					</Box>
					<Stack className={'feedback-box'}>
						<Swiper
							className={'feedback-swiper'}
							spaceBetween={10}
							slidesPerView={1}
							centeredSlides={true}
							modules={[Autoplay]}
						>
							{userOpinions.map((ele: any, index: number) => {
								return (
									<SwiperSlide key={index} className={'feedback-slide'}>
										<FeedBackCard opinion={ele} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'client-feedback'}>
				<Stack className={'container'}>
					<Box className={'title'}>
						Our Client's feedbacks
					</Box>
					<Stack className={'feedback-box'}>
						<Swiper
							className={'feedback-swiper'}
							slidesPerView={2}
							loop={true}
							speed={10000}
							spaceBetween={10}
							autoplay={{
								delay: 5000,
								disableOnInteraction: false,
							}}
							modules={[Autoplay, Navigation, Pagination]}
							navigation={{
								nextEl: '.swiper-popular-next',
								prevEl: '.swiper-popular-prev',
							}}
							pagination={{
								el: '.swiper-popular-pagination',
							}}
						>
							{userOpinions.map((ele: any, index: number) => {
								return (
									<SwiperSlide key={index} className={'feedback-slide'}>
										<FeedBackCard opinion={ele} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default FeedBacks;
