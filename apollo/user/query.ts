import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const GET_AUTHORS = gql`
	query GetAuthors($input: AuthorsInquiry!) {
		getAuthors(input: $input) {
			list {
				_id
				memberType
				memberStatus
				memberAuthType
				memberPhone
				memberNick
				memberFullName
				memberImage
				memberAddress
				memberDesc
				memberProperties
				memberArticles
				memberFollowers
				memberFollowings
				memberPoints
				memberLikes
				memberViews
				memberComments
				memberRank
				memberWarnings
				memberBlocks
				memberMembership
				deletedAt
				createdAt
				updatedAt
				accessToken
				meLiked {
					memberId
					likeRefId
					myFavorite
				}
				meFollowed {
					followingId
					followerId
					myFollowing
				}
			}
			metaCounter {
				total
			}
		}
	}
`;

export const GET_MEMBER = gql(`
query GetMember($input: String!) {
    getMember(memberId: $input) {
        _id
        memberType
        memberStatus
        memberAuthType
        memberPhone
        memberNick
        memberFullName
        memberImage
        memberAddress
        memberDesc
        memberProperties
        memberArticles
        memberPoints
        memberLikes
        memberViews
        memberFollowings
		memberFollowers
        memberRank
        memberWarnings
        memberBlocks
		memberMembership
        deletedAt
        createdAt
        updatedAt
        accessToken
        meFollowed {
					followingId
					followerId
					myFollowing
				}
    }
}
`);

/**************************
 *        PROPERTY        *
 *************************/

export const GET_PROPERTY = gql`
	query GetProperty($input: String!) {
		getProperty(propertyId: $input) {
			_id
			propertyStatus
			propertyCategory
			propertyTitle
			propertyPrice
			propertyAuthor
			propertyPages
			isbn
			propertyViews
			propertyLikes
			propertyComments
			propertyRank
			propertyDownloads
			propertyImages
			propertyLanguages
			propertyDesc
			propertyFile
			propertyAudio
			memberId
			deletedAt
			publicationDate
			createdAt
			updatedAt
			propertyType
			memberData {
				_id
				memberType
				memberStatus
				memberAuthType
				memberPhone
				memberNick
				memberFullName
				memberImage
				memberAddress
				memberDesc
				memberProperties
				memberArticles
				memberFollowers
				memberFollowings
				memberPoints
				memberLikes
				memberViews
				memberComments
				memberRank
				memberWarnings
				memberBlocks
				memberMembership
				deletedAt
				createdAt
				updatedAt
				accessToken
			}
			meLiked {
				memberId
				likeRefId
				myFavorite
			}
		}
	}
`;

export const GET_PROPERTIES = gql`
	query GetProperties($input: PropertiesInquiry!) {
		getProperties(input: $input) {
			list {
				_id
				propertyStatus
				propertyCategory
				propertyTitle
				propertyPrice
				propertyAuthor
				propertyPages
				isbn
				propertyViews
				propertyLikes
				propertyComments
				propertyRank
				propertyDownloads
				propertyImages
				propertyLanguages
				propertyDesc
				propertyFile
				propertyAudio
				memberId
				deletedAt
				publicationDate
				createdAt
				updatedAt
				propertyType
				memberData {
					_id
					memberType
					memberStatus
					memberAuthType
					memberPhone
					memberNick
					memberFullName
					memberImage
					memberAddress
					memberDesc
					memberProperties
					memberArticles
					memberFollowers
					memberFollowings
					memberPoints
					memberLikes
					memberViews
					memberComments
					memberRank
					memberWarnings
					memberBlocks
					memberMembership
					deletedAt
					createdAt
					updatedAt
					accessToken
				}
				meLiked {
					memberId
					likeRefId
					myFavorite
				}
			}
			metaCounter {
				total
			}
		}
	}
`;

