import React from 'react';
import { useRouter } from 'next/router';
import { Box, Stack } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Member } from '../../types/member/member';

interface TopAuthorProps {
	author: Member;
}
const TopAgentCard = (props: TopAuthorProps) => {
	const { author } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const agentImage = author?.memberImage
		? `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/${author?.memberImage}`
		: '/img/profile/defaultUser.svg';

	/** HANDLERS **/

	const pushAuthorDetailHandler = async (memberId: string | undefined) => {
		await router.push({pathname: '/author/detail', query: {authorId: memberId}});
	};

	if (device === 'mobile') {
		return (
			<Stack className="top-agent-card">
				<img src={agentImage} alt="" />

				<strong>{author?.memberNick}</strong>
				<span>Author</span>
			</Stack>
		);
	} else {
		return (
			<Stack className="top-agent-card">
				<span 
					className={'agent-img'}
					onClick={() => {pushAuthorDetailHandler(author?._id)}}
				>
					<img src={agentImage} alt="" />
				</span>
				<span className='gradient'></span>

				<strong>{author?.memberNick}</strong>
				<span>Author</span>
			</Stack>
		);
	}
};

export default TopAgentCard;
