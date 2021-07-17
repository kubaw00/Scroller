document.addEventListener('DOMContentLoaded', () =>{
  
    const scroller = new Scroller('#root')
    console.log(scroller)

    document.addEventListener('mousewheel', (e) => scroller.listenScroll(e));
    document.addEventListener('swipeUp', () => scroller.scroll(1));
    document.addEventListener('swipeDown',() => scroller.scroll(-1));
    document.addEventListener('keydown',(e) => {
        switch (e.key) {
            case 'ArrowDown':
                return scroller.scroll(1);
            case 'ArrowUp':  
               return scroller.scroll(-1);
            default: 
             break;  
        }
    });
    
})