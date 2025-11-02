import React, { HtmlHTMLAttributes, useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { Box, Button, InputAdornment, Stack, TextareaAutosize, TextField } from '@mui/material';
import { List, ListItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TabContext } from '@mui/lab';
import OutlinedInput from '@mui/material/OutlinedInput';
import TablePagination from '@mui/material/TablePagination';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { FaqArticlesPanelList } from '../../../libs/components/admin/cs/FaqList';
import { useMutation, useQuery } from '@apollo/client';
import { Notice } from '../../../libs/types/notice/notice';
import { GET_NOTICES } from '../../../apollo/user/query';
import { NoticeCategory, NoticeStatus } from '../../../libs/enums/notice.enum';
import { T } from '../../../libs/types/common';
import { CREATE_NOTICE, UPDATE_NOTICE } from '../../../apollo/user/mutation';
import { NoticeUpdate } from '../../../libs/types/notice/notice.update';
import { sweetErrorHandling, sweetMixinSuccessAlert } from '../../../libs/sweetAlert';
import { NoticeInput, NoticesInquiry } from '../../../libs/types/notice/notice.input';
import CloseIcon from '@mui/icons-material/Close';

const FaqArticles: NextPage = ({initialInquiry, initialValues, ...props}: any) => {
	const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
	const [ answers, setAnswers ] = useState<Notice[]>([]);
	const [total, setTotal] = useState<number>(0);

	const [insertFaqData, setInsertFaqData] = useState<NoticeInput>(initialValues);
	const [searchInquiryData, setSearchInquiryData] = useState<NoticesInquiry>(initialInquiry);
	const [ open, setOpen ] = useState<boolean>(false);
	const [tab, setTab ] = useState<string>('all');
	const [searchText, setSearchText ] = useState<string>('');

	/** APOLLO REQUESTS **/

	const [ updateNotice ] = useMutation(UPDATE_NOTICE);

	const [ createNotice ] = useMutation(CREATE_NOTICE);

	const {
		loading: getNoticesLoading,
		data: getNoticesData,
		error: getNoticesError,
		refetch: getNoticesRefetch,
	} = useQuery(
		GET_NOTICES,
		{
			fetchPolicy: "network-only",
			variables: {
				input: searchInquiryData,
			},
			notifyOnNetworkStatusChange: true,
			onCompleted: (data: T) => {
				setAnswers(data?.getNotices?.list);
				setTotal(data?.getNotices?.metaCounter[0]?.total);
			}
		}
	);
	
	/** LIFECYCLES **/

	useEffect(() => {
		getNoticesRefetch({input: searchInquiryData});
	}, [searchInquiryData]);

	useEffect(() => {
		getNoticesRefetch({input: searchInquiryData});
	}, [searchText]);

	/** HANDLERS **/

	const handleTabChange = (e: React.MouseEvent, tab: string) => {
		setTab(tab);
		if( tab === 'all' ) {
			setSearchInquiryData(initialInquiry);
		} else if ( tab === 'active') {
			setSearchInquiryData({ ...searchInquiryData, search: {noticeCategory: NoticeCategory.FAQ, noticeStatus: NoticeStatus.ACTIVE }});
		} else {
			setSearchInquiryData({ ...searchInquiryData, search: {noticeCategory: NoticeCategory.FAQ, noticeStatus: NoticeStatus.DELETE }});
		}
	}

	const doDisabledCheck = () => {
		if (
			insertFaqData.noticeTitle === '' ||
			insertFaqData.noticeContent === ''
			
		) {
			return true;
		}
	};

	const insertInquiryHandler = useCallback(async () => {
		try {
			const result = await createNotice({
				variables: {
					input: insertFaqData,
				},
			});

			await sweetMixinSuccessAlert('Answer has been sent successfully.');
			getNoticesRefetch({input: searchInquiryData});

			setInsertFaqData(initialValues);
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	}, [insertFaqData]);

	const menuIconClickHandler = (e: any, index: number) => {
		const tempAnchor = anchorEl.slice();
		tempAnchor[index] = e.currentTarget;
		setAnchorEl(tempAnchor);
	};

	const menuIconCloseHandler = () => {
		setAnchorEl([]);
	};

	const updateNoticeHandler = async (updateData: NoticeUpdate) => {
		try {
			await updateNotice(
				{
					variables: {
						input: updateData,
					},
				},
			);


			menuIconCloseHandler();
			await getNoticesRefetch({ input: searchInquiryData });
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};

	return (
		// @ts-ignore
		<Box component={'div'} className={'content'}>
			<Box component={'div'} className={'title flex_space'}>
				<Typography variant={'h2'}>FAQ Management</Typography>
				{ open ? (
					<Stack className={'contact-main'}>
						<Stack className={'head-items'}>
							<Typography>
								Create Answer
							</Typography>
							<CloseIcon onClick={() => {setOpen(false)}} className={'close-icon'} />
						</Stack>
						<Stack className={'inquiry-box'}>
							<TextField
								className={'title-input'}
								type='text'
								placeholder='Inquiry Title'
								value={insertFaqData.noticeTitle}
								onChange={({ target: { value }}) =>
									setInsertFaqData({ ...insertFaqData, noticeTitle: value})
								}
							/>
							<TextareaAutosize
								className={'content-input'}
								maxRows={5}
								placeholder='Message Here...'
								style={{height: '200px'}}
								value={insertFaqData.noticeContent}
								onChange={({ target: { value }}) =>
									setInsertFaqData({ ...insertFaqData, noticeContent: value})
								}
							/>
							<Button
								className={'button'}
								disabled={doDisabledCheck()}
								onClick={insertInquiryHandler}
								variant="outlined"
							>
								Create
							</Button>
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
									type={'text'}
									onChange={(e) => setSearchText(e.target.value)}
									sx={{ width: '100%' }}
									className={'search'}
									placeholder="Search answer by title"
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
											<InputAdornment position="end" onClick={() => {
												setSearchInquiryData(
													{
														...searchInquiryData,
														search: {
															...searchInquiryData.search,
															text: searchText
														}
													}
												);
											}}>
												<img src="/img/icons/search_icon.png" alt={'searchIcon'} />
											</InputAdornment>
										</>
									}
								/>
							</Stack>
							<Divider />
						</Box>
						<FaqArticlesPanelList
							// dense={dense}
							// membersData={membersData}
							// searchMembers={searchMembers}
							anchorEl={anchorEl}
							answers={answers}
							handleMenuIconClick={menuIconClickHandler}
							handleMenuIconClose={menuIconCloseHandler}
							updateNoticeHandler={updateNoticeHandler}
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

FaqArticles.defaultProps = {
	initialValues: {
		noticeCategory: NoticeCategory.FAQ,
		noticeTitle: '',
		noticeContent: '',
	},
	initialInquiry: {
		page: 1,
		limit: 10,
		search: {
			noticeCategory: NoticeCategory.FAQ
		}
	}
};

export default withAdminLayout(FaqArticles);
