document.addEventListener('DOMContentLoaded', () => {
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            
            event.preventDefault();
            const name = document.getElementById('name').value;
            
            alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso. (Esta é uma simulação)`);
            
            contactForm.reset();
        });
    }
    
});