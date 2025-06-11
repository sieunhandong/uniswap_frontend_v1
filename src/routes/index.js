import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import NotfoundPage from "../pages/NotfuondPage/NotfoundPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import MyOrderPage from "../pages/MyOrderPage/MyOrderPage";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";
import PostCreate from "../pages/PostCreate/PostCreate";
import MyPosts from "../pages/MyPostPage/MyPostPage";
import DetailPostPage from "../pages/DetailPostPage/DetailPostPage";
import ModerationPage from "../pages/ModerationPage/ModerationPage";
import WalletPage from "../pages/WalletPage/WalletPage";
import UserDepositPage from "../pages/DespositRequestModel/DespositRequest";
import DepositRequestsPage from "../pages/DespositAdmin/DespositAdmin";
import TransactionHistoryPage from "../pages/TransactionHistoryPage/TransactionHistoryPage";
import WalletDashboard from "../pages/WalletDashboard/WalletDashboard";
import PostDetailsPage from "../pages/PostDetailsPage/PostDetailsPage";
import ChatPage from "../pages/ChatPage/ChatPage";
import ConversationsPage from "../pages/ConversationsPage/ConversationsPage";
import AdvertisementRequestPage from "../pages/AdvertisementRequestPage/AdvertisementRequestPage";
import AdvertisementAdminPage from "../pages/AdvertisementAdminPage/AdvertisementAdminPage";
import MyAdvertisements from "../pages/MyAdvertisementsPage/MyAdvertisementsPage";
import NotificationPage from "../pages/Notification/Notification";
import PaymentDetailPage from "../pages/PaymentDetailPage/PaymentDetailPage";
import RatingPage from "../pages/RatingPage/RatingPage";
export const routes = [
    {
        path: "/",
        page: HomePage,
        isShowHeader: true
    },
    {
        path: "/order",
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: "/my-order",
        page: MyOrderPage,
        isShowHeader: true
    },
    {
        path: "/details-order/:id",
        page: DetailsOrderPage,
        isShowHeader: true
    },
    {
        path: "/payment",
        page: PaymentPage,
        isShowHeader: true
    },
    {
        path: "/order-success",
        page: OrderSuccess,
        isShowHeader: true
    },
    {
        path: "/products",
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: "product/:type",
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: "/sign-in",
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: "/sign-up",
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: "/post-details/:id",
        page: PostDetailsPage,
        isShowHeader: true
    },
    {
        path: "/chat/:receiverId",
        page: ChatPage,
        isShowHeader: true,
    },
    {
        path: "/conversations",
        page: ConversationsPage,
        isShowHeader: true,
    },
    {
        path: "/profile-user",
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: "/system/admin",
        page: AdminPage,
        isShowHeader: false,
        // isPrivate: true
    },
    {
        path: '*',
        page: NotfoundPage
    },
    {
        path: '/post-create',
        page: PostCreate,
        isShowHeader: true,
    },
    {
        path: '/post-edit/:postId',
        page: PostCreate,
        isShowHeader: true,
    },
    {
        path: '/my-post',
        page: MyPosts,
        isShowHeader: true,

    },
    {
        path: '/detail-post/:postId',
        page: DetailPostPage
    },
    {
        path: '/moderation',
        page: ModerationPage
    },
    {
        path: '/wallet',
        page: WalletPage,
        isShowHeader: true,

    },
    {
        path: '/desposit',
        page: UserDepositPage,
        isShowHeader: true,

    },
    {
        path: '/despositAdmin',
        page: DepositRequestsPage,
        isShowHeader: true,

    },
    {
        path: '/transactionHistory',
        page: TransactionHistoryPage,
        isShowHeader: true,

    },
    {
        path: '/walletdashboard',
        page: WalletDashboard
    },
    {
        path: '/notification',
        page: NotificationPage,
        isShowHeader: true,
    },
    {
        path: '/paymentDetail/:id',
        page: PaymentDetailPage,
        isShowHeader: true,
    },
    {
        path: '/advertisement-request',
        page: AdvertisementRequestPage,
        isShowHeader: true,
    },
    {
        path: '/advertisement-admin',
        page: AdvertisementAdminPage,
        isShowHeader: true,
    },
    {
        path: '/my-advertisement',
        page: MyAdvertisements,
        isShowHeader: true,
    },
    {
        path: '/rating',
        page: RatingPage,
        isShowHeader: true,
    },
]