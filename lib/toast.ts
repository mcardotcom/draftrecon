import toast from 'react-hot-toast'

export type ToastType = 'success' | 'error' | 'loading' | 'info'

interface ToastOptions {
  duration?: number
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left'
}

const defaultOptions: ToastOptions = {
  duration: 4000,
  position: 'top-right',
}

export function showToast(
  message: string,
  type: ToastType = 'info',
  options: ToastOptions = {}
) {
  const toastOptions = { ...defaultOptions, ...options }

  switch (type) {
    case 'success':
      return toast.success(message, toastOptions)
    case 'error':
      return toast.error(message, toastOptions)
    case 'loading':
      return toast.loading(message, toastOptions)
    default:
      return toast(message, toastOptions)
  }
}

export function handleError(error: unknown) {
  console.error(error)

  let message = 'An unexpected error occurred'

  if (error instanceof Error) {
    message = error.message
  } else if (typeof error === 'string') {
    message = error
  }

  showToast(message, 'error')
}

export function handleSuccess(message: string) {
  showToast(message, 'success')
}

export function handleLoading(message: string) {
  return showToast(message, 'loading')
}

export function dismissToast(toastId: string) {
  toast.dismiss(toastId)
} 