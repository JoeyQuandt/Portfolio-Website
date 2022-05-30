(function(){

    var model = {
        skillCounter: 0,
        navToggled: false,
    }
  
    var app = {
  
        init: function(){
            this.cacheDOM();
            this.bindEvents();
            this.toggleScroll();
            this.showSkill(model.skillCounter);
        },
  
        cacheDOM: function(){
            this.$skill      = document.getElementsByClassName('skill-card');
            this.$skillArrow = $('.slider-arrow');
            this.$navOverlay = $('.nav-overlay');
            this.$toggleNav  = $('.toggle-nav');
        },
  
        bindEvents: function(){
            this.$skillArrow.on('click', this.skillSlider.bind(this));
            this.$toggleNav.on('click', this.toggleNav.bind(this));
            $(window).scroll(this.toggleScroll);
            $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(this.smoothScroll);
        },
  
  
        showSkill: function(j){
            var length = this.$skill.length;
            for (var i = 0; i < length; i++) {
                $(this.$skill[i]).hide();
            }
            $(this.$skill[j]).show();
        },
  
        skillSlider: function(e){
            var i = $(e.target).attr('value');
            model.skillCounter += Number(i);
            if (model.skillCounter < 0) {
                model.skillCounter = this.$skill.length - 1;
            }
            this.showSkill(model.skillCounter % this.$skill.length);
        },
    }
  
    app.init()
    
  })();