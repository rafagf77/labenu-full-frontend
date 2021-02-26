export const goToFeedPage = (history) => {
    history.push('/feed')
}

export const goToLoginPage = (history) => {
    history.push('/login')
}

export const goToPostPage = (history) => {
    history.push(`/post`)
}

export const goToImagePage = (history, id) => {
    history.push(`/image/${id}`)
}

export const goToSignUpPage = (history) => {
    history.push('/signup')
}