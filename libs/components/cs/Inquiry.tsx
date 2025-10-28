import React, { useCallback, useState } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box, Button, Stack, TextareaAutosize, TextField, Typography } from '@mui/material';
import { userVar } from '../../../apollo/store';
import { useMutation, useReactiveVar } from '@apollo/client';
import { NoticeCategory } from '../../enums/notice.enum';
import { NoticeInput } from '../../types/notice/notice.input';
import { CREATE_NOTICE } from '../../../apollo/user/mutation';
import { sweetErrorHandling, sweetMixinSuccessAlert } from '../../sweetAlert';
import { useRouter } from 'next/router';

const Inquiry = ({ initialValues, ...props }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [insertNoticeData, setInsertNoticeData] = useState<NoticeInput>(initialValues);

	/** APOLLO REQUESTS **/

	const [ createNotice ] = useMutation(CREATE_NOTICE);
	/** LIFECYCLES **/
	/** HANDLERS **/

	const doDisabledCheck = () => {
		if (
			insertNoticeData.noticeTitle === '' ||
			insertNoticeData.noticeContent === ''
			
		) {
			return true;
		}
	};

	const insertInquiryHandler = useCallback(async () => {
			try {
				const result = await createNotice({
					variables: {
						input: insertNoticeData,
					},
				});
	
				await sweetMixinSuccessAlert('This question has been sent successfully.');

				setInsertNoticeData(initialValues);
			} catch (err: any) {
				sweetErrorHandling(err).then();
			}
		}, [insertNoticeData]);

	if (device === 'mobile') {
		return <div>Inquiry MOBILE</div>;
	} else {
		return (
			<Stack className={'contact-content'}>
				<Stack className={'additional-info'}>
					<Stack className={'info-item'}>
						<Stack className={'head'}>
							<Typography>
								Our Location
							</Typography>
							<Box className={'icon'}>
								<img src='/img/icons/location.svg' />
							</Box>
						</Stack>
						<Box className={'content'}>
							Sa-Hagu, Busan, South Korea
						</Box>
					</Stack>
					<Stack className={'info-item'}>
						<Stack className={'head'}>
							<Typography>
								Our Contact <br /> Number
							</Typography>
							<Box className={'icon'}>
								<img src='/img/icons/phone.svg' />
							</Box>
						</Stack>
						<Box className={'content'}>
							+82(10)-6509-7071
						</Box>
					</Stack>
					<Stack className={'info-item'}>
						<Stack className={'head'}>
							<Typography>
								Our Email <br /> Address
							</Typography>
							<Box className={'icon'}>
								<img src='/img/icons/mail.svg' />
							</Box>
						</Stack>
						<Box className={'content'}>
							akramjonovamurxon02@gmail.com
						</Box>
					</Stack>
				</Stack>
				<Stack className={'contact-main'}>
					<Typography>
						Get In Touch With Bookle
					</Typography>
					<Stack className={'inquiry-box'}>
						<TextField
							className={'title-input'}
							type='text'
							placeholder='Inquiry Title'
							value={insertNoticeData.noticeTitle}
							onChange={({ target: { value }}) =>
								setInsertNoticeData({ ...insertNoticeData, noticeTitle: value})
							}
						/>
						<TextareaAutosize
							className={'content-input'}
							maxRows={5}
							placeholder='Message Here...'
							style={{height: '200px'}}
							value={insertNoticeData.noticeContent}
							onChange={({ target: { value }}) =>
								setInsertNoticeData({ ...insertNoticeData, noticeContent: value})
							}
						/>
						<Button
							className={'button'}
							disabled={doDisabledCheck()}
							onClick={insertInquiryHandler}
							variant="outlined"
						>
							Get In Touch
						</Button>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

Inquiry.defaultProps = {
	initialValues: {
		noticeCategory: NoticeCategory.INQUIRY,
		noticeTitle: '',
		noticeContent: '',
	},
};

export default Inquiry;
