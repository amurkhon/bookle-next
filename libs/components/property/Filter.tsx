import React, { useCallback, useEffect, useState } from 'react';
import {
	Stack,
	Typography,
	Checkbox,
	Button,
} from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';

import Divider from '@mui/material/Divider';
import Input from '@mui/material/Input';
import Slider from '@mui/material/Slider';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { PropertyCategory } from '../../enums/property.enum';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Box, Chip, CssVarsProvider } from '@mui/joy';

// interface FilterType {
// 	searchFilter: PropertiesInquiry;
// 	setSearchFilter: any;
// 	initialInput: PropertiesInquiry;
// }

const Filter = () => {
	const device = useDeviceDetect();
	const router = useRouter();

	const [value1, setValue1] = React.useState<number[]>([20, 37]);
	 const [val, setVal] = React.useState<number>(60);

	/** LIFECYCLES **/

	/** HANDLERS **/

	const handleChange1 = (event: Event, newValue: number[], activeThumb: number) => {
		if (activeThumb === 0) {
			setValue1([Math.min(newValue[0], value1[1] - 10), value1[1]]);
		} else {
			setValue1([value1[0], Math.max(newValue[1], value1[0] + 10)]);
		}
	};

	const handleChange = (_: Event, newValue: number) => {
		setVal(newValue);
	};


	if (device === 'mobile') {
		return <div>PROPERTIES FILTER</div>;
	} else {
		return (
			<Stack className={'filter-main'}>
				<Stack className={'find-your-book'}>
					<Typography variant={'h2'}>Search</Typography>
					<Box className={'divider'}>
						<Divider variant={'string'} sx={{width: '80px', marginRight: '5px', height: '7px', backgroundColor: '#d16655', borderRadius: '5px'}} textAlign={'left'} />
						<Divider variant={'string'} sx={{width: '30px', height: '7px', backgroundColor: '#d16655', borderRadius: '5px'}} textAlign={'left'} />
					</Box>
					<Input 
						disableUnderline={true} 
						sx={{
							padding: '5px 15px',
							width: "100%",
							borderRadius: '20px',
							backgroundColor: '#ffffff',
							marginBottom: '20px',
						}}
						placeholder={'Search Here...'}
					/>
					<Button
						sx={{
							width: '30%',
							padding: '10px',
							backgroundColor: '#d16655',
							borderRadius: '20px'
						}}
					>
						Search
					</Button>
				</Stack>
				<Stack className={'find-your-book'}>
					<Typography variant={'h2'}>Languages</Typography>
					<Box className={'divider'}>
						<Divider variant={'string'} sx={{width: '80px', marginRight: '5px', height: '7px', backgroundColor: '#d16655', borderRadius: '5px'}} textAlign={'left'} />
						<Divider variant={'string'} sx={{width: '30px', height: '7px', backgroundColor: '#d16655', borderRadius: '5px'}} textAlign={'left'} />
					</Box>
					<CssVarsProvider>
						<Select
							multiple
							autoFocus={true}
							placeholder={'Select language'}
							renderValue={(selected: any) => (
								<Box sx={{ display: 'flex', gap: '0.25rem' }}>
								{selected.map((selectedOption: any) => (
									<Chip variant="soft" color="primary">
									{selectedOption.label}
									</Chip>
								))}
								</Box>
							)}
							sx={{ minWidth: '15rem', borderRadius: '20px' }}
							slotProps={{
								listbox: {
								sx: {
									width: '100%',
								},
								},
							}}
							size={'lg'}
							>
							<Option value="English">English</Option>
							<Option value="Korean">Korean</Option>
							<Option value="Uzbek">Uzbek</Option>
						</Select>
					</CssVarsProvider>
				</Stack>
				<Stack className={'find-your-book'}>
					<Typography variant={'h2'}>Filter By Price</Typography>
					<Box className={'divider'}>
						<Divider variant={'string'} sx={{width: '80px', marginRight: '5px', height: '7px', backgroundColor: '#d16655', borderRadius: '5px'}} textAlign={'left'} />
						<Divider variant={'string'} sx={{width: '30px', height: '7px', backgroundColor: '#d16655', borderRadius: '5px'}} textAlign={'left'} />
					</Box>
					<Slider
						aria-label={'Price: in $'}
						getAriaLabel={() => 'Minimum distance'}
						value={value1}
						onChange={handleChange1}
						valueLabelDisplay="auto"
						getAriaValueText={(value: number) => {return `${value}`;} }
						max={200}
						disableSwap={true}
					/>
					<Stack className={'filter-bottom'}>
						<Button
							sx={{
								width: '30%',
								padding: '10px',
								backgroundColor: '#d16655',
								borderRadius: '20px'
							}}
						>
							Filter
						</Button>
						<Typography>
							Price: ${value1[0]}-${value1[1]}
						</Typography>
					</Stack>
				</Stack>
				<Stack className={'find-your-book'}>
					<Typography variant={'h2'}>Filter By Pages</Typography>
					<Box className={'divider'}>
						<Divider variant={'string'} sx={{width: '80px', marginRight: '5px', height: '7px', backgroundColor: '#d16655', borderRadius: '5px'}} textAlign={'left'} />
						<Divider variant={'string'} sx={{width: '30px', height: '7px', backgroundColor: '#d16655', borderRadius: '5px'}} textAlign={'left'} />
					</Box>
					<Slider
						step={20}
						value={val}
						valueLabelDisplay="auto"
						min={60}
						max={1000}
						onChange={handleChange}
					/>
					<Stack className={'filter-bottom'}>
						<Button
							sx={{
								width: '30%',
								padding: '10px',
								backgroundColor: '#d16655',
								borderRadius: '20px'
							}}
						>
							Filter
						</Button>
						<Typography>
							Pages: {val}
						</Typography>
					</Stack>
				</Stack>
				<Stack className={'find-your-book categories-box'}>
					<Typography variant={'h2'}>Categories</Typography>
					<Box className={'divider'}>
						<Divider variant={'string'} sx={{width: '80px', marginRight: '5px', height: '7px', backgroundColor: '#d16655', borderRadius: '5px'}} textAlign={'left'} />
						<Divider variant={'string'} sx={{width: '30px', height: '7px', backgroundColor: '#d16655', borderRadius: '5px'}} textAlign={'left'} />
					</Box>
					<Stack className={'category-name-box'}>
						<Box className={'category-name'}>
							<Typography>
								Novel
							</Typography>
							<Checkbox value={PropertyCategory.NOVEL} icon={<TaskAltIcon className={'icon-default'} />} checkedIcon={<TaskAltIcon className={'icon-checked'} />} />
						</Box>
						<Box className={'category-name'}>
							<Typography>
								Business
							</Typography>
							<Checkbox value={PropertyCategory.BUSINESS} icon={<TaskAltIcon className={'icon-default'} />} checkedIcon={<TaskAltIcon className={'icon-checked'} />} />
						</Box>
						<Box className={'category-name'}>
							<Typography>
								Fiction
							</Typography>
							<Checkbox value={PropertyCategory.FICTION} icon={<TaskAltIcon className={'icon-default'} />} checkedIcon={<TaskAltIcon className={'icon-checked'} />} />
						</Box>
						<Box className={'category-name'}>
							<Typography>
								Science
							</Typography>
							<Checkbox value={PropertyCategory.SCIENCE} icon={<TaskAltIcon className={'icon-default'} />} checkedIcon={<TaskAltIcon className={'icon-checked'} />} />
						</Box>
						<Box className={'category-name'}>
							<Typography>
								Medical
							</Typography>
							<Checkbox value={PropertyCategory.MEDICAL} icon={<TaskAltIcon className={'icon-default'} />} checkedIcon={<TaskAltIcon className={'icon-checked'} />} />
						</Box>
						<Box className={'category-name'}>
							<Typography>
								Computers
							</Typography>
							<Checkbox value={PropertyCategory.COMPUTERS} icon={<TaskAltIcon className={'icon-default'} />} checkedIcon={<TaskAltIcon className={'icon-checked'} />} />
						</Box>
						<Box className={'category-name'}>
							<Typography>
								Cooking
							</Typography>
							<Checkbox value={PropertyCategory.COOKING} icon={<TaskAltIcon className={'icon-default'} />} checkedIcon={<TaskAltIcon className={'icon-checked'} />} />
						</Box>
						<Box className={'category-name'}>
							<Typography>
								Drama
							</Typography>
							<Checkbox value={PropertyCategory.DRAMA} icon={<TaskAltIcon className={'icon-default'} />} checkedIcon={<TaskAltIcon className={'icon-checked'} />} />
						</Box>
						<Box className={'category-name'}>
							<Typography>
								Psychology
							</Typography>
							<Checkbox value={PropertyCategory.PSYCHOLOGY} icon={<TaskAltIcon className={'icon-default'} />} checkedIcon={<TaskAltIcon className={'icon-checked'} />} />
						</Box>
						<Box className={'category-name'}>
							<Typography>
								Nature
							</Typography>
							<Checkbox value={PropertyCategory.NATURE} icon={<TaskAltIcon className={'icon-default'} />} checkedIcon={<TaskAltIcon className={'icon-checked'} />} />
						</Box>
						<Box className={'category-name'}>
							<Typography>
								Romance
							</Typography>
							<Checkbox value={PropertyCategory.ROMANCE} icon={<TaskAltIcon className={'icon-default'} />} checkedIcon={<TaskAltIcon className={'icon-checked'} />} />
						</Box>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Filter;
