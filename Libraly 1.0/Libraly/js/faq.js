document.addEventListener('DOMContentLoaded', () => {
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        }
    });
    
});