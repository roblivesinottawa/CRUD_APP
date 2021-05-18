const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/movies', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Darth Vader',
            movie: 'The Return Of The Jedi'
        })
    })
})