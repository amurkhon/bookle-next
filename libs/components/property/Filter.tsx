import React, { useCallback, useEffect, useState } from 'react';
import {
	Stack,
	Typography,
	Checkbox,
	Button,
	Tooltip,
	IconButton,
	capitalize,
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
import { PropertiesInquiry } from '../../types/property/property.input';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';

interface FilterType {
	searchFilter: PropertiesInquiry;
	setSearchFilter: any;
	initialInput: PropertiesInquiry;
}

const Filter = (props: FilterType) => {
	const { searchFilter, setSearchFilter, initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();

	const [value1, setValue1] = React.useState<number[]>([20, 37]);
	 const [val, setVal] = React.useState<number>(60);
	 const [propertyCategory, setPropertyCategory] = useState<PropertyCategory[]>(Object.values(PropertyCategory));
	 const [showMore, setShowMore] = useState<boolean>(false);
	 const [searchText, setSearchText] = useState<string>('');

	/** LIFECYCLES **/

	useEffect(() => {

		if (searchFilter?.search?.propertyCategory?.length == 0) {
			delete searchFilter.search.propertyCategory;
			setShowMore(false);
			router.push(`/books?input=${JSON.stringify({
			...searchFilter,
			search: {
				...searchFilter.search,
			},
		})}`, `/books?input=${JSON.stringify({
			...searchFilter,
			search: {
				...searchFilter.search,
			},
		})}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.typeList?.length == 0) {
			delete searchFilter.search.typeList;
			router.push(`/books?input=${JSON.stringify({
			...searchFilter,
			search: {
				...searchFilter.search,
			},
		})}`, `/books?input=${JSON.stringify({
			...searchFilter,
			search: {
				...searchFilter.search,
			},
		})}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.options?.length == 0) {
			delete searchFilter.search.options;
			router.push(`/books?input=${JSON.stringify({
			...searchFilter,
			search: {
				...searchFilter.search,
			},
		})}`, `/books?input=${JSON.stringify({
			...searchFilter,
			search: {
				...searchFilter.search,
			},
		})}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.propertyCategory) setShowMore(true);
	}, [searchFilter]);

	/** HANDLERS **/

	const propertyCategorySelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/books?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, propertyCategory: [...(searchFilter?.search?.propertyCategory || []), value] },
						})}`,
						`/books?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, propertyCategory: [...(searchFilter?.search?.propertyCategory || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.propertyCategory?.includes(value)) {
					await router.push(
						`/books?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								propertyCategory: searchFilter?.search?.propertyCategory?.filter((item: string) => item !== value),
							},
						})}`,
						`/books?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								propertyCategory: searchFilter?.search?.propertyCategory?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.propertyCategory?.length == 0) {
					alert('error');
				}

				console.log('propertyCategorySelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, propertyCategorySelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const handleChange1 = (event: Event, newValue: number[], activeThumb: number) => {
		if (activeThumb === 0) {
			setValue1([Math.min(newValue[0], value1[1] - 10), value1[1]]);
		} else {
			setValue1([value1[0], Math.max(newValue[1], value1[0] + 10)]);
		}
	};

	const propertyPriceHandler = useCallback(
		async (value: number[]) => {
			await router.push(
					`/books?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value[0] * 1, end: value[1] * 1 },
						},
					})}`,
					`/books?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value[0] * 1, end: value[1] * 1 },
						},
					})}`,
					{ scroll: false },
		)},
		[searchFilter],
	);
	
	const handleChange = (_: Event, newValue: number) => {
		setVal(newValue);
	};

	const propertyPagesHandler = useCallback(
		async (value: number) => {
			await router.push(
					`/books?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pagesRange: { ...searchFilter.search.pagesRange, end: value },
						},
					})}`,
					`/books?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pagesRange: { ...searchFilter.search.pagesRange, end: value},
						},
					})}`,
					{ scroll: false },
		)},
		[searchFilter],
	);

	const propertyLanguageSelectHandler = useCallback(
		async (e: any) => {
			const value = e.target.innerText.toUpperCase();
			try {
				if (searchFilter?.search?.languageList?.includes(value)) {
					await router.push(
						`/books?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								languageList: searchFilter?.search?.languageList?.filter((item: string) => item !== value),
							},
						})}`,
						`/books?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								languageList: searchFilter?.search?.languageList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				} else if (!searchFilter?.search?.languageList?.includes(value)) {
					await router.push(
						`/books?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, languageList: [...(searchFilter?.search?.languageList || []), value] },
						})}`,
						`/books?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, languageList: [...(searchFilter?.search?.languageList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.languageList?.length == 0) {
					await router.push(
						`/books?input=${JSON.stringify({
							...searchFilter
						})}`,
						`/books?input=${JSON.stringify({
							...searchFilter
						})}`,
						{ scroll: false },
					)
				}
			} catch (err: any) {
				console.log('ERROR, propertyTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const propertyTypeSelectHandler = useCallback(
		async (e: any) => {
			const value = e.target.innerText.toUpperCase();
			try {
				if (searchFilter?.search?.typeList?.includes(value)) {
					await router.push(
						`/books?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						`/books?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				} else {
					await router.push(
						`/books?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						`/books?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}
			} catch (err: any) {
				console.log('ERROR, propertyTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const refreshHandler = async () => {
		try {
			setSearchText('');
			await router.push(
				`/books?input=${JSON.stringify(initialInput)}`,
				`/books?input=${JSON.stringify(initialInput)}`,
				{ scroll: false },
			);
		} catch (err: any) {
			console.log('ERROR, refreshHandler:', err);
		}
	};


	if (device === 'mobile') {
		return <div>PROPERTIES FILTER</div>;
	} else {
		return (
			<Stack className={'filter-main'}>
				<Stack className={'find-your-book'}>
					<Typography variant={'h2'}>Search</Typography>
					<Box className={'divider'}>
						<Divider variant={'string'} sx={{width: '80px', marginRight: '5px', height: '7px', backgroundColor: '#42a5f5', borderRadius: '5px'}} textAlign={'left'} /> {/* Lighter blue */}
						<Divider variant={'string'} sx={{width: '30px', height: '7px', backgroundColor: '#42a5f5', borderRadius: '5px'}} textAlign={'left'} /> {/* Lighter blue */}
					</Box>
					<Stack className={'input-box'}>
						<Input
							value={searchText}
							disableUnderline={true} 
							sx={{
								padding: '5px 15px',
								width: "100%",
								borderRadius: '2px',
								backgroundColor: '#ffffff',
								marginBottom: '20px',
							}}
							placeholder={'Search Here...'}
							onChange={(e: any) => setSearchText(e.target.value)}
							onKeyDown={(event: any) => {
								if (event.key == 'Enter') {
									setSearchFilter({
										...searchFilter,
										search: { ...searchFilter.search, text: searchText },
									});
								}
							}}
							endAdornment={
								<Tooltip title="Search">
									<IconButton onClick={() => {
										setSearchFilter({
											...searchFilter,
											search: { ...searchFilter.search, text: searchText },
										});
									}}>
										<SearchIcon />
									</IconButton>
								</Tooltip>
							}
						/>
						<Tooltip title="Reset" sx={{top:'-10px'}}>
							<IconButton onClick={refreshHandler}>
								<RefreshIcon />
							</IconButton>
						</Tooltip>
					</Stack>
					<Button
					 	className={'filter-button'}
						sx={{
							width: '30%',
							padding: '10px',
							backgroundColor: '#42a5f5' // Lighter blue
						}}
						onClick={() => {
							setSearchFilter({
								...searchFilter,
								search: { ...searchFilter.search, text: searchText },
							});
						}}
					>
						Search
					</Button>
				</Stack>
				<Stack className={'find-your-book'}>
					<Typography variant={'h2'}>Languages</Typography>
					<Box className={'divider'}>
						<Divider variant={'string'} sx={{width: '80px', marginRight: '5px', height: '7px', backgroundColor: '#42a5f5', borderRadius: '5px'}} textAlign={'left'} /> {/* Lighter blue */}
						<Divider variant={'string'} sx={{width: '30px', height: '7px', backgroundColor: '#42a5f5', borderRadius: '5px'}} textAlign={'left'} /> {/* Lighter blue */}
					</Box>
					<CssVarsProvider>
						<Select
							multiple
							autoFocus={true}
							placeholder={'Select language'}
							onChange={propertyLanguageSelectHandler}
							renderValue={(selected: any) => (
								<Box sx={{ display: 'flex', gap: '0.25rem' }}>
								{selected.map((selectedOption: any) => (
									<Chip variant="soft" color="primary">
									{selectedOption.label}
									</Chip>
								))}
								</Box>
							)}
							sx={{ minWidth: '15rem' }}
							slotProps={{
								listbox: {
								sx: {
									width: '100%',
								},
								},
							}}
							size={'lg'}
							>
							<Option value="ENGLISH">English</Option>
							<Option value="KOREAN">Korean</Option>
							<Option value="UZBEK">Uzbek</Option>
						</Select>
					</CssVarsProvider>
				</Stack>
				<Stack className={'find-your-book'}>
					<Typography variant={'h2'}>Book Type</Typography>
					<Box className={'divider'}>
						<Divider variant={'string'} sx={{width: '80px', marginRight: '5px', height: '7px', backgroundColor: '#42a5f5', borderRadius: '5px'}} textAlign={'left'} /> {/* Lighter blue */}
						<Divider variant={'string'} sx={{width: '30px', height: '7px', backgroundColor: '#42a5f5', borderRadius: '5px'}} textAlign={'left'} /> {/* Lighter blue */}
					</Box>
					<CssVarsProvider>
						<Select
							multiple
							autoFocus={true}
							placeholder={'Select book type'}
							onChange={propertyTypeSelectHandler}
							renderValue={(selected: any) => (
								<Box sx={{ display: 'flex', gap: '0.25rem' }}>
								{selected.map((selectedOption: any) => (
									<Chip variant="soft" color="primary">
										{selectedOption.label}
									</Chip>
								))}
								</Box>
							)}
							sx={{ minWidth: '15rem' }}
							slotProps={{
								listbox: {
								sx: {
									width: '100%',
								},
								},
							}}
							size={'lg'}
							>
							<Option value="PAPERBACK">Paperback</Option>
							<Option value="HARDCOVER">Hardcover</Option>
							<Option value="FULL">Full</Option>
						</Select>
					</CssVarsProvider>
				</Stack>
				<Stack className={'find-your-book'}>
					<Typography variant={'h2'}>Filter By Price</Typography>
					<Box className={'divider'}>
						<Divider variant={'string'} sx={{width: '80px', marginRight: '5px', height: '7px', backgroundColor: '#42a5f5', borderRadius: '5px'}} textAlign={'left'} /> {/* Lighter blue */}
						<Divider variant={'string'} sx={{width: '30px', height: '7px', backgroundColor: '#42a5f5', borderRadius: '5px'}} textAlign={'left'} /> {/* Lighter blue */}
					</Box>
					<Slider
						step={10}
						aria-label={'Price: in $'}
						getAriaLabel={() => 'Minimum distance'}
						value={value1}
						valueLabelDisplay="auto"
						getAriaValueText={(value: number) => {return `${value}`;} }
						max={200}
						disableSwap={true}
						onChange={handleChange1}
					/>
					<Stack className={'filter-bottom'}>
						<Button
							className={'filter-button'}
							sx={{
								width: '30%',
								padding: '10px',
								backgroundColor: '#42a5f5' // Lighter blue
							}}
							onClick={() => {propertyPriceHandler(value1)}}
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
						<Divider variant={'string'} sx={{width: '80px', marginRight: '5px', height: '7px', backgroundColor: '#42a5f5', borderRadius: '5px'}} textAlign={'left'} /> {/* Lighter blue */}
						<Divider variant={'string'} sx={{width: '30px', height: '7px', backgroundColor: '#42a5f5', borderRadius: '5px'}} textAlign={'left'} /> {/* Lighter blue */}
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
							className={'filter-button'}
							sx={{
								width: '30%',
								padding: '10px',
								backgroundColor: '#42a5f5' // Lighter blue
							}}
							onClick={() => {propertyPagesHandler(val)}}
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
						<Divider variant={'string'} sx={{width: '80px', marginRight: '5px', height: '7px', backgroundColor: '#42a5f5', borderRadius: '5px'}} textAlign={'left'} /> {/* Lighter blue */}
						<Divider variant={'string'} sx={{width: '30px', height: '7px', backgroundColor: '#42a5f5', borderRadius: '5px'}} textAlign={'left'} /> {/* Lighter blue */}
					</Box>
					<Stack className={'category-name-box'}>
						{propertyCategory.map((category: string) => {
							return (
								<Box className={'category-name'}>
									<label htmlFor={category} style={{ cursor: 'pointer' }}>
										<Typography className="property-type">{category}</Typography>
									</label>
									<Checkbox
										id={category}
										className="property-checkbox"
										color="default"
										size="small"
										value={category}
										checked={(searchFilter?.search?.propertyCategory || []).includes(category as PropertyCategory)}
										onChange={propertyCategorySelectHandler} 
										icon={<TaskAltIcon className={'icon-default'} />} 
										checkedIcon={<TaskAltIcon className={'icon-checked'} />} 
									/>
								</Box>
							);
						})}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Filter;
function upperCase(innerText: any): any {
	throw new Error('Function not implemented.');
}