export const GET_AGENT_PROPERTIES = gql`
	query GetAuthorProperties($input: AuthorPropertiesInquiry!) {
		getAuthorProperties(input: $input) {
			list {
				_id
				propertyStatus
				propertyCategory
				propertyTitle
				propertyPrice
				propertyAuthor
				propertyPages
				isbn
				propertyViews
				propertyLikes
				propertyComments
				propertyRank
				propertyDownloads
				propertyImages
				propertyLanguages
				propertyDesc
				propertyFile
				propertyAudio
				memberId
				deletedAt
				publicationDate
				createdAt
				updatedAt
				propertyType
				memberData {
					_id
					memberType
					memberStatus
					memberAuthType
					memberPhone
					memberNick
					memberFullName
					memberImage
					memberAddress
					memberDesc
					memberProperties
					memberArticles
					memberFollowers
					memberFollowings
					memberPoints
					memberLikes
					memberViews
					memberComments
					memberRank
					memberWarnings
					memberBlocks
					memberMembership
					deletedAt
					createdAt
					updatedAt
					accessToken
				}
				meLiked {
					memberId
					likeRefId
					myFavorite
				}
			}
			metaCounter {
				total
			}
		}
	}
`;

export const GET_FAVORITES = gql`
	query GetFavorites($input: OrdinaryInquiry!) {
		getFavorites(input: $input) {
			list {
				_id
				propertyStatus
				propertyCategory
				propertyTitle
				propertyPrice
				propertyAuthor
				propertyPages
				isbn
				propertyViews
				propertyLikes
				propertyComments
				propertyRank
				propertyDownloads
				propertyImages
				propertyLanguages
				propertyDesc
				propertyFile
				propertyAudio
				memberId
				deletedAt
				publicationDate
				createdAt
				updatedAt
				memberData {
					_id
					memberType
					memberStatus
					memberAuthType
					memberPhone
					memberNick
					memberFullName
					memberImage
					memberAddress
					memberDesc
					memberProperties
					memberArticles
					memberFollowers
					memberFollowings
					memberPoints
					memberLikes
					memberViews
					memberComments
					memberRank
					memberWarnings
					memberBlocks
					memberMembership
					deletedAt
					createdAt
					updatedAt
					accessToken
				}
				meLiked {
					memberId
					likeRefId
					myFavorite
				}
				propertyType
			}
			metaCounter {
				total
			}
		}
	}
`;

export const GET_VISITED = gql`
	query GetVisited($input: OrdinaryInquiry!) {
		getVisited(input: $input) {
			list {
				_id
				propertyStatus
				propertyCategory
				propertyTitle
				propertyPrice
				propertyAuthor
				propertyPages
				isbn
				propertyViews
				propertyLikes
				propertyComments
				propertyRank
				propertyDownloads
				propertyImages
				propertyLanguages
				propertyDesc
				propertyFile
				propertyAudio
				memberId
				deletedAt
				publicationDate
				createdAt
				updatedAt
				propertyType
				memberData {
					_id
					memberType
					memberStatus
					memberAuthType
					memberPhone
					memberNick
					memberFullName
					memberImage
					memberAddress
					memberDesc
					memberProperties
					memberArticles
					memberFollowers
					memberFollowings
					memberPoints
					memberLikes
					memberViews
					memberComments
					memberRank
					memberWarnings
					memberBlocks
					memberMembership
					deletedAt
					createdAt
					updatedAt
					accessToken
				}
				meLiked {
					memberId
					likeRefId
					myFavorite
				}
			}
			metaCounter {
				total
			}
		}
	}
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const GET_BOARD_ARTICLE = gql`
	query GetBoardArticle($input: String!) {
		getBoardArticle(articleId: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			articleComments
			memberId
			createdAt
			updatedAt
			memberData {
				_id
				memberType
				memberStatus
				memberAuthType
				memberPhone
				memberNick
				memberFullName
				memberImage
				memberAddress
				memberDesc
				memberWarnings
				memberBlocks
				memberProperties
				memberRank
				memberPoints
				memberLikes
				memberViews
				memberMembership
				deletedAt
				createdAt
				updatedAt
			}
			meLiked {
				memberId
				likeRefId
				myFavorite
			}
		}
	}
`;

export const GET_BOARD_ARTICLES = gql`
	query GetBoardArticles($input: BoardArticlesInquiry!) {
		getBoardArticles(input: $input) {
			list {
				_id
				articleCategory
				articleStatus
				articleTitle
				articleContent
				articleImage
				articleViews
				articleLikes
				articleComments
				memberId
				createdAt
				updatedAt
				meLiked {
					memberId
					likeRefId
					myFavorite
				}
				memberData {
					_id
					memberType
					memberStatus
					memberAuthType
					memberPhone
					memberNick
					memberFullName
					memberImage
					memberAddress
					memberDesc
					memberWarnings
					memberBlocks
					memberProperties
					memberRank
					memberPoints
					memberLikes
					memberViews
					memberMembership
					deletedAt
					createdAt
					updatedAt
				}
			}
			metaCounter {
				total
			}
		}
	}
