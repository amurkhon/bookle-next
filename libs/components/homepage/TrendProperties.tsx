import React, { useState } from 'react';
import { Stack, Box, Divider } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Property } from '../../types/property/property';
import { PropertiesInquiry } from '../../types/property/property.input';
import TrendPropertyCard from './TrendPropertyCard';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROPERTIES } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { LIKE_TARGET_PROPERTY } from '../../../apollo/user/mutation';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { Message } from '../../enums/common.enum';

interface TrendPropertiesProps {
	initialInput: PropertiesInquiry;
}

const TrendProperties = (props: TrendPropertiesProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [trendProperties, setTrendProperties] = useState<Property[]>([]);

	/** APOLLO REQUESTS **/
	const [likeTargetProperty] = useMutation(LIKE_TARGET_PROPERTY);
	const {
		loading: getPropertiesLoading,
		data: getPropertiesData,
		error: getPropertiesError,
		refetch: getPropertiesRefetch,
	} = useQuery(GET_PROPERTIES, {
		fetchPolicy: "cache-and-network",
		variables: {input: initialInput},
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTrendProperties(data?.getProperties?.list);
		}
	});

	/** HANDLERS **/
	const likePropertyHandler = async (user: T, id: string) => {
		try {
			if(!id) return;
			if(!user) throw new Error(Message.NOT_AUTHENTICATED);

			// Optimistically update the UI
			setTrendProperties(prevProperties => 
				prevProperties.map(property => {
					if (property._id === id) {
						const isLiked = property?.meLiked && property?.meLiked.length > 0 && property?.meLiked[0]?.myFavorite;
						if (isLiked) {
							// Unlike: remove user from meLiked, decrease likes
							return {
								...property,
								meLiked: [] as Property['meLiked'],
								propertyLikes: Math.max(0, (property.propertyLikes || 0) - 1)
							} as Property;
						} else {
							// Like: add proper MeLiked object, increase likes
							return {
								...property,
								meLiked: [{
									memberId: user._id || '',
									likeRefId: id,
									myFavorite: true
								}],
								propertyLikes: (property.propertyLikes || 0) + 1
							} as Property;
						}
					}
					return property;
				})
			);

			await likeTargetProperty({variables: { input: id } });

			// Refetch in background without blocking UI
			getPropertiesRefetch({ input: initialInput }).catch(() => {
				// Revert on error
				getPropertiesRefetch({ input: initialInput });
			});

			sweetTopSmallSuccessAlert("success", 800);
		} catch(err: any) {
			console.log("Error, likePropertyHandler: ", err.message);
			// Revert on error
			getPropertiesRefetch({ input: initialInput });
			sweetMixinErrorAlert(err.message).then();
		}
	}

	if (!trendProperties) return null;

	if (device === 'mobile') {
		return (
			<Stack className={'trend-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Trend Books</span>
						<p>Trend is based on likes</p>
					</Stack>
					<Stack className={'card-box'}>
						{trendProperties.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								Trends Empty
							</Box>
						) : (
							<Swiper
								className={'trend-property-swiper'}
								slidesPerView={1}
								spaceBetween={20}
								modules={[Navigation]}
								navigation={true}
								centeredSlides={true}
								grabCursor={true}
							>
								{trendProperties.map((property: Property) => {
									return (
										<SwiperSlide key={property._id} className={'trend-property-slide'}>
											<TrendPropertyCard property={property} likePropertyHandler={likePropertyHandler} />
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'trend-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>Trending on Bookle</span>
							<p>Trend is based on likes</p>
						</Box>
						<Divider sx={{width: "35%", height: '5px', backgroundColor: '#f5eaebff'}} />
					</Stack>
					<Stack className={'card-box'}>
						{trendProperties.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								Trends Empty
							</Box>
						) : (
							<Box component={'div'} className={'swiper-wrapper-container'}>
								<WestIcon className={'swiper-trend-prev'} />
								<Swiper
									className={'trend-property-swiper'}
									slidesPerView={5}
									spaceBetween={20}
									slidesPerGroup={1}
									speed={600}
									modules={[Navigation]}
									navigation={{
										nextEl: '.swiper-trend-next',
										prevEl: '.swiper-trend-prev',
									}}
									breakpoints={{
										320: {
											slidesPerView: 1,
											spaceBetween: 15,
										},
										640: {
											slidesPerView: 2,
											spaceBetween: 18,
										},
										768: {
											slidesPerView: 3,
											spaceBetween: 20,
										},
										1024: {
											slidesPerView: 4,
											spaceBetween: 20,
										},
										1280: {
											slidesPerView: 5,
											spaceBetween: 20,
										},
										1440: {
											slidesPerView: 6,
											spaceBetween: 20,
										},
									}}
									grabCursor={true}
									watchSlidesProgress={true}
								>
									{trendProperties.map((property: Property) => {
										return (
											<SwiperSlide key={property?._id} className={'trend-property-slide'}>
												<TrendPropertyCard property={property} likePropertyHandler={likePropertyHandler} />
											</SwiperSlide>
										);
									})}
								</Swiper>
								<EastIcon className={'swiper-trend-next'} />
							</Box>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

TrendProperties.defaultProps = {
	initialInput: {
		page: 1,
		limit: 16,
		sort: 'propertyLikes',
		direction: 'DESC',
		search: {},
	},
};

export default TrendProperties;
