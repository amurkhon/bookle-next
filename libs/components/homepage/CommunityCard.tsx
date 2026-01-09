import React from 'react';
import Link from 'next/link';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box, Stack } from '@mui/material';
import Moment from 'react-moment';
import { BoardArticle } from '../../types/board-article/board-article';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import { CssVarsProvider } from '@mui/joy/styles';
import AspectRatio from '@mui/joy/AspectRatio';
import CardContent from '@mui/joy/CardContent';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/joy/Button';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ShareIcon from '@mui/icons-material/Share';

import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { useRouter } from 'next/router';

interface CommunityCardProps {
	key: string;
	article: BoardArticle;
}

const CommunityCard = (props: CommunityCardProps) => {
	const {key, article} = props;
	const router = useRouter();
	const device = useDeviceDetect();
	const articleImage = article?.articleImage
		? `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/${article?.articleImage}`
		: '/img/event.svg';


	/* Handlers */
	const pushDetailHandler = async (propertyId: string, propertyCat: string) => {
        await router.push({pathname: '/community/detail', query: {articleCategory: article?.articleCategory, id: propertyId}});
    };

	if (device === 'mobile') {
		return (
			<CssVarsProvider>
				<Card id={`card${key}`} className={`card`} color="neutral" variant="plain">
					<CardOverflow>
						<AspectRatio ratio="1.5">
							<img
								src={articleImage}
								alt=""
							/>
						</AspectRatio>
					</CardOverflow>
					<CardContent className={'card-content'}>
						<Stack className={'meta-info'}>
							<Box className={'info'}>
								<PersonIcon className={'icon'} />
								By {article?.memberData?.memberNick}
							</Box>
							<Box className={'info'}>
								<ForumIcon className={'icon'} />
								{article?.articleComments} Comments
							</Box>
						</Stack>
						<Typography>
							{article?.articleTitle}
						</Typography>
						<Typography >
							{article?.articleContent.length > 43 ? `${article?.articleContent.slice(0, 43)}..` : article?.articleContent.slice(0, 45)}
						</Typography>
						<Divider className={'devider'} textAlign={'left'} light={true} sx={{width: '100%',marginBottom: "10px",marginTop:"10px", height: "3px", backgroundColor: "#bd7579"}} />
						<Button 
							className={'button'} 
							sx={{width: "50%",backgroundColor: "#42a5f5", color: 'white'}} // Lighter blue 
							size={'lg'} 
							endDecorator={<KeyboardArrowRight />}
							onClick={() => {pushDetailHandler(article?._id, article?.articleCategory)}}
						>
							Read More
						</Button>
					</CardContent>
				</Card>
			</CssVarsProvider>
		);
	} else {
		return (
				<>
					<CssVarsProvider>
						<Card id={`card${key}`} onClick={() => {pushDetailHandler(article?.articleCategory, article?._id,)}} className={`card`} color="neutral" variant="plain" sx={{width: 420}}>
							<CardOverflow>
								<AspectRatio ratio="2">
									<img
										src={articleImage}
										alt=""
									/>
								</AspectRatio>
							</CardOverflow>
							<CardContent className={'card-content'}>
								<Moment className={'time'} format={'HH:MM | DD.MM.YYYY'}>{article?.createdAt}</Moment>
								<Typography >
									{article?.articleTitle}
								</Typography>
							</CardContent>
						</Card>
					</CssVarsProvider>
				</>
			);
	}
};

export default CommunityCard;
