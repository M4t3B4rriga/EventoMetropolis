export function EventsDisplayer({ show, clickHandler }) {
    if (!show)
        return

    return (
        <footer className='section events__footer'>
            <button onClick={clickHandler} className='button button--solid button--bordered'>Mostrar más</button>
        </footer>
    )
}