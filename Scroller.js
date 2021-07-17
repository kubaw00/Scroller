class Scroller {
    constructor(rootSelector){
        const rootElement = document.querySelector(rootSelector);
        //będziemy się odwoływać w metodach tej klasy do tych właściwości
        this.sections = [...document.querySelectorAll('section')];
        
        this.throttled = false;

       const currentSectionIndex= this.sections.findIndex((section) => this.isScrolledIntoView(section))

       this.currentSectionIndex = Math.max(currentSectionIndex, 0);
      
       
        this.drawNavigation();
        
    }


    isScrolledIntoView(el) {
        const rect = el.getBoundingClientRect();
        
        const rectTop = rect.top;
        const rectBottom = rect.bottom;
        const visibility = (rectTop >= 0) && (Math.floor(rectBottom) <= window.innerHeight);
        
        return visibility
    }

    listenScroll = (e) =>{
       
            if (this.throttled) return;
            this.throttled = true;
            setTimeout(() =>{
                this.throttled = false
            }, 800 )
            
            const direction = e.wheelDelta < 0 ? 1 : -1;
            
            this.scroll(direction);        
    }

       scroll(direction){
        if(direction === 1 ) {
          const isLastSection = this.currentSectionIndex === this.sections.length - 1 ? true : false;
          if(isLastSection) return
        } else if (direction === -1) {
          const isFirstSection = this.currentSectionIndex === 0 ? true : false;
          if(isFirstSection) return
        }
      this.currentSectionIndex += direction;
      this.scrollToCurrentSection();
  
      }

       scrollToCurrentSection(){
        this.selectActiveItem(); 
        this.sections[this.currentSectionIndex].scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
     } 


    // tworzenie navigacji i aktualizowanie indexu
    drawNavigation(){
        this.navigationContainer = document.createElement('aside');
        this.navigationContainer.setAttribute('class', 'scroller__navigation');
        const list = document.createElement('ul');

        this.sections.forEach((section, index) => {
            const listItem = document.createElement('li');
           
            listItem.addEventListener('click', () => {
                this.currentSectionIndex = index; 
                
                this.scrollToCurrentSection();
            } )
            list.appendChild(listItem)
            
        })

        this.navigationContainer.appendChild(list)
        document.body.appendChild(this.navigationContainer);
        this.selectActiveItem();
    }

    //ustawianie klasy active w el. li
    selectActiveItem(){
        if (this.navigationContainer) {
            
        const navigationItems = this.navigationContainer.querySelectorAll('li')

        navigationItems.forEach((item, index) => {
            if(index === this.currentSectionIndex ){
                item.classList.add('active')
            } else {
                item.classList.remove('active')
            }
        } )
        
    }

}
}