import configs from '/static/sugarfreecat/config/theme/configList.json' with { type: 'json' };

window.addEventListener('DOMContentLoaded', async () => {
    const animationPromise = playFullScreenAnimation('entering', 800);
    
    document.body.classList.remove('is-loading');

    // RUN YOUR DYNAMIC ELEMENT ALTERATIONS HERE!
    for (const config of configs) {
        const storedValue = localStorage.getItem(config);

        if (storedValue) {
            document.body.style.setProperty(config, storedValue);
        }
    }

    // Wait for the animation fade-out to finish smoothly
    await animationPromise;

    // Intercept link clicks for the closing animation
    document.body.addEventListener('click', async (event) => {
        const link = event.target.closest('a');
        if (link && link.href && !link.target && !event.ctrlKey && !event.metaKey) {
            event.preventDefault(); 
            await playFullScreenAnimation('closing', 600);
            window.location.href = link.href;
        }
    });
});


function playFullScreenAnimation(type = 'entering', duration = 1000) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        
        Object.assign(overlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            backgroundColor: '#ffeded', 
            zIndex: '99999',         
            pointerEvents: 'none',    
            transition: `opacity ${duration}ms ease-in-out`,
            opacity: type === 'entering' ? '1' : '0'
        });

        document.body.appendChild(overlay);
        void overlay.offsetWidth; // Force a reflow
        overlay.style.opacity = type === 'entering' ? '0' : '1';

        setTimeout(() => {
            if (type === 'entering') overlay.remove();
            resolve(); 
        }, duration);
    });
}
