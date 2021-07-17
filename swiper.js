class Swiper {
    constructor(){

     this.initialX = null;
     this.initialY = null;  

     document.addEventListener('touchstart', (e) => this.startTouch(e))   
     document.addEventListener('touchmove', (e) => this.moveTouch(e))   
    //towrzenie nowych eventów
    this.events = {
        swipeUp: new Event('swipeUp'),
        swipeDown: new Event('swipeDown'),
        swipeRight: new Event('swipeRight'),
        swipeLeft: new Event('swipeLeft'),
    }

    }


  startTouch(e) {
    e.preventDefault();
    
    this.initialX = e.touches[0].clientX;
    this.initialY = e.touches[0].clientY;
  }

    moveTouch(e) {
        if(!this.initialX || !this.initialY) return;

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        
        const diffX = this.initialX - currentX;
        const diffY = this.initialY - currentY;
        if (Math.abs(diffX) > Math.abs(diffY)){
            if(diffX > 0){
                //swipe lewo
                document.dispatchEvent(this.events.swipeLeft)
            } else {
                //prawo
                document.dispatchEvent(this.events.swipeRight)
            }
        } else {
            //oś y
            if(diffY > 0){
                //swipe góra
                document.dispatchEvent(this.events.swipeUp)
            } else{
                //swipe dół
                document.dispatchEvent(this.events.swipeDown)
            }

        }
        this.initialX = null;
        this.initialY = null;
  }

}



new Swiper();