import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box, Button, Stack, TextareaAutosize, TextField, Typography } from '@mui/material';

const Inquiry = () => {
	const device = useDeviceDetect();

	/** APOLLO REQUESTS **/
	/** LIFECYCLES **/
	/** HANDLERS **/

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
						/>
						<TextareaAutosize
							className={'content-input'}
							maxRows={5}
							placeholder='Message Here...'
							style={{height: '200px'}}
						/>
						<Button
							className={'button'}
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

export default Inquiry;
