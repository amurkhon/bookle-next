import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Link from 'next/link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Star from '@mui/icons-material/Star';
import { Button, CssVarsProvider } from '@mui/joy';
import { Property } from '../../types/property/property';
import { NEXT_PUBLIC_REACT_APP_API_URL, topPropertyRank } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

type ColumnCardProps = {
  property: Property;
  likePropertyHandler?: any;
  myFavorites?: boolean;
	// recentlyVisited?: boolean;
};

export default function ColumnPropertyCard(props: ColumnCardProps) {
  const { property, likePropertyHandler, myFavorites } = props;
  const [isLiked, setIsLiked] = React.useState(true);
  const user = useReactiveVar(userVar);
  const imagePath: string = property?.propertyImages[0]
      ? `${NEXT_PUBLIC_REACT_APP_API_URL}/${property?.propertyImages[0]}`
      : '/img/banner/header1.svg';
  return (
    <CssVarsProvider>
      <Card
        className={'horizontal-card'}
        variant="outlined"
        orientation="horizontal"
        sx={{
          width: "100%",
          marginTop: "10px",
          bgcolor: 'neutral.softBg',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          '&:hover': {
            boxShadow: 'lg',
            borderColor: 'var(--joy-palette-neutral-outlinedDisabledBorder)',
          },
        }}
      >
        <CardOverflow
          className={'cardoverflow'}
          sx={{
            mr: { xs: 'var(--CardOverflow-offset)', sm: 0 },
            mb: { xs: 0, sm: 'var(--CardOverflow-offset)' },
            '--AspectRatio-radius': {
              xs: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0',
              sm: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0 calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px))',
            },
          }}
        >
          <Link
						href={{
							pathname: '/books/detail',
							query: {id: property?._id},
						}}
					>
						<img src={imagePath} alt="" />
					</Link>
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                width: '100%',
                p: 1,
              }}
            >
              {property && property?.propertyRank > topPropertyRank && (
                <Chip
                  sx={{position: 'absolute', top: '25px'}}
                  variant="soft"
                  color="success"
                  startDecorator={<WorkspacePremiumRoundedIcon />}
                  size="md"
                >
                  Top
                </Chip>
              )}
            </Stack>
        </CardOverflow>
        <CardContent>
          <Stack
            spacing={1}
            direction="row"
            sx={{ justifyContent: 'flex', alignItems: 'center' }}
          >
            <div style={{flexGrow: '4'}}>
              <Typography level="title-md" sx={{ color: 'text.primary' }}>
                {property?.propertyTitle}
              </Typography>
              <Typography level="body-sm">{property?.propertyCategory}</Typography>
            </div>
            <IconButton 
              variant='plain' 
              size='sm' 
              color={'default'} 
              onClick={() => likePropertyHandler(user, property?._id)}
            >
              {myFavorites ? (
                  <FavoriteIcon color="danger" />
                ) : property?.meLiked && property?.meLiked[0]?.myFavorite ? (
                  <FavoriteIcon color="danger" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              <Typography className="view-cnt">{property?.propertyLikes}</Typography>
            <IconButton
              variant="plain"
              size="sm"
              sx={{ borderRadius: '50%' }}
            >
              <VisibilityIcon />
            </IconButton>
            <Typography className="view-cnt">{property?.propertyViews}</Typography>
            <IconButton
              variant="plain"
              size="sm"
              sx={{ borderRadius: '50%' }}
            >
              <CommentIcon />
            </IconButton>
            <Typography className="view-cnt">{property?.propertyComments}</Typography>
          </Stack>
          <Stack
            spacing="0.25rem 1rem"
            direction="row"
            useFlexGap
            sx={{ flexWrap: 'wrap', my: 0.25 }}
          >
            <Typography level="body-xs">
              by {property?.propertyAuthor} (Author)
            </Typography>
          </Stack>
          <Stack>
            <Typography>
              {property?.propertyDesc && property?.propertyDesc.length >= 400 ? `${property?.propertyDesc.slice(0, 396)}...` : property?.propertyDesc }
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ slefAlign: 'flex-end' }}>
            <Typography
              level="title-sm"
              startDecorator={
                <React.Fragment>
                  <Star sx={{ color: 'warning.400' }} />
                  <Star sx={{ color: 'warning.400' }} />
                  <Star sx={{ color: 'warning.400' }} />
                  <Star sx={{ color: 'warning.400' }} />
                  <Star sx={{ color: 'warning.200' }} />
                </React.Fragment>
              }
              sx={{ display: 'flex', gap: 1 }}
            >
              4.0
            </Typography>
            <Typography level="title-lg" sx={{ flexGrow: 1, textAlign: 'right' }}>
              <strong>$20</strong>
              <Typography level="body-md">
                <Link
                  href={{
                    pathname: '/books/detail',
                    query: {id: property?._id},
                  }}
                >
                  <Button 
                    variant='outlined' 
                    color='success' 
                    style={{marginLeft: "10px"}}
                  >
                    Buy
                  </Button>
                </Link>
              </Typography>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </CssVarsProvider>
  );
}