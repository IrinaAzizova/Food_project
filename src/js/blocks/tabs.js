const tabs = (contentSelector, tabsSelector, activeClass) => {
    const tabContent = document.querySelectorAll(contentSelector),
          tabsTittle = document.querySelectorAll(tabsSelector);

    tabsTittle.forEach((title, i) => {
        title.addEventListener('click', (event) => {
            toggleActiveClass(activeClass);
            showCorrectTabContent(i);
        });
    });

    function toggleActiveClass(className) {
            tabsTittle.forEach(title => {
                title.classList.remove(className);
            });
            event.target.classList.add(className);  
    }

    function showCorrectTabContent(item = 0){
        tabContent.forEach(tab => {
            tab.classList.remove('animate__fadeIn');
            tab.classList.add('hide');
        });
        tabContent[item].classList.remove('hide');
        tabContent[item].classList.add('animate__fadeIn');
    }
    showCorrectTabContent();
};

export default tabs;