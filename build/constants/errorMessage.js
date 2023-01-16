"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGES = exports.INVALID_TOKEN = exports.INVALID_EMAIL = exports.INVALID_REGISTRATION_TOKEN = exports.PAYJP_INVALID_CARD = exports.EMAIL_NOT_MATCH = exports.PASSWORD_NOT_MATCH = exports.RESERVATION_ALREADY_EXIST = exports.DISABLE_DATE_EXIST = exports.PRODUCT_NOT_EXIST = exports.NOT_ABLE_TO_CANCEL_RESERVATION = exports.NOT_ENOUGH_POINT = exports.PAYMENT_NOT_EXIST = exports.CUSTOMER_ALREADY_EXIST = exports.CUSTOMER_NOT_EXIST = exports.USER_NOT_EXIST = exports.RESERVATION_NOT_EXIST = exports.DISABLE_DATE_NOT_EXIST = exports.SALON_NOT_EXIST = exports.BOOTH_NAME_EXIST = exports.INVALID_ACCESS = exports.INVALID_BOOTH_ID = exports.INVALID_ADMIN_ID = exports.INVALID_SALON_ID = exports.EMAIL_NOT_FOUND = exports.EMAIL_EXIST = exports.BOOTH_NOT_EXIST = exports.ADMIN_NOT_FOUND = exports.NOT_ACCESS_ALLOWED = exports.INVALID_JWT_TOKEN = exports.INVALID_RESET_TOKEN = exports.RESET_TOKEN_ALREADY_USED = exports.RESET_TOKEN_NOT_FOUND = exports.DATAEXCEED = exports.USERNOTACTIVATE = exports.BADIMPLEMENTATION = exports.PAGENOTFOUND = exports.DATANOTFOUND = exports.CONFLICT = exports.ADMIN_APPLYING = exports.UNAUTH = exports.VALIDATION = void 0;
exports.VALIDATION = 'Invalid format';
exports.UNAUTH = '認証に失敗しました。';
exports.ADMIN_APPLYING = '現在審査中です。\nお待ちください。';
exports.CONFLICT = 'Conflict';
exports.DATANOTFOUND = 'Data not found';
exports.PAGENOTFOUND = 'Page not found';
exports.BADIMPLEMENTATION = 'サーバー内でエラーが起きました。';
exports.USERNOTACTIVATE = 'User does not activate yet';
exports.DATAEXCEED = 'You exceed the limit.';
exports.RESET_TOKEN_NOT_FOUND = 'トークンが存在しません。';
exports.RESET_TOKEN_ALREADY_USED = 'トークンが既に使われています。';
exports.INVALID_RESET_TOKEN = '利用できないトークンです。';
exports.INVALID_JWT_TOKEN = 'JWTトークンが不正です。';
exports.NOT_ACCESS_ALLOWED = 'このAPIへのアクセス権限がありません。';
exports.ADMIN_NOT_FOUND = '管理者が存在しません。';
exports.BOOTH_NOT_EXIST = 'ブースが存在しません。';
exports.EMAIL_EXIST = 'メールアドレスが既に利用されてます。';
exports.EMAIL_NOT_FOUND = 'メールアドレスが存在しません。';
exports.INVALID_SALON_ID = 'サロンIDが正しくありません。';
exports.INVALID_ADMIN_ID = '管理者IDが正しくありません。';
exports.INVALID_BOOTH_ID = 'ブースIDが正しくありません。';
exports.INVALID_ACCESS = '不正なアクセスです。';
exports.BOOTH_NAME_EXIST = 'このサロンでブース名が既に登録されてます。違うブース名を利用してください';
exports.SALON_NOT_EXIST = 'サロンが存在しません。';
exports.DISABLE_DATE_NOT_EXIST = '日付が存在しません。';
exports.RESERVATION_NOT_EXIST = '予約が存在しません。';
exports.USER_NOT_EXIST = '利用者が存在しません。';
exports.CUSTOMER_NOT_EXIST = 'PAYJPに顧客情報が登録されてません。';
exports.CUSTOMER_ALREADY_EXIST = 'PAYJPに既に顧客情報が登録されてます。';
exports.PAYMENT_NOT_EXIST = '決済情報が存在しません。';
exports.NOT_ENOUGH_POINT = 'ポイントが足りません。';
exports.NOT_ABLE_TO_CANCEL_RESERVATION = '1時間以内の予約はキャンセルできません。';
exports.PRODUCT_NOT_EXIST = 'PAYJPに商品情報が存在しません。';
exports.DISABLE_DATE_EXIST = 'この日付は既に不可です。';
exports.RESERVATION_ALREADY_EXIST = '予約が既に存在します。';
exports.PASSWORD_NOT_MATCH = 'パスワードが違います。';
exports.EMAIL_NOT_MATCH = 'メールアドレスが登録されていません。';
exports.PAYJP_INVALID_CARD = 'クレジット情報にエラーが出ております。';
// INVALID_REGISTRATION_TOKEN
exports.INVALID_REGISTRATION_TOKEN = '登録トークンが不正です。';
// INVALID_EMAIL
exports.INVALID_EMAIL = 'メールアドレスが不正です。';
// INVALID_TOKEN 
exports.INVALID_TOKEN = 'トークンが不正です。';
// convet all above into this formate
exports.MESSAGES = {
    "en": {
        // common error message
        "VALIDATION": "Invalid format",
        "UNAUTH": "Authentication failed.",
        "notFound": "Data not found",
        "CONFLICT": "Conflict",
        "DATANOTFOUND": "Data not found",
        "PAGENOTFOUND": "Page not found",
        "BADIMPLEMENTATION": "Server error.",
        "USER NOT ACTIVATE": "User does not activate yet",
        "DATA EXCEED": "You exceed the limit.",
        // parent Child error message
        "child_login_id_exist": "Child login id already exist",
        "Child_not_found": "Child not found",
        "Child_already_exist": "Child already exist",
        "child_delete": "Child delete successfully",
        "child_update": "Child update successfully",
        "child_add": "Child add successfully",
        "login_id_available": "Login id available",
        "child_not_exist": "Child not exist",
        "get_children": "Get children successfully",
        "subscription_failed": "Subscription failed",
        "subscription_success": "Subscription success",
        "payment_failed": "Payment failed",
        // Stripe error message
        "stripe_account_not_found": "Stripe account not found",
        "parent_not_found": "User not found",
        "card_already_exists": "Card already exists",
        "card_added_successfully": "Card added successfully",
        "card_updated_successfully": "Card updated successfully",
        "card_deleted_successfully": "Card deleted successfully",
        "card_marked_default": "Card marked default",
        "card_cvc_check_failed": "Card cvc check failed",
    },
    "ja": {
        // common error message
        "VALIDATION": "フォーマットが不正です。",
        "UNAUTH": "認証に失敗しました。",
        "notFound": "データが存在しません。",
        "CONFLICT": "データが重複しています。",
        "DATANOTFOUND": "データが存在しません。",
        "PAGENOTFOUND": "ページが存在しません。",
        "BADIMPLEMENTATION": "サーバー内でエラーが起きました。",
        "USER NOT ACTIVATE": "ユーザーが有効化されていません。",
        "DATA EXCEED": "データが上限を超えています。",
        // parent Child error message
        "child_login_id_exist": "子供のログインIDが既に存在しています。",
        "Child_not_found": "子供が存在しません。",
        "Child_already_exist": "子供が既に存在しています。",
        "child_delete": "子供を削除しました。",
        "child_update": "子供を更新しました。",
        "child_add": "子供を追加しました。",
        "login_id_available": "ログインIDが利用可能です。",
        "child_not_exist": "子供が存在しません。",
        "get_children": "子供を取得しました。",
        "subscription_failed": "サブスクリプションに失敗しました。",
        "subscription_success": "サブスクリプションに成功しました。",
        "payment_failed": "支払いに失敗しました。",
        // Stripe error message
        "stripe_account_not_found": "Stripeアカウントが存在しません。",
        "parent_not_found": "ユーザーが存在しません。",
        "card_already_exists": "カードが既に存在しています。",
        "card_added_successfully": "カードを追加しました。",
        "card_updated_successfully": "カードを更新しました。",
        "card_deleted_successfully": "カードを削除しました。",
        "card_marked_default": "カードをデフォルトにしました。",
        "card_cvc_check_failed": "カードのCVCチェックに失敗しました。",
    }
};
