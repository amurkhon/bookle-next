import React, { useState } from 'react';
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
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { Notice, Notices } from '../../../types/notice/notice';
import Moment from 'react-moment';
import { NoticeStatus } from '../../../enums/notice.enum';

interface Data {
	category: string;
	title: string;
	writer: string;
	date: string;
	status: string;
	id?: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
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
		id: 'status',
		numeric: false,
		disablePadding: false,
		label: 'STATUS',
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

interface FaqArticlesPanelListType {
	dense?: boolean;
	answers: Notice[];
	membersData?: any;
	searchMembers?: any;
	anchorEl?: any;
	handleMenuIconClick?: any;
	handleMenuIconClose?: any;
	updateNoticeHandler?: any;
}

export const FaqArticlesPanelList = (props: FaqArticlesPanelListType) => {
	const {
		dense,
		answers,
		membersData,
		searchMembers,
		anchorEl,
		handleMenuIconClick,
		handleMenuIconClose,
		updateNoticeHandler,
	} = props;
	const router = useRouter();

	/** APOLLO REQUESTS **/
	/** LIFECYCLES **/
	/** HANDLERS **/

	return (
		<Stack>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
					{/*@ts-ignore*/}
					<EnhancedTableHead />
					<TableBody>
						{answers.map((faq: Notice, index: number) => {
							const member_image = '/img/profile/defaultUser.svg';

							let status_class_name = '';

							return (
								<TableRow hover key={faq?._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell align="left">{faq?.noticeCategory}</TableCell>
									<TableCell align="left">{faq?.noticeTitle}</TableCell>
									<TableCell align="left" className={'name'}>
										<Stack direction={'row'}>
											<Link href={`/_admin/users/detail?mb_id=$'{member._id'}`}>
												<div>
													<Avatar alt="Remy Sharp" src={member_image} sx={{ ml: '2px', mr: '10px' }} />
												</div>
											</Link>
											<Link href={`/_admin/users/detail?mb_id=${'member._id'}`}>
												<div>{faq?.memberData?.memberNick}</div>
											</Link>
										</Stack>
									</TableCell>
									<TableCell align="left">
										<Moment format={'DD.MM.YYYY'}>{faq?.createdAt}</Moment>
									</TableCell>
									<TableCell align="center">
										<Button onClick={(e: any) => handleMenuIconClick(e, index)} className={'badge success'}>
											{faq?.noticeStatus}
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
												.filter((ele: string) => ele !== faq?.noticeStatus)
												.map((status: string) => (
													<MenuItem onClick={(e: any) => {updateNoticeHandler(
														{
															_id: faq?._id,
															noticeStatus: status
														}
													);
													}}>
														<Typography variant={'subtitle1'} component={'span'}>
															{status}
														</Typography>
													</MenuItem>
												)
											)}
										</Menu>
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
