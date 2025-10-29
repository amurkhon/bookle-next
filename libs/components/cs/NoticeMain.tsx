import React, { useState } from 'react';
import { Stack } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Notice } from '../../types/notice/notice';
import { useQuery } from '@apollo/client';
import { GET_NOTICES } from '../../../apollo/user/query';
import { NoticeCategory } from '../../enums/notice.enum';
import { T } from '../../types/common';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { AccordionDetails, Typography } from '@mui/material';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import Moment from 'react-moment';

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
	({ theme }) => ({
		border: `1px solid ${theme.palette.divider}`,
		'&:not(:last-child)': {
			borderBottom: 0,
		},
		'&:before': {
			display: 'none',
		},
	}),
);
const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: '1.4rem' }} />} {...props} />
))(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : '#fff',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(180deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));

const NoticeMain = () => {
	const device = useDeviceDetect();

	const [ notices, setNotices ] = useState<Notice[]>([]);
	const [total, setTotal] = useState<number>(0);

	/** APOLLO REQUESTS **/

	const {
		loading: getNoticesLoading,
		data: getNoticesData,
		error: getNoticesError,
		refetch: getNoticesRefetch,
	} = useQuery(
		GET_NOTICES,
		{
			fetchPolicy: "network-only",
			variables: {input: {
				page: 1,
				limit: 20,
				search: {
					noticeCategory: NoticeCategory.TERMS
				}
			}},
			notifyOnNetworkStatusChange: true,
			onCompleted: (data: T) => {
				setNotices(data?.getNotices?.list);
				setTotal(data?.getNotices?.metaCounter[0]?.total);
			}
		}
	);
	/** LIFECYCLES **/
	/** HANDLERS **/

	if (device === 'mobile') {
		return <div>NOTICE MOBILE</div>;
	} else {
		return (
			<Stack className={'notice-content'}>
				<span className={'title'}>Notice</span>
				<Stack className={'main'}>
					{notices.map((ele: Notice, index: number) => {
						return (
							<Accordion key={ele?._id} className={'notice-box'}>
								<AccordionSummary id="panel1d-header" className="question">
									<Typography> {ele?.noticeTitle}</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Stack className={'answer flex-box'}>
										<Typography> {ele?.noticeContent} </Typography>
									</Stack>
									<span>
										<Moment format={'DD.MM.YYYY'}>{ele?.createdAt}</Moment>
									</span>
								</AccordionDetails>
							</Accordion>
						);
					})}
				</Stack>
			</Stack>
		);
	}
};

export default NoticeMain;