`;

/**************************
 *         COMMENT        *
 *************************/

export const GET_COMMENTS = gql`
	query GetComments($input: CommentsInquiry!) {
		getComments(input: $input) {
			list {
				_id
				commentStatus
				commentGroup
				commentContent
				commentRefId
				memberId
				createdAt
				updatedAt
				memberData {
					_id
					memberType
					memberStatus
					memberAuthType
					memberPhone
					memberNick
					memberFullName
					memberImage
					memberAddress
					memberDesc
					memberWarnings
					memberBlocks
					memberProperties
					memberRank
					memberPoints
					memberLikes
					memberViews
					memberMembership
					deletedAt
					createdAt
					updatedAt
					accessToken
				}
			}
			metaCounter {
				total
			}
		}
	}
`;

/**************************
 *         FOLLOW        *
 *************************/
export const GET_MEMBER_FOLLOWERS = gql`
	query GetMemberFollowers($input: FollowInquiry!) {
		getMemberFollowers(input: $input) {
			list {
				_id
				followingId
				followerId
				createdAt
				updatedAt
				meLiked {
					memberId
					likeRefId
					myFavorite
				}
				meFollowed {
					followingId
					followerId
					myFollowing
				}
				followerData {
					_id
					memberType
					memberStatus
					memberAuthType
					memberPhone
					memberNick
					memberFullName
					memberImage
					memberAddress
					memberDesc
					memberProperties
					memberArticles
					memberPoints
					memberLikes
					memberViews
					memberComments
					memberFollowings
					memberFollowers
					memberRank
					memberWarnings
					memberBlocks
					memberMembership
					deletedAt
					createdAt
					updatedAt
				}
			}
			metaCounter {
				total
			}
		}
	}
`;

export const GET_MEMBER_FOLLOWINGS = gql`
	query GetMemberFollowings($input: FollowInquiry!) {
		getMemberFollowings(input: $input) {
			list {
				_id
				followingId
				followerId
				createdAt
				updatedAt
				followingData {
					_id
					memberType
					memberStatus
					memberAuthType
					memberPhone
					memberNick
					memberFullName
					memberImage
					memberAddress
					memberDesc
					memberProperties
					memberArticles
					memberPoints
					memberLikes
					memberViews
					memberComments
					memberFollowings
					memberFollowers
					memberRank
					memberWarnings
					memberBlocks
					memberMembership
					deletedAt
					createdAt
					updatedAt
					accessToken
				}
				meLiked {
					memberId
					likeRefId
					myFavorite
				}
				meFollowed {
					followingId
					followerId
					myFollowing
				}
			}
			metaCounter {
				total
			}
		}
	}
`;

/**************************
 *         NOTIFICATIONS       *
 *************************/

export const GET_NOTIFICATION = gql`
	query GetNotification($input: String!) {
		getNotification(notificationId: $input) {
			_id
			notificationType
			notificationStatus
			notificationGroup
			notificationTitle
			notificationDesc
			authorId
			receiverId
			propertyId
			articleId
			createdAt
			updatedAt
			memberData {
				_id
				memberType
				memberStatus
				memberAuthType
				memberPhone
				memberNick
				memberFullName
				memberImage
				memberAddress
				memberDesc
				memberProperties
				memberArticles
				memberFollowers
				memberFollowings
				memberPoints
				memberLikes
				memberViews
				memberComments
				memberRank
				memberWarnings
				memberBlocks
				memberMembership
				deletedAt
				createdAt
				updatedAt
				accessToken
			}
		}
	}
