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

interface CommunityCardProps {
	key: string;
	// vertical: boolean;
	// article: BoardArticle;
	// index: number;
}

const CommunityCard = (props: CommunityCardProps) => {
	const {key} = props;
	const device = useDeviceDetect();
	// const articleImage = article?.articleImage
	// 	? `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/${article?.articleImage}`
	// 	: '/img/event.svg';

	console.log("key: ", key);

	if (device === 'mobile') {
		return <div>COMMUNITY CARD (MOBILE)</div>;
	} else {
		return (
				<>
					<CssVarsProvider>
						<Card className={`card`} color="neutral" variant="plain" sx={{width: 420}}>
							<CardOverflow>
								<AspectRatio ratio="1.5">
									<img
										src='/img/property/sub4.png'
										alt=""
									/>
								</AspectRatio>
							</CardOverflow>
							<CardContent className={'card-content'}>
								<Stack className={'meta-info'}>
									<Box className={'info'}>
										<PersonIcon className={'icon'} />
										By User
									</Box>
									<Box className={'info'}>
										<ForumIcon className={'icon'} />
										2 Comments
									</Box>
								</Stack>
								<Typography>
									Lorem ipsum dolor a amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore magna aliqua.
								</Typography>
								<Divider className={'devider'} textAlign={'left'} light={true} sx={{width: '100%',marginBottom: "20px",marginTop:"20px", height: "3px", backgroundColor: "#bd7579"}} />
								<Button className={'button'} sx={{width: "50%",backgroundColor: "#d16655", color: 'white'}} size={'lg'} endDecorator={<KeyboardArrowRight />} color={'#2e4a5b'}>
									Read More
								</Button>
							</CardContent>
						</Card>
					</CssVarsProvider>
				</>
			);
	}
};

export default CommunityCard;
