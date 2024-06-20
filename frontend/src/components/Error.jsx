export function Error({ iconImg, children }) {
    return (
        <div className='error'>
            <img src={iconImg} alt="error icon" className='error__icon' />
            <p className='error__message'>{children}</p>
        </div>
    )
}