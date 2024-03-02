/// <reference types="vite/client" />
type LoginFormProps = {
    formActions: LoginFormActions
}
type LoginFormActions = {
    swapToLogin: () => void,
    swapTo2FA: () => void,
    swapToResetPassword: () => void,
}