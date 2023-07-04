document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const leftArrow = document.querySelector('.left');
    const rightArrow = document.querySelector('.right');
    const indicatorParents = document.querySelector('.controls ul');

    var sectionIndex = 0;

    function setIndex(){
        document.querySelector('.controls .selected').classList.remove('selected');
        slider.style.transform = 'translate(' + (sectionIndex) * -25 +'%)';
    }

    document.querySelectorAll('.controls li').forEach(function(indicator, ind) {
        indicator.addEventListener('click', function(){
            sectionIndex = ind;
            setIndex();
            indicator.classList.add('selected');
        })
    })

    leftArrow.addEventListener('click', function() {
        sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 0;
        indicatorParents.children[sectionIndex].classList.add('selected');
        setIndex();
    });

    rightArrow.addEventListener('click', function() {
        sectionIndex = (sectionIndex < 3) ? sectionIndex + 1 : 3;
        indicatorParents.children[sectionIndex].classList.add('selected');
        setIndex();
    });

    // Fonction pour gérer l'événement de défilement de la souris en douceur
    function handleSmoothScroll(event) {
        // Empêcher le défilement par défaut
        event.preventDefault();
  
        // Récupérer la direction du défilement (vers le haut ou vers le bas)
        const direction = event.deltaY > 0 ? 1 : -1;
  
        // Récupérer la hauteur de l'écran (viewport)
        const viewportHeight = window.innerHeight;
  
        // Calculer la nouvelle position de défilement
        const currentPosition = window.scrollY;
        const newPosition = currentPosition + direction * viewportHeight;
  
        // Durée de l'animation (en millisecondes)
        const duration = 800;
  
        // Temps de début de l'animation
        const startTime = performance.now();
  
        // Fonction d'animation
        function scrollAnimation(currentTime) {
          const elapsedTime = currentTime - startTime;
  
          // Calculer la nouvelle position de défilement en utilisant une courbe d'animation (ici, une courbe d'accélération/décélération)
          const scrollPosition = easeInOut(elapsedTime, currentPosition, direction * viewportHeight, duration);
  
          // Faire défiler la page jusqu'à la nouvelle position
          window.scrollTo(0, scrollPosition);
  
          // Continuer l'animation jusqu'à ce que la durée soit atteinte
          if (elapsedTime < duration) {
            requestAnimationFrame(scrollAnimation);
          }
        }
  
        // Lancer l'animation
        requestAnimationFrame(scrollAnimation);
      }
  
      // Fonction d'interpolation pour la courbe d'accélération/décélération (Easing function)
      function easeInOut(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
      }
  
      // Ajouter l'écouteur d'événement "wheel" à la fenêtre
      window.addEventListener("wheel", handleSmoothScroll, { passive: false });

          // Récupérer l'élément de la classe .navcontainer

    // Fonction pour gérer le défilement de la page
});