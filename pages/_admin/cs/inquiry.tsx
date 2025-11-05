import React, { useCallback, useState } from 'react';
import type { NextPage } from 'next';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { Box, InputAdornment, Stack } from '@mui/material';
import { List, ListItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TabContext } from '@mui/lab';
import OutlinedInput from '@mui/material/OutlinedInput';
import TablePagination from '@mui/material/TablePagination';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { InquiryList } from '../../../libs/components/admin/cs/InquiryList';
import { Notice } from '../../../libs/types/notice/notice';
import { useMutation, useQuery } from '@apollo/client';
import { GET_NOTICES } from '../../../apollo/user/query';
import { T } from '../../../libs/types/common';
import { NoticesInquiry } from '../../../libs/types/notice/notice.input';
import { NoticeCategory, NoticeStatus } from '../../../libs/enums/notice.enum';
import { UPDATE_NOTICE } from '../../../apollo/user/mutation';
import { sweetErrorHandling, sweetMixinSuccessAlert } from '../../../libs/sweetAlert';
import { NoticeUpdate } from '../../../libs/types/notice/notice.update';

const InquiryArticles: NextPage = ({initialInquiry, initialValues, ...props}: any) => {
	const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
	const [ inquiryData, setInquiryData ] = useState<Notice[]>([]);
	const [searchInquiryData, setSearchInquiryData] = useState<NoticesInquiry>(initialInquiry);
	const [total, setTotal] = useState<number>(0);
	const [tab, setTab ] = useState<string>('all');
	const [searchText, setSearchText ] = useState<string>('');

	/** APOLLO REQUESTS **/

	const [ updateNotice ] = useMutation(UPDATE_NOTICE);

	const {
		loading: getInquiryLoading,
		data: getInquiryData,
		error: getInquiryError,
		refetch: getInquiryRefetch,
	} = useQuery(
		GET_NOTICES,
		{
			fetchPolicy: "network-only",
			variables: {
				input: searchInquiryData,
			},
			notifyOnNetworkStatusChange: true,
			onCompleted: (data: T) => {
				setInquiryData(data?.getNotices?.list);
				setTotal(data?.getNotices?.metaCounter[0]?.total);
			}
		}
	);

	/** LIFECYCLES **/
	/** HANDLERS **/

	const updateTermsHandler = async ( data: NoticeUpdate ) => {
		try {
			await updateNotice(
				{
					variables: {
						input: data
					},
				},
			);


			handleMenuIconClose();
			await getInquiryRefetch({ input: searchInquiryData });
			await sweetMixinSuccessAlert('Inquiry has been changed successfully!');
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};

	const handleTabChange = (e: React.MouseEvent, tab: string) => {
		setTab(tab);
		if( tab === 'all' ) {
			setSearchInquiryData(initialInquiry);
		} else if ( tab === 'active') {
			setSearchInquiryData({ ...searchInquiryData, search: {noticeCategory: NoticeCategory.INQUIRY, noticeStatus: NoticeStatus.ACTIVE }});
		} else if ( tab === 'hold') {
			setSearchInquiryData({ ...searchInquiryData, search: {noticeCategory: NoticeCategory.INQUIRY, noticeStatus: NoticeStatus.HOLD }});
		} else {
			setSearchInquiryData({ ...searchInquiryData, search: {noticeCategory: NoticeCategory.INQUIRY, noticeStatus: NoticeStatus.DELETE }});
		}
	}

	const handleMenuIconClick = (e: any, index: number) => {
		const tempAnchor = anchorEl.slice();
		tempAnchor[index] = e.currentTarget;
		setAnchorEl(tempAnchor);
	};

	const handleMenuIconClose = () => {
		setAnchorEl([]);
	};

	return (
		<Box component={'div'} className={'content'}>
			<Typography variant={'h2'} className={'tit'} sx={{ mb: '24px' }}>
				Inquiry Management
			</Typography>
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
									onClick={(e: any) => handleTabChange(e, 'hold')}
									value="hold"
									className={tab === 'hold' ? 'li on' : 'li'}
								>
									Viewed
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
									placeholder="Search inquiry by title"
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
						<InquiryList
							// dense={dense}
							// membersData={membersData}
							// searchMembers={searchMembers}
							anchorEl={anchorEl}
							inquiryData={inquiryData}
							handleMenuIconClick={handleMenuIconClick}
							handleMenuIconClose={handleMenuIconClose}
							updateTermsHandler={updateTermsHandler}
							getInquiriesRefetch={getInquiryRefetch}
							searchInquiryData={searchInquiryData}
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

InquiryArticles.defaultProps = {
	initialInquiry: {
		page: 1,
		limit: 10,
		search: {
			noticeCategory: NoticeCategory.INQUIRY
		}
	}
};

export default withAdminLayout(InquiryArticles);
