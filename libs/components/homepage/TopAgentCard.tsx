import React from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Member } from '../../types/member/member';

interface TopAgentProps {
	agent: Member;
}
const TopAgentCard = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	// const agentImage = agent?.memberImage
	// 	? `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/${agent?.memberImage}`
	// 	: '/img/profile/defaultUser.svg';

	/** HANDLERS **/

	if (device === 'mobile') {
		return (
			<Stack className="top-agent-card">
				<img src={'/img/profile/girl.svg'} alt="" />

				<strong>Emma Watson</strong>
				<span>Author</span>
			</Stack>
		);
	} else {
		return (
			<Stack className="top-agent-card">
				<img src={'/img/profile/girl.svg'} alt="" />
				<span className='gradient'></span>

				<strong>Emma Watson</strong>
				<span>Author</span>
			</Stack>
		);
	}
};

export default TopAgentCard;
