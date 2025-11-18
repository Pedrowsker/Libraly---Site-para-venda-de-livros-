document.addEventListener('DOMContentLoaded', () => {
    
    const authorCards = document.querySelectorAll('.author-card');
    
    authorCards.forEach(card => {
        
        const button = card.querySelector('.author-btn');
        const authorName = card.getAttribute('data-author');
        
        if (button && authorName) {
            button.addEventListener('click', () => {
                
                localStorage.setItem('searchQuery', authorName);
                window.location.href = 'pesquisa.html';
            });
        }
    });
    
});