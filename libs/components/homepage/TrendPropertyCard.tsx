import React from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Property } from '../../types/property/property';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { CssVarsProvider } from '@mui/joy/styles';
import { NEXT_PUBLIC_REACT_APP_API_URL } from '../../config';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { addToCart } from '../../utils/cart';

interface TrendPropertyCardProps {
	property: Property;
	likePropertyHandler: any;
}

const TrendPropertyCard = (props: TrendPropertyCardProps) => {
	const { property, likePropertyHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const pushDetailHandler = async (propertyId: string) => {
		await router.push({pathname: '/books/detail', query: {id: propertyId}});
	};

	const handleAddToCart = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (property) {
			addToCart(property, 1);
		}
	};

	if (device === 'mobile') {
		return (
			<CssVarsProvider>
				<Stack className="trend-card-box-mobile">
					<Box className={'card-image-wrapper'} onClick={() => pushDetailHandler(property?._id)}>
						<img
							className={'card-image'}
							src={`${NEXT_PUBLIC_REACT_APP_API_URL}/${property?.propertyImages[0]}`}
							loading="lazy"
							alt={property?.propertyTitle || 'Book cover'}
						/>
						<Box className={'image-overlay'}>
							<Box className={'action-buttons'}>
								<Box 
									className={'action-btn'} 
									onClick={(e: React.MouseEvent) => {
										e.stopPropagation();
										likePropertyHandler(user?._id, property?._id);
									}}
								>
									{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
										<FavoriteIcon style={{ color: '#e74c3c', fontSize: '18px' }} />
									) : (
										<FavoriteBorderIcon style={{ fontSize: '18px' }} />
									)}
									<span>{property?.propertyLikes || 0}</span>
								</Box>
							</Box>
						</Box>
					</Box>
					<Box className={'card-info'}>
						<Box className={'book-title'} onClick={(e: React.MouseEvent) => {
							e.stopPropagation();
							pushDetailHandler(property?._id);
						}}>
							{property?.propertyTitle || 'Untitled'}
						</Box>
						<Box className={'book-author'}>
							By {property?.propertyAuthor || 'Unknown'}
						</Box>
						<Box className={'book-rating'}>
							<StarIcon style={{ fontSize: '16px', color: '#ffc107' }} />
							<span>4.{Math.floor(Math.random() * 9)}</span>
							<span className={'reviews'}>({property?.propertyComments || 0} reviews)</span>
						</Box>
						<Box className={'book-footer'}>
							<span className={'book-format'}>{property?.propertyCategory || 'Paperback'}</span>
							<span className={'book-price'}>${property?.propertyPrice || '0.00'}</span>
						</Box>
					</Box>
				</Stack>
			</CssVarsProvider>
		);
	} else {
		return (
			<CssVarsProvider>
				<Stack className="trend-card-box" onClick={() => pushDetailHandler(property?._id)}>
					<Box className={'card-image-wrapper'}>
						<img
							className={'card-image'}
							src={`${NEXT_PUBLIC_REACT_APP_API_URL}/${property?.propertyImages[0]}`}
							loading="lazy"
							alt={property?.propertyTitle || 'Book cover'}
						/>
						<Box className={'image-overlay'}>
							<Box className={'action-buttons'}>
								<Box 
									className={'action-btn'} 
									onClick={(e: React.MouseEvent) => {
										e.stopPropagation();
										likePropertyHandler(user?._id, property?._id);
									}}
								>
									{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
										<FavoriteIcon style={{ color: '#e74c3c', fontSize: '18px' }} />
									) : (
										<FavoriteBorderIcon style={{ fontSize: '18px' }} />
									)}
									<span>{property?.propertyLikes || 0}</span>
								</Box>
								<Box className={'action-btn'} onClick={handleAddToCart}>
									<ShoppingCartIcon style={{ fontSize: '18px' }} />
								</Box>
							</Box>
						</Box>
					</Box>
					<Box className={'card-info'}>
						<Box className={'book-title'} onClick={(e: React.MouseEvent) => {
							e.stopPropagation();
							pushDetailHandler(property?._id);
						}}>
							{property?.propertyTitle || 'Untitled'}
						</Box>
						<Box className={'book-author'}>
							By {property?.propertyAuthor || 'Unknown'}
						</Box>
						<Box className={'book-rating'}>
							<StarIcon style={{ fontSize: '16px', color: '#ffc107' }} />
							<span>4.{Math.floor(Math.random() * 9)}</span>
							<span className={'reviews'}>({property?.propertyComments || 0} reviews)</span>
						</Box>
						<Box className={'book-footer'}>
							<span className={'book-format'}>{property?.propertyCategory || 'Paperback'}</span>
							<span className={'book-price'}>${property?.propertyPrice || '0.00'}</span>
						</Box>
					</Box>
				</Stack>
			</CssVarsProvider>
		);
	}
};

export default TrendPropertyCard;
