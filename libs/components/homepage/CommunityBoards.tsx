import React, { useState } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box, Stack, Divider, Typography } from '@mui/material';
import CommunityCard from './CommunityCard';
import { BoardArticle } from '../../types/board-article/board-article';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { useQuery } from '@apollo/client';
import { T } from '../../types/common';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import Moment from 'react-moment';
import extractTextOnly from '../../config';

const CommunityBoards = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	const [searchCommunity, setSearchCommunity] = useState({
		page: 1,
		direction: 'DESC',
	});
	const [articles, setArticles] = useState<BoardArticle[]>([]);

	/** APOLLO REQUESTS **/
	const {
		loading: getNewsArticlesLoading,
		data: getNewsArticlesData,
		error: getNewsArticlesError,
		refetch: getNewsArticlesRefetch,		
	} = useQuery(GET_BOARD_ARTICLES,{
		fetchPolicy: "network-only",
		variables: {input: {...searchCommunity, limit: 4, search: {}}},
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setArticles(data?.getBoardArticles?.list);
		}
	});

	/* Handlers */
	const pushHandler = async () => {
        await router.push({pathname: '/community'});
    };

	const pushDetailHandler = async ( propertyCat: string, propertyId: string) => {
        await router.push({pathname: '/community/detail', query: {articleCategory: propertyCat, id: propertyId}});
    };


	if (device === 'mobile') {
		return (
			<Stack className={'articles'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Community Board Hightlights</span>
					</Stack>
					<Stack className={'wrapper'}>
						<Swiper
							className={'article-swiper'}
							slidesPerView={1}
							centeredSlides={true}
							spaceBetween={29}
							modules={[Autoplay]}
						>
							{articles.map((article: BoardArticle) => {
								return (
									<SwiperSlide className={'article-slide'} key={article?._id}>
										<CommunityCard key={article?._id} article={article} />
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
			<Stack className={'community-board'}>
				<Stack className={'container'}>
					<Stack className={'title'}>
						<Box className={'info-box left'}>
							<span>Community Board Hightlights</span>
						</Box>
						<Divider sx={{width: "45%",marginRight: '30px', height: '5px', backgroundColor: '#f5eaebff'}} />
						<Box component={'div'} className={'right'}>
							<div className={'more-box'} onClick={pushHandler}>
								<span>See All Blogs</span>
								<img src="/img/icons/rightup.svg" alt="" />
							</div>
						</Box>
					</Stack>
					<Stack className="community-main">
						<Stack className={'last-article'}>
							<Box className={'img-box'}>
								<img src={articles[0]?.articleImage
									? `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/${articles[0]?.articleImage}`
									: '/img/event.svg'} alt="" />
							</Box>
							<Stack className={'info'}>
								<Moment format={'HH:MM | DD.MM.YYYY'}>{articles[0]?.createdAt}</Moment>
								<Typography>{articles[0]?.articleTitle}</Typography>

								<span>{extractTextOnly(articles[0]?.articleContent)}</span>

								<a href="#" onClick={() => {pushDetailHandler(articles[0]?.articleCategory, articles[0]?._id,)}}>Read More</a>
							</Stack>
						</Stack>
						<Stack className={'article-list'}>
							{articles.map((article: BoardArticle, index) => {
								return(
									index === 0 ? '' : <CommunityCard key={article?._id} article={article} />
								);
							})}
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default CommunityBoards;
