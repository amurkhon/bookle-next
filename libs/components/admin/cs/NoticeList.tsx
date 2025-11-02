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
	Box,
	Checkbox,
	Toolbar,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { IconButton, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { NotePencil } from 'phosphor-react';
import { Notice } from '../../../types/notice/notice';
import { NEXT_PUBLIC_REACT_APP_API_URL } from '../../../config';
import Moment from 'react-moment';

type Order = 'asc' | 'desc';

interface Data {
	category: string;
	title: string;
	id: string;
	writer: string;
	date: string;
	view: number;
	action: string;
}
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
		label: 'Category',
	},
	{
		id: 'title',
		numeric: true,
		disablePadding: false,
		label: 'TITLE',
	},
	{
		id: 'date',
		numeric: true,
		disablePadding: false,
		label: 'DATE',
	},
	{
		id: 'writer',
		numeric: true,
		disablePadding: false,
		label: 'WRITER',
	},
	{
		id: 'action',
		numeric: false,
		disablePadding: false,
		label: 'ACTION',
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

interface EnhancedTableToolbarProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
	const [select, setSelect] = useState('');
	const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

	return (
		<>
			{numSelected > 0 ? (
				<>
					<Toolbar>
						<Box component={'div'}>
							<Box component={'div'} className="flex_box">
								<Checkbox
									color="primary"
									indeterminate={numSelected > 0 && numSelected < rowCount}
									checked={rowCount > 0 && numSelected === rowCount}
									onChange={onSelectAllClick}
									inputProps={{
										'aria-label': 'select all',
									}}
								/>
								<Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="h6" component="div">
									{numSelected} selected
								</Typography>
							</Box>
							<Button variant={'text'} size={'large'}>
								Delete
							</Button>
						</Box>
					</Toolbar>
				</>
			) : (
				<TableHead>
					<TableRow>
						<TableCell padding="checkbox">
							<Checkbox
								color="primary"
								indeterminate={numSelected > 0 && numSelected < rowCount}
								checked={rowCount > 0 && numSelected === rowCount}
								onChange={onSelectAllClick}
								inputProps={{
									'aria-label': 'select all',
								}}
							/>
						</TableCell>
						{headCells.map((headCell) => (
							<TableCell
								key={headCell.id}
								align={headCell.numeric ? 'left' : 'right'}
								padding={headCell.disablePadding ? 'none' : 'normal'}
							>
								{headCell.label}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
			)}
			{numSelected > 0 ? null : null}
		</>
	);
};

interface NoticeListType {
	dense?: boolean;
	membersData?: any;
	searchMembers?: any;
	noticeTerms: Notice[];
	anchorEl?: any;
	handleMenuIconClick?: any;
	handleMenuIconClose?: any;
	updateTermsHandler?: any;
}

export const NoticeList = (props: NoticeListType) => {
	const {
		dense,
		membersData,
		searchMembers,
		anchorEl,
		noticeTerms,
		handleMenuIconClick,
		handleMenuIconClose,
		updateTermsHandler,
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
					<EnhancedTableToolbar />
					<TableBody>
						{noticeTerms.map((ele: Notice, index: number) => {
							const image = `${NEXT_PUBLIC_REACT_APP_API_URL}/${ele?.memberData?.memberImage}` ?
								`${NEXT_PUBLIC_REACT_APP_API_URL}/${ele?.memberData?.memberImage}` : 
								'/img/profile/defaultUser.svg';

							return (
								<TableRow hover key={'member._id'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell padding="checkbox">
										<Checkbox color="primary" />
									</TableCell>
									<TableCell align="left">{ele?.noticeCategory}</TableCell>
									<TableCell align="left">{ele?.noticeTitle}</TableCell>
									<TableCell align="left">
										<Moment format={'DD.MM.YYYY'}>{ele?.createdAt}</Moment>
									</TableCell>
									<TableCell align="left" className={'name'}>
										<Stack direction={'row'}>
											<Link href={`/_admin/users/detail?mb_id=$'{member._id'}`}>
												<div>
													<Avatar alt="Remy Sharp" src={image} sx={{ ml: '2px', mr: '10px' }} />
												</div>
											</Link>
											<Link href={`/_admin/users/detail?mb_id=${'member._id'}`}>
												<div>{ele?.memberData?.memberNick}</div>
											</Link>
										</Stack>
									</TableCell>
									<TableCell align="right">
										<Tooltip title={'delete'}>
											<IconButton>
												<DeleteRoundedIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="edit">
											<IconButton onClick={() => router.push(`/_admin/cs/notice_create?id=notice._id`)}>
												<NotePencil size={24} weight="fill" />
											</IconButton>
										</Tooltip>
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
