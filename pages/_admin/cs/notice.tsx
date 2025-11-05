import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { Box, Button, InputAdornment, Stack, TextareaAutosize, TextField } from '@mui/material';
import { List, ListItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { TabContext } from '@mui/lab';
import OutlinedInput from '@mui/material/OutlinedInput';
import TablePagination from '@mui/material/TablePagination';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { NoticeList } from '../../../libs/components/admin/cs/NoticeList';
import { NoticeInput, NoticesInquiry } from '../../../libs/types/notice/notice.input';
import { NoticeCategory, NoticeStatus } from '../../../libs/enums/notice.enum';
import CloseIcon from '@mui/icons-material/Close';
import { CREATE_NOTICE, UPDATE_NOTICE } from '../../../apollo/user/mutation';
import { useMutation, useQuery } from '@apollo/client';
import { sweetErrorHandling, sweetMixinSuccessAlert } from '../../../libs/sweetAlert';
import { GET_NOTICES } from '../../../apollo/user/query';
import { Notice } from '../../../libs/types/notice/notice';
import { T } from '../../../libs/types/common';
import { useRouter } from 'next/router';
import { GET_NOTICE } from '../../../apollo/admin/query';

const AdminNotice: NextPage = ({initialInquiry, initialValues, ...props}: any) => {
	const router = useRouter();
	const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
	const [ noticeTerms, setNoticeTerms ] = useState<Notice[]>([]);
	const [ open, setOpen ] = useState<boolean>(false);
	const [insertTermsData, setInsertTermsData] = useState<NoticeInput>(initialValues);
	const [searchInquiryData, setSearchInquiryData] = useState<NoticesInquiry>(initialInquiry);
	const [total, setTotal] = useState<number>(0);
	const [searchText, setSearchText ] = useState<string>('');
	const [tab, setTab ] = useState<string>('all');

	/** APOLLO REQUESTS **/

	const [ createNotice ] = useMutation(CREATE_NOTICE);

	const [ updateNotice ] = useMutation(UPDATE_NOTICE);

	const {
		loading: getTermsLoading,
		data: getTermsData,
		error: getTermsError,
		refetch: getTermsRefetch,
	} = useQuery(
		GET_NOTICES,
		{
			fetchPolicy: "network-only",
			variables: {
				input: searchInquiryData,
			},
			notifyOnNetworkStatusChange: true,
			onCompleted: (data: T) => {
				setNoticeTerms(data?.getNotices?.list);
				setTotal(data?.getNotices?.metaCounter[0]?.total);
			}
		}
	);

	const {
		loading: getNoticeLoading,
		data: getNoticeData,
		error: getNoticeError,
		refetch: getNoticeRefetch,		
	} = useQuery(GET_NOTICE, {
		fetchPolicy: "network-only",
		variables: {input: router.query.id},
		skip: !router.query.id,
		notifyOnNetworkStatusChange: true,
	});

	/** LIFECYCLES **/
	useEffect(() => {
		setInsertTermsData({
			...insertTermsData,
			noticeTitle: getNoticeData?.getNotice ? getNoticeData?.getNotice?.noticeTitle : '',
			noticeContent: getNoticeData?.getNotice ? getNoticeData?.getNotice?.noticeContent : '',
			noticeStatus: getNoticeData?.getNotice ? getNoticeData?.getNotice?.noticeStatus : NoticeStatus.ACTIVE,
		});
	}, [getNoticeLoading, getNoticeData]);

	useEffect(() => {
		getTermsRefetch({input: searchInquiryData});
	}, [searchInquiryData]);

	useEffect(() => {
		getTermsRefetch({input: searchInquiryData});
	}, [searchText]);

	useEffect(() => {
		if(!open) {
			router.push(`/_admin/cs/notice`);
		}
	}, [open])


	/** HANDLERS **/

	const handleTabChange = (e: React.MouseEvent, tab: string) => {
		setTab(tab);
		if( tab === 'all' ) {
			setSearchInquiryData(initialInquiry);
		} else if ( tab === 'active') {
			setSearchInquiryData({ ...searchInquiryData, search: {noticeCategory: NoticeCategory.TERMS, noticeStatus: NoticeStatus.ACTIVE }});
		} else {
			setSearchInquiryData({ ...searchInquiryData, search: {noticeCategory: NoticeCategory.TERMS, noticeStatus: NoticeStatus.DELETE }});
		}
	}

	const doDisabledCheck = () => {
		if (
			insertTermsData.noticeTitle === '' ||
			insertTermsData.noticeContent === ''
			
		) {
			return true;
		}
	};

	const insertInquiryHandler = useCallback(async () => {
		try {
			const result = await createNotice({
				variables: {
					input: insertTermsData,
				},
			});

			await sweetMixinSuccessAlert('Term has been sent successfully.');
			getTermsRefetch({input: searchInquiryData});

			setInsertTermsData(initialValues);
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	}, [insertTermsData]);

	const updateTermsHandler = useCallback( async ( ) => {
		try {

			// @ts-ignore
			insertTermsData._id = getNoticeData?.getNotice?._id;
			await updateNotice(
				{
					variables: {
						input: {...insertTermsData},
					},
				},
			);


			handleMenuIconClose();
			await getTermsRefetch({ input: searchInquiryData });
			await sweetMixinSuccessAlert('Term has been changed successfully!');
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	}, [insertTermsData]);

	const handleMenuIconClick = (e: any, index: number) => {
		const tempAnchor = anchorEl.slice();
		tempAnchor[index] = e.currentTarget;
		setAnchorEl(tempAnchor);
	};

	const handleMenuIconClose = () => {
		setAnchorEl([]);
	};

	return (
		// @ts-ignore
		<Box component={'div'} className={'content'}>
			<Box component={'div'} className={'title flex_space'}>
				<Typography variant={'h2'}>Notice Management</Typography>
				{ open ? (
					<Stack className={'contact-main'}>
						<Stack className={'head-items'}>
							<Typography>
								Term Notice
							</Typography>
							<CloseIcon onClick={() => {setOpen(false)}} className={'close-icon'} />
						</Stack>
						<Stack className={'inquiry-box'}>
							<TextField
								className={'title-input'}
								type='text'
								placeholder='Term Title'
								value={insertTermsData.noticeTitle}
								onChange={({ target: { value }}) =>
									setInsertTermsData({ ...insertTermsData, noticeTitle: value})
								}
							/>
							<TextareaAutosize
								className={'content-input'}
								maxRows={5}
								placeholder='Message Here...'
								style={{height: '200px'}}
								value={insertTermsData.noticeContent}
								onChange={({ target: { value }}) =>
									setInsertTermsData({ ...insertTermsData, noticeContent: value})
								}
							/>
							{router.query.id ? (
								<Button className="button" disabled={doDisabledCheck()} variant="outlined" onClick={updateTermsHandler}>
									Save
								</Button>
							) : (
								<Button className="button" disabled={doDisabledCheck()} variant="outlined" onClick={insertInquiryHandler}>
									Create
								</Button>
							)}
						</Stack>
					</Stack>
				) : (
					<Button
						className="btn_add"
						variant={'contained'}
						size={'medium'}
						onClick={() => {setOpen(true)}}
					>
						<AddRoundedIcon sx={{ mr: '8px' }} />
						ADD
					</Button>
				)}
			</Box>
			<Box component={'div'} className={'table-wrap'}>
				<Box component={'div'} sx={{ width: '100%', typography: 'body1' }}>
					<TabContext value={'value'}>
						<Box component={'div'}>
							<List className={'tab-menu'}>
								<ListItem
									onClick={(e: any) => handleTabChange(e, 'all')}
									value="all"
									className={tab === 'all' ? 'li on' : 'li'}
								>
									All
								</ListItem>
								<ListItem
									onClick={(e: any) => handleTabChange(e, 'active')}
									value="active"
									className={tab === 'active' ? 'li on' : 'li'}
								>
									Active
								</ListItem>
								<ListItem
									onClick={(e: any) => handleTabChange(e, 'deleted')}
									value="deleted"
									className={tab === 'deleted' ? 'li on' : 'li'}
								>
									Deleted
								</ListItem>
							</List>
							<Divider />
							<Stack className={'search-area'} sx={{ m: '24px' }}>
								<OutlinedInput
									value={searchText}
									onChange={(e) => setSearchText(e.target.value)}
									sx={{ width: '100%' }}
									className={'search'}
									placeholder="Search term by title"
									onKeyDown={(event) => {
										if (event.key == 'Enter') {
											setSearchInquiryData(
												{
													...searchInquiryData,
													search: {
														...searchInquiryData.search,
														text: searchText
													}
												}
											);
										};
									}}
									endAdornment={
										<>
											{searchText && <CancelRoundedIcon
												sx={{cursor: 'pointer'}} 
												onClick={() => {
													setSearchText('');
													setSearchInquiryData(
														{
															...searchInquiryData,
															search: {
																...searchInquiryData.search,
																text: '',
															}
														}
													);
												}}
											/>}
											<InputAdornment position="end" 
												onClick={() => {
													setSearchInquiryData(
														{
															...searchInquiryData,
															search: {
																...searchInquiryData.search,
																text: searchText
															}
														}
													);
												}}
											>
												<img src="/img/icons/search_icon.png" alt={'searchIcon'} />
											</InputAdornment>
										</>
									}
								/>
							</Stack>
							<Divider />
						</Box>
						<NoticeList
							// dense={dense}
							// membersData={membersData}
							// searchMembers={searchMembers}
							anchorEl={anchorEl}
							noticeTerms={noticeTerms}
							handleMenuIconClick={handleMenuIconClick}
							handleMenuIconClose={handleMenuIconClose}
							updateTermsHandler={updateTermsHandler}
							openForm={setOpen}
						/>

						<TablePagination
							rowsPerPageOptions={[20, 40, 60]}
							component="div"
							count={4}
							rowsPerPage={10}
							page={1}
							onPageChange={() => {}}
							onRowsPerPageChange={() => {}}
						/>
					</TabContext>
				</Box>
			</Box>
		</Box>
	);
};
AdminNotice.defaultProps = {
	initialValues: {
		noticeCategory: NoticeCategory.TERMS,
		noticeTitle: '',
		noticeContent: '',
	},
	initialInquiry: {
		page: 1,
		limit: 10,
		search: {
			noticeCategory: NoticeCategory.TERMS
		}
	}
};

export default withAdminLayout(AdminNotice);
