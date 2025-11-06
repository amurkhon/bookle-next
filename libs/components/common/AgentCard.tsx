import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Stack, Box, Typography } from '@mui/material';
import Link from 'next/link';
import { NEXT_PUBLIC_REACT_APP_API_URL } from '../../config';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';

interface AgentCardProps {
	author: any;
	likePropertyHandler: any;
}

const AgentCard = (props: AgentCardProps) => {
	const { author, likePropertyHandler } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();
	const imagePath: string = author?.memberImage
		? `${NEXT_PUBLIC_REACT_APP_API_URL}/${author?.memberImage}`
		: '/img/profile/defaultUser.svg';
	
	/* Handlers */
	const pushDetailHandler = async (memberId: string) => {
		await router.push({pathname: '/author/detail', query: {authorId: memberId}});
	};

	if (device === 'mobile') {
		return <div>AGENT CARD</div>;
	} else {
		return (
			<Stack className="agent-general-card">
				<span
					className={'agent-img'}
					onClick={() => {pushDetailHandler(author?._id)}}
				>
					<img src={imagePath} />
				</span>

				<Stack className={'agent-desc'}>
					<Box component={'div'} className={'agent-info'}>
						<Link
							href={{
								pathname: '/author/detail',
								query: { authorId: 'id' },
							}}
						>
							<strong>{author?.memberFullName ?? author?.memberNick}</strong>
						</Link>
						<span style={{fontStyle: 'italic'}}>Total of books: {author?.memberProperties} </span>
					</Box>
					<Box component={'div'} className={'buttons'}>
						<IconButton color={'default'}>
							<RemoveRedEyeIcon />
						</IconButton>
						<Typography className="view-cnt">{author?.memberViews}</Typography>
						<IconButton color={'default'} onClick={() => likePropertyHandler(user, author?._id)}>
							{author?.meLiked && author?.meLiked[0]?.myFavorite ? (
								<FavoriteIcon color={'primary'} />
							) : (
								<FavoriteBorderIcon />
							)}
						</IconButton>
						<Typography className="view-cnt">{author?.memberLikes}</Typography>
					</Box>
				</Stack>
			</Stack>
		);
	}
};

export default AgentCard;
