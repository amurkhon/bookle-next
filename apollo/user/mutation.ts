import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const SIGN_UP = gql`
	mutation Signup($input: MemberInput!) {
		signup(input: $input) {
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
			memberArticles
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
`;

export const LOGIN = gql`
	mutation Login($input: LoginInput!) {
		login(input: $input) {
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
`;

export const UPDATE_MEMBER = gql`
	mutation UpdateMember($input: MemberUpdate!) {
		updateMember(input: $input) {
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
			memberRank
			memberArticles
			memberPoints
			memberLikes
			memberViews
			memberWarnings
			memberBlocks
			memberMembership
			deletedAt
			createdAt
			updatedAt
			accessToken
		}
	}
`;

export const LIKE_TARGET_MEMBER = gql`
	mutation LikeTargetMember($input: String!) {
		likeTargetMember(memberId: $input) {
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
`;

/**************************
 *        PROPERTY        *
 *************************/

export const CREATE_PROPERTY = gql`
	mutation CreateProperty($input: PropertyInput!) {
		createProperty(input: $input) {
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
		}
	}
`;

export const UPDATE_PROPERTY = gql`
	mutation UpdateProperty($input: PropertyUpdate!) {
		updateProperty(input: $input) {
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
		}
	}
`;

export const LIKE_TARGET_PROPERTY = gql`
	mutation LikeTargetProperty($input: String!) {
		likeTargetProperty(propertyId: $input) {
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
		}
	}
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const CREATE_BOARD_ARTICLE = gql`
	mutation CreateBoardArticle($input: BoardArticleInput!) {
		createBoardArticle(input: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const UPDATE_BOARD_ARTICLE = gql`
	mutation UpdateBoardArticle($input: BoardArticleUpdate!) {
		updateBoardArticle(input: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const LIKE_TARGET_BOARD_ARTICLE = gql`
	mutation LikeTargetBoardArticle($input: String!) {
		likeTargetBoardArticle(articleId: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			memberId
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *         COMMENT        *
 *************************/

export const CREATE_COMMENT = gql`
	mutation CreateComment($input: CommentInput!) {
		createComment(input: $input) {
			_id
			commentStatus
			commentGroup
			commentContent
			commentRefId
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const UPDATE_COMMENT = gql`
	mutation UpdateComment($input: CommentUpdate!) {
		updateComment(input: $input) {
			_id
			commentStatus
			commentGroup
			commentContent
			commentRefId
			memberId
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *         FOLLOW        *
 *************************/

export const SUBSCRIBE = gql`
	mutation Subscribe($input: String!) {
		subscribe(input: $input) {
			_id
			followingId
			followerId
			createdAt
			updatedAt
		}
	}
`;

export const UNSUBSCRIBE = gql`
	mutation Unsubscribe($input: String!) {
		unsubscribe(input: $input) {
			_id
			followingId
			followerId
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *         NOTIFICATION        *
 *************************/

export const UPDATE_NOTIFICATIONS_AS_READ = gql`
	mutation UpdateNotificationsAsRead($input: NotificationsInquiry!) {
		updateNotificationsAsRead(input: $input) {
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
		}
	}
`;

/**************************
 *         NOTICE        *
 *************************/


export const CREATE_NOTICE = gql`
mutation CreateNotice($input: NoticeInput!) {
    createNotice(input: $input) {
        noticeCategory
        noticeStatus
        noticeTitle
        noticeContent
        memberId
    }
}`;

export const UPDATE_NOTICE = gql`
	mutation UpdateNotice($input: UpdateNotice!) {
		updateNotice(input: $input) {
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
				memberMembership
				memberBlocks
				deletedAt
				createdAt
				updatedAt
				accessToken
			}
		}
	}
`;

/**************************
 *         OPENAI       *
 *************************/

export const GET_CHATBOT_ANSWEAR = gql`
	mutation GenerateResponse2($input: OpenAIRequestDto!) {
		generateResponse(input: $input) {
			role
			content
			refusal
			annotations
		}
	}
`;

/**************************
 *         ORDER        *
 *************************/

export const CREATE_ORDER = gql`
	mutation CreateOrder($input: CreateOrderInput!) {
		createOrder(input: $input) {
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

export const UPDATE_ORDER = gql`
	mutation ConfirmPayment($input: ConfirmPaymentInput!) {
		confirmPayment(input: $input) {
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

export const CANCEL_ORDER = gql`
	mutation CancelOrder ($input: String!) {
		cancelOrder(orderId: $input) {
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