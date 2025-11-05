import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
	TableCell,
	TableHead,
	TableBody,
	TableRow,
	Table,
	TableContainer,
	Button,
	Menu,
	Fade,
	MenuItem,
	TextareaAutosize,
	Box,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { Notice } from '../../../types/notice/notice';
import { NEXT_PUBLIC_REACT_APP_API_URL } from '../../../config';
import Moment from 'react-moment';
import { NoticeCategory, NoticeStatus } from '../../../enums/notice.enum';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation, useQuery } from '@apollo/client';
import { GET_NOTICE } from '../../../../apollo/admin/query';
import { T } from '../../../types/common';
import { UPDATE_NOTICE } from '../../../../apollo/user/mutation';
import { NoticesInquiry } from '../../../types/notice/notice.input';

interface Data {
	category: string;
	qna_case_status: string;
	inquiry_action: string;
	title: string;
	writer: string;
	date: string;
	status: string;
	id?: string;
}

type Order = 'asc' | 'desc';

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: 'category',
		numeric: true,
		disablePadding: false,
		label: 'CATEGORY',
	},
	{
		id: 'title',
		numeric: true,
		disablePadding: false,
		label: 'TITLE',
	},
	{
		id: 'writer',
		numeric: true,
		disablePadding: false,
		label: 'WRITER',
	},
	{
		id: 'date',
		numeric: true,
		disablePadding: false,
		label: 'DATE',
	},
	{
		id: 'qna_case_status',
		numeric: false,
		disablePadding: false,
		label: 'STATUS',
	},
	{
		id: 'inquiry_action',
		numeric: false,
		disablePadding: false,
		label: 'Action',
	},
];

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { onSelectAllClick } = props;

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'left' : 'center'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

interface InquiryPanelListType {
	dense?: boolean;
	membersData?: any;
	searchMembers?: any;
	anchorEl?: any;
	handleMenuIconClick?: any;
	handleMenuIconClose?: any;
	generateMentorTypeHandle?: any;
	inquiryData: Notice[];
	updateTermsHandler: any;
	getInquiriesRefetch: any;
	searchInquiryData: NoticesInquiry;
}