`;

export const GET_NOTIFICATIONS = gql`
	query GetNotifications($input: NotificationsInquiry!) {
		getNotifications(input: $input) {
			list {
				_id
				notificationType
				notificationStatus
				notificationGroup
				notificationTitle
				notificationDesc
				authorId
				receiverId
				propertyId
				articleId
				createdAt
				updatedAt
				memberData {
					_id
					memberType
					memberStatus
					memberAuthType
					memberPhone
					memberNick
					memberFullName
					memberImage
					memberAddress
					memberDesc
					memberProperties
					memberArticles
					memberFollowers
					memberFollowings
					memberPoints
					memberLikes
					memberViews
					memberComments
					memberRank
					memberWarnings
					memberBlocks
					memberMembership
					deletedAt
					createdAt
					updatedAt
					accessToken
				}
				propertyData {
					_id
					propertyStatus
					propertyCategory
					propertyType
					propertyTitle
					propertyPrice
					propertyAuthor
					propertyPages
					isbn
					propertyViews
					propertyLikes
					propertyComments
					propertyRank
					propertyDownloads
					propertyImages
					propertyLanguages
					propertyDesc
					propertyFile
					propertyAudio
					memberId
					deletedAt
					publicationDate
					createdAt
					updatedAt
				}
				articleData {
					_id
					articleCategory
					articleStatus
					articleTitle
					articleContent
					articleImage
					articleViews
					articleLikes
					articleComments
					memberId
					createdAt
					updatedAt
				}
			}
			metaCounter {
				total
			}
		}
	}
`;



/**************************
 *         NOTICES       *
 *************************/

export const GET_NOTICES = gql`
	query GetNotices($input: NoticeInquiry!) {
		getNotices(input: $input) {
			list {
				_id
				noticeCategory
				noticeStatus
				noticeTitle
				noticeContent
				memberId
				createdAt
				updatedAt
				memberData {
					_id
					memberType
					memberStatus
					memberAuthType
					memberPhone
					memberNick
					memberFullName
					memberImage
					memberAddress
					memberDesc
					memberProperties
					memberArticles
					memberFollowers
					memberFollowings
					memberPoints
					memberLikes
					memberViews
					memberComments
					memberRank
					memberWarnings
					memberBlocks
					memberMembership
					deletedAt
					createdAt
					updatedAt
					accessToken
				}
			}
			metaCounter {
				total
			}
		}
	}
`

/**************************
 *         DOWNLOADER       *
 *************************/

export const DOWNLOAD_FILE = gql`
	query DownloadFile($input: DownloadInquiryInput!) {
		downloadFile(input: $input)
	}
`

/**************************
 *         ORDER        *
 *************************/

export const GET_ORDER = gql`
	query GetOrder($input: String!) {
		getOrder(orderId: $input) {
			_id
			orderStatus
			paymentStatus
			orderNumber
			totalAmount
			memberId
			paymentMethod
			paymentId
			paymentIntentId
			transactionId
			notes
			completedAt
			cancelledAt
			createdAt
			updatedAt
			items {
				propertyId
				propertyTitle
				propertyPrice
				quantity
				propertyData {
					_id
					propertyTitle
					propertyImages
					propertyAuthor
				}
			}
			shippingAddress {
				fullName
				address
				city
				postalCode
				country
			}
			memberData {
				_id
				memberType
				memberStatus
				memberAuthType
				memberPhone
				memberNick
				memberMembership
				memberFullName
				memberImage
				memberAddress
				memberDesc
				memberProperties
				memberArticles
				memberFollowers
				memberFollowings
				memberPoints
				memberLikes
				memberViews
				memberComments
				memberRank
				memberWarnings
				memberBlocks
				deletedAt
				createdAt
				updatedAt
				accessToken
			}
		}
	}
`;

export const GET_ORDERS = gql`
	query GetOrders($input: OrdersInquiry!) {
		getOrders(input: $input) {
			list {
				_id
				orderStatus
				paymentStatus
				orderNumber
				totalAmount
				memberId
				paymentMethod
				paymentId
				paymentIntentId
				transactionId
				notes
				completedAt
				cancelledAt
				createdAt
				updatedAt
				items {
					propertyId
					propertyTitle
					propertyPrice
					quantity
					propertyData {
						_id
						propertyTitle
						propertyImages
						propertyAuthor
					}
				}
				shippingAddress {
					fullName
					address
					city
					postalCode
					country
				}
				memberData {
					_id
					memberType
					memberStatus
					memberAuthType
					memberPhone
					memberNick
					memberMembership
					memberFullName
					memberImage
					memberAddress
					memberDesc
					memberProperties
					memberArticles
					memberFollowers
					memberFollowings
					memberPoints
					memberLikes
					memberViews
					memberComments
					memberRank
					memberWarnings
					memberBlocks
					deletedAt
					createdAt
					updatedAt
					accessToken
				}
			}
			metaCounter {
				total
			}
		}
	}
`;