export const InquiryList = (props: InquiryPanelListType) => {
	const {
		dense,
		membersData,
		searchMembers,
		anchorEl,
		handleMenuIconClick,
		handleMenuIconClose,
		generateMentorTypeHandle,
		inquiryData,
		updateTermsHandler,
		getInquiriesRefetch,
		searchInquiryData
	} = props;
	const router = useRouter();
	const [ open, setOpen ] = useState<boolean>(false);
	const [ inquiry, setInquiry ] = useState<Notice>();

	const image = `${NEXT_PUBLIC_REACT_APP_API_URL}/${inquiry?.memberData?.memberImage}` ?
		`${NEXT_PUBLIC_REACT_APP_API_URL}/${inquiry?.memberData?.memberImage}` : 
		'/img/profile/defaultUser.svg';

	/** APOLLO REQUESTS **/

	const [ updateNotice ] = useMutation(UPDATE_NOTICE);

	const {
		loading: getInquiryLoading,
		data: getInquiryData,
		error: getInquiryError,
		refetch: getInquiryRefetch,
	} = useQuery(
		GET_NOTICE,
		{
			fetchPolicy: "network-only",
			variables: {
				input: router.query.id,
			},
			skip: !router.query.id,
			notifyOnNetworkStatusChange: true,
			onCompleted: (data: T) => {
				setInquiry(data?.getNotice);
			}
		}
	);

	/** LIFECYCLES **/

	useEffect(() => {
		if(!open) {
			router.push(`/_admin/cs/inquiry`);
		}

		getInquiryRefetch({input: router.query.id});
		getInquiriesRefetch( { input: { ...searchInquiryData } });
	}, [open])

	/** HANDLERS **/

	const inquiryViewHandler = async (id: string) => {
		await router.push({
			pathname: '/_admin/cs/inquiry',
			query: { id: id },
		});
		setOpen(true);
		await updateNotice(
			{
				variables: {
					input: {
						_id: id,
						noticeStatus: NoticeStatus.HOLD,
						noticeCategory: NoticeCategory.INQUIRY,
					},
				},
			},
		);
	};

	return (
		<Stack>
			{ open ? <Stack className={'question_box'}>
						<Stack className={'head'}>
							<Stack className={'title'}>
								<img src={image} />
								<Box>
									<Typography>
										{inquiry?.memberData?.memberNick}
									</Typography>
									<span>
										<Moment format='DD.MM.YYYY'>{inquiry?.createdAt}</Moment>
									</span>
								</Box>
							</Stack>
							<CloseIcon onClick={() => {setOpen(false)}} className={'close-icon'} />
						</Stack>
						<Box className={'body'}>
							<Typography>
								{inquiry?.noticeContent}
							</Typography>
						</Box>
					</Stack> : ''
			}
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
					{/*@ts-ignore*/}
					<EnhancedTableHead />
					<TableBody>
						{inquiryData.map((inquiry: Notice, index: number) => {
							const image = `${NEXT_PUBLIC_REACT_APP_API_URL}/${inquiry?.memberData?.memberImage}` ?
								`${NEXT_PUBLIC_REACT_APP_API_URL}/${inquiry?.memberData?.memberImage}` : 
								'/img/profile/defaultUser.svg';

							let status_class_name = '';

							return (
								<TableRow hover key={'member._id'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell align="left">{inquiry?.noticeCategory}</TableCell>
									<TableCell align="left">{inquiry?.noticeTitle}</TableCell>
									<TableCell align="left" className={'name'}>
										<Stack direction={'row'}>
											<Link href={`/member?memberId=${inquiry?.memberData?._id}`}>
												<div>
													<Avatar alt="Remy Sharp" src={image} sx={{ ml: '2px', mr: '10px' }} />
												</div>
											</Link>
											<Link href={`/member?memberId=${inquiry?.memberData?._id}`}>
												<div>{inquiry?.memberData?.memberNick}</div>
											</Link>
										</Stack>
									</TableCell>
									<TableCell align="left">
										<Moment format={'DD.MM.YYYY'}>{inquiry?.createdAt}</Moment>
									</TableCell>
									<TableCell align="center">
										<Button onClick={(e: any) => handleMenuIconClick(e, index)} className={'badge success'}>
											{inquiry?.noticeStatus}
										</Button>

										<Menu
											className={'menu-modal'}
											MenuListProps={{
												'aria-labelledby': 'fade-button',
											}}
											anchorEl={anchorEl[index]}
											open={Boolean(anchorEl[index])}
											onClose={handleMenuIconClose}
											TransitionComponent={Fade}
											sx={{ p: 1 }}
										>
											{Object.values(NoticeStatus)
												.filter((ele: string) => ele !== inquiry?.noticeStatus)
												.map((status: string) => {
													
													return status === NoticeStatus.ACTIVE ? (
													<MenuItem disabled onClick={(e: any) => {updateTermsHandler(
														{
															_id: inquiry?._id,
															noticeStatus: status,
															noticeCategory: NoticeCategory.INQUIRY,
														}
													);
													}}>
														<Typography variant={'subtitle1'} component={'span'}>
															{status}
														</Typography>
													</MenuItem>
												) : 
												(
													<MenuItem onClick={(e: any) => {updateTermsHandler(
														{
															_id: inquiry?._id,
															noticeStatus: status,
															noticeCategory: NoticeCategory.INQUIRY,
														}
													);
													}}>
														<Typography variant={'subtitle1'} component={'span'}>
															{status}
														</Typography>
													</MenuItem>
												)}
											)}
										</Menu>
									</TableCell>
									<TableCell align='center'>
										<Button
											className={'btn-wrap'}
											variant={'outlined'}
											onClick={() => {inquiryViewHandler(inquiry._id)}}
										>
											View
										</Button>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};
